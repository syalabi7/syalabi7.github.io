const params = new URLSearchParams(window.location.search);
const nama = params.get('to');

if(nama){
    document.getElementById('guestName').innerText =
        decodeURIComponent(nama.replace(/\+/g,' '));
}

// ===== OPEN COVER + PLAY MUSIC =====
const bgMusic  = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let musicPlaying = false;

document.getElementById('openBtn').addEventListener('click', function(){
    const cover = document.getElementById('cover');
    cover.style.transform = 'translateY(-100%)';
    cover.style.transition = 'all 1s ease';
    document.body.style.overflow = 'auto';

    bgMusic.play();
    musicPlaying = true;
    musicBtn.classList.add('rotate');

    setTimeout(() => {
        document.getElementById('content').scrollIntoView({behavior:'smooth'});
    }, 900);
});

// ===== MUSIC BUTTON =====
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

// ===== PARALLAX BACKGROUND =====
window.addEventListener('scroll', function(){
    const scrollPos = window.pageYOffset;
    document.getElementById('content')
        .style.backgroundPositionY = (scrollPos * 0.5) + 'px';
});

// ===== COUNTDOWN =====
const targetDate = new Date("2026-01-04T08:00:00").getTime();

setInterval(() => {
    const diff = targetDate - new Date().getTime();
    if(diff < 0) return;

    document.getElementById('days').innerText    = Math.floor(diff / (1000*60*60*24));
    document.getElementById('hours').innerText   = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    document.getElementById('minutes').innerText = Math.floor((diff % (1000*60*60)) / (1000*60));
    document.getElementById('seconds').innerText = Math.floor((diff % (1000*60)) / 1000);
}, 1000);

// ===== COPY REKENING =====
function copyRek(id){
    const text = document.getElementById(id).innerText.replace(/\s/g,'');
    navigator.clipboard.writeText(text).then(() => {
        alert("Nomor rekening berhasil disalin 📋");
    });
}

// ===== GIFT TOGGLE =====
const giftBtn  = document.getElementById('giftToggle');
const giftCard = document.getElementById('giftCard');

if(giftBtn && giftCard){
    giftBtn.addEventListener('click', () => {
        const show = giftCard.style.display !== "block";
        giftCard.style.display = show ? "block" : "none";
        giftBtn.innerText = show
            ? "Tutup Amplop Digital 💌"
            : "Buka Amplop Digital 💌";
    });
}

document.addEventListener("click", function(e){
    if(e.target.classList.contains("copy-btn")){
        const id = e.target.dataset.target;
        const text = document.getElementById(id).innerText.replace(/\s/g,'');

        if(navigator.clipboard){
            navigator.clipboard.writeText(text).then(()=>{
                alert("Nomor rekening berhasil disalin 📋");
            }).catch(()=>{
                fallbackCopy(text);
            });
        }else{
            fallbackCopy(text);
        }
    }
});

function fallbackCopy(text){
    const input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    alert("Nomor rekening berhasil disalin 📋");
}
