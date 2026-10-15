# Bàn giao: Chuyên mục "Lập trình Odoo 20" (blog song ngữ, chuẩn SEO)

> Tài liệu dành cho dev tiếp nhận việc viết và xuất bản các bài tiếp theo trong series.
> Cập nhật: 16/10/2026 · Trạng thái: **đã xuất bản bài 1 và bài 2 / 14 bài** (chưa commit).

---

## 1. Mục tiêu

- Xây chuyên mục bài viết **dạy lập trình Odoo 20 cho developer** để kéo traffic tự nhiên từ Google → dẫn người đọc về các khóa học của Vinc Academy.
- Nội dung **thuộc bản quyền Vinc Academy**, song ngữ **VI/EN**, chuẩn SEO, giao diện dùng chung với trang chủ.
- Domain production: `https://vinc-academy.vercel.app`
- Nguồn kỹ thuật chính thức: **Odoo 20 Developer docs** – https://www.odoo.com/documentation/20.0/developer.html

---

## 2. Cấu trúc file

```
index.html                     # Trang chủ (đã có link "Lập trình Odoo" ở nav + footer, meta SEO, JSON-LD)
blog.css                       # Style riêng cho blog (dùng biến màu của styles.css → tự hỗ trợ dark/light)
script.js                      # i18n chung; hỗ trợ <html data-lang> và nút đổi ngôn ngữ theo data-alt
sitemap.xml, robots.txt        # SEO toàn site
image/og/*.png                 # Ảnh chia sẻ 1200×630 (tự thiết kế)

odoo/                          # Bản tiếng Việt
├── index.html                 # Hub series (14 thẻ bài)
├── odoo-la-gi.html            # Bài 1
└── cai-dat-odoo-20.html       # Bài 2

en/odoo/                       # Bản tiếng Anh (URL riêng, không swap bằng JS)
├── index.html
├── what-is-odoo.html          # Part 1
└── install-odoo-20.html       # Part 2
```

**Cơ chế ngôn ngữ**
- Mỗi trang blog khai báo `<html lang="vi" data-lang="vi">` (hoặc `en`). `script.js` đọc `data-lang` để dịch nav/footer và lưu vào `localStorage`.
- Nút VI/EN có thuộc tính `data-alt="<đường dẫn tương đối tới bản ngôn ngữ kia>"`; bấm vào sẽ chuyển trang.
- Trang chủ vẫn dùng cơ chế swap i18n cũ (không có `data-lang`).

---

## 3. Tiến độ series (14 bài)

| # | VI (slug) | EN (slug) | Trạng thái |
|---|---|---|---|
| 01 | `odoo-la-gi.html` – Odoo là gì? | `what-is-odoo.html` | ✅ Đã xuất bản |
| 02 | `cai-dat-odoo-20.html` – Cài đặt môi trường Odoo 20 | `install-odoo-20.html` | ✅ Đã xuất bản |
| 03 | Tạo module đầu tiên & manifest | | ⏳ Tiếp theo |
| 04 | Model, fields & ORM | | ⏳ |
| 05 | Security: access rights & record rules | | ⏳ |
| 06 | Views & actions (form/list/search/kanban) | | ⏳ |
| 07 | Quan hệ Many2one/One2many/Many2many | | ⏳ |
| 08 | Computed fields, onchange & constraints | | ⏳ |
| 09 | Kế thừa (model/view inheritance) | | ⏳ |
| 10 | Báo cáo PDF với QWeb | | ⏳ |
| 11 | OWL framework cơ bản | | ⏳ |
| 12 | Web controllers & JSON-2 API | | ⏳ |
| 13 | Unit test trong Odoo | | ⏳ |
| 14 | Triển khai Odoo production | | ⏳ |

Thứ tự bám theo tutorial **Server framework 101** và mục Reference của Odoo 20 docs. Slug: chữ thường, không dấu, nối bằng `-`, có từ khóa chính.

**Gợi ý nội dung bài 3** (nối tiếp bài 2, đã hứa trong bài): giải thích từng file trong khung `vinc_course` sinh bởi `odoo-bin scaffold`, các khóa quan trọng của `__manifest__.py` (name, version `20.0.x.y.z`, depends, data, application, license), vòng đời cài/nâng cấp module (`-i`, `-u`, Update Apps List). Nguồn: `developer/tutorials/server_framework_101/02_newapp.html`, `developer/reference/backend/module.html`.

