---
title: AOS Desktop 活动监控
description: 使用标准 OTLP/HTTP JSON 把工具调用、模型调用和安全事件接入 AOS Desktop。
sidebar:
  order: 3
---

活动监控是 AOS Desktop 中非常关键的一块能力。它不只看静态文件，还会把运行时的工具调用、模型请求和安全告警统一汇总到一个观察面板里。

## 默认接入地址

本地 OTLP bridge 默认监听以下地址：

- `POST http://127.0.0.1:46357/v1/logs`
- `POST http://127.0.0.1:46357/v1/traces`
- `POST http://127.0.0.1:46357/v1/metrics`
- `GET http://127.0.0.1:46357/health`

你可以先访问健康检查接口确认 bridge 已经工作：

```bash
curl http://127.0.0.1:46357/health
```

## 建议上报哪些字段

为了让时间线和摘要面板更有可读性，建议在 OTLP 事件里尽量携带下面这些字段：

- `service.name` 或 `scope.name`：标识来源，例如 `codex-cli`、`claude-code`
- `session_id` 或 `run_id`：把同一次运行聚合成单个会话
- `tool_name`：识别工具调用
- `model`：识别模型调用
- `input_token_count` / `output_token_count`：统计模型消耗
- `cost_usd`：估算调用成本
- `duration_ms`：展示耗时

## 事件会怎样被展示

- 带 `tool_name` 的 logs 或 spans 会被归纳为工具执行事件。
- 带 `model` 和 token 计数的事件会被归纳为模型响应事件。
- `ERROR`、`FATAL` 或策略命中的事件会被归类为安全告警。
- 其他事件会作为普通 runtime 事件展示在时间线里。

## Claude Code 示例

如果你的运行时支持 OpenTelemetry，最简单的方式就是直接发标准 OTLP。以 Claude Code 为例，可以通过环境变量把日志送进本地 bridge：

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_LOGS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_LOGS_PROTOCOL=http/json
export OTEL_EXPORTER_OTLP_LOGS_ENDPOINT=http://127.0.0.1:46357/v1/logs
```

## 适合接入的上游

- 桌面或终端 Agent Runtime
- 自研工具调用链
- 支持 OpenTelemetry 的 AI 开发工具
- 需要把工具调用、模型调用和安全事件统一观察的内部平台

## 使用建议

- 优先发送标准 OTLP，而不是自定义 JSON。
- 先保证 `session_id`、`tool_name`、`model` 这三类字段完整，再逐步补充 token、耗时和成本。
- 如果你已经在桌面端做静态扫描，建议把活动监控一起接上，这样可以把“运行前检查”和“运行中观察”串成闭环。
