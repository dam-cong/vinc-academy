function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('va-theme', isDark ? 'light' : 'dark');
}

(function () {
    const saved = localStorage.getItem('va-theme');
    if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
})();

function toggleFaq(el) {
    const item = el.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
}

function handleRegister() {
    const name = document.getElementById('reg-name').value.trim();
    const contact = document.getElementById('reg-contact').value.trim();
    if (!name || !contact) {
        alert('Vui lòng điền đầy đủ họ tên và thông tin liên hệ.');
        return;
    }
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
    document.getElementById('reg-name').value = '';
    document.getElementById('reg-contact').value = '';
    document.getElementById('reg-course').value = '';
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});