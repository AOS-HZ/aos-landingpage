---
title: AOS CLI
description: 用终端方式运行 AOS 扫描流程，适合自动化、脚本化和代码库审计场景。
sidebar:
  label: 产品概览
  order: 1
---

AOS CLI 是 AOS 的命令行入口，适合希望在终端、脚本或 CI 里运行扫描流程的团队。它复用了 `aos-core` 的发现与审计能力，把本地扫描、代码库扫描、健康检查和本地 guard 服务暴露成一组稳定命令。

## 适合什么场景

- 在本地终端里快速检查 Agent 目录或 Skill 根目录
- 把安全扫描嵌入自动化脚本或 CI
- 对任意本地仓库执行 `repo-scan`
- 输出 JSON 结果，供其他系统继续处理
- 在本机启动 runtime guard 服务，承接运行时事件或策略能力

## 当前提供的核心命令

- `aos scan`：运行默认扫描流程，支持本地扫描、skill sync 和云端分析
- `aos repo-scan`：对指定本地仓库做专门审计
- `aos doctor`：检查存储文件、服务连通性和默认扫描根目录
- `aos serve`：启动本地 guard 服务

## 什么时候用 CLI，什么时候用 Desktop

- 如果你更关注可视化研判、交互式处置和活动监控，优先使用 [AOS Desktop](/docs/aos-desktop/)。
- 如果你更关注自动化、脚本化输出和终端工作流，优先使用 AOS CLI。
- 很多团队会同时使用两者：CLI 负责接入流水线，Desktop 负责分析结果和日常观察。

## 推荐阅读

- [AOS CLI 快速开始](./quick-start/)
- [AOS CLI 命令参考](./commands/)
