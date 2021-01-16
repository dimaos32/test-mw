'use strict';

const loginLink = document.querySelector('.site-nav__link--login');

const onLoginLinkClick = (evt) => {
  evt.preventDefault();

  console.log('popal!');
};

loginLink.addEventListener('click', onLoginLinkClick);
