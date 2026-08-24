# PHIẾU BÀN GIAO - Phát hành v2.4.0 + v2.5.0 và đồng bộ xuống 4 repo con

- **Mã phiếu**: 20260824-02
- **Từ**: agent-phien-02 - **Đến**: phiên sau
- **Thời điểm**: 14:05 24/08/2026
- **Trạng thái**: HOÀN THÀNH
- **Nhánh git**: không còn nhánh dang dở; toàn bộ đã merge vào `main`

## 1. Việc đã làm xong

**Hàng đợi phiên trước đã cạn hoàn toàn.** TS-1, TS-2, TS-3, TS-4 đều xong.

| Nhãn | Việc | PR |
| --- | --- | --- |
| `v2.4.0` | TS-1 - `docs/BRAND_ASSETS.md` | #14 |
| `v2.5.0` | TS-2 + TS-3 + TS-4 | #16 |

**TS-1 - `docs/BRAND_ASSETS.md`** (11 mục). Chuẩn rút từ bộ tài sản **đang chạy
thật** của `tsudev-cwico` (`assets/brand/`, `tools/gen_icons.py`,
`ui/src/components/Brand.tsx`), không nghĩ ra từ đầu. Ba quyết định đáng nhớ:

1. Wordmark `SHOULD` dựng bằng **chữ thật**, không phải ảnh - co giãn theo cỡ chữ
   hệ thống, sắc ở mọi DPI, chọn và tìm kiếm được, tự đổi màu theo chế độ nền.
2. Màu thương hiệu **KHÔNG phải token giao diện**, `MUST NOT` ghi đè token ngữ nghĩa.
3. Bộ quy ước trung tâm **không giữ file ảnh** - `MANIFEST.sha256` băm từng byte và
   cả 4 repo con tải toàn bộ về.

Đăng ký lối vào ở `AGENTS.md` mục 1, `docs/00-INDEX.md`, `docs/DESIGN_SYSTEM.md`;
`docs/PROJECT_STRUCTURE.md` hình trạng A nay ghi rõ `assets/brand/`.

**TS-2 - số người duyệt PR.** `docs/GIT_WORKFLOW.md` mục 2 và 4.4. Bảng theo quy mô
đội: từ 2 người thì `1` duyệt, một người thì `0`. Kèm điều kiện: đặt `0` `MUST NOT`
hiểu là bỏ rà soát. Tài liệu và cấu hình thật của repo này nay khớp nhau
(`required_approving_review_count = 0`, đã đối chiếu bằng API).

**TS-3 - `templates/gitignore/go.gitignore` và `java.gitignore`.** Đăng ký ở
`docs/GITIGNORE_POLICY.md` mục 2. Cả hai qua cổng kiểm mục 6b.

**TS-4 - `sumy-wedding` KHÔNG thuộc hệ sinh thái.** Đã quyết và ghi vào
`logs/STATE.md` mục "Quyết định quan trọng" - phiên sau không hỏi lại nữa.

**Đồng bộ xuống 4 repo con** - `v2.3.2` lên `v2.5.0`, tất cả đã merge, đã kiểm lại
bằng **clone mới**:

| Repo | PR | `.standards-version` trên `main` | CI `main` |
| --- | --- | --- | --- |
| `tsudev` | #63 | `2.5.0` / `v2.5.0` | xanh |
| `swico` | #4 | `2.5.0` / `v2.5.0` | xanh |
| `tsudev-cwico` | #7 | `2.5.0` / `v2.5.0` | xanh |
| `tsudev-contact` | #2 | `2.5.0` / `v2.5.0` | xanh |

Cả 4 đều `sync-standards.sh --check` báo "khớp bản trung tâm 2.5.0".

## 2. Việc dang dở + bước tiếp theo CỤ THỂ

Không có việc dang dở. Hàng đợi còn đúng một việc, và nó **không nằm ở repo này**:

