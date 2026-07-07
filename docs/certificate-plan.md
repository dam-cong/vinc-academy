# Kế Hoạch Tích Hợp Certificate Portal

## Tổng Quan

Tích hợp tính năng **tra cứu và xác minh chứng chỉ** trực tiếp vào trang chủ `vinc-academy/index.html` dưới dạng một section `#verify` (không còn trang portal riêng). Trang xem chứng chỉ A4 (`certificate/certificate.html`) vẫn giữ nguyên làm nơi hiển thị kết quả.

Thiết kế:
- **Style**: Navy (#0E2247) + Gold (#D4AF37) của portal gốc, được scope trong lớp `.cert-verify` để không ảnh hưởng trang chủ.
- **Đa ngôn ngữ**: hỗ trợ VI/EN theo toggle hiện tại.
- **Logo**: dùng chung `image/vinc-academy.png`.

## Cấu Trúc Thư Mục Hiện Tại

```
vinc-academy/
├── index.html              # Trang chủ — chứa section #verify tra cứu
├── styles.css
├── script.js               # i18n verify.* + logic tìm kiếm
├── cert-verify.css         # Style scope cho section #verify
├── image/
│   └── vinc-academy.png    # Logo dùng chung
└── certificate/            # Chỉ còn trang xem chứng chỉ
    ├── certificate.html    # Trang hiển thị chứng chỉ A4 (viewer)
    ├── css/
    │   ├── main.css         # Styles chung portal (dùng bởi certificate.html)
    │   └── certificate.css  # Styles trang chứng chỉ + print + watermark
    └── js/
        ├── data.js          # Mock DB chứng chỉ (single source)
        └── cert-renderer.js  # Render chứng chỉ + share/print
```

> Đã xoá: `certificate/index.html` (portal tra cứu cũ) và `certificate/js/app.js` (logic portal cũ).

## User Flow

```
1. User vào trang chủ → click nav "Tra Cứu Chứng Chỉ" (scroll đến #verify)
2. Nhập mã chứng chỉ (VD: VINC-2026-PY01) → bấm "Tra cứu"
3. Validate client-side qua data.js → redirect (relative) certificate/certificate.html?id=xxx
4. Xem chứng chỉ A4 → In PDF / Chia sẻ link
5. Link chia sẻ: certificate.html?id=xxx (cùng thư mục)
6. Dòng "Xác nhận tại" trên chứng chỉ → ../#verify (về trang chủ)
```

## Chi Tiết Thay Đổi

### 1. index.html
- **Head**: thêm FontAwesome CDN (icon `fa-magnifying-glass`) + `<link rel="stylesheet" href="cert-verify.css">`
- **Nav**: `<a href="#verify" data-i18n="nav.certificate">Tra Cứu Chứng Chỉ</a>`
- **Section `#verify`** (sau FAQ, trước Register):
  - Wrapper `.cert-verify > .hero-section > .hero-content`
  - Các phần tử có `data-i18n` / `data-i18n-html` / `data-i18n-placeholder`:
    - `verify.subtitle`, `verify.title`, `verify.desc`
    - `verify.placeholder` (set vào thuộc tính `placeholder` của input)
    - `verify.btn`, `verify.sampleLabel`
  - Form `#search-form`, input `#search-input`, `#feedback-msg`, `.sample-code-badge` (data-code)
- **Cuối body**: `<script src="certificate/js/data.js"></script>` (trước `script.js`) để `window.certificatesDatabase` có sẵn.

### 2. cert-verify.css (mới)
- Toàn bộ style portal (`.hero-section`, `.search-container`, `.search-input`, `.search-btn`, `.feedback-msg`, animations...) được **scope dưới `.cert-verify`**.
- Định nghĩa biến portal cục bộ trong `.cert-verify { --primary, --gold, ... }` để không đụng biến của trang chủ.
- Font của section dùng Be Vietnam Pro (font trang chủ) để nhất quán, không load thêm font.

### 3. script.js
- Thêm i18n VI + EN: `verify.subtitle / title / desc / placeholder / btn / sampleLabel` + feedback `verify.found / invalid / empty / sampleSelected`.
- `applyLang()` mở rộng xử lý `data-i18n-placeholder` (set `placeholder`).
- Hàm `initCertificateSearch()` (gọi trong `DOMContentLoaded`):
  - Submit `#search-form` → uppercase + trim → validate qua `window.certificatesDatabase` → feedback i18n → redirect.
  - Click `.sample-code-badge` → điền input + feedback.
  - Redirect dùng **relative path**: `certificate/certificate.html?id=${certId}`.

### 4. certificate/certificate.html
- Tất cả `EDI - Academy.png` → `../image/vinc-academy.png` (ribbon logo, header logo, favicon).
- Back button `href="index.html"` → `href="../index.html"`.

### 5. certificate/css/certificate.css
- Watermark (line 174): `url('../../image/vinc-academy.png')` (từ `certificate/css/` lên 2 cấp).

### 6. certificate/js/cert-renderer.js
- `verifyUrl` (line 52): `../#verify` (link "Xác nhận tại" về trang chủ).
- `shareUrl` (line 116): `certificate.html?id=${certId}` (share chính trang chứng chỉ).

## Quy Tắc Đường Dẫn (Quan Trọng)

Dự án có thể mở trực tiếp bằng `file:///` hoặc deploy ở subfolder. **Không dùng absolute path có dấu `/` đầu** (sẽ trỏ sai về drive root hoặc domain root). Luôn dùng **relative path**:

| Ngữ cảnh | Sai ❌ | Đúng ✓ |
|---|---|---|
| Redirect từ trang chủ | `/certificate/certificate.html?id=ID` | `certificate/certificate.html?id=ID` |
| Verify link từ trang chứng chỉ | `/#verify` hoặc `origin/#verify` | `../#verify` |
| Share link | `/certificate/certificate.html?id=ID` | `certificate.html?id=ID` |

Relative path hoạt động đúng trên cả `file:///`, web server (root) và subfolder.

## Checklist

- [x] Copy `certificate-vinc` → `vinc-academy/certificate/`, xoá ảnh/poster không dùng
- [x] `index.html`: + FontAwesome CDN, + cert-verify.css, + section #verify, nav → #verify, + data.js script
- [x] `cert-verify.css`: style scoped `.cert-verify`
- [x] `script.js`: i18n verify.* + `initCertificateSearch()` + xử lý placeholder
- [x] `certificate/certificate.html` + `css/certificate.css`: logo + watermark paths
- [x] `cert-renderer.js`: verifyUrl `../#verify`, shareUrl relative
- [x] Xoá `certificate/index.html` + `certificate/js/app.js`
- [x] Đường dẫn redirect/share/verify都用 relative
- [x] Test local: tìm `VINC-2026-PY01` → redirect đúng, EN toggle, sample badge, empty/invalid

## Lưu Ý Cho Dev

- **Data layer**: `data.js` là mock DB hardcoded. Production cần thay bằng API call hoặc static JSON (giữ làm single source, load trên cả trang chủ và certificate.html).
- **Logo**: chỉ dùng `image/vinc-academy.png`.
- **Thêm chứng chỉ**: sửa object `certificatesDatabase` trong `certificate/js/data.js`.
- **Style conflict**: mọi style mới cho section tra cứu phải nằm trong `.cert-verify` ở `cert-verify.css`.
