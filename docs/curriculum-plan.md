# Vinc Academy — Kế hoạch chi tiết 6 chương trình đào tạo

> **Phiên bản:** 1.1 — Cập nhật ngày 08/07/2026
>
> **Mục đích:** Tài liệu spec cho dev cập nhật nội dung landing page và documentation.
>
> **Thay đổi 1.1:** Bổ sung kiến trúc trang chi tiết (`program-detail.html` + `program-data.js`), nâng cấp nút "Xem chi tiết", CTA Zalo/Google Form, banner ưu đãi, sessions mở sẵn.

---

## Tổng quan

| Level | Mã | Chương trình | Số buổi | Vai trò đầu ra |
|-------|----|-------------|---------|----------------|
| L1 | DEV-F | Developer Foundation | 5 | Python Developer Foundation |
| L2 | ODO-F | Odoo Developer Foundation | 8 | Junior Odoo Developer |
| L3 | AI-O | AI & Vibe Coding Odoo | 5 | AI-Enhanced Odoo Developer |
| L4 | ODO-B | Odoo Business & Functional | 8 | BA / Functional Consultant |
| L5 | ODO-A | Odoo Advanced Developer | 8 | Senior Odoo Developer |
| L6 | ODO-D | DevOps for Odoo | 5 | DevOps Engineer / Technical Consultant |
| | **Tổng** | | **39** | |

### Learning Path

```text
Level 1 — Developer Foundation (5 buổi)
  Python · PostgreSQL · Git · Mini Project
        │
        ▼
Level 2 — Odoo Developer Foundation (8 buổi)
  MVC · ORM · Views · Security · Report · Website · Training Management System
        │
        ├────────────────────────────────────┐
        ▼                                    ▼
Level 3 — AI & Vibe Coding (5 buổi)    Level 4 — Business & Functional (8 buổi)
  Prompt Engineering · AI Coding ·       ERP Process · BA · BRD · Solution Design
  AI Review · AI Project
        │                                    │
        ▼                                    ▼
Level 5 — Advanced Developer (8 buổi)   Level 6 — DevOps for Odoo (5 buổi)
  Advanced ORM · API · OWL · Testing     Linux · Docker · Nginx · CI/CD
```

---

## L1 — Developer Foundation (5 buổi)

> **Mã:** DEV-F
> **Đối tượng:** Người mới · Sinh viên CNTT · Chuyển ngành
> **Mục tiêu:** Trang bị nền tảng lập trình để học Odoo
> **Đầu ra:** ✅ Python cơ bản ✅ SQL ✅ Git ✅ Mini Project

### Buổi 1 — Định hướng & Môi trường phát triển

**Nội dung:**
- Giới thiệu nghề Developer
- Quy trình phát triển phần mềm
- Cài đặt Python
- Cài đặt PyCharm
- Git & GitHub
- Virtual Environment
- Chạy chương trình Python đầu tiên

**Bài thực hành:** Hoàn thiện môi trường phát triển

---

### Buổi 2 — Python Fundamentals

**Nội dung:**
- Biến, Kiểu dữ liệu
- Toán tử
- Điều kiện (if/elif/else)
- Vòng lặp (for, while)
- List, Tuple, Dictionary, Set

**Bài thực hành:** Quản lý danh sách học viên

---

### Buổi 3 — Function & OOP

**Nội dung:**
- Function, Module, Package
- Class, Object
- Inheritance
- Exception

**Bài thực hành:** Student, Teacher, Course

---

### Buổi 4 — PostgreSQL & Git

**Nội dung:**
- Database, Table
- SQL cơ bản (CRUD)
- JOIN
- Git Workflow, Branch, Merge

**Bài thực hành:**
- Thiết kế database quản lý học viên
- Làm việc nhóm với Git

---

### Buổi 5 — Mini Project

**Dự án:** Customer Management

**Công nghệ:** Python + OOP + PostgreSQL + Git

---

## L2 — Odoo Developer Foundation (8 buổi)

> **Mã:** ODO-F
> **Đối tượng:** Đã có nền tảng lập trình
> **Mục tiêu:** Tự phát triển và customize module Odoo
> **Đầu ra:** ✅ Hiểu kiến trúc Odoo ✅ Module chuẩn ✅ Security ✅ Report PDF ✅ Website ✅ Portfolio: Training Management System

**Dự án xuyên suốt:** Training Management System (Vinc Academy)

### Buổi 1 — Kiến trúc Odoo

**Nội dung:**
- Odoo Framework
- MVC Pattern
- ORM
- Module Structure
- Addons Path
- Manifest
- Cài đặt Source Code

**Project:** Hello Module

---

