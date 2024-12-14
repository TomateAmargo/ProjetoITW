$(document).ready(function () {
    const themeToggle = $('#themeToggle');
    const themeLabel = $('#themeLabel');
    const languageSelect = $('#languageSelect');
    const logo = $('#paris2024-logo'); // Assuming this is your Olympic logo image element

    // Load saved preferences
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLanguage = localStorage.getItem('language') || 'en';

    // Function to update logo source based on theme
    const updateLogo = (theme) => {
        if (theme === 'dark') {
            logo.attr('src', 'https://static.vecteezy.com/system/resources/previews/022/823/001/non_2x/paris-2024-olympic-games-official-logo-brown-symbol-abstract-design-illustration-with-black-background-free-vector.jpg');
        } else {
            logo.attr('src', 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/2024_Summer_Olympics_logo.svg/640px-2024_Summer_Olympics_logo.svg.png');
        }
    };

    // Apply saved theme
    if (savedTheme === 'dark') {
        $('body').attr('data-bs-theme', 'dark');
        themeToggle.prop('checked', true);
        themeLabel.text('Dark Mode');
        updateLogo('dark'); // Set dark mode logo on load
    } else {
        updateLogo('light'); // Set light mode logo on load
    }

    // Set saved language
    languageSelect.val(savedLanguage);

    // Toggle theme
    themeToggle.on('change', function () {
        if ($(this).is(':checked')) {
            $('body').attr('data-bs-theme', 'dark');
            themeLabel.text('Dark Mode');
            localStorage.setItem('theme', 'dark');
            updateLogo('dark'); // Update logo to dark mode version
        } else {
            $('body').attr('data-bs-theme', 'light');
            themeLabel.text('Light Mode');
            localStorage.setItem('theme', 'light');
            updateLogo('light'); // Update logo to light mode version
        }
    });

    // Update language
    languageSelect.on('change', function () {
        const selectedLanguage = $(this).val();
        localStorage.setItem('language', selectedLanguage);
    });
});
