# PHIẾU BÀN GIAO - Vá cơ chế đồng bộ: v3.1.0 và v3.1.1

- **Mã phiếu**: 20260825-09
- **Từ**: agent-phien-07 - **Đến**: phiên sau
- **Thời điểm**: 19:40 25/08/2026
- **Trạng thái**: XONG PHẦN KỸ THUẬT - còn 4 lệnh merge, xem mục 2
- **Nhánh git**: `docs/ket-phien-07` (repo này), `chore/quy-uoc-v311` (4 repo con)

## 1. Việc đã làm xong

TS-16 và TS-17 đã sửa dứt điểm, cả hai theo hướng 1 mà phiếu trước đề xuất.

**`v3.1.0`** (PR #28, merge kiểu `rebase`, 3 commit):

- `scripts/check-standards.sh` và `scripts/sync-standards.sh` vào gói đồng bộ,
  nằm ở `.standards/scripts/`, được `MANIFEST.sha256` băm từng byte như mọi file
  quy ước. `make-manifest.sh` và `build-tokens.mjs` **không** đi theo: việc của
  repo trung tâm, gửi xuống chỉ tạo cơ hội chạy nhầm.
- Lần đồng bộ **ghi đè luôn `scripts/check-standards.sh` ở gốc repo con** - đó là
  bản thật sự được chạy. Ghi bằng `mv` chứ không `cp`, lý do ở mục 5a.
- `sync-standards.sh` **không tự ghi đè chính nó**, chỉ cảnh báo kèm lệnh chép tay.
- `--check` không kèm `--ref` nay đọc dòng `ref=` trong `.standards-version`.
  Hỏi "đã có bản mới hơn chưa" thì truyền tay `--ref main`.
- `--check` bắt thêm hai ca trước đây lọt hoàn toàn: cổng kiểm ở gốc repo khác
  bản trung tâm, và file trong `.standards/scripts/` bị sửa. Repo còn ghim bản cũ
  hơn `v3.1.0` thì ra **lưu ý**, không ra lỗi.

**`v3.1.1`** (PR #29): sửa hướng dẫn nâng cấp của `v3.1.0`, chi tiết ở mục 5b.

**Đồng bộ xuống 4 repo con** theo đúng quy trình mới. CI **xanh toàn bộ cả 4**:

| Repo | PR | CI |
| --- | --- | --- |
| `tsudev` | #74 | 7/7 |
| `swico` | #9 | 4/4 |
| `tsudev-cwico` | #13 | 6/6 |
| `tsudev-contact` | #7 | 2/2 |

## 2. Việc dang dở + bước tiếp theo CỤ THỂ

Đúng bốn lệnh merge, không còn gì khác. Xem TS-18 trong `logs/STATE.md` để lấy
nguyên khối lệnh dán được.

Sau khi merge, xác minh bằng **clone mới**. Phép thử bắt buộc:

```bash
ls .standards/scripts/          # PHẢI ra 2 file
grep -E '^(ref|version)=' .standards-version
./scripts/check-standards.sh
./scripts/sync-standards.sh --check
```

`MUST` nhìn `ls .standards/scripts/`, **không** chỉ nhìn `version=3.1.1`. Lý do ở
mục 5b: số bản đúng mà gói vẫn sai là ca đã xảy ra thật trong phiên này.

Cộng PR của chính phiếu này ở repo trung tâm (nhánh `docs/ket-phien-07`).

## 3. File liên quan / đang khóa

| Đường dẫn | Lý do | Còn khóa? |
| --- | --- | --- |
| (không có) | Phiên này đã nhả hết khóa | không |

## 4. Yêu cầu gửi agent đang giữ khóa

Không có.

## 5. Cảnh báo và quyết định quan trọng

**a) Vì sao ghi đè cổng kiểm bằng `mv` chứ không `cp`.** `cp` cắt cụt rồi ghi lại
**đúng inode đang mở**. Bash đọc script theo từng đoạn chứ không nạp hết một lần,
nên ghi đè inode của một script đang chạy là hỏng phiên chạy giữa chừng, theo
kiểu rất khó truy. `mv` thay inode; tiến trình đang chạy giữ nguyên inode cũ.
Ai sửa chỗ này về sau `MUST NOT` đổi lại thành `cp`.

**b) Bản vá không tự triển khai được chính nó - đây là bài học lớn nhất của phiên.**
`v3.1.0` đưa cổng kiểm vào gói đồng bộ, nhưng thay đổi đó nằm **bên trong**
`sync-standards.sh`. Repo con nâng cấp bằng chính script cũ của nó, nên script cũ
chép gói cũ. Kết quả trên cả 4 repo:

