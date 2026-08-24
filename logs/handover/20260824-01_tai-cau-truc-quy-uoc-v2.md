# PHIẾU BÀN GIAO - Tái cấu trúc bộ quy ước lên v2.x và đồng bộ xuống repo con

- **Mã phiếu**: 20260824-01
- **Từ**: agent-tai-cau-truc - **Đến**: phiên sau
- **Thời điểm**: 09:20 24/08/2026
- **Trạng thái**: HOÀN THÀNH
- **Nhánh git**: không còn nhánh dang dở; toàn bộ đã merge vào `main`

## 1. Việc đã làm xong

**Bộ quy ước trung tâm** - `tsudev-standards`, từ `v1.0.1` lên `v2.3.2`,
12 PR đã merge (#4 đến #12 ở repo này), 9 nhãn phát hành.

| Nhãn | Nội dung |
| --- | --- |
| `v2.0.0` | Tái cấu trúc toàn diện. 62 file, +5696/-194 |
| `v2.0.1` | Cổng kiểm báo nhầm `.env.<môi-trường>.example` là file nhạy cảm |
| `v2.1.0` | Bổ sung `templates/gitignore/rust.gitignore` |
| `v2.2.0` | `.standards-allow` - miễn trừ có ghi chép, đòi đủ ba cột |
| `v2.2.1` | `chmod -R a-w` làm `git checkout` báo thành công nhưng bỏ sót file |
| `v2.2.2` | `cp` từ `.standards/` khiến `logs/STATE.md` không ghi được |
| `v2.3.0` | Cổng kiểm mục 3b - phát hiện file bắt buộc bị `.gitignore` nuốt mất |
| `v2.3.1` | `dotnet.gitignore` của chính bộ quy ước chặn mất `logs/` |
| `v2.3.2` | Loại `.standards/` khỏi mọi công cụ tự sửa file |

**Nội dung chính đưa vào v2.0.0:**

- Bảo mật: `SECURITY.md`, `docs/SECURITY_BASELINE.md` (phân loại dữ liệu D0-D3,
  quản lý secret, 4 lớp cổng kiểm mã nguồn, chuỗi cung ứng, xác thực và phân
  quyền, OWASP Top 10, header HTTP, ứng phó sự cố, bộ công cụ 0 đồng, ranh giới
  riêng cho agent AI), `docs/GITIGNORE_POLICY.md`, `.gitleaks.toml`.
- Đồng bộ: `VERSION`, `MANIFEST.sha256`, `scripts/sync-standards.sh` (không cần
  token, tự xác minh SHA-256), `scripts/check-standards.sh`, `docs/SYNC.md`.
- Cổng canh: `scripts/build-tokens.mjs`, `scripts/check-contrast.mjs`,
  `scripts/make-manifest.sh`.
- Tài liệu mới: `00-INDEX`, `AGENT_PROTOCOL`, `LANGUAGE_SELECTION`,
  `FREE_TIER_STACK`, `RICH_TEXT_EDITOR`, `SEARCH_AND_FILTER`, `GIT_WORKFLOW`,
  `TESTING_QUALITY`, `ACCESSIBILITY`, `VERSIONING`, `ONBOARDING`, mẫu `ADR` và
  `SECURITY_REVIEW`.
- Nhận cả hai đề xuất treo trong `proposals/`: sửa `text-muted` đạt WCAG AA ở cả
  ba chế độ, thêm `border-control`, thêm hình trạng monorepo vào
  `PROJECT_STRUCTURE.md`.

**Vận hành repo trung tâm:**

- Chuyển **Private sang Public** (đã quét sạch lịch sử git trước khi chuyển).
- Bật: Secret Scanning, Push Protection, Dependabot alerts + security updates,
  CodeQL, Private Vulnerability Reporting.
- Branch protection cho `main`: bắt buộc PR, cấm force-push, cấm xóa nhánh, bắt
  buộc giải quyết thảo luận, 4 cổng kiểm bắt buộc, **áp cả với admin**.

**Đồng bộ xuống 4 repo con** - tất cả đã merge, cổng kiểm xanh trên `main`:

| Repo | PR | Stack | Nợ chuẩn đã ghi |
| --- | --- | --- | --- |
| `tsudev` | #61 | TypeScript / Next.js monorepo | 4 việc `QU-STD-*` |
| `swico` | #1, #2, #3 | C# / .NET | 3 việc |
| `tsudev-cwico` | #6 | Rust | 2 việc |
| `tsudev-contact` | #1 | Python | 3 việc |

Mỗi repo có: `.standards/` 39 file chỉ-đọc, `.standards-version` truy nguyên tới
commit, `.gitignore` ghép chuẩn giữ nguyên phần riêng cũ, `logs/` điều phối phiên,
`AGENTS.md` trỏ về quy ước chung, cổng kiểm CI chặn merge khi lệch.

**Không đụng vào:** `winget-pkgs` (fork của `microsoft/winget-pkgs`),
`sumy-wedding` (Private, trang thiệp cưới cá nhân - xem TS-4 trong hàng đợi).

## 2. Việc dang dở + bước tiếp theo CỤ THỂ

Không có việc dang dở. Bốn việc trong hàng đợi `logs/STATE.md` đều là việc mới,
chưa ai bắt đầu:

- [ ] **TS-1** `docs/BRAND_ASSETS.md`. Tham chiếu `tsudev-cwico/assets/brand/` để
      lấy chuẩn biến thể sáng/tối đang dùng thật.
- [ ] **TS-2** Sửa `docs/GIT_WORKFLOW.md` mục 4.4 cho khớp thực tế repo một người.
      **Đây là điểm tài liệu đang lệch cấu hình thật, nên làm sớm.**
- [ ] **TS-3** Cân nhắc `go.gitignore` và `java.gitignore`.
- [ ] **TS-4** Quyết `sumy-wedding` có thuộc hệ sinh thái không - **cần chủ project**.

Việc lớn nhất **không** nằm ở repo này mà ở repo con: di trú `tokens/` sang
`.standards/tokens/`. Xem mục 5.

## 3. File liên quan / đang khóa

| Đường dẫn | Lý do | Còn khóa? |
| --- | --- | --- |
| (không có) | Phiên này không giữ khóa nào | không |

`logs/LOCKS.md` trống. Ghi chú trung thực: `logs/` mới được tạo ở giữa phiên này
(v2.3.0 phát hiện repo trung tâm chưa có), nên phần lớn công việc diễn ra trước
khi cơ chế khóa tồn tại ở repo này. Phiên sau `MUST` khóa file theo đúng
`docs/AGENT_PROTOCOL.md` mục 3.

## 4. Yêu cầu gửi agent đang giữ khóa

Không có.

## 5. Cảnh báo và quyết định quan trọng

**a) `tokens/` ở repo con vẫn là bảng v1.0.0 có lỗi WCAG.**
26 file mã nguồn trên 3 repo đang đọc token cục bộ. Bảng v1.0.0 có `text-muted`
**trượt ngưỡng AA 4.5:1 ở cả ba chế độ** (thấp nhất 3.69 / 4.43 / 3.89). Bộ quy
ước đã sửa nhưng repo con chưa dùng. Đây là việc `QU-STD-1` trong hàng đợi của
từng repo. Cần chạy lại ảnh chụp giao diện sau khi đổi - đó là lý do phiên này
không tự làm.

