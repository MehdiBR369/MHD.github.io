let $ = document;

let audio = $.querySelector('audio');
let music_title = $.querySelector('.music-name');
let singer_name = $.querySelector('.singer-name');
let repeat_btn = $.querySelector('.repeat');
let backward_btn = $.querySelector('.backward');
let play_btn = $.querySelector('.play-pause');
let forward_btn = $.querySelector('.forward');
let mute_btn = $.querySelector('.mute');
let slider = $.querySelector('#slider');
let time_goese = $.querySelector('.time-goes');
let time_duration = $.querySelector('.time-duration');

let isPlaying = false;
let minutofMusic = 0;
let secondofMusic = 0;



let musics = [
  {id: 1,musicName:'Koo Ta Biad', singer:'Donya', link:'assets/audio/Donya - Koo Ta Biad.mp3'},
  {id: 2,musicName:'Sheta', singer:'Kamal-Golchin', link:'assets/audio/Kamal-Golchin-Sheta.mp3'},
  {id: 3,musicName:'Chika Chika', singer:'Nikita', link:'assets/audio/Nikita - Chika Chika.mp3'},
  {id: 4,musicName:'relaxing guitar', singer:'unknown', link:'assets/audio/relaxing-guitar-loop-v5-245859.mp3'},
];
let musicIndex = 2;


function reapetMusic(){
  if(!audio.loop){
    audio.loop = true;
    repeat_btn.style.color = '#0077B6';
  }else{
    audio.loop = false;
    repeat_btn.style.color = '#6C757D';
  }
}

function previousMusic(){
  musicIndex--;
  if(musicIndex < 0){
    musicIndex = musics.length - 1;
  }
  audio.src = musics[musicIndex].link;
  isPlaying = false;
  music_title.innerHTML = musics[musicIndex].musicName;
  singer_name.innerHTML = musics[musicIndex].singer;
  playMusic();
  console.log(musicIndex);
}

function playMusic(){
  if(!isPlaying){

    isPlaying = true;
    play_btn.className = 'fa-solid fa-pause play-pause';
    audio.currentTime = audio.currentTime;

    setTimeout(function(){
      audio.play();

      minutofMusic = Math.floor(audio.duration / 60);
      secondofMusic = Math.floor(audio.duration % 60);
      time_duration.innerHTML = `${minutofMusic}:${secondofMusic}`;
      slider.max = audio.duration;
    }, 500)
    setInterval(function(){
      slider.value = audio.currentTime;
      time_goese.innerHTML = `${audio.duration}`; 
    }, 1000)
  }else{
    isPlaying = false;
    audio.pause();
    audio.currentTime = audio.currentTime;
    play_btn.className = 'fa-solid fa-play play-pause';
  }
}

function nextMusic(){
  musicIndex++;
  if(musicIndex > musics.length - 1){
    musicIndex = 0;
  }
  audio.src = musics[musicIndex].link;
  isPlaying = false;
  music_title.innerHTML = musics[musicIndex].musicName;
  singer_name.innerHTML = musics[musicIndex].singer;
  playMusic();
}

function muteMusic(){
  if(!audio.muted){
    audio.muted = true;
    mute_btn.style.color = '#0077B6';
  }else{
    audio.muted = false;
    mute_btn.style.color = '#6C757D';
  }
}


play_btn.addEventListener('click', playMusic);
repeat_btn.addEventListener('click', reapetMusic);
forward_btn.addEventListener('click', nextMusic);
mute_btn.addEventListener('click', muteMusic);
backward_btn.addEventListener('click', previousMusic);
slider.addEventListener('click', function(){
    audio.currentTime = slider.value;
});
audio.addEventListener('ended', function(){
  if(!audio.loop){
    musicIndex++;
    if(musicIndex > musics.length - 1){
      musicIndex = 0;
    }
    audio.src = musics[musicIndex].link;
    isPlaying = false;
    playMusic();
    console.log(musicIndex);
  }else{
    playMusic();
  }
});

console.log(59%60);
