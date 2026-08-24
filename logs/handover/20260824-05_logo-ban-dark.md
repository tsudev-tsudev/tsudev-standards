# PHIẾU BÀN GIAO - Bản logo cho nền tối

- **Mã phiếu**: 20260824-05
- **Từ**: agent-phien-05 - **Đến**: phiên sau
- **Thời điểm**: 21:20 24/08/2026
- **Trạng thái**: HOÀN THÀNH
- **Nhánh git**: không còn nhánh dang dở; toàn bộ đã merge vào `main`

## 1. Việc đã làm xong

**`tsudev` #66 - hai file bản dark, sinh từ dây chuyền, không cắt tay.**

Thêm `inkToLight()` vào `packages/brand/build-assets.js`, sinh ra
`brand/logo-full-dark.png` (`768x1169`) và `brand/logo-wordmark-dark.png`
(`640x192`).

| Mực trên nền `#0F1B2D` | Trước | Sau |
| --- | --- | --- |
| Chữ `tsu` và tagline (navy `#11355A`) | **1.38** | **17.28** (trắng) |
| Chữ `dev` (cam `#FE7B2E`) | 6.66 | **6.66** - giữ nguyên |

Giữ nguyên chữ cam là quyết định, không phải bỏ sót: nó vốn đã đạt chuẩn trên nền
tối, nên bản dark vẫn là nhận diện tsudev chứ không thành một bảng màu khác.

**`v2.8.0`** (PR #22, nhãn + Release) - `BRAND_ASSETS.md` mục 2 và 4 ghi quy tắc
dùng bản dark, và gỡ món nợ tương ứng ở mục 10.

**Đồng bộ `v2.8.0`** xuống cả 4 repo con: `tsudev` #67, `swico` #7,
`tsudev-cwico` #11, `tsudev-contact` #5. Đã merge, CI `main` xanh, xác minh bằng
clone mới.

## 2. Việc dang dở + bước tiếp theo CỤ THỂ

Không có việc dang dở, hàng đợi trống.

Một việc còn để ngỏ, nay đã ghi thành **`TS-8`** trong hàng đợi `logs/STATE.md`
kèm ba lựa chọn cụ thể (**cần chủ project quyết**):
`tsudev` và `tsudev-cwico` dựng chữ "dev" bằng hai màu khác nhau - website dùng
token `text-link` (xanh), `cwico` dùng dải cam riêng. Cả hai đều hợp lệ theo
`BRAND_ASSETS.md` mục 5. Muốn thống nhất thì phải chọn một, và đó là quyết định
nhận diện chứ không phải lỗi kỹ thuật.

## 3. File liên quan / đang khóa

| Đường dẫn | Lý do | Còn khóa? |
| --- | --- | --- |
| (không có) | Phiên này đã nhả hết khóa | không |

## 4. Yêu cầu gửi agent đang giữ khóa

Không có.

## 5. Cảnh báo và quyết định quan trọng

**a) Cách tách hai màu mực mà không sinh viền bẩn.** Dùng hiệu `b - r`: navy
`#11355A` cho **+73**, cam `#FE7B2E` cho **-208**. Chuẩn hoá về `[0,1]` rồi **pha
theo tỉ lệ** thay vì cắt cứng theo ngưỡng - nhờ vậy viền khử răng cưa giữa hai màu
chữ không bị bỏ lại tối. Alpha giữ nguyên: chính nó mang hình dạng nét chữ, đụng
vào là nét dày lên hoặc mỏng đi.

**b) Chạy lại dây chuyền phải kiểm `git status` ngay sau đó.** Lần chạy thứ hai
sinh ra `og-image.png` khác byte dù nguồn không đổi - **không tái lập được**, và nó
lọt vào diễn biến nếu không nhìn. Đã trả lại bằng `git checkout`. Các file còn lại
tái lập đúng byte, nên chỉ mình `og-image.png` có yếu tố không xác định.

**c) Sai lầm đã phạm ở phiên này: `rm -rf node_modules package-lock.json`.**
`package-lock.json` là **file được theo dõi**. Đã khôi phục bằng `git checkout --`
trước khi commit, không lọt lên remote, nhưng đây là loại lỗi chỉ cần chậm một nhịp
là mất. Dọn sau khi cài tạm thì chỉ xoá thứ mình tạo ra, và `git status` trước khi
commit là bắt buộc chứ không phải cho vui.

**d) Định dạng: repo `tsudev` dùng Prettier `^2.8.8`.** Chạy `npx prettier@3` sửa
lan sang những dòng không liên quan (đã phải làm lại từ đầu). Luôn đọc phiên bản
trong `package.json` rồi ghim đúng bản đó: `npx prettier@2.8.8 --check <file>`.

**e) Giới hạn đã ghi vào tài liệu, không giấu.** Quầng sáng con cú được vẽ để tan
vào nền trắng, nên ở cỡ rất lớn trên nền tối đáy thân cú vẫn hơi lộ vệt sáng. Dưới
300px không nhận ra. Đã dựng ảnh ở 300/200/120px trên nền tối để nhìn trước khi
chốt - **đừng chốt tài sản hình ảnh chỉ bằng số đo tương phản**.

**f) Thứ tự phát hành vẫn như phiếu trước.** Trung tâm -> đồng bộ repo con -> mới
mở PR nội dung ở repo con. Cổng kiểm của repo con chặn PR khi `.standards` lệch bản
trung tâm.

## 6. Trạng thái cổng kiểm

- [x] `./scripts/check-standards.sh` đạt (0 lưu ý)
- [x] `node scripts/build-tokens.mjs --check` đạt
- [x] `node scripts/check-contrast.mjs` đạt - 39/39 cặp màu
- [x] `npx prettier@2.8.8 --check` đạt ở repo `tsudev`
- [x] `git status` sạch ngoài phạm vi bàn giao
- [x] Cổng kiểm xanh trên `main` của repo trung tâm và cả 4 repo con
- [x] Nhãn `v2.8.0` đã đẩy, GitHub Release đã tạo
- [x] Không repo nào còn PR mở

## 7. Kết quả xử lý (agent nhận điền sau khi thực hiện)

-
