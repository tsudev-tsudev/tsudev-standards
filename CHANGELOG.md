# CHANGELOG - tsudev-standards

Bộ quy ước dùng **Semantic Versioning** (`MAJOR.MINOR.PATCH`), khác với khuôn
phiên bản của app và của website. Cả ba khuôn được giải thích tại
[`docs/VERSIONING.md`](docs/VERSIONING.md).

Mới nhất trên cùng.

---

## 2.1.0 - 24/08/2026

Bổ sung thuần. Đồng bộ được ngay, không cần sửa mã.

### Thêm mới

- `templates/gitignore/rust.gitignore`. `LANGUAGE_SELECTION.md` mục 2.3 xếp Rust
  ở mức ⭐ cho đồ họa, kỹ thuật và game engine, nhưng bộ mẫu `.gitignore` lại
  chưa có bản cho Rust - repo Rust chỉ ghép được phần nền.
  Bản mới che thêm: tạo phẩm Cargo, thông tin đăng nhập `.cargo/credentials`,
  dữ liệu đo phủ và hiệu năng, thư mục build của Tauri, và **khóa ký bản cập
  nhật Tauri** (`*.tauri.key`) - lộ khóa này là mất quyền kiểm soát kênh cập
  nhật của ứng dụng đã cài trên máy người dùng.

Phát hiện khi chuẩn bị đồng bộ bộ quy ước xuống repo `tsudev-cwico`.

---

## 2.0.1 - 24/08/2026

Bản vá. Đồng bộ được ngay, không cần sửa mã.

### Sửa lỗi

- `scripts/check-standards.sh` báo nhầm file mẫu dạng `.env.<môi-trường>.example`
  là file nhạy cảm. Biểu thức cũ chỉ miễn trừ đúng `.env.example`, nên
  `.env.production.example` bị chặn oan. Cổng kiểm báo sai làm người dùng mất
  niềm tin vào cổng kiểm, và đó là cách nhanh nhất để cả nhóm học thói quen bỏ
  qua màu đỏ.
- `.gitignore` chuẩn bổ sung hai dòng miễn trừ `!.env.*.example` và
  `!.env.*.sample`, để file mẫu theo từng môi trường commit được.

Phát hiện khi chạy cổng kiểm lần đầu trên repo `tsudev`.

---

## 2.0.0 - 24/08/2026

Tái cấu trúc toàn diện. Bộ quy ước chuyển từ 6 file rời sang một hệ có cổng kiểm
tự động, cơ chế đồng bộ, và chuẩn bảo mật đầy đủ.

### Thêm mới

**Bảo mật (yêu cầu trọng tâm của bản này):**

- `SECURITY.md` - chính sách, kênh báo lỗ hổng riêng tư, cam kết thời hạn phản hồi,
  phân mức CVSS.
- `docs/SECURITY_BASELINE.md` - chuẩn bảo mật kỹ thuật bắt buộc: phân loại dữ liệu
  D0-D3, quản lý secret, 4 lớp cổng kiểm mã nguồn, chuỗi cung ứng phần mềm, xác thực
  và phân quyền, đối chiếu OWASP Top 10, header HTTP, quy trình ứng phó sự cố,
  checklist theo giai đoạn, bộ công cụ 0 đồng, và ranh giới riêng cho agent AI.
- `docs/GITIGNORE_POLICY.md` - quy tắc duy trì `.gitignore`, 10 nhóm bảo vệ, bốn
  sai lầm hay gặp.
- `.gitleaks.toml` - cấu hình quét secret, có luật riêng cho chuỗi kết nối và dữ
  liệu cá nhân Việt Nam.
- `docs/templates/SECURITY_REVIEW.md` - phiếu rà soát bảo mật đính kèm PR.

**Cơ chế đồng bộ (repo con luôn ở bản mới nhất):**

- `VERSION` và `MANIFEST.sha256` - repo con biết mình đang ở bản nào và phát hiện
  được file bị sửa tay.
- `scripts/sync-standards.sh` - đồng bộ xuống repo con, **không cần token**, tự xác
  minh toàn vẹn theo MANIFEST trước khi ghi.
- `scripts/check-standards.sh` - cổng kiểm quy ước, chạy được ở cả repo trung tâm
  lẫn repo con.
- `docs/SYNC.md` - mô hình, cài đặt lần đầu, phát hiện lệch tự động, xử lý sự cố.

**Cổng canh tự động:**

- `scripts/build-tokens.mjs` - sinh `tokens.css` từ `design-tokens.json`, có chế độ
  `--check` cho CI. Xóa hẳn khả năng hai file lệch nhau.
- `scripts/check-contrast.mjs` - kiểm 39 cặp màu đạt ngưỡng WCAG ở cả ba chế độ.
- `scripts/make-manifest.sh`.
- Workflow CI: cổng kiểm quy ước, gitleaks, CodeQL.

**Tài liệu mới:**

- `docs/00-INDEX.md` - bản đồ đọc theo vai trò.
- `docs/AGENT_PROTOCOL.md` - quy trình phiên làm việc, tách khỏi `AGENTS.md`.
- `docs/LANGUAGE_SELECTION.md` - chọn ngôn ngữ và framework theo loại project.
- `docs/FREE_TIER_STACK.md` - nhà cung cấp và hạn mức 0 đồng, ưu tiên vùng Singapore.
- `docs/RICH_TEXT_EDITOR.md` - chuẩn trình soạn thảo nội dung ngang Microsoft Word.
- `docs/SEARCH_AND_FILTER.md` - chuẩn tìm kiếm và lọc tối ưu tiếng Việt.
- `docs/GIT_WORKFLOW.md`, `docs/TESTING_QUALITY.md`, `docs/ACCESSIBILITY.md`,
  `docs/VERSIONING.md`, `docs/ONBOARDING.md`.
