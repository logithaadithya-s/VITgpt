function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    const mobileSearch = document.querySelector('.mobile-search');
    nav.classList.toggle('active');
    mobileSearch.style.display = nav.classList.contains('active') ? 'flex' : 'none';
}