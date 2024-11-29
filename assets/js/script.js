let $ = document;

const image = $.querySelector('#cover');
const title = $.querySelector('#title');
const artist = $.querySelector('#artist');
const audio = $.querySelector('audio');
const progress_container = $.querySelector('.progress-container');
const progress = $.querySelector('.progress');
const currentTimeEl = $.querySelector('#current-time');
const durationEl = $.querySelector('#duration');
const prev_btn = $.querySelector('#prev');
const play_btn = $.querySelector('#play');
const next_btn = $.querySelector('#next');
const background = $.querySelector('#background');


let songs = [
    {
        title: 'Boom Boom',
        artist: 'Nikita & Shery',
        path: 'assets/audio/Nikita & Shery - Boom Boom.mp3',
        cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd8n8obMXqMcoZkyFPbbmlj0Vn0uCeeZTmkQ&s',
    },
    {
        title: 'Chetori Gol',
        artist: 'Tohi',
        path: 'assets/audio/Tohi - Chetori Gol 128.mp3',
        cover: '',
    },
    {
        title: '6 Saat Baad',
        artist: 'Nikita & Shery',
        path: 'assets/audio/Nikita & Shery M - 6 Saat Baad (320).mp3',
        cover: '',
    },
    {
        title: 'Delom',
        artist: 'Nikita & Shery',
        path: 'assets/audio/Nikita - Delom ft SheryM (320).mp3',
        cover:'' ,
    },
    {
        title: 'Ma Yekim To Chi',
        artist: 'EpiCure',
        path: 'assets/audio/EpiCure - Ma Yekim To Chi [128].mp3',
        cover: '',
    },
    {
        title: 'Chika Chika',
        artist: 'Nikita',
        path: 'assets/audio/Nikita - Chika Chika.mp3',
        cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwHOlSB6AM4oUWDWhFby-kyGyNdYK9uOGE9w&s',
    },
];

let isPlaying = false;

let musicIndex = 0;


function playMusic(){
    isPlaying = true;
    play_btn.classList.replace('fa-play', 'fa-pause');
    audio.play();
}
function pauseMusic(){
    isPlaying = false;
    play_btn.classList.replace('fa-pause', 'fa-play');
    audio.pause();
}
play_btn.addEventListener('click', function(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
});

function nextMusic(){
    musicIndex++;
    if(musicIndex > songs.length - 1){
        musicIndex = 0;
    }
    loadMusic(songs[musicIndex]);
    playMusic();
}
function prevMusic(){
    musicIndex--;
    if(musicIndex < 0){
        musicIndex = songs.length - 1;
    }
    loadMusic(songs[musicIndex]);
    playMusic();
}




function loadMusic(song){
    console.log(song);
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.path;
    changeCover(song.cover)
}
function changeCover(cover){
    image.classList.remove('active');
    setTimeout(function(){
        if(cover === '' || cover === undefined){
            image.src = 'assets/img/symbol-music-note-red-musical-zeeGmeA-600.jpg';
        }else{
            image.src = cover;
        }
        image.classList.add('active');
    }, 100);
    if(cover === '' || cover === undefined){
        background.src = 'assets/img/symbol-music-note-red-musical-zeeGmeA-600.jpg';
    }else{
        background.src = cover;
    }
}

loadMusic(songs[musicIndex]);


function updateProgressBar(e){
    if(isPlaying){
        const duration = e.target.duration;
        const currentTime = e.target.currentTime;

        const progressWidth = (currentTime / duration) * 100;
        progress.style.width = `${progressWidth}%`;

        const durationMinuts = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration) % 60;
        if(durationSeconds < '10'){
            durationSeconds = `0${durationSeconds}`;
        }
        if(durationSeconds){
            durationEl.textContent = `${durationMinuts}:${durationSeconds}`;
        }

        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < '10'){
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}


next_btn.addEventListener('click', nextMusic);
prev_btn.addEventListener('click', prevMusic);
audio.addEventListener('timeupdate', updateProgressBar);
progress_container.addEventListener('click', setProgressBar)