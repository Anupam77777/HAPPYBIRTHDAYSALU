// CONFIG: Replace filenames and captions with your real photos/videos
const galleries = {
  queen: {
    title: "👑 The Queen of hearts",
    intro: "Every queen deserves her own gallery. Here are that remind me why you're royalty to me.",
    items: [
      {type: "image", src: "media/queen/queen1.jpg", caption: "Moment 1 - Your smile lights up my world"},
      {type: "image", src: "media/queen/queen2.jpg", caption: "Moment 2 - That day I fell for you harder"},
      {type: "image", src: "media/queen/queen3.jpg", caption: "Moment 3 - Pure magic"},
      {type: "image", src: "media/queen/queen4.jpg", caption: "Moment 4 - My favorite memory"},
      {type: "image", src: "media/queen/queen5.jpg", caption: "Moment 5 - You make everything better"},
      {type: "image", src: "media/queen/queen6.jpg", caption: "Moment 6 - Love in every frame"},
      {type: "image", src: "media/queen/queen7.jpg", caption: "Moment 7 - You're my everything"},
      {type: "image", src: "media/queen/queen8.jpg", caption: "Moment 8 - Perfectly imperfect"},
      {type: "image", src: "media/queen/queen9.jpg", caption: "Moment 9 - Happy Birthday Bubu"},
      {type: "image", src: "media/queen/queen10.jpg", caption: "Moment 10 - Stay Blessed always"},
    ]
  },

  special: {
    title: "🎁 Special treat",
    intro: "Just one special thing... made with all my love.",
    items: [
      {
        type: "video", 
        src: "media/special/special1.mp4", 
        caption: "This is for you. Watch it as many times as your heart desires."
      }
    ]
  },

  memories: {
    title: "💭 Memories",
    intro: "memories live rent-free in my heart. Each one tells our story.",
    items: [
      {type: "image", src: "media/memories/mem1.jpg", caption: "Memory 1 - One with Mom and Pop"},
      {type: "image", src: "media/memories/mem2.jpg", caption: "Memory 2 - When I was a small cat"},
      {type: "image", src: "media/memories/mem3.jpg", caption: "Memory 3 - One with the cousins"},
      {type: "image", src: "media/memories/mem4.jpg", caption: "Memory 4 - One with the besties for life"},
      {type: "image", src: "media/memories/mem5.jpg", caption: "Memory 5 - One with TungTung"},
      {type: "image", src: "media/memories/mem6.jpg", caption: "Memory 6 - One with the School besties"},
      {type: "image", src: "media/memories/mem7.jpg", caption: "Memory 7 - One with the college besties"},
      {type: "image", src: "media/memories/mem8.jpg", caption: "Memory 8 - One with the Fav Colleague"},
      {type: "image", src: "media/memories/mem9.jpg", caption: "Memory 9 - One with the sisters"},
      {type: "image", src: "media/memories/mem10.jpg", caption: "Memory 10 - One in the air"},
      {type: "image", src: "media/memories/mem11.jpg", caption: "Memory 11 - One with the eyes speaking"},
      {type: "image", src: "media/memories/mem12.jpg", caption: "Memory 12 - One with Sun and Shadow"},
      {type: "image", src: "media/memories/mem13.jpg", caption: "Memory 13 - One scared of deal signing"},
      {type: "image", src: "media/memories/mem14.jpg", caption: "Memory 14 - One when hitched"},
      {type: "image", src: "media/memories/mem15.jpg", caption: "Memory 15 - One with the blessings"},
      {type: "image", src: "media/memories/mem16.jpg", caption: "Memory 16 - One with the constants"},
      {type: "image", src: "media/memories/mem17.jpg", caption: "Memory 17 - One for the legacy"},
      {type: "image", src: "media/memories/mem18.jpg", caption: "Memory 18 - One with new bonds"},
      {type: "image", src: "media/memories/mem19.jpg", caption: "Memory 19 - One with all the hope"},
      {type: "image", src: "media/memories/mem20.jpg", caption: "Memory 20 - One for the stars"}
    ]
  }
};

let openedSections = new Set();

// Background music control
const bgMusic = document.getElementById("bg-music");
let isMusicPlaying = false;

document.addEventListener("DOMContentLoaded", () => {
  const optionButtons = document.querySelectorAll(".option-btn");
  const overlay = document.getElementById("overlay");
  const overlayContent = document.getElementById("overlay-content");
  const overlayTitle = document.getElementById("overlay-title");
  const overlayIntro = document.getElementById("overlay-intro");
  const backBtn = document.getElementById("back-btn");
  const closeOverlay = document.getElementById("close-overlay");
  const footerMsg = document.getElementById("footer-msg");
  const welcomeText = document.getElementById("welcome-text");
  const musicToggle = document.getElementById("music-toggle");

  // Typing effect for welcome text
  const fullText = welcomeText.textContent;
  welcomeText.textContent = "";
  welcomeText.classList.add("typing");
  let idx = 0;

  function typeNext() {
    if (idx <= fullText.length) {
      welcomeText.textContent = fullText.slice(0, idx);
      idx++;
      setTimeout(typeNext, 30);
    } else {
      welcomeText.classList.remove("typing");
    }
  }
  typeNext();

  // Music auto-start on first interaction (iOS/Safari compliant)
  function startMusic() {
    if (!isMusicPlaying) {
      bgMusic.volume = 0.25; // Soft volume
      bgMusic.play().catch(() => {}); // Silent fail if blocked
      isMusicPlaying = true;
    }
  }

  document.addEventListener("click", startMusic, { once: true });

  // Music toggle
  musicToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {});
      musicToggle.classList.remove("muted");
    } else {
      bgMusic.pause();
      musicToggle.classList.add("muted");
    }
  });

  // Gallery buttons
  optionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      startMusic(); // Ensure music starts
      const section = btn.dataset.section;
      showGallery(section, {
        overlay,
        overlayContent,
        overlayTitle,
        overlayIntro,
        footerMsg
      });
    });
  });

  // Close overlay
  function hideOverlay() {
    overlay.classList.add("hidden");
    if (openedSections.size === Object.keys(galleries).length) {
      showFinalMessage(footerMsg);
    }
  }

  backBtn.addEventListener("click", hideOverlay);
  closeOverlay.addEventListener("click", hideOverlay);
});

function showGallery(key, elements) {
  const { overlay, overlayContent, overlayTitle, overlayIntro } = elements;
  const gallery = galleries[key];
  if (!gallery) return;

  openedSections.add(key);
  overlayTitle.textContent = gallery.title;
  overlayIntro.textContent = gallery.intro;
  overlayContent.innerHTML = "";

  gallery.items.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    if (item.type === "video") {
      const vid = document.createElement("video");
      vid.src = item.src;
      vid.controls = true;
      vid.className = "card-media";
      vid.preload = "metadata";
      card.appendChild(vid);
    } else {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.caption || "";
      img.className = "card-media";
      img.loading = "lazy";
      card.appendChild(img);
    }

    if (item.caption) {
      const cap = document.createElement("div");
      cap.className = "card-caption";
      cap.textContent = item.caption;
      card.appendChild(cap);
    }

    overlayContent.appendChild(card);
  });

  overlay.classList.remove("hidden");
}

function showFinalMessage(footerMsg) {
  setTimeout(() => {
    footerMsg.innerHTML = `
      💖 My love, thank you for walking through these little corners of my heart. <br>
      Happy Birthday to my forever person. <br>
      May this year bring you endless love, laughter, and dreams come true. 💝
    `;
    footerMsg.classList.add("show");
  }, 500);
}