---

## 4. Quy tắc bản quyền (BẮT BUỘC)

1. **Chỉ dùng sự kiện, không dùng cách diễn đạt.** Không chép, không dịch câu-đối-câu tài liệu Odoo hay bài của site khác (đã tham khảo minhng.info). Viết lại bằng lời Vinc.
2. **Code mẫu tự viết**, dùng module ví dụ riêng `vinc_course` (quản lý khóa học). **Không** dùng ví dụ "Real Estate" của tutorial Odoo.
3. Mọi thông tin kỹ thuật phải **kiểm chứng trên Odoo 20 docs** và liệt kê ở mục "Nguồn tham khảo" cuối bài. Không đưa số liệu không kiểm chứng được (số người dùng, thị phần, lương…). Không bịa triệu chứng lỗi nếu docs không nêu.
4. Hình ảnh/sơ đồ tự tạo (inline SVG dùng class `.dg-*` trong `blog.css`), không dùng ảnh chụp của site khác, **không dùng logo Odoo** làm ảnh đại diện.
5. Cuối mỗi bài giữ dòng **miễn trừ nhãn hiệu** + khẳng định bản quyền (class `.disclaimer`).
6. Mỗi trang có `<meta name="author">`, `<meta name="copyright">`, JSON-LD `author/publisher/copyrightHolder = Vinc Academy`.
7. Trước khi xuất bản: chạy kiểm tra trùng lặp n-gram 5 từ với nguồn tham khảo (xem §7) → mục tiêu ~0 ngoài URL/thuật ngữ.

### Dữ kiện Odoo 20 đã xác minh (dùng lại được)

| Chủ đề | Dữ kiện | Nguồn (documentation/20.0/…) |
|---|---|---|
| Phiên bản | Odoo 20: 09/2026 · 19: 09/2025 · 18: 10/2024 · 17: 11/2023 | odoo.com/page/release-notes |
| Kiến trúc | 3 tầng: HTML5/JS/CSS (OWL từ v15) · Python · chỉ PostgreSQL | developer/tutorials/server_framework_101/01_architecture |
| Module | addons trong `addons_path`; `__manifest__.py`; models, views, data XML/CSV, controllers, static | như trên |
| Editions | Community LGPLv3 · Enterprise = module cài thêm, Odoo Enterprise Edition License | legal/licenses |
| Yêu cầu | Python ≥ 3.12 · PostgreSQL ≥ 16 · không dùng user `postgres` · wkhtmltopdf 0.12.6 (PDF header/footer) | administration/on_premise/source |
| CLI | `-i`/`-u` cần `-d`; `--dev` = all/xml/reload/qweb/werkzeug/replica/access; port 8069; **mặc định không có demo**, dùng `--with-demo`; `scaffold`, `shell` (`env.cr.commit()`) | developer/reference/cli |
| Developer mode | Settings › Developer Tools; `?debug=1`, `?debug=assets`, `?debug=tests`; `Ctrl+K` | applications/general/developer_mode |
| Hosting | Odoo Online không chạy custom module; Odoo.sh; On-premise | administration/hosting |
| Docker | image `odoo:20.0`; addons `/mnt/extra-addons`; filestore `/var/lib/odoo`; ví dụ Docker Hub còn dùng postgres:15 → **phải dùng postgres:16** | hub.docker.com/_/odoo |

---

## 5. Quy trình thêm một bài mới (checklist)

Ví dụ thêm **bài 3**, slug VI `tao-module-odoo-dau-tien.html`, EN `first-odoo-module.html`.

1. **Nhân bản bài gần nhất** cho từng ngôn ngữ: `odoo/cai-dat-odoo-20.html` → `odoo/<slug-vi>.html`; `en/odoo/install-odoo-20.html` → `en/odoo/<slug-en>.html`. Nav, footer, bóng chat giữ nguyên.
2. **Sửa `<head>`** (cả 2 bản):
   - `<title>` ≤ 60 ký tự, từ khóa chính đứng đầu.
   - `meta description` ≤ 155 ký tự, có lợi ích + lời kêu gọi.
   - `meta keywords`, `canonical`, 3 thẻ `hreflang` (vi / en / x-default = bản VI).
   - Open Graph: `og:title`, `og:description`, `og:url`, `og:image` (`image/og/<slug>.png`), `article:published_time`/`modified_time`.
   - JSON-LD `@graph`: `TechArticle` (headline, description, inLanguage, ngày, image, mainEntityOfPage), `BreadcrumbList`, `FAQPage` (**trùng khớp nguyên văn** với FAQ hiển thị trong bài).
   - Lưu ý: trong `<script type="application/ld+json">` viết `&` chứ **không** viết `&amp;`.
