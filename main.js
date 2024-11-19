// Function to toggle theme
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

// Check saved theme on page load
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// Check if user is logged in (email is in localStorage)
const userEmail = localStorage.getItem('userEmail');
if (!userEmail) {
    // If no email is found, redirect to index.html
    window.location.href = 'index.html';
} else {
    // If user is logged in, proceed with loading the page
    console.log(`User logged in with email: ${userEmail}`);
}

// Song data (This can be dynamically loaded with actual images and links)
const songs = [
    { title: 'Starboy', artist: 'The Weeknd', image: 'Starboy/Starboyicon.png', link: 'Starboy/Starboy.html' },
    { title: 'Kairat Nurtas', artist: 'Kairat Nurtas', image: 'Kairat/Kairat_Nurtas.jpg', link: 'Kairat/Kairat.html' },
    { title: 'Back In Black', artist: 'AC/DC', image: 'Back_in_Black/Back_in_Black.jpg', link: 'Back_in_Black/Back_in_Black.html' },
    { title: 'Nevermind', artist: 'Nirvana', image: 'Nevermind/NevermindIcon.jpeg', link: 'Nevermind/Nevermind.html' },
    { title: 'Abbey Road', artist: 'the Beatles', image: 'Abbey_Road/abbey.jpg', link: 'Abbey_Road/Abbey_Road.html' },
    { title: 'To Pimp a Butterfly', artist: 'Kendrick Lamar', image: 'To_Pimp_a_Butterfly/Album.jpg', link: 'To_Pimp_a_Butterfly/To_Pimp_a_Butterfly.html' },
];

// Function to generate song list
function generateSongs() {
    const songsList = document.querySelector('.songs-list');
    songsList.innerHTML = '';
    songs.forEach(song => {
        const songItem = document.createElement('a');
        songItem.classList.add('song-item');
        songItem.href = song.link;
        songItem.innerHTML = `
            <img src="${song.image}" alt="${song.title}">
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
        `;
        songsList.appendChild(songItem);
    });
}

// Function to filter songs by search input
function filterSongs() {
    const searchQuery = document.getElementById('song-search').value.toLowerCase();
    const filteredSongs = songs.filter(song => song.title.toLowerCase().includes(searchQuery));
    
    const songsList = document.querySelector('.songs-list');
    songsList.innerHTML = '';
    filteredSongs.forEach(song => {
        const songItem = document.createElement('a');
        songItem.classList.add('song-item');
        songItem.href = song.link;
        songItem.innerHTML = `
            <img src="${song.image}" alt="${song.title}">
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
        `;
        songsList.appendChild(songItem);
    });
}

// Generate the initial list of songs
generateSongs();
