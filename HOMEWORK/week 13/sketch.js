const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

const hoverTargets = document.querySelectorAll("a, button, img, .Button a");

hoverTargets.forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
  });

  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});

const container = document.querySelector(".proGrams");
const cards = document.querySelectorAll(".figureWrapper");
const cardWidth = cards[0].offsetWidth + 50;   // 1500 + gap(50)
let index = 0;

document.querySelector(".btnRight").onclick = () => {
    if (index < cards.length - 1) index++;
    container.scrollTo({ left: index * cardWidth, behavior: "smooth" });
};

document.querySelector(".btnLeft").onclick = () => {
    if (index > 0) index--;
    container.scrollTo({ left: index * cardWidth, behavior: "smooth" });
};



const slider = document.querySelector('.ArielName');
const slides = document.querySelectorAll('.ArielName figure');
const btnPrev = document.querySelector('.expBtnPrev');
const btnNext = document.querySelector('.expBtnNext');

let explor = 0; // 当前索引
// 更新显示：移动容器 + 切 active 类
function updateSlide() {

    slider.style.transform = `translateX(-${explor * 100}%)`;

    // 更新 active（用于触发 figcaption / image 动画）
    slides.forEach((s, i) => {
        s.classList.toggle('active', i === explor);
    });
}

// 右键：到头就停（不循环）
btnNext.addEventListener('click', () => {
    if (explor < slides.length - 1) {
        explor++;
        updateSlide();
    } else {
    }
});

// 左键：到头就停
btnPrev.addEventListener('click', () => {
    if (explor > 0) {
        explor--;
        updateSlide();
    }
});

// 初始化
updateSlide();