3. **Nút ngôn ngữ**: sửa `data-alt` trỏ tới bản ngôn ngữ còn lại (đường dẫn tương đối).
4. **Nội dung bài** (`<article class="prose">`), cấu trúc chuẩn:
   - Breadcrumb · `section-tag` "Bài N · Series…" · `<h1>` (chỉ 1) · lead · meta (ngày, phút đọc ≈ số từ/200).
   - Callout **"Tóm tắt nhanh"** 40–60 từ ngay đầu (nhắm featured snippet), có từ khóa chính.
   - Các `<h2 id="...">` (id không dấu) → cập nhật **mục lục** trong `<aside>` khớp id.
   - Thành phần có sẵn: `.table-wrap > table`, `<pre><code>` + `.code-title`, `.callout` / `.callout.tip`, `figure.diagram` (SVG), `.levels-grid`, `.cta-box`, `.faq-list` (dùng `toggleFaq` có sẵn).
   - Link nội bộ: tới bài trước/sau, hub, và khóa học liên quan `../program-detail.html?code=ODO-F|ODO-A|DEV-F|AI-O|ODO-B|ODO-D`.
   - Cuối bài: FAQ (3–5 câu) → Nguồn tham khảo → share-row → `series-nav` → disclaimer.
5. **Điều hướng series**: trong bài mới, `series-nav` có link bài trước + bài sau (nếu chưa có thì dùng `<span class="next">…Sắp ra mắt</span>`). Ở **bài trước**, đổi `<span class="next">` thành `<a class="next" href="<slug>">`.
   - ⚠️ `series-nav` là `<div role="navigation">`, **không dùng thẻ `<nav>`** (thẻ `nav` bị style sticky của menu chính).
6. **Hub** (`odoo/index.html` và `en/odoo/index.html`): đổi thẻ bài từ `<div class="post-card soon">` sang `<a class="post-card" href="...">`, nhãn "Đã xuất bản"/"Published"; thêm phần tử vào `hasPart` trong JSON-LD.
7. **Sitemap**: thêm 2 `<url>` (VI priority 0.8, EN 0.6) kèm 3 `xhtml:link` hreflang; cập nhật `lastmod`.
8. **Ảnh OG** 1200×630: xem §6.
9. **Chạy kiểm tra** §7.

---

## 6. Tạo ảnh OG

Ảnh hiện có được dựng từ một template HTML rồi chụp bằng Edge headless. Lưu template sau thành file tạm (ví dụ `og.html`, **không commit**):

```html
<!doctype html><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700&family=Space+Mono:wght@700&display=swap" rel="stylesheet">
<style>*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;font-family:'Be Vietnam Pro',sans-serif;color:#fff;background:radial-gradient(circle at 85% 20%,#185FA5 0,transparent 45%),linear-gradient(135deg,#042C53,#0C447C 60%,#0E2247);padding:70px 80px;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}
.top{display:flex;align-items:center;gap:18px;font-size:28px;font-weight:700}.top img{width:64px;height:64px;border-radius:14px;background:#fff}.top span{color:#7FB5EA}
.tag{font-family:'Space Mono',monospace;font-size:22px;color:#D4AF37;letter-spacing:2px;margin-bottom:18px}h1{font-size:64px;line-height:1.15;letter-spacing:-1.5px;max-width:1000px}p{font-size:26px;color:#C9DDF2;margin-top:18px;max-width:950px}
.bot{font-size:22px;color:#9DBBDB;display:flex;justify-content:space-between}</style>
<div class="top"><img src="file:///ĐƯỜNG_DẪN_REPO/image/vinc-academy.png">Vinc&nbsp;<span>Academy</span></div>
<div><div class="tag" id="t"></div><h1 id="h"></h1><p id="p"></p></div><div class="bot"><b id="b"></b><span>vinc-academy.vercel.app</span></div>
<script>const q=new URLSearchParams(location.search);for(const k of 'thpb')document.getElementById(k).textContent=q.get(k)||''</script>
```

