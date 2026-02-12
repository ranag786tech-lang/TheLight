let countValue = 0;
let currentIndex = 0;
let namesData = [];

// 1. ڈیٹا لوڈ کرنے کا فنکشن (Fixed: 'asynchronous' کو 'async' کر دیا)
async function loadData() {
    try {
        const response = await fetch('data.json');
        namesData = await response.json();
        updateDisplay(0);
    } catch (error) {
        console.error("ڈیٹا لوڈ نہیں ہو سکا", error);
    }
}

// 2. تسبیح گننے اور ویژول ایفیکٹ کا فنکشن
function count(event) {
    countValue++;
    document.getElementById('counter-btn').innerText = countValue;

    // وائبریشن 33 پر
    if(countValue % 33 === 0 && navigator.vibrate) {
        navigator.vibrate(200);
    }

    // یہاں سے ویژول ایفیکٹ شروع ہوتا ہے
    triggerEffect(event);
}

// 3. ویژول ایفیکٹ (نام کا اوپر اڑنا)
function triggerEffect(event) {
    const currentText = document.getElementById('divine-name').innerText;
    const floatText = document.createElement('div');
    floatText.className = 'dhikr-effect';
    floatText.innerText = currentText;

    // کلک کی پوزیشن (موبائل ٹچ یا ماؤس کلک)
    const x = event.clientX || (event.touches ? event.touches[0].clientX : window.innerWidth / 2);
    const y = event.clientY || (event.touches ? event.touches[0].clientY : window.innerHeight / 2);

    floatText.style.left = x + 'px';
    floatText.style.top = y + 'px';

    document.body.appendChild(floatText);

    setTimeout(() => {
        floatText.remove();
    }, 1500);
}

// 4. اگلے نام پر جانے کا فنکشن
function nextName() {
    if (namesData.length === 0) return;
    
    // تسبیح ری سیٹ کریں
    resetCounter();

    currentIndex++;
    if (currentIndex >= namesData.length) {
        currentIndex = 0; 
    }
    updateDisplay(currentIndex);
}

// 5. پچھلے نام پر واپس جانے کا فنکشن
function prevName() {
    if (namesData.length === 0) return;

    // تسبیح ری سیٹ کریں
    resetCounter();

    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = namesData.length - 1; 
    }
    updateDisplay(currentIndex);
}

// کاؤنٹر کو زیرو کرنے کا مشترکہ فنکشن
function resetCounter() {
    countValue = 0;
    document.getElementById('counter-btn').innerText = countValue;
}
// 5. ڈسپلے اپ ڈیٹ کرنے کا فنکشن (Fixed: فالتو ڈاٹ ہٹا دیا)
function updateDisplay(index) {
    const item = namesData[index];
    if(item) {
        document.getElementById('divine-name').innerText = item.name;
        document.getElementById('meaning').innerText = item.meaning;
        document.getElementById('quran-verse').innerText = item.verse;
        document.getElementById('economic-rule').innerText = "اصول: " + item.principle;
    }
}

window.onload = loadData;
const glow = document.getElementById('magnetic-glow');

const moveGlow = (e) => {
    const x = e.clientX || (e.touches ? e.touches[0].clientX : 0);
    const y = e.clientY || (e.touches ? e.touches[0].clientY : 0);
    
    glow.style.left = x + 'px';
    glow.style.top = y + 'px';
};

window.addEventListener('mousemove', moveGlow);
window.addEventListener('touchmove', moveGlow);
