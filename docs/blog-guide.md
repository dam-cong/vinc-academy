# Blog "Kiến thức" — hướng dẫn chung

Site tĩnh deploy Vercel, **không build step**: mọi trang là HTML viết tay.

## Mô hình
```
/blog/                       Hub tổng (lưới chủ đề)          en/blog/
/blog/<chủ-đề>/              Hub chủ đề (series + bài lẻ)     en/blog/<chủ-đề>/
/blog/<chủ-đề>/<slug>.html   Bài viết                         en/blog/<chủ-đề>/<slug>.html
```
Chủ đề > Series (tùy chọn) > Bài. Series chỉ là nhóm trong hub chủ đề + `series-nav` trong bài, không nằm trong URL. Slug chủ đề: `odoo`, `python`, `git`, `linux`, `sql`, `ai`.

## Thêm chủ đề mới
1. Copy `blog/odoo/index.html` → `blog/<chủ-đề>/index.html` (và bản `en/`), đổi tiêu đề, mô tả, breadcrumb, canonical/hreflang, JSON-LD, thẻ bài.
2. Ở `blog/index.html` + `en/blog/index.html`: đổi thẻ `.post-card.soon` của chủ đề thành `<a class="post-card" href="<chủ-đề>/index.html">` + nhãn "Đã xuất bản"; thêm vào `hasPart` JSON-LD.
3. `sitemap.xml`: thêm cặp URL hub chủ đề (VI 0.8 / EN 0.6).

## Thêm bài
Mỗi bài cần 1–2 ví dụ "lỗi hay gặp" (khung `.callout`, có căn cứ từ tài liệu). Theo checklist `docs/odoo-series-handoff.md` §5 (đường dẫn thay `odoo/` bằng `blog/<chủ-đề>/`), kiểm tra §7. Mỗi bài chạm: file VI + EN, hub chủ đề, sitemap, bài trước (nếu có series-nav).

## Vai trò (agent)
Xem `.claude/agents/`: `blog-writer`, `translator`, `seo-reviewer`, `frontend-qa`.

## Thứ tự và nhóm trên hub `/blog/`
Hub chia 4 nhóm theo lộ trình học (thẻ nằm trong `<section class="blog-group">`; bộ lọc `initPostFilter` tự ẩn nhóm rỗng). Nhãn cấp độ ghi ở `post-num` (Người mới / Trung cấp).
1. **Định hướng cho sinh viên và người mới**: `career` (Lộ trình & nghề IT, đã xuất bản); `first-job` (Kỹ năng đi làm đầu tiên, đã xuất bản).
2. **Nền tảng kỹ thuật**: `python`, `linux`, `git` (đã xuất bản); `sql`, `web-api` (Web & API cơ bản), `algorithms` (Giải thuật & cấu trúc dữ liệu): sắp ra mắt.
3. **Kỹ thuật nâng cao**: `clean-code`, `ai-coding`, `devops`: sắp ra mắt.
4. **Odoo: lập trình ERP**: `odoo` (đã xuất bản).
Khi xuất bản một chủ đề mới, đổi thẻ `post-card soon` thành link `<slug>/index.html` ở **cả hai** hub (VI và EN) và thêm vào JSON-LD `hasPart`.

## Chủ đề đã có
- `odoo`: series "Lập trình Odoo 20 từ A–Z" (14 bài) — xem `docs/odoo-series-handoff.md`.
- `python`: series "Python thực chiến cho lập trình viên Odoo" (14 bài) — xem `docs/python-series-handoff.md`.
- `git`: series "Git thực chiến cho nhóm phát triển" (12 bài) — xem `docs/git-series-handoff.md`.
- `linux`: hub "Linux & Shell" (chưa có bài).
- `career`: hub "Lộ trình & nghề IT" — bài 1 `lo-trinh-nghe-it-2026-sinh-vien-thoi-ai.html` (EN `it-career-roadmap-2026-students-ai-era.html`), bài 2 `cv-portfolio-github-cho-fresher-it.html` (EN `it-fresher-cv-github-portfolio.html`), bài 3 `phong-van-thuc-tap-fresher-it.html` (EN `it-internship-fresher-interview-prep.html`). Đủ 3/3 bài; phần thử việc dẫn Bộ luật Lao động 2019 (Điều 25–27), cập nhật nếu luật thay đổi. Bài định hướng dùng số liệu từ báo cáo tuyển dụng công khai (TopCV, ITviec, Stack Overflow), ghi nguồn cạnh số liệu; nhận định riêng ghi rõ "góc nhìn Vinc"; cập nhật số liệu khi có báo cáo năm mới.
- `first-job`: hub "Kỹ năng đi làm đầu tiên" — bài 1 `tuan-dau-di-lam-it-onboarding-ticket.html` (EN `first-week-it-job-onboarding-tickets.html`), bài 2 `code-review-nhan-va-dua-gop-y.html` (EN `code-review-receiving-giving-feedback.html`), bài 3 `agile-scrum-uoc-luong-bao-cao-tien-do.html` (EN `agile-scrum-estimating-reporting-progress.html`). Đủ 3/3 bài; nguồn chính: Google Engineering Practices (CC-BY 3.0) và Scrum Guide 2020 (CC BY-SA 4.0), ghi công trong disclaimer.
- Sơ đồ SVG: chữ không được cắt khung / tràn viewBox; kiểm tra bằng mắt ở 1366px và 390px.
- Ảnh bìa bài: `image/cover/<slug>.webp` (960×504, ~17 KB, thu nhỏ từ ảnh OG) chèn bằng `<figure class="post-cover">` ngay sau `</header>` của bài. Ảnh OG PNG vẫn giữ cho mạng xã hội.
- Bài mới dựng thủ công theo checklist trong `docs/odoo-series-handoff.md` §5.

