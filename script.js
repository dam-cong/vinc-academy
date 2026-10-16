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

// ── I18N ──
const i18n = {
    vi: {
        'nav.about': 'Giới thiệu',
        'nav.programs': 'Chương trình',
        'nav.pricing': 'Học phí',
        'nav.faq': 'FAQ',
        'nav.certificate': 'Chứng chỉ',
        'nav.blog': 'Kiến thức',

        'verify.subtitle': 'Vinc Academy Verification System',
        'verify.title': 'XÁC MINH CHỨNG NHẬN HOÀN THÀNH KHÓA HỌC',
        'verify.desc': 'Tra cứu nhanh và chính xác văn bằng, chứng chỉ được cấp bởi Vinc Academy. Nhập mã số chứng chỉ ở khung bên dưới để xác thực trực tuyến.',
        'verify.placeholder': 'Nhập mã chứng chỉ (VD: HV20260004-C0002)...',
        'verify.btn': 'Tra cứu',
        'verify.found': 'Tìm thấy chứng nhận! Đang chuyển hướng...',
        'verify.invalid': 'Mã chứng nhận không hợp lệ. Vui lòng kiểm tra lại!',
        'verify.empty': 'Vui lòng nhập mã chứng nhận.',
        'verify.invalidFormat': 'Mã chứng chỉ không đúng định dạng. Định dạng đúng: HVxxxxxxxx-Cxxxx',
        'verify.domainError': 'Không thể xác minh chứng chỉ. Vui lòng thử lại sau.',
        'verify.openCert': 'Xem chứng chỉ',
        'verify.copyLink': 'Sao chép liên kết',
        'verify.copied': 'Đã sao chép!',
        'verify.validCert': 'Chứng chỉ hợp lệ',
        'verify.certLink': 'Liên kết chứng chỉ:',

        'hero.badge': 'Đào tạo thực chiến · 100% dự án thật',
        'hero.title': 'Từ sinh viên<br><span class="accent">đến Odoo Developer</span><br>sẵn sàng đi làm',
        'hero.desc': 'Từ Developer Foundation đến AI & Vibe Coding — 6 chương trình Odoo thực chiến, lộ trình rõ ràng, bài tập thực tế, giảng viên kinh nghiệm doanh nghiệp.',
        'hero.btn1': 'Nhận tư vấn miễn phí',
        'hero.btn2': 'Xem lộ trình học',
        'hero.who': 'Bạn đang là ai?',
        'faq.qn': 'Mới ra trường / mới đi làm thì nên bắt đầu từ đâu?',
        'faq.an': 'Chưa biết code: bắt đầu từ L1 Developer Foundation. Đã có nền tảng lập trình: vào thẳng L2 Odoo Developer Foundation. Chọn bộ lọc “Bạn đang là ai?” ở mục Chương trình để xem đúng lộ trình, hoặc nhận tư vấn miễn phí.',
        'f.all': 'Tất cả',
        'f.new': '🎓 Chưa biết code',
        'f.dev': '💻 Biết code, muốn vào Odoo',
        'f.pro': '🚀 Đã làm Odoo',
        'f.search': 'Tìm chương trình...',
        'f.empty': 'Chưa có chương trình phù hợp — thử bỏ bộ lọc hoặc nhận tư vấn miễn phí.',
        'road.start': 'Bắt đầu',
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
        'w.1.title': 'Học như đi làm tại doanh nghiệp',
        'w.1.desc': 'Làm việc theo đúng quy trình phát triển phần mềm: từ phân tích yêu cầu, lập kế hoạch, viết code, review code đến triển khai và vận hành hệ thống.',
        'w.2.title': 'Tích lũy kinh nghiệm thực chiến',
        'w.2.desc': 'Thay vì mất nhiều tháng đi thực tập, bạn được thực hành trên dự án mô phỏng sát môi trường doanh nghiệp, xây dựng kinh nghiệm ngay từ ngày đầu.',
        'w.3.title': 'Giảng viên là Developer thực tế',
        'w.3.desc': 'Senior Odoo Developer và Technical Consultant đang trực tiếp triển khai dự án cho doanh nghiệp — kiến thức cập nhật, kinh nghiệm thực tế.',
        'w.5.title': 'Xây dựng Portfolio chuyên nghiệp',
        'w.5.desc': 'Mỗi khóa học có mini project và dự án cuối khóa. Sau khi hoàn thành, bạn sở hữu portfolio và source code để ứng tuyển.',
        'w.6.title': 'Lộ trình rõ ràng đến Developer',
        'w.6.desc': 'Chương trình thiết kế theo từng giai đoạn với mục tiêu cụ thể, giúp bạn biết chính xác học gì, làm gì và đạt được kỹ năng nào.',
        'w.7.title': 'Mentor đồng hành xuyên suốt',
        'w.7.desc': 'Giảng viên và mentor theo sát quá trình học, hỗ trợ giải đáp, review code và định hướng phát triển cá nhân.',

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

        'nav.register': 'Tư vấn miễn phí',

        'register.tag': 'Học phí & Đăng ký',
        'register.title': 'Chọn combo phù hợp với bạn',
        'register.sub': 'Chọn combo — nhận tư vấn — bắt đầu học',
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
        'reg.social': 'Hoặc chat qua <a href="https://m.me/vinc.academy" target="_blank" rel="noopener">Messenger</a> · theo dõi <a href="https://www.facebook.com/vinc.academy" target="_blank" rel="noopener">Fanpage</a>',
        'page.title': 'Vinc Academy — Đào tạo lập trình thực chiến',
        'about.badge': 'Đang tuyển sinh 2026',
        'faq.q5': 'Học phí bao nhiêu? Có hỗ trợ trả góp không?',
        'faq.a5': 'Học phí tùy theo combo bạn chọn. Nhắn Zalo 036 3729 276 để nhận báo giá chi tiết và các hình thức thanh toán linh hoạt.',
        'footer.verify': 'Tra cứu chứng chỉ',

        'footer': 'Vinc <span>Academy</span>',
        'footer.right': '© 2026 <strong>Vinc Academy</strong>. Bản quyền thuộc về Vinc Academy.<br>Nghiêm cấm sao chép nội dung, giáo trình khi chưa có sự đồng ý bằng văn bản.',
    },
    en: {
        'nav.about': 'About',
        'nav.programs': 'Programs',
        'nav.pricing': 'Tuition',
        'nav.faq': 'FAQ',
        'nav.certificate': 'Certificate',
        'nav.blog': 'Knowledge',
        'nav.register': 'Free Consultation',

        'verify.subtitle': 'Vinc Academy Verification System',
        'verify.title': 'VERIFY COURSE COMPLETION CERTIFICATE',
        'verify.desc': 'Quickly and accurately look up diplomas and certificates issued by Vinc Academy. Enter the certificate code in the box below to verify online.',
        'verify.placeholder': 'Enter certificate code (e.g. HV20260004-C0002)...',
        'verify.btn': 'Verify',
        'verify.found': 'Certificate found! Redirecting...',
        'verify.invalid': 'Invalid certificate code. Please check again!',
        'verify.empty': 'Please enter a certificate code.',
        'verify.invalidFormat': 'Invalid certificate format. Correct format: HVxxxxxxxx-Cxxxx',
        'verify.domainError': 'Unable to verify certificate. Please try again later.',
        'verify.openCert': 'View Certificate',
        'verify.copyLink': 'Copy Link',
        'verify.copied': 'Copied!',
        'verify.validCert': 'Valid Certificate',
        'verify.certLink': 'Certificate link:',

        'hero.badge': 'Hands-on Training · 100% Real Projects',
        'hero.title': 'From student<br><span class="accent">to Odoo Developer</span><br>job-ready',
        'hero.desc': 'From Developer Foundation to AI & Vibe Coding — 6 hands-on Odoo programs, clear roadmap, real projects, industry-experienced instructors.',
        'hero.btn1': 'Get Free Consultation',
        'hero.btn2': 'View Learning Path',
        'hero.who': 'Who are you?',
        'faq.qn': 'Just graduated / new at work — where should I start?',
        'faq.an': 'No coding yet: start with L1 Developer Foundation. Already coding: go straight to L2 Odoo Developer Foundation. Use the “Who are you?” filter in Programs to see your path, or get a free consultation.',
        'f.all': 'All',
        'f.new': '🎓 New to coding',
        'f.dev': '💻 Can code, new to Odoo',
        'f.pro': '🚀 Already on Odoo',
        'f.search': 'Search programs...',
        'f.empty': 'No matching program — clear the filter or get a free consultation.',
        'road.start': 'Start here',
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
        'w.1.title': 'Work like in a software company',
        'w.1.desc': 'Follow real development workflows: requirements analysis, planning, coding, code review, deployment, and operations.',
        'w.2.title': 'Real experience from day one',
        'w.2.desc': 'Instead of spending months as an intern, you practice on business-simulated projects and build experience from day one.',
        'w.3.title': 'Instructors are active Developers',
        'w.3.desc': 'Senior Odoo Developers and Technical Consultants currently deploying real business projects — up-to-date knowledge, real experience.',
        'w.5.title': 'Build a professional Portfolio',
        'w.5.desc': 'Every course includes mini projects and a final project. Graduate with a portfolio and source code ready for job applications.',
        'w.6.title': 'Clear path to Developer career',
        'w.6.desc': 'Program designed in stages with specific goals — you always know what to learn, what to build, and what skills you\'ll gain.',
        'w.7.title': 'Mentors guide you all the way',
        'w.7.desc': 'Instructors and mentors track your progress, answer questions, review code, and guide your personal development.',

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

        'register.tag': 'Tuition & Enrollment',
        'register.title': 'Choose the right combo for you',
        'register.sub': 'Pick a combo — get advice — start learning',
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
        'reg.social': 'Or chat via <a href="https://m.me/vinc.academy" target="_blank" rel="noopener">Messenger</a> · follow our <a href="https://www.facebook.com/vinc.academy" target="_blank" rel="noopener">Fanpage</a>',
        'page.title': 'Vinc Academy — Hands-on Programming Training',
        'about.badge': 'Now enrolling 2026',
        'faq.q5': 'How much is the tuition? Are installments available?',
        'faq.a5': 'Tuition depends on the combo you choose. Message us on Zalo 036 3729 276 for a detailed quote and flexible payment options.',
        'footer.verify': 'Verify Certificate',

        'footer': 'Vinc <span>Academy</span>',
        'footer.right': '© 2026 <strong>Vinc Academy</strong>. All rights reserved.<br>Reproduction of content or course materials without written permission is prohibited.',
    }
};

