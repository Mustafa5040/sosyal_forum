if (window.logoutScriptLoaded) {

} else {
    window.logoutScriptLoaded = true;

    document.addEventListener("DOMContentLoaded", function () {
        const loggedUsername = localStorage.getItem('loggedUsername') || 'Misafir';

        const usernameElements = [
            document.getElementById('usernameSpanBottom'),
            document.getElementById('usernameSpanTop'), 
            document.querySelector('.username-display') 
        ];

        usernameElements.forEach(el => {
            if (el) el.textContent = loggedUsername;
        });

        document.addEventListener('click', function (e) {
            const logoutBtn = e.target.closest('#logoutButton') || e.target.closest('.logout-btn');
            if (logoutBtn) {
                e.preventDefault();
                e.stopPropagation();

                localStorage.removeItem('loggedUsername');
                localStorage.removeItem('userToken');  
                localStorage.removeItem('userRole'); 

                alert('Baþarýyla çýkýþ yapýldý!');

                window.location.href = '/Login_Signup/Login_Signup';
            }
        });
    });
}