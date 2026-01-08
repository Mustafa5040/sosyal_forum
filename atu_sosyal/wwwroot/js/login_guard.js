document.addEventListener("DOMContentLoaded", function () {
    const loggedUser = localStorage.getItem('loggedUsername');
    const currentPage = window.location.pathname;

    if (!currentPage.includes("login_signup.html") && !loggedUser) {
        alert("Sayfayaa erişmek için önce giriş yapmalısınız!");
        window.location.href = "login_signup.html"; 
        return;
    }
});

