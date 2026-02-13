let countValue = 0;
let currentIndex = 0;
let namesData = [];

// Sound ko pehle se load karne ke liye
const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
const bellSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');

// Mobile sound fix: Browsers ko "user interaction" chahiye hota hai
function count(event) {
    // Ye line browser ko signal deti hai ke user ne sound ki ijazat de di hai
    clickSound.play().then(() => {
        clickSound.pause(); // Sirf "unlock" karne ke liye
        clickSound.currentTime = 0;
    }).catch(e => console.log("Sound unlock error"));

    countValue++;
    document.getElementById('counter-btn').innerText = countValue;

    // Ab sound play karein
    clickSound.currentTime = 0; 
    clickSound.play();

    if (countValue % 33 === 0) {
        bellSound.currentTime = 0;
        bellSound.play();
        if(navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }
    triggerEffect(event);
}

function triggerEffect(event) {
    const effect = document.createElement('div');
    effect.className = 'dhikr-effect';
    effect.innerText = document.getElementById('divine-name').innerText;
    
    let x = event.clientX || (event.touches ? event.touches[0].clientX : window.innerWidth/2);
    let y = event.clientY || (event.touches ? event.touches[0].clientY : window.innerHeight/2);
    
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

function nextName() { currentIndex = (currentIndex + 1) % namesData.length; resetCounter(); updateDisplay(currentIndex); }
function prevName() { currentIndex = (currentIndex - 1 + namesData.length) % namesData.length; resetCounter(); updateDisplay(currentIndex); }
function resetCounter() { countValue = 0; document.getElementById('counter-btn').innerText = 0; }

window.addEventListener('load', () => {
    loadData();
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if(splash) splash.classList.add('fade-out');
    }, 2500);
});
