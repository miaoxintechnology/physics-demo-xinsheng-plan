#!/usr/bin/env node
/**
 * build-catalog.ts — 扫描课件目录，生成全库索引
 *
 * 输入（仓库内的约定结构，见 README「仓库怎么组织」）：
 *
 *   <junior_high|senior_high>/<主题>/<可选的分主题>/<课件名>(<作者>)/
 *     ├─ <课件>.html        （至少一个，文件名不要求叫 index.html）
 *     ├─ README.md          （写「对应知识点 / 适用年级 / 作者」等）
 *     ├─ LICENSE            （本课件的许可证）
 *     └─ assets/            （可选）
 *
 * 输出：
 *   index/catalog.json   机器可读索引（标题、知识点、作者、许可、路径……）
 *   index/catalog.md     人类可读目录（按学段 + 主题分组）
 *
 * 用法：
 *   node scripts/build-catalog.ts               # 生成 / 更新索引
 *   node scripts/build-catalog.ts --check       # 只校验索引是否最新（CI 用，不写文件）
 *   node scripts/build-catalog.ts --strict      # 有任何警告就以非零码退出
 *   node scripts/build-catalog.ts --root . --out index
 *
 * 退出码：0 正常；1 --check 发现过期或 --strict 下有警告；2 运行出错。
 *
 * 元数据优先级：README 顶部的 YAML 头（可选） > README 正文条目 > 目录名。
 * 只依赖 Node 内置模块，Node >= 22.18 可直接运行 .ts（类型擦除）。
 */

import { readdir, readFile, writeFile, mkdir, stat } from "node:fs/promises";
import type { Dirent } from "node:fs";
import path from "node:path";

/* ------------------------------------------------------------------ *
 * 常量与类型
 * ------------------------------------------------------------------ */

const STAGE_KEYS = ["junior_high", "senior_high"] as const;
type StageKey = (typeof STAGE_KEYS)[number];

const STAGE_LABELS: Record<StageKey, string> = {
  junior_high: "初中",
  senior_high: "高中",
};

/** 主题目录的展示名与固定展示顺序；不在表里的目录按字母序排在后面。 */
const SUBJECT_LABELS: Record<StageKey, Record<string, string>> = {
  junior_high: {
    mechanics: "力学",
    electricity: "电学与电磁学",
    thermal: "热学",
    optics: "光学",
    sound: "声学",
  },
  senior_high: {
    mechanics: "力学",
    electricity: "电学",
    electromagnetism: "电磁学",
    thermal: "热学",
    optics: "光学",
    vibration_wave: "振动与波",
    modern_physics: "近代物理",
  },
};

const SCHEMA_VERSION = 1;
const GENERATOR = "scripts/build-catalog.ts";

interface LicenseInfo {
  /** SPDX 标识，识别不出时为空字符串 */
  spdx: string;
  /** 展示名，例如 MIT / CC BY-SA 4.0 */
  name: string;
  /** 许可声明的来源文件，仓库相对路径；没有就是 null */
  file: string | null;
}

interface CatalogItem {
  /** 稳定标识：课件目录的仓库相对路径 */
  id: string;
  stage: StageKey;
  stageLabel: string;
  subject: string;
  subjectLabel: string;
  /** 主题目录下的可选中间层级，例如 convex_lens；没有就是空字符串 */
  topic: string;
  title: string;
  knowledgePoint: string;
  grade: string;
  /** 展示用作者名，例如 San Zhang */
  author: string;
  /** 目录名括号里的原始写法，例如 San_Zhang */
  authorSlug: string;
  license: LicenseInfo;
  /** 课件目录（仓库相对路径，/ 分隔） */
  path: string;
  /** 入口 HTML（仓库相对路径，/ 分隔） */
  entry: string;
  hasReadme: boolean;
  hasLicense: boolean;
  hasAssets: boolean;
}

interface Warning {
  path: string;
  message: string;
}

interface Catalog {
  schemaVersion: number;
  generatedBy: string;
  generatedAt: string;
  stats: {
    total: number;
    byStage: Record<string, number>;
    bySubject: Record<string, number>;
    missingReadme: number;
    missingLicense: number;
    missingKnowledgePoint: number;
    warnings: number;
  };
  items: CatalogItem[];
}

