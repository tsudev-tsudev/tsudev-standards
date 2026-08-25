# PHIẾU BÀN GIAO - Phát hành v3.0.0: đã commit, chặn ở bước push

- **Mã phiếu**: 20260825-07
- **Từ**: agent-phien-07 - **Đến**: chủ project, rồi phiên sau
- **Thời điểm**: 15:52 25/08/2026
- **Trạng thái**: CHẶN - cần chủ project mở quyền đẩy mã
- **Nhánh git**: `feat/quy-uoc-v3-tai-khoan-bang-nhan-dien` (chỉ có ở máy, chưa đẩy)

## 1. Việc đã làm xong

Bước 1 trong mục 2 của phiếu `20260824-06`. Cây làm việc v3.0.0 đang trôi nổi trên
`main` nay đã nằm gọn trong 8 commit trên nhánh riêng, chia theo đúng nhóm của
CHANGELOG, mỗi commit một việc:

| Commit | Nội dung |
| --- | --- |
| `3cc6cdf` | `docs(auth)!` TS-9 - `AUTH_AND_ACCOUNT.md` + `SECURITY_BASELINE.md` mục 6 |
| `cb34ac9` | `docs(data-table)!` TS-10 - `DATA_TABLE.md` + `SEARCH_AND_FILTER.md` mục 7 |
| `6c98b5c` | `docs(brand)!` TS-11 - `BRAND_ASSETS.md` mục 12 và 13 |
| `f511c47` | `docs(identity)!` TS-13 - `ECOSYSTEM_IDENTITY.md` |
| `5f33d9e` | `docs(agents)` TS-12 - `AGENTS.md` mục 7.1 + `check-standards.sh` mục 4 |
| `8e15ad7` | `docs(index)` - đăng ký 3 tài liệu mới vào bản đồ quy ước |
| `0c0bed0` | `chore(release)` - `VERSION` 3.0.0, `CHANGELOG.md`, `MANIFEST.sha256` |
| `eeee963` | `docs(logs)` - phiếu bàn giao phiên 06 |

Bốn commit mang `!` và đoạn `BREAKING CHANGE:` theo `GIT_WORKFLOW.md` mục 3.

`AGENTS.md` bị ba nhóm chạm tới nên đã tách theo từng hunk (`git apply --cached`)
để giữ nguyên luật "một commit một việc": mục 7.1 vào commit TS-12, bảng bản đồ
vào commit đăng ký, dòng tiêu đề phiên bản vào commit phát hành.

## 2. Việc dang dở + bước tiếp theo CỤ THỂ

**Chặn cứng**: `git push` trả `403`.

```
remote: Permission to tsudev-tsudev/tsudev-standards.git denied to dieuhanhcongviecxanuicam
```

`gh` có hai tài khoản đăng nhập, tài khoản **đang hoạt động là sai**:

| Tài khoản | Đang hoạt động | Quyền ghi repo này |
| --- | --- | --- |
| `dieuhanhcongviecxanuicam` | có | không |
| `tsudev-tsudev` | không | có (chủ repo) |

`git config user.name` của repo đã là `tsudev-tsudev`, nhưng `credential.helper`
toàn cục gọi `gh auth git-credential`, nên token thực sự dùng để đẩy là token của
tài khoản đang hoạt động. Agent đã thử `gh auth switch --user tsudev-tsudev`,
**harness chặn** lệnh này.

**Chủ project chạy đúng một dòng sau trong terminal của phiên này:**

```bash
! gh auth switch --user tsudev-tsudev
```

Sau đó phiên sau làm tiếp, không cần hỏi lại:

1. `git push -u origin feat/quy-uoc-v3-tai-khoan-bang-nhan-dien`
2. Mở PR theo `.github/pull_request_template.md`. Loại thay đổi tích **MAJOR**.
   Phần "Kiểm chứng" tích được hết trừ `gitleaks` (xem mục 5c).
   PR vượt ngưỡng 400 dòng của `GIT_WORKFLOW.md` mục 4.2 (1995 dòng thêm) nên
   `MUST` ghi rõ trong mô tả vì sao không tách được: ba tài liệu mới cùng một
   nghĩa vụ phát hành, tách ra thì `VERSION` và `MANIFEST.sha256` sẽ lệch giữa
   các PR trung gian và cổng kiểm đỏ ở mọi PR trừ PR cuối.
