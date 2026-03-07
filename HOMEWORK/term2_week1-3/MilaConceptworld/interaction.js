// ── Project list ───────────────────────────────────────────────
const projects = [
  { label:"ABOUT ME", url: "Pages/About/index.html" },
  { label: "WORK EXPERENCES", url: "Pages/Work/index.html" },
  { label: "MOTION", url: "Pages/Motion/index.html" },
  { label: "UI·UX", url: "Pages/UIUX/index.html" },
  { label: "PHOTO", url: "Pages/Photo/index.html" },
  { label: "3D WORK", url: "Pages/3Dwork/index.html"},
  { label: "PRINT", url: "Pages/Print/index.html" },
  { label: "PATTERN", url: "Pages/Pattern/index.html" },
  { label: "POSTER", url: "Pages/Poster/index.html" },
  { label: "MURAL", url: "Pages/Mural/index.html" },
  { label: "DIGITAL", url: "Pages/Digital/index.html" },
  { label: "SPATIAL", url: "Pages/Spatial/index.html" },
  { label: "COLLAB", url: "Pages/Collab/index.html" },
  { label: "ARCHIVE", url: "Pages/Archive/index.html" },
  { label: "CONTACT", url: "Pages/Contact/index.html" }
];

// ── Colour palettes ────────────────────────────────────────────
const palettes = [
  { iris:'#4fc3f7', ring1:'#ff4eb8', ring2:'#ffd166', lash:'#1a1a1a' },
  { iris:'#ff6b35', ring1:'#ffd166', ring2:'#06d6a0', lash:'#ff6b35' },
  { iris:'#06d6a0', ring1:'#4fc3f7', ring2:'#ff4eb8', lash:'#1a1a1a' },
  { iris:'#ffd166', ring1:'#ff6b35', ring2:'#4fc3f7', lash:'#ff6b35' },
  { iris:'#a855f7', ring1:'#ff4eb8', ring2:'#ffd166', lash:'#a855f7' },
  { iris:'#ff4eb8', ring1:'#06d6a0', ring2:'#ffd166', lash:'#ff4eb8' },
  { iris:'#4fc3f7', ring1:'#ffd166', ring2:'#ff6b35', lash:'#1a1a1a' },
  { iris:'#ff6b35', ring1:'#a855f7', ring2:'#4fc3f7', lash:'#1a1a1a' },
];

// ── SVG helper: lash lines ─────────────────────────────────────
function lashes(cx, cy, color, dir) {
  dir = dir || -1;
  let s = '';
  [-28,-18,-8,2,12,22,28].forEach((x, i) => {
    const len = [8,12,14,15,14,12,8][i];
    s += `<line x1="${cx+x}" y1="${cy+dir*18}" x2="${cx+x+dir}" y2="${cy+dir*(18+len)}"
            stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>`;
  });
  return s;
}

function bigLashes(cx, cy, color) {
  let s = '';
  [[-30,12],[-20,16],[-10,18],[0,18],[10,17],[20,15],[30,11]].forEach(([x,l]) => {
    s += `<line x1="${cx+x}" y1="${cy-17}" x2="${cx+x-1}" y2="${cy-17-l}"
            stroke="${color}" stroke-width="2.8" stroke-linecap="round"/>`;
  });
  return s;
}

function dotLashes(cx, cy, color) {
  let s = '';
  [-26,-16,-6,4,14,24].forEach(x => {
    s += `<circle cx="${cx+x}" cy="${cy-22}" r="3" fill="${color}"/>`;
  });
  return s;
}

function rays(cx, cy, color) {
  let s = '';
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    s += `<line x1="${cx+Math.cos(a)*32}" y1="${cy+Math.sin(a)*32}"
               x2="${cx+Math.cos(a)*44}" y2="${cy+Math.sin(a)*44}"
               stroke="${color}" stroke-width="3" stroke-linecap="round"/>`;
  }
  return s;
}