Tham số URL: `t` (nhãn vàng, VD "BÀI 03 · LẬP TRÌNH ODOO 20"), `h` (tiêu đề), `p` (mô tả ngắn), `b` (dòng chân). Chụp:

```bash
msedge --headless=new --disable-gpu --allow-file-access-from-files --hide-scrollbars \
  --window-size=1200,630 --virtual-time-budget=4000 \
  --screenshot="image/og/<slug>.png" "file:///…/og.html?t=…&h=…&p=…&b=…"
```

(Giá trị tham số phải URL-encode. Trên Windows, Edge nằm ở `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`.)

---

## 7. Kiểm tra trước khi xuất bản

Quy tắc dự án: giao diện phải responsive và được kiểm tra ở **1366 / 800 / 520 / 390px**.

| Kiểm tra | Cách làm | Đạt khi |
|---|---|---|
| Không tràn ngang | Mở trang trong DevTools ở 4 mốc; trong Console chạy `document.documentElement.scrollWidth === document.documentElement.clientWidth` | `true` ở cả 4 mốc |
| Bảng / code dài | Thu về 390px | Bảng và `<pre>` cuộn ngang **trong khung**, trang không cuộn ngang |
| Dark / light | Bấm nút theme | Chữ, bảng, sơ đồ SVG đọc rõ ở cả 2 chế độ |
| Nút VI/EN | Bấm trên bài | Chuyển đúng sang bản ngôn ngữ kia |
| JSON-LD hợp lệ | `JSON.parse` từng khối, sau deploy dùng Google Rich Results Test | Không lỗi; FAQ được nhận diện |
| Link nội bộ | Bấm hết link nội bộ hoặc viết script quét `href`/`src`/`data-alt` | Không có link 404 |
| Title / description | Đếm ký tự | ≤ 60 / ≤ 155 |
| Trùng lặp nội dung | So n-gram 5 từ với bài tham khảo (tải HTML nguồn, bỏ tag, so tập 5 từ liên tiếp) | ~0 ngoài URL/thuật ngữ |

Đã có sẵn bài học: khi layout 2 cột chuyển 1 cột phải dùng `grid-template-columns: minmax(0, 1fr)` (không dùng `1fr`), nếu không bảng/code sẽ đẩy tràn trang.

---

## 8. Việc ngoài code sau khi deploy (marketing / SEO)

- [ ] Xác minh site trên **Google Search Console**, gửi `sitemap.xml`; yêu cầu index từng bài mới.
- [ ] Chạy **Google Rich Results Test** cho mỗi bài (FAQ, Breadcrumb).
- [ ] Chia sẻ bài lên Fanpage https://www.facebook.com/vinc.academy, Zalo, nhóm Odoo Developer VN (ảnh OG đã sẵn).
- [ ] Nhịp xuất bản đều (gợi ý 1 bài/tuần); mỗi bài mới link chéo bài cũ và khóa học liên quan.
- [ ] Theo dõi từ khóa: `odoo là gì`, `cài đặt odoo 20`, `lập trình odoo`, `odoo docker`, `what is odoo`, `install odoo 20`.

---

## 9. Vấn đề còn mở

| Vấn đề | Ghi chú |
|---|---|
| Chưa commit | Toàn bộ thay đổi đang ở working tree. Chỉ commit/push khi được yêu cầu. Quy ước git ghi trong `.claude/CLAUDE.md` trỏ tới `docs/git-convention.md`, nhưng **file này chưa tồn tại**. |
| Logo Odoo trên trang chủ | `image/odoo.png` đang dùng làm icon khóa học → nên thay icon riêng để tránh hiểu nhầm là đối tác chính thức. |
| Số buổi khóa học trong FAQ | Bài 1 ghi ODO-F 8 buổi, DEV-F 5 buổi (theo `program-data.js`) → cần xác nhận với Vinc. |
| Nút Google Form ở `program-detail.html` | Đang trỏ link mẫu `forms.gle/YOUR_GOOGLE_FORM_ID` → chưa hoạt động. |
| Messenger | Bóng chat dùng `m.me/vinc.academy`; cần bật nhận tin nhắn trên Fanpage. |
| Thông tin pháp nhân | Dòng bản quyền chỉ ghi "Vinc Academy"; bổ sung tên pháp nhân/MST nếu có. |
