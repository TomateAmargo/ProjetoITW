$(document).ready(function () {
    const themeToggle = $('#themeToggle');
    const themeLabel = $('#themeLabel');
    const languageSelect = $('#languageSelect');

    // Load saved preferences
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLanguage = localStorage.getItem('language') || 'en';

    // Apply saved theme
    if (savedTheme === 'dark') {
        $('body').attr('data-bs-theme', 'dark');
        themeToggle.prop('checked', true);
        themeLabel.text('Dark Mode');
    }

    // Set saved language
    languageSelect.val(savedLanguage);

    // Toggle theme
    themeToggle.on('change', function () {
        if ($(this).is(':checked')) {
            $('body').attr('data-bs-theme', 'dark');
            themeLabel.text('Dark Mode');
            localStorage.setItem('theme', 'dark');
        } else {
            $('body').attr('data-bs-theme', 'light');
            themeLabel.text('Light Mode');
            localStorage.setItem('theme', 'light');
        }
    });

    // Update language
    languageSelect.on('change', function () {
        const selectedLanguage = $(this).val();
        localStorage.setItem('language', selectedLanguage);
    });
});