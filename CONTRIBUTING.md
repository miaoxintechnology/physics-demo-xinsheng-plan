# 贡献指南

嗨，各位老师、技术爱好者们，欢迎来到这个小小的开源项目 👋

这是一个**开放收录初高中物理 HTML5 演示课件**的公共仓库：每个课件彼此独立，谁做的就署谁的名，项目只负责收录、审校、分类和分发。我们不是要搞一个统一引擎让所有人按同一个模子写，也不是只由维护者自己生产内容。

无论你是物理老师、学生、前端开发者，还是用 AI 辅助生成动画的爱好者，都欢迎来玩。**初中和高中的课件都欢迎**，两边分类目录已经建好，操作流程完全一样，只是放的目录不同。

> 如果你不熟悉 GitHub，**完全没关系，真的**。第 6 节会从“什么是 GitHub”开始，用最通俗的话一步一步教你，不需要写代码，也不需要懂 Git 命令，只用浏览器就能把课件交上来。

> **关于审校时间，先说一句**：审校者都是志愿者，平时有自己的事情，时间比较零散。你的 PR 提交后，**不一定能在 48 小时内得到回复**，有时可能要等几天甚至一两周。这不是没人管，只是大家需要挤时间。请多一点耐心，也欢迎在合适的时候礼貌地提醒一下。详见第 6.4 节和第 9.4 节。

---

## 1. 你能帮上什么忙

| 你可以做的事    | 说明                              | 怎么开始                          |
| --------- | ------------------------------- | ----------------------------- |
| **新增课件**  | 提交一个自己做的 HTML5 物理演示动画（初中或高中）   | 提交 PR                         |
| **改进课件**  | 帮忙修物理错误、交互问题、兼容性问题              | 提交 PR                         |
| **教学审校**  | 以物理老师身份看看知识点、公式、方向、单位对不对        | 在 PR 里评论，或申请加入审校组             |
| **可用性审校** | 帮忙看看课件能不能正常打开、有没有登录/付费门槛、交互顺不顺手 | 在 PR 里评论                      |
| **报告问题**  | 发现课件打不开、物理错误、侵权素材               | 提交 Issue                      |
| **完善文档**  | 把这份指南、审校清单、索引脚本改得更好懂            | 提交 PR                         |
| **提需求**   | 希望有人做某个知识点的动画                   | 提交 Issue，用 `scene-request` 模板 |

有几件事我们**暂时没法收录**，先跟你说清楚，免得白忙一场：

- 反编译、提取自 Flash 课件的素材或代码
- 来源不明的图片、音频、视频素材
- 未经授权的教材插图、商业课件截图
- 纯视频播放、没有交互的“动画”
- **需要登录、注册、付费、订阅才能用的课件**
- **把核心功能藏在付费墙后面的“试用版”课件**

> 顺便说一句：我们**不禁止**使用外部 CDN、在线 API、在线字体、在线库。只要课件能正常打开、核心功能免费、不需要登录或付费，就可以收录，放心用。

---

## 2. 提交前，花两分钟自检一下

不用紧张，下面这些不是考试，只是帮你少走弯路。逐条看一眼，都满足了再提交：

- [ ] **至少有一个 `.html` 文件**，能正常打开；如果依赖图片/音频，放在同一目录或 `assets/` 下，并在 `README.md` 里说一声。
- [ ] **不用登录、注册、付费、订阅**：打开就能用，核心功能不收费。
- [ ] **有交互**：至少支持拖动、调参、开关、暂停/复位中的一种，不是纯播放。
- [ ] **物理正确**：公式、方向、单位、标注经得起检查；有简化假设，已经在页面或 `README.md` 里注明。
- [ ] **有 README.md**：用中文写清课件介绍、对应知识点、适用年级、操作方法、简化假设、版权说明。
- [ ] **有 LICENSE**：放一个 `LICENSE` 文件，写明本课件的许可证（推荐 MIT 或 CC BY-SA 4.0）。
- [ ] **许可清晰**：`README.md` 和 `LICENSE` 里都声明清楚。
- [ ] **不侵权**：素材原创、自绘，或使用可商用/可再分发的开源素材，并注明来源。
- [ ] **AI 生成已核对**：如果用了 AI 辅助，公式、方向、单位、文案已经由你本人逐项核对过。
- [ ] **浏览器实测**：至少在 Chrome / Edge 最新版里打开试过；如果用了较新的 API，在 `README.md` 里注明最低浏览器要求。
- [ ] **目录和命名符合规范**：见第 3 节，初中放 `junior_high/`，高中放 `senior_high/`。

> 审校不追求“完美”，但**不误导学生**、**能正常打开**、**没有登录/付费门槛**是三条底线。其他的都可以慢慢来。

---

## 3. 目录和命名：分类已经建好了，没有合适的就自己建

### 3.1 分类目录：大部分已经建好，没有合适的就自己开一个

项目按学段和主题预先建好了大部分分类目录，**你通常只需要进入对应目录，在里面创建你的课件目录就好**。

目前的分类结构：

```text
junior_high/                 # 初中
├─ mechanics/                # 力学
├─ electricity/              # 电学与电磁学
├─ thermal/                  # 热学
├─ optics/                   # 光学
└─ sound/                    # 声学

senior_high/                 # 高中
├─ mechanics/                # 力学
├─ electricity/              # 电学
├─ electromagnetism/         # 电磁学
├─ thermal/                  # 热学
├─ optics/                   # 光学
├─ vibration_wave/           # 振动与波
└─ modern_physics/           # 近代物理
```

**初中课件**进入 `junior_high/<主题>/`，**高中课件**进入 `senior_high/<主题>/`。比如：

- 初中凸透镜成像 → `junior_high/optics/convex_lens/`
- 高中电磁感应 → `senior_high/electromagnetism/electromagnetic_induction/`
- 高中平抛运动 → `senior_high/mechanics/projectile_motion/`
- 高中光的干涉 → `senior_high/optics/light_interference/`

> **如果找不到合适的主题，就自己开一个**。主题目录名用小写英文 + 下划线，比如 `nuclear_physics`、`fluid_mechanics`、`astrophysics`。在 PR 描述里简单说明一下为什么新增这个主题，审校时一起确认。别为了省事把课件硬塞进不相关的主题里，反而后面还要挪。

### 3.2 课件目录怎么命名

在主题目录下，创建一个课件目录，格式是：

```text
<课件名>(<作者>)
```

