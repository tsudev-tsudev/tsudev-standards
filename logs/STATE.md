# STATE.md - Trạng thái project

> Agent đọc file này ở đầu mỗi phiên và cập nhật ở cuối mỗi phiên.
> Quy trình: `docs/AGENT_PROTOCOL.md`.

## Hàng đợi task (làm từ trên xuống)

- [ ] **TS-5** Đưa bản gốc logo `1024x1024` vào `assets/brand/tsudev-logo.png` của
      `tsudev-cwico` (bản đang có chỉ `222x280`, đang bị phóng to lên 512 để sinh
      icon), đổi tên theo `docs/BRAND_ASSETS.md` mục 3, chạy lại `tools/gen_icons.py`.
      Việc nằm ở repo con, không phải repo này. Nguồn: `BRAND_ASSETS.md` mục 11.

## Đang thực hiện

| Task | Agent | Bắt đầu |
| --- | --- | --- |

## Đã hoàn thành (mới nhất trên cùng)

- 24/08/2026 - **TS-2 + TS-3 + TS-4** (`v2.5.0`, nhánh `docs/duyet-pr-va-gitignore-go-java`).
  - TS-2: `docs/GIT_WORKFLOW.md` mục 2 và 4.4 - số người duyệt PR theo quy mô đội.
    Cấu hình thật của repo này (`0` duyệt) nay khớp tài liệu.
  - TS-3: `templates/gitignore/go.gitignore` và `java.gitignore`, đăng ký ở
    `docs/GITIGNORE_POLICY.md` mục 2.
  - TS-4: đã quyết, xem mục "Quyết định quan trọng".
- 24/08/2026 - **TS-1: bổ sung `docs/BRAND_ASSETS.md`** (`v2.4.0`, nhánh
  `docs/brand-assets`, chưa push - chờ chủ project mở PR). Chuẩn rút từ bộ tài sản
  đang chạy thật của `tsudev-cwico`. Đăng ký lối vào ở `AGENTS.md`, `docs/00-INDEX.md`,
  `docs/DESIGN_SYSTEM.md`; `docs/PROJECT_STRUCTURE.md` ghi rõ `assets/brand/`.
  Hai món nợ phát hiện được ghi ở mục 11 của tài liệu và thành việc TS-5.
- 24/08/2026 - **Tái cấu trúc toàn diện bộ quy ước và đồng bộ xuống 4 repo con.**
  Chi tiết đầy đủ: `logs/handover/20260824-01_tai-cau-truc-quy-uoc-v2.md`. Tóm tắt:
  - Phát hành 9 nhãn từ `v2.0.0` đến `v2.3.2`, 12 PR đã merge.
  - Repo chuyển Private sang Public; bật Secret Scanning, Push Protection,
    Dependabot, CodeQL, Private Vulnerability Reporting, branch protection cho `main`.
  - Bổ sung chuẩn bảo mật đầy đủ, cơ chế đồng bộ có xác minh SHA-256, và 6 cổng
    canh tự động.
  - Chuẩn hóa 3 tài liệu rời vào repo; gộp 2 tài liệu trùng nhau ~60% thành một.
  - Đồng bộ xuống `tsudev`, `swico`, `tsudev-cwico`, `tsudev-contact`; cả 4 xanh
    cổng kiểm trên `main`.

## Quyết định quan trọng

> Quyết định kiến trúc lớn thì viết ADR riêng theo `docs/templates/ADR.md` và chỉ
> ghi một dòng tham chiếu ở đây.

- 24/08/2026 - **Repo chuyển Private sang Public.** Private buộc mỗi repo con giữ
  một token để đồng bộ (đẻ thêm secret phải quản lý), trong khi Public mở khóa
  Actions không giới hạn phút, CodeQL, Secret Scanning và Push Protection miễn phí.
  Nội dung repo là quy ước và mã màu, không chứa bí mật nào.
- 24/08/2026 - **`.standards/` được COMMIT vào repo con**, không phải submodule.
  Lý do: đọc được offline, CI kiểm được không cần gọi mạng, và lịch sử git của repo
  con truy nguyên được nó tuân bản quy ước nào tại thời điểm nào. Chi tiết:
  `docs/SYNC.md` mục 2.
- 24/08/2026 - **Quyền chỉ-đọc của `.standards/` chỉ là rào chắn nhẹ**, không phải
  lớp bảo vệ. Git không lưu bit đó nên nó bị trả lại sau mỗi lần checkout. Cơ chế
  phát hiện sửa trộm thật sự là `sync-standards.sh --check`. Ba lỗi liên tiếp
  (`v2.2.1`, `v2.2.2`, và lần hỏng `rm -rf`) đều đến từ việc coi quyền file là lớp
  bảo vệ chính.
