# AOS Landing Page

AOS 官网落地页项目，基于 Astro 构建，当前包含两个主要页面：

- `/`：产品官网首页
- `/download`：Aegis Desktop 下载页

项目重点不是通用博客或内容站，而是一个以静态页面为主的品牌官网，页面内容主要由 Astro 组件和 `public/assets` 中的产品截图共同驱动。

## 技术栈

- Astro 6
- Tailwind CSS 4
- `@fontsource-variable/bricolage-grotesque`
- `@fontsource-variable/inter`

## 快速开始

安装依赖：

```bash
npm install
```

启动本地开发：

```bash
npm run dev
```

如果默认端口被占用，可以手动指定端口：

```bash
npm run dev -- --port 4321
```

构建生产版本：

```bash
npm run build
```

本地预览构建结果：

```bash
npm run preview
```

## 页面说明

### 首页 `/`

首页由以下组件拼装：

- `src/components/Navbar.astro`
- `src/components/Hero.astro`
- `src/components/Features.astro`
- `src/components/Architecture.astro`
- `src/components/Threats.astro`
- `src/components/Cases.astro`
- `src/components/Cta.astro`
- `src/components/Footer.astro`

页面装配入口在：

- `src/pages/index.astro`

### 下载页 `/download`

下载页主要负责：

- 展示 Aegis Desktop 下载入口
- 区分 macOS / Linux / Windows 三个平台状态
- 展示 CLI 安装命令
- 跳转文档中心

页面入口在：

- `src/pages/download.astro`

下载相关常量位于：

- `src/constants/download.ts`
- `src/constants/site.ts`

## 项目结构

```text
src/
  components/
    Architecture.astro
    Cases.astro
    Container.astro
    Cta.astro
    Features.astro
    Footer.astro
    Hero.astro
    Navbar.astro
    ShieldMark.astro
    Threats.astro
  constants/
    download.ts
    site.ts
  layouts/
    Layout.astro
  pages/
    index.astro
    download.astro
  styles/
    global.css

public/
  assets/
  favicon.svg
```

## 设计与资源约定

### 1. 文案和跳转

常见外链和文档地址不要散落在组件里，优先维护在：

- `src/constants/site.ts`
- `src/constants/download.ts`

### 2. 产品截图

首页 Hero、功能区、下载页等大量视觉内容来自 `public/assets` 下的 PNG 截图。

例如：

- `public/assets/activity-monitor.png`
- `public/assets/skills-management.png`
- `public/assets/scan-result.png`
- `public/assets/quarantine-zone.png`
- `public/assets/risk-analysis-v2.png`

如果你要替换官网中的截图，优先遵循这个规则：

1. 不要直接覆盖线上已经被浏览器强缓存过的老文件名。
2. 使用新的版本化文件名，例如 `xxx-v2.png`、`xxx-v3.png`。
3. 再更新组件里的引用路径。

这样可以规避静态资源长缓存导致的“代码更新了但线上还是旧图”的问题。

### 3. 视觉规范

设计参考文档位于：

- `DESIGN.md`

如果继续扩展页面，优先保持当前官网已经建立的风格：

- 大面积留白
- 明确的产品截图主导视觉
- 深色主 CTA + 浅色次 CTA
- 英文 eyebrow + 中文主标题的混排节奏

## Docker 与部署

项目已经提供容器化部署所需文件：

- `Dockerfile`
- `nginx.conf`
- `docker-compose.yml`
- `docker-compose.prod.yml`

### 本地使用 Docker 启动

```bash
docker compose up -d --build
```

默认映射端口：

- `http://127.0.0.1:18081`

### ECS 上传与部署

ECS 相关脚本：

- `scripts/upload_to_ecs.sh`
- `scripts/start_prod.sh`

默认生产环境变量文件：

- `.env.ecs`
- `.env.ecs.example`

上传并立即部署：

```bash
sh scripts/upload_to_ecs.sh --host <ecs-ip-or-hostname> --deploy
```

只上传，不立即部署：

```bash
sh scripts/upload_to_ecs.sh --host <ecs-ip-or-hostname> --skip-deploy
```

上传完成后，远端启动命令为：

```bash
sh scripts/start_prod.sh
```

## 维护建议

### 替换官网图片时

- 先确认是哪一个组件在引用该图片
- 优先改 `public/assets` 中的版本化文件名，而不是直接覆盖老路径
- 替换后跑一次 `npm run build`

### 修改首页内容时

优先检查这些文件：

- `src/components/Hero.astro`
- `src/components/Features.astro`
- `src/components/Navbar.astro`
- `src/components/Footer.astro`

### 修改下载页内容时

优先检查这些文件：

- `src/pages/download.astro`
- `src/constants/download.ts`
- `src/constants/site.ts`

## 当前注意事项

当前工作区里可能存在一些本地杂项文件，例如：

- `.DS_Store`
- 临时测试文件
- 未使用的预览资源

这些内容不属于官网正式功能的一部分，提交前建议单独检查 `git status`，避免把无关文件一起提交。
