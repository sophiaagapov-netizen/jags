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
const dotsWrap = document.getElementById('sliderDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (track && dotsWrap && prevBtn && nextBtn) {
  let current = 0;
  let dots = [];
  const images = track.querySelectorAll('img');
  const total  = images.length;
  // Show 4 at a time on desktop, 2 on mobile
  function getVisible() {
    return window.innerWidth < 640 ? 2 : 4;
  }
  function maxSlide() {
    return Math.max(0, total - getVisible());
  }
  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i <= maxSlide(); i += 1) {
      const dot = document.createElement('span');
      dot.className = 'dot';
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
    dots = dotsWrap.querySelectorAll('.dot');
  }
  function goTo(index) {
    current = Math.max(0, Math.min(index, maxSlide()));
    // Calculate slide width (image width + gap)
    const imgW = images[0].offsetWidth + 12;
    track.style.transform = `translateX(-${current * imgW}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }
  buildDots();
  goTo(0);
  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Auto-advance every 4 seconds
  setInterval(() => {
    const next = current >= maxSlide() ? 0 : current + 1;
    goTo(next);
  }, 4000);

  window.addEventListener('resize', () => {
    buildDots();
    goTo(current);
  });
}