// ── Eye design templates ───────────────────────────────────────
const designs = [
  (cx,cy,p) => `
    <ellipse cx="${cx}" cy="${cy}" rx="38" ry="20" fill="white" stroke="#1a1a1a" stroke-width="2.5"/>
    <circle cx="${cx}" cy="${cy}" r="14" fill="${p.iris}" stroke="#1a1a1a" stroke-width="1.5"/>
    <circle class="mv" cx="${cx}" cy="${cy}" r="8" fill="#1a1a1a"/>
    <circle class="mv" cx="${cx-4}" cy="${cy-4}" r="3" fill="white"/>
    ${lashes(cx,cy,p.lash,-1)}`,

  (cx,cy,p) => `
    <circle cx="${cx}" cy="${cy}" r="34" fill="${p.ring1}" stroke="#1a1a1a" stroke-width="2.5"/>
    <circle cx="${cx}" cy="${cy}" r="26" fill="${p.ring2}"/>
    <circle cx="${cx}" cy="${cy}" r="18" fill="white"/>
    <circle class="mv" cx="${cx}" cy="${cy}" r="11" fill="${p.iris}" stroke="#1a1a1a" stroke-width="1.5"/>
    <circle class="mv" cx="${cx}" cy="${cy}" r="6" fill="#1a1a1a"/>
    <circle class="mv" cx="${cx-3}" cy="${cy-3}" r="2.5" fill="white"/>`,

  (cx,cy,p) => `
    <path d="M${cx-38},${cy} Q${cx},${cy-26} ${cx+38},${cy} Q${cx},${cy+26} ${cx-38},${cy}Z"
          fill="white" stroke="#1a1a1a" stroke-width="2.5"/>
    <circle class="mv" cx="${cx}" cy="${cy}" r="13" fill="${p.iris}"/>
    <circle class="mv" cx="${cx}" cy="${cy}" r="7" fill="#1a1a1a"/>
    <circle class="mv" cx="${cx-4}" cy="${cy-4}" r="3" fill="white"/>
    ${lashes(cx,cy,p.lash,-1)}
    <ellipse cx="${cx+30}" cy="${cy+28}" rx="5" ry="8" fill="#1a1a1a"/>`,

  (cx,cy,p) => `
    <polygon points="${cx},${cy-40} ${cx+46},${cy+24} ${cx-46},${cy+24}"
             fill="${p.ring1}" stroke="#1a1a1a" stroke-width="2.5"/>
    <path d="M${cx-28},${cy+8} Q${cx},${cy-16} ${cx+28},${cy+8} Q${cx},${cy+26} ${cx-28},${cy+8}Z"
          fill="white" stroke="#1a1a1a" stroke-width="2"/>
    <circle class="mv" cx="${cx}" cy="${cy+8}" r="11" fill="${p.iris}"/>
    <circle class="mv" cx="${cx}" cy="${cy+8}" r="6" fill="#1a1a1a"/>
    <circle class="mv" cx="${cx-3}" cy="${cy+5}" r="2.5" fill="white"/>`,

  (cx,cy,p) => `
    <path d="M${cx-40},${cy} Q${cx},${cy-22} ${cx+40},${cy} Q${cx},${cy+22} ${cx-40},${cy}Z"
          fill="white" stroke="#1a1a1a" stroke-width="2.5"/>
    <circle cx="${cx}" cy="${cy}" r="15" fill="${p.ring1}" stroke="#1a1a1a" stroke-width="1.5"/>
    <circle class="mv" cx="${cx}" cy="${cy}" r="9" fill="${p.iris}"/>
    <circle class="mv" cx="${cx}" cy="${cy}" r="5" fill="#1a1a1a"/>
    <circle class="mv" cx="${cx-2}" cy="${cy-2}" r="2" fill="white"/>
    ${lashes(cx,cy,p.lash,-1)}${lashes(cx,cy,p.lash,1)}`,

  (cx,cy,p) => `
    <path d="M${cx-38},${cy} Q${cx},${cy-16} ${cx+38},${cy}"
          fill="none" stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M${cx-38},${cy} Q${cx},${cy+16} ${cx+38},${cy}"
          fill="none" stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round"/>
    <circle class="mv" cx="${cx}" cy="${cy}" r="13" fill="${p.iris}" stroke="#1a1a1a" stroke-width="2"/>
    <circle class="mv" cx="${cx}" cy="${cy}" r="7" fill="#1a1a1a"/>
    <circle class="mv" cx="${cx-3}" cy="${cy-3}" r="2.5" fill="white"/>`,

  (cx,cy,p) => `
    <ellipse cx="${cx}" cy="${cy}" rx="36" ry="19" fill="white" stroke="${p.ring1}" stroke-width="3"/>
    <ellipse cx="${cx}" cy="${cy}" rx="36" ry="19" fill="none" stroke="#1a1a1a" stroke-width="1.5" stroke-dasharray="5 3"/>
    <circle class="mv" cx="${cx}" cy="${cy}" r="13" fill="${p.iris}"/>
    <circle class="mv" cx="${cx}" cy="${cy}" r="7" fill="#1a1a1a"/>
    <circle class="mv" cx="${cx-4}" cy="${cy-4}" r="3" fill="white"/>
    ${lashes(cx,cy,p.lash,-1)}`,

  (cx,cy,p) => `
    <path d="M${cx-42},${cy+4} Q${cx-8},${cy-22} ${cx+10},${cy-20} Q${cx+42},${cy-16} ${cx+42},${cy+4}
             Q${cx+10},${cy+20} ${cx-10},${cy+20} Q${cx-42},${cy+18} ${cx-42},${cy+4}Z"
          fill="white" stroke="#1a1a1a" stroke-width="2.5"/>
    <ellipse class="mv" cx="${cx}" cy="${cy+1}" rx="12" ry="15" fill="${p.iris}" stroke="#1a1a1a" stroke-width="1.5"/>
    <ellipse class="mv" cx="${cx}" cy="${cy+1}" rx="5" ry="12" fill="#1a1a1a"/>
    <circle class="mv" cx="${cx-2}" cy="${cy-4}" r="2.5" fill="white"/>`,

  (cx,cy,p) => `
    <ellipse cx="${cx}" cy="${cy}" rx="38" ry="20" fill="white" stroke="#1a1a1a" stroke-width="2.5"/>
    ${dotLashes(cx,cy,p.ring1)}
    <circle class="mv" cx="${cx}" cy="${cy}" r="13" fill="${p.iris}" stroke="#1a1a1a" stroke-width="2"/>
    <circle class="mv" cx="${cx}" cy="${cy}" r="7" fill="#1a1a1a"/>
    <circle class="mv" cx="${cx-4}" cy="${cy-4}" r="3" fill="white"/>`,

  (cx,cy,p) => `
    ${rays(cx,cy,p.ring1)}
    <ellipse cx="${cx}" cy="${cy}" rx="30" ry="16" fill="white" stroke="#1a1a1a" stroke-width="2.5"/>
    <circle class="mv" cx="${cx}" cy="${cy}" r="11" fill="${p.iris}"/>
    <circle class="mv" cx="${cx}" cy="${cy}" r="6" fill="#1a1a1a"/>
    <circle class="mv" cx="${cx-3}" cy="${cy-3}" r="2.5" fill="white"/>`,

  (cx,cy,p) => `
    <path d="M${cx-40},${cy+5} Q${cx},${cy-24} ${cx+40},${cy+5} Q${cx},${cy+24} ${cx-40},${cy+5}Z"
          fill="white" stroke="#1a1a1a" stroke-width="2.5"/>
    <circle cx="${cx}" cy="${cy+2}" r="13" fill="${p.iris}"/>
    <circle class="mv" cx="${cx}" cy="${cy+2}" r="7" fill="#1a1a1a"/>
    <circle class="mv" cx="${cx-3}" cy="${cy-2}" r="3" fill="white"/>
    ${bigLashes(cx,cy,p.lash)}`,

  (cx,cy,p) => `
    <circle cx="${cx}" cy="${cy}" r="36" fill="${p.ring2}" stroke="#1a1a1a" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="28" fill="${p.ring1}"/>
    <circle cx="${cx}" cy="${cy}" r="20" fill="white"/>
    <circle class="mv" cx="${cx}" cy="${cy}" r="12" fill="${p.iris}"/>
    <circle class="mv" cx="${cx}" cy="${cy}" r="7" fill="#1a1a1a"/>
    <circle class="mv" cx="${cx-3}" cy="${cy-3}" r="2.5" fill="white"/>`,

  (cx,cy,p) => `
    <path d="M${cx-38},${cy+5} Q${cx},${cy+22} ${cx+38},${cy+5}"
          fill="none" stroke="#1a1a1a" stroke-width="2.5"/>
    <path d="M${cx-38},${cy+5} Q${cx-5},${cy-22} ${cx+38},${cy+5}"
          fill="${p.ring1}" stroke="#1a1a1a" stroke-width="2.5"/>
    <circle class="mv" cx="${cx}" cy="${cy+3}" r="13" fill="${p.iris}" stroke="#1a1a1a" stroke-width="1.5"/>
    <circle class="mv" cx="${cx}" cy="${cy+3}" r="7" fill="#1a1a1a"/>
    <circle class="mv" cx="${cx-3}" cy="${cy}" r="3" fill="white"/>
    ${dotLashes(cx,cy,p.ring2)}`,

  (cx,cy,p) => `
    <path d="M${cx-44},${cy} Q${cx-8},${cy-18} ${cx+10},${cy-18} L${cx+44},${cy}
             Q${cx+10},${cy+18} ${cx-10},${cy+18} Z"
          fill="white" stroke="#1a1a1a" stroke-width="2.5"/>
    <circle class="mv" cx="${cx+3}" cy="${cy}" r="14" fill="${p.iris}"/>
    <circle class="mv" cx="${cx+3}" cy="${cy}" r="8" fill="#1a1a1a"/>
    <circle class="mv" cx="${cx}" cy="${cy-4}" r="3" fill="white"/>
    ${lashes(cx,cy,p.lash,-1)}`,

  (cx,cy,p) => `
    <ellipse cx="${cx}" cy="${cy}" rx="34" ry="18" fill="white" stroke="#1a1a1a" stroke-width="2.5"/>
    <circle cx="${cx}" cy="${cy}" r="14" fill="${p.ring1}" stroke="#1a1a1a" stroke-width="2"/>
    <circle class="mv" cx="${cx}" cy="${cy}" r="8" fill="${p.iris}"/>
    <circle class="mv" cx="${cx}" cy="${cy}" r="4" fill="#1a1a1a"/>
    <circle class="mv" cx="${cx-2}" cy="${cy-2}" r="2" fill="white"/>
    ${dotLashes(cx,cy,p.ring2)}`,
];

