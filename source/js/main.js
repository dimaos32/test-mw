'use strict';

const HTML = document.querySelector('html');

const loginLink = document.querySelector('.site-nav__link--login');
const authorizationForm = document.querySelector('.modal--authorization');
const authorizationCloseBtn = authorizationForm.querySelector('.authorization__close');
const userEmail = authorizationForm.querySelector('#email');
const userPassword = authorizationForm.querySelector('#password');

let isStorageSupport = true;
let storage = '';

var onAuthorizationFormSubmit = function () {
  if (isStorageSupport) {
    localStorage.setItem('email', userEmail.value);
  }
};

const openModal = (modal) => {
  if (document.body.offsetHeight > window.innerHeight) {
    document.body.dataset.scrollY = self.pageYOffset;
    document.body.style.top = document.body.dataset.scrollY * -1 + 'px';

    document.body.classList.add('page--block-scroll');
  }

  modal.classList.remove('modal--closed');

  if (userEmail.value) {
    userPassword.focus();
  } else {
    userEmail.focus();
  }
};

const closeModal = (modal) => {
  modal.classList.add('modal--closed')

  if (document.body.offsetHeight > window.innerHeight) {
    document.body.classList.remove('page--block-scroll');

    document.body.style.top = 0;
    HTML.style.scrollBehavior = 'auto';
    window.scrollTo(0, document.body.dataset.scrollY);
    HTML.style.scrollBehavior = 'smooth';
  }
};

const onLoginLinkClick = (evt) => {
  evt.preventDefault();

  openModal(authorizationForm);

  authorizationCloseBtn.addEventListener('click', onModalCloseBtnClick);
  authorizationForm.addEventListener('click', onModalClick);
  authorizationForm.addEventListener('submit', onAuthorizationFormSubmit);
  document.addEventListener('keydown', onOpenedModalEscPress);
};

const onModalCloseBtnClick = function () {
  authorizationCloseBtn.removeEventListener('click', onModalCloseBtnClick);
  authorizationForm.removeEventListener('click', onModalClick);
  authorizationForm.removeEventListener('submit', onAuthorizationFormSubmit);
  document.removeEventListener('keydown', onOpenedModalEscPress);

  closeModal(authorizationForm);
};

const onModalClick = function (evt) {
  if (evt.target === authorizationForm) {

    authorizationCloseBtn.removeEventListener('click', onModalCloseBtnClick);
    authorizationForm.removeEventListener('click', onModalClick);
    authorizationForm.removeEventListener('submit', onAuthorizationFormSubmit);
    document.removeEventListener('keydown', onOpenedModalEscPress);

    closeModal(authorizationForm);
  }
};

var onOpenedModalEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();

    authorizationCloseBtn.removeEventListener('click', onModalCloseBtnClick);
    authorizationForm.removeEventListener('click', onModalClick);
    authorizationForm.removeEventListener('submit', onAuthorizationFormSubmit);
    document.removeEventListener('keydown', onOpenedModalEscPress);

    closeModal(authorizationForm);
  }
};

try {
  storage = localStorage.getItem('email');
} catch (err) {
  isStorageSupport = false;
}

if (storage) {
  userEmail.value = localStorage.getItem('email');
}

loginLink.addEventListener('click', onLoginLinkClick);
