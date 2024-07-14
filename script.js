
const audioPlayer = document.getElementById('audio-player');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const volumeControl = document.getElementById('volume');
const playlistElement = document.getElementById('playlist');
const searchInput = document.getElementById('search');

const playlist = [
    { title: 'Cheap Thrills', file: 'songs/Cheap Thrills.mp3' },
    { title: 'Let me Down Slowly', file: 'songs/Let me Down Slowly.mp3' },
    { title: 'Shape of You', file: 'songs/Shape of You.mp3' },
];

let currentTrackIndex = 0;

function loadTrack(index) {
    const track = playlist[index];
    audioPlayer.src = track.file;
    audioPlayer.load();
}

function playTrack() {
    audioPlayer.play();
}

function pauseTrack() {
    audioPlayer.pause();
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
}

function updateVolume() {
    audioPlayer.volume = volumeControl.value;
}

function renderPlaylist() {
    playlistElement.innerHTML = '';
    playlist.forEach((track, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = track.title;
        listItem.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            playTrack();
        });
        playlistElement.appendChild(listItem);
    });
}

function filterPlaylist() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPlaylist = playlist.filter(track => track.title.toLowerCase().includes(searchTerm));
    playlistElement.innerHTML = '';
    filteredPlaylist.forEach((track, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = track.title;
        listItem.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            playTrack();
        });
        playlistElement.appendChild(listItem);
    });
}

playButton.addEventListener('click', playTrack);
pauseButton.addEventListener('click', pauseTrack);
nextButton.addEventListener('click', nextTrack);
prevButton.addEventListener('click', prevTrack);
volumeControl.addEventListener('input', updateVolume);
searchInput.addEventListener('input', filterPlaylist);

loadTrack(currentTrackIndex);
renderPlaylist();
