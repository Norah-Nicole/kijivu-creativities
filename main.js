// Scroll reveal animation
window.addEventListener("scroll", reveal);

function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const revealTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

// ======= GALLERY FILTER FUNCTIONALITY =======
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    galleryItems.forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ======= LIGHTBOX FUNCTIONALITY (IMAGES + VIDEOS + CAPTIONS + ARROWS) =======
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const captionText = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
const galleryArray = Array.from(document.querySelectorAll('.gallery-item'));

function openLightbox(index) {
  lightboxVideo.pause();

  const currentItem = galleryArray[index];
  const mediaType = currentItem.dataset.type;
  const caption = currentItem.dataset.caption || '';

  lightbox.style.display = 'block';
  lightboxImg.style.display = 'none';
  lightboxVideo.style.display = 'none';

  if (mediaType === 'video') {
    lightboxVideo.src = currentItem.src || currentItem.dataset.src;
    lightboxVideo.style.display = 'block';
    lightboxVideo.play();
  } else {
    lightboxImg.src = currentItem.src;
    lightboxImg.style.display = 'block';
  }

  captionText.textContent = caption;
  currentIndex = index;
}

galleryArray.forEach((item, index) => {
  item.addEventListener('click', () => openLightbox(index));
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
  lightboxVideo.pause();
  lightboxVideo.src = "";
});

window.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
    lightboxVideo.pause();
    lightboxVideo.src = "";
  }
});

prevBtn.addEventListener('click', () => {
  lightboxVideo.pause();
  lightboxVideo.src = "";
  currentIndex = (currentIndex - 1 + galleryArray.length) % galleryArray.length;
  openLightbox(currentIndex);
});

nextBtn.addEventListener('click', () => {
  lightboxVideo.pause();
  lightboxVideo.src = "";
  currentIndex = (currentIndex + 1) % galleryArray.length;
  openLightbox(currentIndex);
});