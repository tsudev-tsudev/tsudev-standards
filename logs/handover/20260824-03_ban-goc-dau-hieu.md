# PHIẾU BÀN GIAO - Bản gốc dấu hiệu vào repo, sửa mô tả sai của v2.4.0

- **Mã phiếu**: 20260824-03
- **Từ**: agent-phien-03 - **Đến**: phiên sau
- **Thời điểm**: 16:40 24/08/2026
- **Trạng thái**: HOÀN THÀNH
- **Nhánh git**: không còn nhánh dang dở; toàn bộ đã merge vào `main`

## 1. Việc đã làm xong

**`v2.6.0`** - PR #18, nhãn và Release đã tạo.

- `assets/brand/tsudev-logo.png` - bản gốc chính thức, `1024x1024`, SHA-256
  `8527a64d97817732592acb7093f1f42021a9b4e8653ef0774460b2b7dd8a20dc`.
  Đặt ở `assets/` nên **nằm ngoài bộ đồng bộ**: `MANIFEST.sha256` vẫn đúng 46 file
  như trước, repo con không tải thêm byte ảnh nào. Đã kiểm chứng đường lấy file
  ghi trong tài liệu (`curl` + `sha256sum`) trả về đúng chuỗi băm.
- `docs/BRAND_ASSETS.md` - viết lại các mục 1, 2, 5, 6, 10 (xem mục 5a của phiếu).
- `docs/00-INDEX.md` - thêm bản gốc vào bảng "Ngoài thư mục docs".

**Đồng bộ xuống 4 repo con** - `v2.5.0` lên `v2.6.0`, tất cả đã merge, CI `main`
xanh, đã kiểm lại bằng clone mới: `tsudev` #64, `swico` #5, `tsudev-cwico` #8,
`tsudev-contact` #3. Cả 4 báo `version=2.6.0` và `sync-standards.sh --check` khớp.

## 2. Việc dang dở + bước tiếp theo CỤ THỂ

Không có việc dang dở. Hai việc trong hàng đợi, **cả hai chặn ở chỗ cần thiết kế,
không phải chặn ở kỹ thuật**:

- [ ] **TS-5** - tạo dấu hiệu thu gọn `tsudev-mark.png`: chỉ hình cú, KHÔNG chữ,
      nền trong suốt, cạnh ngắn tối thiểu 1024px, **xuất từ file thiết kế gốc**.
      **Cần chủ project làm hoặc đặt làm.** Không có đường tự động nào - xem mục 5b.
- [ ] **TS-6** - thống nhất nhận diện ở `tsudev-cwico`, **bị TS-5 chặn**. Ba bước,
      `MUST` tách thành hai PR:
      1. PR ảnh: thay `assets/brand/`, chạy `pip install Pillow` rồi
         `python3 tools/gen_icons.py`, mở thử vài icon xem có bết không.
      2. PR màu: `ui/src/index.css` đang khai `--color-dev-*` là **cam**
         (`#d2540e`), đổi sang xanh theo `BRAND_ASSETS.md` mục 5. Đây là đổi giao
         diện toàn app, `MUST` có ảnh chụp trước/sau.

## 3. File liên quan / đang khóa

| Đường dẫn | Lý do | Còn khóa? |
| --- | --- | --- |
| (không có) | Phiên này đã nhả hết khóa | không |

## 4. Yêu cầu gửi agent đang giữ khóa

Không có.

## 5. Cảnh báo và quyết định quan trọng

**a) `v2.4.0` mô tả sai bộ nhận diện, `v2.6.0` đã sửa.** Bài học đáng giữ hơn cả
nội dung sửa: `v2.4.0` dựng chuẩn thương hiệu **mà chưa từng mở file ảnh ra xem**,
chỉ đọc mã nguồn và chú thích của `tsudev-cwico` rồi suy ra. Chú thích trong
`ui/src/index.css` nói bảng màu "lấy mẫu từ tsudev-logo.png" với "mắt hổ phách" -
đúng với con cú của repo đó, và sai hoàn toàn với huy hiệu chính thức. Đo bằng
Pillow trên chính hai file mới ra sự thật:

