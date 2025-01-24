document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('header').classList.toggle('menu-open');
});

// Close the menu when a link is clicked (for mobile devices)
document.querySelectorAll('header nav a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('header').classList.remove('menu-open');
    });
});