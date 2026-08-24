# QUY TẮC DUY TRÌ `.gitignore` - mọi repo tsudev (v2.0.0)

> `.gitignore` là hàng rào bảo mật rẻ nhất và bị bỏ quên nhiều nhất. Một dòng
> thiếu ở đây tốn nhiều công hơn mọi thứ khác trong bộ quy ước này.

## 1. Nguồn chân lý

Bản chuẩn nằm tại `templates/gitignore/base.gitignore` của repo
`tsudev-standards`. Mọi repo con `MUST` chứa **toàn bộ** nội dung bản chuẩn.

- **Được phép THÊM** dòng cho nhu cầu riêng của repo.
- **KHÔNG được phép XÓA BỚT** dòng nào của bản chuẩn. Muốn bỏ một dòng thì phải
  đề xuất ngược lên trung tâm qua `proposals/`, không tự bỏ ở repo con.
- Bản chuẩn được kiểm tự động bằng `scripts/check-standards.sh`.

## 2. Cách ghép cho từng loại project

```bash
# Bước 1: lấy phần nền
cat .standards/templates/gitignore/base.gitignore > .gitignore

# Bước 2: nối thêm phần theo ngôn ngữ (chọn đúng file)
cat .standards/templates/gitignore/node.gitignore   >> .gitignore   # Node/TypeScript
cat .standards/templates/gitignore/python.gitignore >> .gitignore   # Python
cat .standards/templates/gitignore/dotnet.gitignore >> .gitignore   # C#/.NET
cat .standards/templates/gitignore/cpp.gitignore    >> .gitignore   # C/C++
cat .standards/templates/gitignore/rust.gitignore   >> .gitignore   # Rust / Tauri
cat .standards/templates/gitignore/mobile.gitignore >> .gitignore   # Flutter/RN/Android/iOS

# Bước 3: thêm phần riêng của repo dưới tiêu đề rõ ràng
printf '\n# --- Riêng của repo này ---\n' >> .gitignore
```

## 3. Mười nhóm của bản chuẩn

| Nhóm | Bảo vệ khỏi điều gì |
| --- | --- |
| 1. Biến môi trường & cấu hình nhạy cảm | Lộ chuỗi kết nối, khóa dịch vụ |
| 2. Khóa, chứng chỉ, token | Lộ khóa riêng, khóa ký ứng dụng, khóa SSH |
| 3. Hạ tầng dưới dạng mã | `*.tfstate` chứa secret ở dạng văn bản thuần |
| 4. Bản build & bản phát hành | Repo phình to, phát tán bản build cũ có lỗ hổng |
| 5. Phụ thuộc & cache | Repo phình to, xung đột giữa các máy |
| 6. Log & file tạm | Log ứng dụng thường chứa token phiên và dữ liệu cá nhân |
| 7. IDE, công cụ & hệ điều hành | Lộ đường dẫn cục bộ, cấu hình cá nhân |
| 8. Công cụ AI & agent | `.claude/settings.local.json` và tương đương có thể chứa khóa |
| 9. Dữ liệu cục bộ, cá nhân & kết quả kiểm thử | Commit nhầm database thật có dữ liệu người dùng |
| 10. Dấu vết điều tra / gỡ lỗi | `.har` chứa nguyên cookie phiên và header xác thực |

## 4. Quy tắc vận hành

1. **Hễ tạo ra file nhạy cảm thì bổ sung ngay**, trước khi commit, không đợi
   nhắc. Đây là mục 3 của `AGENTS.md`.
2. `.gitignore` **không dọn được thứ đã theo dõi**. Nếu file đã bị commit trước
   đó, thêm dòng ignore là vô nghĩa:
   ```bash
   git rm --cached <đường-dẫn>    # gỡ khỏi chỉ mục, giữ file trên đĩa
   ```
   Và nếu file đó chứa secret, xử lý theo `SECURITY_BASELINE.md` mục 9.2 - thu
   hồi khóa trước, dọn lịch sử sau.
3. **Kiểm tra một đường dẫn có bị bỏ qua không**:
   ```bash
   git check-ignore -v <đường-dẫn>
   ```
4. **Không dùng `.gitignore` toàn cục của máy cá nhân** để che file chuẩn phải có
   trong repo. Người khác clone về sẽ không có lớp che đó.
5. Với file cần giữ trong repo nhưng tên trùng mẫu bị chặn, dùng dấu `!` để mở
   lại và **ghi chú lý do ngay dòng trên**.

## 5. Bốn sai lầm hay gặp

| Sai lầm | Hậu quả | Cách đúng |
| --- | --- | --- |
| Thêm `.gitignore` sau khi đã commit secret | Secret vẫn nằm trong lịch sử, ai clone cũng thấy | Thu hồi khóa, `git filter-repo`, xem `SECURITY_BASELINE.md` 9.2 |
| Chặn cả thư mục `config/` | Chặn luôn file cấu hình mẫu cần commit | Chặn `config/*.local.*`, giữ `config/default.json` |
| Dùng `*.env` thay vì `.env*` | Bỏ sót `.env.production`, `.env.local` | Dùng đúng bản chuẩn |
| Xóa bớt dòng của bản chuẩn cho "gọn" | Repo lệch chuẩn, lần sau không ai biết vì sao | Đề xuất qua `proposals/` |

## 6. Cổng kiểm

`scripts/check-standards.sh` kiểm tra:

- Repo có `.gitignore` không.
- `.gitignore` có chứa đủ mọi dòng của bản chuẩn không.
- Cây làm việc có file nào khớp mẫu nhạy cảm mà **đang được git theo dõi** không.

Cổng này `MUST` chạy trong CI của mọi repo con và chặn merge khi thất bại.