## Quy ước tiêu đề
- Dạng "<Chủ đề> trong <công nghệ>: <nội dung chính>" (EN: "<Topic> in <Tech>: <what>"); từ khóa chính ở đầu; tiêu đề bài ≤ 58 ký tự, hub kèm " | Vinc Academy" ≤ 60.
- Bối cảnh series (Odoo, nhóm) để ở `section-tag`, breadcrumb, mô tả; không lặp trong mọi tiêu đề. "từ A–Z" chỉ cho hub/bài tổng quan; tránh "có ví dụ", "hướng dẫn" thừa. EN đặt "in Odoo 20" ở cuối, giống VI "trong Odoo 20".
- `<title>` = `og:title` = JSON-LD `headline` = `<h1>`; H1 hub mô tả đầy đủ (không chỉ tên công nghệ). Đổi tiêu đề thì giữ nguyên slug.

## Quy tắc link (chạy được cả `file://` và Vercel)
- Link nội bộ luôn **tương đối** và **ghi rõ `index.html`** (VD `odoo/index.html`, `../index.html`), không dùng `/` đầu dòng hay link thư mục `odoo/` — `file://` không tự mở `index.html`.
- Chỉ `canonical`, `hreflang`, `og:url`, JSON-LD và `sitemap.xml` dùng URL tuyệt đối dạng thư mục (`/blog/odoo/`) cho gọn.

## Vercel
- `vercel.json`: redirect 301 `/odoo/*` → `/blog/odoo/*`, `/en/odoo/*` → `/en/blog/odoo/*`.
- `.vercelignore`: loại `.claude`, `docs`, `README.md` khỏi bản deploy (không để lộ tài liệu nội bộ).
- Giữ URL `.html`; không bật `cleanUrls` (khớp canonical/sitemap).

## Lượt xem bài
- `api/views.js` (Vercel Function, không phụ thuộc gói) đếm bằng Upstash Redis: `GET /api/views?slug=a,b` đọc, `POST ?slug=a&v=<id>` tăng 1, **mỗi trình duyệt 1 lượt / bài / 30 phút**. `<id>` là mã ẩn danh tạo ngẫu nhiên, lưu ở `localStorage` (`va-vid`), nên nhiều người chung mạng vẫn được đếm riêng; trình duyệt chặn `localStorage` thì server chống trùng theo IP.
- Cần Upstash Redis nối vào project Vercel (env `UPSTASH_REDIS_REST_URL/TOKEN` hoặc `KV_REST_API_URL/TOKEN`). Thiếu env hoặc `file://` → số lượt xem tự ẩn.
- Mỗi bài thêm vào `.post-meta`: `<b data-views="<slug>" data-view-hit>–</b>`; thẻ ở trang danh sách dùng `<b data-views="<slug>">` (không có `data-view-hit`).
- `<slug>` **dùng chung VI/EN** (lấy theo tên file bản VI, vd `odoo-la-gi` cho cả `what-is-odoo.html`). Logic ở `initViews()` trong `script.js`.

## Menu series bên trái (bài viết)
- Dựng bằng JS: `initSeriesNav()` và mảng `SERIES_ODOO` ở cuối `script.js` (không cần sửa HTML từng bài). Mỗi dòng: `[file VI, tiêu đề VI, file EN, tiêu đề EN]`, đúng thứ tự bài.
- **Thêm bài mới vào series = thêm 1 dòng vào `SERIES_ODOO`** (và thêm thẻ ở `blog/odoo/index.html`, `en/blog/odoo/index.html`).
- Bố cục (`blog.css`): ≥1600px 3 cột (menu · nội dung · mục lục), 1000–1599px 2 cột (mục lục gập), <1000px menu thành thanh gập có thanh tiến độ. Trạng thái "đã đọc" lưu ở `localStorage` (`va-read-odoo`), dùng chung VI/EN.
- Bài phải có `.post-layout` (article + aside mục lục) như các bài hiện có thì menu mới hiện.
