(() => {
    'use strict';

    const getStoredTheme = () => localStorage.getItem('theme');
    const setStoredTheme = theme => localStorage.setItem('theme', theme);

    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme();
        if (storedTheme) {
            return storedTheme;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const setTheme = theme => {
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme);
        }
    };

    // Sync checkbox state and add event listener
    document.addEventListener('DOMContentLoaded', () => {
        const currentTheme = getPreferredTheme();
        const themeToggleCheckbox = document.querySelector('.input__check');
        themeToggleCheckbox.checked = currentTheme === 'dark';

        themeToggleCheckbox.addEventListener('change', () => {
            const newTheme = themeToggleCheckbox.checked ? 'dark' : 'light';
            setStoredTheme(newTheme);
            setTheme(newTheme);
        });

        // Apply initial theme
        setTheme(currentTheme);
    });
})();
