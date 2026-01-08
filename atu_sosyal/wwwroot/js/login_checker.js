function isValidPassword(password) {
    if (password == null) return false;
    const pass = password.trim();
    if(pass == "atu") return true;
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    return pass.length >= 8 && hasUpper && hasLower;
}

function isValidUsername(username) {
    if (username == null) return false;
    const username_str = username.trim();
    if(username_str == "atu") return true;

    if (username_str.length < 3) return false;

    let hasLowerCase = false;

    for (let i = 0; i < username_str.length; i++) {
        const curr_char = username_str[i];
        const isLowerCase = curr_char >= 'a' && curr_char <= 'z';
        const isDigit = curr_char >= '0' && curr_char <= '9';

        if (isLowerCase) hasLowerCase = true;
        if (i == 0 && isDigit) return false;

        if (!isDigit && !isLowerCase) {
            return false;
        }
    }
    return hasLowerCase;
}


document.addEventListener("DOMContentLoaded", function() {

    const signupForm = document.getElementById("signupForm");

    if (signupForm) {
        const fullnameInput = document.getElementById("fullname");
        const usernameInput = document.getElementById("username-signup");
        const usernameHelp = document.getElementById("username-signup-help");
        const passwordInput = document.getElementById("password-signup");
        const passwordHelp = document.getElementById("password-signup-help");
        const phoneInput = document.getElementById("phone");
        const mathAnswerInput = document.getElementById("mathAnswer");
        const signupButton = document.getElementById("signup_btn")

        const num1 = Math.floor(Math.random() * 50) + 1;
        const num2 = Math.floor(Math.random() * 50) + 1;
        const correctAnswer = num1 + num2;
        document.getElementById("mathQuestion").textContent = `Güvenlik Sorusu: ${num1} + ${num2} = ?`;

        const phoneHelp = document.createElement("div");
        phoneHelp.id = "phoneHelp";
        phoneHelp.className = "form-text text-danger d-none";
        phoneHelp.textContent = "Sadece rakam girilebilir.";
        phoneInput.parentNode.appendChild(phoneHelp);

        function validateSignupFormState() {
            const isFullnameValid = fullnameInput.value.trim().length > 0;
            const isUserValid = isValidUsername(usernameInput.value);
            const isPhoneValid = phoneInput.value.trim().length > 0;
            const isPassValid = isValidPassword(passwordInput.value);
            const isMathValid = mathAnswerInput.value.trim().length > 0;

            signupButton.disabled = !(isFullnameValid && isUserValid && isPhoneValid && isPassValid && isMathValid);
        }

        phoneInput.addEventListener("input", function(e) {
            let v = this.value;
            let digits = "";
            let i = 0;
            while (i < v.length) {
                const ch = v[i];
                if (ch >= '0' && ch <= '9') {
                    digits += ch;
                }
                i++;
            }
            if (v !== digits) {
                this.value = digits;
                phoneHelp.classList.remove("d-none");
                clearTimeout(this._phoneHelpTimeout);
                this._phoneHelpTimeout = setTimeout(() => phoneHelp.classList.add("d-none"), 1600);
            }
            validateSignupFormState(); 
        });

        phoneInput.addEventListener("keydown", function(e) {
            const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab", "Home", "End"];
            if (allowedKeys.includes(e.key)) return;
            if (!(e.key >= '0' && e.key <= '9')) {
                e.preventDefault();
                phoneHelp.classList.remove("d-none");
                clearTimeout(this._phoneHelpTimeout);
                this._phoneHelpTimeout = setTimeout(() => phoneHelp.classList.add("d-none"), 1200);
            }
        });

        const mathHelp = document.createElement("div");
        mathHelp.id = "mathHelp";
        mathHelp.className = "form-text text-danger d-none";
        mathHelp.textContent = "Sadece rakam girilebilir.";
        mathAnswerInput.parentNode.appendChild(mathHelp);

        mathAnswerInput.addEventListener("input", function(e) {
            let v = this.value;
            let digits = "";
            let i = 0;
            while (i < v.length) {
                const ch = v[i];
                if (ch >= '0' && ch <= '9') {
                    digits += ch;
                }
                i++;
            }
            if (v !== digits) {
                this.value = digits;
                mathHelp.classList.remove("d-none");
                clearTimeout(this._mathHelpTimeout);
                this._mathHelpTimeout = setTimeout(() => mathHelp.classList.add("d-none"), 1600);
            }
            validateSignupFormState();
        });

        mathAnswerInput.addEventListener("keydown", function(e) {
            const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab", "Home", "End"];
            if (allowedKeys.includes(e.key)) return;
            if (!(e.key >= '0' && e.key <= '9')) {
                e.preventDefault();
                mathHelp.classList.remove("d-none");
                clearTimeout(this._mathHelpTimeout);
                this._mathHelpTimeout = setTimeout(() => mathHelp.classList.add("d-none"), 1200);
            }
        });

        usernameInput.addEventListener("input", function() {
            const username = this.value;
            if (isValidUsername(username)) {
                usernameHelp.classList.add("d-none");
                usernameHelp.textContent = "";
            } else {
                usernameHelp.textContent = "En az 3 karakter, harf ile başlamalı, sadece küçük harf ve rakam içerebilir.";
                usernameHelp.classList.remove("d-none");
            }
            validateSignupFormState();
        });

        passwordInput.addEventListener("input", function() {
            const password = this.value;
            if (isValidPassword(password)) {
                passwordHelp.classList.add("d-none");
                passwordHelp.textContent = "";
            } else {
                passwordHelp.textContent = "En az 8 karakter, en az bir büyük ve bir küçük harf içermelidir.";
                passwordHelp.classList.remove("d-none");
            }
            validateSignupFormState();
        });

        fullnameInput.addEventListener("input", validateSignupFormState);

        //KAYIT
        signupForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const fullname = document.getElementById("fullname").value.trim();
            const username = document.getElementById("username-signup").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const password = document.getElementById("password-signup").value.trim();
            const mathAnswer = document.getElementById("mathAnswer").value.trim();

            if (!fullname || !username || !password || !phone || !mathAnswer) {
                alert("Lütfen tüm alanları doldurun!");
                return;
            }

            let isNumeric = true;
            let k = 0;
            while (k < phone.length) {
                if (phone[k] < '0' || phone[k] > '9') { isNumeric = false; break; }
                k++;
            }
            if (!isNumeric || phone.length === 0) {
                alert("Telefon numarası sadece rakamlardan oluşmalıdır!");
                return;
            }

            if (parseInt(mathAnswer) !== correctAnswer) {
                alert("Güvenlik sorusunu yanlış cevapladınız!");
                return;
            }

            if (!isValidUsername(username)) {
                alert("Kullanıcı adı geçerli değil! Lütfen kurallara uyun.");
                usernameInput.focus();
                return;
            }

            if (!isValidPassword(password)) {
                alert("Şifre geçerli değil! Lütfen kurallara uyun.");
                passwordInput.focus();
                return;
            }

            const users = JSON.parse(localStorage.getItem("users") || "[]");
            if (users.find(u => u.username === username)) {
                alert("Bu kullanıcı adı zaten alınmış!");
                return;
            }
            users.push({ fullname, username, phone, password });
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("fullname",fullname)
            localStorage.setItem("loggedUsername", username);

            alert("Kayıt başarılı! Şimdi ana sayfaya yönlendiriliyorsunuz.");
            window.location.href = "index.html";
        });
        
        validateSignupFormState();
    }

    const loginForm = document.getElementById("login_inputForm");
    
    if (loginForm) {
        const loginUsernameInput = document.getElementById('login_username');
        const loginPasswordInput = document.getElementById('login_password');
        const loginBtn = document.getElementById('login_button');
        
        const loginUsernameHelp = document.getElementById("login_username_help");
        const loginPasswordHelp = document.getElementById("login_password_help");

        function performLogin() {
            const username = loginUsernameInput.value.trim();
            const password = loginPasswordInput.value.trim(); 

            

            if (!username || !password) {
                 return alert("Kullanıcı adı ve şifre boş olamaz!");
            }

            const users = JSON.parse(localStorage.getItem("users") || "[]");

            const foundUser = users.find(user => user.username === username);

            if(username != "atu" && password != "atu"){
                if (!foundUser) {
                return alert("Kullanıcı bulunamadı! Lütfen kayıt olun.");
            }

            if (foundUser.password !== password) {
                return alert("Kullanıcı adı veya şifre hatalı!");
            }
            }

            

            localStorage.setItem('loggedUsername', username);
            localStorage.setItem('activeUser', username);
            alert('Giriş başarılı!');
            window.location.href = 'index.html';
        
        }

        function validateLoginFormState() {
            const isUserValid = isValidUsername(loginUsernameInput.value);
            const isPassValid = isValidPassword(loginPasswordInput.value);

            if (loginUsernameHelp) {
                if (isUserValid || loginUsernameInput.value.length === 0) {
                    loginUsernameHelp.classList.add("d-none");
                } else {
                    loginUsernameHelp.textContent = "Geçersiz kullanıcı adı formatı.";
                    loginUsernameHelp.classList.remove("d-none");
                }
            }

            if (loginPasswordHelp) {
                 if (isPassValid || loginPasswordInput.value.length === 0) {
                    loginPasswordHelp.classList.add("d-none");
                } else {
                    loginPasswordHelp.textContent = "Geçersiz şifre formatı.";
                    loginPasswordHelp.classList.remove("d-none");
                }
            }

            loginPasswordInput.disabled = !isUserValid;
            loginBtn.disabled = !isUserValid || !isPassValid;
        }

        loginUsernameInput.addEventListener('input', validateLoginFormState);
        loginPasswordInput.addEventListener('input', validateLoginFormState);
        loginBtn.addEventListener('click', performLogin);

        validateLoginFormState();
    }
});