#!/usr/bin/env bash
#
# check-standards.sh - CỔNG KIỂM QUY ƯỚC.
#
# Chạy được ở hai nơi:
#   - Trong chính repo tsudev-standards (kiểm cả token và MANIFEST).
#   - Trong repo con đã đồng bộ (tự tìm bộ quy ước ở ./.standards).
#
# Cách dùng:
#   ./scripts/check-standards.sh
#   ./scripts/check-standards.sh --standards-dir .standards
#
# Mã thoát khác 0 = có vi phạm. CI PHẢI chặn merge khi script này thất bại.
set -uo pipefail

STD_DIR=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --standards-dir) STD_DIR="$2"; shift 2 ;;
    -h|--help) sed -n '2,15p' "$0"; exit 0 ;;
    *) echo "Tham số không hiểu: $1" >&2; exit 2 ;;
  esac
done

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"

# Tự nhận diện: đang ở repo trung tâm, hay ở repo con?
IS_CENTRAL=0
if [[ -f "templates/gitignore/base.gitignore" && -f "tokens/design-tokens.json" ]]; then
  IS_CENTRAL=1
  STD_DIR="."
elif [[ -z "$STD_DIR" ]]; then
  STD_DIR=".standards"
fi

FAIL=0
WARN=0
pass() { printf '  ĐẠT   %s\n' "$1"; }
fail() { printf '  TRƯỢT %s\n' "$1" >&2; FAIL=$((FAIL + 1)); }
warn() { printf '  LƯU Ý %s\n' "$1" >&2; WARN=$((WARN + 1)); }

echo "Cổng kiểm quy ước tsudev - $( [[ $IS_CENTRAL == 1 ]] && echo 'repo trung tâm' || echo 'repo con' )"
echo

# ------------------------------------------------------------------
echo "1. Bộ quy ước"
# ------------------------------------------------------------------
if [[ $IS_CENTRAL == 0 ]]; then
  if [[ ! -d "$STD_DIR" ]]; then
    fail "không tìm thấy $STD_DIR - chạy ./scripts/sync-standards.sh"
  else
    pass "có bản sao quy ước tại $STD_DIR (v$(cat "$STD_DIR/VERSION" 2>/dev/null || echo '?'))"
    if [[ -f .standards-version ]]; then
      pass "có .standards-version ghi nguồn đồng bộ"
    else
      fail "thiếu .standards-version - bản sao quy ước không truy nguyên được"
    fi
  fi
else
  pass "đây là nguồn chân lý (v$(cat VERSION))"
fi

# ------------------------------------------------------------------
echo
echo "2. .gitignore"
# ------------------------------------------------------------------
BASE="$STD_DIR/templates/gitignore/base.gitignore"
if [[ ! -f .gitignore ]]; then
  fail "repo không có .gitignore"
elif [[ ! -f "$BASE" ]]; then
  warn "không đối chiếu được với bản chuẩn (thiếu $BASE)"
