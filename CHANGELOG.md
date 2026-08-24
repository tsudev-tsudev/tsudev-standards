# CHANGELOG - tsudev-standards

Bộ quy ước dùng **Semantic Versioning** (`MAJOR.MINOR.PATCH`), khác với khuôn
phiên bản của app và của website. Cả ba khuôn được giải thích tại
[`docs/VERSIONING.md`](docs/VERSIONING.md).

Mới nhất trên cùng.

---

## 2.3.1 - 24/08/2026

Bản vá **quan trọng cho repo .NET**.

### Sửa lỗi

- `templates/gitignore/dotnet.gitignore` có dòng `[Ll]ogs/` chặn **cả thư mục**
  `logs/` - đúng thư mục điều phối phiên mà `AGENT_PROTOCOL.md` bắt buộc phải
  commit. Bản mẫu của chính bộ quy ước mắc đúng lỗi mà `GITIGNORE_POLICY.md`
  mục 5 cảnh báo.

  Repo `swico` áp bản mẫu này và mất `.standards/templates/logs/*` khỏi bản sao
  quy ước mà không có cảnh báo nào - cho tới khi cổng kiểm mục 3b của v2.3.0 chỉ
  ra. Nay đổi thành `[Ll]ogs/*.log` và `[Ll]ogs/*.txt`.

### Thêm mới

- **Cổng kiểm mục 6b** (chỉ ở repo trung tâm): dựng thử một repo cho **từng** bản
  mẫu `.gitignore`, xác nhận không bản nào chặn `logs/STATE.md`, `logs/LOCKS.md`,
  hay file trong `.standards/`. Cổng canh để lỗi trên không tái diễn khi ai đó
  thêm bản mẫu mới.

  Đã chạy trên cả 7 bản mẫu hiện có: đều sạch.

### Repo .NET cần làm gì

```bash
./scripts/sync-standards.sh --ref v2.3.1
```

Rồi kiểm `.gitignore` của repo còn dòng `[Ll]ogs/` không; nếu còn thì thu hẹp
thành `[Ll]ogs/*.log`.

---

## 2.3.0 - 24/08/2026

Bổ sung một cổng canh cho lỗi im lặng nguy hiểm nhất tìm được cho tới nay.

### Thêm mới

- **Cổng kiểm mục 3b: file bắt buộc phải được commit.**

  Quy tắc `.gitignore` riêng của repo có thể nuốt mất chính những file mà bộ quy
  ước bắt buộc phải commit, và nuốt **hoàn toàn im lặng**. Hai ca có thật, cả hai
  đều lọt qua cổng kiểm cũ:

  | Repo | Chuyện gì xảy ra |
  | --- | --- |
  | `tsudev-cwico` | Dòng `/logs/` (vốn dành cho nhật ký chạy của ứng dụng) chặn luôn **toàn bộ** thư mục điều phối phiên. `logs/STATE.md` và `logs/LOCKS.md` có trên đĩa nhưng không bao giờ được commit - `AGENT_PROTOCOL.md` mất nền tảng mà không ai biết |
  | `swico` | Một quy tắc cũ chặn `.standards/templates/logs/*`, khiến **bản sao quy ước bị khuyết 3 file** so với bản trung tâm |

  Cổng kiểm nay xác minh: `logs/STATE.md` và `logs/LOCKS.md` tồn tại **và** thực
  sự nằm trong chỉ mục git; toàn bộ file trong `.standards/` không bị quy tắc nào
  chặn. Khi thất bại, nó in ra **đúng dòng `.gitignore` gây ra** và gợi ý cách thu
  hẹp quy tắc.

### Sửa lỗi

- Repo trung tâm bắt mọi repo phải có `logs/` theo `PROJECT_STRUCTURE.md` nhưng
  bản thân lại không có. Nay đã có, và chính cổng kiểm mới là thứ phát hiện ra.

---

## 2.2.2 - 24/08/2026

Bản vá tài liệu. Không đổi mã.

### Sửa lỗi