- **课件名**：这个课件的名称，建议用英文小写和下划线，例如 `convex_lens_show`、`lever_balance`。用中文也可以，但为了兼容 GitHub 和命令行，建议英文或拼音。
- **作者**：作者的英文名，放在英文括号 `()` 里。
- **目录名中不留空格**：因为 GitHub、命令行、URL 对空格兼容性不好，所以目录名里的空格统一用下划线 `_` 替换。
- 括号用英文括号 `()`，不要用中文括号。

> **重要说明**：下划线只是为了**目录名和文件名**的兼容性，用下划线替换空格。**除了目录名和文件名之外，其他地方正常使用空格就好**——比如 PR 标题、commit message、README 正文、文档说明，都正常写空格，不用刻意把空格换成下划线。

#### 作者英文名怎么写

| 情况     | 规则                   | 示例                                 |
| ------ | -------------------- | ---------------------------------- |
| 中文名    | 名在前，姓在后，首字母大写，用下划线连接 | 张三 → `San_Zhang`；赵丽丽 → `Lili_Zhao` |
| 自己有英文名 | 直接用英文名，首字母大写，用下划线连接  | `Eric_Liu`、`Kitty_Zhou`            |
| 版权属于组织 | 写组织英文名，首字母大写，用下划线连接  | `Miaoxin_Technology`               |

> 目录名里的作者英文名有空格时，用下划线替换，比如 `Eric Liu` 写成 `Eric_Liu`。但你在 PR 标题、README 正文里介绍自己时，正常写 `Eric Liu` 就好。

#### 完整目录示例（初中 + 高中）

```text
# 初中
junior_high/optics/convex_lens/convex_lens_show(San_Zhang)
junior_high/mechanics/lever_balance/lever_balance_demo(Lili_Zhao)
junior_high/electricity/series_circuit/series_circuit_kit(Eric_Liu)

# 高中
senior_high/mechanics/projectile_motion/projectile_motion_demo(San_Zhang)
senior_high/electromagnetism/electromagnetic_induction/induction_lab(Lili_Zhao)
senior_high/optics/light_interference/double_slit_interference(Eric_Liu)

# 自己新建主题的例子
senior_high/nuclear_physics/half_life_demo(San_Zhang)
senior_high/fluid_mechanics/bernoulli_demo(Lili_Zhao)
```

### 3.3 课件目录里放什么

每个课件目录下至少放这三样（初中、高中结构完全一样）：

```text
<学段>/<主题>/<课件名>(<作者>)/
├─ <你的课件>.html           # HTML 文件，名字可以自己定，不必须叫 index.html
├─ README.md                 # 中文说明，写介绍和版权说明
├─ LICENSE                   # 本课件的许可证
└─ assets/                   # 可选，图片/音频等资源
```

以初中凸透镜为例：

```text
junior_high/optics/convex_lens/convex_lens_show(San_Zhang)/
├─ convex_lens_show.html
├─ README.md
├─ LICENSE
└─ assets/
```

以高中电磁感应为例：

```text
senior_high/electromagnetism/electromagnetic_induction/induction_lab(Lili_Zhao)/
├─ induction_lab.html
├─ README.md
├─ LICENSE
└─ assets/
```

- **HTML 文件**：至少一个 `.html`，能正常打开。文件名自己定，比如 `convex_lens_show.html`、`induction_lab.html`，**不必须叫 `index.html`**。文件名中如果有空格，同样用下划线替换。
- **README.md**：必须用中文写，内容见第 4 节。
- **LICENSE**：必须放，推荐 MIT 或 CC BY-SA 4.0，内容见第 5 节。
- **不需要预览图**，不用放 `preview.png`。
- 有图片、音频等资源，放在 `assets/` 子目录下，HTML 里用相对路径引用。

---

## 4. README.md 怎么写：别怕，比写教案简单

### 4.1 README.md 是个啥

`README.md` 是一个用 **Markdown** 写的说明文件。Markdown 是很简单的排版语言，会下面这几个就够用了：

- `# 标题` 表示大标题
- `## 小标题` 表示小标题
- `- 列表项` 表示列表
- `**加粗**` 表示加粗
- 普通文字直接写就行

可以用这些工具编辑，挑顺手的就行：

| 工具            | 说明                     | 适合谁         |
| ------------- | ---------------------- | ----------- |
| **GitHub 网页** | 直接在线编辑，最简单，不用装软件       | 推荐老师用       |
| **Mark Text** | 免费开源，所见即所得，界面直观，支持实时预览 | 推荐老师用，操作很直观 |
| **Typora**    | 付费，所见即所得，界面简洁          | 已经购买的用户     |
| **Obsidian**  | 免费个人使用，功能强大，支持实时预览     | 喜欢记笔记的用户    |
| **VS Code**   | 免费，装 Markdown 插件后可用    | 开发者         |
| **记事本**       | 系统自带，能写，但排版效果要预览才知道    | 应急用         |

