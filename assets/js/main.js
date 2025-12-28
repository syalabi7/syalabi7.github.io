document.addEventListener("DOMContentLoaded", function(){

/* =================== PARAMS =================== */
const params = new URLSearchParams(window.location.search);
const nama   = params.get('to');
const admin  = params.get('admin');

if(nama && document.getElementById('guestName')){
    document.getElementById('guestName').innerText =
        decodeURIComponent(nama.replace(/\+/g,' '));
}

/* ================= MUSIC ================= */
const bgMusic  = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let musicPlaying = false;

const openBtn = document.getElementById('openBtn');
if(openBtn){
    openBtn.addEventListener('click', function(){
        const cover = document.getElementById('cover');
        cover.style.transform = 'translateY(-100%)';
        cover.style.transition = 'all 1s ease';
        document.body.style.overflow = 'auto';

        bgMusic.play().catch(()=>{});
        musicPlaying = true;
        musicBtn.classList.add('rotate');

        setTimeout(() => {
            document.getElementById('content').scrollIntoView({behavior:'smooth'});
        }, 900);

        setTimeout(()=>{
            document.querySelector(".opening").classList.add("show");
        },700);
    });
}

if(musicBtn){
    musicBtn.addEventListener('click', function(){
        if(musicPlaying){
            bgMusic.pause();
            musicBtn.classList.remove('rotate');
        }else{
            bgMusic.play().catch(()=>{});
            musicBtn.classList.add('rotate');
        }
        musicPlaying = !musicPlaying;
    });
}

/* ================= PARALLAX ================= */
window.addEventListener('scroll', function(){
    const content = document.getElementById('content');
    if(content){
        content.style.backgroundPositionY = (window.pageYOffset * 0.5) + 'px';
    }
});

/* ================= COUNTDOWN ================= */
const targetDate = new Date("2026-01-04T08:00:00").getTime();
setInterval(() => {
    const diff = targetDate - new Date().getTime();
    if(diff < 0) return;

    document.getElementById('days').innerText    = Math.floor(diff / (1000*60*60*24));
    document.getElementById('hours').innerText   = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    document.getElementById('minutes').innerText = Math.floor((diff % (1000*60*60)) / (1000*60));
    document.getElementById('seconds').innerText = Math.floor((diff % (1000*60)) / 1000);
}, 1000);

/* ================= GIFT ================= */
const giftBtn  = document.getElementById('giftToggle');
const giftCard = document.getElementById('giftCard');

if(giftBtn && giftCard){
    giftBtn.addEventListener('click', () => {
        const show = giftCard.style.display !== "block";
        giftCard.style.display = show ? "block" : "none";
        giftBtn.innerText = show ? "Tutup Amplop Digital 💌" : "Buka Amplop Digital 💌";
    });
}

/* ================= COPY REK ================= */
document.addEventListener("click", function(e){
    if(e.target.classList.contains("copy-btn")){
        const id   = e.target.dataset.target;
        const text = document.getElementById(id).innerText.replace(/\s/g,'');

        const input = document.createElement("input");
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);

        e.target.innerText = "Tersalin ✓";
        setTimeout(() => e.target.innerText = "Salin", 1500);
    }
});

/* ================= LOADER ================= */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if(loader){
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 600);
    }
});

/* ================= ADMIN MODE ================= */
const ADMIN_KEY = "ayunasyalabi";

if(admin === ADMIN_KEY){
    const modal   = document.getElementById("adminModal");
    const copyBtn = document.getElementById("adminCopy");
    const result  = document.getElementById("adminResult");

    let lastText = "";

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    document.getElementById("adminGenerate").addEventListener("click", ()=>{
        const nm = document.getElementById("adminNama").value.trim();
        if(!nm) return alert("Masukkan nama tamu");

        const link = `${location.origin}${location.pathname}?to=${encodeURIComponent(nm)}`;

        lastText = 
`Yth. ${nm}

Assalamualaikum Warahmatullahi Wabarakatuh

Dengan memohon Rahmat dan Ridho Allah SWT, dan tanpa mengurangi rasa hormat melalui pesan ini kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami :

Ayuna Widya Silviana Sari dan Ahmad Syalabi Mahmud

Berikut link undangan kami, untuk info lengkap dari acara bisa kunjungi :
${link}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Mohon maaf perihal undangan hanya dibagikan melalui pesan ini.

Terima kasih banyak atas perhatiannya.
Wassalamualaikum Warahmatullahi Wabarakatuh`;

        result.innerHTML = `<pre style="white-space:pre-wrap">${lastText}</pre>`;
        copyBtn.style.display = "inline-block";
    });

    copyBtn.addEventListener("click", ()=>{
        navigator.clipboard.writeText(lastText).then(()=>{
            copyBtn.innerText = "Tersalin ✓";
            setTimeout(()=> copyBtn.innerText = "Salin Pesan",1500);
        });
    });

    document.getElementById("adminClose").addEventListener("click", ()=>{
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });
}

});

document.addEventListener("DOMContentLoaded", ()=>{

/* ====== SECTION FADE ENGINE ====== */
const sections = document.querySelectorAll(".section");

const sectionObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
            sectionObserver.unobserve(entry.target);
        }
    });
},{
    threshold:0.25,
    rootMargin:"0px 0px -80px 0px"
});

sections.forEach(sec => sectionObserver.observe(sec));



/* ====== OPENING STAGGER ====== */
const opening = document.querySelector(".opening");

const openingObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
            openingObserver.unobserve(entry.target);
        }
    });
},{ threshold:0.4 });

if(opening) openingObserver.observe(opening);



/* ====== COUPLE PERSON FADE ====== */
const coupleItems = document.querySelectorAll(".fade-left, .fade-right, .fade-zoom");

const coupleObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
            coupleObserver.unobserve(entry.target);
        }
    });
},{ threshold:0.6 });

coupleItems.forEach(el => coupleObserver.observe(el));

});

/* ===== TIMELINE STAGGER FADE ===== */
const timelineItems = document.querySelectorAll(".timeline-item");

const timelineObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
            timelineObserver.unobserve(entry.target);
        }
    });
},{
    threshold:0.4
});

timelineItems.forEach(item => timelineObserver.observe(item));

/* ===== EVENT CARD STAGGER FADE ===== */
const eventCards = document.querySelectorAll(".event-card");

const eventObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
            eventObserver.unobserve(entry.target);
        }
    });
},{
    threshold:0.35
});

eventCards.forEach(card => eventObserver.observe(card));
