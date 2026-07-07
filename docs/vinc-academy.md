# Vinc Academy — Landing Page

Landing page giới thiệu và đăng ký khóa học của **Vinc Academy**, xây dựng bằng HTML/CSS/JS thuần, không phụ thuộc framework hay thư viện ngoài (chỉ dùng Google Fonts + Font Awesome).

## Kiến trúc

### Công nghệ

| Thành phần | Công nghệ |
|---|---|
| HTML | HTML5 semantic |
| CSS | CSS3 (Variables, Grid, Flexbox, Animation, Media Queries) |
| JS | Vanilla JavaScript |
| Font | Google Fonts: `Be Vietnam Pro` (UI), `Space Mono` (monospace) |
| Icons | Font Awesome 6.4 + Inline SVG (sun/moon cho theme toggle) |
| Theme | CSS Variables, `data-theme` attribute trên `<html>`, lưu vào `localStorage` |

### Cấu trúc thư mục

```
vinc-academy/
├── index.html        # HTML chính (tất cả nội dung trong 1 file)
├── styles.css        # Toàn bộ style + dark/light theme + responsive
├── script.js         # JS (theme, FAQ, form, modal, i18n, nav, cert-verify, …)
├── cert-verify.css   # Style riêng cho trang Tra cứu chứng chỉ
├── README.md         # Hướng dẫn nhanh
├── docs/
│   └── vinc-academy.md   # File này
├── certificate/
│   ├── index.html
│   ├── css/main.css
│   └── js/script.js
└── image/
    ├── vinc-academy.png
    ├── python.png
    ├── postgresql.jpg
    ├── git.png
    ├── odoo.png
    └── devops.jpg
```

## Sections

| Section | ID | Mô tả |
|---|---|---|
| Hero | — | Headline, CTA buttons (2 nút đồng kích thước), 3 stat cards (grid 2 cột, card 3 full-width) |
| Giới thiệu | `#about` | Sứ mệnh, quote, thống kê (6 chương trình, 100% thực hành, 4 cấp độ) |
| Chương trình | `#programs` | 6 product cards (3 featured, 3 collapsible) |
| Bảng giá | `#pricing` | 5 combo cards (không giá), promo banner "Giảm 10%", 2 CTA (Zalo + Google Form) |
| Lộ trình | `#roadmap` | 4 cấp độ học (Nền tảng → Phát triển → Vận hành → AI Developer) |
| Tại sao chọn | `#why` | 6 điểm mạnh (grid 3 → 2 → 1 cột) |
| FAQ | `#faq` | 5 câu hỏi thường gặp (accordion) |
| Đăng ký | `#register` | 3 bước + suggest box combo + 2 CTA (Zalo + Google Form) |
| Footer | — | Logo + © 2026 |

## Luồng đăng ký

1. User chọn combo ở **Bảng giá** hoặc **Đăng ký** → click Zalo hoặc Google Form
2. Zalo: mở app Zalo chat với sales
3. Google Form: mở modal iframe gửi thông tin → sales liên hệ báo giá

## Hình thức liên hệ

- **Zalo**: `036 3729 276` — link `https://zalo.me/0363729276`
- **Google Form**: `https://docs.google.com/forms/d/e/1FAIpQLSeNLgxU8-80JzApGiC2K6nlDfb5tJ3PzWTZ9FGjySgxYBb-2A/viewform?usp=header`
- Mở form bằng JS `openFormModal()`, đóng bằng `closeFormModal()` hoặc phím Escape

## Form Modal

- Overlay + iframe Google Form
- Kích thước: `max-width: 800px`, height `800px` desktop / `650px` mobile (≤600px)
- Nút close `44×44px` (chuẩn tap target WCAG)
- `body.style.overflow = 'hidden'` khi mở

## Danh sách chương trình đào tạo

| # | Tên | Đối tượng | Thời lượng | Dự án |
|---|---|---|---|---|
| 01 | Developer Foundation (nền tảng) | Người mới, trái ngành | 8–10 buổi | Customer Management |
| 02 | Odoo Developer Foundation (cốt lõi) | Đã có nền tảng lập trình | 5–6 buổi | Student Management |
| 03 | Odoo Business & Functional | Developer, BA, Consultant | 3–4 buổi | Phân tích nghiệp vụ |
| 04 | Odoo Advanced Developer | Đã biết Odoo | 6–8 buổi | HR / CRM |
| 05 | DevOps for Odoo | Odoo Developer | 4–5 buổi | Deploy Production |
| 06 | AI & Vibe Coding Odoo | Đã biết Odoo | 4–5 buổi | Module với AI |

