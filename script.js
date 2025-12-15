function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    const mobileSearch = document.querySelector('.mobile-container');
    nav.classList.toggle('active');
    mobileSearch.style.display = nav.classList.contains('active') ? 'flex' : 'none';
}
document.getElementById('searchButton').addEventListener('click', function() {
    // Get the value from the search input field
    const searchValue = document.getElementById('searchInput').value.trim();
    
    // If the search field is not empty
    if (searchValue !== "") {
        // Redirect to the new HTML page with the search value
        // Example: Redirects to 'Mathematics.html' or 'Science.html'
        window.location.href = "./assets/codes/paper.html?subject="+searchValue;
    } else {
        alert('Please enter a search term!');
    }
});