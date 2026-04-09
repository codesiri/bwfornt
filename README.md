<div align="center">
  <img alt="河南百维MES" width="120" height="120" src="./src/assets/logo.png">
  <h1>河南百维 MES 管理系统</h1>
  <h3>Henan Baiwei Manufacturing Execution System</h3>

  <img src="https://img.shields.io/badge/Vue-3.5.22-brightgreen.svg"/>
  <img src="https://img.shields.io/badge/Vite-7.1.12-green.svg"/>
  <img src="https://img.shields.io/badge/Element Plus-2.11.7-blue.svg"/>
  <img src="https://img.shields.io/badge/TypeScript-5.9.3-blue.svg"/>
  <img src="https://img.shields.io/badge/license-MIT-green.svg"/>
  <img src="https://img.shields.io/badge/Node-20.19.0-yellow.svg"/>

  <br/>

  <a href="https://gitee.com/henanbaiwei" target="_blank">
      <img src="https://img.shields.io/badge/Author-河南百维信息科技有限公司-orange.svg"/>
  </a>
  <a href="https://www.henanbaiwei.com" target="_blank">
      <img src="https://img.shields.io/badge/Website-河南百维官网-blue.svg"/>
  </a>

</div>

---

## 目录

- [公司简介](#公司简介)
- [项目简介](#项目简介)
- [功能模块](#功能模块)
- [项目截图](#项目截图)
- [技术栈](#技术栈)
- [环境要求](#环境要求)
- [项目搭建详细步骤](#项目搭建详细步骤)
- [项目结构](#项目结构)
- [开发规范](#开发规范)
- [常用命令](#常用命令)
- [配置说明](#配置说明)
- [接口文档](#接口文档)
- [项目部署](#项目部署)
- [常见问题](#常见问题)
- [技术支持](#技术支持)
- [提交规范](#提交规范)
- [更新日志](#更新日志)

---

## 公司简介

河南百维信息科技有限公司是一家专注于制造业数字化转型的高新技术企业，致力于为制造企业提供全面的MES（制造执行系统）解决方案。公司拥有一支经验丰富的研发团队和完善的售后服务体系，为客户提供从方案设计、系统开发、实施培训到售后维护的全流程服务。

**成立时间**：2015年

**主要业务**：
- MES 系统开发与实施
- 工业自动化控制系统
- 数据采集与监控系统
- 智能制造解决方案

**服务行业**：汽车零部件、电子电器、机械制造、食品加工、医药化工等

**官方网站**：www.henanbaiwei.com

## 项目简介

河南百维 MES 管理系统是基于 Vue3 + Vite + TypeScript + Element-Plus 技术栈开发的企业级生产制造执行系统。系统严格遵循《GB/T 25103-2010 制造执行系统体系结构》国家标准设计，采用前后端分离架构，支持分布式部署，能够与企业现有的 ERP、WMS、SCADA 等系统无缝对接。

**核心价值**：
- 实现生产过程的全程可视化监控
- 提升生产效率和产品质量
- 降低生产成本和人为错误
- 实现生产数据的实时采集和分析

**主要特性**：
- 模块化设计，灵活配置
- 支持多工厂、多车间组织架构
- 完善的权限管理和审计追踪
- 响应式设计，支持移动端访问
- 支持私有化部署和云端部署

## 功能模块

本系统包含以下核心功能模块：

### 1. 生产管理模块

| 功能 | 说明 |
| ---- | ---- |
| 生产工单 | 工单创建、审批、下发、跟踪、完工全套流程管理 |
| 生产报工 | 工序级报工，支持扫码报工、移动端报工 |
| 车间调度 | 车间作业排程、资源调度可视化 |
| 生产追踪 | 产品序列号追溯，完整生产过程记录 |

### 2. 设备管理模块

| 功能 | 说明 |
| ---- | ---- |
| 设备台账 | 设备基本信息、维修记录、备件信息管理 |
| 点检巡检 | 设备日常点检、定期巡检计划执行 |
| 维保计划 | 设备保养计划、预防性维护管理 |
| 故障报修 | 设备故障报修、维修派工、维修记录 |
| 电气柜管理 | 抽屉单元、主要部件、备件管理 |

### 3. 质量管理模块

| 功能 | 说明 |
| ---- | ---- |
| 来料检验 | IQC 来料质量检验，合格供应商管理 |
| 过程检验 | IPQC 过程质量控制，关键工序检验 |
| 成品检验 | FQC 成品检验，出货检验管理 |
| 质量追溯 | 质量问题分析，批次追溯管理 |

### 4. 温度仪表模块

| 功能 | 说明 |
| ---- | ---- |
| 仪表台账 | 温度仪表设备信息管理 |
| 温度监控 | 实时温度数据采集和监控 |
| 报警管理 | 温度超限报警设置和处理 |
| 历史数据 | 温度历史曲线和数据分析 |

### 5. 仓库管理模块

| 功能 | 说明 |
| ---- | ---- |
| 入库管理 | 采购入库、生产入库、退货入库 |
| 出库管理 | 生产领料、销售出库、调拨出库 |
| 库存查询 | 实时库存查询，安全库存预警 |
| 盘点管理 | 定期盘点、抽检盘点管理 |

### 6. 维保管理模块

| 功能 | 说明 |
| ---- | ---- |
| 维保计划 | 设备定期保养计划制定和执行 |
| 维保记录 | 维保工作记录和统计 |
| 备件管理 | 备件库存、采购、使用记录 |

## 项目截图

### 1. 控制台首页

生产监控大屏，展示关键生产指标和实时状态。

![控制台](./screenshot/dashboard.png)

### 2. 设备管理界面

设备台账列表，支持设备新增、编辑、删除、导出等操作。

![设备管理](./screenshot/equipment.png)

### 3. 电气柜抽屉单元管理

电气柜抽屉单元的台账管理界面。

![电气柜抽屉单元](./screenshot/drawer-unit.png)

### 4. 电气柜主要部件管理

电气柜主要部件的台账管理界面。

![电气柜主要部件](./screenshot/main-component.png)

### 5. 温度仪表台账

温度仪表设备的管理界面，支持数据导入导出。

![温度仪表](./screenshot/temperature-gauge.png)

### 6. 维保管理

设备维保计划管理和执行跟踪界面。

![维保管理](./screenshot/maintenance.png)

## 技术栈

### 前端技术

| 类别 | 技术 | 版本 | 说明 |
| ---- | ---- | ---- | ---- |
| 核心框架 | Vue | 3.5.22 | 渐进式 JavaScript 框架 |
| 构建工具 | Vite | 7.1.12 | 下一代前端构建工具 |
| 开发语言 | TypeScript | 5.9.3 | JavaScript 超集，强类型 |
| UI 组件库 | Element Plus | 2.11.7 | Vue3 组件库 |
| 状态管理 | Pinia | 3.0.3 | Vue 状态管理 |
| 路由管理 | Vue Router | 4.6.3 | Vue 官方路由 |
| HTTP 客户端 | Axios | 1.13.1 | HTTP 请求库 |
| 图表库 | ECharts | 6.0.0 | 数据可视化图表 |
| 表格组件 | VXE Table | 4.6.25 | Vue 表格组件 |
| 国际化 | Vue I18n | 11.1.12 | 多语言支持 |
| 拖拽组件 | VueDraggablePlus | 0.6.0 | 拖拽排序 |
| 富文本编辑器 | WangEditor | 5.6.47 | 富文本编辑 |
| 代码编辑器 | CodeMirror | 5.65.20 | 代码编辑器 |
| Excel 处理 | ExcelJS | 4.4.0 | Excel 导入导出 |
| 工具库 | Lodash-es | 4.17.21 | JavaScript 工具库 |
| 组合式工具 | VueUse | 12.8.2 | Vue 组合式 API 工具集 |
| 树形选择 | vue3-treeselect | 0.1.10 | 树形选择组件 |
| 进度条 | NProgress | 0.2.0 | 页面加载进度条 |
| 图标库 | @element-plus/icons-vue | 2.3.2 | Element Plus 图标 |
| 动画库 | Animate.css | 4.1.1 | CSS 动画库 |
| STOMP 协议 | @stomp/stompjs | 7.2.1 | WebSocket 消息协议 |

### 开发工具

| 类别 | 工具 | 版本 | 说明 |
| ---- | ---- | ---- | ---- |
| 代码检查 | ESLint | 9.39.1 | JavaScript 代码检查 |
| 代码格式化 | Prettier | 3.6.2 | 代码格式化 |
| 样式检查 | Stylelint | 16.25.0 | CSS 代码检查 |
| Git 钩子 | Husky | 9.1.7 | Git 钩子管理 |
| 提交规范 | Commitlint | 19.8.1 | Git 提交信息规范 |
| 交互式提交 | Commitizen | 4.3.1 | 交互式 Git 提交 |
| CI 工具 | lint-staged | 15.5.2 | Git 暂存区 lint |
| 构建工具 | UnoCSS | 66.5.4 | 原子化 CSS |
| 自动导入 | unplugin-auto-import | 19.3.0 | 组件自动导入 |
| Vue 组件库 | unplugin-vue-components | 28.8.0 | 组件自动导入 |
| Mock 服务 | vite-plugin-mock-dev-server | 1.9.3 | 本地 Mock 服务 |

## 环境要求

### 硬件要求

| 配置项 | 最低要求 | 推荐配置 |
| ---- | ---- | ---- |
| CPU | 1核 | 4核及以上 |
| 内存 | 4GB | 8GB及以上 |
| 硬盘 | 10GB 可用空间 | 20GB及以上 |
| 显示器 | 1280x720 | 1920x1080 |

### 软件要求

| 环境类型 | 版本要求 | 说明 |
|---------|---------|------|
| **Node.js** | `^20.19.0` 或 `>=22.12.0` | 推荐使用 LTS 版本（偶数主版本） |
| **pnpm** | `>= 8.0.0` | 项目使用 pnpm 作为包管理器 |
| **npm** | `>= 10.0.0` | Node.js 自带 |
| **Git** | `>= 2.30.0` | 版本控制工具 |
| **开发工具** | VSCode 最新版 | 推荐安装以下插件 |

### 推荐 VSCode 插件

| 插件名称 | 插件ID | 功能 |
|---------|--------|------|
| Vue - Official | Vue.volar | Vue3 语言支持 |
| TypeScript Vue Plugin | Vue.vscode-volar-plugin | TypeScript 支持 |
| ESLint | dbaeumer.vscode-eslint | 代码检查 |
| Prettier | esbenp.prettier-vscode | 代码格式化 |
| Stylelint | stylelint.vscode-stylelint | 样式检查 |
| GitLens | eamodio.gitlens | Git 增强工具 |
| Auto Rename Tag | formulahendry.auto-rename-tag | HTML 标签自动重命名 |
| Auto Close Tag | formulahendry.auto-close-tag | HTML 标签自动关闭 |
| DotENV | mikestead.dotenv | .env 文件支持 |
| i18n Ally | lokalise.i18n-ally | 国际化辅助 |
| Error Lens | usernamehw.errorlens | 代码错误提示 |
| Todo Tree | gruntfuggly.todo-tree | TODO 注释高亮 |

### VSCode settings.json 配置

```json
{
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.defaultFormatter": "Vue.volar",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit"
  },
  "vetur.validation.template": false,
  "vetur.validation.script": false,
  "vetur.validation.style": false,
  "[vue]": {
    "editor.defaultFormatter": "Vue.volar"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "stylelint.vscode-stylelint"
  },
  "[css]": {
    "editor.defaultFormatter": "stylelint.vscode-stylelint"
  },
  "stylelint.validate": ["css", "scss", "vue"],
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "javascript.preferences.importModuleSpecifier": "non-relative"
}
```

## 项目搭建详细步骤

### 第一步：安装 Node.js

1. 访问 Node.js 官网 https://nodejs.org/
2. 下载 LTS 版本（推荐 v20.x 或 v22.x）
3. 运行安装程序，按提示完成安装
4. 打开终端（Windows 用户使用 PowerShell 或 CMD），验证安装：

```bash
# 查看 Node.js 版本
node -v
# v20.19.0 或 v22.12.0

# 查看 npm 版本
npm -v
# 10.x.x
```

> **提示**：如果已安装 Node.js，可以使用 nvm（Windows 下使用 nvm-windows）管理多个 Node.js 版本。

### 第二步：安装 pnpm

项目使用 pnpm 作为包管理器，需要全局安装：

```bash
# 使用 npm 全局安装 pnpm
npm install -g pnpm

# 验证安装
pnpm -v
# 10.32.1
```

**Windows 用户注意事项**：
- 如果遇到权限错误，请以管理员身份运行终端
- 或者使用 `npm install -g pnpm --force`

**macOS/Linux 用户注意事项**：
- 如果遇到权限错误，可能需要使用 `sudo`
- 或配置 npm 全局目录的写入权限

### 第三步：配置 pnpm 镜像源（可选，国内加速）

为加快依赖下载速度，建议配置国内镜像源：

```bash
# 方法一：设置淘宝镜像（推荐）
pnpm config set registry https://registry.npmmirror.com

# 方法二：设置华为镜像
pnpm config set registry https://repo.huaweicloud.com/repository/npm/

# 方法三：设置腾讯云镜像
pnpm config set registry https://mirrors.cloud.tencent.com/npm/

# 验证配置
pnpm config get registry
```

### 第四步：安装 Git

1. 访问 Git 官网 https://git-scm.com/download/win
2. 下载 Windows 版 Git
3. 运行安装程序，建议使用默认配置
4. 验证安装：

```bash
git --version
# git version 2.43.0
```

### 第五步：克隆项目代码

```bash
# 克隆代码（替换为实际仓库地址）
git clone https://gitee.com/henanbaiwei/mes-admin.git

# 切换到项目目录
cd mes-admin

# 查看项目目录
ls -la
```

### 第六步：安装项目依赖

```bash
# 使用 pnpm 安装依赖
pnpm install

# 或者指定镜像源安装
pnpm install --registry https://registry.npmmirror.com
```

**依赖安装说明**：
- 首次安装会比较慢，请耐心等待
- 确保网络连接稳定
- 如果长时间无响应，可以尝试 Ctrl+C 取消后重新执行

**pnpm 常用操作**：

```bash
# 清理缓存
pnpm store prune

# 查看已安装的包
pnpm list

# 查看可更新的包
pnpm outdated

# 更新所有包
pnpm update

# 更新特定包
pnpm update package-name
```

### 第七步：配置环境变量

项目根目录下有两个环境变量文件：

**`.env.development`** - 开发环境：
```env
# 开发环境 API 地址
VITE_APP_API_URL=http://localhost:8989

# 是否启用 Mock 服务（true=启用，false=禁用）
VITE_MOCK_DEV_SERVER=false

# 应用标题
VITE_APP_TITLE=河南百维 MES 系统

# 应用版本
VITE_APP_VERSION=1.0.0
```

**`.env.production`** - 生产环境：
```env
# 生产环境 API 地址
VITE_APP_API_URL=https://api.henanbaiweimes.com

# 是否启用 Mock 服务
VITE_MOCK_DEV_SERVER=false

# 应用标题
VITE_APP_TITLE=河南百维 MES 系统

# 应用版本
VITE_APP_VERSION=1.0.0
```

### 第八步：启动开发服务器

```bash
# 启动开发服务器
pnpm run dev
```

启动成功后会看到类似以下输出：

```
  VITE v7.1.12  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
  ➜  press h + enter to show help
```

### 第九步：在浏览器中访问

1. 打开浏览器（推荐使用 Chrome、Firefox、Edge）
2. 访问 http://localhost:5173/

**默认管理员账号**：
- 用户名：`admin`
- 密码：`admin123`

> **警告**：生产环境务必修改默认密码！

### 第十步：开始开发

项目启动成功后，你可以开始进行开发工作。推荐使用 VSCode 作为开发工具。

**常用开发快捷键**：

| 快捷键 | 功能 |
| ---- | ---- |
| Ctrl + S | 保存文件 |
| Ctrl + P | 快速打开文件 |
| Ctrl + Shift + F | 全局搜索 |
| Ctrl + H | 文件替换 |
| F2 | 重命名符号 |
| Alt + Shift + F | 格式化文档 |

## 项目结构

### 目录结构详解

```
mes-admin/
├── public/                        # 静态资源目录（不会被构建）
│   └── favicon.ico               # 网站 favicon 图标
│
├── src/                          # 项目源代码目录
│   ├── api/                      # API 接口目录
│   │   ├── ledger/              # 台账相关接口
│   │   │   ├── electric-cabinet-drawer-unit-api.ts   # 抽屉单元接口
│   │   │   ├── electric-cabinet-fault-api.ts          # 电气故障接口
│   │   │   ├── electric-cabinet-inspection-api.ts     # 电气点检接口
│   │   │   ├── electric-cabinet-main-component-api.ts # 主要部件接口
│   │   │   └── electric-cabinet-spare-part-api.ts    # 备件管理接口
│   │   └── index.ts              # API 统一导出
│   │
│   ├── assets/                   # 资源文件（会被构建）
│   │   ├── images/              # 图片资源
│   │   └── logo.png            # 系统 logo
│   │
│   ├── components/              # 公共组件
│   │   ├── common/             # 通用组件
│   │   │   ├── Pagination.vue  # 分页组件
│   │   │   ├── FileUpload.vue  # 文件上传组件
│   │   │   └── ...
│   │   └── business/           # 业务组件
│   │
│   ├── hooks/                   # 组合式函数（Vue Composition API）
│   │   ├── usePagination.ts    # 分页 hook
│   │   ├── useModal.ts         # 弹窗 hook
│   │   ├── useDict.ts          # 字典 hook
│   │   └── useAuth.ts          # 权限 hook
│   │
│   ├── router/                  # 路由配置
│   │   ├── index.ts           # 路由入口
│   │   ├── routes.ts          # 路由定义
│   │   └── guards.ts          # 路由守卫
│   │
│   ├── stores/                 # Pinia 状态管理
│   │   ├── user.ts            # 用户状态
│   │   ├── permission.ts      # 权限状态
│   │   ├── dict.ts            # 字典状态
│   │   └── settings.ts        # 系统设置
│   │
│   ├── styles/                 # 全局样式
│   │   ├── variables.scss     # 全局变量
│   │   ├── mixins.scss        # 混入
│   │   ├── reset.scss         # 样式重置
│   │   └── index.scss         # 全局样式入口
│   │
│   ├── utils/                  # 工具函数
│   │   ├── request.ts         # Axios 封装
│   │   ├── storage.ts         # 存储封装
│   │   ├── validate.ts        # 表单验证
│   │   └── format.ts          # 格式化工具
│   │
│   ├── views/                  # 页面视图
│   │   ├── ledger/            # 台账管理模块
│   │   │   ├── dv-temperature-gauge/           # 温度仪表
│   │   │   │   ├── components/                # 子组件
│   │   │   │   │   ├── table-data.vue        # 表格数据
│   │   │   │   │   └── maintance.vue         # 维保记录
│   │   │   │   ├── index.vue                  # 主页面
│   │   │   │   ├── index.ts                    # 入口文件
│   │   │   │   └── import-data.vue           # 导入数据
│   │   │   ├── electric-cabinet-drawer-unit/  # 抽屉单元
│   │   │   ├── electric-cabinet-fault/        # 电气故障
│   │   │   ├── electric-cabinet-inspection/   # 电气点检
│   │   │   ├── electric-cabinet-main-component/  # 主要部件
│   │   │   ├── electric-cabinet-record/        # 电气记录
│   │   │   └── electric-cabinet-spare-part/    # 备件管理
│   │   │
│   │   ├── maintenance/       # 维保管理模块
│   │   │
│   │   ├── dashboard/         # 控制台
│   │   ├── login/             # 登录页
│   │   ├── profile/           # 个人中心
│   │   └── system/           # 系统管理
│   │
│   ├── App.vue                # 根组件
│   ├── main.ts               # 入口文件
│   └── permission.ts         # 权限控制入口
│
├── .env.development          # 开发环境变量
├── .env.production            # 生产环境变量
├── .env.test                  # 测试环境变量
│
├── .eslintrc.cjs              # ESLint 配置
├── .eslintrc.auto-import.cjs # ESLint 自动导入配置
├── .prettierrc.cjs            # Prettier 配置
├── .stylelintrc.cjs           # Stylelint 配置
│
├── .editorconfig              # 编辑器配置
├── .gitignore                 # Git 忽略配置
├── .npmrc                     # npm 配置
│
├── index.html                 # HTML 入口文件
├── package.json               # 项目配置
├── pnpm-lock.yaml             # pnpm 锁定文件
├── tsconfig.json              # TypeScript 配置
├── tsconfig.node.json         # TypeScript Node 配置
├── vite.config.ts             # Vite 配置
├── vitest.config.ts           # Vitest 测试配置
│
└── README.md                   # 项目文档
```

### 文件命名规范

| 类型 | 规范 | 示例 |
| ---- | ---- | ---- |
| 组件文件 | PascalCase.vue | `UserDialog.vue` |
| 组合式函数 | camelCase.ts | `usePagination.ts` |
| API 文件 | kebab-case-api.ts | `user-api.ts` |
| 样式文件 | kebab-case.scss | `common-dialog.scss` |
| 视图文件 | index.vue | `user/index.vue` |

## 开发规范

### 代码规范

项目使用 ESLint + Prettier + Stylelint 保证代码风格统一。

**HTML/CSS 规范**：
- 使用 2 空格缩进
- CSS 类名使用 kebab-case
- 避免使用行内样式（特殊情况除外）

**TypeScript 规范**：
- 使用 TypeScript 严格模式
- 接口命名使用 PascalCase，可加 `I` 前缀
- 类型命名使用 PascalCase
- 枚举成员使用 PascalCase

```typescript
// 推荐
interface UserInfo {
  id: number
  name: string
  email?: string
}

type UserStatus = 'active' | 'inactive' | 'banned'

enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST'
}

// 不推荐
interface userInfo {
  id: Number
  Name: string
}
```

**Vue 组件规范**：

```vue
<!-- 1. 组件结构顺序 -->
<template>
  <!-- 模板内容 -->
</template>

<script setup lang="ts">
// 2. 导入
import { ref, computed, watch } from 'vue'
import type { PropType } from 'vue'

// 3. 类型定义
interface TableColumn {
  prop: string
  label: string
  width?: number
}

// 4. Props 定义
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: () => []
  }
})

// 5. Emits 定义
const emit = defineEmits<{
  (e: 'update', value: string): void
  (e: 'close'): void
}>()

// 6. 组合式函数
const { loading, fetchData } = useRequest()

// 7. 响应式状态
const data = ref([])

// 8. 计算属性
const tableData = computed(() => data.value)

// 9. 监听器
watch(() => props.title, (newVal) => {
  console.log('title changed:', newVal)
})

// 10. 方法
function handleClick() {
  emit('update', 'new value')
}

// 11. 生命周期
onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
/* 样式内容 */
</style>
```

### Git 提交规范

项目使用 Commitlint 规范 Git 提交信息。

**提交信息格式**：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型**：

| 类型 | 说明 |
| ---- | ---- |
| feat | 新功能 |
| fix | 修复 bug |
| docs | 文档更新 |
| style | 代码格式调整（不影响功能） |
| refactor | 重构（不是修复 bug） |
| perf | 性能优化 |
| test | 测试相关 |
| chore | 构建/工具相关 |
| revert | 回退 |

**Scope 范围**：

| 范围 | 说明 |
| ---- | ---- |
| ledger | 台账模块 |
| equipment | 设备模块 |
| production | 生产模块 |
| quality | 质量模块 |
| warehouse | 仓库模块 |
| system | 系统模块 |
| ui | UI 组件 |
| api | 接口 |
| router | 路由 |
| store | 状态管理 |

**提交示例**：

```bash
# 新功能
git commit -m "feat(equipment): 添加设备点检功能"

# 修复 bug
git commit -m "fix(ledger): 修复温度仪表数据导出失败的问题"

# 文档更新
git commit -m "docs: 更新 README 文档"

# 重构
git commit -m "refactor(api): 重构请求拦截器逻辑"

# 提交样式
git commit -m "style(ui): 调整表格组件样式"
```

**使用交互式提交**：

```bash
pnpm run commit
```

## 常用命令

### 开发命令

| 命令 | 说明 | 示例 |
| ---- | ---- | ---- |
| `pnpm run dev` | 启动开发服务器 | `pnpm run dev` |
| `pnpm run dev:https` | 启动开发服务器（HTTPS） | `pnpm run dev:https` |
| `pnpm run build` | 构建生产版本 | `pnpm run build` |
| `pnpm run build:test` | 构建测试版本 | `pnpm run build:test` |
| `pnpm run preview` | 预览生产构建 | `pnpm run preview` |

### 代码检查与格式化

| 命令 | 说明 |
| ---- | ---- |
| `pnpm run type-check` | TypeScript 类型检查 |
| `pnpm run lint` | 运行所有 linter |
| `pnpm run lint:eslint` | ESLint 检查并修复 |
| `pnpm run lint:prettier` | Prettier 格式化 |
| `pnpm run lint:stylelint` | Stylelint 检查并修复 |

### Git 命令

| 命令 | 说明 |
| ---- | ---- |
| `pnpm run commit` | 交互式提交 |
| `pnpm run prepare` | 安装 Husky Git hooks |

### 其他命令

| 命令 | 说明 |
| ---- | ---- |
| `pnpm install` | 安装依赖 |
| `pnpm add <package>` | 添加依赖 |
| `pnpm remove <package>` | 移除依赖 |
| `pnpm update` | 更新依赖 |
| `pnpm store prune` | 清理 pnpm store |

## 配置说明

### 接口地址配置

开发环境和生产环境的接口地址需要在环境变量文件中配置。

**开发环境** (`.env.development`)：

```env
# API 基础地址
VITE_APP_API_URL=http://localhost:8989

# API 前缀（部分接口需要）
VITE_APP_API_PREFIX=/prod-api

# 是否启用 Mock 服务
VITE_MOCK_DEV_SERVER=false

# WebSocket 地址
VITE_APP_WS_URL=ws://localhost:8989/ws
```

**生产环境** (`.env.production`)：

```env
# API 基础地址
VITE_APP_API_URL=https://api.henanbaiwei.com

# API 前缀
VITE_APP_API_PREFIX=/prod-api

# 是否启用 Mock 服务
VITE_MOCK_DEV_SERVER=false

# WebSocket 地址
VITE_APP_WS_URL=wss://api.henanbaiwei.com/ws
```

### 启用本地 Mock 数据

当后端接口尚未准备好时，可以启用本地 Mock 服务：

1. 修改 `.env.development` 文件：
```env
VITE_MOCK_DEV_SERVER=true
```

2. 在 `src/mock/` 目录下创建 Mock 数据文件：
```typescript
// src/mock/equipment.ts
import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock([
  {
    url: '/api/equipment/list',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          list: [
            { id: 1, name: '设备A', status: 'running' },
            { id: 2, name: '设备B', status: 'stopped' }
          ],
          total: 2
        }
      }
    }
  }
])
```

### 请求封装说明

项目使用 Axios 封装请求，配置文件位于 `src/utils/request.ts`。

**主要功能**：
- 自动添加请求前缀
- 请求超时设置
- 请求/响应拦截器
- Token 自动刷新
- 错误处理
- 请求取消

**使用示例**：

```typescript
import request from '@/utils/request'

// GET 请求
request.get('/equipment/list', { params: { page: 1, size: 10 } })

// POST 请求
request.post('/equipment/add', data)

// PUT 请求
request.put('/equipment/update', data)

// DELETE 请求
request.delete('/equipment/delete', { data: { id: 1 } })
```

### 路由配置说明

路由配置文件位于 `src/router/routes.ts`。

**静态路由**（无需权限）：
```typescript
{
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: { title: '登录', hidden: true }
}
```

**动态路由**（需要权限）：
```typescript
{
  path: '/ledger/equipment',
  name: 'Equipment',
  component: () => import('@/views/ledger/equipment/index.vue'),
  meta: {
    title: '设备台账',
    icon: 'equipment',
    permission: 'equipment:view'
  }
}
```

### 权限控制说明

**按钮级别权限**：

```vue
<template>
  <el-button v-if="hasPermission('equipment:add')">新增</el-button>
  <el-button v-if="hasPermission('equipment:edit')">编辑</el-button>
  <el-button v-if="hasPermission('equipment:delete')">删除</el-button>
</template>

<script setup>
import { hasPermission } from '@/hooks/useAuth'
</script>
```

**页面级别权限**：
```typescript
// router/guards.ts
router.beforeEach((to, from, next) => {
  if (to.meta.permission && !hasPermission(to.meta.permission)) {
    ElMessage.error('没有访问权限')
    next('/403')
  }
  next()
})
```

## 接口文档

### 接口规范

**请求格式**：
- Content-Type: `application/json`
- 编码格式: `UTF-8`

**响应格式**：
```typescript
// 成功响应
{
  "code": 0,        // 状态码，0 表示成功
  "msg": "success", // 消息
  "data": {}        // 数据
}

// 失败响应
{
  "code": 40001,    // 错误码
  "msg": "参数错误", // 错误信息
  "data": null      // 数据
}
```

### 主要接口列表

| 模块 | 接口前缀 | 说明 |
| ---- | -------- | ---- |
| 设备台账 | `/ledger/equipment` | 设备信息管理 |
| 抽屉单元 | `/ledger/drawer-unit` | 抽屉单元管理 |
| 主要部件 | `/ledger/main-component` | 主要部件管理 |
| 备件管理 | `/ledger/spare-part` | 备件管理 |
| 电气点检 | `/ledger/inspection` | 电气点检管理 |
| 电气故障 | `/ledger/fault` | 电气故障管理 |
| 温度仪表 | `/ledger/temperature-gauge` | 温度仪表管理 |
| 维保管理 | `/maintenance` | 维保计划管理 |

### 接口调试

推荐使用 Apifox 进行接口调试和文档管理：
- Apifox 下载地址：https://www.apifox.cn/
- 导入项目 API 文档
- 配置环境变量
- 开始调试

## 项目部署

### 构建前检查

1. **检查环境变量**：确保生产环境配置正确
```env
# .env.production
VITE_APP_API_URL=https://api.henanbaiwei.com
```

2. **代码检查**：确保没有 lint 错误
```bash
pnpm run lint
pnpm run type-check
```

3. **测试功能**：确保核心功能正常

### 构建生产版本

```bash
# 构建生产版本
pnpm run build

# 构建测试版本
pnpm run build:test

# 构建并分析包大小
pnpm run build -- --mode production --visualizer
```

构建成功后会生成 `dist` 目录，包含所有静态资源文件。

### 部署方式

#### 方式一：Nginx 部署

**服务器要求**：
- Linux 服务器（CentOS 7+ / Ubuntu 18+）
- Nginx 1.18+
- 至少 1GB 磁盘空间

**Nginx 配置**：

```nginx
# /etc/nginx/conf.d/mes.conf

# 上游后端服务
upstream mes_backend {
    server backend.henanbaiwei.com:8080;
    keepalive 64;
}

# HTTP 服务器（重定向到 HTTPS）
server {
    listen 80;
    server_name mes.henanbaiwei.com;

    # 强制跳转 HTTPS
    return 301 https://$server_name$request_uri;
}

# HTTPS 服务器
server {
    listen 443 ssl http2;
    server_name mes.henanbaiwei.com;

    # SSL 证书配置
    ssl_certificate /etc/nginx/ssl/mes.henanbaiwei.com.pem;
    ssl_certificate_key /etc/nginx/ssl/mes.henanbaiwei.com.key;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    # 前端静态文件目录
    root /usr/share/nginx/html/mes;
    index index.html;

    # 访问日志
    access_log /var/log/nginx/mes_access.log;
    error_log /var/log/nginx/mes_error.log;

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;

    # 前端路由 History 模式
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # API 代理
    location /prod-api/ {
        proxy_pass http://mes_backend/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # WebSocket 代理
    location /ws/ {
        proxy_pass http://mes_backend/ws/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 86400s;
    }

    # 禁止访问的文件
    location ~ /\. {
        deny all;
    }
}
```

**部署步骤**：

```bash
# 1. 上传 dist 目录到服务器
scp -r dist/* user@server:/usr/share/nginx/html/mes/

# 2. 重启 Nginx
nginx -t && nginx -s reload

# 3. 检查服务状态
systemctl status nginx
```

#### 方式二：Docker 部署

**Dockerfile**：

```dockerfile
FROM nginx:alpine

# 复制构建产物
COPY dist/ /usr/share/nginx/html/

# 复制 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
```

**构建和运行**：

```bash
# 构建镜像
docker build -t mes-admin:latest .

# 运行容器
docker run -d \
  --name mes-admin \
  -p 80:80 \
  -p 443:443 \
  -v /data/mes/logs:/var/log/nginx \
  mes-admin:latest

# 查看日志
docker logs -f mes-admin
```

#### 方式三：云服务器部署

各大云平台（阿里云、腾讯云、华为云等）均提供一键部署服务：

1. 将 `dist` 打包
2. 上传到 OSS/CDN
3. 配置 CDN 加速
4. 配置云解析 DNS

### 部署验证

部署完成后，验证以下内容：

1. **首页访问**：打开浏览器访问系统地址
2. **登录功能**：使用账号密码登录
3. **接口连通**：检查浏览器 Network 面板，确认 API 请求正常
4. **刷新页面**：刷新页面确认路由正常
5. **移动端适配**：使用手机访问，确认响应式布局正常

### 性能优化

**前端优化**：
- 开启 Gzip 压缩
- 静态资源使用 CDN
- 开启浏览器缓存
- 图片资源压缩优化

**后端优化**：
- API 接口缓存
- 数据库查询优化
- 接口响应压缩

## 常见问题

### 1. 项目启动后浏览器显示空白页

**现象**：访问 http://localhost:5173/ 显示空白页或白屏。

**原因**：
- 浏览器版本过低
- JavaScript 语法错误
- 路由配置错误

**解决方案**：

```bash
# 1. 检查浏览器控制台错误
# 按 F12 打开开发者工具，查看 Console 面板

# 2. 升级浏览器
推荐使用以下浏览器：
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

# 3. 检查路由配置
# 确认 router/index.ts 和 router/routes.ts 配置正确
```

### 2. 安装依赖时报错 network error

**现象**：执行 `pnpm install` 时报错网络错误。

**原因**：
- 网络连接不稳定
- 镜像源配置不当
- 防火墙/代理阻止

**解决方案**：

```bash
# 1. 清理缓存
pnpm store prune

# 2. 配置国内镜像
pnpm config set registry https://registry.npmmirror.com

# 3. 设置代理（如果有）
pnpm config set proxy http://127.0.0.1:7890

# 4. 重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install --registry https://registry.npmmirror.com
```

### 3. TypeScript 类型报错或爆红

**现象**：VSCode 中 TypeScript 报错，代码出现红色下划线。

**原因**：
- TypeScript 版本问题
- VSCode 缓存问题
- 类型定义缺失

**解决方案**：

```bash
# 1. 重启 VSCode
# 关闭所有 VSCode 窗口，重新打开

# 2. 清理缓存并重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 3. 检查 tsconfig.json 配置
# 确保 "strict" 设置合理

# 4. 安装缺失的类型定义
pnpm add -D @types/package-name
```

### 4. 接口请求失败

**现象**：页面数据无法加载，控制台显示请求失败。

**原因**：
- 后端服务未启动
- 接口地址配置错误
- CORS 跨域问题
- Token 过期

**解决方案**：

```bash
# 1. 确认后端服务已启动
# 联系后端开发人员确认服务状态

# 2. 检查接口地址配置
# 确认 .env.development 中 VITE_APP_API_URL 配置正确

# 3. 检查浏览器 Network 面板
# 查看请求的 URL、状态码、响应内容

# 4. 检查 CORS 配置
# 后端需要配置允许跨域访问

# 5. 检查 Token
# 登录后 Token 是否正确存储和传递
```

### 5. 页面样式错乱

**现象**：页面布局错乱，样式显示异常。

**原因**：
- CSS 加载失败
- SCSS 编译问题
- 样式冲突

**解决方案**：

```bash
# 1. 清除浏览器缓存
# Ctrl + Shift + Delete（Windows）
# Cmd + Shift + Delete（macOS）

# 2. 重新编译样式
pnpm run build

# 3. 检查 CSS 导入
# 确保样式文件正确导入
```

### 6. Git 提交失败

**现象**：执行 `git commit` 或 `pnpm run commit` 失败。

**原因**：
- Husky 未正确安装
- 提交信息格式不正确
- Git 仓库未初始化

**解决方案**：

```bash
# 1. 安装 Husky
pnpm run prepare

# 2. 检查 Git 状态
git status

# 3. 添加文件到暂存区
git add .

# 4. 使用交互式提交
pnpm run commit

# 5. 或者直接提交
git commit -m "feat: your commit message"
```

### 7. 其他问题

如果以上方法都无法解决问题，请：

1. 查看控制台错误信息
2. 查看项目 Issues
3. 联系技术支持

## 技术支持

### 联系方式

| 方式 | 信息 |
| ---- | ---- |
| **电话** | 400-888-8888 |
| **邮箱** | support@henanbaiwei.com |
| **官网** | www.henanbaiwei.com |
| **技术支持时间** | 周一至周五 9:00-18:00（节假日除外） |

### 技术支持群

扫描下方二维码，加入技术支持群，获取更多帮助：

![技术支持群](./qrcode/support.png)

### 培训资源

- [在线视频教程](#)（即将上线）
- [操作手册下载](#)（即将上线）
- [常见问题FAQ](#)（即将上线）

## 提交规范

### Git 提交流程

```bash
# 1. 创建功能分支
git checkout -b feat/equipment-module

# 2. 开发代码...

# 3. 拉取最新代码（建议每天开始工作时执行）
git pull origin master

# 4. 提交代码（使用交互式提交）
pnpm run commit

# 5. 推送到远程
git push origin feat/equipment-module

# 6. 创建 Pull Request
# 在 Git 平台（如 Gitee/GitHub）上创建 PR
```

### 交互式提交示例

```
? 选择提交类型: (Use arrow keys)
❯ feat:     新功能
  fix:      修复 bug
  docs:     文档更新
  style:    代码格式调整
  refactor: 重构
  perf:     性能优化
  test:     测试相关
  chore:    构建/工具相关

? 填写修改范围 (component name):
❯ equipment

? 填写简要描述 (，不超过50个字符）：
  添加设备点检功能

? 填写详细描述 (可选)：
  - 添加设备点检计划管理
  - 添加设备点检记录查看
  - 支持扫码点检

? 是否有重大更改？ (y/N)
  N

? 是否关闭某个 issue？ (y/N)
  N
```

### 分支命名规范

| 分支类型 | 命名格式 | 示例 |
| -------- | -------- | ---- |
| 功能分支 | `feat/<module>-<description>` | `feat/equipment-check` |
| 修复分支 | `fix/<module>-<description>` | `fix/equipment-export-error` |
| 文档分支 | `docs/<description>` | `docs/update-readme` |
| 重构分支 | `refactor/<module>-<description>` | `refactor/api-request` |
| 发布分支 | `release/<version>` | `release/v1.0.0` |

## 更新日志

### v1.0.0 (2026-04-09)

**新增功能**：

- 完成基础框架搭建（Vue3 + Vite + TypeScript + Element-Plus）
- 实现设备台账管理模块
  - 设备基本信息管理
  - 设备点检记录
  - 设备维保计划
- 实现电气柜管理模块
  - 抽屉单元台账管理
  - 主要部件台账管理
  - 备件管理
  - 电气点检记录
  - 电气故障记录
  - 电气记录管理
- 实现温度仪表台账模块
  - 温度仪表管理
  - 数据导入导出
- 实现维保管理模块
  - 维保计划管理
  - 维保记录
- 完成基础权限管理
  - 用户管理
  - 角色管理
  - 菜单管理
  - 按钮权限

**技术更新**：

- 升级 Vue 3.5.22
- 升级 Vite 7.1.12
- 升级 Element Plus 2.11.7
- 升级 TypeScript 5.9.3
- 优化项目结构
- 完善代码规范

---

## 版权声明

Copyright © 2024-2026 河南百维信息科技有限公司 版权所有

本项目版权归河南百维信息科技有限公司所有，未经书面授权，任何单位或个人不得以任何方式对本项目进行复制、修改、传播、销售或其他任何侵犯本公司合法权益的行为。

**河南百维信息科技有限公司** 保留所有权利。

---

<div align="center">

**感谢使用河南百维 MES 管理系统！**

</div>