- [ ] **TS-5** - ở repo `tsudev-cwico`, không phải ở đây. Các bước cụ thể:
  1. Lấy bản gốc `1024x1024` (hiện nằm rời ở máy cá nhân, tên `logo-tsudev.png`).
  2. Đưa vào `tsudev-cwico/assets/brand/tsudev-logo.png` - **đổi tên** theo
     `docs/BRAND_ASSETS.md` mục 3, bản đang có ở đó chỉ `222x280`.
  3. `pip install Pillow` rồi `python3 tools/gen_icons.py` - script đọc đúng file
     đó làm gốc và sinh lại toàn bộ 25 file icon.
  4. Mở PR ở `tsudev-cwico`. Diễn biến sẽ toàn ảnh nhị phân, `MUST` mở thử vài
     icon xem có bị bết hay lệch nền trong suốt không - cổng kiểm không bắt được
     lỗi này.

## 3. File liên quan / đang khóa

| Đường dẫn | Lý do | Còn khóa? |
| --- | --- | --- |
| (không có) | Phiên này đã nhả hết khóa | không |

## 4. Yêu cầu gửi agent đang giữ khóa

Không có.

## 5. Cảnh báo và quyết định quan trọng

**a) Xếp lớp PR: nhánh nền bị xóa là PR con bị đóng theo.** PR #15 xếp lớp trên
#14. Merge #14 kèm `--delete-branch` làm GitHub **tự đóng #15**, và `gh pr edit
--base` từ chối đổi nền của PR đã đóng. Phải mở PR mới (#16). Lần sau: hoặc đừng
xếp lớp, hoặc đổi nền của PR con về `main` **trước khi** merge PR cha.

**b) Squash-merge làm nhánh xếp lớp xung đột ở đúng 3 file.** `VERSION`,
`CHANGELOG.md`, `MANIFEST.sha256` - vì cả hai bên đều sửa chúng còn tổ tiên chung
lại là bản cũ. Cách gỡ sạch, không xung đột lần nào:
```bash
git rebase --onto origin/main <sha-commit-cha>   # bỏ commit đã bị squash
./scripts/make-manifest.sh && ./scripts/check-standards.sh
git push --force-with-lease
```

**c) Chạy `make-manifest.sh` SAU cùng, trước khi commit.** Sửa nội dung xong mới
sinh MANIFEST. Sinh trước rồi còn sửa tiếp là cổng kiểm mục 7 đỏ ngay.

**d) Đồng bộ repo con `MUST` làm trên clone mới.** Đã theo đúng cảnh báo 5f của
phiếu `20260824-01`: clone sạch 4 repo vào thư mục tạm, đồng bộ, mở PR, merge, rồi
**clone lại lần nữa** để xác minh `main`. Không dùng bản làm việc ở `~/projects`.

**e) Máy này chưa cấu hình `user.name`/`user.email` toàn cục.** Clone mới sẽ không
commit được. Đặt cục bộ cho từng clone, đừng đặt `--global`:
```bash
git config user.name tsudev-tsudev && git config user.email <email>
```

**f) `logs/` của repo con không bị đụng tới trong đợt đồng bộ này.** Diễn biến ở
cả 4 PR chỉ có `.standards/` và `.standards-version`, đúng theo `docs/SYNC.md`
mục 4. Các việc `QU-STD-*` trong hàng đợi từng repo vẫn còn nguyên, chưa ai làm -
đáng chú ý nhất vẫn là `QU-STD-1` (di trú `tokens/`) và `QU-STD-4` ở `tsudev`
(miễn trừ `.env.production` hết hạn **31/12/2026**).

**g) Bản gốc logo tốt nhất vẫn nằm ngoài mọi repo.** `1024x1024`, ở máy cá nhân.
Máy hỏng là mất. Đó là lý do TS-5 nên làm sớm, không phải vì icon đang xấu.

## 6. Trạng thái cổng kiểm

- [x] `./scripts/check-standards.sh` đạt (0 lưu ý)
- [x] `node scripts/build-tokens.mjs --check` đạt
- [x] `node scripts/check-contrast.mjs` đạt - 39/39 cặp màu
- [x] `git status` sạch ngoài phạm vi bàn giao
- [x] Cổng kiểm xanh trên `main` của repo trung tâm và cả 4 repo con
- [x] Nhãn `v2.4.0`, `v2.5.0` đã đẩy; GitHub Release đã tạo cho cả hai

## 7. Kết quả xử lý (agent nhận điền sau khi thực hiện)

-
