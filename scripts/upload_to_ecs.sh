#!/bin/sh

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname "$0")" && pwd)
REPO_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)

HOST=""
DEPLOY_USER="root"
REMOTE_DIR="/root/aos-landingpage"
ENV_FILE=".env.ecs"
RUN_DEPLOY="prompt"
REMOTE_TARGET=""
SSH_CONTROL_PATH=""

quote_for_single_quotes() {
  printf "%s" "$1" | sed "s/'/'\\\\''/g"
}

cleanup() {
  if [ -n "${SSH_CONTROL_PATH:-}" ] && [ -n "${REMOTE_TARGET:-}" ]; then
    ssh -o ControlPath="$SSH_CONTROL_PATH" -O exit "$REMOTE_TARGET" >/dev/null 2>&1 || true
    rm -f "$SSH_CONTROL_PATH" 2>/dev/null || true
  fi
}

open_ssh_master() {
  user_id=$(id -u 2>/dev/null || echo 0)
  SSH_CONTROL_PATH="/tmp/aos_landingpage_${user_id}_$$.sock"
  echo "==> Opening SSH connection to $REMOTE_TARGET"
  ssh -o ControlMaster=yes -o ControlPersist=600 -o ControlPath="$SSH_CONTROL_PATH" "$REMOTE_TARGET" "true"
}

ssh_with_master() {
  ssh -o ControlMaster=auto -o ControlPersist=600 -o ControlPath="$SSH_CONTROL_PATH" "$REMOTE_TARGET" "$@"
}

scp_with_master() {
  scp -o ControlMaster=auto -o ControlPersist=600 -o ControlPath="$SSH_CONTROL_PATH" "$@"
}

should_run_deploy() {
  case "$RUN_DEPLOY" in
    true)
      return 0
      ;;
    false)
      return 1
      ;;
  esac

  if [ ! -t 0 ]; then
    echo "==> Non-interactive shell detected; skipping deploy prompt"
    return 1
  fi

  printf "==> Upload complete. Deploy on %s now? [y/N] " "$HOST"
  IFS= read -r answer || answer=""
  case "$answer" in
    y|Y|yes|YES|Yes)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

trap cleanup EXIT INT TERM

usage() {
  cat <<'EOF'
Usage:
  sh scripts/upload_to_ecs.sh --host <ecs-ip-or-hostname> [options]

Options:
  --host <value>        ECS public IP or hostname. Required.
  --user <value>        SSH user. Default: root
  --remote-dir <value>  Remote deploy directory. Default: /root/aos-landingpage
  --env-file <value>    Local env file path. Default: .env.ecs
  --deploy              Upload and immediately deploy without prompting.
  --skip-deploy         Upload only and skip the deploy prompt.
  -h, --help            Show this help.

Examples:
  sh scripts/upload_to_ecs.sh --host 1.2.3.4
  sh scripts/upload_to_ecs.sh --host 1.2.3.4 --deploy
  sh scripts/upload_to_ecs.sh --host ecs.example.com --user admin
EOF
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --host)
      [ "$#" -ge 2 ] || { echo "missing value for --host" >&2; exit 1; }
      HOST=$2
      shift 2
      ;;
    --user)
      [ "$#" -ge 2 ] || { echo "missing value for --user" >&2; exit 1; }
      DEPLOY_USER=$2
      shift 2
      ;;
    --remote-dir)
      [ "$#" -ge 2 ] || { echo "missing value for --remote-dir" >&2; exit 1; }
      REMOTE_DIR=$2
      shift 2
      ;;
    --env-file)
      [ "$#" -ge 2 ] || { echo "missing value for --env-file" >&2; exit 1; }
      ENV_FILE=$2
      shift 2
      ;;
    --deploy)
      RUN_DEPLOY="true"
      shift
      ;;
    --skip-deploy)
      RUN_DEPLOY="false"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "unknown argument: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

[ -n "$HOST" ] || {
  echo "--host is required" >&2
  usage >&2
  exit 1
}

case "$ENV_FILE" in
  /*) LOCAL_ENV_FILE=$ENV_FILE ;;
  *) LOCAL_ENV_FILE=$REPO_ROOT/$ENV_FILE ;;
esac

if [ ! -f "$LOCAL_ENV_FILE" ] && [ "$ENV_FILE" = ".env.ecs" ] && [ -f "$REPO_ROOT/.env.ecs.example" ]; then
  LOCAL_ENV_FILE="$REPO_ROOT/.env.ecs.example"
fi

[ -f "$LOCAL_ENV_FILE" ] || {
  echo "env file not found: $LOCAL_ENV_FILE" >&2
  exit 1
}

REMOTE_TARGET="$DEPLOY_USER@$HOST"
REMOTE_DIR_ESCAPED=$(quote_for_single_quotes "$REMOTE_DIR")

open_ssh_master

echo "==> Ensuring remote directory exists: $REMOTE_DIR"
ssh_with_master "mkdir -p '$REMOTE_DIR_ESCAPED'"

echo "==> Syncing source code to $REMOTE_TARGET:$REMOTE_DIR"
rsync -avz --delete \
  -e "ssh -o ControlMaster=auto -o ControlPersist=600 -o ControlPath=$SSH_CONTROL_PATH" \
  --exclude '.git' \
  --exclude '.astro' \
  --exclude 'node_modules' \
  --exclude 'dist' \
  --exclude '.env' \
  --exclude '.env.*' \
  "$REPO_ROOT/" "$REMOTE_TARGET:$REMOTE_DIR/"

echo "==> Uploading env file to $REMOTE_TARGET:$REMOTE_DIR/.env.ecs"
scp_with_master "$LOCAL_ENV_FILE" "$REMOTE_TARGET:$REMOTE_DIR/.env.ecs"

echo "==> Upload complete"

if should_run_deploy; then
  echo "==> Starting services on $REMOTE_TARGET"
  ssh_with_master "cd '$REMOTE_DIR_ESCAPED' && sh scripts/start_prod.sh"
else
  echo "Next on ECS:"
  echo "  ssh $REMOTE_TARGET"
  echo "  cd $REMOTE_DIR"
  echo "  sh scripts/start_prod.sh"
fi