const rots = [-5,-3,6,-8,4,-6,3,-4,7,-5,2,-7,5,-2,8];

// ── DOM refs ───────────────────────────────────────────────────
const grid    = document.getElementById('eyes-grid');
const cursor  = document.getElementById('cursor');
const tooltip = document.getElementById('tooltip');

// ── Floating particles (canvas) ────────────────────────────────
(function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles';
  canvas.style.cssText = [
    'position:fixed', 'inset:0', 'width:100%', 'height:100%',
    'pointer-events:none', 'z-index:0'
  ].join(';');
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  const colors = ['#a200ff'];
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function makeParticle(fromBottom) {
    return {
      x:       Math.random() * W,
      y:       fromBottom ? H + 20 : Math.random() * H,
      len:     Math.random() * 14 + 6,        // line length 6–20px
      width:   Math.random() * 1,     // stroke width 0.4–1.6px
      speed:   Math.random() * 1.4 + 0.4,     // upward speed
      opacity: Math.random() * 0.5 + 0.15,
      color:   colors[Math.floor(Math.random() * colors.length)],
    };
  }

  for (let i = 0; i < 120; i++) particles.push(makeParticle(false));

  function animate() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach((p, idx) => {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x, p.y + p.len);   // straight vertical line going up
      ctx.strokeStyle  = p.color;
      ctx.lineWidth    = p.width;
      ctx.globalAlpha  = p.opacity;
      ctx.lineCap      = 'round';
      ctx.stroke();

      p.y -= p.speed;                  // move straight up, no drift
      if (p.y + p.len < 0) particles[idx] = makeParticle(true);
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  animate();
})();

