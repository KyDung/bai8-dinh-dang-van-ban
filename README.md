# Studio Chữ — Bài 8: Định dạng văn bản

Web học tương tác Tin học 12 (Kết nối tri thức). HTML/CSS/JavaScript thuần, không cần npm hay build.
Dùng chung Firebase project `db-web-dayhoc` và tài khoản giáo viên với các bài khác (xem `Web12A8`, bài 10).

- Học sinh: `index.html`
- Giáo viên: `teacher.html` (gõ tên đăng nhập, ví dụ `dung`, tự thêm `@linklab.edu.vn`)
- Mã bài: `html-bai8-dinh-dang-van-ban`
- Nơi lưu: `lessons/html-bai8-dinh-dang-van-ban/students/<lop_hoten-khong-dau>`

## Chạy

Dùng Live Server với `index.html`, hoặc `python -m http.server 8080` rồi mở http://localhost:8080. Không mở bằng `file://` vì Firebase cần địa chỉ http(s).

## Nội dung

1. **Khởi động**: so sánh hai văn bản (Hình 8.1), chọn văn bản đẹp hơn rồi bấm vào văn bản b để gọi tên các thành phần: tiêu đề, đoạn văn, chữ nhấn mạnh.
2. **Hình thành kiến thức** (6 bài): thuộc tính `style` → tiêu đề `h1`–`h6` → đoạn văn `p`, `br`, `hr` → nhấn mạnh `strong`, `em`, `mark`, `del` → `sup`, `sub`, `small` → màu, phông, cỡ chữ và `span`. Mỗi bài có mã mẫu tô màu giải thích từng thành phần, khung kết quả cho thấy tác dụng của thẻ và nhiệm vụ viết thêm vào mã có sẵn.
3. **Luyện tập** (3 bài, có “kết quả cần đạt” để đối chiếu): trình bày bài toán biện luận phương trình bậc 2, làm tờ rơi Internet tốc độ cao, sửa lỗi định dạng. Cuối phần có nút nộp phần 1.
4. **Vận dụng**: trình bày một bài ca dao thành tấm thiệp, tiêu đề dùng màu cụ thể lấy từ bức tranh bằng công cụ lấy màu. Checklist trực tiếp, nộp riêng.

Từ điển HTML ở nút góc trên, tìm có hoặc không dấu.

## Xem trước và an toàn

Mã học sinh được lọc rồi mới đưa vào iframe sandbox không chạy script. Thuộc tính `style` được giữ nhưng chỉ cho phép các thuộc tính CSS định dạng chữ/khối, loại `url()`, `expression`, `@import`… Bộ chấm đọc đúng chữ học sinh gõ trong `style` (ví dụ phát hiện `font-size:18` thiếu `px`). Ảnh minh họa là SVG vẽ tay trong mã. Font Be Vietnam Pro lưu cục bộ (SIL OFL, `assets/fonts/OFL.txt`). Chỉ Firebase cần mạng.

## Firebase

Rules dùng chung nằm ở `firestore.rules` (chỉ cần dán một lần cho cả database, các bài sau chỉ đổi `LESSON.id`). Giáo viên đăng nhập bằng email/mật khẩu có UID trong collection `teachers`, hoặc Google email quản trị. Domain triển khai cần có trong Authentication → Settings → Authorized domains.
