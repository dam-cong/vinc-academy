# Bàn giao: series "Python thực chiến cho lập trình viên Odoo" (blog song ngữ)

> Cập nhật: 16/10/2026 · Trạng thái: **đã xuất bản bài 1–14 / 14 bài** (chưa commit). Chủ đề `python` trong blog "Kiến thức": hub `/blog/python/` và `/en/blog/python/`.

## 1. Mục tiêu
- Dạy Python **vừa đủ để làm việc**, mọi ví dụ lấy từ dự án quản lý khóa học `vinc_course` (cùng dự án với series Odoo), chỉ ra khái niệm xuất hiện ở đâu trong code Odoo. Flask/Django chỉ nhắc ngắn khi thật khớp.
- Tham khảo **danh mục chủ đề** của W3Schools (`/python/`) và LearnPython.org; **không chép/dịch** câu chữ của hai site đó. Nguồn kiểm chứng: tài liệu Python 3.12 (docs.python.org/3.12) và Odoo 20 docs.

## 2. Công cụ dựng bài
Bài được dựng thủ công theo checklist chung trong `docs/odoo-series-handoff.md` §5. Bộ script sinh bài trước đây (`docs/tools/blog/`) đã được gỡ khỏi repo ngày 16/10/2026.


## 3. Tiến độ (14 bài)
| # | VI (slug) | EN (slug) | Trạng thái |
|---|---|---|---|
| 01 | `lam-quen-python-cai-dat-venv-pip.html` – Làm quen Python: cài đặt, venv và pip | `getting-started-python-venv-pip.html` | ✅ Đã xuất bản |
| 02 | `bien-kieu-du-lieu-chuoi-f-string-python.html` – Biến, kiểu dữ liệu và chuỗi | `python-variables-data-types-strings-f-strings.html` | ✅ Đã xuất bản |
| 03 | `dieu-kien-vong-lap-if-for-while-python.html` – Điều kiện và vòng lặp | `python-conditions-loops-if-for-while-match.html` | ✅ Đã xuất bản |
| 04 | `list-tuple-set-dict-python.html` – List, tuple, set và dict | `python-lists-tuples-sets-dicts.html` | ✅ Đã xuất bản |
| 05 | `ham-python-args-kwargs-lambda.html` – Hàm: tham số, **kwargs và lambda | `python-functions-args-kwargs-lambda.html` | ✅ Đã xuất bản |
| 06 | `comprehension-generator-sorted-filter-python.html` – Comprehension, generator và sorted/filter | `python-comprehensions-generators-sorted-filter.html` | ✅ Đã xuất bản |
| 07 | `module-package-import-python-odoo.html` – Module, package và import | `python-modules-packages-imports-odoo.html` | ✅ Đã xuất bản |
| 08 | `class-doi-tuong-oop-python-odoo.html` – Class và đối tượng | `python-classes-objects-oop-odoo-models.html` | ✅ Đã xuất bản |
| 09 | `ke-thua-super-decorator-python-odoo.html` – Kế thừa, super() và decorator | `python-inheritance-super-decorators-odoo.html` | ✅ Đã xuất bản |
| 10 | `xu-ly-loi-try-except-with-python-odoo.html` – Xử lý lỗi và câu lệnh with | `python-error-handling-try-except-with-odoo.html` | ✅ Đã xuất bản |
| 11 | `file-json-csv-pathlib-python-odoo.html` – Làm việc với file, JSON và CSV | `python-files-json-csv-pathlib-odoo.html` | ✅ Đã xuất bản |
| 12 | `ngay-gio-datetime-regex-python-odoo.html` – Ngày giờ và regex | `python-datetime-timezones-regex-odoo.html` | ✅ Đã xuất bản |
| 13 | `goi-api-requests-json-2-odoo-python.html` – Gọi API với requests | `python-requests-odoo-json-2-api-calls.html` | ✅ Đã xuất bản |
| 14 | `debug-logging-test-du-an-nho-python.html` – Debug, logging và test | `python-debugging-logging-testing-small-project.html` | ✅ Đã xuất bản |

## 4. Quy tắc
- Chuẩn nội dung như series Odoo: bản VI ≥ ~1.500 từ (không tính code), có bảng "trong Odoo bạn gặp ở đâu", ví dụ **chạy thật** kèm kết quả, khung "Lỗi hay gặp" (thông báo lỗi lấy từ chạy thật hoặc tài liệu), "Tổng kết", FAQ, nguồn.
- Mọi đoạn code Python trong bài phải chạy được trên Python 3.12+ và in đúng kết quả ghi trong bài (kiểm tra bằng `python3` trong thư mục tạm).
- Không dùng logo Python/Odoo làm ảnh; cuối bài có dòng miễn trừ nhãn hiệu.