3. Chờ CI xanh, merge, xóa nhánh.
4. `git tag -a v3.0.0 -m "Quy uoc v3.0.0 - tai khoan, bang ban ghi, nhan dien"`
   trên commit merge ở `main`, `git push --tags`, tạo GitHub Release và dán
   nguyên mục `3.0.0` của `CHANGELOG.md`.
5. Đồng bộ xuống 4 repo con. **Đọc mục "Hướng dẫn nâng cấp" trước.** Bước 1 của
   nó (dọn em-dash ở repo con) `MUST` chạy **trước** `sync-standards.sh`, nếu
   không cổng kiểm repo con đỏ ngay sau khi đồng bộ.
6. Mở việc `QU-STD-AUTH`, `QU-STD-TABLE`, `QU-STD-BRAND` trong `logs/STATE.md`
   của từng repo con. **Chỉ liệt kê, chưa sửa mã**, đúng `ONBOARDING.md` mục 2.4.

## 3. File liên quan / đang khóa

| Đường dẫn | Lý do | Còn khóa? |
| --- | --- | --- |
| (không có) | Phiên này đã nhả hết khóa | không |

## 4. Yêu cầu gửi agent đang giữ khóa

Không có.

## 5. Cảnh báo và quyết định quan trọng

**a) 8 commit này mới chỉ có ở đĩa máy này.** Chưa có bản sao nào trên GitHub. Máy
hỏng trước khi đẩy là mất toàn bộ nội dung v3.0.0. Đây là rủi ro có thật cho tới
khi bước 1 của mục 2 chạy xong.

**b) Đừng gộp lại thành một commit khi đẩy.** Nếu `git push` báo cần rebase, thì
rebase, `MUST NOT` squash: CHANGELOG đã chia theo đúng 8 nhóm này, và commit mang
`BREAKING CHANGE:` riêng cho từng nghĩa vụ là thứ repo con dò khi tìm lý do phải
sửa mã.

**c) `gitleaks` chưa cài trên máy này** nên mục kiểm tra đó trong `GIT_WORKFLOW.md`
mục 4.1 chưa chạy được cục bộ. Không tự bỏ qua: workflow `.github/workflows/security.yml`
chạy nó trên CI, chờ CI xanh là đủ. Nếu muốn chạy trước khi đẩy thì cài gitleaks.

**d) Ngày trong `CHANGELOG.md` giữ nguyên `24/08/2026`** - ngày biên tập nội dung,
khớp với dòng đã ghi ở `STATE.md` mục "Đã hoàn thành". Nhãn sẽ được tạo ngày
25/08/2026. Biết trước để khỏi tưởng là lỗi và sửa lệch `MANIFEST.sha256`.

**e) `TS-8` vẫn treo**, vẫn chờ chủ project chọn một trong ba hướng. Xem hàng đợi
`logs/STATE.md`.

## 6. Trạng thái cổng kiểm

- [x] `./scripts/check-standards.sh` đạt - 0 vi phạm, 0 lưu ý (chạy sau khi commit)
- [x] `node scripts/build-tokens.mjs --check` đạt
- [x] `node scripts/check-contrast.mjs` đạt - 39/39 cặp màu
- [x] `./scripts/make-manifest.sh` đã chạy lại, 49 file, khớp
- [ ] `gitleaks detect --redact` - chưa chạy được, xem mục 5c
- [x] `git status` sạch ngoài phạm vi bàn giao
- [ ] Chưa đẩy nhánh, chưa mở PR, chưa gắn nhãn, chưa đồng bộ repo con

## 7. Kết quả xử lý (agent nhận điền sau khi thực hiện)

-
