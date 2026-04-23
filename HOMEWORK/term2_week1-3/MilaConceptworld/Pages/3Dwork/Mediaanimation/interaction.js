// ── Custom cursor ──────────────────────────────
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ── Click ripple ───────────────────────────────
document.addEventListener('click', e => {
  const rip = document.createElement('div');
  rip.className = 'ripple';
  rip.style.left = e.clientX + 'px';
  rip.style.top  = e.clientY + 'px';
  document.body.appendChild(rip);
  setTimeout(() => rip.remove(), 600);
});
