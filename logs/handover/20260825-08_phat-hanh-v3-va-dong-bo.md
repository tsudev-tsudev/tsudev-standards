# PHIẾU BÀN GIAO - Phát hành v3.0.0 và đồng bộ xuống 4 repo con

- **Mã phiếu**: 20260825-08
- **Từ**: agent-phien-07 - **Đến**: phiên sau
- **Thời điểm**: 17:20 25/08/2026
- **Trạng thái**: XONG PHẦN KỸ THUẬT - còn 5 lệnh merge và 1 lệnh Release cần
  chủ project gõ (harness chặn agent chạy)
- **Nhánh git**: `docs/ban-giao-phien-07` (repo này), `chore/dong-bo-quy-uoc-v3`
  (cả 4 repo con)

## 1. Việc đã làm xong

**Repo trung tâm.** PR [#25](https://github.com/tsudev-tsudev/tsudev-standards/pull/25),
9 commit chia theo nhóm của CHANGELOG, merge kiểu `rebase` (`GIT_WORKFLOW.md`
mục 4.5: chuỗi commit có nghĩa riêng). Nhãn `v3.0.0` đã đẩy. Lượt rà soát bảo mật
theo mục 4.4 ghi thành comment trên PR, kết luận đạt.

**Bốn repo con**, mỗi repo một PR ba commit theo đúng thứ tự của mục "Hướng dẫn
nâng cấp":

| Repo | PR | Dọn gạch ngang | Hạng theo `AUTH_AND_ACCOUNT.md` |
| --- | --- | --- | --- |
| `tsudev` | #71 | 1 dòng en-dash trong phiếu bàn giao cũ | A |
| `swico` | #8 | 2 chỗ en-dash trong thông báo lỗi C# | C |
| `tsudev-cwico` | #12 | 5 chỗ em-dash, 2 chỗ người dùng nhìn thấy | B |
| `tsudev-contact` | #6 | 3 chỗ em-dash trong chú thích | A (sai, xem TS-15) |

CI xanh cả bốn. Ba việc `QU-STD-AUTH`, `QU-STD-TABLE`, `QU-STD-BRAND` đã mở
trong `logs/STATE.md` của từng repo con, **chỉ liệt kê chưa sửa mã** đúng
`ONBOARDING.md` mục 2.4, và nội dung viết riêng theo hạng của từng sản phẩm chứ
không chép chung một khuôn.

`AGENTS.md` của cả 4 repo con thiếu 4 lối vào trong bảng bản đồ quy ước - trong
đó `BRAND_ASSETS.md` đã thiếu từ `v2.4.0`, tức là bốn phiên đồng bộ trước đều bỏ
sót. Đã bổ sung.

## 2. Việc dang dở + bước tiếp theo CỤ THỂ

Sáu lệnh dưới đây harness chặn agent chạy. Chủ project gõ trong terminal của
phiên, có tiền tố `!`:

```bash
GH_TOKEN="$(gh auth token --user tsudev-tsudev)" gh release create v3.0.0 --title "v3.0.0 - Tài khoản, bảng bản ghi, nhận diện hệ sinh thái" --notes-file <đường-dẫn-release-notes>
GH_TOKEN="$(gh auth token --user tsudev-tsudev)" gh pr merge 71 --repo tsudev-tsudev/tsudev --squash --delete-branch
GH_TOKEN="$(gh auth token --user tsudev-tsudev)" gh pr merge 8 --repo tsudev-tsudev/swico --squash --delete-branch
GH_TOKEN="$(gh auth token --user tsudev-tsudev)" gh pr merge 12 --repo tsudev-tsudev/tsudev-cwico --squash --delete-branch
GH_TOKEN="$(gh auth token --user tsudev-tsudev)" gh pr merge 6 --repo tsudev-tsudev/tsudev-contact --squash --delete-branch
```

Cộng PR của chính phiếu này ở repo trung tâm (nhánh `docs/ban-giao-phien-07`).

Repo con dùng `--squash` vì lịch sử `main` của chúng đang theo khuôn một PR một
commit; repo trung tâm dùng `--rebase` vì chuỗi commit mang `BREAKING CHANGE:`
riêng cho từng nghĩa vụ.

Sau khi merge hết: xác minh bằng **clone mới** rằng cả 4 repo con có
`.standards-version` ghi `version=3.0.0` và CI `main` xanh, đúng cách phiên 02
tới 06 vẫn làm.

## 3. File liên quan / đang khóa

| Đường dẫn | Lý do | Còn khóa? |
| --- | --- | --- |
| (không có) | Phiên này đã nhả hết khóa | không |

## 4. Yêu cầu gửi agent đang giữ khóa

Không có.

## 5. Cảnh báo và quyết định quan trọng

**a) Tài khoản `gh` là cái bẫy của phiên này.** Máy có hai tài khoản cùng đăng
nhập. `gh auth switch` **không dính** (chạy xong `gh auth status` vẫn báo tài
khoản cũ đang hoạt động), nên mọi lệnh `gh` trong phiên phải mang tiền tố
`GH_TOKEN="$(gh auth token --user tsudev-tsudev)"`, và `git push` phải ghi đè
credential helper:

