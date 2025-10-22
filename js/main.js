// ===================================
// MODERN PORTFOLIO JAVASCRIPT
// Enhanced with GSAP, Particles, 
// Typed.js, and Advanced Interactions
// ===================================

(function() {
  'use strict';

  // ===================================
  // INITIALIZATION
  // ===================================
  document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initTypedText();
    initAOS();
    initTiltCards();
    initSkillBars();
    initCounterAnimation();
    initCustomCursor();
    initScrollAnimations();
    initBackToTop();
    initNavbarScroll();
    initMagneticButtons();
    initFormValidation();
  });

  // ===================================
  // PARTICLES.JS BACKGROUND
  // ===================================
  function initParticles() {
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#667eea'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#667eea',
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.5
              }
            },
            push: {
              particles_nb: 4
            }
          }
        },
        retina_detect: true
      });
    }
  }

  // ===================================
  // TYPED.JS TEXT ANIMATION
  // ===================================
  function initTypedText() {
    if (typeof Typed !== 'undefined') {
      const typingElement = document.querySelector('.typing-text');
      if (typingElement) {
        new Typed('.typing-text', {
          strings: [
            'Full Stack Developer',
            'MERN Stack Expert',
            'Open Source Contributor',
            'UI/UX Enthusiast',
            'DSA Enthusiast'
          ],
          typeSpeed: 80,
          backSpeed: 60,
          backDelay: 2000,
          loop: true,
          showCursor: true,
          cursorChar: '|'
        });
      }
    }
  }

  // ===================================
  // AOS (ANIMATE ON SCROLL) INIT
  // ===================================
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
      });
    }
  }

  // ===================================
  // VANILLA TILT FOR 3D CARD EFFECT
  // ===================================
  function initTiltCards() {
    if (typeof VanillaTilt !== 'undefined') {
      const tiltElements = document.querySelectorAll('.tilt-card');
      VanillaTilt.init(tiltElements, {
        max: 10,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
        perspective: 1000
      });
    }
  }

  // ===================================
  // SKILL BARS ANIMATION
  // ===================================
  function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
      skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const rect = bar.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
          setTimeout(() => {
            bar.style.width = progress + '%';
          }, 200);
        }
      });
    };

    // Trigger on scroll
    window.addEventListener('scroll', animateSkillBars);
    // Initial check
    animateSkillBars();
  }

  // ===================================
  // COUNTER ANIMATION FOR STATS
  // ===================================
  function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + '+';
        }
      };

      updateCounter();
    };

    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          animateCounter(entry.target);
          entry.target.classList.add('counted');
        }
      });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
  }

  // ===================================
  // CUSTOM CURSOR
  // ===================================
  function initCustomCursor() {
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (!cursorDot || !cursorOutline) return;

    // Check if device supports hover (desktop)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    // Smooth follow for outline
    function animateCursor() {
      const diffX = mouseX - outlineX;
      const diffY = mouseY - outlineY;

      outlineX += diffX * 0.15;
      outlineY += diffY * 0.15;

      cursorOutline.style.left = outlineX + 'px';
      cursorOutline.style.top = outlineY + 'px';

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor effects on hover
    const hoverElements = document.querySelectorAll('a, button, .magnetic-btn');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }

  // ===================================
  // GSAP SCROLL ANIMATIONS
  // ===================================
  function initScrollAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Parallax effect for hero image
      gsap.to('.hero-image-container', {
        y: 100,
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Fade in sections
      gsap.utils.toArray('.section-padding').forEach(section => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        });
      });

      // Project cards stagger animation
      gsap.from('.project-card', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 70%'
        }
      });

      // Certificate cards stagger
      gsap.from('.certificate-card', {
        opacity: 0,
        scale: 0.8,
        stagger: 0.15,
        duration: 0.6,
        scrollTrigger: {
          trigger: '#certificates',
          start: 'top 70%'
        }
      });
    }
  }

  // ===================================
  // BACK TO TOP BUTTON
  // ===================================
  function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===================================
  // NAVBAR SCROLL EFFECT
  // ===================================
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 50) {
        navbar.style.background = 'rgba(10, 10, 26, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
      } else {
        navbar.style.background = 'rgba(10, 10, 26, 0.7)';
        navbar.style.boxShadow = 'none';
      }
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const offset = 80; // Navbar height
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
              const bsCollapse = new bootstrap.Collapse(navbarCollapse);
              bsCollapse.hide();
            }
          }
        }
      });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  }

  // ===================================
  // MAGNETIC BUTTON EFFECT
  // ===================================
  function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic-btn');

    magneticButtons.forEach(button => {
      button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ===================================
  // FORM VALIDATION & SUBMISSION
  // ===================================
  function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Simple validation
      if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // ===================================
  // HELPER FUNCTIONS
  // ===================================
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === 'success' ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'};
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  // ===================================
  // LIGHTBOX CONFIGURATION
  // ===================================
  if (typeof lightbox !== 'undefined') {
    lightbox.option({
      'resizeDuration': 200,
      'wrapAround': true,
      'albumLabel': 'Certificate %1 of %2',
      'fadeDuration': 300,
      'imageFadeDuration': 300
    });
  }

  // ===================================
  // PRELOADER (Optional)
  // ===================================
  window.addEventListener('load', function() {
    const preloader = document.querySelector('.loading');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('hide');
      }, 500);
    }
  });

  // ===================================
  // PERFORMANCE OPTIMIZATION
  // ===================================
  
  // Throttle function for scroll events
  function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

})();

// ===================================
// END OF SCRIPT
// ===================================