### Buổi 2 — ORM & Models

**Nội dung:**
- Models
- Fields (Char, Text, Integer, Float, Boolean, Date, Datetime, Selection)
- Sequence
- Chatter
- Mail Thread

**Project:** Student Management

---

### Buổi 3 — Quan hệ dữ liệu

**Nội dung:**
- Many2one
- One2many
- Many2many
- Related Fields
- Compute Fields
- Onchange

**Project:** Student, Course, Teacher

---

### Buổi 4 — Views

**Nội dung:**
- Tree View
- Form View
- Search View
- Kanban View
- Notebook
- Smart Button

**Project:** Quản lý khóa học

---

### Buổi 5 — Business Logic

**Nội dung:**
- Constraint (Python)
- SQL Constraint
- Action (ir.actions)
- Menu
- Wizard
- Server Action

**Project:** Enrollment

---

### Buổi 6 — Security & Report

**Nội dung:**
- Groups
- ACL (Access Control List)
- Record Rule
- QWeb PDF Report
- Email Template

**Project:** Certificate

---

### Buổi 7 — Controller & Website

**Nội dung:**
- Controller
- Website
- Portal
- HTTP Route
- JSON API

**Project:** Website khóa học

---

### Buổi 8 — Final Project

**Dự án:** Training Management System

**Bao gồm:**
- Student
- Teacher
- Course
- Class
- Enrollment
- Schedule
- Attendance
- Report

---

## L3 — AI & Vibe Coding Odoo (5 buổi)

> **Mã:** AI-O
> **Đối tượng:** Đã biết Odoo — muốn tăng năng suất
> **Mục tiêu:** Tăng tốc phát triển Odoo bằng AI (2-5 lần)
> **Đầu ra:** ✅ Sử dụng AI cho Odoo ✅ Review & Refactor Code ✅ AI Project

### Buổi 1 — AI Prompt Engineering

**Nội dung:**
- ChatGPT, Claude, Gemini
- Prompt Template
- Prompt tối ưu cho Odoo

---

### Buổi 2 — AI Pair Programming

**Nội dung:**
- Cursor
- Claude Code
- OpenCode
- GitHub Copilot

**Thực hành:** Sinh module Odoo bằng AI

---

### Buổi 3 — AI Review & Debug

**Nội dung:**
- Code Review với AI
- Refactor
- Debug
- Performance
- Security

---

### Buổi 4 — AI Technical Design

**Nội dung:**
AI hỗ trợ:
- BRD
- Flow
- Database Design
- API Design
- Documentation
- Test Case

---

### Buổi 5 — AI Project

**Nội dung:**
Sử dụng AI để phát triển hoàn chỉnh một module Odoo:
- Phân tích yêu cầu
- Viết mã
- Kiểm thử
- Tài liệu hóa

---

## L4 — Odoo Business & Functional (8 buổi)

> **Mã:** ODO-B
> **Đối tượng:** Developer · Business Analyst · Functional Consultant · Project Manager · Solution Consultant
> **Mục tiêu:** Hiểu quy trình vận hành doanh nghiệp trên Odoo, phân tích yêu cầu, thiết kế giải pháp, mapping nghiệp vụ
> **Đầu ra:** ✅ ERP Process ✅ Requirement Analysis ✅ BRD/FRD/SRS ✅ Gap Analysis ✅ Scope & Estimate ✅ BA / Functional Consultant

**Phương pháp:** 70% workshop trên Odoo, lấy một doanh nghiệp xuyên suốt (Vinc Academy hoặc doanh nghiệp thương mại).

### Buổi 1 — Tổng quan ERP & Odoo

**Nội dung:**
- ERP là gì?
- Kiến trúc Odoo
- Chu trình triển khai ERP
- Master Data
- Business Process
- Phân quyền người dùng

**Workshop:** Phân tích quy trình của một doanh nghiệp SME

---

### Buổi 2 — CRM & Sales

**Nội dung:**
- Lead, Opportunity
- Quotation
- Sale Order
- Invoice
- Payment

**Workshop:** Quy trình bán hàng từ Lead đến thu tiền

---

### Buổi 3 — Purchase & Inventory

**Nội dung:**
- Purchase Request
- RFQ, Purchase Order
- Receipt
- Stock, Delivery
- Inventory Adjustment

**Workshop:** Quy trình mua hàng và quản lý kho

---

### Buổi 4 — Accounting Workflow

**Nội dung:**
- Accounting Workflow
- Journal Entries
- Invoices & Payments
- Reconciliation
- Tax

**Workshop:** Hạch toán doanh thu — chi phí trên Odoo

---

### Buổi 5 — HR & Project Management