- `docs/templates/ADR.md`.
- `templates/gitignore/` - bản chuẩn cùng phần bổ sung cho Node, Python, .NET, C++, Mobile.
- `templates/logs/` và `templates/AGENTS.downstream.md`.
- `LICENSE` (MIT), `CONTRIBUTING.md`, `.gitattributes`, `.editorconfig`, `.env.example`.

### Thay đổi phá vỡ

1. **Giá trị `text-muted` đổi ở cả ba chế độ** để đạt WCAG AA. Bảng v1.0.0 trượt
   ngưỡng 4.5:1 ở cả ba chế độ (thấp nhất 3.69 / 4.43 / 3.89) - vi phạm chính quy
   tắc của `DESIGN_SYSTEM.md` mục 1.

   | Chế độ | Từ | Thành | Thấp nhất sau khi sửa |
   | --- | --- | --- | --- |
   | Sáng | `#5F7891` | `#52627A` | 4.99 |
   | Ấm | `#6E6552` | `#5E5646` | 5.57 |
   | Tối | `#8298B2` | `#9BB0C9` | 5.19 |

2. **Thêm token `border-control`**, `border-strong` **thu hẹp** về vai trò trang
   trí. Hai vai trò khác nhau đang bị gộp vào một token: ranh giới trang trí không
   cần đạt 3:1, ranh giới vùng tương tác thì bắt buộc. Giá trị mới:
   `#74899F` (Sáng) / `#8E8064` (Ấm) / `#6E88AE` (Tối), thấp nhất 3.05 / 3.18 / 3.73.

3. **`tokens/tokens.css` trở thành file sinh tự động.** Không sửa tay nữa. Kéo
   theo ba thay đổi tên:

   | Nơi | Trước | Sau |
   | --- | --- | --- |
   | Biến CSS | `--easing` | `--motion-easing` |
   | Biến CSS | (chưa xuất ra CSS) | `--ls-body`, `--ls-heading`, `--ls-caps-label` |
   | Khóa JSON | `typography.line-height.long-text` | `typography.line-height.long` |

   Đổi khóa JSON ảnh hưởng tới mọi nơi **đọc thẳng `design-tokens.json`** (C#,
   Python, C++), không chỉ Web.

4. **`docs/PROJECT_STRUCTURE.md` nhận hình trạng thứ hai (monorepo).** Repo phải
   tự khai mình theo hình trạng A hay B trong `AGENTS.md` phần B.

5. **`AGENTS.md` rút gọn thành điểm vào.** Nội dung chi tiết chuyển sang các tài
   liệu chuyên đề trong `docs/`. Repo con tham chiếu tài liệu, không chép nội dung.

### Hướng dẫn nâng cấp từ 1.x

```bash
# 1. Đồng bộ bản mới
./scripts/sync-standards.sh --ref v2.0.0

# 2. Tìm mọi chỗ đang ghi đè text-muted hoặc border-strong cục bộ
grep -rn "text-muted\|border-strong" src/ packages/ --include="*.css" --include="*.ts"
```

- [ ] Xóa mọi bản ghi đè cục bộ của `text-muted` - giá trị chuẩn nay đã đạt AA.
- [ ] Rà soát mọi chỗ dùng `border-strong` cho **viền nút phụ hoặc viền ô nhập**,
      đổi sang `border-control`. Giữ `border-strong` cho đường chia khối và nét
      mảnh của card.
- [ ] Chạy lại test tương phản và cập nhật ảnh chụp giao diện - màu đã đổi.
- [ ] Đổi `var(--easing)` thành `var(--motion-easing)` nếu có dùng.
- [ ] Nếu đọc thẳng `design-tokens.json` (C#, Python, C++): đổi khóa
      `line-height.long-text` thành `line-height.long`.
- [ ] Khai hình trạng A hay B trong `AGENTS.md` phần B.
- [ ] Bật cổng kiểm CI theo `docs/SYNC.md` mục 5.1.
- [ ] Chạy `./scripts/check-standards.sh` và xử lý hết vi phạm.

### Sửa lỗi

- `docs/PROJECT_STRUCTURE.md` trước đây trỏ repo trung tâm là
  `tsudev-design-tokens` - tên sai, nguồn chân lý thật là `tsudev-standards`.
- `.gitignore` và `logs/` được quy ước v1.0.0 tham chiếu nhưng **chưa bao giờ tồn
  tại trong repo**. Nay có đủ, dưới dạng bản chuẩn trong `templates/`.
- Hai đề xuất treo trong `proposals/` từ 20/08/2026 đã được nhận vào bản này.

### Vận hành

- Repo chuyển từ **Private sang Public**. Lý do đầy đủ ở `README.md`.

---

## 1.0.1 - 22/08/2026

- Thêm quy ước gạch ngang vào `AGENTS.md` mục 6: chỉ dùng hyphen `-` (U+002D)
  trong mọi văn bản, không dùng em-dash (U+2014); en-dash chỉ cho khoảng số.
  Thay toàn bộ em-dash trong repo thành hyphen (10 file, 46 chỗ).

## 1.0.0 - 19/08/2026

- Khởi tạo bộ quy ước trung tâm: `AGENTS.md`, `docs/DESIGN_SYSTEM.md`,
  `docs/PROJECT_STRUCTURE.md`, `docs/templates/HANDOVER.md`, `tokens/`.
