const path = window.location.pathname;
const isHomePage = path.endsWith("Home") || path.endsWith("Index") || path === "/" || path.endsWith("/");

const newTopicButtonHTML = `
    <button type="button" id="newtopicbtn" class="btn btn-success fw-bold text-uppercase mb-3" data-bs-toggle="modal" data-bs-target="#newTopicModal">
        + Yeni Konu Aç
    </button>
`;

const navbarHTML = `
    <!-- Dikey Navbar -->
    <nav id="vertical-navbar" class="d-none d-lg-flex flex-column p-3">
        <a href="@Url.Action("Home", "Home")" class="navbar-brand text-center align-items-center text-decoration-none mb-3" style="color: var(--nv-text-primary);">
            <div class="vstack gap-2 align-items-center">
                <img src="/iamges/logo.png" alt="ATÜ SOSYAL Logo" width="72" height="72" style="border-radius: 0;">
                <span class="fs-4">ATÜ SOSYAL</span>
            </div>
        </a>
        <hr class="text-secondary">

        ${isHomePage ? newTopicButtonHTML : ''}

        <form class="mb-3" role="search">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Forumda ara..." aria-label="Arama">
                <button class="btn btn-outline-success" type="submit">
                    <i class="bi bi-search"></i>
                </button>
            </div>
        </form>
        <hr class="text-secondary">
        <h5 class="small text-uppercase mb-2" style="color: var(--nv-text-secondary);">Kategoriler</h5>
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item mb-1">
                <a href="#" class="nav-link" aria-current="page">
                    <span class="small-badge" style="background-color: var(--nv-accent-green);"></span>
                    Linux
                </a>
            </li>
            <li class="nav-item mb-1">
                <a href="#" class="nav-link">
                    <span class="small-badge" style="background-color: #0078D4;"></span>
                    Windows
                </a>
            </li>
            <li class="nav-item mb-1">
                <a href="#" class="nav-link">
                    <span class="small-badge" style="background-color: #FFD43B;"></span>
                    Python
                </a>
            </li>
            <li class="nav-item mb-1">
                <a href="#" class="nav-link">
                    <span class="small-badge" style="background-color: #DC3545;"></span>
                    Donanım
                </a>
            </li>
        </ul>

        <hr class="text-secondary">
        <a href="#" class="nav-link" id="theme-toggle-btn">
            <i class="bi bi-sun-fill me-2" id="theme-toggle-icon"></i>
            <span id="theme-toggle-text">Açık Mod</span>
        </a>

        <hr class="text-secondary">
        <div class="dropdown">
            <a href="#" class="nav-link d-flex align-items-center dropdown-toggle" id="dropdownUser1"
                data-bs-toggle="dropdown" aria-expanded="false" style="color: var(--nv-text-primary);">
                <img src="~/images/logo.png" alt="Profil" class="profile-pic-sm me-2">
                <strong id="usernameSpanBottom">Yusuf İpek</strong>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1"
                style="border-radius: 0;">
                <li><a class="dropdown-item" href="@Url.Action("PublicProfile", "PublicProfile")">Profil</a></li>
                <li><a class="dropdown-item" href="#">Ayarlar</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="@Url.Action("Login_Signup", "Login_Signup")" id="logoutButton">Çıkış Yap</a></li>
            </ul>
        </div>
    </nav>

    <!-- Mobil Alt Navbar -->
    <nav id="mobile-bottom-navbar" class="navbar fixed-bottom navbar-dark bg-dark d-lg-none border-top">
        <div class="container-fluid d-flex justify-content-around p-1">
            <a href="index.html#" class="nav-link text-center" style="color: var(--nv-text-primary);">
                <i class="bi bi-house-door-fill fs-4"></i>
                <div style="font-size: 0.7rem;">Ana Sayfa</div>
            </a>
             <a href="#" data-bs-toggle="modal" data-bs-target="#searchModal" class="nav-link text-center" style="color: var(--nv-text-primary);">
                <i class="bi bi-search-heart-fill fs-4"></i>
                <div style="font-size: 0.7rem;">Ara</div>
            </a>
            <a href="#" data-bs-toggle="modal" data-bs-target="#newTopicModal" class="nav-link text-center" style="color: var(--nv-accent-green);">
                <i class="bi bi-plus-square-fill fs-1"></i>
                <div style="font-size: 0.7rem;">Yeni Konu</div>
            </a>
            <a href="@Url.Action("Public_Profile", "Public_Profile")" class="nav-link text-center" style="color: var(--nv-text-primary);">
                <i class="bi bi-person-check-fill fs-4"></i>
                <div style="font-size: 0.7rem;">Hesabım</div>
            </a>
            <a href="#" id="theme-toggle-btn-mobile" class="nav-link text-center" style="color: var(--nv-text-primary);">
                <i class="bi bi-sun-fill fs-4" id="theme-toggle-icon-mobile"></i>
                <div style="font-size: 0.7rem;" id="theme-toggle-text-mobile">Açık Mod</div>
            </a>
        </div>
    </nav>
`;


document.body.insertAdjacentHTML('afterbegin', navbarHTML);

document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active-nav-icon');
            link.classList.add('active');    
            link.style.fontWeight = 'bold';
        }
    });
});