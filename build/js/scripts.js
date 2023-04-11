'use strict';

window.addEventListener('load', () => {

  let x;
  function widthDevice() {
    x = document.documentElement.clientWidth;
  }

  const wow = new WOW(
    {
      offset: 100,
      mobile: false,
    }
  );
  wow.init();

  widthDevice();

  window.addEventListener('resize', function () {
    widthDevice();
    gallerySLideON(x);
    slideToRight();
  }, true);

  // первый слайд влево
  let slide2 = x >= 768 ? true : false;
  let slideRightNow = false;

  const sliderSections = $('.slider-section');
  slideToRight();

  function slideToRight() {
    if (sliderSections.length > 0) {
      if (x >= 768 && slide2) {
        slide2 = false;
        $.each(sliderSections, function (index, section) {
          const list = $(section).find('.slider-section__list');
          $(section).find('.slider-section__list > li:first').remove().appendTo(list);
        });
      }
    }
  }

  let swiper2 = new Swiper('.slider-section__swiper', {
    speed: 400,
    slidesPerView: "auto",
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,

    pagination: {
      el: '.slider-section__pagination',
      type: "fraction",
    },

    navigation: {
      nextEl: '.slider-section__next',
      prevEl: '.slider-section__prev',
    },

    breakpoints: {
      1200: {
        spaceBetween: 60,
      },
    },
  });

  /* Плавный скролл к элементу */
  document.querySelectorAll('a[href^="#"').forEach(link => {
    if (link.getAttribute('href').length > 1) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        let href = this.getAttribute('href').substring(1);
        const scrollTarget = document.getElementById(href);
        if (scrollTarget) {
          // const topOffset = document.querySelector('.scrollto').offsetHeight; // если нужен отступ сверху
          const topOffset = 0;
          const elementPosition = scrollTarget.getBoundingClientRect().top;
          const offsetPosition = elementPosition - topOffset - 70;

          window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }

      });
    }
  });

  // swiper
  const swiper = new Swiper('.hero__swiper', {
    speed: 400,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: '.hero__arrow--next',
      prevEl: '.hero__arrow--prev',
    },
  });

  const swiper1 = new Swiper('.video-section__inner', {
    speed: 1000,
    spaceBetween: 30,
    loop: true,
    autoHeight: true,

    pagination: {
      el: '.video-section__pagination',
      type: "fraction",
    },
    navigation: {
      nextEl: '.video-section__next',
      prevEl: '.video-section__prev',
    },
  });

  // клик по кнопке поворот стрелки и вызов меню dropdown
  const headerDropMenu = document.querySelector('.header__drop-menu'),
    menuBtn = document.querySelector('.menu__btn'),
    filterBtns = document.querySelectorAll('.dropdown__btn'),
    dropMenuButtons = document.querySelectorAll('.drop-menu__button');

  const dropMenus = document.querySelectorAll('.drop-menu');

  if (dropMenus.length > 0) {
    document.addEventListener("click", function (e) {

      const target = e.target;
      let its_menu;
      let menu_is_active;
      let its_btnMenu;

      for (const menu of dropMenus) {
        its_menu = target == menu || menu.contains(target);

        let active = menu.classList.contains("active");

        if (active) {
          menu_is_active = true;
        }

        if (its_menu) {
          break;
        }
      }

      for (const btn of filterBtns) {
        its_btnMenu = target == btn;
        if (its_btnMenu) break;
      }

      if (!its_menu && !its_btnMenu && menu_is_active) {
        closePopaps();
      }
    });
  }

  function arrowRotate(el) {
    el.classList.toggle('active');
  }

  menuBtn.addEventListener('click', function () {
    arrowRotate(this);
    headerDropMenu.classList.toggle('active');
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

      const dropFilterMenus = document.querySelectorAll('.dropdown__drop-menu');
      let thisMenu = btn.closest('.dropdown').querySelector('.drop-menu');

      if (thisMenu.classList.contains('active')) {

        for (const menu of dropFilterMenus) {
          menu.classList.remove('active');
        }
      } else {
        for (const menu of dropFilterMenus) {
          menu.classList.remove('active');
        }

        thisMenu.classList.add('active');
      }
    });
  }

  for (let i = 0; i < dropMenuButtons.length; i++) {
    dropMenuButtons[i].addEventListener('click', function (e) {
      e.preventDefault();

      let openBtn = this.closest('.dropdown').querySelector('.dropdown__btn');

      let fakeSelectInput = this.closest('.dropdown').querySelector('input');

      if (this.hasAttribute('href') || this.hasAttribute('type') && !this.hasAttribute('disabled')) {
        arrowRotate(openBtn);
        this.closest('.drop-menu').classList.toggle('active');
        openBtn.innerHTML = this.innerHTML;

        if (fakeSelectInput !== null) {
          fakeSelectInput.value = this.textContent.trim();
        }

        const newPrice = this.closest('li').querySelector('span');

        if (newPrice) {
          dropMenuButtons
          const price = this.closest('form').querySelector('.to-book__price');
          price.innerHTML = newPrice.innerHTML;
        }

        const labels = this.closest('.to-book').querySelectorAll(`#badge-${this.getAttribute('id')}`);
        const allLabels = this.closest('.to-book').querySelectorAll('.badge');

        if (allLabels.length > 0) {
          for (const label of allLabels) {
            label.classList.remove('show');
          }
        }

        if (labels.length > 0) {
          for (const label of labels) {
            label.classList.add('show');
          }
        }
      }
    });
  }

  let windowGallery = 'big',
    swiper5;
  function gallerySLideON(x) {
    const gallerySlider = document.querySelector('.gallery__slider');

    if (gallerySlider) {
      let gallerySliderWrapper = gallerySlider.querySelector('ul'),
        gallerySliderItems = gallerySlider.querySelectorAll('li');

      if (gallerySliderItems.length > 0 && x < 1000 & windowGallery == 'big') {
        windowGallery = 'notbig';

        gallerySlider.classList.add('swiper');
        gallerySliderWrapper.classList.add('swiper-wrapper');

        for (const i of gallerySliderItems) {
          i.classList.add('swiper-slide');
        }

        swiper5 = new Swiper('.gallery__slider.swiper', {
          speed: 400,
          spaceBetween: 15,
          pagination: {
            el: '.swiper-pagination5',
            type: 'bullets',
          },
          breakpoints: {
            1200: {

            }
          },
        });

      } else if (gallerySliderItems.length > 0 && x >= 1000 && windowGallery != 'big') {
        windowGallery = 'big';
        swiper5.destroy();
        gallerySliderWrapper.removeAttribute('style');
        gallerySliderItems.forEach(item => item.removeAttribute('style'));
        let pagination = document.querySelector('.gallery__pagination');
        pagination.innerHTML = '';
      }
    }
  }

  gallerySLideON(x);




  function disabledBtn(x) {
    // diabled для кнопок в футере
    const footerBtns = document.querySelectorAll('.footer__btn');
    if (x >= 1000) {
      for (const i of footerBtns) {
        i.setAttribute('disabled', true);
      }
    } else {
      for (const i of footerBtns) {
        i.removeAttribute('disabled');
      }
    }
  }

  disabledBtn(x);

  // отключение сролла
  function lockScroll() {
    document.querySelector('body').classList.add('lock');
  }

  function unLockScroll() {
    document.querySelector('body').classList.remove('lock');
  }

  // вызов мобильного меню
  let headerMenuBtn = document.querySelector('.header__menu-btn'),
    mobileMenuOverlay = document.querySelector('.mobile-menu__overlay');

  headerMenuBtn.addEventListener('click', function () {
    if (this.classList.contains('menu-btn--active')) {
      hideMobileMenu();
    } else {
      showMobileMenu();
    }
  });

  mobileMenuOverlay.addEventListener('click', function () {
    hideMobileMenu();
  });

  function showMobileMenu() {
    const
      mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.add('active');
    headerMenuBtn.classList.add('menu-btn--active');
    lockScroll();
  }

  function hideMobileMenu() {
    const
      mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.remove('active');
    headerMenuBtn.classList.remove('menu-btn--active');
    unLockScroll();
  }

  // закрытие/открытие попапов
  const overlay = document.querySelector('.overlay'),
    overlays = document.querySelectorAll('.overlay'),
    popapCloseBtns = document.querySelectorAll('.popap__close:not(.agreement-popap__close)');

  for (const overlay of overlays) {
    overlay.addEventListener('click', () => closePopaps());
  }


  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePopaps();
    }
  });

  for (const btn of popapCloseBtns) {
    btn.addEventListener('click', () => closePopaps());
  }

  const jsCallBackBtns = document.querySelectorAll('.js-call-back');
  for (const btn of jsCallBackBtns) {
    btn.addEventListener('click', () => showPopaps('.call-back'));
  }

  // ПОКАЗ ПОПАПА А НАЖАТИИ НА ОТПРАВКУ ФОРМЫ, ОТПРАВКУ ФОРМЫ ОТМЕНИЛ

  function afterFormBtnPush(formBtn, popap) {
    const formBtns = document.querySelectorAll(formBtn);

    if (formBtns != null) {
      for (const btn of formBtns) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          lockScroll();
          showPopaps(popap);
          overlay.classList.add('active');
        });
      }
    }
  }

  afterFormBtnPush('.application__btn', '.application-popap')
  afterFormBtnPush('.request__btn ', '.done')

  function closePopaps() {
    let jsActive = document.querySelectorAll('.js-active.active');
    for (const i of jsActive) {
      i.classList.remove('active');
    }
    hideMobileMenu();
    unLockScroll();
    const iframe = document.querySelector('.map-popup iframe');
    iframe.setAttribute('style', 'display: none');
  }

  function showPopaps(el, active = 'active') {
    lockScroll();
    const item = document.querySelector(el);
    item.classList.add('active');
    overlay.classList.add(active);
  }

  // показывать/скрывать текст пароля
  const passwordControls = document.querySelectorAll('.password__control');
  if (passwordControls.length > 0) {
    for (const btn of passwordControls) {
      btn.addEventListener('click', function () {
        showHidePassword(this);
      })
    }
  }

  function showHidePassword(target) {
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

  // изменение вида сезонов в инфобаре
  const infoBarSeasonText = document.querySelectorAll('.info-bar__season-text');
  if (infoBarSeasonText.length > 1) {
    for (const i of infoBarSeasonText) {
      i.classList.add('hover');
    }
  }

  // аккардион в форме (селект)
  const toBookBtns = document.querySelectorAll('.to-book__btn');
  if (toBookBtns.length > 0) {
    for (const btn of toBookBtns) {
      btn.addEventListener('click', function () {
        if (this.getAttribute("type") == 'button') {
          this.setAttribute('type', 'submit');
          const hideBox = btn.closest('.to-book').querySelector('.to-book__hide-box');
          const hideBoxLabels = hideBox.querySelectorAll('label');
          let calcHeight = 60;
          for (const i of hideBoxLabels) {
            calcHeight += i.offsetHeight;
          }

          hideBox.setAttribute('style', `height: ${calcHeight + 10}px; padding: 5px`);

          afterFormBtnPush('.to-book__btn', '.not-done');
        }
      });
    }
  }

  const accordionHideboxs = document.querySelectorAll('.accordion > li > div');
  if (accordionHideboxs.length > 0) {
    for (const box of accordionHideboxs) {
      box.setAttribute('height-content', box.offsetHeight);
      box.setAttribute('style', 'height: 0; padding-top: 0; padding-bottom: 0');
    }
  }


  // аккардионы
  accardionOn('.accordion a', 'li', '.accordion div', '20px', true);
  accardionOn('.footer__btn', '.footer__item', '.footer__hide-box');
  accardionOn('.mobile-menu__button', '.mobile-menu__item', '.mobile-menu__hide-box');
  accardionOn('.filter__open', '.filter', '.filter__hide-box');

  function accardionOn(selectorBtn, selectorParrent, selectorHideBox, padding = '', data = false) {
    const accordionBtns = document.querySelectorAll(selectorBtn);
    if (accordionBtns.length > 0) {
      for (const btn of accordionBtns) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          const hideBox = this.closest(selectorParrent).querySelector(selectorHideBox);
          let hideBoxHeight;

          if (data) {
            hideBoxHeight = hideBox.getAttribute('height-content');
          } else {
            hideBoxHeight = hideBox.querySelector(`${selectorHideBox} > *`).offsetHeight;
          }

          arrowRotate(this);

          if (this.classList.contains('active')) {
            const hideBoxes = document.querySelectorAll(selectorHideBox);
            for (const i of hideBoxes) {
              i.setAttribute('style', `height: 0; padding-top: 0; padding-bottom: 0`);
              i.classList.remove('active');
            }

            for (const btn of accordionBtns) {
              btn.classList.remove('active');
            }

            hideBox.setAttribute('style', `height: ${hideBoxHeight}px; padding-bottom: ${padding}; padding-top: ${padding}`);
            hideBox.classList.add('active');
            arrowRotate(this);
          } else {
            const hideBoxes = document.querySelectorAll(selectorHideBox);
            for (const i of hideBoxes) {
              i.setAttribute('style', `height: 0; padding-top: 0; padding-bottom: 0;`);
              i.classList.remove('active');
            }
            for (const btn of accordionBtns) {
              btn.classList.remove('active');
            }
          }
        })
      }
    }
  }

  // подсветка пунктов меню
  const $navigationLinks = document.querySelectorAll('.page-nav__link');
  if ($navigationLinks.length > 0) {

    var $sections = document.querySelectorAll('.content *[id]');

    var sectionIdTonavigationLink = {};
    for (var i = $sections.length - 1; i >= 0; i--) {
      var id = $sections[i].id;
      sectionIdTonavigationLink[id] = document.querySelectorAll('.page-nav__link[href=\\#' + id + ']') || null;
    }

    function throttle(fn, interval) {
      var lastCall, timeoutId;
      return function () {
        var now = new Date().getTime();
        if (lastCall && now < (lastCall + interval)) {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(function () {
            lastCall = now;
            fn.call();
          }, interval - (now - lastCall));
        } else {
          lastCall = now;
          fn.call();
        }
      };
    }

    function getOffset(el) {
      var _x = 0;
      var _y = 0;
      while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
      }
      return { top: _y, left: _x };
    }

    function highlightNavigation() {
      var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      for (var i = $sections.length - 1; i >= 0; i--) {
        var currentSection = $sections[i];
        var sectionTop = getOffset(currentSection).top;

        if (scrollPosition >= sectionTop - 250) {
          var id = currentSection.id;
          var $navigationLink = sectionIdTonavigationLink[id];
          if (typeof $navigationLink[0] !== 'undefined') {
            if (!$navigationLink[0].classList.contains('active')) {
              for (i = 0; i < $navigationLinks.length; i++) {
                $navigationLinks[i].className = $navigationLinks[i].className.replace(/ active/, '');
              }
              $navigationLink[0].className += (' active');
            }
          } else {
            for (i = 0; i < $navigationLinks.length; i++) {
              $navigationLinks[i].className = $navigationLinks[i].className.replace(/ active/, '');
            }
          }
          return false;
        }
      }
    }

    window.addEventListener('scroll', throttle(highlightNavigation, 150));
  }

  // галлерея
  const galleryShadow = document.querySelector('.gallery__shadow-text');
  const galleryItems = document.querySelectorAll('.gallery__item');

  if (galleryShadow) {
    galleryShadow.innerHTML = `Ещё ${galleryItems.length - 6} фото`;
  }

  const toBooks = document.querySelectorAll('.to-book');
  if (toBooks.length > 0) {
    for (const toBook of toBooks) {
      const costJs = toBook.querySelectorAll('.cost-js');
      let arrayCosts = [];

      for (const cost of costJs) {
        let temp = cost.innerHTML.replace(/\s/g, '');

        if (temp !== '' && cost.closest('li').querySelector('a').hasAttribute('href')) {
          arrayCosts.push(Number(temp));
        } else {
          arrayCosts.push(99999999999);
        }
      }

      let minCost = Math.min(...arrayCosts);

      for (let i = 0; i < arrayCosts.length; i++) {
        if (arrayCosts[i] == minCost) {

          const value = costJs[i].closest('li').querySelector('a');
          const thisBtn = costJs[i].closest('.dropdown').querySelector('.dropdown__btn');
          const thisInput = costJs[i].closest('.dropdown').querySelector('input');
          const showPrice = costJs[i].closest('.to-book').querySelector('.to-book__price');
          const dropMenuButtons = costJs[i].closest('.to-book').querySelectorAll('.drop-menu__button');
          let labels;

          if (dropMenuButtons[i]) {
            labels = document.querySelectorAll(`#badge-${dropMenuButtons[i].getAttribute('id')}`);
          }

          if (labels) {
            for (const label of labels) {
              label.classList.add('show');
            }
            if (labels.length > 0) {
              for (const label of labels) {
                label.classList.add('show');
              }
            }
          }

          showPrice.innerHTML = costJs[i].closest('.visually-hidden').innerHTML;
          thisBtn.textContent = value.textContent;
          thisInput.value = value.textContent;
          break;
        }
      }
    }
  }

  if (document.querySelector('#map')) {
    ymaps.ready(init);
  };

  const infobarlink = document.querySelector('.info-bar__orange');
  if (infobarlink) {
    infobarlink.addEventListener('click', (e) => {
      e.preventDefault();

      showPopaps('.map-popup');
      overlay.classList.add('active');
      const iframe = document.querySelector('.map-popup iframe');
      iframe.setAttribute('style', 'display: block');
    });
  }

  const agreementBnts = $('.agreement');

  if (agreementBnts.length > 0) {
    $.each(agreementBnts, function (index, value) {
      $(value).click(function (e) {
        e.preventDefault();
        $('.agreement-popap').addClass('active');
        lockScroll();
      })
    });
  }

  $('.agreement-popap__close').click(function () {
    $('.agreement-popap').removeClass('active');
    unLockScroll();
  })

  $('.agreement-popap__overlay').click(function () {
    $('.agreement-popap').removeClass('active');
    const overlays = $('.overlay');
    let overlayOn = false;
    $.each(overlays, function (index, value) {
      if (value.hasClass('active')) overlayOn = true;
    });

    if (!overlayOn) {
      unLockScroll();
    }
  })
});
