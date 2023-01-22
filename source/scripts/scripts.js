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
const swiper = new Swiper('.hero__swiper', {
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

const swiper1 = new Swiper('.video-section__inner', {
  speed: 400,
  spaceBetween: 30,


  breakpoints: {
    1200: {
      pagination: {
        el: '.video-section__pagination',
        type: "fraction",
      },
      navigation: {
        nextEl: '.video-section__next',
        prevEl: '.video-section__prev',
      },
    }
  },
});

const swiper2 = new Swiper('.reviews__swiper', {
  speed: 400,
  slidesPerView: "auto",
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,

  breakpoints: {
    1200: {
      pagination: {
        el: '.reviews__pagination',
        type: "fraction",
      },

      navigation: {
        nextEl: '.reviews__next',
        prevEl: '.reviews__prev',
      },
      spaceBetween: 60,
    }
  },
});

// для видео слайдера попробовать потом
// z-index: 8;
//     transform: translate3d(calc(-480px + 12.25%), 0px, -100px) rotateZ(0deg) scale(1);



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
    if (btn.classList.contains('active')) {
      for (const btn of filterBtns) {
        btn.classList.remove('active');
      }
    } else {
      for (const btn of filterBtns) {
        btn.classList.remove('active');
      }
      arrowRotate(btn);
    }

    const dropFilterMenus = document.querySelectorAll('.filter__drop-menu');
    let thisMenu = btn.closest('.filter__item').querySelector('.drop-menu');
    if (thisMenu.classList.contains('drop-menu--active')) {
      for (const menu of dropFilterMenus) {
        menu.classList.remove('drop-menu--active');
      }
    } else {
      for (const menu of dropFilterMenus) {
        menu.classList.remove('drop-menu--active');
      }


      thisMenu.classList.add('drop-menu--active');
    }
  });
}

for (const btn of dropMenuButtons) {
  btn.addEventListener('click', () => {
    arrowRotate(btn.closest('.filter__item').querySelector('.filter__btn'));

    btn.closest('.drop-menu').classList.toggle('drop-menu--active');
  });
}

// высота картинки в секции бонус понятия не имею откуда 21рх, но в браузере их не хватало вот и добавил)
const bonusItems = document.querySelectorAll('.bonus__item');

let heightImg = bonusItems[3].offsetHeight + bonusItems[4].offsetHeight + bonusItems[5].offsetHeight - bonusItems[0].offsetHeight - bonusItems[2].offsetHeight;
bonusItems[1].setAttribute("style", `height:${heightImg}px`);

let win = window,
  docElem = document.documentElement,
  body = document.getElementsByTagName('body')[0],
  x = win.innerWidth || docElem.clientWidth || body.clientWidth,
  y = win.innerHeight || docElem.clientHeight || body.clientHeight;

// высота картинки в секции top
const topItems = document.querySelectorAll('.top__item');

if (767 < x && x < 1200) {
  let topHeightImg = topItems[4].offsetHeight + topItems[5].offsetHeight + topItems[6].offsetHeight + topItems[7].offsetHeight - topItems[0].offsetHeight - topItems[2].offsetHeight - topItems[3].offsetHeight;
  console.log(topItems);
  topItems[1].setAttribute("style", `height:${topHeightImg}px`);
} else if (x > 1199) {
  console.log('object');
  let topHeightImg1 = topItems[3].offsetHeight + topItems[4].offsetHeight + topItems[5].offsetHeight - topItems[0].offsetHeight - topItems[2].offsetHeight;
  let topHeightImg2 = topItems[3].offsetHeight + topItems[4].offsetHeight + topItems[5].offsetHeight - topItems[6].offsetHeight - topItems[7].offsetHeight;
  topItems[1].setAttribute("style", `height:${topHeightImg1}px`);
  topItems[8].setAttribute("style", `height:${topHeightImg2}px`);
  console.log(topHeightImg2);
  console.log(topItems[8]);
}

// аккардион в мобильном меню
const mobileMenuButton = document.querySelector('.mobile-menu__button');

