// Variables

// Navigation
const menuBtn = document.querySelector('.sidebar__btn');
const footerNavLinksContainer = document.querySelector('.footer__nav');
const headerNavLinksContainer = document.querySelector('.menu__nav');
const arrowDown = document.querySelector('.header__icon');
const menu = document.querySelector('.menu__container');
const aboutSection = document.querySelector('.about');

// Popup
const popup = document.querySelector('.popup');
const overlay = document.querySelector('.overlay');
const popupOpenBtns = document.querySelectorAll('.btn');
const popupCloseBtn = document.querySelector('.popup__close');

// Steps Component
const stepsContent = document.querySelectorAll('.steps__content');
const stepsBtnsContainer = document.querySelector('.steps__container');
const stepsBtns = document.querySelectorAll('.steps__btn');

// Slider
const slides = document.querySelectorAll('.feedbacks__slide');
const sliderBtnLeft = document.querySelector('.btn__left');
const sliderBtnRight = document.querySelector('.btn__right');
const slidesCounter = document.querySelector('.feedbacks__counter');
const maxSlide = slides.length;
let currentSlide = 0;

// FUNCTIONS

// CONTROL POPUP
function controlPopup() {
  // Open popup with buttons
  popupOpenBtns.forEach(btn =>
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      popup.classList.remove('hidden');
      overlay.classList.remove('hidden');
    })
  );

  // Close popup with buton and overlay click
  popupCloseBtn.addEventListener('click', function () {
    popup.classList.add('hidden');
    overlay.classList.add('hidden');
  });

  overlay.addEventListener('click', function () {
    popup.classList.add('hidden');
    overlay.classList.add('hidden');
  });
}

// CONTROL NAVIGATION
function controlNav() {
  // Scroll with links Footer
  footerNavLinksContainer.addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.classList.contains('footer__nav--link')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Scroll with links Header
  headerNavLinksContainer.addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.classList.contains('menu__nav--link')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }

    // Close menu
    menuBtn.classList.remove('active--menu__btn');
    menu.classList.remove('active--menu');
  });

  // Scroll down with arrow
  arrowDown.addEventListener('click', function () {
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  });
}

// CONTROL SLIDER
function goToSlide(slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - slide) * 110}%)`)
  );
}

function nextSlide() {
  if (currentSlide === maxSlide - 1) currentSlide = 0;
  else currentSlide++;
  goToSlide(currentSlide);
  // Update a counter
  updateCounter();
}

function prevSlide() {
  if (currentSlide === 0) currentSlide = maxSlide - 1;
  else currentSlide--;
  goToSlide(currentSlide);
  // Update a counter
  updateCounter();
}

function updateCounter() {
  slidesCounter.textContent = `0${currentSlide + 1} / 0${maxSlide}`;
}

// CONTROL TABBED COMPONENT
function controlSteps() {
  // Change active button
  stepsBtnsContainer.addEventListener('click', function (e) {
    e.preventDefault();
    const clicked = e.target.closest('.steps__btn');
    if (!clicked) return;

    // Remove active classes
    stepsBtns.forEach(b => b.classList.remove('active--btn'));
    stepsContent.forEach(c => c.classList.remove('active--content'));

    // Add active classes
    clicked.classList.add('active--btn');
    document
      .querySelector(`.${clicked.dataset.tab}`)
      .classList.add('active--content');
  });
  // Change active step
}

function controlSlider() {
  // Left button
  sliderBtnLeft.addEventListener('click', prevSlide);

  // Right button
  sliderBtnRight.addEventListener('click', nextSlide);

  // Update a counter
  updateCounter();
}

// CONTROL MENU
function controlMenu() {
  menuBtn.addEventListener('click', function (e) {
    e.preventDefault();
    // Open menu and change button
    menuBtn.classList.toggle('active--menu__btn');
    menu.classList.toggle('active--menu');

    // Close popup if needed
    popup.classList.add('hidden');
    overlay.classList.add('hidden');
  });
}

// INIT
function init() {
  goToSlide(0);
  controlPopup();
  controlNav();
  controlSlider();
  controlSteps();
  controlMenu();
}

init();
