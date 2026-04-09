---
title: AOS CLI 命令参考
description: scan、repo-scan、doctor 和 serve 的常见用法与参数说明。
sidebar:
  order: 3
---

下面的命令与参数来自当前 `aos` 命令的实际帮助输出，适合在终端、脚本或自动化流程中直接使用。

## 全局参数

这些参数适用于多个子命令：

- `--storage-file <FILE>`：指定本地存储文件，默认是 `~/.aos/storage.db`
- `--base-url <URL>`：指定服务端地址，默认是 `https://api.123offer.cn`
- `--api-key <KEY>`：指定 API Key，也可以通过 `AOS_API_KEY` 环境变量传入
- `--verbose`：输出更详细的运行日志
- `--print-errors`：打印更完整的错误信息
- `--json`：把结果输出为 JSON
- `--output <FILE>`：把结果写入文件

## `aos scan`

运行默认扫描流程。它会组合本地扫描、skill sync 和云端分析。

```bash
aos scan [OPTIONS] [PATH]...
```

常用参数：

- `--skill-root <PATH>`：显式指定 Skill 根目录
- `--agent-root <PATH>`：显式指定 Agent 根目录
- `--no-recursive`：关闭递归扫描
- `--include-ext <EXT>`：限制扫描文件扩展名
- `--client-id <CLIENT_ID>`：自定义上传时使用的客户端标识，默认是 `aos-cli`

示例：

```bash
aos scan ~/.codex ~/.agents
aos scan --skill-root ~/.agents/skills --include-ext py,ts,sh
```

## `aos repo-scan`

对指定本地代码仓库执行专门审计，适合检查 Agent 执行链路、MCP 配置和高风险脚本。

```bash
aos repo-scan <PATH>
```

示例：

```bash
aos repo-scan ~/my-agent-project
aos repo-scan ~/my-agent-project --json --output ./tmp/repo-scan.json
```

## `aos doctor`

执行环境检查，适合作为安装后的第一步，或者排查为什么云端能力没有生效。

```bash
aos doctor
```

这个命令会帮助你判断：

- 本地存储是否可写
- 服务是否联通
- API Key 是否已配置
- 默认扫描根目录是否存在

## `aos serve`

启动本地 guard 服务。当前默认监听在 `127.0.0.1:46358`，并使用独立的运行时数据库文件。

```bash
aos serve [OPTIONS]
```

常用参数：

- `--host <HOST>`：监听地址，默认 `127.0.0.1`
- `--port <PORT>`：监听端口，默认 `46358`
- `--database <FILE>`：指定 runtime guard 数据库文件

示例：

```bash
aos serve
aos serve --host 0.0.0.0 --port 46358
```

## 推荐实践

- 在本地排错时优先加上 `--verbose`。
- 在脚本和 CI 中统一使用 `--json --output`，便于归档和二次处理。
- 当你既需要终端自动化，又需要可视化分析时，让 CLI 与 [AOS Desktop](/docs/aos-desktop/) 搭配使用。
