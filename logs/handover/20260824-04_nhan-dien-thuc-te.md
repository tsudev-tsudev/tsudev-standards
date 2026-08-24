# PHIẾU BÀN GIAO - Sửa lại bộ nhận diện và nâng độ phân giải dấu hiệu

- **Mã phiếu**: 20260824-04
- **Từ**: agent-phien-04 - **Đến**: phiên sau
- **Thời điểm**: 19:10 24/08/2026
- **Trạng thái**: HOÀN THÀNH
- **Nhánh git**: không còn nhánh dang dở; toàn bộ đã merge vào `main`

## 1. Việc đã làm xong

**Hàng đợi đã cạn hoàn toàn.**

| Việc | Kết quả |
| --- | --- |
| `TS-5` tạo dấu hiệu thu gọn | **Không cần làm** - nó đã tồn tại từ 02/08/2026 |
| `TS-6` đổi cam sang xanh ở `cwico` | **Huỷ** - chủ project xác nhận cam/navy vẫn chính thức |
| `TS-7` nâng độ phân giải nguồn sinh icon | **Xong** - `tsudev-cwico` #9 |

**`v2.7.0`** (PR #18 ở repo này, nhãn + Release): `docs/BRAND_ASSETS.md` viết lại
theo bộ nhận diện thật. Huy hiệu cyan chuyển sang
`assets/brand/variants/tsudev-badge-cyan.png` với nhãn **không dùng cho sản phẩm**.

**Đồng bộ `v2.7.0`** xuống cả 4 repo con: `tsudev` #65, `swico` #6,
`tsudev-cwico` #10, `tsudev-contact` #4. Đã merge, CI `main` xanh, xác minh bằng
clone mới.

**`TS-7` ở `tsudev-cwico`** (#9): xuất lại dấu hiệu thu gọn từ bản gốc
`2048x2048` bằng đúng thuật toán của `packages/brand/build-assets.js`, rồi chạy
`tools/gen_icons.py` sinh lại 26 file icon.

- Nguồn: `222x280` -> **`824x1083`** (gấp 3.7 lần).
- **Không đổi nhận diện**: IoU hình dạng so với file cũ **0.9553**.
- Đã mở trực tiếp icon 256px và 32px để nhìn, không chỉ tin phép đo.

## 2. Việc dang dở + bước tiếp theo CỤ THỂ

Không có việc dang dở, hàng đợi trống. Hai việc còn ghi trong
`docs/BRAND_ASSETS.md` mục 10, **chưa đưa vào hàng đợi vì cần chủ project quyết
có làm hay không**:

- [ ] Bản `dark` của `logo-full.png` và `logo-wordmark.png`. Chữ navy `#11355A`
      chỉ đạt **1.38:1** trên nền Tối. Hiện lách được vì giao diện dựng chữ bằng
      text; ảnh in và ảnh chia sẻ nền tối thì không lách được.
      Việc nằm ở `tsudev/packages/brand/build-assets.js`.
- [ ] `tsudev` và `tsudev-cwico` dựng chữ "dev" bằng hai màu khác nhau: website
      dùng token `text-link` (xanh), `cwico` dùng dải cam riêng. Cả hai đều hợp lệ
      theo `BRAND_ASSETS.md` mục 5, nhưng nếu muốn thống nhất thì phải chọn một.

## 3. File liên quan / đang khóa

| Đường dẫn | Lý do | Còn khóa? |
| --- | --- | --- |
| (không có) | Phiên này đã nhả hết khóa | không |

## 4. Yêu cầu gửi agent đang giữ khóa

Không có.

## 5. Cảnh báo và quyết định quan trọng

**a) Chuỗi ba lần sai về cùng một chuyện, và nguyên nhân chung.**

| Bản | Sai ở đâu | Vì sao |
| --- | --- | --- |
| `v2.4.0` | Dựng chuẩn thương hiệu từ chú thích trong mã nguồn `cwico` | **Chưa từng mở file ảnh ra xem** |
| `v2.6.0` | Phong `logo-tsudev.png` làm bản gốc chính thức | Có mở ảnh, nhưng **chỉ mở một ảnh**, không đi tìm hệ sinh thái đã có gì |
| `TS-6` (đã huỷ) | Định đổi cam sang xanh ở `cwico` | Kế thừa kết luận sai của `v2.6.0` |

Quy tắc rút ra, đã ghi vào `BRAND_ASSETS.md`: **mở ảnh ra xem, đo, và tìm hết các
nơi đang dùng nó trước khi kết luận cái nào là chuẩn.** Một cái tên file
(`tsudev-logo.png`) trỏ vào ba thứ khác nhau ở ba repo.

**b) Cách kiểm chứng "hai ảnh có phải cùng một tác phẩm không".** Chuẩn hoá cả hai
về cùng khung rồi tính IoU của kênh alpha, kèm so màu trung bình vùng đục. Cùng
tác phẩm cho ra **0.95 trở lên**; hai thiết kế khác nhau cho ra thấp hơn nhiều.
Đây là phép đo đã lật ngược kết luận của `v2.6.0`.

**c) Cổng kiểm chặn PR khi repo con chưa đồng bộ.** PR `TS-7` ở `cwico` đỏ ngay
lần chạy đầu vì repo còn ở `v2.6.0` trong khi trung tâm đã `v2.7.0` - **không phải
lỗi của nội dung PR**. Thứ tự đúng: phát hành ở trung tâm -> đồng bộ repo con ->
mới mở PR nội dung ở repo con.

**d) `git push --force-with-lease` báo "stale info" sau khi rebase.** Xảy ra khi
ref theo dõi từ xa của chính nhánh đó chưa mới. Cách gỡ:
```bash
git fetch origin <nhanh>
git push --force-with-lease=<nhanh>:$(git rev-parse FETCH_HEAD) origin HEAD:<nhanh>
```

**e) Nhân bản thuật toán xử lý ảnh thì phải đối chiếu với đầu ra gốc.** Bản Python
nhân bản `removeBackground` + `splitMarkFromWordmark` cho IoU **0.90** so với
`logo-mark.png` chính thức - đủ để tin, và phần lệch nằm ở khung cắt chứ không ở
nội dung. Đừng nhân bản rồi dùng luôn mà không có phép đối chiếu này.

**f) Bản gốc thương hiệu KHÔNG nằm ở repo quy ước.** Nó ở
`tsudev/packages/brand/source/logo.jpeg`. Repo quy ước chỉ trỏ tới và ghi SHA-256.
Hai bản gốc song song là hai bản gốc sẽ trôi khỏi nhau.

## 6. Trạng thái cổng kiểm

- [x] `./scripts/check-standards.sh` đạt (0 lưu ý)
- [x] `node scripts/build-tokens.mjs --check` đạt
- [x] `node scripts/check-contrast.mjs` đạt - 39/39 cặp màu
- [x] `git status` sạch ngoài phạm vi bàn giao
- [x] Cổng kiểm xanh trên `main` của repo trung tâm và cả 4 repo con
- [x] Nhãn `v2.7.0` đã đẩy, GitHub Release đã tạo
- [x] Không repo nào còn PR mở

## 7. Kết quả xử lý (agent nhận điền sau khi thực hiện)

-
