'use strict';

/* Плавный скролл к элементу */
/*
document.querySelectorAll('a[href^="#"').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        let href = this.getAttribute('href').substring(1);
        const scrollTarget = document.getElementById(href);
        // const topOffset = document.querySelector('.scrollto').offsetHeight; // если нужен отступ сверху
        const topOffset = 0;
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});
*/

// hero swiper
const swiper = new Swiper('.swiper', {
  speed: 400,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },

  breakpoints: {
    1200: {
      navigation: {
        nextEl: '.hero__arrow--next',
        prevEl: '.hero__arrow--prev',
      },
    }
  },
});

/* Кнопка меню */
const menuBtns = document.querySelectorAll('.menu-btn');
const menuBtnClassActive = 'menu-btn--active';

if (menuBtns.length > 0) {
  menuBtns.forEach(menuBtn => {
    menuBtn.addEventListener('click', toggleMenuBtn);

    function toggleMenuBtn() {
      let isActive = this.classList.contains(menuBtnClassActive);

      if (isActive) {
        this.classList.remove(menuBtnClassActive);
      } else {
        this.classList.add(menuBtnClassActive);
      }
    };
  })
};

// клик по кнопке поворот стрелки и вызов меню
const headerDropMenu = document.querySelector('.header__drop-menu'),
  menuBtn = document.querySelector('.menu__btn'),
  filterBtns = document.querySelectorAll('.filter__btn'),
  dropMenuButtons = document.querySelectorAll('.drop-menu__button'),
  filterOpenBtn = document.querySelector('.filter__open');


function arrowRotate(el) {
  el.classList.toggle('active');
}

menuBtn.addEventListener('click', function () {
  arrowRotate(this);
  headerDropMenu.classList.toggle('drop-menu--active');
});

filterOpenBtn.addEventListener('click', function () {
  arrowRotate(this);
  this.closest('.filter').classList.toggle('filter--active');
});

for (const btn of filterBtns) {
  btn.addEventListener('click', () => {
    arrowRotate(btn);
    btn.closest('.filter__item').querySelector('.drop-menu').classList.toggle('drop-menu--active');
  });
}

for (const btn of dropMenuButtons) {
  btn.addEventListener('click', () => {
    arrowRotate(btn.closest('.filter__item').querySelector('.filter__btn'));

    btn.closest('.drop-menu').classList.toggle('drop-menu--active');
  });
}



