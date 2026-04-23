// ── Custom cursor ─────────────────────────────────────────────
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a, button, .work-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ── Click ripple — fires on every <a> inside .work-item, then navigates ──
document.querySelectorAll('.work-item a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const url = a.getAttribute('href');
    const rc  = a.getBoundingClientRect();
    const rip = document.createElement('div');
    rip.className = 'ripple';
    rip.style.left = (rc.left + rc.width  / 2) + 'px';
    rip.style.top  = (rc.top  + rc.height / 2) + 'px';
    document.body.appendChild(rip);
    setTimeout(() => rip.remove(), 700);
    setTimeout(() => { window.location.href = url; }, 400);
  });
});

// ── Mouse: move cursor + pupils ────────────────────────────────
document.addEventListener('mousemove', e => {
  const mx = e.clientX, my = e.clientY;

  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';

  document.querySelectorAll('.eye-svg').forEach(svg => {
    const rc  = svg.getBoundingClientRect();
    const ecx = rc.left + rc.width  / 2;
    const ecy = rc.top  + rc.height / 2;
    const dx  = mx - ecx, dy = my - ecy;
    const dist = Math.hypot(dx, dy);
    const maxM = 5;
    const nx = dist > 0 ? (dx / dist) * Math.min(dist * 0.1, maxM) : 0;
    const ny = dist > 0 ? (dy / dist) * Math.min(dist * 0.1, maxM) : 0;

    svg.querySelectorAll('.mv').forEach(el => {
      if (!el.dataset.ox) {
        el.dataset.ox = el.getAttribute('cx') || el.getAttribute('x');
        el.dataset.oy = el.getAttribute('cy') || el.getAttribute('y');
      }
      el.setAttribute('cx', parseFloat(el.dataset.ox) + nx);
      el.setAttribute('cy', parseFloat(el.dataset.oy) + ny);
    });
  });
});

// ── Tab switching ──────────────────────────────────────────────
const tabs     = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.section');
const counter  = document.getElementById('section-counter');

const labels = {
  media:     'Media Animation',
  game:      'Game Design',
  product:   'Product Design',
  prototype: 'Prototype & Concept',
};

tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    sections.forEach(s => s.classList.remove('active'));
    document.getElementById('tab-' + target).classList.add('active');

    counter.textContent = '— ' + labels[target];
  });
});