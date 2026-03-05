#!/bin/bash
# REVENANT build — Mac/Linux
# to make file executable: chmod +x ./build.command
cd "$(dirname "$0")"
node build.js
echo ""
read -p "Натисни Enter для закриття..."
