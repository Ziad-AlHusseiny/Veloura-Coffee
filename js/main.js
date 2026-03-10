/* ========================================
   VELOURA COFFEE — Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- Mobile Navbar Toggle ----- */
  const toggle = document.querySelector('.navbar__toggle');
  const navLinks = document.querySelector('.navbar__links');

  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ----- Active Nav Link ----- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ----- Product Filter Buttons ----- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = '';
          // Re-trigger animation
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ----- Scroll Reveal ----- */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ----- Contact Form Validation ----- */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Clear previous errors
      contactForm.querySelectorAll('.form__input, .form__textarea').forEach(input => {
        input.classList.remove('error');
      });
      contactForm.querySelectorAll('.form__error').forEach(err => {
        err.classList.remove('visible');
      });

      // Validate name
      const name = contactForm.querySelector('#contact-name');
      if (name && name.value.trim().length < 2) {
        showError(name, 'Please enter your name');
        isValid = false;
      }

      // Validate email
      const email = contactForm.querySelector('#contact-email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
      }

      // Validate subject
      const subject = contactForm.querySelector('#contact-subject');
      if (subject && subject.value.trim().length < 2) {
        showError(subject, 'Please enter a subject');
        isValid = false;
      }

      // Validate message
      const message = contactForm.querySelector('#contact-message');
      if (message && message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters');
        isValid = false;
      }

      if (isValid) {
        // Show success feedback
        const btn = contactForm.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = 'MESSAGE SENT ✓';
        btn.style.background = '#4a7c59';
        btn.style.borderColor = '#4a7c59';
        contactForm.reset();

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
        }, 3000);
      }
    });
  }

  function showError(input, message) {
    input.classList.add('error');
    const errorEl = input.parentElement.querySelector('.form__error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  }

});
