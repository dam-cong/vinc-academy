# Vinc Academy — Landing Page

Landing page giới thiệu và đăng ký khóa học của **Vinc Academy**, xây dựng bằng HTML/CSS/JS thuần, không phụ thuộc framework hay thư viện ngoài (chỉ dùng Google Fonts).

## Kiến trúc

### Công nghệ

| Thành phần | Công nghệ |
|---|---|
| HTML | HTML5 semantic |
| CSS | CSS3 (Variables, Grid, Flexbox, Animation, Media Queries) |
| JS | Vanilla JavaScript |
| Font | Google Fonts: `Be Vietnam Pro` (UI), `Space Mono` (monospace) |
| Icons | Inline SVG (sun/moon cho theme toggle) |
| Theme | CSS Variables, `data-theme` attribute trên `<html>`, lưu vào `localStorage` |

### Cấu trúc thư mục

```
vinc-academy/
├── index.html        # ~519 dòng — File HTML chính (tất cả nội dung trong 1 file)
├── styles.css        # ~1220 dòng — Toàn bộ style + dark/light theme
├── script.js         # 41 dòng   — JS (theme, FAQ, form, scroll)
├── README.md         # Hướng dẫn nhanh
├── docs/
│   └── vinc-academy.md   # File này
└── image/
    ├── vinc-academy.png  # Logo
    ├── python.png        # Icon khóa Python
    ├── postgresql.jpg    # Icon khóa PostgreSQL
    ├── git.png           # Icon khóa Git + GitLab
    ├── odoo.png          # Icon khóa Odoo
    └── devops.jpg        # Icon khóa DevOps
```

## Sections

| Section | ID | Mô tả |
|---|---|---|
| Hero | — | Headline, CTA buttons, 3 stat cards (6 chương trình, 100% thực hành, Job-ready) |
| Giới thiệu | `#about` | Sứ mệnh, quote, thống kê (6 chương trình, 100% thực hành, 4 cấp độ) |
| Chương trình | `#programs` | 6 product cards (3 featured, 3 collapsible) |
| Bảng giá | `#pricing` | Bảng so sánh 5 combo |
| Lộ trình | `#roadmap` | 4 cấp độ học (Nền tảng → Phát triển → Vận hành → AI Developer) |
| Tại sao chọn | `#why` | 6 điểm mạnh (grid 3 cột) |
| FAQ | `#faq` | 5 câu hỏi thường gặp (accordion) |
| Đăng ký | `#register` | 3 bước đăng ký + payment info + combo |
| Footer | — | Logo + © 2025 |

## Danh sách chương trình đào tạo

| # | Tên | Đối tượng | Thời lượng | Dự án |
|---|---|---|---|---|
| 01 | Developer Foundation (nền tảng) | Người mới, trái ngành | 8–10 buổi | Customer Management |
| 02 | Odoo Developer Foundation (cốt lõi) | Đã có nền tảng lập trình | 5–6 buổi | Student Management |
| 03 | Odoo Business & Functional | Developer, BA, Consultant | 3–4 buổi | Phân tích nghiệp vụ |
| 04 | Odoo Advanced Developer | Đã biết Odoo | 6–8 buổi | HR / CRM |
| 05 | DevOps for Odoo | Odoo Developer | 4–5 buổi | Deploy Production |
| 06 | AI & Vibe Coding Odoo | Đã biết Odoo | 4–5 buổi | Module với AI |

## Theme System

- Sử dụng `data-theme` attribute trên `<html>` element
- `light` (mặc định) và `dark` mode
- CSS Variables định nghĩa trong `:root` (light) và `html[data-theme="dark"]` (dark)
- Trạng thái lưu vào `localStorage` với key `va-theme`
- Transition `background-color 0.3s ease, color 0.3s ease` trên `body`

## JavaScript (`script.js`)

Chỉ 41 dòng, 4 chức năng:

| Function | Mô tả |
|---|---|
| `toggleTheme()` | Chuyển dark/light mode, lưu localStorage |
| `toggleFaq(el)` | Accordion FAQ (chỉ mở 1 item cùng lúc) |
| `handleRegister()` | Validate form + toast notification |
| Scroll handler | `querySelectorAll('a[href^="#"]')` — smooth scroll cho tất cả link neo |

## Responsive Breakpoints

| Breakpoint | Target | Thay đổi |
|---|---|---|
| max-width: 800px | Tablet | Nav links ẩn, courses grid → 2 cột, hero → 1 cột, stats → row |
| max-width: 700px | Tablet nhỏ | Why grid → 2 cột, about grid → 1 cột, register steps → 1 cột |
| max-width: 520px | Mobile | Courses grid → 1 cột, hero h1 → 32px |

## Tùy chỉnh

### Màu chủ đạo

```css
--blue-500: #185FA5;   /* Primary */
--blue-700: #0C447C;   /* Primary hover */
--blue-900: #042C53;   /* Darkest */
```

### Thêm chương trình đào tạo mới

1. Thêm icon vào thư mục `image/`
2. Copy một `.course-card` block trong `index.html` (section `#programs`)
3. Cập nhật title, target, duration, curriculum, price, badge
4. Nếu muốn ẩn mặc định, thêm vào nhóm `program-hidden`

## Cách chạy

Mở trực tiếp `index.html` trên trình duyệt (không cần server):

```bash
start index.html   # Windows
open index.html    # macOS
xdg-open index.html  # Linux
```

Hoặc dùng Live Server nếu muốn hot-reload.

## Thông tin liên hệ / Thanh toán

- Ngân hàng: **TECHCOMBANK**
- Số tài khoản: **0987654321**
- Chủ tài khoản: **DAM CONG HIEN**
- Zalo: **036 3729 276**
- Combo Bắt đầu (Developer Foundation + Odoo Developer Foundation): **6.000.000 VND**
- Combo Chuyên nghiệp (Bắt đầu + Odoo Advanced Developer): **10.000.000 VND**
- Combo Chuyên gia (Chuyên nghiệp + DevOps for Odoo): **14.000.000 VND**
- Combo AI Developer (Odoo Advanced Developer + AI & Vibe Coding): **8.000.000 VND**
- Combo Full Stack Odoo (Toàn bộ 6 chương trình): **16.000.000–18.000.000 VND**