// Trang bài viết có URL riêng cho từng ngôn ngữ: <html data-lang> quyết định ngôn ngữ
const pageLang = document.documentElement.dataset.lang;
let currentLang = pageLang || localStorage.getItem('va-lang') || 'vi';
if (pageLang) localStorage.setItem('va-lang', pageLang);

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

}

function toggleLang() {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';
    localStorage.setItem('va-lang', currentLang);
    const alt = document.querySelector('.lang-toggle')?.dataset.alt;
    if (alt) return location.assign(alt);
    applyLang();
}

document.addEventListener('DOMContentLoaded', () => {
    applyLang();
    initCertificateSearch();
    initMobileNav();
    initAboutBadge();
    initProgramFilter();
    initPostFilter();
    initViews();
    initBackToTop();
    initSeriesNav();
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
const CERT_BASE_URL = 'https://vinc.editech.vn/vinc/certificate/';
const CERT_REGEX = /^HV\d{8}-C\d{4}$/;

function initCertificateSearch() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const feedbackMsg = document.getElementById('feedback-msg');

    if (!searchForm || !searchInput) return;

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const certId = searchInput.value.trim().toUpperCase();

        if (!certId) {
            showVerifyFeedback(i18n[currentLang]['verify.empty'], 'error');
            return;
        }

        if (!CERT_REGEX.test(certId)) {
            showVerifyFeedback(i18n[currentLang]['verify.invalidFormat'], 'error');
            return;
        }

        const certUrl = CERT_BASE_URL + certId;
        showVerifyFeedback(i18n[currentLang]['verify.found'], 'success');

        fetch(certUrl, { method: 'HEAD', mode: 'no-cors' })
            .then(() => {
                showCertPopup(certId, certUrl);
            })
            .catch(() => {
                showCertPopup(certId, certUrl);
            });
    });


    function showVerifyFeedback(text, type) {
        if (!feedbackMsg) return;
        feedbackMsg.innerText = text;
        feedbackMsg.className = `feedback-msg ${type}`;
        feedbackMsg.style.animation = 'none';
        feedbackMsg.offsetHeight;
        feedbackMsg.style.animation = 'fadeInUp 0.3s ease';
    }
}

