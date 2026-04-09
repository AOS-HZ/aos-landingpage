---
title: AOS Desktop
description: 面向 AI Agent 生态的桌面安全工作台，聚焦本地发现、风险分析、运行时监控和交互式处置。
sidebar:
  label: 产品概览
  order: 1
---

AOS Desktop 是一个面向 AI Agent 生态的桌面安全工作台，用来帮助团队看清本地 Agent、Skill、MCP Tool、Prompt、Resource 与代码库中的风险暴露面。

它的定位不是单一扫描器，而是把本地发现、本地静态检测、风险分析、运行时活动监控和交互式处置放到同一个原生客户端里。

## 核心能力

- 本地生态发现：自动盘点本机上的 Skill、Agent、MCP Server、Tool、Prompt 和 Resource。
- 静态风险扫描：识别 Shell 执行、敏感文件访问、外部网络请求、远程代码下载和 Prompt Injection 等高风险模式。
- 风险详情研判：按组件查看 findings、风险分数、关联文件和建议动作。
- 隔离处置：把高风险 Skill 移入隔离区，便于恢复或进一步清理。
- 代码库扫描：直接对任意本地仓库做专门审计，发现 Agent 配置、脚本与调用链中的风险。
- 运行时活动监控：通过标准 OTLP/HTTP JSON 接入，把工具调用、模型调用与安全事件纳入统一时间线。

## 典型工作流

1. 启动客户端后执行本地发现与首轮扫描，建立当前 Agent 资产清单。
2. 在概览页快速定位高风险组件，再进入详情页查看 findings 与风险解释。
3. 对不可信或待观察的 Skill 进行隔离、恢复或删除。
4. 对本地项目执行代码库扫描，补足运行前的静态检查。
5. 接入活动监控，把实际运行中的工具调用和安全告警纳入统一观察面板。

## 产品界面

### 安全概览

![AOS Desktop 安全概览](/assets/dashboard.png)

### Skill 管理

![AOS Desktop Skill 管理](/assets/skills-management.png)

### 风险分析

![AOS Desktop 风险分析](/assets/risk-analysis.png)

## 技术基础

- 前端：React、TypeScript、Vite、Tailwind CSS
- 桌面容器：Tauri 2
- 桌面后端：Rust
- 本地发现与静态扫描：复用 `aos-core` 中的 `discovery-engine` 与 `local-scanner`
- 数据存储：SQLite

## 推荐阅读

- [AOS Desktop 快速开始](./quick-start/)
- [AOS Desktop 活动监控](./activity-monitor/)
