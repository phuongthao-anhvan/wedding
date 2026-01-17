// AOS - Tối ưu cho mobile
AOS.init({
  duration: 800,
  once: true,
  easing: 'ease-out',
  // Disable AOS on mobile để tránh lag
  disable: function() {
    return window.innerWidth < 768;
  }
});
//countdown - tối ưu cho mobile
const weddingDate = new Date("2026-01-22T09:30:00").getTime();

let lastSecond = -1;
const countdownTimer = setInterval(() => {
  const now = Date.now();
  const diff = weddingDate - now;

  if (diff <= 0) {
    clearInterval(countdownTimer);
    return;
  }

  const currentSecond = Math.floor((diff / 1000) % 60);
  
  // Chỉ cập nhật DOM khi cần thiết
  if (currentSecond !== lastSecond) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    
    requestAnimationFrame(() => {
      document.getElementById("days").innerText = days;
      document.getElementById("hours").innerText = hours;
      document.getElementById("minutes").innerText = minutes;
      document.getElementById("seconds").innerText = currentSecond;
    });
    
    lastSecond = currentSecond;
  }
}, 1000);
//anh   footer
const images = document.querySelectorAll(".love-img");
const lightbox = document.getElementById("albumLightbox");
const lbImg = document.querySelector(".lb-image");
const closeBtn = document.querySelector(".lb-close");
const nextBtn = document.querySelector(".lb-next");
const prevBtn = document.querySelector(".lb-prev");

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lbImg.src = images[index].src;
  lightbox.classList.add("active");
}

images.forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});

closeBtn.onclick = () => lightbox.classList.remove("active");

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  lbImg.src = images[currentIndex].src;
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lbImg.src = images[currentIndex].src;
};

document.addEventListener("keydown", e => {
  if (e.key === "Escape") lightbox.classList.remove("active");
  if (e.key === "ArrowRight") nextBtn.click();
  if (e.key === "ArrowLeft") prevBtn.click();
});
//music button
// ELEMENTS
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-percent");
const openBtn = document.getElementById("open-card");

const loadingScreen = document.getElementById("loading-screen");
const mainContent = document.getElementById("main-content");

const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");

// ===== PROGRESS AUTO 0 → 100 =====
let value = 0;
const duration = 3000; // 3 giây
const stepTime = 30;
const step = 100 / (duration / stepTime);

const progressTimer = setInterval(() => {
    value += step;
    if (value >= 100) {
        value = 100;
        clearInterval(progressTimer);
        progressText.innerText = "Hoàn tất 🎉";
        openBtn.style.display = "inline-block";
    } else {
        progressText.innerText = Math.floor(value) + "%";
    }
    progressBar.style.width = value + "%";
}, stepTime);

// ===== MỞ THIỆP =====
let isPlaying = false;

openBtn.addEventListener("click", () => {
    loadingScreen.style.opacity = 0;
    setTimeout(() => {
        loadingScreen.style.display = "none";
        mainContent.style.display = "block";
        musicBtn.style.display = "block";
    }, 500);

    music.play(); // KHÔNG bị chặn
    isPlaying = true;
    musicBtn.innerText = "⏸";
});

// ===== PAUSE / PLAY =====
musicBtn.addEventListener("click", () => {
    if (isPlaying) {
        music.pause();
        musicBtn.innerText = "▶";
    } else {
        music.play();
        musicBtn.innerText = "⏸";
    }
    isPlaying = !isPlaying;
});
//
// hearts animation
const heartsContainer = document.getElementById('hearts-container');
const heartTypes = [ '💗', '💖', '💕', '💞'];

function createHearts(batch = 2) {
  // Giới hạn số hearts tối đa để tránh lag
  if (heartsContainer.children.length > 15) return;
  
  for (let i = 0; i < batch; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerText = heartTypes[Math.floor(Math.random() * heartTypes.length)];

    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = 12 + Math.random() * 16 + 'px';
    heart.style.animationDuration = 8 + Math.random() * 3 + 's';
    heart.style.opacity = 0.5 + Math.random() * 0.3;

    heartsContainer.appendChild(heart);

    setTimeout(() => {
      if (heart.parentNode) heart.remove();
    }, 7000);
  }
}

// 🌸 giảm tần suất để tránh lag mobile
setInterval(() => createHearts(1), 800);
