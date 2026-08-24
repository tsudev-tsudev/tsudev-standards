#!/usr/bin/env node
/**
 * build-tokens.mjs - sinh tokens/tokens.css TỪ tokens/design-tokens.json.
 *
 * design-tokens.json là nguồn chân lý duy nhất. tokens.css là bản sinh ra,
 * KHÔNG sửa tay. Chạy:
 *   node scripts/build-tokens.mjs           # ghi lại tokens.css
 *   node scripts/build-tokens.mjs --check   # chỉ kiểm tra, không ghi (dùng cho CI)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const JSON_PATH = join(ROOT, 'tokens', 'design-tokens.json');
const CSS_PATH = join(ROOT, 'tokens', 'tokens.css');

const t = JSON.parse(readFileSync(JSON_PATH, 'utf8'));

/**
 * Bất biến quan trọng nhất của bảng token: BA chế độ phải khai ĐÚNG cùng một bộ
 * vai trò. Thiếu một vai trò ở một chế độ nghĩa là giao diện sẽ rơi về giá trị
 * kế thừa ở chế độ đó - lỗi rất khó nhìn ra bằng mắt vì nó chỉ hiện ở một chế độ.
 */
{
  const themes = Object.entries(t.color);
  const [refName, refPalette] = themes[0];
  const refKeys = Object.keys(refPalette);
  for (const [name, palette] of themes.slice(1)) {
    const keys = Object.keys(palette);
    const missing = refKeys.filter((k) => !keys.includes(k));
    const extra = keys.filter((k) => !refKeys.includes(k));
    if (missing.length || extra.length) {
      console.error(`LỖI: chế độ "${name}" lệch bộ vai trò so với "${refName}".`);
      if (missing.length) console.error(`      Thiếu: ${missing.join(', ')}`);
      if (extra.length) console.error(`      Thừa:  ${extra.join(', ')}`);
      process.exit(1);
    }
    if (keys.join('|') !== refKeys.join('|')) {
      console.error(`LỖI: chế độ "${name}" khai đúng bộ vai trò nhưng SAI THỨ TỰ so với "${refName}".`);
      console.error('      Giữ thứ tự 1:1 để đối chiếu ba chế độ bằng mắt được.');
      process.exit(1);
    }
  }
}

/** Thứ tự khai báo phải giữ 1:1 với JSON để đối chiếu bằng mắt được. */
const THEME_SELECTOR = {
  light: ':root,\n[data-theme="light"]',
  warm: '[data-theme="warm"]',
  dark: '[data-theme="dark"]',
};
const COLOR_SCHEME = { light: 'light', warm: 'light', dark: 'dark' };

const lines = [];
const push = (s = '') => lines.push(s);

push('/* ============================================================');
push(`   tsudev-design-tokens v${t.meta.version} - SINH TỰ ĐỘNG, KHÔNG SỬA TAY`);
push('   Nguồn: tokens/design-tokens.json');
push('   Sinh lại: node scripts/build-tokens.mjs');
push('   Cách dùng: <html data-theme="light|warm|dark">');
push('              <body data-platform="web|desktop">');
push('   ============================================================ */');
push();

for (const [theme, colors] of Object.entries(t.color)) {
  push(`${THEME_SELECTOR[theme]} {`);
  for (const [name, value] of Object.entries(colors)) push(`  --${name}: ${value};`);
  push(`  color-scheme: ${COLOR_SCHEME[theme]};`);
  push('}');
  push();
}

push(':root {');
push('  /* Typography */');
push(`  --font-family: ${t.typography['font-family']};`);
push(`  --font-mono: ${t.typography['font-mono']};`);
for (const [k, v] of Object.entries(t.typography['font-size'])) push(`  --fs-${k}: ${v};`);
for (const [k, v] of Object.entries(t.typography['line-height'])) push(`  --lh-${k}: ${v};`);
for (const [k, v] of Object.entries(t.typography.weight)) push(`  --fw-${k}: ${v};`);
for (const [k, v] of Object.entries(t.typography['letter-spacing'])) push(`  --ls-${k}: ${v};`);
push();
push('  /* Radius: none=khung layout | sm=badge,checkbox | md=button,input | lg=modal,card,table */');
for (const [k, v] of Object.entries(t.radius)) push(`  --radius-${k}: ${v};`);
push();
push('  /* Spacing - bội số 4px */');
for (const [k, v] of Object.entries(t.spacing)) push(`  --sp-${k}: ${v};`);
push();
push('  /* Shadow */');
for (const [k, v] of Object.entries(t.shadow)) push(`  --shadow-${k}: ${v};`);
push();
push('  /* Z-index */');
for (const [k, v] of Object.entries(t['z-index'])) push(`  --z-${k}: ${v};`);
push();
push('  /* Motion */');
for (const [k, v] of Object.entries(t.motion)) push(`  --motion-${k}: ${v};`);
push('}');
push();
push('/* Nền tảng áp cỡ chữ body mặc định */');
push('body {');
push('  font-family: var(--font-family);');
push('  color: var(--text-primary);');
push('  background: var(--bg-base);');
push('  line-height: var(--lh-body);');
push('}');
push('body[data-platform="web"] { font-size: var(--fs-body-web); }');
push('body[data-platform="desktop"] { font-size: var(--fs-body-desktop); }');
push();
push('/* Vòng focus luôn nhìn thấy được bằng bàn phím - DESIGN_SYSTEM.md mục 5 */');
push(':focus-visible {');
push('  outline: 2px solid var(--focus-ring);');
push('  outline-offset: 2px;');
push('}');
push();
push('/* Tôn trọng lựa chọn giảm chuyển động của hệ điều hành */');
push('@media (prefers-reduced-motion: reduce) {');
push('  *,');
push('  *::before,');
push('  *::after {');
push('    animation-duration: 0.01ms !important;');
push('    transition-duration: 0.01ms !important;');
push('  }');
push('}');

const css = lines.join('\n') + '\n';

if (process.argv.includes('--check')) {
  const current = readFileSync(CSS_PATH, 'utf8');
  if (current !== css) {
    console.error('LỖI: tokens/tokens.css lệch với tokens/design-tokens.json.');
    console.error('      Chạy: node scripts/build-tokens.mjs');
    process.exit(1);
  }
  console.log('OK: tokens.css khớp design-tokens.json');
} else {
  writeFileSync(CSS_PATH, css, 'utf8');
  console.log(`Đã sinh ${CSS_PATH}`);
}
