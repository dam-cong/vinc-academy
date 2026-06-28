# Vinc Academy — Landing Page

Landing page giới thiệu và đăng ký khóa học của **Vinc Academy**, xây dựng bằng HTML/CSS/JS thuần, không phụ thuộc framework.

## Trạng thái hiện tại

- Hoàn thiện giao diện đầy đủ các section
- Dark/Light mode hoạt động, lưu vào `localStorage`
- Responsive trên mobile, tablet, desktop
- Form đăng ký có validation + toast notification
- FAQ accordion hoạt động
- Scroll mượt qua các section

## Cấu trúc thư mục

```
vinc-academy/
├── index.html          # 519 dòng — File HTML chính
├── styles.css          # 1220 dòng — Toàn bộ style + dark/light theme
├── script.js           # 41 dòng  — JS (theme, FAQ, form, scroll)
├── README.md           # File này
└── image/
    ├── vinc-academy.png   # Logo
    ├── python.png         # Icon khóa Python
    ├── postgresql.jpg     # Icon khóa PostgreSQL
    ├── git.png            # Icon khóa Git + GitLab
    ├── odoo.png           # Icon khóa Odoo
    └── devops.jpg         # Icon khóa DevOps
```

## Cách chạy

Mở `index.html` trực tiếp trên trình duyệt:

```bash
start index.html   # Windows
open index.html    # macOS
xdg-open index.html  # Linux
```

## Tính năng

- **Dark / Light mode** — Toggle góc trên phải navbar, lưu vào `localStorage` (key: `va-theme`)
- **Responsive** — Breakpoints: 800px (tablet), 520px (mobile)
- **Scroll mượt** — Điều hướng qua các section bằng navbar
- **FAQ accordion** — Click để mở/đóng từng câu hỏi (chỉ mở 1 item cùng lúc)
- **Form đăng ký** — Toast notification khi submit, reset form
- **Shimmer animation** — Hiệu ứng gradient chạy trên register card

## Nội dung các section

| Section | Mô tả |
|---|---|
| Hero | Headline, CTA buttons, 3 stat cards (6 khóa, 100% thực hành, Job-ready) |
| Giới thiệu | Sứ mệnh, quote, thống kê (6 khóa, 100% thực hành, 24h hỗ trợ) |
| Khóa học | 6 course cards với tags và badges (featured, hot, new) |
| Lộ trình | Timeline 6 bước học theo thứ tự tối ưu |
| Tại sao chọn | 6 điểm mạnh (thực hành, giảng viên, hỗ trợ, lộ trình, chứng chỉ, cập nhật) |
| FAQ | 5 câu hỏi thường gặp (accordion) |
| Đăng ký | 3 bước đăng ký + payment info + combo 5.000.000 VND |

## Danh sách chương trình đào tạo

1. **Developer Foundation** (nền tảng) — 8–10 buổi · Python + SQL + Git
2. **Odoo Developer Foundation** (cốt lõi) — 5–6 buổi · Module, ORM, View, Security
3. **Odoo Business & Functional** — 3–4 buổi · CRM, Sales, Inventory, Accounting
4. **Odoo Advanced Developer** — 6–8 buổi · ORM nâng cao, OWL, API, Performance
5. **DevOps for Odoo** — 4–5 buổi · Linux, Docker, CI/CD, Deployment
6. **AI & Vibe Coding Odoo** — 4–5 buổi · Prompt Engineering, AI Code Gen

## Combo

| Combo | Nội dung | Giá |
|---|---|---|
| Bắt đầu | Developer Foundation + Odoo Developer Foundation | 6 triệu |
| Chuyên nghiệp | Bắt đầu + Odoo Advanced Developer | 10 triệu |
| Chuyên gia | Chuyên nghiệp + DevOps for Odoo | 14 triệu |
| AI Developer | Odoo Advanced Developer + AI & Vibe Coding | 8 triệu |
| Full Stack Odoo | Toàn bộ 6 chương trình | 16–18 triệu |

## Thông tin thanh toán

- Ngân hàng: **TECHCOMBANK**
- Số tài khoản: **0987654321**
- Chủ tài khoản: **DAM CONG HIEN**
- Zalo: **036 3729 276**

## Tuỳ chỉnh

### Thay màu chủ đạo
```css
--blue-500: #185FA5;   /* Màu chính */
--blue-700: #0C447C;   /* Màu hover */
```

## Công nghệ

- HTML5 / CSS3 / Vanilla JS
- Google Fonts: `Be Vietnam Pro`, `Space Mono`
- CSS Variables cho theming dark/light
- Không dùng framework hay thư viện ngoài

## Liên hệ

- Zalo: **036 3729 276**
