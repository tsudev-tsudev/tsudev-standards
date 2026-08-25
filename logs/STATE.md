# STATE.md - Trạng thái project

> Agent đọc file này ở đầu mỗi phiên và cập nhật ở cuối mỗi phiên.
> Quy trình: `docs/AGENT_PROTOCOL.md`.

## Hàng đợi task (làm từ trên xuống)

- [ ] **TS-15** `docs/AUTH_AND_ACCOUNT.md` mục 1 xếp **sai hạng** cho
      `tsudev-contact`: bảng ghi nó là **hạng A - web có tài khoản**, nhưng repo
      đó là app desktop Tkinter đóng gói `.exe` bằng PyInstaller, chạy ngoại
      tuyến, không có tài khoản nào. Theo mô tả trong chính bảng đó thì nó là
      **hạng C**. Để nguyên thì `QU-STD-AUTH` buộc dựng cả luồng OIDC cho một
      công cụ chuyển CSV sang vCard. Việc `QU-STD-AUTH` ở repo đó đã được ghi ở
      trạng thái **chặn**, chờ quyết định này. Sửa xong là bản `v3.0.1`.

- [ ] **TS-17** Cổng kiểm CI của repo con đối chiếu với **nhánh `main`** của bộ
      quy ước chứ không với **nhãn đang ghim**. `docs/SYNC.md` mục 5.1 chạy
      `./scripts/sync-standards.sh --check` không kèm `--ref`, mà mặc định của
      script là `REF="main"`. Hệ quả đo được trong phiên 07: ngay khi `v3.0.0` vào
      `main` ở đây, CI trên `main` của `tsudev` đỏ (run `32834615830`, 13 dòng
      `LỆCH`), dù repo đó lúc ấy đang ghim `v2.8.0` hoàn toàn hợp lệ. Nó chỉ xanh
      lại sau khi đồng bộ.
      Việc ghim theo nhãn ở `.standards-version` vì vậy **không có tác dụng thật**:
      repo con buộc phải chạy theo `main` ngay lập tức, nếu không CI đỏ.
      Hai hướng:
      1. Sửa mục 5.1 thành `--ref "$(grep '^ref=' .standards-version | cut -d= -f2)"`.
         Đối chiếu đúng thứ repo con đang ghim; muốn biết có bản mới hơn không thì
         đó là việc của mục 5.2 (PR nâng cấp hằng tuần), không phải của cổng chặn merge.
      2. Giữ nguyên, coi CI đỏ là tín hiệu "có bản mới, đồng bộ đi". Nhưng như vậy
         thì `MUST` ghi rõ trong `SYNC.md` rằng đỏ kiểu này không chặn được gì
         khác, và `MUST` phát hành + đồng bộ trong cùng một phiên.
      Đề xuất hướng 1. Sửa xong là bản `v3.1.0`, gộp chung với TS-16.

- [ ] **TS-16** `sync-standards.sh` **không mang theo** `scripts/check-standards.sh`,
      nên repo con chạy đồng bộ xong vẫn giữ cổng kiểm cũ quét 10 đuôi file, thấy
      xanh và tưởng mình đạt chuẩn. Nghĩa là cải tiến lớn nhất của TS-12 (mở lên
      47 đuôi) **không tự đến được repo con**. Phiên này đã chép tay script vào cả
      4 repo con để vá tạm. Hai hướng sửa dứt điểm:
      1. Đưa `scripts/` vào gói đồng bộ và vào `MANIFEST.sha256` (script thành
         thứ được xác minh băm như tài liệu). Sạch nhất, nhưng repo con mất quyền
         sửa script cho hợp cảnh của mình.
      2. Thêm một bước bắt buộc vào `docs/SYNC.md` và vào mẫu "Hướng dẫn nâng
         cấp" của CHANGELOG: `curl` lại `check-standards.sh` theo đúng nhãn đang
         đồng bộ. Ít xâm lấn hơn, nhưng dựa vào người nhớ làm.
      Đề xuất chọn hướng 1. Sửa xong là bản `v3.1.0`.

**Chờ chủ project quyết, agent không tự quyết được:**

