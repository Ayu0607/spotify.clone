// console.log("Welcome to Spotify");

// // Initialize the Variables
// let songIndex = 0;
// let audioElement = new Audio('assets/audio/Lana-Del-Rey-Diet-Mountain-Dew-(RawPraise.ng).mp3');
// let masterPlay = document.getElementById('masterPlay');
// let myProgressBar = document.getElementById('myProgressBar');
// let gif = document.getElementById('gif');
// let masterSongName = document.getElementById('masterSongName');
// let songItems = Array.from(document.getElementsByClassName('songItem'));

// let songs = [
//     {songName:"assets\audio\Lana-Del-Rey-Diet-Mountain-Dew-(RawPraise.ng).mp3", filePath: "assets\audio\Lana_Del_Rey_-_Young_And_Beautiful_CeeNaija.com_.mp3", coverPath: "covers/1.jpg"},
//     {songName: "", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
//     {songName: "", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
//     {songName: "", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
//     {songName: "", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"}
// ]

// songItems.forEach((element, i)=>{ 
//     element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
//     element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
// })
 

// // Handle play/pause click
// masterPlay.addEventListener('click', ()=>{
//     if(audioElement.paused || audioElement.currentTime<=0){
//         audioElement.play();
//         masterPlay.classList.remove('fa-play-circle');
//         masterPlay.classList.add('fa-pause-circle');
//         gif.style.opacity = 1;
//     }
//     else{
//         audioElement.pause();
//         masterPlay.classList.remove('fa-pause-circle');
//         masterPlay.classList.add('fa-play-circle');
//         gif.style.opacity = 0;
//     }
// })
// // Listen to Events
// audioElement.addEventListener('timeupdate', ()=>{ 
//     // Update Seekbar
//     progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
//     myProgressBar.value = progress;
// })

// myProgressBar.addEventListener('change', ()=>{
//     audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
// })

// const makeAllPlays = ()=>{
//     Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
//         element.classList.remove('fa-pause-circle');
//         element.classList.add('fa-play-circle');
//     })
// }

// Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
//     element.addEventListener('click', (e)=>{ 
//         makeAllPlays();
//         songIndex = parseInt(e.target.id);
//         e.target.classList.remove('fa-play-circle');
//         e.target.classList.add('fa-pause-circle');
//         audioElement.src = `songs/${songIndex+1}.mp3`;
//         masterSongName.innerText = songs[songIndex].songName;
//         audioElement.currentTime = 0;
//         audioElement.play();
//         gif.style.opacity = 1;
//         masterPlay.classList.remove('fa-play-circle');
//         masterPlay.classList.add('fa-pause-circle');
//     })
// })

// document.getElementById('next').addEventListener('click', ()=>{
//     if(songIndex>=9){
//         songIndex = 0
//     }
//     else{
//         songIndex += 1;
//     }
//     audioElement.src = `songs/${songIndex+1}.mp3`;
//     masterSongName.innerText = songs[songIndex].songName;
//     audioElement.currentTime = 0;
//     audioElement.play();
//     masterPlay.classList.remove('fa-play-circle');
//     masterPlay.classList.add('fa-pause-circle');

// })

// document.getElementById('previous').addEventListener('click', ()=>{
//     if(songIndex<=0){
//         songIndex = 0
//     }
//     else{
//         songIndex -= 1;
//     }
//     audioElement.src = `songs/${songIndex+1}.mp3`;
//     masterSongName.innerText = songs[songIndex].songName;
//     audioElement.currentTime = 0;
//     audioElement.play();
//     masterPlay.classList.remove('fa-play-circle');
//     masterPlay.classList.add('fa-pause-circle');
// })

// Declare necessary variables
let songIndex = 0;
let audioElement = new Audio();  // Initially empty, will be updated dynamically
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = document.querySelectorAll('.songItem'); 
let songInfo = document.querySelector('.songInfo');
let songTitle = songInfo.querySelector('span');
let songBanner = document.getElementById('songBanner');

// Define the song array with metadata
let songs = [
    {songName: "Diet Mountain Dew", filePath: "assets/audio/Lana-Del-Rey-Diet-Mountain-Dew-(RawPraise.ng).mp3", coverPath: "assets/images/mountaindelrey.jpg"},
    {songName: "Young & Beautiful", filePath: "assets/audio/Lana_Del_Rey_-_Young_And_Beautiful_CeeNaija.com_.mp3", coverPath: "assets/images/young&beautiful.webp"},
    {songName: "Summertime Sadness", filePath: "assets/audio/Lana_Del_Rey_-_Summertime_Sadness.mp3", coverPath: "assets/images/shades-of-cool.webp"},
    {songName: "Dark Paradise", filePath: "assets/audio/Lana-Del-Rey-Dark-Paradise-(RawPraise.ng).mp3", coverPath: "assets/images/Westcoast.webp"},
    {songName: "West Coast", filePath: "assets/audio/WestCoast.mp3", coverPath: "assets/images/DarkParadise.jpg"}
];

// Add event listener to each song item
songItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        songIndex = index;
        loadSong(songs[songIndex]);
        playSong();
    });
});

// Play or pause song when master play button is clicked
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        pauseSong();
    }
});

// Load the song details (name, cover, etc.)
function loadSong(song) {
    if (songTitle) {  // Check if songTitle exists
        songTitle.textContent = song.songName;
    }
    audioElement.src = song.filePath;
    if (songBanner) {  // Check if songBanner exists
        songBanner.style.backgroundImage = `url(${song.coverPath})`;
    }
    if (gif) {  // Check if gif exists
        gif.style.opacity = 0;  // Hide the loading GIF when the song is loaded
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
    gif.style.opacity = 1;  // Show the loading GIF
}

// Function to pause the song
function pauseSong() {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;  // Hide the loading GIF when paused
}

// Update progress bar as song plays
audioElement.addEventListener('timeupdate', () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
});

// Scrub through the song by clicking on the progress bar
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});

// Initialize with the first song
loadSong(songs[songIndex]);

// Check for errors when loading the audio file
audioElement.addEventListener('loadeddata', () => {
    console.log('Audio file loaded successfully!');
});

audioElement.addEventListener('error', (e) => {
    console.error('Error loading audio:', e);
});

// Adjust the player for responsiveness based on screen size
function adjustForResponsive() {
    const isMobileOrTablet = window.innerWidth <= 1024;

    if (isMobileOrTablet) {
        // Adjust styles for mobile/tablet
        songItems.forEach(item => item.style.marginBottom = '15px');
        myProgressBar.style.width = '90%';
        songInfo.style.fontSize = '14px';
        gif.style.width = '32px';
    } else {
        // Reset styles for larger screens
        songItems.forEach(item => item.style.marginBottom = '10px');
        myProgressBar.style.width = '80vw';
        songInfo.style.fontSize = '18px';
        gif.style.width = '42px';
    }
}

window.addEventListener('resize', adjustForResponsive);
adjustForResponsive();
