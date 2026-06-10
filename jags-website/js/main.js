// ===== Mobile Nav Toggle =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ===== Impact Photo Slider =====
const track  = document.getElementById('impactTrack');
const dots   = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (track && dots.length) {
  let current = 0;
  const images = track.querySelectorAll('img');
  const total  = images.length;
  // Show 4 at a time on desktop, 2 on mobile
  function getVisible() {
    return window.innerWidth < 640 ? 2 : 4;
  }
  function maxSlide() {
    return Math.max(0, total - getVisible());
  }
  function goTo(index) {
    current = Math.max(0, Math.min(index, maxSlide()));
    // Calculate slide width (image width + gap)
    const imgW = images[0].offsetWidth + 12;
    track.style.transform = `translateX(-${current * imgW}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }
  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  // Auto-advance every 4 seconds
  setInterval(() => {
    const next = current >= maxSlide() ? 0 : current + 1;
    goTo(next);
  }, 4000);

  window.addEventListener('resize', () => goTo(current));
}