- [ ] **TS-8** Chữ "dev" đang có **hai màu** ở hai sản phẩm, cả hai đều hợp lệ theo
      `docs/BRAND_ASSETS.md` mục 5 nên cổng kiểm không bắt được:
      - `tsudev` (website): `packages/ui/src/components/Logo.tsx` dùng token
        `text-link` - ra màu **xanh**.
      - `tsudev-cwico`: `ui/src/components/Brand.tsx` dùng dải `--color-dev-*`
        riêng - ra màu **cam**, khớp chữ "dev" cam trong logo chính thức.

      Đây là quyết định nhận diện, không phải lỗi kỹ thuật. Ba lựa chọn:
      1. **Giữ nguyên** - ghi một dòng vào mục "Quyết định quan trọng" để phiên sau
         không hỏi lại, rồi đóng việc này.
      2. **Thống nhất theo cam** (khớp logo): sửa `Logo.tsx` ở website dùng dải cam
         thay `text-link`. Cam `MUST` lấy theo bảng ở `BRAND_ASSETS.md` mục 5 -
         `#C2410C` cho nền sáng, `#FE7B2E` cho nền tối.
      3. **Thống nhất theo xanh** (khớp token giao diện): sửa `Brand.tsx` ở `cwico`
         dùng `text-link`, và cân nhắc bỏ dải `--color-dev-*` cam.

      Chọn 2 hoặc 3 thì `MUST` có ảnh chụp trước/sau và `MUST` tách PR riêng cho
      từng repo. Bối cảnh đầy đủ: `logs/handover/20260824-05_logo-ban-dark.md` mục 2.

## Đang thực hiện

| Task | Agent | Bắt đầu |
| --- | --- | --- |

## Đã hoàn thành (mới nhất trên cùng)

- 25/08/2026 - **TS-14: phát hành `v3.0.0` và đồng bộ xuống cả 4 repo con.**
  - Repo này: PR #25 (9 commit, merge kiểu `rebase` theo `GIT_WORKFLOW.md` mục
    4.5 vì chuỗi commit có nghĩa riêng), nhãn `v3.0.0`, lượt rà soát bảo mật theo
    mục 4.4 ghi thành comment trên PR.
  - Repo con: `tsudev` #71, `swico` #8, `tsudev-cwico` #12, `tsudev-contact` #6.
    Mỗi PR ba commit: dọn gạch ngang, đồng bộ `.standards/`, mở việc `QU-STD-*`.
    CI xanh cả 4.
  - Dọn 8 chỗ gạch ngang ở 3 repo con, trong đó 2 chỗ là chuỗi người dùng nhìn
    thấy (tiêu đề cửa sổ và mô tả gói MSIX của `tsudev-cwico`). Hai chỗ được
    miễn trừ đúng luật: migration Prisma của `tsudev`, và dòng trích ký tự có ghi
    mã điểm.
  - `AGENTS.md` của cả 4 repo con thiếu 4 lối vào trong bảng bản đồ quy ước
    (`BRAND_ASSETS.md` thiếu từ `v2.4.0`), đã bổ sung.
  - Hai lỗi của chính bộ quy ước lộ ra khi đồng bộ: TS-15 và TS-16 trong hàng đợi.
  - Đã merge hết, Release đã tạo, xác minh bằng clone mới: cả 4 repo con
    `ref=v3.0.0 version=3.0.0`, cổng kiểm và `sync --check` đạt, CI `main` xanh.
  Chi tiết: `logs/handover/20260825-08_phat-hanh-v3-va-dong-bo.md`.

- 25/08/2026 - **Đóng gói bản phát hành `v3.0.0` thành 8 commit theo nhóm chủ đề**
  trên nhánh `feat/quy-uoc-v3-tai-khoan-bang-nhan-dien` (`3cc6cdf` tới `eeee963`),
  bốn commit mang `BREAKING CHANGE:` riêng cho từng nghĩa vụ. `AGENTS.md` tách theo
  hunk để giữ luật một commit một việc. Cổng kiểm xanh 0 lưu ý sau khi commit.
  **Chưa đẩy được lên GitHub** - xem TS-14 trong hàng đợi.

