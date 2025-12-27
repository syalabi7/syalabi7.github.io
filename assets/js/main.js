const params = new URLSearchParams(window.location.search);
const nama = params.get('to');

if(nama){
    document.getElementById('guestName').innerText =
        decodeURIComponent(nama.replace(/\+/g,' '));
}

document.getElementById('openBtn').addEventListener('click', function(){
    const cover = document.getElementById('cover');
    cover.style.transform = 'translateY(-100%)';
    cover.style.transition = 'all 1s ease';
    document.body.style.overflow = 'auto';

    setTimeout(() => {
        document.getElementById('content').scrollIntoView({behavior:'smooth'});
    }, 900);
});

window.addEventListener('scroll', function(){
    const scrollPos = window.pageYOffset;
    const content = document.getElementById('content');

    // Background bergerak lebih lambat dari scroll
    content.style.backgroundPositionY = (scrollPos * 0.5) + 'px';
});

const targetDate = new Date("2026-01-04T08:00:00").getTime();

setInterval(function(){
    const now = new Date().getTime();
    const diff = targetDate - now;

    if(diff < 0) return;

    document.getElementById('days').innerText    = Math.floor(diff / (1000*60*60*24));
    document.getElementById('hours').innerText   = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    document.getElementById('minutes').innerText = Math.floor((diff % (1000*60*60)) / (1000*60));
    document.getElementById('seconds').innerText = Math.floor((diff % (1000*60)) / 1000);
}, 1000);


// ======= music controller =======
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let musicPlaying = false;

document.getElementById('openBtn').addEventListener('click', function(){
    bgMusic.play();
    musicPlaying = true;
    musicBtn.classList.add('rotate');
});

musicBtn.addEventListener('click', function(){
    if(musicPlaying){
        bgMusic.pause();
        musicBtn.classList.remove('rotate');
    }else{
        bgMusic.play();
        musicBtn.classList.add('rotate');
    }
    musicPlaying = !musicPlaying;
});