| | Huy hiệu chính thức | Con cú ở `tsudev-cwico` |
| --- | --- | --- |
| Kích thước | `1024x1024` | `222x280` |
| Bố cục | Cú trên vòng mạch, **có chữ "tsudev" nướng sẵn** | Chỉ hình cú, không chữ |
| Mắt | Xanh cyan `#49EBFF` | Cam hổ phách |
| Màu `dev` | Xanh `#14AAFA` | Cam `#d2540e` |

**Quy tắc rút ra: tài sản hình ảnh `MUST` mở ra xem và đo, không suy từ mã nguồn
hay tên file.** Tên `tsudev-logo.png` xuất hiện ở cả hai nơi và trỏ vào hai thứ
khác nhau.

**b) `TS-5` không có đường tự động, đừng thử.** Cắt hình cú ra khỏi huy hiệu để
làm icon là **không làm được**: chữ "tsudev" nằm đè lên vòng mạch ở dải dưới, cắt
đi thì để lại khoảng trống trong vành; crop chỉ phần trên thì cắt cụt vòng mạch,
vi phạm chính điều cấm ở `BRAND_ASSETS.md` mục 8. Đây là việc thiết kế.

**c) Ngưỡng 96px là số đo, không phải cảm tính.** Chữ chiếm khoảng 1/8 chiều cao
ảnh. Ở 96px chữ còn khoảng 12px, đã sát ngưỡng đọc được; ở favicon 32px chữ còn
**4px**. Ai định "thu nhỏ tạm cũng được" thì đọc lại mục 2.

**d) Màu lấy thẳng từ ảnh không dùng được cho chữ.** `#14AAFA` chỉ đạt **2.32:1**
trên nền sáng - trượt cả ngưỡng chữ lớn 3:1. Nền sáng `MUST` dùng `#0B6FA8`
(**4.92**), nền tối dùng `#14AAFA` (**6.72**). Cùng loại bẫy với ghi chú 5e của
phiếu `20260824-01`: **đo trước, tin sau**.

**e) `assets/` nằm ngoài bộ đồng bộ - giữ nguyên như vậy.** `make-manifest.sh` chỉ
băm `AGENTS.md`, `VERSION`, `SECURITY.md`, `docs`, `tokens`, `templates`,
`scripts`. Thêm `assets` vào danh sách đó là bắt cả 4 repo con tải 1.7MB mỗi lần
đồng bộ **và** làm mọi thay đổi ảnh thành thay đổi băm của bộ quy ước. Cách kiểm
soát bản sao là **chuỗi băm ghi trong tài liệu**, không phải MANIFEST.

**f) Bản gốc trên máy cá nhân nay đã có bản sao trong repo.** File cũ
`~/projects/tsudev-standards/logo-tsudev.png` giữ hay xóa đều được - nội dung
giống hệt bản trong repo, đã đối chiếu SHA-256. Tên cũ sai quy ước đặt tên nên
đừng dùng nó làm nguồn cho việc gì nữa.

## 6. Trạng thái cổng kiểm

- [x] `./scripts/check-standards.sh` đạt (0 lưu ý)
- [x] `node scripts/build-tokens.mjs --check` đạt
- [x] `node scripts/check-contrast.mjs` đạt - 39/39 cặp màu
- [x] `MANIFEST.sha256` vẫn 46 file sau khi thêm ảnh
- [x] `git status` sạch ngoài phạm vi bàn giao
- [x] Cổng kiểm xanh trên `main` của repo trung tâm và cả 4 repo con
- [x] Nhãn `v2.6.0` đã đẩy, GitHub Release đã tạo

## 7. Kết quả xử lý (agent nhận điền sau khi thực hiện)

-
