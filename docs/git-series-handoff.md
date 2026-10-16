# Bàn giao: series "Git thực chiến cho nhóm phát triển" (blog song ngữ)

> Cập nhật: 16/10/2026 · Trạng thái: **đã xuất bản 12 / 12 bài** (chưa commit). Chủ đề `git` trong blog "Kiến thức": hub `/blog/git/` và `/en/blog/git/`.

## 1. Mục tiêu
- Dạy Git **vừa đủ để đi làm** trong doanh nghiệp: quy trình nhóm trên **GitLab** (merge request, nhánh được bảo vệ, CI), mọi ví dụ trên repo module Odoo `vinc_course` (dự án quản lý khóa học dùng chung với series Odoo/Python). GitHub chỉ nhắc ngắn ("tương đương là pull request").
- Tham khảo **danh mục chủ đề** của git-scm.com (`gittutorial`, `giteveryday`, `gitworkflows`) và W3Schools `/git/`; **không chép/dịch** câu chữ. Nguồn kiểm chứng: tài liệu Git (git-scm.com/docs) và GitLab Docs (docs.gitlab.com).

## 2. Công cụ dựng bài
Dùng chung bộ công cụ `docs/tools/blog/` (xem `docs/python-series-handoff.md` §2); chủ đề `git` đã khai báo trong `topics.py`; hub tạo bằng `make_hub_git.py`. Spec mỗi bài: `topic='git'`.

**Nguồn sinh bài** nằm ở `docs/tools/blog/git-series/` (không deploy): `gitlib.py` chạy lệnh Git **thật** trong thư mục tạm (đặt `GIT_SERIES_TMP` để đổi chỗ; ngày giờ cố định nên mã băm lặp lại được; remote giả bằng repo bare, URL `git@gitlab.example.com:vinc/` được viết lại về thư mục cục bộ), `gcommon.py` có hàm dựng bảng/khung; mỗi bài có `gNN/gen.py` (nội dung VI+EN + các lệnh được chạy để lấy output) và `gNN/spec.py`. Dựng lại một bài:

```
cd docs/tools/blog/git-series/g05 && python3 -I gen.py </dev/null       # chạy lệnh thật, sinh vi_body.html / en_body.html
cd ../../../../.. && python3 -I docs/tools/blog/publish.py docs/tools/blog/git-series/g05/spec.py rebuild
python3 -I docs/tools/blog/svgcheck.py                                   # kiểm tra sơ đồ SVG
```

Khi nâng phiên bản Git, chạy lại `gen.py` để output trong bài luôn khớp. Lưu ý: lệnh tương tác (như `git shortlog` không có revision) sẽ treo nếu stdin là terminal, nên luôn chạy với `</dev/null`.

## 3. Tiến độ (12 bài)
| # | VI (slug) | EN (slug) | Trạng thái |
|---|---|---|---|
| 01 | `git-la-gi-cai-dat-cau-hinh-lan-dau.html` – Git là gì và cài đặt | `what-is-git-install-first-time-setup.html` | ✅ Đã xuất bản |
| 02 | `git-commit-dau-tien-status-add-log-gitignore.html` – Commit đầu tiên | `git-first-commits-status-add-log-gitignore.html` | ✅ Đã xuất bản |
| 03 | `git-nhanh-branch-merge.html` – Nhánh và merge | `git-branches-and-merging.html` | ✅ Đã xuất bản |
| 04 | `git-remote-clone-fetch-pull-push-ssh.html` – Remote và SSH | `git-remotes-clone-fetch-pull-push-ssh.html` | ✅ Đã xuất bản |
| 05 | `git-merge-request-gitlab-quy-trinh-review.html` – Merge request trên GitLab | `git-gitlab-merge-request-review-workflow.html` | ✅ Đã xuất bản |
| 06 | `git-giai-quyet-xung-dot-conflict.html` – Giải quyết xung đột | `git-resolving-merge-conflicts.html` | ✅ Đã xuất bản |
| 07 | `git-hoan-tac-restore-reset-revert-reflog.html` – Hoàn tác an toàn | `git-undo-restore-reset-revert-reflog.html` | ✅ Đã xuất bản |
| 08 | `git-rebase-lam-gon-lich-su.html` – Rebase và làm gọn lịch sử | `git-rebase-tidy-history.html` | ✅ Đã xuất bản |
| 09 | `git-stash-cherry-pick-tag-hotfix-release.html` – Stash, cherry-pick và tag | `git-stash-cherry-pick-tags-hotfix-release.html` | ✅ Đã xuất bản |
| 10 | `git-quy-uoc-commit-chien-luoc-nhanh.html` – Quy ước commit và nhánh | `git-commit-conventions-branching-strategies.html` | ✅ Đã xuất bản |
| 11 | `git-hook-gitlab-ci-kiem-tra-module-odoo.html` – Git hook và GitLab CI | `git-hooks-gitlab-ci-odoo-module-checks.html` | ✅ Đã xuất bản |
| 12 | `git-blame-bisect-xu-ly-su-co-du-an-tong-hop.html` – Blame, bisect và tổng hợp | `git-blame-bisect-troubleshooting-capstone.html` | ✅ Đã xuất bản |

## 4. Quy tắc
- Chuẩn nội dung như series Odoo/Python: bản VI ≥ ~1.500 từ (không tính code), có bảng tham chiếu, ví dụ **chạy thật** (repo thử trong thư mục tạm, remote giả bằng `git init --bare`), khung "Lỗi hay gặp" (thông báo lỗi lấy từ lần chạy thật), "Tổng kết", FAQ, nguồn.
- Mọi lệnh trong bài phải chạy được trên Git 2.30+ (đã chạy thật trên 2.47) và in đúng kết quả ghi; mã băm commit trong bài là ví dụ minh họa, không phải khoảng cố định.
- Không dùng logo Git/GitLab làm ảnh; cuối bài có dòng miễn trừ nhãn hiệu (tự thêm bởi `publish.py`). Không dùng thông tin liên hệ thật; email ví dụ dùng `example.com`.
- Tính năng riêng của GitLab (merge request, protected branch, CI) chỉ nêu khi có trong docs.gitlab.com.
