# STATE.md - Trạng thái project

> Agent đọc file này ở đầu mỗi phiên và cập nhật ở cuối mỗi phiên.
> Quy trình: `.standards/docs/AGENT_PROTOCOL.md`.

## Hàng đợi task (làm từ trên xuống)

- [ ] Bổ sung `docs/BRAND_ASSETS.md`: logo, favicon, biến thể theo nền sáng/tối,
      kích thước tối thiểu, vùng an toàn. Hiện tài sản thương hiệu chưa thuộc quy ước nào.
- [ ] Xem lại `GIT_WORKFLOW.md` mục 4.4: quy ước đòi "tối thiểu 1 người duyệt", nhưng
      GitHub không cho tự duyệt PR của mình, nên repo một người sẽ tự khóa. Cần viết rõ
      trường hợp repo một người.

## Đang thực hiện

| Task | Agent | Bắt đầu |
| --- | --- | --- |

## Đã hoàn thành (mới nhất trên cùng)

- 24/08/2026 - Phát hành v2.0.0 đến v2.2.2; đồng bộ xuống 4 repo con.

## Quyết định quan trọng

> Quyết định kiến trúc lớn thì viết ADR riêng theo `docs/templates/ADR.md` và chỉ
> ghi một dòng tham chiếu ở đây.

- 24/08/2026 - Repo chuyển Private sang Public để mở khóa Actions, CodeQL,
  Secret Scanning miễn phí và cho repo con đồng bộ không cần token.

## Sự cố bảo mật

> Ghi theo `.standards/docs/SECURITY_BASELINE.md` mục 9. Để trống nếu chưa có.

- (chưa có)