- `docs/SYNC.md` mục 3 hướng dẫn `cp` file mẫu từ `.standards/templates/logs/`
  ra `logs/`, nhưng file trong `.standards/` là chỉ-đọc và `cp` **giữ nguyên
  quyền đó**. Repo làm đúng theo hướng dẫn sẽ có `logs/STATE.md` không ghi được
  - tức là agent không cập nhật được trạng thái ở cuối phiên, và phiên sau mất
  toàn bộ ngữ cảnh bàn giao. Đây là hỏng đúng cơ chế mà `AGENT_PROTOCOL.md`
  dựa vào.

  Bổ sung `chmod u+w logs/STATE.md logs/LOCKS.md` vào quy trình, kèm cảnh báo ở
  `docs/ONBOARDING.md` mục 1.3 và một dòng xử lý sự cố ở `docs/SYNC.md` mục 8.

Phát hiện khi đồng bộ xuống repo `tsudev-cwico`.

---

## 2.2.1 - 24/08/2026

Bản vá **quan trọng**. Nên nâng cấp ngay nếu đã đồng bộ bằng bản 2.0.0 đến 2.2.0.

### Sửa lỗi

- `scripts/sync-standards.sh` đặt chỉ-đọc cho **cả thư mục** `.standards/`, không
  chỉ cho file. Thư mục không có quyền ghi thì git không unlink được file bên
  trong, nên `git checkout` sang nhánh khác **báo thành công nhưng bỏ sót file**:

  ```
  warning: unable to unlink '.standards/docs/a.md': Permission denied
  Switched to branch 'main'
  ```

  Hậu quả: cây làm việc lệch với nhánh mà không ai được báo lỗi, và file sót lại
  thành rác chặn mọi lần checkout sau. `git clean` và `rm -rf` cũng hỏng theo.

  Nay chỉ đặt chỉ-đọc cho file (`find -type f -exec chmod a-w`).

### Nói lại cho đúng

Quyền chỉ-đọc chỉ là **rào chắn nhẹ**: git trả lại quyền ghi sau mỗi lần
checkout. Cơ chế phát hiện sửa trộm thật sự là `sync-standards.sh --check` và
`check-standards.sh`, không phải quyền file. `docs/SYNC.md` mục 8 đã bổ sung
cách xử lý cho cây đã lỡ đồng bộ bằng bản cũ.

### Nếu đã đồng bộ bằng bản 2.0.0 đến 2.2.0

```bash
chmod -R u+w .standards
./scripts/sync-standards.sh --ref v2.2.1
```

---

## 2.2.0 - 24/08/2026

Bổ sung thuần. Đồng bộ được ngay, không cần sửa mã.

### Thêm mới

- **`.standards-allow` - miễn trừ có ghi chép cho cổng kiểm file nhạy cảm.**

  Cổng kiểm cấm mọi file khớp mẫu nhạy cảm nằm trong chỉ mục git. Quy tắc đó
  đúng trong hầu hết trường hợp, nhưng có ngoại lệ hợp lệ: `.env.production`
  của một app Next.js chỉ mang biến `NEXT_PUBLIC_*` vốn được biên dịch thẳng
  vào bundle trình duyệt, tức đã công khai theo thiết kế.

  Trước bản này, repo gặp tình huống đó chỉ có hai lối: để cổng kiểm đỏ vĩnh
  viễn, hoặc nới mẫu chặn cho cả hệ sinh thái. Cả hai đều tệ hơn vấn đề.

  Cơ chế mới đòi **đủ ba cột** `<đường dẫn> | <lý do> | <hạn>`; thiếu lý do
  hoặc thiếu hạn thì vẫn chặn. Mỗi lần chạy, dòng miễn trừ được in ra dạng
  `LƯU Ý` nên không bao giờ trở nên vô hình. Chi tiết và cảnh báo rủi ro:
  `docs/GITIGNORE_POLICY.md` mục 6. Mẫu: `templates/standards-allow.example`.

Phát hiện khi đồng bộ bộ quy ước xuống repo `tsudev`.

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