**b) Miễn trừ ở `tsudev` hết hạn 31/12/2026.**
`apps/frontend-main/.env.production` được miễn trừ trong `.standards-allow`.
Không có secret (chỉ `NEXT_PUBLIC_MAIN_URL`), nhưng biến này dùng ở **18 chỗ**
gồm `scripts/deploy-frontend.js`, `render.yaml`, `config/topology.json` - chuyển
đi cần chạy được build và deploy để kiểm chứng. Việc `QU-STD-4` ở repo `tsudev`.

**c) Cái bẫy đã dính ba lần: quyền chỉ-đọc của `.standards/`.**
Đặt `chmod -R a-w` cho cả thư mục làm hỏng `rm -rf`, làm `git checkout` bỏ sót
file mà vẫn trả mã thoát 0, và làm `cp` sinh ra `logs/STATE.md` không ghi được.
Nay chỉ đặt chỉ-đọc cho **file**. Nếu gặp cây cũ bị hỏng quyền:
```bash
chmod -R u+w .standards && ./scripts/sync-standards.sh
```

**d) Đừng để công cụ định dạng chạm `.standards/`.**
`MANIFEST.sha256` băm từng byte. Một lần Prettier chạy qua là đủ làm lệch băm và
khiến `sync-standards.sh --check` báo lệch vĩnh viễn. Quy tắc ở `docs/SYNC.md`
mục 3.1. Đã áp cho `tsudev`; ba repo còn lại chưa có Prettier nên chưa cần.

**e) Cách nhận ra phép đo tương phản bị sai.**
Quên `srgbToLinear` ở **một** kênh vẫn cho ra bảng số trông hoàn toàn hợp lý.
Dấu hiệu: một giá trị đã qua cổng CI mà phép đo mới nói là hỏng thì **nghi phép
đo trước, nghi mã màu sau**. Bản cài đặt tham chiếu: `scripts/check-contrast.mjs`.

**f) Không tin trạng thái cục bộ khi kiểm chứng sau merge.**
`swico` PR #2 merge ở `v2.3.1` dù đã force-push bản `v2.3.2` - GitHub dùng
snapshot cũ hơn. Chỉ phát hiện được vì clone lại từ đầu để kiểm. Đã sửa bằng PR #3.

## 6. Trạng thái cổng kiểm

- [x] `./scripts/check-standards.sh` đạt (0 lưu ý)
- [x] `node scripts/build-tokens.mjs --check` đạt
- [x] `node scripts/check-contrast.mjs` đạt - 39/39 cặp màu
- [x] `git status` sạch ngoài phạm vi bàn giao
- [x] Cổng kiểm xanh trên `main` của cả 4 repo con

## 7. Kết quả xử lý (agent nhận điền sau khi thực hiện)

-
