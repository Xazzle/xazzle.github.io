// Simulate user data (normally fetched from a server or stored in localStorage)
const name = localStorage.getItem('userName') || "John Doe";
const Email = localStorage.getItem('userEmail') || "example@example.com";

// Display user info
document.getElementById('user-name').textContent = name;
document.getElementById('user-email').textContent = Email;
// Получаем элемент списка избранных альбомов
const likedAlbumsList = document.getElementById('liked-albums-list');

// Функция для получения списка избранных альбомов
function getLikedAlbums() {
    return JSON.parse(localStorage.getItem('likedAlbums')) || [];
}

// Функция для обновления отображения списка альбомов
function renderLikedAlbums() {
    const likedAlbums = getLikedAlbums();
    likedAlbumsList.innerHTML = ''; // Очищаем список

    likedAlbums.forEach(album => {
        const listItem = document.createElement('li');
        listItem.textContent = `${album.title} by ${album.artist}`;
        likedAlbumsList.appendChild(listItem);
    });
}

// Отображаем список избранных альбомов
renderLikedAlbums();


// Theme toggle functionality (reuse your existing code)
function toggleTheme(theme) {
    const body = document.body;
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}
// Найти все элементы FAQ
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question'); // Вопрос
    const answer = item.querySelector('.answer'); // Ответ

    question.addEventListener('click', () => {
        // Переключить видимость ответа
        answer.classList.toggle('d-none');
    });
});