- 24/08/2026 - **`v3.0.0` (MAJOR): bộ quy ước lần đầu bắt buộc về chức năng sản
  phẩm, không chỉ về cách viết mã.** TS-9 tới TS-13 xong hết.
  - Ba tài liệu mới: `docs/AUTH_AND_ACCOUNT.md` (kiến trúc tài khoản, ba lối vào
    Google/GitHub/tsudev, cơ chế Xác minh tài khoản 7 ngày, ma trận quyền),
    `docs/DATA_TABLE.md` (bộ chọn số bản ghi `10/20/50/100/200`, mặc định `10`,
    góc dưới bên trái), `docs/ECOSYSTEM_IDENTITY.md` (tsudev.com, ảnh đại diện,
    trang hồ sơ).
  - `BRAND_ASSETS.md` thêm mục 12 (bộ tài sản bắt buộc theo loại sản phẩm, có
    cổng kiểm CI mẫu) và mục 13 (kho lưu và kho dùng).
  - `AGENTS.md` mục 7.1: quy ước gạch ngang tách riêng, siết phạm vi.
    `check-standards.sh` mục 4 mở từ 10 lên 47 đuôi file, thêm cảnh báo en-dash.
  - `SEARCH_AND_FILTER.md` mục 7: trần `page_size` nâng 100 lên 200 kèm hai ràng
    buộc bù bắt buộc.
  - Cổng kiểm xanh 0 lưu ý. **Chưa phát hành nhãn, chưa đồng bộ xuống repo con** -
    xem `logs/handover/20260824-06_quy-uoc-v3.md` mục 2.

