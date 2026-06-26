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