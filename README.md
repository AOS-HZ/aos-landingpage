# AOS Landing Page

Astro-based landing page for Agents-of-Shield.

## Run

```bash
npm install
npm run dev
```

To avoid the ports already used elsewhere in your workspace, you can also run:

```bash
npm run dev -- --port 5176
```

## Build

```bash
npm run build
```

## Docker

项目目录已经提供：

- `Dockerfile`
- `nginx.conf`
- `docker-compose.yml`
- `docker-compose.prod.yml`
- `scripts/upload_to_ecs.sh`
- `scripts/start_prod.sh`

在当前目录直接启动：

```bash
docker compose up -d --build
```

默认映射端口是 `18081`，也就是 `http://127.0.0.1:18081`。

### ECS

默认生产环境变量文件是 `.env.ecs`，示例见 `.env.ecs.example`。

一键上传并部署：

```bash
sh scripts/upload_to_ecs.sh --host <ecs-ip> --deploy
```

如果只上传，不立即启动：

```bash
sh scripts/upload_to_ecs.sh --host <ecs-ip> --skip-deploy
```
