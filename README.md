# Vinc Academy — Landing Page

Landing page giới thiệu và đăng ký khóa học của **Vinc Academy**, xây dựng bằng HTML/CSS/JS thuần, không phụ thuộc framework.

---

## 📁 Cấu trúc thư mục

```
project/
├── vinc-academy.html       
├── styles.css      
├── script.js       
├── README.md               
└── image/
    └── vinc-academy.png    
    └── odoo.png
    └── python.png   
```

---

## 🚀 Cách chạy

Chỉ cần mở file trực tiếp trên trình duyệt:

```bash
# Mở bằng trình duyệt mặc định
start vinc-academy.html        # Windows
open vinc-academy.html         # macOS
xdg-open vinc-academy.html     # Linux
```

Hoặc kéo thả file `vinc-academy.html` vào trình duyệt bất kỳ.

---

## ✨ Tính năng

- **Dark / Light mode** — Toggle góc trên phải navbar, lưu lựa chọn vào `localStorage`
- **Responsive** — Tương thích mobile, tablet, desktop
- **Scroll mượt** — Điều hướng qua các section bằng navbar
- **FAQ accordion** — Click để mở/đóng từng câu hỏi
- **Form đăng ký** — Toast notification khi submit thành công
- **Shimmer animation** — Hiệu ứng trên register card

---

## 📚 Nội dung các section

| Section | Mô tả |
|---|---|
| Hero | Headline, CTA, stat cards |
| Giới thiệu | Sứ mệnh, quote, thống kê Vinc Academy |
| Khóa học | 6 course cards với tags và badges |
| Lộ trình | Timeline học tập theo thứ tự tối ưu |
| Tại sao chọn | 6 điểm mạnh của Academy |
| FAQ | 5 câu hỏi thường gặp |
| Đăng ký | 3 bước đăng ký + form + thông tin thanh toán |

---

## 🎓 Danh sách khóa học

1. **Python** — Cơ bản → Nâng cao
2. **PostgreSQL** — Thiết kế DB, SQL nâng cao
3. **Git + GitLab** — Version control, CI/CD
4. **Odoo Cơ Bản** — ERP, CRM, kế toán
5. **Odoo Nâng Cao** — Custom module, ORM, API
6. **DevOps Cơ Bản** — Docker, Linux, Nginx, Deploy

**Combo toàn bộ:** 5.000.000 VND

---

## 🎨 Tuỳ chỉnh

### Thay thông tin thanh toán
Tìm đoạn `payment-info` trong file HTML và cập nhật:
- Tên ngân hàng
- Số tài khoản
- Chủ tài khoản
- Số Zalo

### Thay màu chủ đạo
Tìm trong `:root` và đổi giá trị:
```css
--blue-500: #185FA5;   /* Màu chính */
--blue-700: #0C447C;   /* Màu hover */
```

---

## 🛠 Công nghệ

- HTML5 / CSS3 / Vanilla JS
- Google Fonts: `Be Vietnam Pro`, `Space Mono`
- CSS Variables cho theming dark/light
- Không dùng framework hay thư viện ngoài

---

## 📞 Liên hệ

- Zalo: **036 3729 276**