const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

const expTabs = [...document.querySelectorAll('.exp-tab')];

const selectTab = (tab) => {
  expTabs.forEach((t) => {
    const selected = t === tab;
    t.setAttribute('aria-selected', String(selected));
    t.tabIndex = selected ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
  });
};

expTabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    const next = expTabs[(i + (event.key === 'ArrowRight' ? 1 : -1) + expTabs.length) % expTabs.length];
    selectTab(next);
    next.focus();
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const email = String(formData.get('email')).trim();
  const subject = String(formData.get('subject')).trim();
  const message = String(formData.get('message')).trim();
  const mailto = `mailto:jacob.wong1606@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Reply to: ${email}\n\n${message}`)}`;
  window.location.href = mailto;
  formStatus.textContent = 'Your email app should open with the message ready to send.';
});
