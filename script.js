let countValue = 0;
let currentIndex = 0;
let namesData = [];

// ساؤنڈز کو محفوظ طریقے سے لوڈ کرنا
const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
const bellSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');

// آواز کو موبائل پر "ان لاک" کرنے کے لیے
function unlockAudio() {
    clickSound.play().then(() => {
        clickSound.pause();
        clickSound.currentTime = 0;
    }).catch(e => console.log("Audio unlock required"));
    window.removeEventListener('click', unlockAudio);
}
window.addEventListener('click', unlockAudio);

async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error("Data not found");
        namesData = await response.json();
        updateDisplay(0);
    } catch (error) {
        console.error("Load failed:", error);
    }
}

function count(event) {
    countValue++;
    document.getElementById('counter-btn').innerText = countValue;

    // آواز چلائیں
    clickSound.currentTime = 0;
    clickSound.play().catch(e => console.log("Sound error"));

    if (countValue % 33 === 0) {
        bellSound.play();
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }
    triggerEffect(event);
}

function triggerEffect(event) {
    const effect = document.createElement('div');
    effect.className = 'dhikr-effect';
    effect.innerText = document.getElementById('divine-name').innerText;
    
    let x = event.clientX || (event.touches ? event.touches[0].clientX : window.innerWidth / 2);
    let y = event.clientY || (event.touches ? event.touches[0].clientY : window.innerHeight / 2);
    
    effect.style.left = x + 'px';
    effect.style.top = y + 'px';
    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), 1500);
}

function updateDisplay(index) {
    const item = namesData[index];
    if (item) {
        document.getElementById('divine-name').innerText = item.name;
        document.getElementById('meaning').innerText = item.meaning;
        document.getElementById('quran-verse').innerText = item.verse || "";
        document.getElementById('economic-rule').innerText = item.principle ? "اصول: " + item.principle : "";
    }
}

function nextName() { 
    currentIndex = (currentIndex + 1) % namesData.length; 
    resetCounter(); 
    updateDisplay(currentIndex); 
}

function prevName() { 
    currentIndex = (currentIndex - 1 + namesData.length) % namesData.length; 
    resetCounter(); 
    updateDisplay(currentIndex); 
}

function resetCounter() { 
    countValue = 0; 
    document.getElementById('counter-btn').innerText = 0; 
}

// ماؤس گلوبل موومنٹ
window.addEventListener('mousemove', (e) => {
    const glow = document.getElementById('magnetic-glow');
    if(glow) { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; }
});

// لوڈنگ اسکرین ختم کرنا
window.addEventListener('load', async () => {
    await loadData();
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if(splash) splash.classList.add('fade-out');
    }, 2500);
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log("PWA Active"))
    .catch(err => console.log("PWA Error", err));
}