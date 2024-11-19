// Получаем элементы переключателя темы и контейнера для темы
const themeToggle = document.querySelector('.theme-toggle');
const themeCircles = document.querySelectorAll('.theme-circle');
const body = document.body;
const albumContainer = document.querySelector('.album-container');

// Функция для включения светлой или тёмной темы
function applyTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
    albumContainer.style.backgroundColor = '#333'; // Серый фон для контейнера альбома
    albumContainer.style.color = '#fff'; // Белый текст для контейнера альбома
  } else {
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
    albumContainer.style.backgroundColor = '#fff'; // Светлый фон для контейнера альбома
    albumContainer.style.color = '#000';
  }
  // Сохраняем выбранную тему в localStorage
  localStorage.setItem('theme', theme);
}

// Проверяем, есть ли сохранённая тема в localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  // Если тема не сохранена, по умолчанию выбираем светлую
  applyTheme('light');
}

// Добавляем обработчики событий на кнопки переключения темы
themeCircles.forEach(circle => {
  circle.addEventListener('click', () => {
    if (circle.classList.contains('light')) {
      applyTheme('light');
    } else {
      applyTheme('dark');
    }
  });
});

// Получаем все кнопки воспроизведения
const playButtons = document.querySelectorAll('.play-button');

// Создаем аудио-объект для воспроизведения песен
const audio = new Audio();

// Массив песен с путями к файлам
const songs = {
  "Starboy": "music/StarboyMusic/StarboyMusic.mp3",
  "Party Monster": "music/StarboyMusic/Party Monster.mp3",
  "False Alarm": "music/StarboyMusic/FalseAlarm.mp3",
  "Reminder": "music/StarboyMusic/Reminder.mp3",
  "Rockin'": "music/StarboyMusic/Rockin.mp3"
};

// Переменная для отслеживания текущей песни
let currentSong = null;

// Добавляем обработчики событий для каждой кнопки
playButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const songTitle = button.previousElementSibling.textContent; // Получаем название песни
    const songSrc = songs[songTitle]; // Находим путь к песне в массиве

    // Если выбрана новая песня
    if (currentSong !== songSrc) {
      currentSong = songSrc; // Сохраняем текущую песню
      audio.src = songSrc; // Устанавливаем новый источник
      audio.play(); // Воспроизводим песню
      updateButtons(button); // Обновляем состояние кнопок
    } else {
      // Если песня уже выбрана
      if (audio.paused) {
        audio.play(); // Продолжаем воспроизведение
        updateButtons(button);
      } else {
        audio.pause(); // Ставим на паузу
        resetButtons(); // Сбрасываем кнопки
      }
    }
  });
});

// Обновление состояния кнопок (▶ → ❚❚)
function updateButtons(button) {
  resetButtons(); // Сбрасываем все кнопки
  button.textContent = "❚❚"; // Устанавливаем значок паузы
}

// Сброс всех кнопок в состояние "▶"
function resetButtons() {
  playButtons.forEach(button => (button.textContent = "▶"));
}

// Слушаем завершение аудио
audio.addEventListener('ended', () => {
  resetButtons(); // Сбрасываем кнопки, когда песня закончится
  currentSong = null; // Сбрасываем текущую песню
});
// Получаем элемент сердечка
const albumHeart = document.querySelector('#heart');

// Информация об альбоме
const albumInfo = {
    title: document.querySelector('.album-info h1').textContent, // Название альбома
    artist: document.querySelector('.album-info p').textContent.split(': ')[1], // Исполнитель
};

// Функция для получения списка избранных альбомов
function getLikedAlbums() {
    return JSON.parse(localStorage.getItem('likedAlbums')) || [];
}

// Функция для проверки, добавлен ли альбом в избранное
function isAlbumLiked(album) {
    const likedAlbums = getLikedAlbums();
    return likedAlbums.some(likedAlbum => likedAlbum.title === album.title);
}

// Функция для добавления альбома в избранное
function addAlbumToFavorites(album) {
    const likedAlbums = getLikedAlbums();
    likedAlbums.push(album);
    localStorage.setItem('likedAlbums', JSON.stringify(likedAlbums));
}

// Функция для удаления альбома из избранного
function removeAlbumFromFavorites(album) {
    let likedAlbums = getLikedAlbums();
    likedAlbums = likedAlbums.filter(likedAlbum => likedAlbum.title !== album.title);
    localStorage.setItem('likedAlbums', JSON.stringify(likedAlbums));
}

// Устанавливаем изначальное состояние сердечка
if (isAlbumLiked(albumInfo)) {
    albumHeart.classList.add('liked');
}

// Обработка клика на сердечке
albumHeart.addEventListener('click', () => {
    if (albumHeart.classList.contains('liked')) {
        // Удаляем альбом из избранного
        removeAlbumFromFavorites(albumInfo);
        albumHeart.classList.remove('liked');
    } else {
        // Добавляем альбом в избранное
        addAlbumToFavorites(albumInfo);
        albumHeart.classList.add('liked');
    }
});
