// 1. Live clock in the navbar
const clock = document.getElementById('clock');
function updateClock() {
  clock.textContent = new Date().toLocaleTimeString('en-GB');
}
updateClock();
setInterval(updateClock, 1000);

// 2. Navbar background after scrolling
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// 3. Mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => menu.classList.remove('open'))
);

// 4. Reveal elements when they come into view
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 5. Count-up numbers
const counters = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const goal = +el.dataset.count;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      el.textContent = current;
      if (current >= goal) clearInterval(timer);
    }, 1500 / goal);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => countObserver.observe(c));

// 6. Simple contact form message
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('msg').textContent = 'Thanks! We will contact you soon.';
  e.target.reset();
});