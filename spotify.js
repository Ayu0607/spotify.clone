let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = document.querySelectorAll('.songItem'); 
let songInfo = document.querySelector('.songInfo');
let songTitle = songInfo.querySelector('span');
let songBanner = document.getElementById('songBanner');

let songs = [
    {songName: "Diet Mountain Dew", filePath: "assets/audio/Lana-Del-Rey-Diet-Mountain-Dew-(RawPraise.ng).mp3", coverPath: "assets/images/mountaindelrey.jpg"},
    {songName: "Young & Beautiful", filePath: "assets/audio/Lana_Del_Rey_-_Young_And_Beautiful_CeeNaija.com_.mp3", coverPath: "assets/images/young&beautiful.webp"},
    {songName: "Summertime Sadness", filePath: "assets/audio/Lana_Del_Rey_-_Summertime_Sadness.mp3", coverPath: "assets/images/shades-of-cool.webp"},
    {songName: "Dark Paradise", filePath: "assets/audio/Lana-Del-Rey-Dark-Paradise-(RawPraise.ng).mp3", coverPath: "assets/images/Westcoast.webp"},
    {songName: "West Coast", filePath: "assets/audio/WestCoast.mp3", coverPath: "assets/images/DarkParadise.jpg"}
];

songItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        songIndex = index;
        loadSong(songs[songIndex]);
        playSong();
    });
});

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        pauseSong();
    }
});

function loadSong(song) {
    if (songTitle) {
        songTitle.textContent = song.songName;
    }
    audioElement.src = song.filePath;
    if (songBanner) {
        songBanner.style.backgroundImage = `url(${song.coverPath})`;
    }
    if (gif) {
        gif.style.opacity = 0;
    }
}

function playSong() {
    audioElement.play()
    .then(() => {
        console.log('Audio is playing');
    })
    .catch((error) => {
        console.error('Error playing audio:', error);
    });

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
}

function pauseSong() {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
}
audioElement.addEventListener('timeupdate', () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});
loadSong(songs[songIndex]);
audioElement.addEventListener('loadeddata', () => {
    console.log('Audio file loaded successfully!');
});

audioElement.addEventListener('error', (e) => {
    console.error('Error loading audio:', e);
});
function adjustForResponsive() {
    const isMobileOrTablet = window.innerWidth <= 1024;

    if (isMobileOrTablet) {
     songItems.forEach(item => item.style.marginBottom = '15px');
        myProgressBar.style.width = '90%';
        songInfo.style.fontSize = '14px';
        gif.style.width = '32px';
    } else {
        songItems.forEach(item => item.style.marginBottom = '10px');
        myProgressBar.style.width = '80vw';
        songInfo.style.fontSize = '18px';
        gif.style.width = '42px';
    }
}

window.addEventListener('resize', adjustForResponsive);
adjustForResponsive();