// ── Build eye cards ────────────────────────────────────────────
projects.forEach((proj, i) => {
  const label = typeof proj === 'string' ? proj : proj.label;
  const url   = typeof proj === 'string' ? `#${proj.toLowerCase().replace(/[·\s]/g,'-')}` : proj.url;
  const card = document.createElement('div');
  card.className = 'eye-card';
  card.style.animationDelay = (i * 0.06) + 's';

  const p   = palettes[i % palettes.length];
  const W   = 96, H = 82, cx = W / 2, cy = H / 2;
  const rot = rots[i % rots.length];

  card.innerHTML = `
    <a href="${url}" data-label="${label}">
      <div class="eye-svg-wrap" style="transform:rotate(${rot}deg)">
        <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"
             class="eye-svg" data-cx="${cx}" data-cy="${cy}"
             xmlns="http://www.w3.org/2000/svg" overflow="visible">
          ${designs[i % designs.length](cx, cy, p)}
        </svg>
      </div>
      <span class="eye-label">${label}</span>
    </a>`;

  grid.appendChild(card);

  // Hover events
  const a = card.querySelector('a');
  a.addEventListener('mouseenter', () => {
    cursor.classList.add('hovering');
    tooltip.textContent = '→ ' + label;
    tooltip.classList.add('visible');
  });
  a.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovering');
    tooltip.classList.remove('visible');
  });

  // Click ripple
  a.addEventListener('click', e => {
    e.preventDefault();
    const rc  = a.getBoundingClientRect();
    const rip = document.createElement('div');
    rip.className = 'ripple';
    rip.style.left = (rc.left + rc.width  / 2) + 'px';
    rip.style.top  = (rc.top  + rc.height / 2) + 'px';
    document.body.appendChild(rip);
    setTimeout(() => rip.remove(), 700);
    // Uncomment to navigate after effect:
    setTimeout(() => { window.location.href = url; }, 400);
  });

  // Random blink
  (function blink() {
    const svg = card.querySelector('.eye-svg');
    setTimeout(() => {
      svg.style.transform = 'scaleY(0.08)';
      setTimeout(() => {
        svg.style.transform = '';
        blink();
      }, 110);
    }, 2500 + Math.random() * 5000 + i * 200);
  })();
});

// ── Mouse: move cursor + pupils ────────────────────────────────
document.addEventListener('mousemove', e => {
  const mx = e.clientX, my = e.clientY;

  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  tooltip.style.left = (mx + 18) + 'px';
  tooltip.style.top  = (my -  8) + 'px';

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