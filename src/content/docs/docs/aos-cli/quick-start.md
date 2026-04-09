---
title: AOS CLI 快速开始
description: 安装 aos 命令、完成第一次扫描，并把结果导出为 JSON。
sidebar:
  order: 2
---

这份快速开始适合第一次在终端中接触 AOS 的用户，目标是在几分钟内完成安装、环境检查和第一次扫描。

## 安装

当前推荐通过 Homebrew 安装：

```bash
brew tap AOS-HZ/tap
brew install aos-cli
```

安装完成后，可执行命令名是 `aos`，不是 `aos-cli`。

## 第一步：确认环境

先运行一次健康检查：

```bash
aos doctor
```

这个命令会检查：

- 本地存储文件是否可写
- 远端服务是否可达
- 默认扫描根目录是否存在
- 云端 API Key 是否已配置

## 第二步：配置云端分析

如果你需要 skill sync 和云端分析，请先配置 API Key：

```bash
export AOS_API_KEY="your_api_key_here"
```

如果没有配置 API Key，`aos scan` 仍然可以完成本地扫描，只是会跳过云端能力。

## 第三步：执行第一次扫描

扫描默认根目录：

```bash
aos scan
```

扫描指定路径：

```bash
aos scan ~/.codex ~/.agents
```

只扫描某个 Skill 目录：

```bash
aos scan ~/.codex/skills
```

## 第四步：导出 JSON

如果你希望把结果接入脚本或其他平台，可以直接输出 JSON 文件：

```bash
aos scan --json --output ./tmp/scan.json
```

## 第五步：审计本地代码仓库

对任意本地项目执行专门审计：

```bash
aos repo-scan ~/my-agent-project
```

同样也支持 JSON 输出：

```bash
aos repo-scan ~/my-agent-project --json --output ./tmp/repo-scan.json
```

## 下一步

- 如果你想系统了解命令和参数，继续看 [命令参考](./commands/)。
- 如果你想用图形界面查看结果和风险详情，继续看 [AOS Desktop](/docs/aos-desktop/)。
