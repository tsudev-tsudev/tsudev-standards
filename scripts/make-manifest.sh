#!/usr/bin/env bash
# make-manifest.sh - sinh MANIFEST.sha256 cho toàn bộ file quy ước.
#
# MANIFEST là thứ cho phép repo con phát hiện mình đã lệch bản quy ước nào,
# và phát hiện file bị sửa tay sau khi đồng bộ. Chạy lại sau MỌI thay đổi nội
# dung quy ước, trước khi commit.
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

SHA_CMD="sha256sum"
command -v sha256sum >/dev/null 2>&1 || SHA_CMD="shasum -a 256"

# Chỉ tính các file thuộc bộ quy ước. Không tính file quản trị repo
# (.github/, LICENSE, CHANGELOG, proposals/, exceptions/) vì repo con không lấy.
{
  find AGENTS.md VERSION SECURITY.md docs tokens templates scripts \
    -type f \
    ! -name 'MANIFEST.sha256' \
    -print0 | sort -z | xargs -0 $SHA_CMD
} > MANIFEST.sha256

echo "Đã sinh MANIFEST.sha256 với $(wc -l < MANIFEST.sha256) file."
