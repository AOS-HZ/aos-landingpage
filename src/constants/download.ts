import {
  AOS_CLI_QUICK_START_URL,
  AOS_DESKTOP_QUICK_START_URL,
  DOCS_URL,
} from "./site";

export const CLI_INSTALL_COMMAND = "brew tap AOS-HZ/tap && brew install --cask aos-desktop";
export const AOS_DESKTOP_MACOS_FALLBACK_DMG_URL =
  "https://github.com/AOS-HZ/aos-desktop-releases/releases/download/v0.1.5/Aegis_0.1.5_universal.dmg";
export const AOS_DESKTOP_MACOS_LATEST_API_URL =
  "/api/public/desktop/latest?platform=macos&channel=stable";

export const DOWNLOAD_PLATFORMS = [
  {
    id: "macos",
    label: "macOS",
    href: AOS_DESKTOP_MACOS_FALLBACK_DMG_URL,
    latestEndpoint: AOS_DESKTOP_MACOS_LATEST_API_URL,
    action: "下载 macOS 安装包",
    enabled: true,
    summary: "通过桌面工作台完成安装准备、第一次本地扫描与结果阅读。",
  },
  {
    id: "linux",
    label: "Linux",
    href: AOS_DESKTOP_QUICK_START_URL,
    action: "查看 Linux 安装说明",
    enabled: false,
    badge: "即将推出",
    summary: "文档会引导你启动客户端，并进入桌面端的首轮风险扫描流程。",
  },
  {
    id: "windows",
    label: "Windows",
    href: AOS_DESKTOP_QUICK_START_URL,
    action: "查看 Windows 安装说明",
    enabled: false,
    badge: "即将推出",
    summary: "先完成客户端启动，再把本地 Agent、Skill 和仓库纳入统一视图。",
  },
];

export const DESKTOP_SUPPORT_NOTE =
  "需要 macOS 14 Sonoma 或更高版本。";

export const DOWNLOAD_GUIDES = [
  {
    eyebrow: "Desktop Guide",
    title: "AOS Desktop 快速开始",
    description: "适合第一次接触图形工作台的团队成员，先完成启动、扫描与结果阅读。",
    href: AOS_DESKTOP_QUICK_START_URL,
    cta: "查看 Desktop 快速开始",
  },
  {
    eyebrow: "CLI Quick Start",
    title: "终端接入",
    description: "适合脚本、CI 与批量接入场景，可在终端中完成安装、环境检查和首次扫描。",
    href: AOS_CLI_QUICK_START_URL,
    cta: "查看 CLI 快速开始",
  },
  {
    eyebrow: "Docs Center",
    title: "完整产品文档",
    description: "集中查看 Desktop、CLI、活动监控与命令参考，便于统一接入路径。",
    href: DOCS_URL,
    cta: "进入文档中心",
  },
];