else
  missing=0
  while IFS= read -r line; do
    [[ -z "$line" || "$line" == \#* ]] && continue
    if ! grep -qxF -- "$line" .gitignore; then
      fail ".gitignore thiếu dòng chuẩn: $line"
      missing=$((missing + 1))
      [[ $missing -ge 10 ]] && { echo "  ... (còn nữa, dừng liệt kê)" >&2; break; }
    fi
  done < "$BASE"
  [[ $missing == 0 ]] && pass ".gitignore chứa đủ bản chuẩn"
fi

# ------------------------------------------------------------------
echo
echo "3. File nhạy cảm đang bị git theo dõi"
# ------------------------------------------------------------------
if git rev-parse --git-dir >/dev/null 2>&1; then
  # Mẫu bắt các file KHÔNG BAO GIỜ được nằm trong repo.
  LEAK_RE='(^|/)\.env$|(^|/)\.env\.(?!example|sample)|\.pem$|\.pfx$|\.p12$|\.jks$|\.keystore$|(^|/)id_rsa|(^|/)id_ed25519|(^|/)\.npmrc$|(^|/)\.netrc$|(^|/)secrets\.(json|ya?ml)$|service-account.*\.json$|\.tfstate$|\.kdbx$|\.har$'
  leaked="$(git ls-files | grep -PI "$LEAK_RE" || true)"
  if [[ -n "$leaked" ]]; then
    while IFS= read -r f; do
      fail "file nhạy cảm đang được theo dõi: $f"
    done <<< "$leaked"
    echo "        Xử lý: git rm --cached <file>, rồi THU HỒI KHÓA theo" >&2
    echo "        docs/SECURITY_BASELINE.md mục 9.2 - khóa đã lộ là đã lộ." >&2
  else
    pass "không có file nhạy cảm nào trong chỉ mục git"
  fi
else
  warn "không phải kho git - bỏ qua kiểm tra file bị theo dõi"
fi

# ------------------------------------------------------------------
echo
echo "4. Quy ước gạch ngang (AGENTS.md mục 6)"
# ------------------------------------------------------------------
if git rev-parse --git-dir >/dev/null 2>&1; then
  # Dựng ký tự em-dash từ mã byte thay vì viết literal, để chính script này
  # không vi phạm quy tắc mà nó đang canh.
  EM_DASH="$(printf '\xe2\x80\x94')"   # U+2014
  emdash="$(git ls-files -- '*.md' '*.json' '*.css' '*.ts' '*.tsx' '*.js' '*.mjs' '*.sh' '*.yml' '*.yaml' 2>/dev/null \
    | grep -v '^migrations/' \
    | xargs -r grep -lF -- "$EM_DASH" 2>/dev/null || true)"
  # Miễn trừ: dòng nào trích dẫn chính ký tự này để định nghĩa quy tắc thì phải
  # ghi kèm mã điểm "U+2014" trên cùng dòng. Nhờ vậy quy ước tự mô tả được mình
  # mà cổng kiểm vẫn chặn được mọi trường hợp dùng thật.
  if [[ -n "$emdash" ]]; then
    kept=""
    while IFS= read -r f; do
      if grep -F -- "$EM_DASH" "$f" | grep -qvF 'U+2014'; then
        kept+="$f"$'\n'
      fi
    done <<< "$emdash"
    emdash="$(printf '%s' "$kept")"
  fi
  if [[ -n "$emdash" ]]; then
    while IFS= read -r f; do
      fail "còn em-dash (U+2014) trong: $f"
    done <<< "$emdash"
  else
    pass "không còn em-dash trong file văn bản"
  fi
fi

# ------------------------------------------------------------------
echo
echo "5. Định dạng ngày (DESIGN_SYSTEM.md mục 4)"
# ------------------------------------------------------------------
if git rev-parse --git-dir >/dev/null 2>&1; then
  isodate="$(git ls-files -- '*.md' 2>/dev/null \
    | xargs -r grep -lE '(^|[^0-9/-])20[0-9]{2}-[01][0-9]-[0-3][0-9]([^0-9/-]|$)' 2>/dev/null || true)"
  if [[ -n "$isodate" ]]; then
    while IFS= read -r f; do
      warn "có ngày dạng YYYY-MM-DD (quy ước hiển thị là DD/MM/YYYY): $f"
    done <<< "$isodate"
  else
    pass "ngày trong tài liệu theo đúng DD/MM/YYYY"
  fi
fi

# ------------------------------------------------------------------
if [[ $IS_CENTRAL == 1 ]]; then
  echo
  echo "6. Design token (chỉ ở repo trung tâm)"
  if command -v node >/dev/null 2>&1; then
    if node scripts/build-tokens.mjs --check >/dev/null 2>&1; then
      pass "tokens.css khớp design-tokens.json"
    else
      fail "tokens.css lệch design-tokens.json - chạy: node scripts/build-tokens.mjs"
    fi
    if node scripts/check-contrast.mjs >/dev/null 2>&1; then
      pass "mọi cặp màu đạt ngưỡng WCAG"
    else
      fail "có cặp màu trượt WCAG - chạy: node scripts/check-contrast.mjs"
    fi
  else
    warn "thiếu node - bỏ qua kiểm tra token"
  fi

  echo
  echo "7. MANIFEST.sha256"
  SHA_CMD="sha256sum"
  command -v sha256sum >/dev/null 2>&1 || SHA_CMD="shasum -a 256"
  if [[ ! -f MANIFEST.sha256 ]]; then
    fail "thiếu MANIFEST.sha256 - chạy: ./scripts/make-manifest.sh"
  elif $SHA_CMD --check MANIFEST.sha256 >/dev/null 2>&1; then
    pass "MANIFEST.sha256 khớp toàn bộ file quy ước"
  else
    fail "MANIFEST.sha256 lệch - chạy: ./scripts/make-manifest.sh"
  fi
fi

# ------------------------------------------------------------------
echo
echo "----------------------------------------------------------"
if [[ $FAIL -gt 0 ]]; then
  echo "KẾT QUẢ: $FAIL vi phạm, $WARN lưu ý. Không đạt cổng kiểm." >&2
  exit 1
fi
echo "KẾT QUẢ: đạt cổng kiểm ($WARN lưu ý)."
exit 0
