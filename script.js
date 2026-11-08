const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const faqItems = document.querySelectorAll('.faq-item');
const form = document.getElementById('enrollForm');
const statusText = document.querySelector('.form-status');
const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  if (!button || !answer) return;

  button.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    faqItems.forEach((faq) => {
      faq.classList.remove('active');
      const otherAnswer = faq.querySelector('.faq-answer');
      if (otherAnswer) {
        otherAnswer.style.maxHeight = null;
      }
    });

    if (!isActive) {
      item.classList.add('active');
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
});

const firstFaq = document.querySelector('.faq-item');
const firstAnswer = firstFaq?.querySelector('.faq-answer');
if (firstFaq && firstAnswer) {
  firstFaq.classList.add('active');
  firstAnswer.style.maxHeight = `${firstAnswer.scrollHeight}px`;
}

if (form && statusText) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const interest = (formData.get('interest') || '').toString().trim();

    if (!name || !email || !interest) {
      statusText.textContent = 'Please complete all fields before submitting.';
      statusText.style.color = '#b0346d';
      return;
    }

    const savedEntries = JSON.parse(localStorage.getItem('pmvrEnrollments') || '[]');
    savedEntries.push({ name, email, interest, submittedAt: new Date().toISOString() });
    localStorage.setItem('pmvrEnrollments', JSON.stringify(savedEntries));

    statusText.textContent = `Thanks, ${name}! Your ${interest} request has been received. We will contact you soon.`;
    statusText.style.color = '#1b8f67';
    form.reset();
  });
}