**Nội dung:**
- HR: Recruitment, Attendance, Leave, Payroll (giới thiệu)
- Project: Project, Timesheet

**Workshop:** Quản lý nhân sự và chi phí dự án

---

### Buổi 6 — Business Analysis

**Nội dung:**
- Requirement Gathering
- Interview
- User Story, Use Case
- Business Flow, BPMN
- Gap Analysis

**Workshop:** Phân tích yêu cầu khách hàng

---

### Buổi 7 — Functional Consultant & Documentation

**Nội dung:**
- Mapping Requirement → Odoo
- Standard hay Customize?
- Scope, Estimate
- Change Request
- UAT
- BRD, FRD, SRS
- Workflow, ERD, Wireframe
- Acceptance Criteria

**Workshop:** Viết tài liệu triển khai

---

### Buổi 8 — Final Project

**Nội dung:**
Phân tích và thiết kế hệ thống cho một doanh nghiệp thực tế:

Ví dụ: Trung tâm đào tạo, CRM, Bán hàng, Kho, Gara ô tô, Bất động sản, Nhà máy

**Kết quả:**
- Business Flow
- ERD
- BRD
- Module List
- Roadmap
- Presentation

---

## L5 — Odoo Advanced Developer (8 buổi)

> **Mã:** ODO-A
> **Đối tượng:** Odoo Developer có từ 6 tháng kinh nghiệm
> **Mục tiêu:** Làm chủ Odoo Framework, tối ưu hiệu năng, tích hợp hệ thống, phát triển dự án lớn
> **Đầu ra:** ✅ Advanced ORM ✅ API Integration ✅ OWL ✅ Queue Job ✅ Performance ✅ Testing ✅ Dự án Enterprise

### Buổi 1 — Advanced ORM

**Nội dung:**
- ORM Internals
- Environment
- Cache
- Prefetch
- SQL Optimization

---

### Buổi 2 — Advanced Business Logic

**Nội dung:**
- Decorator (@api.depends, @api.onchange, @api.constrains, @api.model)
- Compute + Inverse
- Context
- Company Rules (Multi-Company)

---

### Buổi 3 — Integration

**Nội dung:**
- XMLRPC
- JSONRPC
- REST API
- Webhook
- OAuth

---

### Buổi 4 — Queue & Automation

**Nội dung:**
- Cron Job
- Queue Job
- Background Task
- Scheduler

---

### Buổi 5 — OWL Framework

**Nội dung:**
- Component
- Hook
- Service
- POS
- Frontend Extension

---

### Buổi 6 — Performance & Security

**Nội dung:**
- Performance Profiling
- Debug Tools
- SQL Injection Prevention
- XSS Prevention
- Security Best Practices

---

### Buổi 7 — Testing

**Nội dung:**
- Unit Test (TransactionCase)
- Integration Test (HttpCase)
- Mock
- CI Integration

---

### Buổi 8 — Final Project

**Dự án:** HR Management hoặc CRM Enterprise

---

## L6 — DevOps for Odoo (5 buổi)

> **Mã:** ODO-D
> **Đối tượng:** Odoo Developer · Technical Consultant · System Administrator
> **Mục tiêu:** Triển khai Odoo Production, quản trị server, backup & monitoring, CI/CD
> **Đầu ra:** ✅ Production Server ✅ Docker ✅ Nginx ✅ SSL ✅ Backup ✅ Monitoring ✅ CI/CD

### Buổi 1 — Linux & Docker

**Nội dung:**
- Ubuntu
- Linux Command
- Docker
- Docker Compose
- PostgreSQL

**Workshop:** Deploy Odoo Local

---

### Buổi 2 — Nginx & SSL

**Nội dung:**
- Reverse Proxy
- Domain
- HTTPS
- Let's Encrypt
- Security

**Workshop:** Deploy Production

---

### Buổi 3 — Backup & Monitoring

**Nội dung:**
- Backup Database
- Backup Filestore
- Restore
- Monitoring
- Log
- Telegram Alert

**Workshop:** Tự động Backup

---

### Buổi 4 — CI/CD

**Nội dung:**
- GitLab CI
- GitHub Actions
- Auto Deploy
- Migration
- Versioning

**Workshop:** Deploy tự động

---

### Buổi 5 — Production Project

**Dự án:** Triển khai hoàn chỉnh:
- Odoo + PostgreSQL
- Nginx + SSL
- Docker
- Backup + Monitoring
- CI/CD

---

## Kiến trúc trang chi tiết (program-detail.html)

Mỗi chương trình có trang chi tiết riêng, mở bằng cách click vào card hoặc link "Xem chi tiết" trên `index.html`:

