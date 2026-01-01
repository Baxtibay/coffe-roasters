const elNavToggleBtn = document.querySelector('.site-header__toggle-btn');
const elSiteHeader = document.querySelector('.site-header');


if(elNavToggleBtn) { elNavToggleBtn.addEventListener('click', () => {
  elSiteHeader.classList.toggle('site-header--open')
  document.body.classList.toggle('menu-open');
})}