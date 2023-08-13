#!/usr/bin/env bash

DIR="$(cd "$(dirname "$0")" && pwd)"

$DIR/db-startup.sh

if [ "$#" -eq  "0" ]
  then
    vitest -c ./vitest.integration.config.ts
else
    vitest -c ./vitest.integration.config.ts --ui
fi