> **特别推荐 [Mark Text](https://www.marktext.cc/)**：免费、开源、跨平台（Windows / macOS / Linux），左边写、右边实时预览，操作非常直观，不需要背 Markdown 语法也能看懂效果。

### 4.2 README.md 里写什么

每个课件的 `README.md` 用中文写，至少包含这些：

1. **课件介绍**：这个动画演示什么物理现象、对应哪个知识点。
2. **适用年级**：比如八年级上、高二选择性必修二。**高中课件请写清楚是必修、选择性必修还是选修**。
3. **作者和版权说明**：作者是谁，版权归谁，采用什么许可证。
4. **使用方法**：怎么操作这个动画，有哪些交互。
5. **简化假设**：动画做了哪些简化，比如忽略摩擦、钩码视为质点等。
6. **素材来源**：图片、音频等素材来自哪里，许可是什么。
7. **AI 辅助说明**：如果用了 AI 辅助生成，简要说说哪些部分用了 AI、你怎么核对的。

> README 正文正常使用空格就好，不需要把空格换成下划线。介绍自己时写 `张三（San Zhang）` 或 `张三（San_Zhang）` 都行，怎么自然怎么来。

### 4.3 README.md 模板：复制过去改就行

下面是初中的例子。**高中课件按同样的结构写**，把知识点、年级、交互换成高中内容就行。

```markdown
# 凸透镜成像演示

## 课件介绍

本课件演示初中物理“凸透镜成像规律”。可以拖动蜡烛和光屏，实时观察物距、像距、像的大小、正倒和虚实变化。

- **对应知识点**：初中物理 · 光学 · 凸透镜成像规律
- **适用年级**：八年级上
- **作者**：张三（San Zhang）
- **版权说明**：Copyright (c) 2025 张三。本课件采用 MIT 许可证，详见同目录 LICENSE 文件。

## 使用方法

1. 双击 convex_lens_show.html，用 Chrome 或 Edge 打开。
2. 拖动蜡烛改变物距。
3. 拖动光屏找到清晰的像。
4. 点击“显示光路”按钮，观察三条特殊光线。
5. 点击“复位”恢复初始状态。

## 交互说明

- 拖动蜡烛：改变物距
- 拖动光屏：改变像距
- 滑块：调节焦距
- 按钮：显示/隐藏光路、复位

## 简化假设

- 透镜视为薄透镜。
- 忽略光的衍射和像差。
- 光线用理想直线表示。

## 教学提示

适合在讲解凸透镜成像规律时做定性观察，再配合成像公式做定量计算。

## 素材来源

全部自绘，没有使用外部图片和音频。

## AI 辅助说明

本课件的 HTML 代码使用 AI 辅助生成，公式、方向、单位、文案已由作者逐项核对。

## 许可证

MIT License，详见同目录 LICENSE 文件。
```

高中示例（电磁感应）：

```markdown
# 电磁感应演示

## 课件介绍

本课件演示高中物理“电磁感应”现象。可以拖动导体棒改变运动速度，观察感应电动势和感应电流方向的变化。

- **对应知识点**：高中物理 · 电磁学 · 电磁感应
- **适用年级**：高二选择性必修二
- **作者**：赵丽丽（Lili Zhao）
- **版权说明**：Copyright (c) 2025 赵丽丽。本课件采用 MIT 许可证，详见同目录 LICENSE 文件。

## 使用方法

1. 双击 induction_lab.html，用 Chrome 或 Edge 打开。
2. 拖动导体棒改变运动速度。
3. 切换磁场方向，观察感应电流方向变化。
4. 点击“显示磁通量”按钮，观察磁通量变化曲线。

## 交互说明

- 拖动导体棒：改变运动速度
- 按钮：切换磁场方向、显示/隐藏磁通量曲线、复位
- 滑块：调节磁感应强度

## 简化假设

- 忽略导体棒电阻和摩擦。
- 磁场视为匀强磁场。
- 感应电流方向用理想模型判断。

## 教学提示

适合在讲解楞次定律和法拉第电磁感应定律时做定性观察，再配合公式做定量计算。

## 素材来源

全部自绘，没有使用外部图片和音频。

## AI 辅助说明

未使用 AI 辅助。

## 许可证

MIT License，详见同目录 LICENSE 文件。
```

> 小提醒：README 里别写“待补充”“TODO”之类，审校时会退回来让你补，反而多跑一趟。
> 
> 但是，如果你想展示你未来的改进计划，可以创建一个 `PLAN.md` 放在目录下，展示你的计划。

---

## 5. LICENSE 怎么写：用这个 MIT 模板最省事

每个课件目录下都要放一个 `LICENSE` 文件，写明本课件的许可证。初中、高中一样。

推荐：

- **代码型课件**：MIT License
- **内容/美术型课件**：CC BY-SA 4.0

最省事的做法：

1. 打开 [choosealicense.com](https://choosealicense.com/) 选许可证。
2. 把全文复制到 `LICENSE` 里。
3. 把年份和作者名改成你自己的。

### 5.1 MIT 许可证模板（直接复制就能用）

把下面的 `[year]` 改成当前年份，把 `[fullname]` 改成你的名字（中文名或英文名都行，正常写空格），然后保存为 `LICENSE`：

```text
MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

填好之后大概长这样：

```text
MIT License

Copyright (c) 2025 张三
```

或者：

```text
MIT License

Copyright (c) 2025 San Zhang
```

> 小提示：
> 
> - 年份写当前年份就行，也可以写范围，比如 `2024-2025`。
> - `[fullname]` 用你习惯的名字写法，中文名、英文名、组织名都行，**正常使用空格**。
> - 目录名里的作者英文名需要用下划线（比如 `San_Zhang`），但 LICENSE 里正常写 `San Zhang` 就好。
> - README 里的版权说明要和 `LICENSE` 保持一致。

### 5.2 CC BY-SA 4.0 模板

如果课件里美术资源比较多，也可以用 CC BY-SA 4.0。法律文本太长，建议直接引用官方链接：

```text
本课件采用 Creative Commons Attribution-ShareAlike 4.0 International
(CC BY-SA 4.0) 许可证。

许可证全文见：
[CC BY-SA 4.0 许可证全文](https://creativecommons.org/licenses/by-sa/4.0/legalcode)

Copyright (c) [year] [fullname]
```

README 里也写一句版权说明，和 LICENSE 对上就行。

---

## 6. 手把手教你提交课件（PR 完整流程）

这一节专门写给**没学过编程、没用过 GitHub 的老师**。我们从“什么是 GitHub”开始，一步一步来。你不需要会写代码，也不需要装任何软件——**只用浏览器就能完成**。

**初中和高中的提交流程完全一样**，区别只在于目录：初中放 `junior_high/`，高中放 `senior_high/`。下面的示例以初中为例，高中照着做、把目录换掉就行。

### 6.0 先认几个词，别怕

| 词                    | 通俗解释                                      |
| -------------------- | ----------------------------------------- |
| **GitHub**           | 一个存放代码和文件的网站，类似“网盘 + 版本管理”。全世界的开源项目都放在这里。 |
| **仓库（Repository）**   | 一个项目文件夹。本项目的仓库就是所有物理动画的“总文件夹”。            |
| **Fork**             | “复制一份到你自己的账号下”。你改的是你自己的副本，不会直接影响原项目。      |
| **Branch（分支）**       | 一个“工作区”。你可以在里面随便改，改好了再申请合并回主项目。           |
| **Commit（提交）**       | “保存一次修改记录”，相当于给这次改动拍个快照，写一句说明。            |
| **Push（推送）**         | 把你在网页上或电脑上保存的修改“上传”到你的 GitHub 账号下。        |
| **PR（Pull Request）** | “合并申请”。你改好了，向项目方说：“我做了一个课件，请你们看看能不能收进总库。” |
| **Issue**            | “问题/需求单”。你想提意见、报 bug、求一个动画，都可以开 Issue。    |
| **Merge（合并）**        | 项目方审核通过后，把你的课件正式收进总库。                     |

**一句话理解整个流程**：

> 你把项目“复制”一份到自己账号（Fork）→ 在自己的副本里“加上你的课件” → 向项目方“提交合并申请”（PR）→ 项目方审核 → 通过后正式收录。

就这么简单。下面两条路线，挑顺手的走：

- **路线 A（推荐老师用）**：全程网页操作，不用装软件。
- **路线 B（适合熟悉电脑的贡献者）**：在电脑上用命令行操作。

---

### 6.1 路线 A：全程网页操作（推荐老师用）

你只需要一个浏览器（Chrome / Edge 都行）和一个 GitHub 账号。

#### 第一步：注册 GitHub 账号（已有账号就跳过）

1. 打开 [GitHub 官网](https://github.com)
2. 点右上角 **Sign up**
3. 按提示填邮箱、密码、用户名（用户名会用在作者署名里，建议用真实姓名拼音或常用 ID）
4. 去邮箱点验证链接，账号就激活了

> 小贴士：GitHub 界面是英文的，可以用浏览器自带的“翻译成中文”功能（右键 → 翻译成中文）。翻译可能不完美，但足够看懂按钮。

#### 第二步：Fork 项目（复制一份到你账号下）

1. 打开项目主页（在 GitHub 上搜索项目名，或点维护者给你的链接）
2. 看页面**右上角**，找到 **Fork** 按钮（一个分叉的小图标），点它
3. 页面问你要 fork 到哪里，直接点 **Create fork**
4. 等几秒钟，你会跳转到 `你的用户名/open-physics-anim-collection`——这就是你自己的副本了

> 看一眼页面左上角的仓库名，前面应该是**你的用户名**，不是项目组织的名字。这说明你操作的是自己的副本，放心改。

#### 第三步：进入对应的主题目录，没有就自己建

在你的副本页面，按学段和分类点进对应目录。

**初中示例**（凸透镜成像）：

```text
junior_high → optics → convex_lens
```

**高中示例**（电磁感应）：

```text
senior_high → electromagnetism → electromagnetic_induction
```

> 大部分主题目录是预先建好的，你只管进入。**如果找不到合适的主题，就自己建一个**：在 `junior_high/` 或 `senior_high/` 下新建一个主题目录，名字用小写英文 + 下划线，比如 `nuclear_physics`、`fluid_mechanics`。创建方法见第四步，输入文件路径时把新主题名带上即可，不需要单独建目录。

#### 第四步：创建你的课件目录

1. 在主题目录页面，点右上角的 **Add file** → **Create new file**。

2. 在文件名输入框里输入你的课件目录和 HTML 文件名。

   **初中示例**：

   ```text
   convex_lens_show(San_Zhang)/convex_lens_show.html
   ```

   **高中示例**：

   ```text
   induction_lab(Lili_Zhao)/induction_lab.html
   ```

   **自己新建主题的示例**：

   ```text
   nuclear_physics/half_life_demo(San_Zhang)/half_life_demo.html
   ```

   - 输入 `/` 会自动创建文件夹，包括新主题目录。
   - 目录名格式是 `<课件名>(<作者>)`，比如 `convex_lens_show(San_Zhang)`。
   - 目录名里的空格用下划线 `_` 替换，这是为了兼容性。
   - HTML 文件名自己定，不必须叫 `index.html`，文件名里也不要留空格。

3. 在下面的大文本框里，**粘贴你的 HTML 代码**。

4. 页面往下拉，找到 **Commit new file** 区域：

   - 第一个框（commit message）填：`新增：凸透镜成像 — convex lens show (San Zhang)`
     - 高中示例：`新增：电磁感应 — induction lab (Lili Zhao)`
   - 确认选中 **Create a new branch for this commit and start a pull request**
   - 分支名填：`add/convex-lens-san-zhang`
     - 高中示例：`add/induction-lili-zhao`

5. 点绿色按钮 **Propose new file**。

> 注意：commit message 和分支名里正常用空格（commit message）或连字符（分支名）就行，不需要把空格全换成下划线。只有**目录名和文件名**才需要下划线替换空格。

> 如果你的课件有多个 HTML、图片、音频，可以重复上面的步骤逐个创建，或者用 **Add file → Upload files** 直接拖拽上传。注意保持目录结构。

#### 第五步：补上 README.md 和 LICENSE

在同一个课件目录下，继续用 **Add file → Create new file** 创建两个文件：

1. `<课件目录>/README.md`
   - 按第 4 节的模板，用中文写课件介绍、使用方法、版权说明等。正文正常用空格。高中课件写清楚必修/选择性必修/选修。
2. `<课件目录>/LICENSE`
   - 按第 5 节的 MIT 模板，改好年份和作者名。作者名正常写空格，比如 `San Zhang`、`Lili Zhao`。

> 没有 README 和 LICENSE 的课件会被退回来。审校老师和使用的老师需要知道这个动画讲什么、怎么操作、许可是什么，这两样就是课件的“说明书”和“授权书”。

#### 第六步：创建 PR（提交合并申请）

1. 文件都建好后，页面顶部会出现绿色按钮 **Compare & pull request**，点它。

   - 没看到这个按钮的话，点页面上方 **Pull requests** 标签 → **New pull request** → 选择你刚建的分支。

2. 进入 PR 填写页面，确认：

   - 左边 **base repository** 是项目主仓库，**base** 是 `main`
   - 右边 **head repository** 是你的副本，**compare** 是你刚建的分支

3. **标题**填：`新增：凸透镜成像 — convex lens show (San Zhang)`

   - 高中示例：`新增：电磁感应 — induction lab (Lili Zhao)`
   - 标题里正常使用空格就好，不用刻意换成下划线。

4. **描述**按下面模板填：

   **初中示例**：

   ```markdown
   ## 课件信息
   - 学段：初中
   - 知识点：初中物理 · 光学 · 凸透镜成像规律
   - 适用年级：八年级上
   - 作者：San Zhang
   - 许可：MIT
   - 是否使用 AI 辅助：否
   - 是否有登录/付费门槛：否

   ## 自检确认
   - [ ] 无需登录/付费
   - [ ] 有交互
   - [ ] 物理正确
   - [ ] 无侵权素材
   - [ ] 已附 README.md
   - [ ] 已附 LICENSE
   - [ ] 目录和命名符合规范

   ## 截图 / 录屏
   （可以贴一张截图，方便审校老师快速了解）

   ## 备注
   （如果审校需要较长时间，我很理解，不着急～）
   ```

   **高中示例**：

   ```markdown
   ## 课件信息
   - 学段：高中
   - 知识点：高中物理 · 电磁学 · 电磁感应
   - 适用年级：高二选择性必修二
   - 作者：Lili Zhao
   - 许可：MIT
   - 是否使用 AI 辅助：否
   - 是否有登录/付费门槛：否

   ## 自检确认
   - [ ] 无需登录/付费
   - [ ] 有交互
   - [ ] 物理正确
   - [ ] 无侵权素材
   - [ ] 已附 README.md
   - [ ] 已附 LICENSE
   - [ ] 目录和命名符合规范

   ## 截图 / 录屏
   （可以贴一张截图，方便审校老师快速了解）

   ## 备注
   （如果审校需要较长时间，我很理解，不着急～）
   ```

   **自己新建主题的示例**（在 PR 描述里多写一句）：

   ```markdown
   ## 课件信息
   - 学段：高中
   - 新增主题：nuclear_physics（现有主题里没有合适的，新建一个）
   - 知识点：高中物理 · 近代物理 · 半衰期
   - 适用年级：高三选择性必修三
   - 作者：San Zhang
   - 许可：MIT
   - 是否使用 AI 辅助：否
   - 是否有登录/付费门槛：否
   ...
   ```

5. 点绿色按钮 **Create pull request**。

到这一步，你的申请就提交成功了。页面会显示 PR 编号，比如 `#42`。

#### 第七步：等待审校，按意见修改

- 审校老师会在 PR 下面留言，比如“像距标注方向反了，请确认一下”。
- **审校不一定很快**：审校者都是志愿者，平时要上课、备课、改作业，可能几天甚至一两周才回复。这不是没人管，只是大家时间零散，请多一点耐心。
- 你**不需要重新开一个 PR**，直接在原来的分支上改就行：
  1. 回到你的副本仓库，切换到你的分支（页面上方有个分支下拉框）。
  2. 点开要改的文件，点右上角铅笔图标 **Edit**。
  3. 改完，往下拉，commit message 填 `修复：根据审校意见修正像距标注`（正常用空格）。
  4. 确认提交到你的分支。
  5. PR 会自动更新，审校老师能看到你的新改动。
- 如果不同意某条意见，直接在 PR 里回复，附上教材页码或公式推导，礼貌讨论就行，不用有压力。

#### 第八步：合并完成

- 审校通过后，维护者会点 **Merge**，你的课件就正式进入总库了。
- 合并后，索引脚本会自动把课件加入 `index/catalog.md`，在线演示页下一次部署后就能看到。
- 你可以在 PR 页面看到紫色的 **Merged** 标记，说明成功了 🎉

#### 第九步（可选）：删掉临时分支

合并后，PR 页面会出现 **Delete branch** 按钮，点一下清理就行。不删也没关系，不影响什么。

---

### 6.2 路线 B：在电脑上操作（适合熟悉电脑的贡献者）

如果你电脑上已经装了 Git，或者愿意装一下，用命令行会更灵活。初中、高中操作一样，只是路径不同。

#### 6.2.1 准备

- 安装 Git：从 [Git 官网下载页](https://git-scm.com/downloads) 下载安装，装完在终端输入 `git --version` 能看到版本号就行。
- 第一次使用先配置身份：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

#### 6.2.2 Fork 并 Clone

1. 在项目主页点 **Fork**（同路线 A 第二步）。
2. 打开终端，执行：

```bash
git clone https://github.com/你的用户名/open-physics-anim-collection.git
cd open-physics-anim-collection
```

3. 添加上游仓库（方便以后同步主项目更新）：

```bash
git remote add upstream https://github.com/项目组织/open-physics-anim-collection.git
```

#### 6.2.3 创建分支

**不要直接在 `main` 上改**：

```bash
# 初中示例
git checkout -b add/convex-lens-san-zhang

# 高中示例
git checkout -b add/induction-lili-zhao
```

#### 6.2.4 放入课件文件

进入对应学段和主题目录，创建课件目录。路径里有括号，命令行里建议加引号：

```bash
# 初中示例
mkdir -p "junior_high/optics/convex_lens/convex_lens_show(San_Zhang)"
# 把你的 HTML、README.md、LICENSE、assets/ 复制进这个文件夹

# 高中示例
mkdir -p "senior_high/electromagnetism/electromagnetic_induction/induction_lab(Lili_Zhao)"
# 同样把 HTML、README.md、LICENSE、assets/ 复制进去

# 自己新建主题的示例
mkdir -p "senior_high/nuclear_physics/half_life_demo(San_Zhang)"
```

> `mkdir -p` 会自动创建不存在的上级目录，所以新主题也会一起建好，不需要单独操作。

#### 6.2.5 提交并推送

```bash
# 初中示例
git add "junior_high/optics/convex_lens/convex_lens_show(San_Zhang)"
git commit -m "新增：凸透镜成像 — convex lens show (San Zhang)"
git push origin add/convex-lens-san-zhang

# 高中示例
git add "senior_high/electromagnetism/electromagnetic_induction/induction_lab(Lili_Zhao)"
git commit -m "新增：电磁感应 — induction lab (Lili Zhao)"
git push origin add/induction-lili-zhao
```

> commit message 里正常用空格，不用把空格换成下划线。

推送后终端会显示一个链接，点开就是创建 PR 的页面；或者直接去 GitHub 网页操作（同路线 A 第六步）。

#### 6.2.6 根据审校意见修改

在同一个分支上继续改、继续提交、继续推送就行，PR 会自动更新：

```bash
git add "junior_high/optics/convex_lens/convex_lens_show(San_Zhang)"
git commit -m "修复：根据审校意见修正像距标注"
git push origin add/convex-lens-san-zhang
```

#### 6.2.7 同步主项目最新代码（可选）

如果主项目在你提交期间有新改动，可以同步：

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main

git checkout add/convex-lens-san-zhang
git rebase main
# 如果有冲突，按提示解决后 git add 冲突文件，再 git rebase --continue
git push --force-with-lease origin add/convex-lens-san-zhang
```

> `--force-with-lease` 只在你自己的 PR 分支上用，不要对 `main` 强推。

---

### 6.3 PR 标题和描述怎么写

**标题格式**：

```text
新增：<知识点> — <课件名> (<作者>)
```

**初中示例**：

```text
新增：凸透镜成像 — convex lens show (San Zhang)
新增：杠杆平衡 — lever balance demo (Lili Zhao)
修复：凸透镜成像 — 修正像距符号
```

**高中示例**：

```text
新增：平抛运动 — projectile motion demo (San Zhang)
新增：电磁感应 — induction lab (Lili Zhao)
新增：光的干涉 — double slit interference (Eric Liu)
修复：电磁感应 — 修正感应电流方向判断
```

> PR 标题里正常使用空格，读起来更自然。目录名才需要下划线。

**描述模板**（复制到 PR 描述框里填）：

**初中/高中通用模板**：

```markdown
## 课件信息
- 学段：初中 / 高中（二选一）
- 知识点：
- 适用年级：（高中请写清必修 / 选择性必修 / 选修）
- 作者：
- 许可：
- 是否新增主题：（如否，删掉下一行）
- 新增主题名：
- 是否使用 AI 辅助：（是/否，如是请简述）
- 是否有登录/付费门槛：否

## 自检确认
- [ ] 无需登录/付费
- [ ] 有交互
- [ ] 物理正确
- [ ] 无侵权素材
- [ ] 已附 README.md
- [ ] 已附 LICENSE
- [ ] 目录和命名符合规范

## 截图 / 录屏
（贴一张截图或短录屏）

## 关联 Issue
Closes #编号（如果有对应需求 Issue，没有就删掉这行）

## 备注
（审校如果需要较长时间，我完全理解，不着急～）
```

---

### 6.4 审校过程中怎么回复（以及审校可能要等多久）

审校老师可能会提各种意见。不用紧张，可以这样处理：

| 情况      | 怎么做                           |
| ------- | ----------------------------- |
| 同意修改    | 改完后在 PR 里回复“已修改，见最新 commit”   |
| 不同意，有依据 | 回复“这里我保留原实现，理由是……（附教材页码/公式）”  |
| 不确定     | 回复“这条我不太确定，能否请 @某位老师 帮忙确认一下？” |
| 意见太多    | 逐条回复，标明“已改”“保留”“待确认”，方便审校老师跟进 |

**关于审校时间，想跟你交个底**：

- 审校者都是**志愿者**，平时要上课、备课、改作业、带孩子，时间很零散。
- 你的 PR 提交后，**不一定能在 48 小时内得到回复**，等几天很正常，有时可能要等一两周。
- 这不代表没人管，只是大家需要挤时间。**请多一点耐心**，不用反复催。
- 如果超过 **14 天** 还没有任何回复，可以在 PR 里礼貌地 ping 一次 `@maintainers`，或者开个 Issue 问一下。语气友好一点，效果更好。
- 如果你自己比较急，也可以在 PR 描述里写一句“我这边不着急，审校老师方便时再看就行”，大家都会轻松一些。

**礼貌、具体、有依据**，讨论会很顺。大家都是来帮忙的，不用有压力。

---

### 6.5 常见问题（老师最常问的）

**Q0：GitHub 打不开怎么办？**

可以使用 [visiting-Github-without-VPN-successfully](https://github.com/miaoxintechnology/visiting-Github-without-VPN-successfully) 脚本，具体使用方法见该项目的 README。

**Q1：我不会写代码，能用 AI 生成一个动画再提交吗？**
可以呀。用 AI 生成没关系，但你要自己打开看一遍，核对公式、方向、单位、文案对不对。提交时在 README 里说明哪些部分用了 AI。审校对 AI 生成内容一视同仁，不会因为“是 AI 写的”就放宽标准，也不会因此拒绝。

**Q2：我的课件有好几个文件（HTML + 图片），怎么上传？**
路线 A 第四步里，用 **Add file → Upload files**，把整个文件夹拖进去就行。或者在网页上逐个 **Create new file**。注意保持目录结构，HTML 放在课件目录根下，图片放在 `assets/` 下。

**Q3：我上传后图片显示不出来怎么办？**
最常见的原因是路径写错了。比如 HTML 里写 `src="assets/a.png"`，那图片就必须在 `课件目录/assets/a.png`。检查大小写，GitHub 的路径是区分大小写的。另外不要用 `C:\...` 这种本地绝对路径。

**Q4：HTML 文件必须叫 `index.html` 吗？**
不必须。可以叫 `convex_lens_show.html`、`induction_lab.html` 等有意义的名字。只要双击能打开就行。建议在 README 里写清楚主 HTML 文件名。

**Q5：需要放预览图吗？**
不需要。本项目不要求 `preview.png`。你可以在 PR 描述里贴一张截图方便审校，但课件目录里不用放。

**Q6：我的课件引用了外部 CDN 上的库，可以吗？**
可以。本项目**不禁止**使用外部 CDN、在线 API、在线字体、在线库。只要课件能正常打开、核心功能免费、不需要登录或付费，就可以收录。不过建议在 README 里注明用了哪些外部资源，方便别人了解。

**Q7：我的课件需要登录才能用，能提交吗？**
这个不行哦。本项目**不接受需要登录、注册、付费、订阅才能使用的课件**，也不接受把核心功能藏在付费墙后面的“试用版”。课件得打开即用、核心功能免费。

**Q8：PR 提交后一直没人理怎么办？**
先别着急，审校者都是志愿者，时间比较零散，等几天甚至一两周是正常的。超过 **14 天** 还没有任何回复，可以在 PR 里礼貌地 ping 一次 `@maintainers`，或者开个 Issue 问一下，可能是大家没看到。**不要反复催**，友好一点，大家都舒服。

**Q9：PR 被拒了怎么办？**
维护者会说明理由（见第 12 节常见被拒原因）。按意见修改后，在同一个 PR 里继续提交就行，不用重开。

**Q10：我改错了，想撤销怎么办？**
路线 A：在 PR 里继续提交一个修正版本就行，不用撤销。路线 B：`git revert` 或继续 commit 修正。实在不确定，在 PR 里说明情况，维护者会帮你。

**Q11：我能一次提交好几个课件吗？**
建议**一个 PR 只提交一个课件**。这样审校、讨论、回滚都方便。多个课件分多个 PR 就好。

**Q12：我不会用 Git，也不想注册 GitHub，还能贡献吗？**
可以先开 Issue 说明你有课件，维护者会协助你。但长期来看，注册一个 GitHub 账号是最方便的，免费，几分钟搞定。

**Q13：Fork 和 Clone 有什么区别？**
Fork 是在 GitHub 网站上“复制一份到你账号下”；Clone 是把仓库“下载到你自己电脑上”。路线 A 只用 Fork，不用 Clone。

**Q14：什么是分支？我必须建分支吗？**
分支就是一个“工作区”。是的，得建分支，**不要直接在 `main` 上改**。路线 A 第四步提交时会自动帮你建分支，路线 B 用 `git checkout -b` 建。这样主项目不会被你直接改动，审校也方便。

**Q15：作者名怎么写？**
目录名里的作者英文名，中文名按“名在前、姓在后”的拼音，首字母大写，用下划线连接。比如张三写成 `San_Zhang`，赵丽丽写成 `Lili_Zhao`。也可以用自己的英文名，比如 `Eric_Liu`。版权属于组织就写组织英文名，比如 `Miaoxin_Technology`。名字里有空格一律换成下划线——**这只是目录名的规则**。PR 标题、README、LICENSE 里正常写空格就好，比如 `San Zhang`、`Lili Zhao`。

**Q16：目录名里的括号和中文在命令行里报错怎么办？**
命令行里路径有括号时，用引号把整个路径括起来，比如：

```bash
git add "junior_high/optics/convex_lens/convex_lens_show(San_Zhang)"
```

网页操作不受影响。

**Q17：写 README.md 用什么工具比较好？**
推荐 [Mark Text](https://www.marktext.cc/)，免费开源、跨平台、左边写右边实时预览，操作很直观，不需要学 Markdown 语法也能看懂效果。不想装软件的话，直接用 GitHub 网页编辑也行。

**Q18：LICENSE 里年份和作者怎么填？**
用第 5.1 节的 MIT 模板，把 `[year]` 改成当前年份，把 `[fullname]` 改成你的名字，正常写空格就好，比如 `Copyright (c) 2025 San Zhang` 或 `Copyright (c) 2025 张三`。README 里的版权说明也要和它一致。

**Q19：审校要等多久？我很着急。**
审校者都是志愿者，平时有自己的事情，时间很零散。**不保证 48 小时内回复**，等几天甚至一两周都正常。如果确实比较急，可以在 PR 描述里说明情况，但请理解大家的时间。超过 14 天没动静，可以礼貌 ping 一次 `@maintainers`。

**Q20：为什么目录名要用下划线，其他地方不用？**
因为 GitHub、命令行、URL 对空格兼容性不好，目录名和文件名里的空格统一用下划线 `_` 替换，避免各种奇怪的问题。但 PR 标题、commit message、README 正文、LICENSE、Issue 描述这些地方，正常使用空格就好，读起来也更自然。**下划线只是目录名和文件名的兼容规则，不是全项目规则。**

**Q21：高中课件和初中课件的提交方式一样吗？**
完全一样，只是目录不同：初中放 `junior_high/<主题>/`，高中放 `senior_high/<主题>/`。README 里的“适用年级”写清楚是高中必修、选择性必修还是选修，方便老师按教材查找。

**Q22：分类里没有我要的主题怎么办？**
自己开一个就行。在 `junior_high/` 或 `senior_high/` 下新建一个主题目录，名字用小写英文 + 下划线，比如 `nuclear_physics`、`fluid_mechanics`、`astrophysics`。创建方法同第四步，输入文件名时把新主题名带上，比如 `nuclear_physics/half_life_demo(San_Zhang)/half_life_demo.html`。PR 描述里简单说明一下为什么新增这个主题，审校时一起确认。

**Q23：我自己新建的主题名有没有命名规范？**
建议用小写英文 + 下划线，尽量简短、能概括主题内容，比如 `nuclear_physics`、`fluid_mechanics`。不要用空格、中文、特殊字符。如果拿不准，可以在 PR 描述里说明你想用的名字，审校时一起商量。

---

### 6.6 PR 提交前最后过一遍

- [ ] 我 fork 了项目，改的是自己的副本
- [ ] 我用了独立分支，没有直接改 `main`
- [ ] 课件放在 `junior_high/<主题>/<子主题>/<课件名>(<作者>)/` 或 `senior_high/<主题>/<子主题>/<课件名>(<作者>)/` 下；如果新建了主题，主题名符合规范
- [ ] 目录名和文件名里的空格用下划线替换，没有留空格
- [ ] 有 HTML 文件，能正常打开，不必须叫 `index.html`
- [ ] 有 `README.md`，用中文写，按模板填好了介绍、使用方法、版权说明；高中课件写清了必修/选择性必修/选修
- [ ] 有 `LICENSE`，使用 MIT 模板并填好年份和作者
- [ ] 无需登录/付费，有交互，物理正确
- [ ] 没有侵权素材
- [ ] PR 标题正常用空格，格式正确
- [ ] PR 描述填完整，自检清单全部勾选；如果新建了主题，描述里说明了原因
- [ ] 一个 PR 只提交一个课件

---

## 7. 修改已有课件

- 小修改（错别字、单位、标注）：直接 PR，标题写 `修复：<课件名> (<作者>) — <简述>`。
- 物理逻辑修改：在 PR 描述里说明**原实现哪里不对、新实现为什么对**，并附上依据（教材页码、公式推导等）。
- 大改或重写：建议先开 Issue 聊聊，避免和原作者意图冲突，大家商量着来。

初中、高中课件修改流程一样。

---

## 8. 报告问题

用 Issue 模板，选对应类型：

- `bug-report`：课件打不开、交互失效、浏览器兼容问题
- `physics-error`：物理错误（公式、方向、单位、标注）
- `license-issue`：疑似侵权素材
- `paywall-issue`：课件出现登录、付费、订阅门槛
- `scene-request`：希望新增某个知识点的动画（初中、高中都可以提）

报告物理错误时，尽量写清。

**初中示例**：

```text
课件：junior_high/optics/convex_lens/convex_lens_show(San_Zhang)
问题位置：像距标注
现象：物距 u = 1.5f 时，像距显示为负值
期望：应为正值，成倒立放大的实像
依据：人教版八年级上册 PXX / 成像公式 1/f = 1/u + 1/v
```

**高中示例**：

```text
课件：senior_high/electromagnetism/electromagnetic_induction/induction_lab(Lili_Zhao)
问题位置：感应电流方向
现象：导体棒向右运动时，感应电流方向显示为顺时针
期望：应为逆时针
依据：人教版选择性必修二 PXX / 楞次定律 / 右手定则
```

---

## 9. 审校标准

每个 PR 至少经过下面几道审校。初中、高中课件标准一样：

### 9.1 教学审校（物理背景审校者）

- 知识点、公式、方向、单位、标注对不对
- 简化假设是否合理、是否已注明
- 有没有会误导学生的表述或动画
- 教学提示准不准
- 高中课件是否与课标、教材的表述一致

### 9.2 可用性审校（前端/维护者）

- 课件能不能在主流浏览器正常打开和交互
- 有没有出现登录、注册、付费、订阅门槛
- 有没有把核心功能藏在付费墙后面
- 文件路径对不对，资源加载正常不正常
- `README.md` 和 `LICENSE` 完不完整
- 如果新建了主题，主题名是否清晰、位置是否合理

> 说明：本项目**不检查**是否依赖外部 CDN、是否断网可用。只要课件能正常打开、核心功能免费、无需登录，就符合可用性要求。

### 9.3 版权审校（维护者）

- 素材来源是否合法
- 许可声明是否清晰
- 有没有疑似反编译自 Flash 或盗用商业课件

### 9.4 审校时间预期（请贡献者和使用者都看一下）

- 审校者都是**志愿者**，有自己的教学和本职工作，时间比较零散。
- **不承诺 48 小时内处理**，等几天甚至一两周是正常的。
- 贡献者提交 PR 后，请耐心等待；超过 **14 天** 没有任何回复，可以礼貌 ping 一次 `@maintainers`。
- 如果你比较急，可以在 PR 描述里说明，但请理解审校者也有自己的节奏。
- 维护者会尽量安排审校轮值，但无法保证实时响应。

大家都是来帮忙的，互相体谅，事情才能做得长久。

---

## 10. 关于 AI 辅助生成

**欢迎用 AI 辅助生成课件**，包括代码、文案、绘图。只是有几点想提醒你：

- **提交者要对提交的内容负责**。AI 生成的公式、方向、单位、文案可能出错，请务必自己逐项核对。
- 在 `README.md` 的“AI 辅助说明”里简单说说哪些部分用了 AI、你怎么核对的。
- 如果 AI 生成了疑似侵权的素材（比如模仿某商业课件界面），就别提交了。
- 审校对 AI 生成内容**一视同仁**，不会因为“是 AI 写的”就放宽标准，也不会因此拒绝。

初中、高中课件一样。

---

## 11. 代码与内容风格（不强制）

本项目**不强制统一技术栈和代码风格**，每个课件可以自己选：

- 原生 HTML/CSS/JS、Canvas、SVG、WebGL 都行
- 可以用 Vue、React、Svelte 等框架，但请确保构建产物是能直接打开的静态文件
- 可以用轻量库（如 d3、p5.js），**允许从 CDN 引入**，也允许本地打包
- HTML 文件不必须命名为 `index.html`，取个有意义的名字就好
- 建议在 `README.md` 里注明用了什么技术栈和外部依赖，方便别人维护

硬性要求只有三条：**能正常打开、核心功能免费、无需登录或付费**。

---

## 12. 常见被拒原因

| 原因          | 说明                               |
| ----------- | -------------------------------- |
| 需要登录/注册     | 打开课件要求账号，不符合收录标准                 |
| 需要付费/订阅     | 核心功能收费，或把功能藏在付费墙后                |
| 纯视频/纯 GIF   | 没有交互，不属于演示课件                     |
| 物理错误未修正     | 公式、方向、单位有误且未注明                   |
| 素材来源不明      | 无法确认许可，存在侵权风险                    |
| 反编译 Flash   | 版权和许可均不可接受                       |
| 无 README    | 缺少中文介绍、使用方法、版权说明                 |
| 无 LICENSE   | 缺少课件许可证                          |
| 目录名或文件名有空格  | 需要把空格换成下划线                       |
| 目录命名不规范     | 没有按 `<课件名>(<作者>)` 命名             |
| 学段放错        | 初中课件放到了 `senior_high/`，或高中课件放到了 `junior_high/` |
| 主题名不规范      | 新建主题名用了中文、空格或特殊字符，建议改成小写英文 + 下划线 |
| 文件路径错误      | 本地打开图片/音频丢失                      |
| 只支持特定系统     | 如仅 Windows 可运行，需在 README 注明并说明原因 |
| PR 直接改 main | 未使用独立分支，无法审校                     |
| PR 混杂多个课件   | 一个 PR 只做一件事，便于审校和回滚              |

> 再强调一下：**依赖外部 CDN 不是被拒原因**。只要课件能正常打开、核心功能免费、无需登录，就可以收录。**PR 标题、commit message、README 正文里用空格也是完全没问题的**，不会被拒。**新建主题也是欢迎的**，只要主题名清晰、位置合理，PR 里说明一下就行。

---

## 13. 行为准则

- 尊重每一位贡献者，包括老师、学生和 AI 辅助创作者。
- 对物理错误的讨论，请基于教材、公式和实验事实，不人身攻击。
- 审校意见请具体、可执行，避免“感觉不对”这类模糊反馈。
- 维护者有权拒绝不符合收录标准的提交，并说明理由。
- **尊重审校者的时间**：审校是志愿工作，不承诺 48 小时内响应，请耐心等待，避免反复催促。

大家都是来帮忙的，和气、具体、有依据，事情就能做得长久。

---

## 14. 有问题？

- 不确定分类、命名、许可：开 Issue 问，标签 `question`
- 找不到合适的主题：先看看已有主题，确实没有就自己新建一个，PR 里说明一下
- 不确定主题名怎么起：开 Issue 问，或先起一个简短的小写英文名，审校时一起商量
- 想找一件事做：看 `good first issue` 和 `scene-request`
- 不熟悉 Git / PR：直接开 Issue 说“我有一个课件但不会提交”，维护者会协助你
- 想看别人怎么提交的：翻一翻已经合并的 PR，照着做一遍就懂了
- 等审校等得有点久：先别急，审校者都是志愿者，超过 14 天没动静再礼貌 ping 一次 `@maintainers`

## 15. 用 AI 助手提问

Issue 里有两个触发词，别用混了：

| 触发词 | 它是什么 | 适合用来 |
| --- | --- | --- |
| `@deepseek` | 直接调用 DeepSeek 模型接口，只回答，不改仓库 | 物理问题、投稿流程、目录命名、许可怎么选 |
| `@infer` | `infer-action` Agent，会读文件、跑命令、改代码、开 PR | 明确要求改某个课件、修某个 bug、新增一个文件 |

- **新建 Issue**：模板已经默认填好 `@deepseek`，一般不用改，提交后就会自动回答。
- **评论里继续问**：写 `@deepseek 你的问题`。
- **要 AI 动手改**：写 `@infer 把 xxx 改成 yyy`。它会新建分支、改文件、提交并开 PR，不会直接改 `main`。
- 每个回答、每次改动都会单独留一条评论，历史不会被后来的覆盖，可以往回翻。
- 问答通道回答前会读本仓库的 README 和 CONTRIBUTING，所以「许可用哪个」「目录怎么命名」这类问题它会按仓库约定答。

> AI 也会出错，尤其是物理结论和细节规则。**以 README、CONTRIBUTING 和审校者的意见为准**；发现 AI 答错，直接在 Issue 里指出来即可。

再次感谢你的贡献。**初中高中都欢迎，谁都可以做，谁都可以交，没有合适的主题就自己开一个**，这个库靠每一位贡献者一点点长起来。慢慢来，不着急 🌱



Miaoxin Technology

2026年10月24日
