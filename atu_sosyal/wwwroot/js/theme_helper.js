document.addEventListener("DOMContentLoaded", function () {
    const html = document.documentElement;

    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
        currentTheme = 'dark';
        localStorage.setItem('theme', currentTheme);
    }

    html.setAttribute('data-bs-theme', currentTheme);

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeToggleBtnMobile = document.getElementById('theme-toggle-btn-mobile');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    const themeToggleText = document.getElementById('theme-toggle-text');
    const iconMobile = document.getElementById('theme-toggle-icon-mobile');
    const textMobile = document.getElementById('theme-toggle-text-mobile');

    function updateThemeUI(theme) {
        const isLight = theme === 'light';
        if (themeToggleIcon) {
            themeToggleIcon.classList.toggle('bi-sun-fill', !isLight);
            themeToggleIcon.classList.toggle('bi-moon-fill', isLight);
        }
        if (themeToggleText) {
            themeToggleText.textContent = isLight ? 'Koyu Mod' : 'Açık Mod';
        }
        if (iconMobile) {
            iconMobile.classList.toggle('bi-sun-fill', !isLight);
            iconMobile.classList.toggle('bi-moon-fill', isLight);
        }
        if (textMobile) {
            textMobile.textContent = isLight ? 'Koyu Mod' : 'Açık Mod';
        }
    }
    function toggleTheme(e) {
        e.preventDefault();
        const newTheme = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeUI(newTheme);
    }
    updateThemeUI(currentTheme);

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    if (themeToggleBtnMobile) themeToggleBtnMobile.addEventListener('click', toggleTheme);
});