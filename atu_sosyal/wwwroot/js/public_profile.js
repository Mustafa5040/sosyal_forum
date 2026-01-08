document.addEventListener("DOMContentLoaded", function() {

    const settingsForm = document.getElementById("settingsForm");
    const displayFullname = document.getElementById("displayFullname");
    const displayUsername = document.getElementById("displayUsername");

    const savedFullname = localStorage.getItem('fullname'); 
    
    const savedUsername = localStorage.getItem('loggedUsername'); 

    if (savedFullname) {
        displayFullname.textContent = savedFullname;
        document.getElementById("fullname").value = savedFullname;
    }
    
    if (savedUsername) {
        displayUsername.textContent = savedUsername;
        document.getElementById("username").value = savedUsername;
    }

    settingsForm?.addEventListener("submit", function (e) {
        e.preventDefault();
        const fullname = document.getElementById("fullname").value.trim();
        const username = document.getElementById("username").value.trim();

        localStorage.setItem('fullname', fullname); 
        localStorage.setItem('loggedUsername', username); 
        localStorage.setItem('activeUser', username);

        displayFullname.textContent = fullname;
        displayUsername.textContent = username;

        alert("Profil bilgileri güncellendi");
    });

    document.getElementById("username").addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            alert("Kaydetmek için 'Kaydet' butonuna tıklayın.");
        }
    });

    const profileCard = document.querySelector(".profile-meta .card");
    profileCard?.addEventListener("mouseover", function () {
        this.style.boxShadow = "0 0 20px rgba(255,255,255,0.3)";
    });
    profileCard?.addEventListener("mouseout", function () {
        this.style.boxShadow = "";
    });


    const resetBtn = document.createElement("button");
    resetBtn.className = "btn btn-danger mt-3";
    resetBtn.innerHTML = '<i class="bi bi-trash"></i> Profili Sıfırla';
    settingsForm.appendChild(resetBtn);

    resetBtn.addEventListener("click", function () {
        if (confirm("Tüm profil bilgilerini silmek istediğine emin misin?")) {
            localStorage.clear();
            alert("Profil tamamen sıfırlandı");
            location.reload();
        }
    });


    const currentLogin = localStorage.getItem('loggedUsername');
    const previousLogin = localStorage.getItem('activeUser');

    if (currentLogin && previousLogin && currentLogin !== previousLogin) {
        localStorage.clear();
        localStorage.setItem('activeUser', currentLogin);
        localStorage.setItem('loggedUsername', currentLogin);
    } else if (currentLogin && !previousLogin) {
        localStorage.setItem('activeUser', currentLogin);
    }

    let recentMessages = [];
    let recentTopics = [];

    try {
        recentMessages = JSON.parse(localStorage.getItem('recentMessages')) || [];
    } catch (e) {
        recentMessages = [];
    }

    try {
        recentTopics = JSON.parse(localStorage.getItem('recentTopics')) || [];
    } catch (e) {
        recentTopics = [];
    }

    if (!recentMessages.length) {
        recentMessages = [
            {
                text: "Bu platform harika olmuş, elinize sağlık!",
                topic: "ATÜ Sosyal Genel",
                time: "2 saat önce"
            },
            {
                text: "Endüstri mühendisliği çalışma grubuna katıldım, çok verimli geçti.",
                topic: "Endüstri Mühendisliği",
                time: "Dün"
            },
            {
                text: "Linux kulübü için yeni bir etkinlik planlıyorum.",
                topic: "Linux & Open Source",
                time: "3 gün önce"
            }
        ];
    }

    if (!recentTopics.length) {
        recentTopics = [
            {
                title: "ATÜ'de Verimlilik ve Sürdürülebilirlik Üzerine Sohbet",
                category: "Genel",
                time: "1 saat önce"
            },
            {
                title: "Python ile Veri Analizi Çalışma Grubu",
                category: "Veri & Yazılım",
                time: "Dün"
            },
            {
                title: "Linux Kurulumu ve Terminal 101 Atölyesi",
                category: "Linux",
                time: "Geçen hafta"
            }
        ];
    }

    function renderRecentActivity() {
        const messagesContainer = document.getElementById("recentMessages");
        const topicsContainer = document.getElementById("recentTopics");

        if (!messagesContainer || !topicsContainer) return;

        if (!recentMessages.length) {
            messagesContainer.innerHTML = '<p class="mb-0">Henüz mesajın yok.</p>';
        } else {
            messagesContainer.innerHTML = recentMessages
                .map(msg => `
                    <div class="card mb-2 post-card">
                        <div class="card-body py-2">
                            <div class="small text-white-50 mb-1">${msg.topic || "Genel"}</div>
                            <div>${msg.text}</div>
                            <div class="small text-white-50 mt-1">${msg.time || ""}</div>
                        </div>
                    </div>
                `)
                .join("");
        }

        if (!recentTopics.length) {
            topicsContainer.innerHTML = '<p style="color:var(--nv-text-primary))">Henüz açtığın konu yok.</p>';
        } else {
            topicsContainer.innerHTML = recentTopics
                .map(t => `
                    <div class="card mb-2 post-card card-topic">
                        <div class="card-body py-2">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <strong>${t.title}</strong>
                                <span class="badge bg-warning text-dark">${t.category || ""}</span>
                            </div>
                            <div class="small text-white-50">${t.time || ""}</div>
                        </div>
                    </div>
                `)
                .join("");
        }
    }

    renderRecentActivity();

    
});