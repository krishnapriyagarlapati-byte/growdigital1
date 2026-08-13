/* ==========================================================================
   GROW DIGITAL — 2026 PRODUCTION JAVASCRIPT ENGINE (script.js)
   Features: Navigation, Scroll Animations, Form Validation, Modal Handler,
             FAQ Accordion, Stat Counters, Floating Widgets, & Accessibility.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. NAVIGATION & MOBILE DRAWER
     ------------------------------------------------------------------------ */
  const header = document.getElementById('mainHeader') || document.querySelector('header');
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');

  // Sticky Header Scroll State
  const handleScroll = () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Mobile Menu Toggle
  if (hamburger && mainNav) {
    const toggleMenu = (state) => {
      const isOpen = state !== undefined ? state : !mainNav.classList.contains('open');
      hamburger.classList.toggle('active', isOpen);
      mainNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    hamburger.addEventListener('click', () => toggleMenu());

    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Close on navigation link click
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
          toggleMenu(false);
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');

  if (revealElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ------------------------------------------------------------------------
     3. STAT COUNTERS ANIMATION
     ------------------------------------------------------------------------ */
  const statNumbers = document.querySelectorAll('.stat-num[data-target]');

  if (statNumbers.length > 0) {
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '+';
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeProgress * target);

        el.textContent = `${prefix}${currentCount.toLocaleString('en-IN')}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = `${prefix}${target.toLocaleString('en-IN')}${suffix}`;
        }
      };

      requestAnimationFrame(updateCount);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }

  /* ------------------------------------------------------------------------
     4. FAQ ACCORDION HANDLER
     ------------------------------------------------------------------------ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-question');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other accordion items in the same container
      const parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll('.faq-item').forEach(sibling => {
          sibling.classList.remove('active');
          const sibHeader = sibling.querySelector('.faq-question');
          if (sibHeader) sibHeader.setAttribute('aria-expanded', 'false');
        });
      }

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });

    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });

  /* ------------------------------------------------------------------------
     5. POPUP MODAL HANDLER
     ------------------------------------------------------------------------ */
  const modal = document.getElementById('popupModal');
  const openModalBtns = document.querySelectorAll('#getStartedBtn, .open-modal-btn');
  const closeModalBtn = document.getElementById('closeModal');

  if (modal) {
    const openModal = () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      const firstInput = modal.querySelector('input, select, textarea');
      if (firstInput) setTimeout(() => firstInput.focus(), 100);
    };

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    openModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  /* ------------------------------------------------------------------------
     6. FORM VALIDATION & WHATSAPP / WEBHOOK SUBMISSION
     ------------------------------------------------------------------------ */
  const forms = document.querySelectorAll('form.touch-form, form.contact-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const nameInput = form.querySelector('input[type="text"]');
      const phoneInput = form.querySelector('input[type="tel"]');
      const emailInput = form.querySelector('input[type="email"]');
      const serviceSelect = form.querySelector('select[name="service"]') || form.querySelector('input[name="service"]:checked') || form.querySelector('select');
      const msgInput = form.querySelector('textarea');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const service = serviceSelect ? (serviceSelect.value || serviceSelect.getAttribute('value')) : 'General Inquiry';
      const message = msgInput ? msgInput.value.trim() : '';

      // Simple Validation
      if (!name || !phone) {
        showToast('Please fill in your Name and Phone Number.', 'error');
        return;
      }

      // Show loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Submitting...`;

        setTimeout(() => {
          // Construct formatted WhatsApp message
          const whatsappNumber = "917989222741";
          const whatsappText = `*NEW WEBSITE INQUIRY - GROW DIGITAL*%0A` +
            `👤 *Name:* ${encodeURIComponent(name)}%0A` +
            `📞 *Phone:* ${encodeURIComponent(phone)}%0A` +
            `✉️ *Email:* ${encodeURIComponent(email || 'N/A')}%0A` +
            `🛠️ *Service Required:* ${encodeURIComponent(service)}%0A` +
            `📝 *Message:* ${encodeURIComponent(message || 'Requesting callback')}%0A` +
            `-----------------------------------%0A` +
            `Sent via Grow Digital Official Website`;

          const waUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

          // Reset button and form
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          form.reset();

          // Close modal if open
          if (modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
          }

          showToast('Thank you! Redirecting to WhatsApp to complete your request...', 'success');

          // Open WhatsApp chat in new window
          window.open(waUrl, '_blank');
        }, 800);
      }
    });
  });

  /* ------------------------------------------------------------------------
     7. TOAST NOTIFICATION UTILITY
     ------------------------------------------------------------------------ */
  function showToast(msg, type = 'info') {
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toastContainer';
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
      <span>${msg}</span>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  /* ------------------------------------------------------------------------
     8. BACK TO TOP BUTTON
     ------------------------------------------------------------------------ */
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  backToTopBtn.innerHTML = `<i class="fas fa-arrow-up"></i>`;
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ------------------------------------------------------------------------
     9. AUTO COPYRIGHT YEAR IN FOOTER
     ------------------------------------------------------------------------ */
  const copyrightElem = document.querySelector('.footer-bottom span');
  if (copyrightElem && !copyrightElem.innerHTML.includes(new Date().getFullYear())) {
    const currentYear = new Date().getFullYear();
    copyrightElem.innerHTML = `© ${currentYear} Grow Digital | All Rights Reserved.`;
  }
});