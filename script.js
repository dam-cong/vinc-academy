function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('va-theme', isDark ? 'light' : 'dark');
}

(function () {
    const saved = localStorage.getItem('va-theme');
    if (saved) {
        if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        const hour = new Date().getHours();
        if (hour >= 18 || hour < 6) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }
})();

function toggleFaq(el) {
    const item = el.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

function togglePrograms(btn) {
    const hidden = document.querySelectorAll('.program-hidden');
    const isExpanded = btn.dataset.expanded === 'true';
    hidden.forEach(el => {
        if (isExpanded) el.classList.remove('show');
        else el.classList.add('show');
    });
    btn.dataset.expanded = isExpanded ? 'false' : 'true';
    const key = isExpanded ? 'programs.expand' : 'programs.collapse';
    btn.textContent = i18n[currentLang][key];
}

// ── I18N ──
const i18n = {
    vi: {
        'nav.about': 'Giới thiệu',
        'nav.programs': 'Chương trình',
        'nav.pricing': 'Bảng giá',
        'nav.roadmap': 'Lộ trình',
        'nav.why': 'Tại sao chúng tôi',
        'nav.faq': 'FAQ',

        'hero.badge': 'Đào tạo thực chiến · 100% dự án thật',
        'hero.title': 'Đào tạo Odoo<br><span class="accent">thực chiến</span><br>cho Developer',
        'hero.desc': 'Từ Developer Foundation đến AI & Vibe Coding — 6 chương trình Odoo thực chiến, lộ trình rõ ràng, bài tập thực tế, giảng viên kinh nghiệm doanh nghiệp.',
        'hero.btn1': 'Xem chương trình',
        'hero.btn2': 'Xem lộ trình',
        'hero.stat1': 'Chương trình đào tạo',
        'hero.stat2': 'Thực hành dự án thật',
        'hero.stat3': 'Sẵn sàng đi làm ngay',

        'about.tag': 'Giới thiệu',
        'about.title': 'Chúng tôi là<br>Vinc Academy',
        'about.desc1': 'Vinc Academy được thành lập với sứ mệnh đào tạo Odoo <strong>thực chiến</strong> — nơi học viên không chỉ học lý thuyết mà còn tự tay xây dựng sản phẩm thật từ ngày đầu tiên.',
        'about.desc2': 'Chúng tôi tập trung vào hệ sinh thái <strong>Python · Odoo · DevOps · AI</strong> — bộ kỹ năng được các doanh nghiệp Việt Nam và quốc tế săn đón nhất hiện nay, đặc biệt trong lĩnh vực ERP và tự động hóa quy trình.',
        'about.quote': '"Học đúng thứ doanh nghiệp cần — không phải học để biết"',
        'about.stat1': 'Chương trình',
        'about.stat2': 'Thực hành',
        'about.stat3': 'Cấp độ lộ trình',

        'programs.tag': 'Chương trình đào tạo',
        'programs.title': '6 chương trình Odoo thực chiến',
        'programs.sub': 'Từ nền tảng lập trình đến AI — lộ trình bài bản cho mọi cấp độ',

        'p.1.num': 'Nền tảng lập trình',
        'p.1.title': 'Developer Foundation',
        'p.1.target': 'Người mới · Sinh viên CNTT · Chuyển ngành',
        'p.1.duration': '⏱ 8–10 buổi',
        'p.1.c.1': '<strong>Python</strong> — Cơ bản, OOP, Exception',
        'p.1.c.2': '<strong>PostgreSQL</strong> — Database Design, SQL',
        'p.1.c.3': '<strong>Git & GitLab</strong> — Workflow, Branch',
        'p.1.c.4': '<strong>Dự án:</strong> Customer Management',
        'p.1.outcome': '✅ Biết lập trình · Hiểu dữ liệu · Biết làm việc với Git',
        'p.1.badge': '🔥 Nền tảng',

        'p.2.num': 'Junior Odoo Developer',
        'p.2.title': 'Odoo Developer Foundation',
        'p.2.target': 'Đã có nền tảng lập trình',
        'p.2.duration': '⏱ 5–6 buổi',
        'p.2.c.1': 'ERP & Odoo Architecture · MVC · Module',
        'p.2.c.2': 'Models · ORM · Decorator · Inheritance',
        'p.2.c.3': 'View · Security · Controller · QWeb',
        'p.2.c.4': '<strong>Dự án:</strong> Student Management System',
        'p.2.outcome': '✅ Viết module Odoo · Customize hệ thống · Hiểu kiến trúc Odoo',
        'p.2.badge': '🔥 Cốt lõi',

        'p.3.num': 'Làm việc cùng AI',
        'p.3.title': 'AI & Vibe Coding Odoo',
        'p.3.target': 'Đã biết Odoo · Muốn tăng năng suất',
        'p.3.duration': '⏱ 4–5 buổi',
        'p.3.c.1': 'Prompt Engineering · AI Pair Programming',
        'p.3.c.2': 'AI Code Generation · Review · Refactor · Debug',
        'p.3.c.3': 'Technical Design · Documentation',
        'p.3.c.4': 'Tool: ChatGPT · Claude · Cursor · OpenCode',
        'p.3.c.5': '<strong>Dự án:</strong> Phát triển module bằng AI',
        'p.3.outcome': '✅ Tăng tốc phát triển · Nâng cao năng suất',
        'p.3.badge': '✨ AI',

        'p.4.num': 'Nghiệp vụ',
        'p.4.title': 'Odoo Business & Functional',
        'p.4.target': 'Developer · BA · Consultant',
        'p.4.duration': '⏱ 3–4 buổi',
        'p.4.c.1': 'CRM · Sales · Purchase · Inventory',
        'p.4.c.2': 'Accounting · HR · MRP',
        'p.4.c.3': '<strong>Dự án:</strong> Phân tích nghiệp vụ doanh nghiệp',
        'p.4.outcome': '✅ Hiểu khách hàng · Phân tích yêu cầu',
        'p.4.badge': 'Nghiệp vụ',

        'p.5.num': 'Nâng cao',
        'p.5.title': 'Odoo Advanced Developer',
        'p.5.target': 'Đã biết Odoo CB · Odoo Dev 6 tháng–2 năm',
        'p.5.duration': '⏱ 6–8 buổi',
        'p.5.c.1': 'Advanced ORM · SQL Optimization · Multi Company',
        'p.5.c.2': 'API Integration · Cron Job · Queue Job · Testing',
        'p.5.c.3': 'OWL · POS · Performance',
        'p.5.c.4': '<strong>Dự án:</strong> HR Management hoặc CRM',
        'p.5.outcome': '✅ Tham gia dự án thực tế · Xử lý bài toán khó',
        'p.5.badge': 'Chuyên sâu',

        'p.6.num': 'Vận hành',
        'p.6.title': 'DevOps for Odoo',
        'p.6.target': 'Odoo Developer · Technical Consultant',
        'p.6.duration': '⏱ 4–5 buổi',
        'p.6.c.1': 'Linux · Docker · PostgreSQL',
        'p.6.c.2': 'Nginx · SSL · Odoo Deployment',
        'p.6.c.3': 'Backup · Monitoring · CI/CD',
        'p.6.c.4': '<strong>Dự án:</strong> Deploy Production Server',
        'p.6.outcome': '✅ Cài đặt Odoo · Triển khai hệ thống',
        'p.6.badge': 'Triển khai',

        'programs.expand': '+ Xem thêm 3 chương trình',
        'programs.collapse': '− Thu gọn',
        'p.free': 'trong combo',

        'pricing.tag': 'Bảng giá',
        'pricing.title': 'Combo tiết kiệm — chọn gói phù hợp',
        'pricing.sub': 'Tiết kiệm đến 30% so với đăng ký từng chương trình riêng lẻ',
        'pricing.th1': 'Combo',
        'pricing.th2': 'Nội dung',
        'pricing.th3': 'Giá',

        'r.1.name': 'Bắt đầu',
        'r.1.badge': '🔥 Phổ biến',
        'r.1.content': 'Developer Foundation + Odoo Developer Foundation',
        'r.1.price': '6 triệu',

        'r.2.name': 'Chuyên nghiệp',
        'r.2.badge': 'Tiết kiệm nhất',
        'r.2.content': 'Bắt đầu + Odoo Advanced Developer',
        'r.2.price': '10 triệu',

        'r.3.name': 'Chuyên gia',
        'r.3.badge': 'Toàn diện',
        'r.3.content': 'Bắt đầu + Advanced + DevOps for Odoo',
        'r.3.price': '14 triệu',

        'r.4.name': 'AI Developer',
        'r.4.badge': 'AI',
        'r.4.content': 'AI & Vibe Coding',
        'r.4.price': '6 triệu',

        'r.5.name': 'Full Stack Odoo',
        'r.5.badge': 'Trọn gói',
        'r.5.content': 'Toàn bộ 6 chương trình',
        'r.5.price': '16–18 triệu',

        'pricing.btn': 'Đăng ký',
        'pricing.btn2': 'Liên hệ',

        'roadmap.tag': 'Lộ trình học tập',
        'roadmap.title': '4 cấp độ — từ Foundation đến Senior',
        'roadmap.sub': 'Xây dựng kỹ năng vững chắc qua từng cấp độ, sẵn sàng cho sự nghiệp Odoo',
        'road.l1.name': 'Cấp độ 1 — Nền tảng',
        'road.l1.badge': 'Biết lập trình & Odoo',
        'road.l1.detail': 'Developer Foundation + Odoo Developer Foundation — Từ con số 0 đến Junior Odoo Developer. Project: Customer Management, Student Management.',
        'road.l2.name': 'Cấp độ 2 — Phát triển',
        'road.l2.badge': 'Làm được dự án',
        'road.l2.detail': 'Odoo Advanced Developer + Business & Functional — ORM nâng cao, OWL, Integration, Performance, nghiệp vụ doanh nghiệp.',
        'road.l3.name': 'Cấp độ 3 — Vận hành',
        'road.l3.badge': 'Triển khai hệ thống',
        'road.l3.detail': 'DevOps for Odoo — Linux, Docker, Nginx, CI/CD, Backup. Deploy production server thực tế.',
        'road.l4.name': 'Cấp độ 4 — AI Developer',
        'road.l4.badge': 'Tăng năng suất với AI',
        'road.l4.detail': 'AI & Vibe Coding Odoo — Prompt Engineering, AI Code Generation, AI Review & Debug, Technical Design. Làm việc hiệu quả gấp 2-3 lần.',
        'road.card1': 'Nền tảng',
        'road.card1d': 'Biết lập trình và Odoo',
        'road.card2': 'Phát triển',
        'road.card2d': 'Làm được dự án',
        'road.card3': 'Vận hành',
        'road.card3d': 'Triển khai hệ thống',
        'road.card4': 'AI Developer',
        'road.card4d': 'Tăng năng suất với AI',

        'why.tag': 'Tại sao chọn Vinc Academy',
        'why.title': 'Học thực chiến, ra làm được ngay',
        'why.sub': 'Không lý thuyết suông — mỗi bài học gắn với bài tập và dự án thực tế',
        'w.1.title': 'Thực hành là chính',
        'w.1.desc': 'Mỗi module đều có bài tập code thực tế, project cuối khóa để xây portfolio.',
        'w.2.title': 'Giảng viên kinh nghiệm',
        'w.2.desc': 'Đội ngũ developer và Odoo consultant có nhiều năm kinh nghiệm thực chiến doanh nghiệp.',
        'w.3.title': 'Hỗ trợ liên tục',
        'w.3.desc': 'Nhóm học viên riêng, giảng viên hỗ trợ câu hỏi trong ngày, không bỏ sót ai.',
        'w.4.title': 'Lộ trình rõ ràng',
        'w.4.desc': 'Biết chính xác học gì tiếp theo, không bị lạc trong biển kiến thức.',
        'w.5.title': 'Mentor 1-1',
        'w.5.desc': 'Hỗ trợ trực tiếp từ giảng viên, giải đáp thắc mắc trong ngày, định hướng lộ trình cá nhân.',
        'w.6.title': 'Cập nhật nội dung',
        'w.6.desc': 'Nội dung được cập nhật theo phiên bản mới nhất của công nghệ.',

        'faq.tag': 'FAQ',
        'faq.title': 'Câu hỏi thường gặp',
        'faq.sub': 'Những thắc mắc phổ biến từ học viên',
        'faq.q1': 'Chưa biết gì về lập trình, học Developer Foundation được không?',
        'faq.a1': 'Hoàn toàn được. Chương trình Developer Foundation được thiết kế từ con số 0 — bắt đầu với Python cơ bản, không yêu cầu kinh nghiệm trước. Chỉ cần máy tính và kết nối internet là đủ.',
        'faq.q2': 'Học online hay offline?',
        'faq.a2': 'Vinc Academy đào tạo online qua video bài giảng và buổi live có tương tác. Học viên có thể xem lại bất cứ lúc nào, không bị ràng buộc lịch cố định. Có nhóm riêng để hỗ trợ xuyên suốt.',
        'faq.q3': 'Sau Odoo Developer Foundation có thể đi làm được không?',
        'faq.a3': 'Có. Odoo Developer Foundation giúp bạn viết module, customize hệ thống và hiểu kiến trúc Odoo — đủ để ứng tuyển Junior Odoo Developer. Nếu muốn nâng cao, bạn có thể học tiếp Advanced hoặc DevOps.',
        'faq.q4': 'Thời gian hoàn thành mỗi chương trình là bao lâu?',
        'faq.a4': 'Developer Foundation: 8–10 buổi, Odoo Foundation: 5–6 buổi, Advanced: 6–8 buổi, DevOps: 4–5 buổi, AI & Vibe Coding: 4–5 buổi. Trung bình 4–8 tuần nếu học đều đặn 1–2 giờ mỗi ngày. Không có deadline, học viên hoàn toàn chủ động thời gian.',

        'nav.register': 'Đăng ký ngay',

        'register.tag': 'Đăng ký học',
        'register.title': '3 bước bắt đầu đơn giản',
        'register.sub': 'Chọn combo phù hợp — chuyển khoản — bắt đầu học ngay',
        'reg.step1': 'Chọn combo phù hợp',
        'reg.desc1': 'Xem bảng combo hoặc chọn chương trình riêng lẻ. Nếu chưa chắc, nhắn Zalo để được tư vấn miễn phí.',
        'reg.tag1': 'Tư vấn miễn phí',
        'reg.step2': 'Chuyển khoản học phí',
        'reg.desc2': 'Chuyển khoản đúng số tiền theo combo đã chọn. Nội dung ghi rõ: <strong>Họ tên + SĐT + Tên combo</strong>.',
        'reg.tag2': 'Xác nhận trong 24h',
        'reg.step3': 'Nhận link & bắt đầu học',
        'reg.desc3': 'Sau khi xác nhận thanh toán, bạn sẽ nhận link truy cập khóa học qua Zalo hoặc Email. Học ngay, không giới hạn thời gian.',
        'reg.tag3': 'Truy cập mãi mãi',

        'reg.suggest.title': '💡 Gợi ý cho người mới',
        'reg.suggest.desc': 'Combo <strong>Bắt đầu</strong> (6 triệu) — đã bao gồm Developer Foundation + Odoo Developer Foundation. Phù hợp nhất để bắt đầu từ con số 0.',
        'reg.pay.title': 'Thông tin tài khoản',
        'reg.pay.bank': 'Ngân hàng',
        'reg.pay.bankV': 'TECHCOMBANK',
        'reg.pay.acc': 'Số tài khoản',
        'reg.pay.accV': '0987654321',
        'reg.pay.name': 'Chủ tài khoản',
        'reg.pay.nameV': 'DAM CONG HIEN',
        'reg.pay.zalo': 'Liên hệ Zalo',
        'reg.pay.zaloV': '036 3729 276',
        'reg.transfer': 'Nội dung chuyển khoản: <strong>Họ tên + SĐT + Tên combo</strong>',
        'reg.btn': 'Đăng ký qua Zalo · 036 3729 276',
        'reg.note': 'Chuyển khoản xong nhắn số Zalo để được kích hoạt',
        'reg.card.title': 'Đăng ký học',
        'reg.card.sub': 'Chuyển khoản để kích hoạt tài khoản',
        'page.title': 'Vinc Academy — Đào tạo lập trình thực chiến',

        'footer': 'Vinc Academy',
        'footer.right': '© 2025 Vinc Academy',
    },
    en: {
        'nav.about': 'About',
        'nav.programs': 'Programs',
        'nav.pricing': 'Pricing',
        'nav.roadmap': 'Roadmap',
        'nav.why': 'Why Us',
        'nav.faq': 'FAQ',
        'nav.register': 'Register Now',

        'hero.badge': 'Hands-on Training · 100% Real Projects',
        'hero.title': 'Odoo<br><span class="accent">Hands-on</span><br>Training for Developers',
        'hero.desc': 'From Developer Foundation to AI & Vibe Coding — 6 hands-on Odoo programs, clear roadmap, real projects, industry-experienced instructors.',
        'hero.btn1': 'View Programs',
        'hero.btn2': 'View Roadmap',
        'hero.stat1': 'Training Programs',
        'hero.stat2': 'Real Project Practice',
        'hero.stat3': 'Job-Ready Skills',

        'about.tag': 'About',
        'about.title': 'We Are<br>Vinc Academy',
        'about.desc1': 'Vinc Academy was founded with the mission of providing <strong>hands-on</strong> Odoo training — where students not only learn theory but build real products from day one.',
        'about.desc2': 'We focus on the <strong>Python · Odoo · DevOps · AI</strong> ecosystem — the most in-demand skills for Vietnamese and international companies, especially in ERP and process automation.',
        'about.quote': '"Learn what businesses need — not just for knowledge"',
        'about.stat1': 'Programs',
        'about.stat2': 'Practice',
        'about.stat3': 'Path Levels',

        'programs.tag': 'Training Programs',
        'programs.title': '6 Hands-on Odoo Programs',
        'programs.sub': 'From programming fundamentals to AI — a structured path for every level',

        'p.1.num': 'Programming Foundation',
        'p.1.title': 'Developer Foundation',
        'p.1.target': 'Beginners · IT Students · Career Switchers',
        'p.1.duration': '⏱ 8–10 sessions',
        'p.1.c.1': '<strong>Python</strong> — Basics, OOP, Exception',
        'p.1.c.2': '<strong>PostgreSQL</strong> — Database Design, SQL',
        'p.1.c.3': '<strong>Git & GitLab</strong> — Workflow, Branch',
        'p.1.c.4': '<strong>Project:</strong> Customer Management',
        'p.1.outcome': '✅ Code · Database · Git',
        'p.1.badge': '🔥 Foundation',

        'p.2.num': 'Junior Odoo Developer',
        'p.2.title': 'Odoo Developer Foundation',
        'p.2.target': 'Has programming foundation',
        'p.2.duration': '⏱ 5–6 sessions',
        'p.2.c.1': 'ERP & Odoo Architecture · MVC · Module',
        'p.2.c.2': 'Models · ORM · Decorator · Inheritance',
        'p.2.c.3': 'View · Security · Controller · QWeb',
        'p.2.c.4': '<strong>Project:</strong> Student Management System',
        'p.2.outcome': '✅ Write Odoo modules · Customize system · Understand Odoo architecture',
        'p.2.badge': '🔥 Core',

        'p.3.num': 'Working with AI',
        'p.3.title': 'AI & Vibe Coding Odoo',
        'p.3.target': 'Knows Odoo · Wants to boost productivity',
        'p.3.duration': '⏱ 4–5 sessions',
        'p.3.c.1': 'Prompt Engineering · AI Pair Programming',
        'p.3.c.2': 'AI Code Generation · Review · Refactor · Debug',
        'p.3.c.3': 'Technical Design · Documentation',
        'p.3.c.4': 'Tools: ChatGPT · Claude · Cursor · OpenCode',
        'p.3.c.5': '<strong>Project:</strong> Build module with AI',
        'p.3.outcome': '✅ Faster development · Higher productivity',
        'p.3.badge': '✨ AI',

        'p.4.num': 'Business',
        'p.4.title': 'Odoo Business & Functional',
        'p.4.target': 'Developer · BA · Consultant',
        'p.4.duration': '⏱ 3–4 sessions',
        'p.4.c.1': 'CRM · Sales · Purchase · Inventory',
        'p.4.c.2': 'Accounting · HR · MRP',
        'p.4.c.3': '<strong>Project:</strong> Business Process Analysis',
        'p.4.outcome': '✅ Understand clients · Analyze requirements',
        'p.4.badge': 'Business',

        'p.5.num': 'Advanced',
        'p.5.title': 'Odoo Advanced Developer',
        'p.5.target': 'Knows Odoo basics · 6mo–2yr Odoo Dev',
        'p.5.duration': '⏱ 6–8 sessions',
        'p.5.c.1': 'Advanced ORM · SQL Optimization · Multi Company',
        'p.5.c.2': 'API Integration · Cron Job · Queue Job · Testing',
        'p.5.c.3': 'OWL · POS · Performance',
        'p.5.c.4': '<strong>Project:</strong> HR Management or CRM',
        'p.5.outcome': '✅ Join real projects · Solve complex problems',
        'p.5.badge': 'Advanced',

        'p.6.num': 'Operations',
        'p.6.title': 'DevOps for Odoo',
        'p.6.target': 'Odoo Developer · Technical Consultant',
        'p.6.duration': '⏱ 4–5 sessions',
        'p.6.c.1': 'Linux · Docker · PostgreSQL',
        'p.6.c.2': 'Nginx · SSL · Odoo Deployment',
        'p.6.c.3': 'Backup · Monitoring · CI/CD',
        'p.6.c.4': '<strong>Project:</strong> Deploy Production Server',
        'p.6.outcome': '✅ Install Odoo · Deploy Production system',
        'p.6.badge': 'Deploy',

        'programs.expand': '+ View 3 more programs',
        'programs.collapse': '− Collapse',
        'p.free': 'in combo',

        'pricing.tag': 'Pricing',
        'pricing.title': 'Combo Deals — pick your plan',
        'pricing.sub': 'Save up to 30% compared to individual program registration',
        'pricing.th1': 'Combo',
        'pricing.th2': 'Content',
        'pricing.th3': 'Price',

        'r.1.name': 'Starter',
        'r.1.badge': '🔥 Popular',
        'r.1.content': 'Developer Foundation + Odoo Developer Foundation',
        'r.1.price': '6M VND',

        'r.2.name': 'Professional',
        'r.2.badge': 'Best Value',
        'r.2.content': 'Starter + Odoo Advanced Developer',
        'r.2.price': '10M VND',

        'r.3.name': 'Expert',
        'r.3.badge': 'Comprehensive',
        'r.3.content': 'Starter + Advanced + DevOps for Odoo',
        'r.3.price': '14M VND',

        'r.4.name': 'AI Developer',
        'r.4.badge': 'AI',
        'r.4.content': 'AI & Vibe Coding',
        'r.4.price': '6M VND',

        'r.5.name': 'Full Stack Odoo',
        'r.5.badge': 'All-in',
        'r.5.content': 'All 6 programs',
        'r.5.price': '16–18M VND',

        'pricing.btn': 'Register',
        'pricing.btn2': 'Contact',

        'roadmap.tag': 'Learning Path',
        'roadmap.title': '4 Levels — from Foundation to Senior',
        'roadmap.sub': 'Build solid skills through each level, ready for your Odoo career',
        'road.l1.name': 'Level 1 — Foundation',
        'road.l1.badge': 'Code & Odoo',
        'road.l1.detail': 'Developer Foundation + Odoo Developer Foundation — From zero to Junior Odoo Developer. Projects: Customer Management, Student Management.',
        'road.l2.name': 'Level 2 — Developer',
        'road.l2.badge': 'Real Projects',
        'road.l2.detail': 'Odoo Advanced Developer + Business & Functional — Advanced ORM, OWL, Integration, Performance, business processes.',
        'road.l3.name': 'Level 3 — Production',
        'road.l3.badge': 'System Deployment',
        'road.l3.detail': 'DevOps for Odoo — Linux, Docker, Nginx, CI/CD, Backup. Deploy production server.',
        'road.l4.name': 'Level 4 — AI Developer',
        'road.l4.badge': 'Boost with AI',
        'road.l4.detail': 'AI & Vibe Coding Odoo — Prompt Engineering, AI Code Generation, AI Review & Debug, Technical Design. Work 2-3x faster.',
        'road.card1': 'Foundation',
        'road.card1d': 'Code & Odoo',
        'road.card2': 'Developer',
        'road.card2d': 'Real Projects',
        'road.card3': 'Production',
        'road.card3d': 'System Deploy',
        'road.card4': 'AI Developer',
        'road.card4d': 'Boost with AI',

        'why.tag': 'Why Vinc Academy',
        'why.title': 'Learn by doing, ready to work',
        'why.sub': 'No boring theory — every lesson includes exercises and real projects',
        'w.1.title': 'Practice First',
        'w.1.desc': 'Every module has real coding exercises and a final project to build your portfolio.',
        'w.2.title': 'Experienced Mentors',
        'w.2.desc': 'Our team of developers and Odoo consultants have years of real-world business experience.',
        'w.3.title': 'Always Supported',
        'w.3.desc': 'Dedicated student group, instructors answer questions within the day.',
        'w.4.title': 'Clear Roadmap',
        'w.4.desc': 'Know exactly what to learn next, never get lost in the sea of knowledge.',
        'w.5.title': 'Mentor 1-1',
        'w.5.desc': 'Direct support from instructors, daily Q&A, personalized learning path.',
        'w.6.title': 'Updated Content',
        'w.6.desc': 'Content is updated with the latest technology versions.',

        'faq.tag': 'FAQ',
        'faq.title': 'Frequently Asked Questions',
        'faq.sub': 'Common questions from our students',
        'faq.q1': 'Can I join Developer Foundation with no programming experience?',
        'faq.a1': 'Absolutely. Developer Foundation is designed from absolute zero — starting with Python basics, no prior experience required. Just a computer and internet connection.',
        'faq.q2': 'Online or offline classes?',
        'faq.a2': 'Vinc Academy trains online via video lessons and interactive live sessions. Students can review anytime, no fixed schedule. Private group for continuous support.',
        'faq.q3': 'Can I get a job after Odoo Developer Foundation?',
        'faq.a3': 'Yes. Odoo Developer Foundation teaches you to write modules, customize the system, and understand Odoo architecture — enough to apply as a Junior Odoo Developer. For advanced roles, continue with Advanced or DevOps.',
        'faq.q4': 'How long does each program take?',
        'faq.a4': 'Developer Foundation: 8–10 sessions, Odoo Foundation: 5–6, Advanced: 6–8, DevOps: 4–5, AI & Vibe Coding: 4–5. Average 4–8 weeks with 1–2 hours daily. No deadline, learn at your own pace.',

        'register.tag': 'Registration',
        'register.title': '3 Simple Steps to Start',
        'register.sub': 'Pick a combo — transfer — start learning today',
        'reg.step1': 'Choose your combo',
        'reg.desc1': 'Check the pricing table or pick individual programs. Not sure? Message us on Zalo for free consultation.',
        'reg.tag1': 'Free consultation',
        'reg.step2': 'Transfer tuition',
        'reg.desc2': 'Transfer the exact amount for your chosen combo. Include: <strong>Full name + Phone + Combo name</strong>.',
        'reg.tag2': 'Confirm within 24h',
        'reg.step3': 'Get access & start',
        'reg.desc3': 'After payment confirmation, you will receive course access via Zalo or Email. Learn immediately, no time limit.',
        'reg.tag3': 'Lifetime access',

        'reg.suggest.title': '💡 Recommended for beginners',
        'reg.suggest.desc': '<strong>Starter</strong> combo (6M VND) — includes Developer Foundation + Odoo Developer Foundation. Best for starting from zero.',
        'reg.pay.title': 'Account Info',
        'reg.pay.bank': 'Bank',
        'reg.pay.bankV': 'TECHCOMBANK',
        'reg.pay.acc': 'Account No.',
        'reg.pay.accV': '0987654321',
        'reg.pay.name': 'Account Holder',
        'reg.pay.nameV': 'DAM CONG HIEN',
        'reg.pay.zalo': 'Zalo Contact',
        'reg.pay.zaloV': '036 3729 276',
        'reg.transfer': 'Transfer content: <strong>Full name + Phone + Combo name</strong>',
        'reg.btn': 'Register via Zalo · 036 3729 276',
        'reg.note': 'After transfer, message via Zalo to activate',
        'reg.card.title': 'Register',
        'reg.card.sub': 'Transfer to activate your account',
        'page.title': 'Vinc Academy — Hands-on Programming Training',

        'footer': 'Vinc Academy',
        'footer.right': '© 2025 Vinc Academy',
    }
};

let currentLang = localStorage.getItem('va-lang') || 'vi';

function applyLang() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (i18n[currentLang] && i18n[currentLang][key]) {
            el.textContent = i18n[currentLang][key];
        }
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.dataset.i18nHtml;
        if (i18n[currentLang] && i18n[currentLang][key]) {
            el.innerHTML = i18n[currentLang][key];
        }
    });
    const btn = document.querySelector('.lang-toggle');
    if (btn) btn.textContent = currentLang === 'vi' ? 'EN' : 'VI';

    // Update expand button text
    const expandBtn = document.querySelector('.expand-btn');
    if (expandBtn) {
        const isExpanded = expandBtn.dataset.expanded === 'true';
        const key = isExpanded ? 'programs.collapse' : 'programs.expand';
        expandBtn.textContent = i18n[currentLang][key];
    }
}

function toggleLang() {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';
    localStorage.setItem('va-lang', currentLang);
    applyLang();
}

document.addEventListener('DOMContentLoaded', applyLang);

// Scroll spy
const spySections = document.querySelectorAll('section[id]');
const spyLinks = document.querySelectorAll('.nav-links a');
const spyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            spyLinks.forEach(link => link.classList.remove('active'));
            const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.3 });
spySections.forEach(s => spyObserver.observe(s));