interface Model {
  items: CatalogItem[];
  warnings: Warning[];
  emptySubjects: Array<{ stage: StageKey; subject: string; label: string; path: string }>;
}

/* ------------------------------------------------------------------ *
 * 小工具
 * ------------------------------------------------------------------ */

const toPosix = (p: string): string => p.split(path.sep).join("/");

/** 跨平台稳定排序：不依赖 locale，避免不同机器生成结果不一致。 */
const cmp = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);

const escapeRegExp = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

async function pathExists(p: string): Promise<boolean> {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function readText(p: string): Promise<string> {
  const raw = await readFile(p, "utf8");
  return raw.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
}

/** 在目录里按不区分大小写的文件名找文件，返回实际文件名。 */
function pickFile(names: string[], candidates: string[]): string | undefined {
  for (const candidate of candidates) {
    const hit = names.find((n) => n.toLowerCase() === candidate.toLowerCase());
    if (hit) return hit;
  }
  return undefined;
}

/* ------------------------------------------------------------------ *
 * README 解析
 * ------------------------------------------------------------------ */

/** 拆出可选的 YAML 头（只支持最简单的 `key: value`，不引入依赖）。 */
function splitFrontMatter(text: string): { data: Record<string, string>; body: string } {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { data: {}, body: text };

  const data: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^\s*([A-Za-z_][\w-]*)\s*:\s*(.*?)\s*$/);
    if (!kv) continue;
    const value = kv[2].replace(/^["']|["']$/g, "").trim();
    if (value) data[kv[1].toLowerCase()] = value;
  }
  return { data, body: text.slice(m[0].length) };
}

const cleanInline = (value: string): string =>
  value
    .replace(/<[^>]*>/g, "")
    .replace(/\*\*/g, "")
    .replace(/\s+#+\s*$/, "")
    .replace(/[，,；;。]\s*$/, "")
    .trim();

/**
 * 从 README 正文里取形如 `- **对应知识点**：初中物理 · 光学 · 凸透镜成像规律` 的字段。
 * 同时兼容 `知识点:`、`**作者：**`、表格外任意列表前缀。
 */
function fieldValue(body: string, labels: string[]): string | undefined {
  for (const label of labels) {
    const re = new RegExp(
      `^[\\s>\\-*|]*\\*{0,2}${escapeRegExp(label)}\\*{0,2}\\s*[:：]\\s*\\*{0,2}\\s*(.+?)\\s*\\*{0,2}\\s*$`,
      "m",
    );
    const m = body.match(re);
    if (m) {
      const value = cleanInline(m[1]);
      if (value) return value;
    }
  }
  return undefined;
}

/** README 的第一个一级标题，作为课件标题的兜底。 */
function firstHeading(body: string): string | undefined {
  const m = body.match(/^#\s+(.+?)\s*#*\s*$/m);
  return m ? cleanInline(m[1]) : undefined;
}

/* ------------------------------------------------------------------ *
 * 许可证识别
 * ------------------------------------------------------------------ */

interface LicenseRule {
  re: RegExp;
  spdx: string;
  name: string;
}

/** 顺序有意义：CC BY-SA 必须排在 CC BY 之前，GPL-3 排在 GPL-2 之前。 */
const LICENSE_RULES: LicenseRule[] = [
  {
    re: /CC\s*BY-SA\s*4\.0|Attribution-ShareAlike\s*4\.0/i,
    spdx: "CC-BY-SA-4.0",
    name: "CC BY-SA 4.0",
  },
  { re: /CC\s*BY-NC-SA|Attribution-NonCommercial-ShareAlike/i, spdx: "CC-BY-NC-SA", name: "CC BY-NC-SA" },
  {
    re: /CC\s*BY\s*4\.0|Creative Commons Attribution\s*4\.0/i,
    spdx: "CC-BY-4.0",
    name: "CC BY 4.0",
  },
  { re: /CC0/i, spdx: "CC0-1.0", name: "CC0 1.0" },
  { re: /Apache[- ]2\.0|Apache License,?\s*Version 2\.0/i, spdx: "Apache-2.0", name: "Apache-2.0" },
  { re: /GNU GENERAL PUBLIC LICENSE\s*Version 3|GPL-3\.0/i, spdx: "GPL-3.0", name: "GPL-3.0" },
  { re: /GNU GENERAL PUBLIC LICENSE\s*Version 2|GPL-2\.0/i, spdx: "GPL-2.0", name: "GPL-2.0" },
  { re: /BSD 3-Clause/i, spdx: "BSD-3-Clause", name: "BSD-3-Clause" },
  { re: /The Unlicense/i, spdx: "Unlicense", name: "The Unlicense" },
  { re: /MIT License|\bMIT\b/, spdx: "MIT", name: "MIT" },
];

function detectLicense(text: string | undefined): { spdx: string; name: string } | undefined {
  if (!text) return undefined;
  for (const rule of LICENSE_RULES) {
    if (rule.re.test(text)) return { spdx: rule.spdx, name: rule.name };
  }
  return undefined;
}

/** 从许可文本里取版权人一行，例如 `Copyright (c) 2026 miaoxintechnology`。 */
function copyrightLine(text: string | undefined): string | undefined {
  if (!text) return undefined;
  const m = text.match(/copyright\s*(?:\(c\)|©)?\s*[^\n]*/i);
  return m ? m[0].trim() : undefined;
}

/* ------------------------------------------------------------------ *
 * 扫描
 * ------------------------------------------------------------------ */

interface RawCourseware {
  /** 绝对路径 */
  absDir: string;
  /** 相对仓库根的路径段，例如 [junior_high, optics, convex_lens, "convex_lens_show(San_Zhang)"] */
  segments: string[];
  /** 目录下直接包含的 html 文件名 */
  htmlFiles: string[];
  fileNames: string[];
}

const IGNORED_DIRS = new Set(["node_modules", ".git", ".github"]);
const MAX_DEPTH = 6;

/**
 * 递归找课件目录：目录下直接有 .html 就视为一个课件，不再向下钻（避免把 assets 里的
 * 资源目录误判成课件）。
 */
async function collectCourseware(absDir: string, segments: string[], out: RawCourseware[]): Promise<void> {
  if (segments.length > MAX_DEPTH) return;

  let entries: Dirent[];
  try {
    entries = await readdir(absDir, { withFileTypes: true });
  } catch {
    return;
  }

  const fileNames = entries.filter((e) => e.isFile()).map((e) => e.name);
  const htmlFiles = fileNames.filter((n) => /\.html?$/i.test(n)).sort(cmp);

  if (htmlFiles.length > 0) {
    out.push({ absDir, segments, htmlFiles, fileNames });
    return;
  }

  const subdirs = entries
    .filter((e) => e.isDirectory() && !e.name.startsWith(".") && !IGNORED_DIRS.has(e.name))
    .map((e) => e.name)
    .sort(cmp);

  for (const name of subdirs) {
    await collectCourseware(path.join(absDir, name), [...segments, name], out);
  }
}

/** 目录名规范：`<课件名>(<作者>)`；不合规时给出兜底与警告。 */
function parseDirName(dirName: string): { title: string; authorSlug: string; compliant: boolean } {
  const m = dirName.match(/^(.+?)\(([^()]+)\)$/);
  if (m) {
    return { title: m[1].trim(), authorSlug: m[2].trim(), compliant: true };
  }
  return { title: dirName.trim(), authorSlug: "", compliant: false };
}

function pickEntry(raw: RawCourseware, title: string): string {
  const lower = raw.htmlFiles.map((n) => n.toLowerCase());
  const preferred = [`${title}.html`, "index.html", "main.html"];
  for (const candidate of preferred) {
    const idx = lower.indexOf(candidate.toLowerCase());
    if (idx >= 0) return raw.htmlFiles[idx];
  }
  return raw.htmlFiles[0];
}

function pickReadme(raw: RawCourseware): string | undefined {
  return pickFile(raw.fileNames, ["README.md", "README.markdown", "README.txt", "README"]);
}

function pickLicenseFile(raw: RawCourseware): string | undefined {
  return pickFile(raw.fileNames, ["LICENSE", "LICENSE.md", "LICENSE.txt", "COPYING", "COPYING.md"]);
}

/* ------------------------------------------------------------------ *
 * 构建索引模型
 * ------------------------------------------------------------------ */

function subjectLabelFor(stage: StageKey, subject: string): string {
  return SUBJECT_LABELS[stage]?.[subject] ?? subject;
}

async function buildItem(raw: RawCourseware, root: string): Promise<{ item?: CatalogItem; warnings: Warning[] }> {
  const warnings: Warning[] = [];
  const segments = raw.segments;
  const relPath = toPosix(path.relative(root, raw.absDir));
  const dirName = segments[segments.length - 1];

  const stage = segments[0] as StageKey;
  if (!STAGE_KEYS.includes(stage)) {
    return { warnings: [{ path: relPath, message: `不在 junior_high/ 或 senior_high/ 下，已跳过` }] };
  }
  if (segments.length < 3) {
    warnings.push({ path: relPath, message: "层级过浅，缺少主题目录（<学段>/<主题>/<课件>/）" });
  }

  const subject = segments[1] ?? "";
  const topic = segments.slice(2, -1).join("/");

  const { title: dirTitle, authorSlug, compliant } = parseDirName(dirName);
  if (!compliant) {
    warnings.push({ path: relPath, message: `目录名不符合「<课件名>(<作者>)」格式：${dirName}` });
  }

  const readmeName = pickReadme(raw);
  const licenseName = pickLicenseFile(raw);
  const readmeText = readmeName ? await readText(path.join(raw.absDir, readmeName)) : "";
  const licenseText = licenseName ? await readText(path.join(raw.absDir, licenseName)) : "";

  const { data: fm, body } = splitFrontMatter(readmeText);

  const title = fm.title || firstHeading(body) || dirTitle;
  const knowledgePoint = fm.knowledge_point || fm.knowledge || fieldValue(body, ["对应知识点", "知识点"]) || "";
  const grade = fm.grade || fieldValue(body, ["适用年级", "年级"]) || "";
  const author =
    fm.author ||
    fieldValue(body, ["作者"]) ||
    (authorSlug ? authorSlug.replace(/_/g, " ") : "");

  const licenseFromFile = detectLicense(licenseText);
  const licenseFromReadme = detectLicense(readmeText) ?? detectLicense(fm.license);
  const license: LicenseInfo = licenseFromFile
    ? { ...licenseFromFile, file: toPosix(path.join(relPath, licenseName!)) }
    : licenseFromReadme
      ? { ...licenseFromReadme, file: null }
      : { spdx: "", name: "未声明", file: null };

  if (!readmeName) warnings.push({ path: relPath, message: "缺少 README.md" });
  if (!licenseName) warnings.push({ path: relPath, message: "缺少 LICENSE" });
  if (!knowledgePoint) warnings.push({ path: relPath, message: "未填写「对应知识点」" });

  const hasAssets = await pathExists(path.join(raw.absDir, "assets"));
  const entryName = pickEntry(raw, dirTitle);

  const item: CatalogItem = {
    id: relPath,
    stage,
    stageLabel: STAGE_LABELS[stage],
    subject,
    subjectLabel: subjectLabelFor(stage, subject),
    topic,
    title,
    knowledgePoint,
    grade,
    author,
    authorSlug,
    license,
    path: relPath,
    entry: toPosix(path.join(relPath, entryName)),
    hasReadme: Boolean(readmeName),
    hasLicense: Boolean(licenseName),
    hasAssets,
  };

  return { item, warnings };
}

async function buildModel(root: string): Promise<Model> {
  const raws: RawCourseware[] = [];

  for (const stage of STAGE_KEYS) {
    const stageDir = path.join(root, stage);
    if (!(await pathExists(stageDir))) continue;

    const subjects = (await readdir(stageDir, { withFileTypes: true }))
      .filter((e) => e.isDirectory() && !e.name.startsWith(".") && !IGNORED_DIRS.has(e.name))
      .map((e) => e.name)
      .sort(cmp);

    for (const subject of subjects) {
      await collectCourseware(path.join(stageDir, subject), [stage, subject], raws);
    }
  }

  const items: CatalogItem[] = [];
  const warnings: Warning[] = [];

  // 固定顺序：学段 → 主题（先按约定表，再按字母）→ 子主题 → 标题
  const subjectRank = (item: CatalogItem): number => {
    const keys = Object.keys(SUBJECT_LABELS[item.stage] ?? {});
    const idx = keys.indexOf(item.subject);
    return idx === -1 ? keys.length : idx;
  };

  const sortedRaws = [...raws].sort((a, b) => {
    const sa = STAGE_KEYS.indexOf(a.segments[0] as StageKey);
    const sb = STAGE_KEYS.indexOf(b.segments[0] as StageKey);
    if (sa !== sb) return sa - sb;
    return cmp(a.segments.join("/"), b.segments.join("/"));
  });

  for (const raw of sortedRaws) {
    const { item, warnings: itemWarnings } = await buildItem(raw, root);
    warnings.push(...itemWarnings);
    if (item) items.push(item);
  }

  items.sort((a, b) => {
    const sa = STAGE_KEYS.indexOf(a.stage) - STAGE_KEYS.indexOf(b.stage);
    if (sa !== 0) return sa;
    const ra = subjectRank(a) - subjectRank(b);
    if (ra !== 0) return ra;
    const rs = cmp(a.subject, b.subject);
    if (rs !== 0) return rs;
    const rt = cmp(a.topic, b.topic);
    if (rt !== 0) return rt;
    return cmp(a.title, b.title) || cmp(a.id, b.id);
  });

  // 同名同作者的重复收录，多半是复制目录时忘了改名
  const seen = new Map<string, string>();
  for (const item of items) {
    const key = `${item.title}::${item.authorSlug || item.author}`;
    const first = seen.get(key);
    if (first) {
      warnings.push({ path: item.path, message: `疑似重复课件（与 ${first} 同名同作者）` });
    } else {
      seen.set(key, item.path);
    }
  }

  // 空主题：给出「待收录」清单，方便认领
  const emptySubjects: Model["emptySubjects"] = [];
  for (const stage of STAGE_KEYS) {
    const stageDir = path.join(root, stage);
    if (!(await pathExists(stageDir))) continue;
    const subjects = (await readdir(stageDir, { withFileTypes: true }))
      .filter((e) => e.isDirectory() && !e.name.startsWith(".") && !IGNORED_DIRS.has(e.name))
      .map((e) => e.name)
      .sort(cmp);

    for (const subject of subjects) {
      const has = items.some((i) => i.stage === stage && i.subject === subject);
      if (!has) {
        emptySubjects.push({
          stage,
          subject,
          label: subjectLabelFor(stage, subject),
          path: `${stage}/${subject}`,
        });
      }
    }
  }

  // 按学段、主题的约定顺序排列，方便读者从上到下游览
  const emptyRank = (entry: Model["emptySubjects"][number]): number => {
    const keys = Object.keys(SUBJECT_LABELS[entry.stage] ?? {});
    const idx = keys.indexOf(entry.subject);
    return idx === -1 ? keys.length : idx;
  };
  emptySubjects.sort(
    (a, b) => STAGE_KEYS.indexOf(a.stage) - STAGE_KEYS.indexOf(b.stage) || emptyRank(a) - emptyRank(b) || cmp(a.subject, b.subject),
  );

  return { items, warnings, emptySubjects };
}

/* ------------------------------------------------------------------ *
 * 渲染
 * ------------------------------------------------------------------ */

function buildCatalog(model: Model, generatedAt: string): Catalog {
  const byStage: Record<string, number> = {};
  const bySubject: Record<string, number> = {};

  for (const item of model.items) {
    byStage[item.stageLabel] = (byStage[item.stageLabel] ?? 0) + 1;
    const key = `${item.stageLabel}/${item.subjectLabel}`;
    bySubject[key] = (bySubject[key] ?? 0) + 1;
  }

  return {
    schemaVersion: SCHEMA_VERSION,
    generatedBy: GENERATOR,
    generatedAt,
    stats: {
      total: model.items.length,
      byStage,
      bySubject,
      missingReadme: model.items.filter((i) => !i.hasReadme).length,
      missingLicense: model.items.filter((i) => !i.hasLicense).length,
      missingKnowledgePoint: model.items.filter((i) => !i.knowledgePoint).length,
      warnings: model.warnings.length,
    },
    items: model.items,
  };
}

const renderJson = (catalog: Catalog): string => `${JSON.stringify(catalog, null, 2)}\n`;

const cell = (value: string): string =>
  (value || "—").replace(/\|/g, "\\|").replace(/\n+/g, " ").trim();

function renderMarkdown(model: Model, generatedAt: string): string {
  const lines: string[] = [];
  const stamp = generatedAt.replace("T", " ").replace(/\.\d+Z$/, " UTC");
  const counts = new Map<string, number>();
  for (const item of model.items) counts.set(item.stage, (counts.get(item.stage) ?? 0) + 1);

  lines.push("# 课件目录", "");
  lines.push("> 本文件由 `scripts/build-catalog.ts` 自动生成，**请勿手工编辑**。");
  lines.push("> 课件合并进 `main` 后由 GitHub Actions 自动重建，说明见 [README](../README.md)。", "");
  lines.push(
    `最后生成：${stamp} · 共 **${model.items.length}** 个课件` +
      (model.items.length > 0
        ? `（${STAGE_KEYS.filter((s) => counts.get(s)).map((s) => `${STAGE_LABELS[s]} ${counts.get(s)}`).join(" · ")}）`
        : ""),
    "",
  );

  if (model.items.length === 0) {
    lines.push("## 暂未收录课件", "", "仓库结构已经就绪，等待第一个课件。投稿方式见 [CONTRIBUTING.md](../CONTRIBUTING.md)。", "");
  }

  // 概览
  if (model.items.length > 0) {
    lines.push("## 概览", "", "| 学段 | 主题 | 课件数 |", "| --- | --- | ---: |");
    for (const stage of STAGE_KEYS) {
      const items = model.items.filter((i) => i.stage === stage);
      if (items.length === 0) continue;
      const subjects = [...new Set(items.map((i) => i.subject))];
      for (const subject of subjects) {
        const n = items.filter((i) => i.subject === subject).length;
        lines.push(`| ${STAGE_LABELS[stage]} | ${subjectLabelFor(stage, subject)} | ${n} |`);
      }
    }
    lines.push("");
  }

  // 分学段、分主题列表
  for (const stage of STAGE_KEYS) {
    const stageItems = model.items.filter((i) => i.stage === stage);
    if (stageItems.length === 0) continue;

    lines.push(`## ${STAGE_LABELS[stage]}`, "");
    const subjects = [...new Set(stageItems.map((i) => i.subject))].sort((a, b) => {
      const keys = Object.keys(SUBJECT_LABELS[stage] ?? {});
      const ia = keys.indexOf(a);
      const ib = keys.indexOf(b);
      return (ia === -1 ? keys.length : ia) - (ib === -1 ? keys.length : ib) || cmp(a, b);
    });

    for (const subject of subjects) {
      const items = stageItems.filter((i) => i.subject === subject);
      lines.push(`### ${subjectLabelFor(stage, subject)}（\`${stage}/${subject}\`）`, "");
      lines.push("| 课件 | 知识点 | 年级 | 作者 | 许可 | 位置 |", "| --- | --- | --- | --- | --- | --- |");
      for (const item of items) {
        const link = `[${cell(item.title)}](<${item.entry}>)`;
        lines.push(
          `| ${link} | ${cell(item.knowledgePoint)} | ${cell(item.grade)} | ${cell(item.author)} | ${cell(item.license.name)} | \`${item.path}\` |`,
        );
      }
      lines.push("");
    }
  }

  if (model.emptySubjects.length > 0) {
    lines.push("## 待收录主题", "", "以下主题目录已经建好，暂时还没有课件，欢迎认领：", "");
    for (const entry of model.emptySubjects) {
      lines.push(`- ${STAGE_LABELS[entry.stage]} · ${entry.label}（\`${entry.path}\`）`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

/* ------------------------------------------------------------------ *
 * CLI
 * ------------------------------------------------------------------ */

interface Options {
  check: boolean;
  strict: boolean;
  quiet: boolean;
  root: string;
  out: string;
  help: boolean;
}

function parseArgs(argv: string[]): Options {
  const options: Options = { check: false, strict: false, quiet: false, root: ".", out: "index", help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--check") options.check = true;
    else if (arg === "--strict") options.strict = true;
    else if (arg === "--quiet" || arg === "-q") options.quiet = true;
    else if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg === "--root") options.root = argv[++i] ?? ".";
    else if (arg.startsWith("--root=")) options.root = arg.slice("--root=".length);
    else if (arg === "--out") options.out = argv[++i] ?? "index";
    else if (arg.startsWith("--out=")) options.out = arg.slice("--out=".length);
    else throw new Error(`未知参数：${arg}`);
  }
  return options;
}

const USAGE = `用法：node scripts/build-catalog.ts [选项]

  --check        只校验 index/ 是否与仓库内容一致，不写文件（CI 用）
  --strict       出现任何警告即以退出码 1 结束
  --quiet, -q    只输出错误
  --root <dir>   仓库根目录，默认当前目录
  --out <dir>    索引输出目录（相对仓库根），默认 index
  -h, --help     显示本帮助`;

/** 去掉生成时间戳，只比较索引内容本身。 */
const stripStamp = (text: string): string => text.replace(/"generatedAt": "[^"]*"/, '"generatedAt": ""');

async function readExistingJson(p: string): Promise<Catalog | undefined> {
  try {
    const raw = await readFile(p, "utf8");
    return JSON.parse(raw) as Catalog;
  } catch {
    return undefined;
  }
}

async function main(): Promise<number> {
  let options: Options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(`参数错误：${(error as Error).message}`);
    console.error(USAGE);
    return 2;
  }

  if (options.help) {
    console.log(USAGE);
    return 0;
  }

  const root = path.resolve(options.root);
  const outDir = path.resolve(root, options.out);
  const jsonPath = path.join(outDir, "catalog.json");
  const mdPath = path.join(outDir, "catalog.md");

  const model = await buildModel(root);

  if (options.check) {
    const previous = await readExistingJson(jsonPath);
    const generatedAt = previous?.generatedAt ?? new Date().toISOString();
    const expectedJson = renderJson(buildCatalog(model, generatedAt));
    const expectedMd = renderMarkdown(model, generatedAt);

    const actualJson = (await pathExists(jsonPath)) ? await readText(jsonPath) : "";
    const actualMd = (await pathExists(mdPath)) ? await readText(mdPath) : "";

    const stale: string[] = [];
    if (actualJson !== expectedJson) stale.push("index/catalog.json");
    if (actualMd !== expectedMd) stale.push("index/catalog.md");

    if (stale.length > 0) {
      console.error(`索引已过期：${stale.join("、")}`);
      console.error("请运行 `node scripts/build-catalog.ts` 后提交生成结果。");
      return 1;
    }
    if (!options.quiet) console.log(`索引是最新的（${model.items.length} 个课件）。`);
  } else {
    const previousJsonText = (await pathExists(jsonPath)) ? await readText(jsonPath) : "";
    const previousMdText = (await pathExists(mdPath)) ? await readText(mdPath) : "";
    const previous = await readExistingJson(jsonPath);

    // 幂等：内容没有变化就沿用上次的时间戳，避免每次运行都产生「只改时间」的空提交。
    let generatedAt = new Date().toISOString();
    if (previous?.generatedAt) {
      const probe = renderJson(buildCatalog(model, previous.generatedAt));
      if (stripStamp(probe) === stripStamp(previousJsonText)) generatedAt = previous.generatedAt;
    }

    const nextJson = renderJson(buildCatalog(model, generatedAt));
    const nextMd = renderMarkdown(model, generatedAt);

    await mkdir(outDir, { recursive: true });
    if (nextJson !== previousJsonText) await writeFile(jsonPath, nextJson, "utf8");
    if (nextMd !== previousMdText) await writeFile(mdPath, nextMd, "utf8");

    if (!options.quiet) {
      const changed = nextJson !== previousJsonText || nextMd !== previousMdText;
      console.log(
        changed
          ? `已更新 index/catalog.json 与 index/catalog.md（${model.items.length} 个课件）。`
          : `索引没有变化（${model.items.length} 个课件），未改动文件。`,
      );
    }
  }

  for (const warning of model.warnings) {
    console.warn(`警告 ${warning.path}：${warning.message}`);
  }

  if (options.strict && model.warnings.length > 0) {
    console.error(`--strict 已启用，存在 ${model.warnings.length} 条警告。`);
    return 1;
  }

  return 0;
}

main()
  .then((code) => {
    process.exitCode = code;
  })
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.stack ?? error.message : String(error));
    process.exitCode = 2;
  });

export { buildModel, buildCatalog, renderMarkdown, renderJson };
