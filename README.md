# tsudev-standards

**Nguồn chân lý** của hệ sinh thái [tsudev](https://tsudev.com): quy ước, tài
liệu chuẩn, design token và script đồng bộ dùng chung cho mọi project, tool, và
phần mềm.

Mọi repo con (`tsudev-web`, `swico`, ...) mang một **bản sao chỉ-đọc** tại
`.standards/` và đồng bộ xuống từ đây. Không sửa ngược.

> **Bắt đầu ở đâu:** đọc [`AGENTS.md`](AGENTS.md) trước. Đó là điểm vào bắt buộc
> của mọi phiên làm việc, cho cả lập trình viên và agent AI.
> Bản đồ đầy đủ: [`docs/00-INDEX.md`](docs/00-INDEX.md).

## Đưa bộ quy ước vào một repo

Repo này là **Public**, nên đồng bộ **không cần token, không cần đăng nhập**:

```bash
mkdir -p scripts
curl -fsSL https://raw.githubusercontent.com/tsudev-tsudev/tsudev-standards/main/scripts/sync-standards.sh \
  -o scripts/sync-standards.sh
chmod +x scripts/sync-standards.sh
./scripts/sync-standards.sh
```

Các bước còn lại (ghép `.gitignore`, dựng `logs/`, bật cổng kiểm CI):
[`docs/SYNC.md`](docs/SYNC.md) mục 3.

## Nội dung

| Đường dẫn | Vai trò |
| --- | --- |
| [`AGENTS.md`](AGENTS.md) | Điểm vào bắt buộc, nạp đầu mỗi phiên. Bất khả xâm phạm ở repo con |
| [`SECURITY.md`](SECURITY.md) | Chính sách bảo mật và kênh báo lỗ hổng |
| [`VERSION`](VERSION) | Phiên bản hiện tại của bộ quy ước |
| [`MANIFEST.sha256`](MANIFEST.sha256) | SHA-256 của từng file quy ước, để repo con xác minh toàn vẹn |
| [`docs/`](docs/) | 16 tài liệu chuyên đề - xem [`docs/00-INDEX.md`](docs/00-INDEX.md) |
| [`tokens/design-tokens.json`](tokens/design-tokens.json) | Nguồn chân lý duy nhất của giao diện |
| [`tokens/tokens.css`](tokens/tokens.css) | Bản CSS **sinh tự động** từ JSON, không sửa tay |
| [`templates/`](templates/) | `.gitignore` chuẩn theo nền tảng, mẫu `logs/`, mẫu `AGENTS.md` cho repo con |
| [`scripts/`](scripts/) | Đồng bộ, cổng kiểm, sinh token, canh tương phản |
| [`proposals/`](proposals/) | Đề xuất đẩy ngược từ repo con |
| [`exceptions/`](exceptions/) | Ngoại lệ đã được duyệt, làm tiền lệ tham chiếu |

## Cổng kiểm

Bộ quy ước tự canh chính mình. Bốn script chạy được cục bộ và trên CI:

```bash
./scripts/check-standards.sh        # cổng kiểm tổng: gitignore, file nhạy cảm, gạch ngang, token, manifest
node scripts/build-tokens.mjs       # sinh lại tokens.css từ design-tokens.json
node scripts/check-contrast.mjs     # kiểm mọi cặp màu đạt ngưỡng WCAG
./scripts/make-manifest.sh          # sinh lại MANIFEST.sha256 sau khi đổi nội dung
```

Quy tắc không có cổng canh chỉ là lời khuyên. Bảng token v1.0.0 từng vi phạm
chính quy tắc tương phản của mình ở cả ba chế độ mà không ai phát hiện - đó là
lý do `check-contrast.mjs` tồn tại.

## Đổi quy ước

1. Tách nhánh, sửa file tương ứng.
2. Cập nhật [`VERSION`](VERSION) theo [`docs/VERSIONING.md`](docs/VERSIONING.md) mục 1.
3. Ghi vào [`CHANGELOG.md`](CHANGELOG.md). Thay đổi phá vỡ thì phải có mục
   **Hướng dẫn nâng cấp**.
4. Chạy `./scripts/make-manifest.sh` và `./scripts/check-standards.sh`.
5. Mở PR. Chi tiết: [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Vì sao Public

Đổi từ Private sang Public ngày 24/08/2026, vì Private đang phản tác dụng với
chính mục tiêu bảo mật và 0 đồng:

- Private buộc **mỗi repo con phải giữ một token** để đồng bộ. Đó là đẻ thêm
  secret phải quản lý, không phải bảo vệ.
- GitHub Actions **không giới hạn phút** với repo Public; Private free chỉ có
  2.000 phút/tháng.
- **CodeQL, Secret Scanning, Push Protection miễn phí với repo Public**; với
  Private phải mua GitHub Advanced Security.
- Nội dung repo là quy ước, mã màu, cấu trúc thư mục - **không chứa bí mật nào**.
  Che nó đi không bảo vệ được gì.

## Giấy phép

[MIT](LICENSE).
