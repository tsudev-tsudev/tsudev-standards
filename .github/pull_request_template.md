## Vì sao cần thay đổi này

<!-- Nêu VẤN ĐỀ, chưa nêu giải pháp. Quy ước hiện tại làm hỏng việc gì, ở đâu? -->

## Làm gì

<!-- Tóm tắt cách tiếp cận. Không liệt kê từng file - người duyệt xem được diễn biến. -->

## Loại thay đổi

- [ ] `PATCH` - sửa diễn đạt, liên kết hỏng, làm rõ câu chữ mà không đổi nghĩa
- [ ] `MINOR` - bổ sung thuần: token mới, tài liệu mới, quy tắc mức `SHOULD`
- [ ] `MAJOR` - phá vỡ: bỏ hoặc đổi token, siết `SHOULD` lên `MUST`, đổi cấu trúc bắt buộc

## Ảnh hưởng tới repo con

<!-- Ai phải sửa gì, mất bao lâu? Ghi "không ảnh hưởng" nếu đúng vậy. -->

## Kiểm chứng

- [ ] `./scripts/check-standards.sh` đạt
- [ ] `node scripts/build-tokens.mjs --check` đạt (nếu đụng token)
- [ ] `node scripts/check-contrast.mjs` đạt (nếu đụng màu)
- [ ] `./scripts/make-manifest.sh` đã chạy lại
- [ ] `gitleaks detect --redact` sạch
- [ ] `VERSION` đã cập nhật theo `docs/VERSIONING.md` mục 1
- [ ] `CHANGELOG.md` đã ghi; nếu là `MAJOR` thì đã có mục "Hướng dẫn nâng cấp"

## Rủi ro và đường lùi

<!-- Nếu thay đổi này sai, phát hiện bằng dấu hiệu gì, quay lại mất bao lâu? -->