- 24/08/2026 - **`sumy-wedding` KHÔNG thuộc hệ sinh thái tsudev** (TS-4, đã quyết,
  phiên sau không hỏi lại). Đó là trang thiệp cưới cá nhân cho một sự kiện một
  lần, Private, không mang nhận diện tsudev, không có người dùng ngoài, và đã ngủ
  từ 27/07/2026. `MUST NOT` đồng bộ `.standards/` xuống đó: bộ quy ước sẽ thêm
  `logs/`, cổng kiểm CI và nghĩa vụ bàn giao cho một repo không có phiên làm việc
  nào nữa - chi phí ròng, không lợi ích.
  Ngoại lệ duy nhất, và là điều kiện của quyết định này: repo đó là Next.js có
  Prisma và lưu dữ liệu khách mời (mức **D2** theo `SECURITY_BASELINE.md` mục 2),
  nên nếu **mở lại để sửa**, việc đầu tiên `MUST` là ghép
  `templates/gitignore/base.gitignore` + `node.gitignore` và soát `.env` chưa lọt
  vào lịch sử git. Không đồng bộ toàn bộ quy ước, chỉ đúng phần đó.
- 24/08/2026 - **Số người duyệt PR phụ thuộc quy mô đội, không phải hằng số.**
  Repo một người `MUST` đặt `0` vì GitHub không cho tự duyệt; phần chặn thật là
  cổng kiểm bắt buộc + áp cả với admin, không phải con số duyệt. Chi tiết:
  `docs/GIT_WORKFLOW.md` mục 4.4.
- 24/08/2026 - **Màu thương hiệu tách khỏi token giao diện.** Xanh `tsu` và cam
  `dev` lấy mẫu từ logo, chỉ dùng cho phần nhận diện, `MUST NOT` ghi đè token ngữ
  nghĩa trong `tokens/design-tokens.json`. Kèm theo: bộ quy ước trung tâm không giữ
  file ảnh - `MANIFEST.sha256` băm từng byte và repo con tải toàn bộ về.
  Chi tiết: `docs/BRAND_ASSETS.md` mục 5 và 11.
- 24/08/2026 - **Ngưỡng tương phản `text-primary` tách theo loại bề mặt**: ≥ 10:1
  trên nền ổn định, ≥ 7:1 trên nền hover. Chế độ Tối đo được 9.77 trên `bg-hover`;
  chọn làm rõ quy tắc (vốn viết mơ hồ là "trên nền") thay vì đổi một mã màu đang
  chạy production cho khoảng cách 0.23 mà bản thân nó đã vượt AAA 40%.
- 24/08/2026 - **Không tự di trú `tokens/` ở repo con.** 26 file mã nguồn trên 3
  repo đang đọc token cục bộ; đổi là thay đổi phá vỡ cần kiểm thử giao diện riêng
  từng repo. Đã ghi thành việc `QU-STD-1` trong hàng đợi của từng repo theo đúng
  `docs/ONBOARDING.md` mục 2.4 ("chỉ liệt kê, chưa sửa").

## Sự cố bảo mật

> Ghi theo `docs/SECURITY_BASELINE.md` mục 9. Để trống nếu chưa có.

- 24/08/2026 - **Không phải sự cố, nhưng cần theo dõi.** Cổng kiểm phát hiện
  `apps/frontend-main/.env.production` đang được commit trong repo `tsudev` (Public).
  Đã kiểm nội dung **không đọc giá trị**: 20 dòng chú thích và đúng một biến
  `NEXT_PUBLIC_MAIN_URL`. Tiền tố `NEXT_PUBLIC_` được Next.js biên dịch thẳng vào
  bundle trình duyệt nên công khai theo thiết kế - **không có secret nào bị lộ**.
  Đã khai `.standards-allow` với hạn **31/12/2026** và ghi việc sửa dứt điểm
  (`QU-STD-4` ở repo `tsudev`).
  Rủi ro còn lại: người sau có thể thêm một biến thật sự bí mật vào chính file đó
  và nó sẽ được commit mà không ai báo. Cột hạn tồn tại để buộc nhìn lại.
- 24/08/2026 - Đã quét toàn bộ lịch sử git trước khi chuyển repo sang Public:
  10 file từng tồn tại, đều là tài liệu, không có mẫu secret nào.
