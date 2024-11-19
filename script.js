// Функция для переключения темы
function toggleTheme(theme) {
    const body = document.getElementById('body');
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

// Проверяем сохраненную тему при загрузке страницы
if (localStorage.getItem('theme') === 'dark') {
    document.getElementById('body').classList.add('dark-mode');
}

// Функция для отображения формы регистрации
document.getElementById('signUpBtn').addEventListener('click', () => {
    const authButtons = document.getElementById('auth-buttons');
    authButtons.style.display = 'none'; // Скрываем кнопки "Log In" и "Sign Up"
    
    const formContainer = document.getElementById('auth-form');
    formContainer.innerHTML = `
        <h2>Sign Up</h2>
        <input type="text" id="signup-name" placeholder="Name" required />
        <input type="email" id="signup-email" placeholder="Email" required />
        <input type="password" id="signup-password" placeholder="Password" required />
        <button onclick="signUp()">Sign Up</button>
    `;
    formContainer.style.display = 'flex'; // Показываем форму регистрации
});

// Функция для регистрации пользователя
function signUp() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Проверка формата email с помощью регулярного выражения
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }

    // Проверка длины пароля (минимум 8 символов)
    if (password.length < 8) {
        alert('Password must be at least 8 characters long!');
        return;
    }

    // Проверка сложности пароля (минимум 1 заглавная буква, 1 цифра и 1 специальный символ)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('Password must contain at least one uppercase letter, one number, and one special character!');
        return;
    }

    // Проверка на существование email в localStorage
    const existingUser = JSON.parse(localStorage.getItem(email));
    if (existingUser) {
        alert('This email is already registered!');
    } else {
        const newUser = { name, email, password };
        localStorage.setItem(email, JSON.stringify(newUser));
        alert('Registration successful! You can now log in.');
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        window.location.href = 'main.html'; // Перенаправление на основную страницу после регистрации
    }
}

// Функция для отображения формы логина
document.getElementById('logInBtn').addEventListener('click', () => {
    const authButtons = document.getElementById('auth-buttons');
    authButtons.style.display = 'none'; // Скрываем кнопки "Log In" и "Sign Up"
    
    const formContainer = document.getElementById('auth-form');
    formContainer.innerHTML = `
        <h2>Log In</h2>
        <input type="email" id="login-email" placeholder="Email" required />
        <input type="password" id="login-password" placeholder="Password" required />
        <button onclick="logIn()">Log In</button>
    `;
    formContainer.style.display = 'flex'; // Показываем форму логина
});

// Функция для логина пользователя
function logIn() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const user = JSON.parse(localStorage.getItem(email));

    if (user && user.password === password) {
        alert('Login successful!');
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userEmail', email); // Store the user's email in localStorage
        // Перенаправление на основную страницу после успешного входа
        window.location.href = 'main.html';
    } else {
        alert('Invalid credentials');
    }
}
