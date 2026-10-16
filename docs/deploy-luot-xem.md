# Hướng dẫn bật lượt xem bài blog khi deploy

Chưa làm các bước này thì trang vẫn chạy bình thường, chỉ ẩn phần lượt xem. Chi tiết kỹ thuật: [blog-guide.md](blog-guide.md#lượt-xem-bài).

## 1. Deploy code
Đảm bảo thư mục `api/` (file `api/views.js`) nằm trong commit và đã push; Vercel tự nhận, không cần sửa `vercel.json`.

## 2. Tạo Redis (một lần)
1. Vercel Dashboard → chọn project → tab **Storage**.
2. **Create Database** → chọn **Upstash (Redis)** (Marketplace) → gói Free → đặt tên → Create.
3. **Connect to Project** → chọn đúng project, bật cho cả Production và Preview.
4. Vercel tự thêm biến môi trường `KV_REST_API_URL` và `KV_REST_API_TOKEN` (hoặc `UPSTASH_REDIS_REST_URL/TOKEN`). Kiểm tra ở Settings → Environment Variables; hàm đọc được cả hai tên.

## 3. Redeploy
Biến môi trường chỉ có hiệu lực ở bản deploy mới: Deployments → bản mới nhất → **Redeploy** (hoặc push commit mới).

## 4. Kiểm tra sau deploy
1. Mở `https://vinc-academy.vercel.app/api/views?slug=odoo-la-gi` → phải ra JSON dạng `{"odoo-la-gi":0}`. Ra `{}` nghĩa là thiếu biến môi trường (quay lại bước 2–3).
2. Mở bài `/blog/odoo/odoo-la-gi.html` → dòng meta hiện "1 lượt xem"; tải lại trong 1 giờ không tăng thêm.
3. Mở bản EN `/en/blog/odoo/what-is-odoo.html` → cùng bộ đếm (VI và EN cộng chung).
4. Mở `/blog/odoo/` → thẻ bài hiện số; bấm **Đọc nhiều nhất** để kiểm tra sắp xếp.

## Lưu ý
- Dữ liệu nằm trong Upstash; xem hoặc sửa số ở Upstash Console → Data Browser (key `views:<slug>`).
- Khi chạy thử trên `localhost`, bài vẫn tăng đếm; muốn xóa số thử thì sửa key trong Data Browser.
- Bài mới: thêm `data-views="<slug>"` theo [blog-guide.md](blog-guide.md#lượt-xem-bài), slug dùng chung VI/EN.
