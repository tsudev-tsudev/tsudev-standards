# exceptions/ - ngoại lệ đã được duyệt

Nơi ghi lại những trường hợp một project được phép **đi ra ngoài quy ước**, kèm
lý do và thời hạn.

## Vì sao cần thư mục này

Ngoại lệ luôn xảy ra. Vấn đề không phải là có ngoại lệ, mà là ngoại lệ **không
được ghi lại**: sáu tháng sau không ai nhớ vì sao repo đó làm khác, và người mới
hoặc coi đó là lỗi cần sửa, hoặc coi đó là tiền lệ được phép sao chép.

## Cách thêm

1. Mở Issue theo mẫu `Xin ngoại lệ`, nêu đủ: quy ước nào, vì sao không đáp ứng
   được, rủi ro và cách giảm thiểu, ràng buộc 0 đồng có còn giữ được không.
2. Được duyệt thì mở PR thêm file `exceptions/<repo>-<chủ-đề>.md` theo mẫu dưới.
3. `MUST` ghi **ngày hết hiệu lực** hoặc điều kiện chấm dứt. Ngoại lệ vô thời hạn
   không phải ngoại lệ - đó là quy ước ngầm chưa được viết ra.

## Quy tắc ba lần

Nếu cùng một ngoại lệ được duyệt từ **3 lần trở lên** cho cùng loại nhu cầu,
`MUST` mở đề xuất cập nhật chính thức vào quy ước. Ngoại lệ lặp lại ba lần không
còn là ngoại lệ - đó là dấu hiệu quy ước đang thiếu một trường hợp.

## Mẫu

```markdown
# Ngoại lệ: <repo> - <chủ đề ngắn>

- **Quy ước bị lệch**: <đường dẫn file + mục>
- **Repo áp dụng**:
- **Ngày duyệt**: DD/MM/YYYY - **Người duyệt**:
- **Hết hiệu lực**: DD/MM/YYYY hoặc <điều kiện chấm dứt>
- **Issue liên quan**: #

## Vì sao quy ước không đáp ứng được

## Cách làm thay thế

## Rủi ro và cách giảm thiểu

## Kế hoạch quay về đúng quy ước
```

(Chưa có ngoại lệ nào được duyệt.)
