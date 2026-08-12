// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll-to-top: anchors to a position:sticky header (#top) can silently fail to
// scroll in some browsers, so drive it directly instead of relying on the href.
document.querySelectorAll('a[href="#top"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Advertisement banner — reveal on scroll + dismiss (remembered for the session)
const adBanner = document.getElementById('adBanner');
if (adBanner) {
  const adInner = adBanner.querySelector('.ad-banner-inner');
  const adClose = document.getElementById('adClose');

  if (sessionStorage.getItem('adBannerDismissed') === '1') {
    adBanner.style.display = 'none';
  } else {
    const adObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          adInner.classList.add('in-view');
          adObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    adObserver.observe(adInner);

    if (adClose) {
      adClose.addEventListener('click', () => {
        adBanner.style.maxHeight = adBanner.offsetHeight + 'px';
        requestAnimationFrame(() => {
          adBanner.style.transition = 'max-height .35s ease, opacity .35s ease, padding .35s ease';
          adBanner.style.maxHeight = '0px';
          adBanner.style.opacity = '0';
          adBanner.style.overflow = 'hidden';
          adBanner.style.paddingTop = '0';
          adBanner.style.paddingBottom = '0';
        });
        setTimeout(() => { adBanner.style.display = 'none'; }, 380);
        sessionStorage.setItem('adBannerDismissed', '1');
      });
    }
  }
}


// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', (e) => {
    // allow dropdown parent links to just navigate on mobile too
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Mobile dropdown expand (tap to open submenu instead of hover)
document.querySelectorAll('.nav-drop > a').forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 860) {
      e.preventDefault();
      link.parentElement.classList.toggle('open');
    }
  });
});

// Horizontal scroll collection — reveal, arrows, dots, drag-to-scroll
const scrollTrack = document.getElementById('scrollTrack');
if (scrollTrack) {
  const cards = Array.from(scrollTrack.querySelectorAll('.scroll-card'));
  const dotsWrap = document.getElementById('scrollDots');
  const leftBtn = document.getElementById('scrollLeft');
  const rightBtn = document.getElementById('scrollRight');

  // Entrance animation as cards scroll into the viewport
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  cards.forEach(c => revealObserver.observe(c));

  // Dots
  cards.forEach((card, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => {
      scrollTrack.scrollTo({ left: card.offsetLeft - scrollTrack.offsetLeft, behavior: 'smooth' });
    });
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.querySelectorAll('.dot'));

  function updateActiveDot() {
    let closest = 0, closestDist = Infinity;
    cards.forEach((c, i) => {
      const dist = Math.abs(c.offsetLeft - scrollTrack.scrollLeft);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === closest));
  }
  updateActiveDot();
  scrollTrack.addEventListener('scroll', () => window.requestAnimationFrame(updateActiveDot), { passive: true });

  // Arrow buttons
  function cardStep() {
    const first = cards[0];
    const second = cards[1];
    return second ? (second.offsetLeft - first.offsetLeft) : first.getBoundingClientRect().width;
  }
  if (leftBtn) leftBtn.addEventListener('click', () => scrollTrack.scrollBy({ left: -cardStep(), behavior: 'smooth' }));
  if (rightBtn) rightBtn.addEventListener('click', () => scrollTrack.scrollBy({ left: cardStep(), behavior: 'smooth' }));

  // Keyboard support when the track has focus
  scrollTrack.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { scrollTrack.scrollBy({ left: cardStep(), behavior: 'smooth' }); }
    else if (e.key === 'ArrowLeft') { scrollTrack.scrollBy({ left: -cardStep(), behavior: 'smooth' }); }
  });

  // Drag-to-scroll (desktop mouse)
  let isDown = false, startX = 0, startScroll = 0;
  scrollTrack.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollTrack.classList.add('dragging');
    startX = e.pageX;
    startScroll = scrollTrack.scrollLeft;
  });
  window.addEventListener('mouseup', () => { isDown = false; scrollTrack.classList.remove('dragging'); });
  scrollTrack.addEventListener('mouseleave', () => { isDown = false; scrollTrack.classList.remove('dragging'); });
  scrollTrack.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    scrollTrack.scrollLeft = startScroll - (e.pageX - startX);
  });
}


// RAL / finish colour swatch picker
const swatches = document.querySelectorAll('.swatch');
const colourSvg = document.getElementById('colourSvg');
const ralReadout = document.getElementById('ralReadout');

swatches.forEach(btn => {
  btn.addEventListener('click', () => {
    swatches.forEach(b => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    const hex = btn.dataset.hex;
    colourSvg.style.setProperty('--ral-current', hex);
    if (ralReadout) ralReadout.textContent = btn.dataset.name;
  });
});

// Quote form (static placeholder submit)
const form = document.getElementById('quoteForm');
const status = document.getElementById('formStatus');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = 'Saved locally for the demo — connect a form endpoint to actually receive this.';
    form.reset();
  });
}
