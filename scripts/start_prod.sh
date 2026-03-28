#!/bin/sh

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname "$0")" && pwd)
REPO_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
cd "$REPO_ROOT"

[ -f .env.ecs ] || {
  echo ".env.ecs not found in $REPO_ROOT" >&2
  exit 1
}

echo "==> Building and starting aos-landingpage"
docker compose -f docker-compose.prod.yml up -d --build

echo "==> Current container status"
docker compose -f docker-compose.prod.yml ps
