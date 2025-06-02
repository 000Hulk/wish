const steps = [
  {
    quote: `"Every love story is beautiful, but yours is my favorite."`,
    img: "Media/img1.jpg",
    message: "Dear Sister, today marks the start of your most beautiful chapter.",
    music: "music/step1.mp3"
  },
  {
    quote: `"Two souls with but a single thought, two hearts that beat as one."`,
    img: "Media/img2.jpg",
    message: "May your engagement bring joy, laughter, and endless love.",
    music: "music/step6.mp3"
  },
  {
    quote: `"Love is not about how many days, but how deep the moments are."`,
    img: "Media/img4.jpg",
    message: "Witnessing your journey from sister to bride fills my heart with pride!",
    music: "music/step4.mp3"
  },
  {
    quote: `"In you, I’ve found my closest friend and my forever love."`,
    img: "Media/img5.jpg",
    message: "May every day ahead sparkle with new hopes and dreams fulfilled.",
    music: "music/step2.mp3"
  },
  {
    quote: `"To love and be loved is to feel the sun from both sides."`,
    img: "Media/img2.jpg",
    message: "As you walk this beautiful path, know that I’m always by your side.",
    music: "music/step3.mp3"
  },
  {
    quote: `"This is just the beginning of a wonderful adventure."`,
    img: "Media/img10.jpg",
    message: "Congratulations on your engagement! Wishing you endless love.",
    music: "music/step7.mp3"
  },
  {
    quote: `"Two hearts, one promise, infinite love."`,
    img: "Media/img 12.jpg",
    message: "May your love story shine brighter every day and forevermore.",
    music: "music/step5.mp3"
  },
  {
    quote: `"Love is the bridge between two hearts."`,
    img: "Media/img 11.jpg",
    message: "Here’s to your happiness, your love, and your incredible future!",
    music: "Music/congratulations.mp3"
    
  }
];

const container = document.querySelector('.container');
const stepContent = document.getElementById('step-content');
const nextBtn = document.getElementById('nextBtn');
const bgMusic = document.getElementById('bg-music');
const circleWrapper = document.querySelector('.circle-wrapper');
const circle = document.getElementById('circle');

let currentStep = 0;

function renderStep(index) {
  if (index < 0 || index >= steps.length) return;

  if (index < steps.length - 1) {
    container.style.display = 'block';
    circleWrapper.style.display = 'none';
  } else {
    container.style.display = 'none';
    circleWrapper.style.display = 'block';
  }

  if (index < steps.length - 1) {
    const step = steps[index];
    stepContent.innerHTML = `
      <div class="quote">${step.quote}</div>
      <img class="photo" src="${step.img}" alt="Step ${index + 1}" />
      <div class="message">${step.message}</div>
    `;
    playMusic(index);
  }
}

function playMusic(index) {
  const step = steps[index];
  if (!step || !step.music) return;
  if (bgMusic.src.endsWith(step.music)) return;

  bgMusic.src = step.music;
  bgMusic.play().catch(() => {});
}

function setupCircleCards() {
  circle.innerHTML = '';

  const cardCount = steps.length;
  const radius = 220;
  const gapPx = 30;

  const circumference = 2 * Math.PI * radius;
  const totalGapSpace = gapPx * cardCount;
  const totalCardSpace = circumference - totalGapSpace;
  const cardArcLength = totalCardSpace / cardCount;
  const angleBetweenCards = (cardArcLength + gapPx) / circumference * 360;

  steps.forEach((step, i) => {
    const card = document.createElement('div');
    card.className = 'card glowing';
    card.innerHTML = `
      <img src="${step.img}" alt="Step ${i + 1}" />
      
    `;

    const angle = i * angleBetweenCards;
    const rad = angle * (Math.PI / 180);
    const x = radius * Math.sin(rad);
    const z = radius * Math.cos(rad);

    card.style.transform = `translateX(${x}px) translateZ(${z}px) translateY(-50%) rotateY(${angle}deg) scale(1.15)`;
    circle.appendChild(card);
  });
}

// Rotation state
let rotX = 10;
let rotY = 100;
let isDragging = false;
let lastX, lastY;

circle.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

// Drag handlers
circle.addEventListener('mousedown', e => {
  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
  circle.style.cursor = 'grabbing';
});

window.addEventListener('mouseup', () => {
  isDragging = false;
  circle.style.cursor = 'grab';
});

window.addEventListener('mousemove', e => {
  if (!isDragging) return;

  const deltaX = e.clientX - lastX;
  const deltaY = e.clientY - lastY;

  rotY += deltaX * 0.5;
  rotX -= deltaY * 0.5;

  rotX = Math.min(90, Math.max(-90, rotX));

  circle.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

  lastX = e.clientX;
  lastY = e.clientY;
});

// Auto rotate animation
let autoRotateSpeed = 0.2; // degrees per frame
function autoRotate() {
  if (!isDragging) {
    rotY += autoRotateSpeed;
    circle.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  }
  requestAnimationFrame(autoRotate);
}

nextBtn.addEventListener('click', () => {
  currentStep++;
  if (currentStep >= steps.length) currentStep = steps.length - 1;

  if (currentStep === steps.length - 1) {
    setupCircleCards();
    playMusic(currentStep);
  }
  renderStep(currentStep);
});

// Initial load
renderStep(currentStep);
playMusic(currentStep);
autoRotate();





















setTimeout(() => {
  const celebration = document.getElementById('celebration-container');

  // Create congratulatory text
  const text = document.createElement('div');
  text.id = 'congrats-text';
  text.innerHTML = '🎉🎊💍 Congratulations! 💍🎊🎉';
  document.body.appendChild(text);

  setTimeout(() => {
    text.style.opacity = 1;
  }, 200); // Fade in slightly after adding

  // Create falling emojis
  const emojis = ['🎉', '🎊', '💖', '💍', '💫', '🌸', '✨'];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div');
    el.className = 'emoji';
    el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = Math.random() * 20 + 20 + 'px';
    el.style.animationDuration = 4 + Math.random() * 3 + 's';
    el.style.animationDelay = Math.random() * 2 + 's';
    celebration.appendChild(el);
  }
}, 17000); 




  setTimeout(() => {
    const img = document.getElementById('img3');
    img.style.display = 'block';
  }, 35000); 

