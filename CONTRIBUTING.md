# Đóng góp vào tsudev-standards

Repo này là **nguồn chân lý** của cả hệ sinh thái. Một dòng sai ở đây lan xuống
mọi project. Vì vậy quy trình chặt hơn repo thường - không phải để làm khó, mà
vì phạm vi ảnh hưởng lớn hơn.

## Ba đường đóng góp

| Bạn muốn gì | Làm gì |
| --- | --- |
| Đề xuất **thay đổi quy ước** (từ repo con) | Mở Issue theo mẫu `Đề xuất quy ước`, hoặc thêm file vào `proposals/` |
| Xin **ngoại lệ** cho một project cụ thể | Mở Issue theo mẫu `Xin ngoại lệ`; nếu được duyệt thì PR vào `exceptions/` |
| **Sửa lỗi** diễn đạt, liên kết hỏng | PR thẳng, không cần Issue |
| Báo **lỗ hổng bảo mật** | KHÔNG mở Issue. Theo [`SECURITY.md`](SECURITY.md) mục 3 |

## Một đề xuất tốt gồm những gì

Đề xuất bị từ chối nhiều nhất là loại chỉ nói "nên đổi X thành Y". Cần đủ bốn phần:

1. **Vấn đề cụ thể** - quy ước hiện tại làm hỏng việc gì, ở repo nào, khi nào.
2. **Số đo hoặc bằng chứng** - không phải cảm nhận. Với token màu thì là tỉ số
   tương phản; với hiệu năng thì là con số đo được; với cấu trúc thì là ví dụ
   thật đang lệch.
3. **Đề xuất cụ thể** - viết đúng câu chữ sẽ đưa vào quy ước, không mô tả chung.
4. **Ảnh hưởng tới repo con** - ai phải sửa gì, mất bao lâu.

Hai file trong `proposals/` là ví dụ mẫu về mức chi tiết mong đợi.

## Quy trình PR

1. Tách nhánh từ `main` theo [`docs/GIT_WORKFLOW.md`](docs/GIT_WORKFLOW.md) mục 1.
2. Sửa nội dung.
3. Nếu đụng `tokens/design-tokens.json`:
   ```bash
   node scripts/build-tokens.mjs
   node scripts/check-contrast.mjs
   ```
4. Cập nhật [`VERSION`](VERSION) theo [`docs/VERSIONING.md`](docs/VERSIONING.md) mục 1.
5. Ghi vào [`CHANGELOG.md`](CHANGELOG.md). Thay đổi phá vỡ **bắt buộc** có mục
   "Hướng dẫn nâng cấp" với các bước cụ thể, không mô tả chung chung.
6. Sinh lại manifest và chạy cổng kiểm:
   ```bash
   ./scripts/make-manifest.sh
   ./scripts/check-standards.sh
   ```
7. Mở PR theo mẫu.

## Quy tắc viết

- Tiếng Việt có dấu, cho cả tài liệu lẫn comment trong file cấu hình.
- **Chỉ dùng gạch ngang ngắn `-`**. Dòng nào phải trích chính ký tự em-dash để
  định nghĩa quy tắc thì ghi kèm mã điểm `U+2014` trên cùng dòng - cổng kiểm nhận
  diện theo dấu đó.
- Ngày dạng `DD/MM/YYYY`, ngày giờ `HH:mm DD/MM/YYYY`.
- Dùng ký hiệu RFC 2119 nhất quán: `MUST`, `MUST NOT`, `SHOULD`, `MAY`.
- Viết câu khẳng định, nói rõ **vì sao** một quy tắc tồn tại. Quy tắc không có lý
  do là quy tắc sẽ bị bỏ qua ở lần đầu tiên nó gây bất tiện.
- Mỗi quy tắc mới `SHOULD` đi kèm một cách kiểm tự động. Không có cổng canh thì
  quy tắc chỉ là lời khuyên.

## Điều gì KHÔNG thuộc repo này

- Quyết định kiến trúc của một project cụ thể - thuộc `docs/ARCHITECTURE.md` của
  repo đó.
- Token riêng của một repo - thuộc khối `extensions.*` ở repo đó.
- Bất kỳ secret, khóa, hay dữ liệu cá nhân nào.
