# Kế Hoạch Tích Hợp Certificate Portal

## Tổng Quan

Tích hợp tính năng **tra cứu và xác minh chứng chỉ** trực tiếp vào trang chủ `vinc-academy/index.html` dưới dạng một section `#verify` (không còn trang portal riêng).

Khi user nhập mã chứng chỉ hợp lệ, hệ thống sẽ **hiện popup** hiển thị liên kết chứng chỉ trên hệ thống `vinc.editech.vn` thay vì redirect trực tiếp.

Thiết kế:
- **Style**: Navy (#0E2247) + Gold (#D4AF37) của portal gốc, được scope trong lớp `.cert-verify` để không ảnh hưởng trang chủ.
- **Đa ngôn ngữ**: hỗ trợ VI/EN theo toggle hiện tại.
- **Logo**: dùng chung `image/vinc-academy.png`.
- **Medal icon**: dùng `image/medal.png` trong popup mã chứng chỉ.

## Cấu Trúc Thư Mục Hiện Tại

```
vinc-academy/
├── index.html              # Trang chủ — chứa section #verify tra cứu
├── styles.css
├── script.js               # i18n verify.* + logic tìm kiếm + popup
├── cert-verify.css         # Style scope cho section #verify + popup
├── image/
│   ├── vinc-academy.png    # Logo dùng chung (popup + certificate)
│   └── medal.png           # Icon medal trong popup mã chứng chỉ
└── certificate/            # Trang xem chứng chỉ A4 (backward compat)
    ├── certificate.html    # Trang hiển thị chứng chỉ A4 (viewer)
    ├── css/
    │   ├── main.css         # Styles chung portal (dùng bởi certificate.html)
    │   └── certificate.css  # Styles trang chứng chỉ + print + watermark
    └── js/
        ├── data.js          # Mock DB chứng chỉ (backward compat, không dùng cho search mới)
        └── cert-renderer.js  # Render chứng chỉ + share/print (backward compat)
```

> Đã xoá: `certificate/index.html` (portal tra cứu cũ) và `certificate/js/app.js` (logic portal cũ).

## User Flow

```
1. User vào trang chủ → click nav "Tra Cứu Chứng Chỉ" (scroll đến #verify)
2. Nhập mã chứng chỉ (VD: HV20260004-C0002) → bấm "Tra cứu"
3. Validate regex format: /^HV\d{8}-C\d{4}$/
   - Nếu sai format → hiện lỗi "Mã chứng chỉ không đúng định dạng"
   - Nếu đúng format → fetch HEAD https://vinc.editech.vn/vinc/certificate/{id}
4. Hiện popup kết quả:
   - Logo Vinc Academy
   - Medal icon + mã chứng chỉ
   - Liên kết chứng chỉ
   - Nút "Sao chép liên kết" + Nút "Xem chứng chỉ" (mở link mới)
5. Click "Xem chứng chỉ" → mở https://vinc.editech.vn/vinc/certificate/{id} trong tab mới
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
  - Sample codes: `HV20260004-C0002`, `HV20260005-C0003`

### 2. cert-verify.css
- Toàn bộ style portal (`.hero-section`, `.search-container`, `.search-input`, `.search-btn`, `.feedback-msg`, animations...) được **scope dưới `.cert-verify`**.
- Định nghĩa biến portal cục bộ trong `.cert-verify { --primary, --gold, ... }` để không đụng biến của trang chủ.
- Font của section dùng Be Vietnam Pro (font trang chủ) để nhất quán, không load thêm font.
- **Popup `.cert-result-popup`**: overlay backdrop blur, card popup animation, logo Vinc Academy, medal icon, link + nút copy/open, responsive mobile.

### 3. script.js

#### Hằng số mới
```javascript
const CERT_BASE_URL = 'https://vinc.editech.vn/vinc/certificate/';
const CERT_REGEX = /^HV\d{8}-C\d{4}$/;
```

#### i18n mới (VI + EN)
- `verify.invalidFormat` — lỗi format mã chứng chỉ
- `verify.domainError` — lỗi không xác minh được domain
- `verify.openCert` — nút "Xem chứng chỉ"
- `verify.copyLink` — nút "Sao chép liên kết"
- `verify.copied` — thông báo đã sao chép
- `verify.validCert` — tiêu đề popup "Chứng chỉ hợp lệ"
- `verify.certLink` — label "Liên kết chứng chỉ:"

#### Hàm `initCertificateSearch()`
- Submit `#search-form` → uppercase + trim → **validate regex** `CERT_REGEX`
  - Nếu sai format → feedback lỗi `verify.invalidFormat`
  - Nếu đúng format →构造 URL `CERT_BASE_URL + certId` → fetch HEAD `no-cors` → hiện popup
- Click `.sample-code-badge` → điền input + feedback.
- **Không dùng `window.certificatesDatabase`** cho tìm kiếm.

#### Hàm mới
- `showCertPopup(certId, certUrl)` — tạo + hiển thị popup DOM động
- `closeCertPopup()` — đóng popup với animation
- `copyCertLink(url)` — sao chép link vào clipboard, hiện feedback "Đã sao chép"

### 4. certificate/ (backward compatibility)
- `certificate/certificate.html` + `css/certificate.css` + `js/cert-renderer.js` + `js/data.js` giữ nguyên, không thay đổi.
- Không còn được sử dụng cho luồng search mới.

## Popup Certificate Result

```
┌──────────────────────────────────┐
│  [✕]                             │
│        (Logo Vinc Academy)       │
│      Chứng chỉ hợp lệ            │
│    🏅 HV20260004-C0002           │
│  Liên kết chứng chỉ:             │
│  vinc.editech.vn/vinc/cert...    │
│                                  │
│  [📋 Sao chép] [🔗 Xem chứng chỉ]│
└──────────────────────────────────┘
```

## Quy Tắc Đường Dẫn

Dự án có thể mở trực tiếp bằng `file:///` hoặc deploy ở subfolder. **Không dùng absolute path có dấu `/` đầu**. Luôn dùng **relative path**:

| Ngữ cảnh | Sai ❌ | Đúng ✓ |
|---|---|---|
| Popup link chứng chỉ | — | `https://vinc.editech.vn/vinc/certificate/{id}` |
| Logo image trong popup | `/image/vinc-academy.png` | `image/vinc-academy.png` |

## CORS

Server `vinc.editech.vn` **không gửi CORS headers**. Fetch từ origin khác sẽ bị chặn nếu dùng `mode: 'cors'`. Giải pháp hiện tại:
- Dùng `mode: 'no-cors'` — fetch không bị chặn nhưng trả opaque response (không check được status).
- Regex validate format đảm bảo mã đúng cấu trúc trước khi hiện popup.
- Xác minh thực tế xảy ra khi user click "Xem chứng chỉ" mở link.

## Checklist

- [x] `index.html`: + FontAwesome CDN, + cert-verify.css, + section #verify, nav → #verify, sample codes HV format
- [x] `cert-verify.css`: style scoped `.cert-verify` + popup `.cert-result-popup` + responsive
- [x] `script.js`: regex validate + fetch no-cors + showCertPopup + copyCertLink + i18n mới
- [x] Popup: logo Vinc Academy + medal icon + mã chứng chỉ + link + nút copy/open
- [x] Sample codes: `HV20260004-C0002`, `HV20260005-C0003`
- [x] Certificate viewer cũ giữ nguyên (backward compat)

## Lưu Ý Cho Dev

- **Format mã chứng chỉ**: `HV` + 8 chữ số + `-C` + 4 chữ số (VD: `HV20260004-C0002`).
- **Base URL**: `https://vinc.editech.vn/vinc/certificate/` — định nghĩa ở `script.js` dòng đầu.
- **CORS**: Không thể fetch check HTTP status từ frontend do server không có CORS headers. Dùng `no-cors` + regex validate.
- **Certificate viewer cũ**: `certificate/` folder giữ nguyên, có thể tái sử dụng nếu cần.
- **Style conflict**: mọi style mới cho section tra cứu phải nằm trong `.cert-verify` ở `cert-verify.css`.