mobileMenuButton.addEventListener("click", function () {
  arrowRotate(mobileMenuButton);
  accardion('.mobile-menu__item', 32.5, 30, this);
});

// селектор в котором итемы(кнопка и список выпадающий), высота кнопки, и высота li в выпадающем списке
function accardion(selector, heightBtn, heightLi, thisBtn) {
  const hideMenus = document.querySelectorAll(selector);

  let hideMenu = thisBtn.closest(selector);
  let itemsHideMenu = hideMenu.querySelectorAll('li');

  let hideMenuHeight = Number(itemsHideMenu.length) * heightBtn + heightLi;

  for (const menu of hideMenus) {
    menu.setAttribute('style', `height: ${heightBtn}`);
  }

  if (thisBtn.classList.contains('active')) {
    hideMenu.setAttribute('style', `height: ${hideMenuHeight}px`);
  } else {
    hideMenu.setAttribute('style', `height: ${heightBtn}`);
  }
}

const footerBtns = document.querySelectorAll('.footer__btn');
for (const btn of footerBtns) {
  btn.addEventListener('click', function () {
    if (x < 1000) {
      arrowRotate(this);
      if (this.classList.contains('active')) {
        for (const btn of footerBtns) {
          btn.classList.remove('active');
        }
        arrowRotate(this);
      } else {
        for (const btn of footerBtns) {
          btn.classList.remove('active');
        }
      }

      accardion('.footer__item', 43.5, 36, this);
    }
  });
}


// отключение сролла
function lockScroll() {
  document.querySelector('html').setAttribute('style', `overflow: hidden`)
}

function unLockScroll() {
  document.querySelector('html').setAttribute('style', `overflow: unset`)
}

// вызов мобильного меню
let headerMenuBtn = document.querySelector('.header__menu-btn'),
  mobileMenuOverlay = document.querySelector('.mobile-menu__overlay');

headerMenuBtn.addEventListener('click', function () {
  if (this.classList.contains('menu-btn--active')) {
    hideMobileMenu();
    unLockScroll();
  } else {
    showMobileMenu();
    lockScroll();
  }
});

mobileMenuOverlay.addEventListener('click', function () {
  hideMobileMenu();
  unLockScroll();
});

function showMobileMenu() {
  const
    mobileMenu = document.querySelector('.mobile-menu');
  mobileMenu.classList.add('active');
  headerMenuBtn.classList.add('menu-btn--active');
}

function hideMobileMenu() {
  const
    mobileMenu = document.querySelector('.mobile-menu');
  mobileMenu.classList.remove('active');
  headerMenuBtn.classList.remove('menu-btn--active');
}

// закрытие/открытие попапов
const overlay = document.querySelector('.overlay'),
  // popapCloseBtns = document.querySelectorAll('.popap__close'),
  popapCloseBtns = document.querySelectorAll('.popap__close');

overlay.addEventListener('click', () => closePopaps());

for (const btn of popapCloseBtns) {
  btn.addEventListener('click', () => closePopaps());
}

const jsCallBackBtns = document.querySelectorAll('.js-call-back');
for (const btn of jsCallBackBtns) {
  btn.addEventListener('click', () => showPopaps('.call-back'));
}

function closePopaps() {
  let jsActive = document.querySelectorAll('.js-active');
  for (const i of jsActive) {
    i.classList.remove('active');
  }
  unLockScroll();
}

function showPopaps(el) {
  const item = document.querySelector(el);
  item.classList.add('active');
  overlay.classList.add('active');
  lockScroll();
}

// показывать/скрывать текст пароля
function showHidePassword(target){
  const input = target.closest('label').querySelector('input');

	if (input.getAttribute('type') == 'password') {
		target.classList.add('view');
		input.setAttribute('type', 'text');
	} else {
		target.classList.remove('view');
		input.setAttribute('type', 'password');
	}
	return false;
}

const passwordControls = document.querySelectorAll('.password__control');
for (const btn of passwordControls) {
  btn.addEventListener('click', function() {
    showHidePassword(this);
  })
}