```bash
git -c 'credential.https://github.com.helper=' \
    -c 'credential.https://github.com.helper=!f(){ test "$1" = get && { echo username=tsudev-tsudev; echo "password=$(gh auth token --user tsudev-tsudev)"; }; }; f' \
    push origin <nhánh>
```

Triệu chứng khi quên: `403 Permission ... denied to dieuhanhcongviecxanuicam`
với `git push`, và `must be a collaborator` với `gh pr create`.

**b) Hai lỗi của chính bộ quy ước lộ ra khi đồng bộ**, đã ghi thành TS-15 và
TS-16 trong hàng đợi. TS-16 là lỗi hệ thống chứ không phải lỗi một chỗ: cổng kiểm
mở lên 47 đuôi file ở TS-12 **không tự đến được repo con**, vì
`sync-standards.sh` không mang theo `scripts/check-standards.sh`. Phiên này chép
tay script vào cả 4 repo con nên hiện tại chúng đã dùng bản mới, nhưng lần phát
hành sau sẽ lặp lại đúng lỗi đó nếu không sửa cơ chế.

**c) `logo-tsudev.png` rời vẫn nằm ngoài repo**, vẫn chưa xóa, vẫn chờ chủ
project quyết. Xem phiếu `20260824-06` mục 5c.

**d) TS-8 vẫn treo.** Phiên này **không tự đổi** màu chữ "dev" ở repo nào, chỉ
ghi tham chiếu tới TS-8 trong việc `QU-STD-BRAND` của `tsudev` và `tsudev-cwico`
để phiên sau không quyết nhầm.

**e) Một token đã lộ vào bản ghi hội thoại của phiên này.** Lúc chẩn đoán trục
trặc tài khoản, agent `grep` file `~/.config/gh/hosts.yml` và token OAuth của tài
khoản `dieuhanhcongviecxanuicam` hiện ra trong hội thoại. Không file nào trong
repo chứa nó và không có commit nào mang nó. Theo `AGENTS.md` mục 4, bước một là
**thu hồi**: chạy `gh auth refresh --user dieuhanhcongviecxanuicam` hoặc thu hồi
token trong Settings của tài khoản đó. Bài học đã áp dụng ngay trong phiên: mọi
lệnh đọc file cấu hình sau đó đều lọc token trước khi in.

## 6. Trạng thái cổng kiểm

- [x] `./scripts/check-standards.sh` đạt ở repo trung tâm - 0 vi phạm, 0 lưu ý
- [x] Cả 4 repo con đạt cổng kiểm với **bản script mới** (47 đuôi file)
- [x] `./scripts/sync-standards.sh --check` đạt ở cả 4 repo con
- [x] CI xanh trên cả 5 PR, gồm `gitleaks` và GitGuardian
- [ ] Chưa merge 4 PR repo con, chưa tạo Release, chưa xác minh bằng clone mới

## 7. Kết quả xử lý (agent nhận điền sau khi thực hiện)

-
