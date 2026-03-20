// ═══════════════════════════════════════════════
//  DATA  — 修改这里定制你的卡片内容
// ═══════════════════════════════════════════════
const DATA = [
  {
    title: "WHO I AM",
    tag: "Identity",
    bg: "linear-gradient(145deg,#c9b99a,#e8ddd0 55%,#bdb0a0)",
    body: `你好，我是 <strong>[你的名字]</strong>。<br/><br/>
           设计师 / 开发者 / 创造者。<br/>
           在视觉语言与代码逻辑之间游走，
           相信好的界面是一种无声的对话。`,
  },
  {
    title: "PORTRAIT",
    tag: "Identity",
    // 👉 替换成你自己的照片 URL
    bg: "url(https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80) center/cover",
    body: "替换成你自己的照片 URL。",
  },
  {
    title: "RED THREAD",
    tag: "Philosophy",
    bg: "linear-gradient(140deg,#c0392b,#8e1515 50%,#2c0a0a)",
    body: "我所有作品背后的红线：<br/>用最少的形式，承载最多的意思。",
  },
];

// ═══════════════════════════════════════════════
//  SETUP
// ═══════════════════════════════════════════════
const ring = document.getElementById('ring');
const N    = DATA.length;
const VW   = window.innerWidth;

// Card dimensions — responsive
const CW     = Math.min(VW * 0.19, 800);
const CH     = CW * 1.2;

// Circle radius: fit all cards with a small gap
const GAP    = CW * 1;
const RADIUS = ((CW + GAP) * N) / (2 * Math.PI);

// Degrees between each card
const STEP = 360 / N;

// ── Build cards ──────────────────────────────
DATA.forEach((d, i) => {
  const card  = document.createElement('div');
  card.className   = 'card';
  card.dataset.i   = i;

  const angle  = STEP * i;
  const rad    = angle * Math.PI / 180;
  const tx     = Math.sin(rad) * RADIUS - CW / 2;
  const tz     = -Math.cos(rad) * RADIUS;

  card.style.cssText = `
    width:${CW}px;
    height:${CH}px;
    transform: translate3d(${tx}px, ${-CH / 2}px, ${tz}px) rotateY(${angle}deg);
  `;

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-bg" style="background:${d.bg}"></div>
      <div class="card-gloss"></div>
      <div class="card-shade"></div>
      <div class="card-num">${String(i + 1).padStart(2, '0')}</div>
      <div class="card-label" style="font-size:${CW * 0.095}px">${d.title}</div>
    </div>
  `;

  card.addEventListener('click', () => spinTo(i, true));
  ring.appendChild(card);
});

// ═══════════════════════════════════════════════
//  ROTATION ENGINE
// ═══════════════════════════════════════════════
let current  = 0;   // live rotateY of ring
let target   = 0;   // destination rotateY
let rafId;
let frontIdx = 0;   // index of card currently facing front

function applyTransform() {
  ring.style.transform =
    `translate(-50%,-50%) rotateX(-8deg) rotateY(${current}deg)`;
  updateCardStyles();
}

function updateCardStyles() {
  ring.querySelectorAll('.card').forEach((c, i) => {
    const cardAngle  = (STEP * i + current % 360 + 360) % 360;
    const normalised = cardAngle > 180 ? cardAngle - 360 : cardAngle;
    c.classList.toggle('back', Math.abs(normalised) > 90);
  });
}

function animate() {
  const diff = target - current;
  if (Math.abs(diff) < 0.02) {
    current = target;
    applyTransform();
    return;
  }
  current += diff * 0.08;
  applyTransform();
  rafId = requestAnimationFrame(animate);
}

function spinTo(idx, openPanel) {
  cancelAnimationFrame(rafId);

  // Bring card idx to front → ring must rotateY to -(STEP * idx)
  const desired = -(STEP * idx);

  // Shortest-path delta
  let delta = desired - (target % 360);
  if (delta >  180) delta -= 360;
  if (delta < -180) delta += 360;

  target   = target + delta;
  frontIdx = idx;
  rafId    = requestAnimationFrame(animate);
  if (openPanel) openDetail(idx);
}

function stepLeft()  { spinTo((frontIdx - 1 + N) % N, false); }
function stepRight() { spinTo((frontIdx + 1)     % N, false); }

applyTransform(); // initial render

// ═══════════════════════════════════════════════
//  DRAG / SWIPE
// ═══════════════════════════════════════════════
const stage = document.getElementById('stage');
let dragX    = null;
let dragBase = 0;

stage.addEventListener('pointerdown', e => {
  dragX    = e.clientX;
  dragBase = target;
  cancelAnimationFrame(rafId);
  stage.setPointerCapture(e.pointerId);
});

stage.addEventListener('pointermove', e => {
  if (dragX === null) return;
  const dx = e.clientX - dragX;
  current = target = dragBase + dx * 0.35;
  applyTransform();
});

stage.addEventListener('pointerup', () => {
  if (dragX === null) return;
  dragX = null;

  // Snap to nearest card
  const snapped = Math.round(-target / STEP);
  frontIdx      = ((snapped % N) + N) % N;
  target        = -(snapped * STEP);
  rafId         = requestAnimationFrame(animate);
});

// Scroll wheel
stage.addEventListener('wheel', e => {
  e.preventDefault();
  if (e.deltaY > 0) stepRight(); else stepLeft();
}, { passive: false });

// Keyboard
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft')  stepLeft();
  if (e.key === 'ArrowRight') stepRight();
  if (e.key === 'Escape')     closeDetail();
});

// Arrow buttons
document.getElementById('arrowL').addEventListener('click', stepLeft);
document.getElementById('arrowR').addEventListener('click', stepRight);



// ═══════════════════════════════════════════════
//  NAV ACTIVE TOGGLE
// ═══════════════════════════════════════════════
document.querySelectorAll('.nav-link').forEach(el => {
  el.addEventListener('click', function () {
    this.closest('.nav-left, .nav-right')
      .querySelectorAll('.nav-link')
      .forEach(x => x.classList.remove('active'));
    this.classList.add('active');
  });
});

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