let countValue = 0;
let currentIndex = 0;
let namesData = [];

const elements = {
    name: document.getElementById("divine-name"),
    meaning: document.getElementById("meaning"),
    verse: document.getElementById("quran-verse"),
    rule: document.getElementById("economic-rule"),
    counter: document.getElementById("counter-btn"),
    next: document.getElementById("next-btn"),
    prev: document.getElementById("prev-btn"),
    glow: document.getElementById("magnetic-glow")
};

document.addEventListener("DOMContentLoaded", initApp);

async function initApp() {
    attachEvents();
    await loadData();
}

async function loadData() {
    try {
        const response = await fetch("data.json");
        if (!response.ok) throw new Error("Network response failed");
        namesData = await response.json();
        updateDisplay(0);
    } catch (error) {
        console.error("ڈیٹا لوڈ نہیں ہو سکا:", error);
        elements.meaning.innerText = "ڈیٹا لوڈ کرنے میں مسئلہ پیش آیا";
    }
}

function attachEvents() {
    elements.counter.addEventListener("click", handleCount);
    elements.next.addEventListener("click", nextName);
    elements.prev.addEventListener("click", prevName);

    window.addEventListener("mousemove", moveGlow);
    window.addEventListener("touchmove", moveGlow);
}

function handleCount(event) {
    countValue++;
    elements.counter.innerText = countValue;

    if (countValue % 33 === 0 && navigator.vibrate) {
        navigator.vibrate(200);
    }

    triggerEffect(event);
}

function triggerEffect(event) {
    const floatText = document.createElement("div");
    floatText.className = "dhikr-effect";
    floatText.innerText = elements.name.innerText;

    const x = event.clientX || (event.touches ? event.touches[0].clientX : window.innerWidth / 2);
    const y = event.clientY || (event.touches ? event.touches[0].clientY : window.innerHeight / 2);

    floatText.style.left = x + "px";
    floatText.style.top = y + "px";

    document.body.appendChild(floatText);

    setTimeout(() => floatText.remove(), 1500);
}

function nextName() {
    if (!namesData.length) return;
    resetCounter();
    currentIndex = (currentIndex + 1) % namesData.length;
    updateDisplay(currentIndex);
}

function prevName() {
    if (!namesData.length) return;
    resetCounter();
    currentIndex = (currentIndex - 1 + namesData.length) % namesData.length;
    updateDisplay(currentIndex);
}

function resetCounter() {
    countValue = 0;
    elements.counter.innerText = countValue;
}

function updateDisplay(index) {
    const item = namesData[index];
    if (!item) return;

    elements.name.innerText = item.name;
    elements.meaning.innerText = item.meaning;
    elements.verse.innerText = item.verse;
    elements.rule.innerText = "اصول: " + item.principle;
}

function moveGlow(e) {
    const x = e.clientX || (e.touches ? e.touches[0].clientX : 0);
    const y = e.clientY || (e.touches ? e.touches[0].clientY : 0);

    elements.glow.style.left = x + "px";
    elements.glow.style.top = y + "px";
}let countValue = 0;
let currentIndex = 0;
let namesData = [];

const elements = {
    name: document.getElementById("divine-name"),
    meaning: document.getElementById("meaning"),
    verse: document.getElementById("quran-verse"),
    rule: document.getElementById("economic-rule"),
    counter: document.getElementById("counter-btn"),
    next: document.getElementById("next-btn"),
    prev: document.getElementById("prev-btn"),
    glow: document.getElementById("magnetic-glow")
};

document.addEventListener("DOMContentLoaded", initApp);

async function initApp() {
    attachEvents();
    await loadData();
}

async function loadData() {
    try {
        const response = await fetch("data.json");
        if (!response.ok) throw new Error("Network response failed");
        namesData = await response.json();
        updateDisplay(0);
    } catch (error) {
        console.error("ڈیٹا لوڈ نہیں ہو سکا:", error);
        elements.meaning.innerText = "ڈیٹا لوڈ کرنے میں مسئلہ پیش آیا";
    }
}

function attachEvents() {
    elements.counter.addEventListener("click", handleCount);
    elements.next.addEventListener("click", nextName);
    elements.prev.addEventListener("click", prevName);

    window.addEventListener("mousemove", moveGlow);
    window.addEventListener("touchmove", moveGlow);
}

function handleCount(event) {
    countValue++;
    elements.counter.innerText = countValue;

    if (countValue % 33 === 0 && navigator.vibrate) {
        navigator.vibrate(200);
    }

    triggerEffect(event);
}

function triggerEffect(event) {
    const floatText = document.createElement("div");
    floatText.className = "dhikr-effect";
    floatText.innerText = elements.name.innerText;

    const x = event.clientX || (event.touches ? event.touches[0].clientX : window.innerWidth / 2);
    const y = event.clientY || (event.touches ? event.touches[0].clientY : window.innerHeight / 2);

    floatText.style.left = x + "px";
    floatText.style.top = y + "px";

    document.body.appendChild(floatText);

    setTimeout(() => floatText.remove(), 1500);
}

function nextName() {
    if (!namesData.length) return;
    resetCounter();
    currentIndex = (currentIndex + 1) % namesData.length;
    updateDisplay(currentIndex);
}

function prevName() {
    if (!namesData.length) return;
    resetCounter();
    currentIndex = (currentIndex - 1 + namesData.length) % namesData.length;
    updateDisplay(currentIndex);
}

function resetCounter() {
    countValue = 0;
    elements.counter.innerText = countValue;
}

function updateDisplay(index) {
    const item = namesData[index];
    if (!item) return;

    elements.name.innerText = item.name;
    elements.meaning.innerText = item.meaning;
    elements.verse.innerText = item.verse;
    elements.rule.innerText = "اصول: " + item.principle;
}

function moveGlow(e) {
    const x = e.clientX || (e.touches ? e.touches[0].clientX : 0);
    const y = e.clientY || (e.touches ? e.touches[0].clientY : 0);

    elements.glow.style.left = x + "px";
    elements.glow.style.top = y + "px";
}