```
version=3.1.0                 <- nhìn số bản thì tưởng xong
.standards/scripts: 0 file    <- gói vẫn là gói cũ
scripts/check-standards.sh    <- không được cập nhật
```

Không có dấu hiệu nào cho thấy việc nâng cấp chỉ làm được một nửa. Đúng loại lỗi
mà `v3.1.0` sinh ra để chống. Đã sửa bằng `v3.1.1`: thêm bước `curl` bắt buộc làm
trước, và quan trọng hơn là thêm **phép thử nhìn là biết** (`ls .standards/scripts/`)
thay vì một lời dặn.

Quy tắc rút ra, đáng nhớ cho mọi bản sau: **thay đổi nằm trong công cụ triển khai
thì không tự triển khai được.** Bản nào đụng vào `sync-standards.sh` thì hướng dẫn
nâng cấp `MUST` có bước lấy script mới trước, và `MUST` kèm một phép thử không
dựa vào số phiên bản.

**c) Đây là chi phí một lần.** Từ `v3.1.1` trở đi repo con đã cầm script mới,
`.standards/scripts/sync-standards.sh` đi theo gói, và `--check` canh phần lệch.
Không lặp lại ở các bản sau.

**d) Cách chạy lệnh `gh` và `git push` trong phiên này.** `gh auth switch` không
dính. Mọi lệnh `gh` `MUST` mang tiền tố `GH_TOKEN="$(gh auth token --user
tsudev-tsudev)"`, và `git push` `MUST` ghi đè credential helper - xem phiếu
`20260825-08` mục 5a để lấy nguyên khối lệnh.

**e) Một cái bẫy khi làm việc trên nhiều repo cùng lúc.** Vòng lặp `for` có `cd`
vào từng repo mà không dùng subshell sẽ trôi thư mục làm việc: ba repo sau đều bị
clone lồng vào bản sao của repo đầu, và ba lượt đồng bộ sau đều chạy nhầm vào
cùng một repo. Triệu chứng nhìn ra được: log in ra tên repo đúng nhưng kết quả
giống hệt nhau. Cách tránh: `( cd "$D" && ... )` trong subshell, và luôn truyền
đường dẫn tuyệt đối cho `gh repo clone`.

**f) TS-15 và TS-8 vẫn treo**, cả hai chờ chủ project quyết. Phiên này không tự
quyết cái nào.

**g) Token đã lộ vẫn chưa thu hồi.** Xem phiếu `20260825-08` mục 5e. Lệnh
`gh auth refresh --user ...` mà phiên này đưa lúc đầu là **sai** - `gh auth
refresh` không có cờ `--user`, và không lệnh CLI nào thu hồi được token. Cách
đúng: đăng nhập github.com bằng chính tài khoản `dieuhanhcongviecxanuicam`, vào
`Settings -> Applications -> GitHub CLI -> Revoke access`.

## 6. Trạng thái cổng kiểm

- [x] `./scripts/check-standards.sh` đạt ở repo trung tâm - 0 vi phạm, 0 lưu ý
- [x] `node scripts/build-tokens.mjs --check` đạt
- [x] `node scripts/check-contrast.mjs` đạt - 39/39 cặp màu
- [x] `bash -n scripts/sync-standards.sh` đạt
- [x] `./scripts/make-manifest.sh` đã chạy lại - 49 file
- [x] Bốn ca kiểm chứng dựng bằng repo con giả, gồm cả ca âm tính - xem mô tả
      trong PR #28 phần "Kiểm chứng"
- [x] Cả 4 repo con: cổng kiểm đạt, `sync-standards.sh --check` đạt,
      `.standards/scripts/` đủ 2 file
- [x] CI xanh trên cả 6 PR của phiên
- [ ] Chưa merge 4 PR repo con, chưa xác minh bằng clone mới sau merge

## 7. Kết quả xử lý (agent nhận điền sau khi thực hiện)

-
