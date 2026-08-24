#!/usr/bin/env node
/**
 * check-contrast.mjs - kiểm tra mọi cặp màu chữ/nền của design-tokens.json
 * đạt ngưỡng WCAG 2.1 quy định tại docs/DESIGN_SYSTEM.md mục 1.
 *
 * Đây là cổng canh cho chính quy tắc mà bảng token v1.0.0 đã vi phạm
 * (text-muted trượt 4.5:1 ở cả ba chế độ). Không có cổng này thì quy tắc
 * chỉ là câu chữ.
 *
 * CẢNH BÁO khi tự viết lại phép đo: quên srgbToLinear ở MỘT kênh vẫn cho ra
 * bảng số trông hợp lý. Nếu một giá trị đang chạy thật bỗng "trượt", nghi phép
 * đo trước, nghi mã màu sau.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(readFileSync(join(ROOT, 'tokens', 'design-tokens.json'), 'utf8'));

const srgbToLinear = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

function luminance(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) throw new Error(`Mã màu không hợp lệ: ${hex}`);
  const [r, g, b] = [0, 2, 4].map((i) => srgbToLinear(parseInt(m[1].slice(i, i + 2), 16) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [la, lb] = [luminance(a), luminance(b)];
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** Nền hover là trạng thái tạm thời của một hàng, không phải bề mặt mà nút phụ
 *  hay ô nhập nằm lên - nên không nằm trong bộ nền của ranh giới thành phần. */
const TEXT_BACKGROUNDS = ['bg-base', 'bg-surface', 'bg-subtle', 'bg-hover'];
const STABLE_BACKGROUNDS = ['bg-base', 'bg-surface', 'bg-subtle'];
const BORDER_BACKGROUNDS = ['bg-base', 'bg-surface', 'bg-subtle'];

const CHECKS = [
  { fg: 'text-primary', bgs: STABLE_BACKGROUNDS, min: 10.0, note: 'chữ chính trên bề mặt ổn định' },
  { fg: 'text-primary', bgs: ['bg-hover'], min: 7.0, note: 'chữ chính trên nền hover (ngưỡng AAA)' },
  { fg: 'text-secondary', bgs: TEXT_BACKGROUNDS, min: 4.5, note: 'chữ phụ' },
  { fg: 'text-muted', bgs: TEXT_BACKGROUNDS, min: 4.5, note: 'chữ mờ (chữ thường, ngưỡng AA)' },
  { fg: 'text-link', bgs: TEXT_BACKGROUNDS, min: 4.5, note: 'liên kết' },
  { fg: 'border-control', bgs: BORDER_BACKGROUNDS, min: 3.0, note: 'ranh giới vùng tương tác (WCAG 1.4.11)' },
  { fg: 'focus-ring', bgs: BORDER_BACKGROUNDS, min: 3.0, note: 'vòng focus (WCAG 1.4.11)' },
];

const PAIR_CHECKS = [
  { fg: 'on-primary', bg: 'primary', min: 4.5, note: 'chữ trên nút chính' },
  { fg: 'on-primary', bg: 'primary-hover', min: 4.5, note: 'chữ trên nút chính khi hover' },
  { fg: 'on-status', bg: 'success', min: 4.5, note: 'chữ trên nền success' },
  { fg: 'on-status', bg: 'warning', min: 4.5, note: 'chữ trên nền warning' },
  { fg: 'on-status', bg: 'danger', min: 4.5, note: 'chữ trên nền danger' },
  { fg: 'on-status', bg: 'info', min: 4.5, note: 'chữ trên nền info' },
];

let failed = 0;
const rows = [];

for (const [theme, colors] of Object.entries(tokens.color)) {
  for (const { fg, bgs, min, note } of CHECKS) {
    if (!colors[fg]) {
      console.error(`LỖI: chế độ ${theme} thiếu token ${fg}`);
      failed++;
      continue;
    }
    let worst = Infinity;
    let worstBg = '';
    for (const bg of bgs) {
      const r = contrast(colors[fg], colors[bg]);
      if (r < worst) { worst = r; worstBg = bg; }
    }
    const ok = worst >= min;
    if (!ok) failed++;
    rows.push({ theme, pair: `${fg} / ${worstBg}`, ratio: worst, min, ok, note });
  }
  for (const { fg, bg, min, note } of PAIR_CHECKS) {
    if (!colors[fg] || !colors[bg]) continue;
    const r = contrast(colors[fg], colors[bg]);
    const ok = r >= min;
    if (!ok) failed++;
    rows.push({ theme, pair: `${fg} / ${bg}`, ratio: r, min, ok, note });
  }
}

const w = (s, n) => String(s).padEnd(n);
console.log(`${w('Chế độ', 8)}${w('Cặp màu (thấp nhất)', 34)}${w('Tỉ số', 9)}${w('Ngưỡng', 9)}Kết quả`);
console.log('-'.repeat(75));
for (const r of rows) {
  console.log(
    `${w(r.theme, 8)}${w(r.pair, 34)}${w(r.ratio.toFixed(2), 9)}${w(r.min.toFixed(1), 9)}${r.ok ? 'ĐẠT' : 'TRƯỢT  <- ' + r.note}`,
  );
}
console.log('-'.repeat(75));

if (failed > 0) {
  console.error(`\n${failed} cặp màu không đạt ngưỡng WCAG của DESIGN_SYSTEM.md mục 1.`);
  process.exit(1);
}
console.log(`\nToàn bộ ${rows.length} cặp màu đạt ngưỡng WCAG.`);
