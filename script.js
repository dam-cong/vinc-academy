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
        'nav.why': 'Quyền lợi',
        'nav.faq': 'FAQ',
        'nav.certificate': 'Chứng chỉ',

        'verify.subtitle': 'Vinc Academy Verification System',
        'verify.title': 'XÁC MINH CHỨNG NHẬN HOÀN THÀNH KHÓA HỌC',
        'verify.desc': 'Tra cứu nhanh và chính xác văn bằng, chứng chỉ được cấp bởi Vinc Academy. Nhập mã số chứng chỉ ở khung bên dưới để xác thực trực tuyến.',
        'verify.placeholder': 'Nhập mã chứng chỉ (Ví dụ: VINC-2026-PY01)...',
        'verify.btn': 'Tra cứu',
        'verify.sampleLabel': 'Mã thử nghiệm nhanh: ',
        'verify.found': 'Tìm thấy chứng nhận! Đang chuyển hướng...',
        'verify.invalid': 'Mã chứng nhận không hợp lệ. Vui lòng kiểm tra lại!',
        'verify.empty': 'Vui lòng nhập mã chứng nhận.',
        'verify.sampleSelected': 'Đã chọn mã mẫu: {code}. Bấm nút "Tra cứu" để xác minh.',

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

        'instructor.tag': 'Giảng viên',
        'instructor.name': 'Đàm Công Hiến',
        'instructor.badge': 'Giảng viên tại Vinc Academy',
        'instructor.desc1': '<strong>Đàm Công Hiến</strong> là <strong>Senior Odoo Developer</strong> và giảng viên tại Vinc Academy với <strong>hơn 5 năm kinh nghiệm</strong> phát triển và triển khai các giải pháp ERP trên nền tảng Odoo. Anh có chuyên môn về <strong>Python, PostgreSQL, DevOps</strong>, phát triển module Odoo, tích hợp hệ thống, tối ưu hiệu năng, triển khai Docker, xây dựng CI/CD và tư vấn chuyển đổi số cho doanh nghiệp.',
        'instructor.desc2': 'Anh đã trực tiếp <strong>đào tạo hơn 100 thực tập sinh và lập trình viên Python Odoo</strong>, áp dụng phương pháp <strong>Learning by Doing</strong> với các dự án thực tế, giúp học viên nhanh chóng làm chủ Odoo và sẵn sàng tham gia các dự án triển khai ngay sau khóa học.',
        'instructor.quote': '"Biết làm mới là biết thật — và Odoo là cách nhanh nhất để chạm vào doanh nghiệp."',
        'instructor.stat1num': '5+', 'instructor.stat1': 'Năm kinh nghiệm',
        'instructor.stat2num': '100+', 'instructor.stat2': 'Học viên',
        'instructor.stat3num': '6', 'instructor.stat3': 'Chương trình',

        'programs.tag': 'Chương trình đào tạo',
        'programs.title': '6 chương trình Odoo thực chiến',
        'programs.sub': 'Từ nền tảng lập trình đến AI — lộ trình bài bản cho mọi cấp độ',

        'p.1.num': 'Nền tảng lập trình',
        'p.1.title': 'Developer Foundation',
        'p.1.target': 'Người mới · Sinh viên CNTT · Chuyển ngành',
        'p.1.duration': '⏱ 5 buổi',
        'p.1.c.1': '<strong>Python</strong> — Fundamentals, Function, OOP',
        'p.1.c.2': '<strong>PostgreSQL</strong> — Database, SQL, JOIN',
        'p.1.c.3': '<strong>Git & GitHub</strong> — Workflow, Branch, Merge',
        'p.1.c.4': '<strong>Dự án:</strong> Customer Management',
        'p.1.outcome': '✅ Python · SQL · Git · Mini Project',
        'p.1.badge': '🔥 Nền tảng',

        'p.2.num': 'Junior Odoo Developer',
        'p.2.title': 'Odoo Developer Foundation',
        'p.2.target': 'Đã có nền tảng lập trình',
        'p.2.duration': '⏱ 8 buổi',
        'p.2.c.1': 'Odoo Architecture · MVC · Module · Manifest',
        'p.2.c.2': 'ORM · Models · Fields · Relations',
        'p.2.c.3': 'Views · Business Logic · Security · Report',
        'p.2.c.4': '<strong>Dự án:</strong> Training Management System (TMS)',
        'p.2.outcome': '✅ Module Odoo · Security · PDF Report · Website · Portfolio TMS',
        'p.2.badge': '🔥 Cốt lõi',

        'p.3.num': 'Làm việc cùng AI',
        'p.3.title': 'AI & Vibe Coding Odoo',
        'p.3.target': 'Đã biết Odoo · Muốn tăng năng suất',
        'p.3.duration': '⏱ 5 buổi',
        'p.3.c.1': 'Prompt Engineering · AI Pair Programming',
        'p.3.c.2': 'AI Code Generation · Review · Refactor · Debug',
        'p.3.c.3': 'Technical Design · Documentation',
        'p.3.c.4': 'Tool: ChatGPT · Claude · Cursor · OpenCode',
        'p.3.c.5': '<strong>Dự án:</strong> Phát triển module bằng AI',
        'p.3.outcome': '✅ Tăng tốc 2-5 lần · AI Code · Review · Project',
        'p.3.badge': '✨ AI',

        'p.4.num': 'Nghiệp vụ',
        'p.4.title': 'Odoo Business & Functional',
        'p.4.target': 'Developer · BA · Functional Consultant · PM',
        'p.4.duration': '⏱ 8 buổi',
        'p.4.c.1': 'CRM · Sales · Purchase · Inventory · Accounting',
        'p.4.c.2': 'HR · Project · Business Analysis · Documentation',
        'p.4.c.3': '<strong>Dự án:</strong> Phân tích & thiết kế giải pháp doanh nghiệp',
        'p.4.outcome': '✅ ERP Process · BA · BRD · Solution Design · Gap Analysis',
        'p.4.badge': 'Nghiệp vụ',

        'p.5.num': 'Nâng cao',
        'p.5.title': 'Odoo Advanced Developer',
        'p.5.target': 'Odoo Developer 6 tháng+ kinh nghiệm',
        'p.5.duration': '⏱ 8 buổi',
        'p.5.c.1': 'Advanced ORM · SQL Optimization · Multi Company',
        'p.5.c.2': 'API Integration · Cron Job · Queue Job · Testing',
        'p.5.c.3': 'OWL · POS · Performance',
        'p.5.c.4': '<strong>Dự án:</strong> HR Management hoặc CRM',
        'p.5.outcome': '✅ Advanced ORM · API · OWL · Performance · Testing',
        'p.5.badge': 'Chuyên sâu',

        'p.6.num': 'Vận hành',
        'p.6.title': 'DevOps for Odoo',
        'p.6.target': 'Odoo Developer · Technical Consultant · System Admin',
        'p.6.duration': '⏱ 5 buổi',
        'p.6.c.1': 'Linux · Docker · PostgreSQL',
        'p.6.c.2': 'Nginx · SSL · Odoo Deployment',
        'p.6.c.3': 'Backup · Monitoring · CI/CD',
        'p.6.c.4': '<strong>Dự án:</strong> Deploy Production Server',
        'p.6.outcome': '✅ Production Server · Docker · Nginx · Backup · CI/CD',
        'p.6.badge': 'Triển khai',

        'programs.expand': '+ Xem thêm 3 chương trình',
        'programs.collapse': '− Thu gọn',
        'p.free': 'trong combo',
        'p.detail': '📖 Xem chi tiết',

        'pricing.tag': 'Học phí',
        'pricing.title': 'Nhận thông tin học phí từ Vinc Academy',
        'pricing.sub': 'Giảm 10% khi đăng ký hôm nay — nhắn Zalo để nhận báo giá chi tiết',
        'pricing.promo': '🎉 Giảm 10% học phí khi đăng ký ngay hôm nay',
        'pricing.listTitle': '5 combo đào tạo Odoo thực chiến',

        'r.1.name': 'Bắt đầu',
        'r.1.badge': '🔥 Phổ biến',
        'r.1.content': 'Developer Foundation + Odoo Developer Foundation',
        'r.2.name': 'Chuyên nghiệp',
        'r.2.badge': 'Tiết kiệm nhất',
        'r.2.content': 'Bắt đầu + Odoo Advanced Developer',

        'r.3.name': 'Chuyên gia',
        'r.3.badge': 'Toàn diện',
        'r.3.content': 'Bắt đầu + Advanced + DevOps for Odoo',

        'r.4.name': 'AI Developer',
        'r.4.badge': 'AI',
        'r.4.content': 'AI & Vibe Coding',

        'r.5.name': 'Full Stack Odoo',
        'r.5.badge': 'Trọn gói',
        'r.5.content': 'Toàn bộ 6 chương trình',

        'pricing.btn': '📱 Nhận báo giá qua Zalo',
        'pricing.formBtn': '📝 Đăng ký qua Google Form',

        'roadmap.tag': 'Lộ trình học tập',
        'roadmap.title': '6 cấp độ — từ Foundation đến Senior',
        'roadmap.sub': 'Xây dựng kỹ năng vững chắc qua từng cấp độ, sẵn sàng cho sự nghiệp Odoo',
        'road.l1.name': 'L1 — Nền tảng',
        'road.l1.badge': 'Developer Foundation',
        'road.l1.detail': 'Python, PostgreSQL, Git — Mini Project: Customer Management. Sẵn sàng học Odoo.',
        'road.l2.name': 'L2 — Odoo Developer',
        'road.l2.badge': 'Junior Odoo Developer',
        'road.l2.detail': 'Odoo Architecture, ORM, Views, Security, Report, Website. Dự án: Training Management System.',
        'road.l3.name': 'L3 — AI Developer',
        'road.l3.badge': 'AI-Enhanced Developer',
        'road.l3.detail': 'Prompt Engineering, AI Pair Programming, AI Review & Debug. Tăng tốc phát triển 2-5 lần.',
        'road.l4.name': 'L4 — BA / Functional',
        'road.l4.badge': 'Functional Consultant',
        'road.l4.detail': 'ERP Process, CRM, Sales, Inventory, Accounting, BA, BRD, Solution Design. Tham gia triển khai dự án.',
        'road.l5.name': 'L5 — Advanced Dev',
        'road.l5.badge': 'Senior Developer',
        'road.l5.detail': 'Advanced ORM, API Integration, OWL, Performance, Testing. Phát triển dự án Enterprise.',
        'road.l6.name': 'L6 — DevOps',
        'road.l6.badge': 'DevOps Engineer',
        'road.l6.detail': 'Linux, Docker, Nginx, SSL, Backup, Monitoring, CI/CD. Triển khai Production Server.',
        'road.card1': 'Nền tảng',
        'road.card1d': 'Python · SQL · Git',
        'road.card2': 'Odoo Core',
        'road.card2d': 'Junior Odoo Developer',
        'road.card3': 'AI',
        'road.card3d': 'AI-Enhanced Developer',
        'road.card4': 'BA / Functional',
        'road.card4d': 'Functional Consultant',
        'road.card5': 'Advanced',
        'road.card5d': 'Senior Developer',
        'road.card6': 'DevOps',
        'road.card6d': 'Production Deployment',

        'why.tag': 'Tại sao chọn Vinc Academy',
        'why.title': 'Đào tạo như doanh nghiệp phần mềm',
        'why.sub': 'Không chỉ học code — học quy trình phát triển sản phẩm thực tế',
        'why.brandPromise': 'Không chỉ dạy bạn viết code — Vinc Academy đào tạo bạn trở thành Developer có thể tham gia dự án thực tế ngay sau khi hoàn thành khóa học.',
        'w.1.title': 'Học như đi làm tại doanh nghiệp',
        'w.1.desc': 'Làm việc theo đúng quy trình phát triển phần mềm: từ phân tích yêu cầu, lập kế hoạch, viết code, review code đến triển khai và vận hành hệ thống.',
        'w.2.title': 'Tích lũy kinh nghiệm thực chiến',
        'w.2.desc': 'Thay vì mất nhiều tháng đi thực tập, bạn được thực hành trên dự án mô phỏng sát môi trường doanh nghiệp, xây dựng kinh nghiệm ngay từ ngày đầu.',
        'w.3.title': 'Giảng viên là Developer thực tế',
        'w.3.desc': 'Senior Odoo Developer và Technical Consultant đang trực tiếp triển khai dự án cho doanh nghiệp — kiến thức cập nhật, kinh nghiệm thực tế.',
        'w.4.title': 'Học quy trình phát triển hiện đại',
        'w.4.desc': 'Git, Agile/Scrum, Code Review, Docker, CI/CD, Linux, PostgreSQL — những kỹ năng doanh nghiệp yêu cầu nhưng ít trung tâm đào tạo bài bản.',
        'w.5.title': 'Xây dựng Portfolio chuyên nghiệp',
        'w.5.desc': 'Mỗi khóa học có mini project và dự án cuối khóa. Sau khi hoàn thành, bạn sở hữu portfolio và source code để ứng tuyển.',
        'w.6.title': 'Lộ trình rõ ràng đến Developer',
        'w.6.desc': 'Chương trình thiết kế theo từng giai đoạn với mục tiêu cụ thể, giúp bạn biết chính xác học gì, làm gì và đạt được kỹ năng nào.',
        'w.7.title': 'Mentor đồng hành xuyên suốt',
        'w.7.desc': 'Giảng viên và mentor theo sát quá trình học, hỗ trợ giải đáp, review code và định hướng phát triển cá nhân.',
        'w.8.title': 'Nội dung cập nhật theo doanh nghiệp',
        'w.8.desc': 'Giáo trình được cập nhật liên tục theo phiên bản mới của Python, Odoo, PostgreSQL, Docker, DevOps — bám sát nhu cầu tuyển dụng.',
        'w.9.title': 'Cộng đồng học viên',
        'w.9.desc': 'Tham gia cộng đồng học viên Vinc Academy, trao đổi kiến thức, chia sẻ kinh nghiệm và hỗ trợ lẫn nhau trong suốt quá trình học.',
        'cv.1': 'Learn by Building — Học qua xây dựng sản phẩm thực tế',
        'cv.2': 'Learn by Doing — Thực hành là trọng tâm',
        'cv.3': 'Learn with Mentors — Đồng hành cùng chuyên gia',
        'cv.4': 'Learn like a Software Company — Quy trình chuyên nghiệp',
        'cv.5': 'Learn for Your Career — Phát triển sự nghiệp bền vững',

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
        'faq.a4': 'Developer Foundation: 5 buổi, Odoo Foundation: 8 buổi, AI & Vibe Coding: 5 buổi, Business & Functional: 8 buổi, Advanced: 8 buổi, DevOps: 5 buổi. Trung bình 4–8 tuần nếu học đều đặn 1–2 giờ mỗi ngày. Không có deadline, học viên hoàn toàn chủ động thời gian.',

        'nav.register': 'Đăng ký ngay',

        'register.tag': 'Đăng ký học',
        'register.title': '3 bước bắt đầu đơn giản',
        'register.sub': 'Chọn combo — nhận tư vấn — bắt đầu học ngay',
        'reg.step1': 'Chọn combo phù hợp',
        'reg.desc1': 'Xem danh sách combo phía trên hoặc chọn chương trình riêng lẻ. Nếu chưa chắc, nhắn Zalo để được tư vấn miễn phí.',
        'reg.tag1': 'Tư vấn miễn phí',
        'reg.step2': 'Nhận tư vấn và báo giá',
        'reg.desc2': 'Nhắn tin qua Zalo, đội ngũ Vinc Academy sẽ tư vấn lộ trình phù hợp và gửi báo giá chi tiết trong vòng 24h.',
        'reg.tag2': 'Tư vấn miễn phí',
        'reg.step3': 'Nhận thông tin & bắt đầu học',
        'reg.desc3': 'Sau khi nhận báo giá và xác nhận, bạn sẽ được hướng dẫn chi tiết và bắt đầu học ngay. Không giới hạn thời gian.',
        'reg.tag3': 'Truy cập mãi mãi',
        'reg.card.title': 'Đăng ký học',
        'reg.card.sub': 'Liên hệ ngay để nhận ưu đãi',
        'reg.suggest.desc': '💡 Combo <strong>Bắt đầu</strong> — dành cho người mới, đã bao gồm Developer Foundation + Odoo Developer Foundation. Phù hợp nhất để bắt đầu từ con số 0.',
        'reg.card.text': 'Nhắn tin qua Zalo, đội ngũ Vinc Academy sẽ <strong>tư vấn miễn phí</strong> và gửi <strong>báo giá chi tiết</strong> trong vòng 24h.',
        'reg.card.benefits': '✅ Tư vấn lộ trình phù hợp<br>✅ Báo giá chi tiết theo combo<br>✅ Giảm 10% khi đăng ký hôm nay',
        'reg.btn': 'Nhắn tin Zalo ngay · 036 3729 276',
        'reg.formBtn': '📝 Đăng ký qua Google Form',
        'reg.note': 'Phản hồi trong vòng 24h — Cam kết không spam',
        'page.title': 'Vinc Academy — Đào tạo lập trình thực chiến',

        'footer': 'Vinc Academy',
        'footer.right': '© 2025 Vinc Academy',
    },
    en: {
        'nav.about': 'About',
        'nav.programs': 'Programs',
        'nav.pricing': 'Pricing',
        'nav.roadmap': 'Roadmap',
        'nav.why': 'Benefits',
        'nav.faq': 'FAQ',
        'nav.certificate': 'Certificate',
        'nav.register': 'Register Now',

        'verify.subtitle': 'Vinc Academy Verification System',
        'verify.title': 'VERIFY COURSE COMPLETION CERTIFICATE',
        'verify.desc': 'Quickly and accurately look up diplomas and certificates issued by Vinc Academy. Enter the certificate code in the box below to verify online.',
        'verify.placeholder': 'Enter certificate code (e.g. VINC-2026-PY01)...',
        'verify.btn': 'Verify',
        'verify.sampleLabel': 'Quick sample codes: ',
        'verify.found': 'Certificate found! Redirecting...',
        'verify.invalid': 'Invalid certificate code. Please check again!',
        'verify.empty': 'Please enter a certificate code.',
        'verify.sampleSelected': 'Selected sample code: {code}. Click "Verify" to authenticate.',

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

        'instructor.tag': 'Instructor',
        'instructor.name': 'Đàm Công Hiến',
        'instructor.badge': 'Instructor at Vinc Academy',
        'instructor.desc1': '<strong>Đàm Công Hiến</strong> is a <strong>Senior Odoo Developer</strong> and instructor at Vinc Academy with <strong>over 5 years of experience</strong> developing and deploying ERP solutions on the Odoo platform. His expertise includes <strong>Python, PostgreSQL, DevOps</strong>, Odoo module development, system integration, performance optimization, Docker deployment, CI/CD setup, and digital transformation consulting for businesses.',
        'instructor.desc2': 'He has personally <strong>trained over 100 interns and Python Odoo developers</strong>, applying the <strong>Learning by Doing</strong> approach with real projects, helping students quickly master Odoo and be ready to join deployment projects right after the course.',
        'instructor.quote': '"You only truly know it when you can build it — and Odoo is the fastest way to touch business."',
        'instructor.stat1num': '5+', 'instructor.stat1': 'Years Experience',
        'instructor.stat2num': '100+', 'instructor.stat2': 'Students Trained',
        'instructor.stat3num': '6', 'instructor.stat3': 'Programs',

        'programs.tag': 'Training Programs',
        'programs.title': '6 Hands-on Odoo Programs',
        'programs.sub': 'From programming fundamentals to AI — a structured path for every level',

        'p.1.num': 'Programming Foundation',
        'p.1.title': 'Developer Foundation',
        'p.1.target': 'Beginners · IT Students · Career Switchers',
        'p.1.duration': '⏱ 5 sessions',
        'p.1.c.1': '<strong>Python</strong> — Fundamentals, Function, OOP',
        'p.1.c.2': '<strong>PostgreSQL</strong> — Database, SQL, JOIN',
        'p.1.c.3': '<strong>Git & GitHub</strong> — Workflow, Branch, Merge',
        'p.1.c.4': '<strong>Project:</strong> Customer Management',
        'p.1.outcome': '✅ Python · SQL · Git · Mini Project',
        'p.1.badge': '🔥 Foundation',

        'p.2.num': 'Junior Odoo Developer',
        'p.2.title': 'Odoo Developer Foundation',
        'p.2.target': 'Has programming foundation',
        'p.2.duration': '⏱ 8 sessions',
        'p.2.c.1': 'Odoo Architecture · MVC · Module · Manifest',
        'p.2.c.2': 'ORM · Models · Fields · Relations',
        'p.2.c.3': 'Views · Business Logic · Security · Report',
        'p.2.c.4': '<strong>Project:</strong> Training Management System (TMS)',
        'p.2.outcome': '✅ Odoo Module · Security · PDF Report · Website · TMS Portfolio',
        'p.2.badge': '🔥 Core',

        'p.3.num': 'Working with AI',
        'p.3.title': 'AI & Vibe Coding Odoo',
        'p.3.target': 'Knows Odoo · Wants to boost productivity',
        'p.3.duration': '⏱ 5 sessions',
        'p.3.c.1': 'Prompt Engineering · AI Pair Programming',
        'p.3.c.2': 'AI Code Generation · Review · Refactor · Debug',
        'p.3.c.3': 'Technical Design · Documentation',
        'p.3.c.4': 'Tools: ChatGPT · Claude · Cursor · OpenCode',
        'p.3.c.5': '<strong>Project:</strong> Build module with AI',
        'p.3.outcome': '✅ 2-5x faster · AI Code · Review · Project',
        'p.3.badge': '✨ AI',

        'p.4.num': 'Business',
        'p.4.title': 'Odoo Business & Functional',
        'p.4.target': 'Developer · BA · Functional Consultant · PM',
        'p.4.duration': '⏱ 8 sessions',
        'p.4.c.1': 'CRM · Sales · Purchase · Inventory · Accounting',
        'p.4.c.2': 'HR · Project · Business Analysis · Documentation',
        'p.4.c.3': '<strong>Project:</strong> Business Solution Design & Analysis',
        'p.4.outcome': '✅ ERP Process · BA · BRD · Solution Design · Gap Analysis',
        'p.4.badge': 'Business',

        'p.5.num': 'Advanced',
        'p.5.title': 'Odoo Advanced Developer',
        'p.5.target': 'Odoo Developer 6mo+ experience',
        'p.5.duration': '⏱ 8 sessions',
        'p.5.c.1': 'Advanced ORM · SQL Optimization · Multi Company',
        'p.5.c.2': 'API Integration · Cron Job · Queue Job · Testing',
        'p.5.c.3': 'OWL · POS · Performance',
        'p.5.c.4': '<strong>Project:</strong> HR Management or CRM',
        'p.5.outcome': '✅ Advanced ORM · API · OWL · Performance · Testing',
        'p.5.badge': 'Advanced',

        'p.6.num': 'Operations',
        'p.6.title': 'DevOps for Odoo',
        'p.6.target': 'Odoo Developer · Technical Consultant · System Admin',
        'p.6.duration': '⏱ 5 sessions',
        'p.6.c.1': 'Linux · Docker · PostgreSQL',
        'p.6.c.2': 'Nginx · SSL · Odoo Deployment',
        'p.6.c.3': 'Backup · Monitoring · CI/CD',
        'p.6.c.4': '<strong>Project:</strong> Deploy Production Server',
        'p.6.outcome': '✅ Production Server · Docker · Nginx · Backup · CI/CD',
        'p.6.badge': 'Deploy',

        'programs.expand': '+ View 3 more programs',
        'programs.collapse': '− Collapse',
        'p.free': 'in combo',
        'p.detail': '📖 View details',

        'pricing.tag': 'Tuition',
        'pricing.title': 'Get tuition info from Vinc Academy',
        'pricing.sub': 'Get 10% off when you register today — message Zalo for a detailed quote',
        'pricing.promo': '🎉 10% off tuition when you register today',
        'pricing.listTitle': '5 hands-on Odoo training combos',

        'r.1.name': 'Starter',
        'r.1.badge': '🔥 Popular',
        'r.1.content': 'Developer Foundation + Odoo Developer Foundation',
        'r.2.name': 'Professional',
        'r.2.badge': 'Best Value',
        'r.2.content': 'Starter + Odoo Advanced Developer',

        'r.3.name': 'Expert',
        'r.3.badge': 'Comprehensive',
        'r.3.content': 'Starter + Advanced + DevOps for Odoo',

        'r.4.name': 'AI Developer',
        'r.4.badge': 'AI',
        'r.4.content': 'AI & Vibe Coding',

        'r.5.name': 'Full Stack Odoo',
        'r.5.badge': 'All-in',
        'r.5.content': 'All 6 programs',

        'pricing.btn': '📱 Get a quote via Zalo',
        'pricing.formBtn': '📝 Register via Google Form',

        'roadmap.tag': 'Learning Path',
        'roadmap.title': '6 Levels — from Foundation to Senior',
        'roadmap.sub': 'Build solid skills through each level, ready for your Odoo career',
        'road.l1.name': 'L1 — Foundation',
        'road.l1.badge': 'Developer Foundation',
        'road.l1.detail': 'Python, PostgreSQL, Git — Mini Project: Customer Management. Ready for Odoo.',
        'road.l2.name': 'L2 — Odoo Developer',
        'road.l2.badge': 'Junior Odoo Developer',
        'road.l2.detail': 'Odoo Architecture, ORM, Views, Security, Report, Website. Project: Training Management System.',
        'road.l3.name': 'L3 — AI Developer',
        'road.l3.badge': 'AI-Enhanced Developer',
        'road.l3.detail': 'Prompt Engineering, AI Pair Programming, AI Review & Debug. 2-5x faster development.',
        'road.l4.name': 'L4 — BA / Functional',
        'road.l4.badge': 'Functional Consultant',
        'road.l4.detail': 'ERP Process, CRM, Sales, Inventory, Accounting, BA, BRD, Solution Design.',
        'road.l5.name': 'L5 — Advanced Dev',
        'road.l5.badge': 'Senior Developer',
        'road.l5.detail': 'Advanced ORM, API Integration, OWL, Performance, Testing. Enterprise projects.',
        'road.l6.name': 'L6 — DevOps',
        'road.l6.badge': 'DevOps Engineer',
        'road.l6.detail': 'Linux, Docker, Nginx, SSL, Backup, Monitoring, CI/CD. Production Server deployment.',
        'road.card1': 'Foundation',
        'road.card1d': 'Python · SQL · Git',
        'road.card2': 'Odoo Core',
        'road.card2d': 'Junior Odoo Developer',
        'road.card3': 'AI',
        'road.card3d': 'AI-Enhanced Developer',
        'road.card4': 'BA / Functional',
        'road.card4d': 'Functional Consultant',
        'road.card5': 'Advanced',
        'road.card5d': 'Senior Developer',
        'road.card6': 'DevOps',
        'road.card6d': 'Production Deployment',

        'why.tag': 'Why Vinc Academy',
        'why.title': 'Training like a Software Company',
        'why.sub': 'Not just coding — learn real product development workflows',
        'why.brandPromise': 'We don\'t just teach you to code — Vinc Academy trains you to become a Developer ready for real projects right after the course.',
        'w.1.title': 'Work like in a software company',
        'w.1.desc': 'Follow real development workflows: requirements analysis, planning, coding, code review, deployment, and operations.',
        'w.2.title': 'Real experience from day one',
        'w.2.desc': 'Instead of spending months as an intern, you practice on business-simulated projects and build experience from day one.',
        'w.3.title': 'Instructors are active Developers',
        'w.3.desc': 'Senior Odoo Developers and Technical Consultants currently deploying real business projects — up-to-date knowledge, real experience.',
        'w.4.title': 'Learn modern development workflows',
        'w.4.desc': 'Git, Agile/Scrum, Code Review, Docker, CI/CD, Linux, PostgreSQL — enterprise skills rarely taught in traditional training centers.',
        'w.5.title': 'Build a professional Portfolio',
        'w.5.desc': 'Every course includes mini projects and a final project. Graduate with a portfolio and source code ready for job applications.',
        'w.6.title': 'Clear path to Developer career',
        'w.6.desc': 'Program designed in stages with specific goals — you always know what to learn, what to build, and what skills you\'ll gain.',
        'w.7.title': 'Mentors guide you all the way',
        'w.7.desc': 'Instructors and mentors track your progress, answer questions, review code, and guide your personal development.',
        'w.8.title': 'Content updated for the industry',
        'w.8.desc': 'Curriculum continuously updated with the latest Python, Odoo, PostgreSQL, Docker, DevOps — aligned with hiring needs.',
        'w.9.title': 'Student Community',
        'w.9.desc': 'Join the Vinc Academy student community to exchange knowledge, share experience, and support each other throughout your learning journey.',
        'cv.1': 'Learn by Building — Learn through building real products',
        'cv.2': 'Learn by Doing — Practice is the core',
        'cv.3': 'Learn with Mentors — Alongside industry experts',
        'cv.4': 'Learn like a Software Company — Professional workflow',
        'cv.5': 'Learn for Your Career — Sustainable career growth',

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
        'faq.a4': 'Developer Foundation: 5 sessions, Odoo Foundation: 8, AI & Vibe Coding: 5, Business & Functional: 8, Advanced: 8, DevOps: 5. Average 4–8 weeks with 1–2 hours daily. No deadline, learn at your own pace.',

        'register.tag': 'Registration',
        'register.title': '3 Simple Steps to Start',
        'register.sub': 'Pick a combo — get advice — start learning today',
        'reg.step1': 'Choose your combo',
        'reg.desc1': 'Check the combo list above or pick individual programs. Not sure? Message us on Zalo for free consultation.',
        'reg.tag1': 'Free consultation',
        'reg.step2': 'Get advice & quote',
        'reg.desc2': 'Message us on Zalo, the Vinc Academy team will advise on the right path and send a detailed quote within 24h.',
        'reg.tag2': 'Free consultation',
        'reg.step3': 'Get info & start learning',
        'reg.desc3': 'After receiving the quote and confirming, you will get detailed guidance and start learning right away. No time limit.',
        'reg.tag3': 'Lifetime access',
        'reg.card.title': 'Register',
        'reg.card.sub': 'Contact us now for special offers',
        'reg.suggest.desc': '💡 <strong>Starter</strong> combo — for beginners, includes Developer Foundation + Odoo Developer Foundation. Best for starting from zero.',
        'reg.card.text': 'Message us on Zalo, the Vinc Academy team will provide <strong>free consultation</strong> and send a <strong>detailed quote</strong> within 24h.',
        'reg.card.benefits': '✅ Find the right learning path<br>✅ Detailed quote per combo<br>✅ 10% off when you register today',
        'reg.btn': 'Message us on Zalo · 036 3729 276',
        'reg.formBtn': '📝 Register via Google Form',
        'reg.note': 'Response within 24h — No spam guarantee',
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
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (i18n[currentLang] && i18n[currentLang][key]) {
            el.setAttribute('placeholder', i18n[currentLang][key]);
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

document.addEventListener('DOMContentLoaded', () => {
    applyLang();
    initCertificateSearch();
    initMobileNav();
    initAboutBadge();
});

// ── ABOUT BADGE (mobile tap to show text) ──
function initAboutBadge() {
    const badge = document.querySelector('.about-float-badge');
    if (!badge) return;
    badge.addEventListener('click', () => {
        badge.classList.toggle('show');
    });
}

// ── MOBILE NAV (Hamburger) ──
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        navToggle.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 800) {
            navLinks.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ── FORM MODAL ──
function openFormModal() {
    document.getElementById('formModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeFormModal() {
    const modal = document.getElementById('formModal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeFormModal();
});

// ── CERTIFICATE VERIFY SEARCH ──
function initCertificateSearch() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const feedbackMsg = document.getElementById('feedback-msg');
    const sampleBadges = document.querySelectorAll('.sample-code-badge');

    if (!searchForm || !searchInput) return;

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const certId = searchInput.value.trim().toUpperCase();

        if (!certId) {
            showVerifyFeedback(i18n[currentLang]['verify.empty'], 'error');
            return;
        }

        if (window.certificatesDatabase && window.certificatesDatabase[certId]) {
            showVerifyFeedback(i18n[currentLang]['verify.found'], 'success');
            setTimeout(() => {
                window.location.href = `certificate/certificate.html?id=${certId}`;
            }, 800);
        } else {
            showVerifyFeedback(i18n[currentLang]['verify.invalid'], 'error');
        }
    });

    if (sampleBadges && searchInput) {
        sampleBadges.forEach(badge => {
            badge.addEventListener('click', () => {
                const code = badge.getAttribute('data-code');
                searchInput.value = code;
                searchInput.focus();
                showVerifyFeedback(
                    i18n[currentLang]['verify.sampleSelected'].replace('{code}', code),
                    'success'
                );
            });
        });
    }

    function showVerifyFeedback(text, type) {
        if (!feedbackMsg) return;
        feedbackMsg.innerText = text;
        feedbackMsg.className = `feedback-msg ${type}`;
        feedbackMsg.style.animation = 'none';
        feedbackMsg.offsetHeight; /* trigger reflow */
        feedbackMsg.style.animation = 'fadeInUp 0.3s ease';
    }
}

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