- 24/08/2026 - **`v2.8.0` đã đồng bộ xuống cả 4 repo con** (`tsudev` #67,
  `swico` #7, `tsudev-cwico` #11, `tsudev-contact` #5). Chi tiết phiên:
  `logs/handover/20260824-05_logo-ban-dark.md`.
- 24/08/2026 - **Bản logo cho nền tối** (`tsudev` #66, quy ước `v2.8.0`).
  `logo-full-dark.png` và `logo-wordmark-dark.png` sinh từ chính dây chuyền
  `packages/brand/build-assets.js`: mực navy đổi sang trắng (1.38:1 lên 17.28:1),
  chữ cam giữ nguyên vì đã đạt 6.66:1. Món nợ ghi ở `v2.7.0` mục 10 đã trả.
- 24/08/2026 - **TS-7 xong, hàng đợi cạn.** `tsudev-cwico` #9: xuất lại dấu hiệu
  thu gọn từ bản gốc `2048x2048` bằng đúng thuật toán của `build-assets.js`, sinh
  lại 26 icon. Nguồn `222x280` lên `824x1083`, IoU so với bản cũ **0.9553** - không
  đổi nhận diện, chỉ đổi độ phân giải. `v2.7.0` đã đồng bộ xuống cả 4 repo con
  (`tsudev` #65, `swico` #6, `tsudev-cwico` #10, `tsudev-contact` #4).
  Chi tiết: `logs/handover/20260824-04_nhan-dien-thuc-te.md`.
- 24/08/2026 - **`v2.7.0`: sửa lỗi nội dung của `v2.4.0` và `v2.6.0` về bộ nhận
  diện.** `tsudev-cwico` chưa bao giờ lệch chuẩn - con cú của nó và `logo-mark.png`
  trên tsudev.com là cùng một tác phẩm (IoU 0.957). Bản gốc thật là
  `tsudev/packages/brand/source/logo.jpeg` `2048x2048`, có dây chuyền sinh từ
  02/08/2026. **TS-5 không còn cần làm** (dấu hiệu thu gọn đã tồn tại) và **TS-6
  đã huỷ** (đổi cam sang xanh sẽ làm app lệch khỏi website). Thay bằng TS-7.
- 24/08/2026 - **`v2.6.0` đã đồng bộ xuống cả 4 repo con.** `tsudev` #64,
  `swico` #5, `tsudev-cwico` #8, `tsudev-contact` #3 - đều `version=2.6.0`, đã xác
  minh bằng clone mới, CI `main` xanh. Chi tiết phiên:
  `logs/handover/20260824-03_ban-goc-dau-hieu.md`.
- 24/08/2026 - **`v2.6.0`: đưa bản gốc dấu hiệu vào repo và sửa lại nội dung sai
  của `v2.4.0`.** `assets/brand/tsudev-logo.png` nay là bản gốc chính thức, nằm
  ngoài bộ đồng bộ nên repo con không tải thêm byte nào. Phát hiện quan trọng:
  huy hiệu chính thức và con cú ở `tsudev-cwico` là **hai thiết kế khác hẳn nhau**,
  không phải hai độ phân giải của cùng một logo như `v2.4.0` đã giả định.
  TS-5 cũ dựa trên giả định sai đó nên đã bị viết lại; thêm TS-6.
- 24/08/2026 - **Phát hành `v2.4.0` + `v2.5.0` và đồng bộ xuống cả 4 repo con.**
  Chi tiết: `logs/handover/20260824-02_phat-hanh-v24-v25-va-dong-bo.md`. Tóm tắt:
  hàng đợi TS-1 đến TS-4 cạn hết; 2 nhãn, 2 Release, PR #14 và #16 ở repo này;
  `tsudev` #63, `swico` #4, `tsudev-cwico` #7, `tsudev-contact` #2 - cả 4 đã ở
  `.standards-version` `2.5.0`, đã xác minh bằng clone mới, CI `main` xanh.
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

- 25/08/2026 - **Repo này `MUST` đẩy mã bằng tài khoản `tsudev-tsudev`.** Máy có
  hai tài khoản `gh` cùng đăng nhập; `credential.helper` toàn cục lấy token của
  tài khoản **đang hoạt động**, không lấy theo `user.name` của repo. Đặt sai tài
  khoản thì `git push` trả `403` chứ không báo gì rõ hơn. Kiểm bằng
  `gh auth status`, đổi bằng `gh auth switch --user tsudev-tsudev`.

- 24/08/2026 - **`logo-tsudev.png` KHÔNG được dùng cho sản phẩm** (chủ project
  quyết lại 24/08/2026, khẳng định quyết định cũ). File đó là bản sao đúng từng
  byte của `assets/brand/variants/tsudev-badge-cyan.png` (md5 `00c334bc...`).
  Yêu cầu "áp logo này cho mọi project" được hiểu là **siết quy tắc bắt buộc**:
  mọi sản phẩm phải đủ bộ logo/favicon/icon/ảnh chia sẻ sinh từ dây chuyền chính
  thức cam/navy, có cổng kiểm CI canh. Nhận diện **không đổi**.
  Chi tiết: `docs/BRAND_ASSETS.md` mục 12 và 13.
- 24/08/2026 - **Trần `page_size` nâng từ 100 lên 200** (chủ project quyết). Đây
  là nới lỏng nên nó có giá: `MUST` có giới hạn tần suất riêng cho `page_size` từ
  100 trở lên, và `MUST` chuyển sang phân trang con trỏ khi tập dữ liệu vượt
  100.000 bản ghi. Hai ràng buộc đó là **điều kiện** của việc nâng trần, không
  phải khuyến nghị kèm theo. Chi tiết: `docs/DATA_TABLE.md` mục 8.
- 24/08/2026 - **`tsudev.com` là Nhà cung cấp danh tính duy nhất của hệ sinh
  thái.** Google và GitHub nối vào IdP đó, `MUST NOT` nối thẳng vào từng project.
  Lý do: mỗi `client_id` thừa là một bề mặt tấn công thừa, và nối thẳng thì cùng
  một người ở hai sản phẩm thành hai tài khoản khác nhau. Chi tiết:
  `docs/AUTH_AND_ACCOUNT.md` mục 2.
- 24/08/2026 - **Bản này là MAJOR, không phải MINOR.** Ba tài liệu mới đều mang
  quy tắc mức `MUST` buộc repo con sửa mã (thêm bộ chọn số bản ghi, thêm cơ chế
  xác minh, bổ sung tài sản nhận diện). Theo `docs/VERSIONING.md` mục 1, buộc sửa
  mã là định nghĩa của thay đổi phá vỡ. CHANGELOG có mục "Hướng dẫn nâng cấp" 4
  bước, trong đó bước 1 (dọn em-dash) `MUST` làm **trước** khi đồng bộ.

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
- 24/08/2026 - **Huy hiệu xanh cyan KHÔNG phải nhận diện chính thức** (chủ project
  quyết 24/08/2026). Cam/navy giữ nguyên. File giữ ở `assets/brand/variants/` có
  nhãn "không dùng cho sản phẩm" - giữ để không mất, không phải để dùng. Chuyển hệ
  sinh thái sang nó là một cuộc đổi nhận diện, `MUST` làm đồng loạt website + app +
  favicon + avatar + ảnh chia sẻ. Chi tiết: `docs/BRAND_ASSETS.md` mục 11.
- 24/08/2026 - **Bản gốc thiết kế được commit vào repo quy ước, ở `assets/brand/`.**
  Đó là thứ duy nhất trong hệ sinh thái không dựng lại được nếu mất, mà lại đang chỉ
  nằm trên một máy. Đặt ngoài `docs/tokens/templates/scripts` nên không vào
  `MANIFEST.sha256` và không đi theo `sync-standards.sh` - repo con không gánh thêm
  1.7MB. Chi tiết: `docs/BRAND_ASSETS.md` mục 1.
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
