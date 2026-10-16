# Quy tắc làm việc

- Trao đổi bằng tiếng Việt.
- Viết code ngắn gọn nhất có thể.
- Giao diện phải responsive trên mọi màn hình (desktop, tablet, mobile); kiểm tra tối thiểu ở các mốc 1366px, 800px, 520px, 390px.
- Không tự ý xóa file — phải hỏi và được xác nhận trước.
- Chỉ thực hiện git (commit, push, tạo/xóa/đổi nhánh...) khi được yêu cầu.
- Khi làm git, tuân theo [docs/git-convention.md](../docs/git-convention.md).

# Blog & vai trò

- Blog "Kiến thức" (`/blog/<chủ-đề>/`, site tĩnh deploy Vercel, không build): xem [docs/blog-guide.md](../docs/blog-guide.md).
- Link nội bộ: tương đối + ghi rõ `index.html` để chạy cả `file://` lẫn Vercel (chi tiết trong blog-guide).
- Vai trò trong `.claude/agents/`: `blog-writer` (viết bài VI/EN), `translator` (dịch VI↔EN), `seo-reviewer` (soát SEO, chỉ đọc), `frontend-qa` (responsive/link, chỉ đọc).