## Combo (Bảng giá — không hiển thị giá)

| Combo | Gồm |
|---|---|
| Bắt đầu | Developer Foundation + Odoo Developer Foundation |
| Chuyên nghiệp | Bắt đầu + Odoo Advanced Developer |
| Chuyên gia | Chuyên nghiệp + DevOps for Odoo |
| AI Developer | Odoo Advanced Developer + AI & Vibe Coding |
| Full Stack Odoo | Toàn bộ 6 chương trình |

## Theme System

- `data-theme` attribute trên `<html>`
- `light` (mặc định) và `dark` mode
- CSS Variables trong `:root` (light) và `html[data-theme="dark"]` (dark)
- Lưu vào `localStorage` key `va-theme`
- Transition `0.3s ease` trên `body`

## JavaScript (`script.js`)

| Function | Mô tả |
|---|---|
| `toggleTheme()` | Chuyển dark/light, lưu localStorage |
| `toggleLang()` | Chuyển ngôn ngữ VI/EN, lưu `va-lang` |
| `toggleFaq(el)` | Accordion FAQ (chỉ mở 1 item cùng lúc) |
| `handleRegister()` | Validate form + toast (chưa dùng, form hiện dùng Zalo/Google) |
| `openFormModal()` / `closeFormModal()` | Mở/đóng modal Google Form |
| `initMobileNav()` | Hamburger toggle, đóng khi click link hoặc resize >800px |
| `initAboutBadge()` | Click badge hiện text "Đang tuyển sinh 2026" trên mobile |
| `initCertificateSearch()` | Tra cứu chứng chỉ (filter + badge mẫu) |
| Scroll handler | Smooth scroll cho tất cả `a[href^="#"]` |
| i18n | Object `translations` chứa VI/EN, `applyLang()` render |

## Responsive Breakpoints

| Breakpoint | Target | Thay đổi |
|---|---|---|
| max-width: 1100px | Desktop nhỏ | Nav padding, gap, font-size giảm |
| max-width: 900px | Tablet lớn | Nav link font 11.5px, btn-nav padding nhỏ |
| max-width: 800px | Tablet | Nav hamburger, hero → 1 cột, stats → grid 2 cột, courses → 2 cột |
| max-width: 700px | Tablet nhỏ | Why 2 cột, about 1 cột + badge giữa + stats 2 cột, steps 1 cột, pricing table → card |
| max-width: 600px | Mobile lớn | Modal padding 12px, iframe 650px, pricing CTA → column |
| max-width: 520px | Mobile | Courses 1 cột, why 1 cột, about stats 1 cột, hero h1 32px, btn-nav nhỏ, nav-logo-text ẩn |
| max-width: 500px | Mobile nhỏ | Pricing combos 1 cột |

### Lưu ý responsive

- `.why-grid`: 3 cột → 2 cột (700px) → 1 cột (520px)
- `.about-stats-row`: 3 cột → 2 cột (700px) → 1 cột (520px)
- `.about-float-badge`: căn giữa tại 700px, ẩn text tại 520px (tap để hiện)
- `.hero-stats`: grid 2 cột cố định, card thứ 3 full-width
- `.btn-nav` + `.nav-logo-text`: `white-space: nowrap` chống xuống dòng
- Nút close modal: `44×44px` đạt chuẩn WCAG tap target

## Tùy chỉnh

### Màu chủ đạo

```css
--blue-500: #185FA5;   /* Primary */
--blue-700: #0C447C;   /* Primary hover */
--blue-900: #042C53;   /* Darkest */
```

### Thêm chương trình đào tạo mới

1. Thêm icon vào `image/`
2. Copy `.course-card` trong `index.html` (section `#programs`)
3. Cập nhật title, target, duration, curriculum, badge
4. Muốn ẩn mặc định → thêm vào `program-hidden`

### Thêm i18n key

1. Thêm vào object `translations` trong `script.js` (cả VI và EN)
2. Dùng `data-i18n` hoặc `data-i18n-html` trong HTML
3. `applyLang()` tự động render

## Cách chạy

Mở trực tiếp `index.html` trên trình duyệt (không cần server):

```bash
start index.html   # Windows
```

Hoặc dùng Live Server nếu muốn hot-reload.
