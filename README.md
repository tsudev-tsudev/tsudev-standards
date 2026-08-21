# tsudev-standards

Bộ quy ước, tài liệu chuẩn và token dùng chung của hệ sinh thái **tsudev**.
Đây là **nguồn chân lý**: các repo con (`tsudev`, `swico`, …) mang bản sao
chỉ-đọc và **đồng bộ xuống** từ đây, không sửa ngược.

## Nội dung

| Đường dẫn | Vai trò |
| --- | --- |
| `AGENTS.md` | Bộ quy ước v1.0.0 - nạp đầu mỗi phiên agent. Bất khả xâm phạm ở repo con. |
| `docs/DESIGN_SYSTEM.md` | Quy ước giao diện: token, thang chữ, quy tắc phát hành. |
| `docs/PROJECT_STRUCTURE.md` | Cây thư mục chuẩn cho repo mới. |
| `docs/templates/HANDOVER.md` | Mẫu phiếu bàn giao giữa các phiên. |
| `tokens/tokens.css` | Bảng token CSS chuẩn hệ sinh thái (bản chính tắc). |
| `tokens/design-tokens.json` | Khối token dùng chung (color/typography/radius/…). Khối `extensions.*` riêng của từng repo con KHÔNG nằm ở đây. |
| `proposals/` | Đề xuất đẩy ngược từ repo con lên bộ quy ước (cũng mở dưới dạng Issue). |

## Quy trình đổi quy ước

1. Sửa file tương ứng trong repo này, tăng phiên bản nếu là thay đổi phá vỡ.
2. Ghi vào `CHANGELOG.md`.
3. Đồng bộ xuống repo con (copy file, chạy `tokens:check` / cổng kiểm của repo đó).

## Đề xuất đang chờ (từ repo `tsudev`)

- `proposals/token-upstream-proposal.md` - hai mã màu chưa đạt WCAG AA, kèm số đo.
- `proposals/structure-upstream-proposal.md` - bổ sung hình trạng monorepo vào cây chuẩn.

Cả hai nên được mở thành **Issue** để theo dõi quyết định.

## Vì sao Private

Repo này **không chạy workflow CI nào** nên dùng 0 phút GitHub Actions - giới hạn
2.000 phút/tháng của gói Free (repo Private) không bao giờ chạm tới. Giữ Private
để bảo mật; chỉ chuyển Public nếu về sau thêm workflow và cần phút Actions miễn phí.
