/* ==========================================================================
   GROW DIGITAL — CLIENTS GALLERY & LIGHTBOX ENGINE (portfolio.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. FILTER TABS HANDLER
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card[data-category], .card[data-category]');

  if (filterBtns.length > 0 && cards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active state
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.getAttribute('data-filter');

        cards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 20);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // 2. LIGHTBOX HANDLER
  const lightboxModal = document.getElementById('lightboxModal') || document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg') || document.getElementById('popupImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose') || document.getElementById('lbClose');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  if (lightboxModal && lightboxImg && triggers.length > 0) {
    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const imgSrc = trigger.getAttribute('href');
        const card = trigger.closest('.portfolio-card, .card');
        const title = card ? (card.querySelector('h3')?.textContent || '') : '';

        lightboxImg.src = imgSrc;
        if (lightboxCaption) lightboxCaption.textContent = title;

        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
});