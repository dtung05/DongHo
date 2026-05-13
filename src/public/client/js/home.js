
(function () {
  const track  = document.getElementById('heroTrack');
  const dots   = document.querySelectorAll('.hero-dot');
  const slides = document.querySelectorAll('.hero-slide');
  let cur = 0, timer;

  function goTo(n) {
    cur = (n + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (cur * 100) + '%)';
    dots.forEach((d, i) => d.classList.toggle('active', i === cur));
  }

  function next() { goTo(cur + 1); }
  function prev() { goTo(cur - 1); }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(next, 4500);
  }

  document.getElementById('heroNext').addEventListener('click', function () { next(); startAuto(); });
  document.getElementById('heroPrev').addEventListener('click', function () { prev(); startAuto(); });
  dots.forEach(function (d, i) {
    d.addEventListener('click', function () { goTo(i); startAuto(); });
  });

  startAuto();
})();