function showCertPopup(certId, certUrl) {
    const existing = document.getElementById('cert-result-popup');
    if (existing) existing.remove();

    const t = i18n[currentLang];
    const popup = document.createElement('div');
    popup.id = 'cert-result-popup';
    popup.className = 'cert-result-popup';
    popup.innerHTML = `
        <div class="cert-result-card">
            <button class="cert-result-close" onclick="closeCertPopup()">✕</button>
            <div class="cert-result-icon"><img src="image/vinc-academy.png" alt="Vinc Academy" class="cert-result-logo"></div>
            <h3 class="cert-result-title">${t['verify.validCert']}</h3>
            <div class="cert-result-code"><img src="image/medal.png" alt="medal" class="cert-result-medal"> ${certId}</div>
            <p class="cert-result-link-label">${t['verify.certLink']}</p>
            <div class="cert-result-url">${certUrl}</div>
            <div class="cert-result-actions">
                <button class="cert-result-btn cert-result-btn-copy" onclick="copyCertLink('${certUrl}')">
                    <i class="fa-regular fa-copy"></i> ${t['verify.copyLink']}
                </button>
                <a href="${certUrl}" target="_blank" rel="noopener noreferrer" class="cert-result-btn cert-result-btn-open">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> ${t['verify.openCert']}
                </a>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
    requestAnimationFrame(() => popup.classList.add('show'));
}

function closeCertPopup() {
    const popup = document.getElementById('cert-result-popup');
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
    }
}

function copyCertLink(url) {
    navigator.clipboard.writeText(url).then(() => {
        const btn = document.querySelector('.cert-result-btn-copy');
        if (btn) {
            const t = i18n[currentLang];
            btn.innerHTML = `<i class="fa-solid fa-check"></i> ${t['verify.copied']}`;
            setTimeout(() => {
                btn.innerHTML = `<i class="fa-regular fa-copy"></i> ${t['verify.copyLink']}`;
            }, 2000);
        }
    });
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
// ── LỌC / TÌM CHƯƠNG TRÌNH ──
function initProgramFilter() {
    const cards = [...document.querySelectorAll('.course-card[data-level]')];
    const chips = document.querySelectorAll('.prog-filter .chip');
    const levels = document.querySelectorAll('.level-card[data-level]');
    const q = document.getElementById('prog-search');
    if (!q) return;
    let aud = 'all', lv = '';
    const render = () => {
        const kw = q.value.trim().toLowerCase();
        let n = 0;
        cards.forEach(c => {
            const ok = (aud === 'all' || c.dataset.aud.split(' ').includes(aud))
                && (!lv || c.dataset.level === lv)
                && (!kw || c.textContent.toLowerCase().includes(kw));
            c.hidden = !ok;
            n += ok;
        });
        document.getElementById('prog-empty').hidden = n > 0;
        chips.forEach(c => c.classList.toggle('active', c.dataset.aud === aud));
        levels.forEach(l => l.classList.toggle('active', l.dataset.level === lv));
    };
    chips.forEach(c => c.addEventListener('click', () => { aud = c.dataset.aud; lv = ''; render(); }));
    levels.forEach(l => l.addEventListener('click', () => { lv = lv === l.dataset.level ? '' : l.dataset.level; render(); }));
    q.addEventListener('input', render);
    document.querySelectorAll('.hero-pick [data-pick]').forEach(b => b.addEventListener('click', () => {
        aud = b.dataset.pick; lv = ''; q.value = ''; render();
        document.getElementById('programs').scrollIntoView({ behavior: 'smooth' });
    }));
}

// ── LỌC CHỦ ĐỀ BLOG ──
function initPostFilter() {
    const q = document.getElementById('post-search');
    if (!q) return;
    const items = [...document.querySelectorAll('.post-grid > li')];
    q.addEventListener('input', () => {
        const kw = q.value.trim().toLowerCase();
        items.forEach(li => li.hidden = !!kw && !li.textContent.toLowerCase().includes(kw));
        document.getElementById('post-empty').hidden = items.some(li => !li.hidden);
        document.querySelectorAll('.blog-group').forEach(g => g.hidden = ![...g.querySelectorAll('li')].some(li => !li.hidden));
    });
}

// ── LƯỢT XEM BÀI BLOG (api/views.js) ──
async function initViews() {
    const els = [...document.querySelectorAll('[data-views]')];
    if (!els.length || !/^https?:$/.test(location.protocol)) return els.forEach(e => e.parentElement.hidden = true);
    const hit = document.querySelector('[data-view-hit]')?.dataset.views;
    const key = 'va-viewed-' + hit;
    let post = false;
    try { post = hit && Date.now() - (+localStorage.getItem(key) || 0) > 864e5; } catch {}
    const slugs = [...new Set(els.map(e => e.dataset.views))].join(',');
    let data = {};
    try {
        const r = await fetch('/api/views?slug=' + (post ? hit : slugs), { method: post ? 'POST' : 'GET' });
        data = await r.json();
        if (post) try { localStorage.setItem(key, Date.now()); } catch {}
    } catch {}
    const fmt = new Intl.NumberFormat(document.documentElement.lang);
    els.forEach(e => {
        const n = data[e.dataset.views];
        if (n == null) e.parentElement.hidden = true;
        else e.textContent = fmt.format(n);
    });
    const grid = document.querySelector('.post-grid');
    document.querySelectorAll('.post-sort .chip').forEach(c => c.addEventListener('click', () => {
        document.querySelectorAll('.post-sort .chip').forEach(x => x.classList.toggle('active', x === c));
        const lis = [...grid.children], n = li => +(li.querySelector('[data-views]')?.textContent.replace(/\D/g, '')) || 0;
        const idx = new Map(lis.map((li, i) => [li, i]));
        lis.sort((a, b) => c.dataset.sort === 'top' ? n(b) - n(a) || idx.get(a) - idx.get(b) : idx.get(a) - idx.get(b))
            .forEach(li => grid.appendChild(li));
    }));
}

// ── NÚT LÊN ĐẦU TRANG ──
function initBackToTop() {
    const box = document.querySelector('.chat-bubbles');
    if (!box) return;
    const vi = document.documentElement.lang !== 'en';
    const btn = Object.assign(document.createElement('button'), { type: 'button', hidden: true, className: 'chat-bubble to-top', innerHTML: '<svg class="ring" viewBox="0 0 44 44"><circle class="trk" cx="22" cy="22" r="20"/><circle class="bar" cx="22" cy="22" r="20" pathLength="100"/></svg><svg class="arw" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 15l6-6 6 6"/></svg>' });
    btn.dataset.tip = btn.ariaLabel = vi ? 'Lên đầu trang' : 'Back to top';
    btn.onclick = () => scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    box.prepend(btn);
    const toggle = () => {
        btn.hidden = scrollY < 600;
        btn.style.setProperty('--p', Math.min(100, scrollY / (document.documentElement.scrollHeight - innerHeight) * 100));
    };
    addEventListener('scroll', toggle, { passive: true });
    toggle();
}

// ── MENU SERIES BÊN TRÁI (bài blog) ── [vi file, vi title, en file, en title]; thêm bài mới: thêm 1 dòng
const SERIES_ODOO = [
    ["odoo-la-gi.html", "Odoo là gì? Kiến thức nền tảng cho lập trình viên", "what-is-odoo.html", "What is Odoo? Fundamentals for developers"],
    ["cai-dat-odoo-20.html", "Cài đặt môi trường Odoo 20", "install-odoo-20.html", "Setting up an Odoo 20 environment"],
    ["tao-module-odoo-dau-tien.html", "Tạo module đầu tiên & manifest", "first-odoo-module.html", "Your first module & manifest"],
    ["model-field-orm-odoo.html", "Model, fields & ORM", "models-fields-orm.html", "Models, fields & the ORM"],
    ["phan-quyen-odoo-access-rights-record-rules.html", "Security: access rights & record rules", "odoo-access-rights-record-rules.html", "Security: access rights & record rules"],
    ["view-action-menu-odoo.html", "Views & actions", "odoo-views-actions-menus.html", "Views & actions"],
    ["many2one-one2many-many2many-odoo.html", "Quan hệ giữa các model", "odoo-many2one-one2many-many2many.html", "Relations between models"],
    ["computed-field-onchange-constraint-odoo.html", "Computed fields, onchange & constraints", "odoo-computed-field-onchange-constraints.html", "Computed fields, onchange & constraints"],
    ["ke-thua-model-view-odoo.html", "Kế thừa trong Odoo", "odoo-inheritance-model-view.html", "Inheritance in Odoo"],
    ["bao-cao-pdf-qweb-odoo.html", "Báo cáo PDF với QWeb", "odoo-qweb-pdf-reports.html", "PDF reports with QWeb"],
    ["owl-framework-odoo-co-ban.html", "OWL framework cơ bản", "odoo-owl-framework-basics.html", "OWL framework basics"],
    ["web-controller-json-2-api-odoo.html", "Web controllers & JSON-2 API", "odoo-web-controllers-json-2-api.html", "Web controllers & JSON-2 API"],
    ["unit-test-odoo-transactioncase.html", "Unit test trong Odoo", "odoo-unit-tests-transactioncase.html", "Unit testing in Odoo"],
    ["trien-khai-odoo-production-nginx-workers.html", "Triển khai Odoo production", "odoo-production-deployment-nginx-workers.html", "Deploying Odoo to production"]
];
function initSeriesNav() {
    const layout = document.querySelector('.post-layout');
    const file = location.pathname.split('/').pop();
    const cur = SERIES_ODOO.findIndex(r => r[0] === file || r[2] === file);
    if (!layout || cur < 0) return;
    const en = SERIES_ODOO[cur][2] === file, n = SERIES_ODOO.length;
    const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    let read = [];
    try { read = JSON.parse(localStorage.getItem('va-read-odoo')) || []; } catch {}
    const done = new Set([...read, cur]);
    try { localStorage.setItem('va-read-odoo', JSON.stringify([...done])); } catch {}
    const name = en ? 'Odoo 20 Development A–Z' : 'Lập trình Odoo 20 từ A–Z';
    const side = document.createElement('details');
    side.className = 'series-side';
    side.innerHTML = `<summary><span class="ss-label">SERIES</span><b class="ss-name">${name}</b>
        <span class="ss-count">${en ? 'Part' : 'Bài'} ${cur + 1}/${n}</span>
        <span class="ss-bar"><i style="width:${(cur + 1) / n * 100}%"></i></span></summary>
        <ol>${SERIES_ODOO.map((r, i) => `<li><a href="${r[en ? 2 : 0]}"${i === cur ? ' aria-current="page"' : ''}>
            <span class="ss-n">${String(i + 1).padStart(2, '0')}</span><span class="ss-t">${esc(r[en ? 3 : 1])}</span>${i !== cur && done.has(i) ? '<span class="ss-ok" aria-label="' + (en ? 'read' : 'đã đọc') + '">✓</span>' : ''}</a></li>`).join('')}</ol>
        <a class="ss-all" href="index.html">${en ? 'All posts in this series' : 'Tất cả bài trong series'} →</a>`;
    layout.prepend(side);
    layout.classList.add('has-series');
    const toc = layout.querySelector('.toc'), wide = matchMedia('(min-width: 1000px)'), huge = matchMedia('(min-width: 1600px)');
    const sync = () => {
        side.open = wide.matches;
        if (toc) toc.open = huge.matches;
        side.scrollTop = side.querySelector('[aria-current]').offsetTop - side.clientHeight / 3;
    };
    sync();
    wide.addEventListener('change', sync);
    huge.addEventListener('change', sync);
}
