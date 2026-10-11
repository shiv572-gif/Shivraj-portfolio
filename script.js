/**
 * ==============================================================================
 * PORTFOLIO JAVASCRIPT
 * Shivraj Singh | B.Tech ECE (1st Semester) | JECRC University, Jaipur
 * High-performance, vanilla JavaScript for interactive UI & animations
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DYNAMIC CURRENT YEAR IN FOOTER
  // --------------------------------------------------------------------------
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. HERO SECTION - TYPING TEXT ANIMATION
  // --------------------------------------------------------------------------
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const roles = [
      '1st Sem B.Tech ECE Student',
      'ECE Undergrad @ JECRC University',
      'Electronics & Circuit Enthusiast',
      'Curious Tech & Code Explorer',
      'Passionate Problem Solver'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 105;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Finished typing role, pause before deleting
        typingSpeed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next role
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  // --------------------------------------------------------------------------
  // 3. NAVBAR SCROLL EFFECT & READING PROGRESS BAR
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const scrollProgressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  function handleScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    // Update Progress Bar
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercentage}%`;
    }

    // Sticky Navbar Background
    if (navbar) {
      if (scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to Top Button Visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Back to top click event
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMobileMenu() {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close when clicking outside of drawer
    document.addEventListener('click', (e) => {
      if (
        mobileDrawer.classList.contains('open') &&
        !mobileDrawer.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // --------------------------------------------------------------------------
  // 6. PROJECTS CATEGORY FILTER
  // --------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');

          if (filterValue === 'all' || cardCategory === filterValue) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. COPY EMAIL TO CLIPBOARD
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailTextEl = document.getElementById('email-text');

  if (copyEmailBtn && emailTextEl) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = emailTextEl.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        const originalIcon = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i>';
        copyEmailBtn.setAttribute('title', 'Copied to clipboard!');

        setTimeout(() => {
          copyEmailBtn.innerHTML = originalIcon;
          copyEmailBtn.setAttribute('title', 'Copy email address');
        }, 2200);
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. PROJECT DETAILS MODAL
  // --------------------------------------------------------------------------
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalContent = document.getElementById('modal-content');
  const projectDetailButtons = document.querySelectorAll('.project-details-btn');

  // Modal data presets
  const projectData = {
    'ece-proj': {
      title: '[Project 1: Digital Logic Circuit / IoT System]',
      badge: 'ECE & Hardware Project • Placeholder',
      description: '[This is a clearly labelled placeholder for your Electronics & Communication Engineering project. Replace this with your circuit design, breadboard experiment, or microcontroller system].',
      keyPoints: [
        '[Key Feature 1: Circuit schematic & simulation analysis]',
        '[Key Feature 2: Component testing and logic gate verification]',
        '[Key Feature 3: Hardware prototype implementation or breadboard wiring]'
      ],
      techStack: ['[BEEE]', '[Circuits]', '[Hardware]', '[Electronics]'],
      repoLink: 'https://github.com/shiv572-gif'
    },
    'software-proj': {
      title: '[Project 2: Programming Utility / Console Application]',
      badge: 'Software & Code • Placeholder',
      description: '[This is a clearly labelled placeholder for your programming project in C, C++, or Python. Replace this with details of your algorithm and application features].',
      keyPoints: [
        '[Key Feature 1: Input handling and validation logic]',
        '[Key Feature 2: Algorithmic computations and state management]',
        '[Key Feature 3: Clean, modular architecture with error handling]'
      ],
      techStack: ['[C/C++]', '[Algorithms]', '[CLI]', '[Data Structures]'],
      repoLink: 'https://github.com/shiv572-gif'
    },
    'lab-proj': {
      title: '[Project 4: Circuit Simulation / Laboratory Study]',
      badge: 'Academic Lab • Placeholder',
      description: '[This is a clearly labelled placeholder for an academic laboratory simulation or study conducted during your 1st semester B.Tech ECE coursework at JECRC University].',
      keyPoints: [
        '[Key Feature 1: Circuit simulation and truth table validation]',
        '[Key Feature 2: Waveform analysis and performance metrics]',
        '[Key Feature 3: Lab documentation and experiment analysis]'
      ],
      techStack: ['[Simulation]', '[Logic Gates]', '[ECE Lab]', '[Proteus/Multisim]'],
      repoLink: 'https://github.com/shiv572-gif'
    }
  };

  function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data || !modal || !modalContent) return;

    modalContent.innerHTML = `
      <span class="badge-text" style="color: #06b6d4; font-weight:700; text-transform:uppercase; font-size:0.8rem; letter-spacing:0.05em; display:block; margin-bottom:0.5rem;">
        ${data.badge}
      </span>
      <h3 style="font-size:1.45rem; font-weight:800; margin-bottom:1rem; color:#fff;">
        ${data.title}
      </h3>
      <p style="color:#94a3b8; font-size:0.95rem; line-height:1.65; margin-bottom:1.5rem;">
        ${data.description}
      </p>

      <h4 style="font-size:1rem; font-weight:700; color:#cbd5e1; margin-bottom:0.75rem;">
        Key Architectural Features:
      </h4>
      <ul style="display:flex; flex-direction:column; gap:0.5rem; margin-bottom:1.5rem;">
        ${data.keyPoints.map(point => `
          <li style="color:#cbd5e1; font-size:0.9rem; display:flex; align-items:flex-start; gap:0.6rem;">
            <i class="fa-solid fa-check" style="color:#10b981; margin-top:0.25rem;"></i>
            <span>${point}</span>
          </li>
        `).join('')}
      </ul>

      <h4 style="font-size:1rem; font-weight:700; color:#cbd5e1; margin-bottom:0.75rem;">
        Technologies Used:
      </h4>
      <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1.75rem;">
        ${data.techStack.map(tech => `
          <span class="tech-tag">${tech}</span>
        `).join('')}
      </div>

      <div style="display:flex; gap:1rem; align-items:center;">
        <a href="${data.repoLink}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
          <i class="fa-brands fa-github"></i> View GitHub Profile
        </a>
      </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  projectDetailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeProjectModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeProjectModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 9. CONTACT FORM VALIDATION & INTERACTIVE SUBMISSION
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formAlert = document.getElementById('form-alert');

  if (contactForm) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function checkField(input, isValid, groupEl) {
      if (isValid) {
        groupEl.classList.remove('has-error');
        return true;
      } else {
        groupEl.classList.add('has-error');
        return false;
      }
    }

    // Clear error on input
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          const group = input.closest('.form-group');
          if (group) group.classList.remove('has-error');
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;

      // Validate Name
      const nameVal = nameInput.value.trim();
      const isNameValid = nameVal.length >= 2;
      if (!checkField(nameInput, isNameValid, nameInput.closest('.form-group'))) {
        isFormValid = false;
      }

      // Validate Email
      const emailVal = emailInput.value.trim();
      const isEmailValid = validateEmail(emailVal);
      if (!checkField(emailInput, isEmailValid, emailInput.closest('.form-group'))) {
        isFormValid = false;
      }

      // Validate Subject
      const subjectVal = subjectInput.value.trim();
      const isSubValid = subjectVal.length >= 3;
      if (!checkField(subjectInput, isSubValid, subjectInput.closest('.form-group'))) {
        isFormValid = false;
      }

      // Validate Message
      const messageVal = messageInput.value.trim();
      const isMsgValid = messageVal.length >= 10;
      if (!checkField(messageInput, isMsgValid, messageInput.closest('.form-group'))) {
        isFormValid = false;
      }

      if (!isFormValid) {
        return;
      }

      // Simulated sending state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <i class="fa-solid fa-circle-notch fa-spin"></i>
        <span>Sending Message...</span>
      `;

      setTimeout(() => {
        // Reset submit button
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;

        // Display Success Alert
        if (formAlert) {
          formAlert.className = 'form-alert success';
          formAlert.innerHTML = `
            <strong><i class="fa-solid fa-circle-check"></i> Thank you, ${nameVal}!</strong><br />
            Your message has been formatted. Note: Once you add your active email address in <code>index.html</code>, visitors will be able to reach you directly!
          `;
          formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset form
        contactForm.reset();
      }, 1000);
    });
  }

  // --------------------------------------------------------------------------
  // 10. TOAST NOTIFICATION HELPER
  // --------------------------------------------------------------------------
  function showToast(message, icon = 'fa-circle-info') {
    let toast = document.getElementById('global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid ${icon}" style="color: #38bdf8;"></i> <span>${message}</span>`;
    toast.classList.add('show');

    if (toast.dataset.timeoutId) {
      clearTimeout(parseInt(toast.dataset.timeoutId, 10));
    }
    const timeoutId = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
    toast.dataset.timeoutId = timeoutId.toString();
  }

  // --------------------------------------------------------------------------
  // 11. SMART PLACEHOLDER LINK & RESUME INTERCEPTOR
  // --------------------------------------------------------------------------
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Detect unreplaced bracket placeholders like [Your Email Address], etc.
    if (href.includes('[') && href.includes(']')) {
      e.preventDefault();
      if (href.startsWith('mailto:')) {
        showToast('Replace [Your Email Address] with your actual email address in index.html!');
      } else {
        showToast('This is a placeholder link: Update with your specific URL in index.html!');
      }
      return;
    }

    // Resume button notice if not yet pointing to a local PDF
    if (link.id === 'download-cv-btn' && (href === '#contact' || href === '#' || !href.endsWith('.pdf'))) {
      showToast('Tip: Place resume.pdf in this folder and set href="resume.pdf" in index.html!');
    }
  });

  // --------------------------------------------------------------------------
  // 12. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.glass-card, .timeline-card, .spotlight-box');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => {
      el.classList.add('fade-in-section');
      observer.observe(el);
    });
  }
});