```text
index.html (card / link "Xem chi tiết")
   └─> program-detail.html?code=DEV-F   (hoặc ODO-F / AI-O / ODO-B / ODO-A / ODO-D)
          └─> render nội dung từ program-data.js theo ?code=
```

### Source of truth

- **`program-data.js`** — chứa dữ liệu 6 chương trình (title, level, role, duration, target, description, badge, outcome[], sessions[]). Mọi thay đổi nội dung buổi học chỉnh sửa ở đây.
- `program-detail.html` — template, render động theo `?code=`, không hardcode nội dung từng chương trình.

### Cấu trúc trang chi tiết

| Thành phần | Mô tả |
|-----------|-------|
| Header (`<nav>`) | Dùng header gốc của `index.html`; `.nav-links` thay bằng 1 link **"← Quay lại trang chủ"** (trỏ về `index.html`). Giữ logo, nút Đăng ký, lang/theme toggle, hamburger. |
| Back link | **"← Quay lại chương trình đào tạo"** (trỏ `index.html#programs`) |
| Header chương trình | icon + level · role + title + meta (⏱ duration, 👤 target) + badge |
| Mô tả & outcomes | `description` + danh sách tag `outcome` |
| CTA | 2 nút rộng đều: **Tư vấn qua Zalo** (`btn-secondary`, link Zalo `0363729276`) và **Đăng ký qua Google Form** (`btn-google` xanh, link form). **Đã bỏ nút "Đăng ký ngay" btn-primary** trên trang này. |
| Banner ưu đãi | `🎁 Đăng ký ngay hôm nay để nhận ưu đãi học phí` (class `.pd-promo`, accent vàng) |
| Nội dung chi tiết | Danh sách session dạng accordion, **mở sẵn** (class `open` mặc định), click header để đóng/mở |

### Ghi chú kỹ thuật

- **Nút "Xem chi tiết"** trên card `index.html` đã nâng cấp: từ text link thành button xanh đặc (`program-detail-link`), có icon `→`, hover dịch lên + arrow chạy sang phải.
- **Google Form:** link hiện là placeholder `https://forms.gle/YOUR_GOOGLE_FORM_ID` — cần thay bằng link thật.
- **i18n:** nội dung trang chi tiết (session, topic, description, outcome, CTA, banner) hiện là **Tiếng Việt cố định**, chưa có chuyển ngôn ngữ như `index.html`. Chỉ nav (qua `script.js`) hỗ trợ VI/EN.
- **Dark mode:** trang chi tiết kế thừa `data-theme` từ `localStorage` (`va-theme`), tự động áp dụng như `index.html`.
- **Mobile (≤520px):** icon trên 2 CTA bị ẩn, label nằm 1 dòng (`white-space: nowrap`); banner thu nhỏ font.

---

## Hướng dẫn cập nhật website

### index.html — Section `#programs`

Mỗi `.course-card` cần cập nhật:

| Card | Thay đổi |
|------|---------|
| Developer Foundation | duration: `⏱ 5 buổi`; curriculum: cập nhật 4 mục theo nội dung mới |
| Odoo Developer Foundation | duration: `⏱ 8 buổi`; curriculum: cập nhật với dự án TMS |
| AI & Vibe Coding Odoo | duration: `⏱ 5 buổi`; curriculum: giữ, cập nhật nội dung |
| Odoo Business & Functional | duration: `⏱ 8 buổi`; curriculum: mở rộng |
| Odoo Advanced Developer | duration: `⏱ 8 buổi`; curriculum: cập nhật |
| DevOps for Odoo | duration: `⏱ 5 buổi`; curriculum: cập nhật |

Nút **"Xem chi tiết"** (`.program-detail-link`) trỏ đến `program-detail.html?code=<MÃ>` tương ứng; đã là button xanh đặc, không cần sửa style thường xuyên.

### program-data.js — Nội dung chi tiết

Khi sửa nội dung buổi học, chỉnh trực tiếp object chương trình tương ứng (`code: 'DEV-F'` ...). Mỗi `session` có: `num`, `title`, `topics[]`, `project` (tùy chọn). Số buổi = độ dài `sessions`.

### program-detail.html — Template

Chỉ sửa khi thay đổi cấu trúc giao diện (thêm/sửa thành phần CTA, banner, style). Nội dung buổi học KHÔNG sửa ở đây.

### i18n keys (`script.js`)

Cập nhật các key `p.1.*` đến `p.6.*` tương ứng với nội dung mới (dùng cho card trên `index.html`).

### Roadmap

Cập nhật `#roadmap` với mapping Level 1-6 và vai trò đầu ra.
