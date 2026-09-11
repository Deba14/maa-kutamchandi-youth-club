/* ==========================================================================
   FESTIVAL & COMMUNITY PUJA WEBSITE - JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilter();
  initLightbox();
  initModals();
  initHeaderScroll();
  initMobileNav();
});

/* --------------------------------------------------------------------------
   1. COUNTDOWN TIMER
   -------------------------------------------------------------------------- */
function initCountdown() {
  // Target date: Set to upcoming festival date (e.g. October 18, 2026 or dynamically 45 days from now)
  const now = new Date();
  let targetDate = new Date(now.getFullYear(), 9, 18, 9, 0, 0); // Oct 18 of current year
  if (targetDate.getTime() < now.getTime()) {
    // If date passed this year, set to 45 days in future for demonstration
    targetDate = new Date(now.getTime() + (45 * 24 * 60 * 60 * 1000));
  }

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateTimer() {
    const currentTime = new Date().getTime();
    const distance = targetDate.getTime() - currentTime;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      const label = document.querySelector('.countdown-heading');
      if (label) label.innerHTML = '🎉 The Grand Celebrations Have Begun!';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* --------------------------------------------------------------------------
   2. SCHEDULE / NIRGHONTO TABS
   -------------------------------------------------------------------------- */
function initScheduleTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTabId = button.getAttribute('data-tab');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      button.classList.add('active');
      const targetPane = document.getElementById(targetTabId);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

/* --------------------------------------------------------------------------
   3. GALLERY FILTERING
   -------------------------------------------------------------------------- */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.35s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function initLightbox() {
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!lightboxModal) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        const title = item.querySelector('h5')?.innerText || '';
        if (lightboxCaption) {
          lightboxCaption.innerHTML = title ? `<strong>${title}</strong>` : '';
        }
        lightboxModal.showModal();
      }
    });
  });

  const closeBtn = lightboxModal.querySelector('.modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => lightboxModal.close());
  }

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      lightboxModal.close();
    }
  });
}

/* --------------------------------------------------------------------------
   5. MODAL SYSTEM
   -------------------------------------------------------------------------- */
function initModals() {
  // Generic modal openers
  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-open-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        // Pre-fill amount if triggered from donation tier
        const presetAmount = trigger.getAttribute('data-amount');
        if (presetAmount) {
          const amountInput = modal.querySelector('#donationAmount');
          if (amountInput) amountInput.value = presetAmount;
        }
        modal.showModal();
      }
    });
  });

  // Generic modal closers
  document.querySelectorAll('dialog').forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => modal.close());
    }
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close();
    });
  });
}

/* --------------------------------------------------------------------------
   6. HEADER SCROLL EFFECT & ACTIVE LINKS
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   7. MOBILE NAVIGATION TOGGLE
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    toggleBtn.innerHTML = isOpen ? '✕' : '☰';
  });

  // Close nav on link click
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.innerHTML = '☰';
    });
  });
}

/* --------------------------------------------------------------------------
   8. DONATION FORM SUBMISSION
   -------------------------------------------------------------------------- */
function initDonationForm() {
  const donationForm = document.getElementById('donationForm');
  const donationModal = document.getElementById('donationModal');

  if (!donationForm) return;

  donationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('donorName').value;
    const amount = document.getElementById('donationAmount').value;
    const purpose = document.getElementById('donationPurpose').value;

    if (donationModal) donationModal.close();

    showToast(`🙏 Thank you, ${name}! Your pledge of ₹${amount} for ${purpose} is received.`);
    donationForm.reset();
  });
}

/* --------------------------------------------------------------------------
   9. VOLUNTEER FORM SUBMISSION
   -------------------------------------------------------------------------- */
function initVolunteerForm() {
  const volunteerForm = document.getElementById('volunteerForm');
  const volunteerModal = document.getElementById('volunteerModal');

  if (!volunteerForm) return;

  volunteerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('volName').value;
    const team = document.getElementById('volTeam').value;

    if (volunteerModal) volunteerModal.close();

    showToast(`🎉 Welcome to the team, ${name}! We will contact you for ${team}.`);
    volunteerForm.reset();
  });
}

/* --------------------------------------------------------------------------
   10. COPY UPI ID
   -------------------------------------------------------------------------- */
function initCopyUpi() {
  const copyBtn = document.getElementById('copyUpiBtn');
  const upiIdSpan = document.getElementById('upiIdText');

  if (!copyBtn || !upiIdSpan) return;

  copyBtn.addEventListener('click', () => {
    const upi = upiIdSpan.innerText.trim();
    navigator.clipboard.writeText(upi).then(() => {
      showToast('✓ UPI ID copied to clipboard: ' + upi);
    }).catch(() => {
      showToast('UPI ID: ' + upi);
    });
  });
}

/* --------------------------------------------------------------------------
   TOAST HELPER
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.querySelector('.toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
