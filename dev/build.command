#!/bin/bash
# REVENANT build — Mac/Linux
# Зроби виконуваним один раз: chmod +x build.command
cd "$(dirname "$0")"
node build.js
echo ""
read -p "Натисни Enter для закриття..."
