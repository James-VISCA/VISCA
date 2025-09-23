// VISCA - Clean, Professional JavaScript

// Simple typing animation
const typingWords = ["Automate.", "Enhance.", "Scale."];
let typingWordIndex = 0;
let typingCharIndex = 0;
let typingIsDeleting = false;
const typingSpeed = 100;
const erasingSpeed = 50;
const wordPause = 1500;

function initTyping() {
  const typingText = document.getElementById('typing-text');
  if (!typingText) return;
  
  function type() {
    const currentWord = typingWords[typingWordIndex];
    
    if (!typingIsDeleting && typingCharIndex < currentWord.length) {
      typingText.textContent = currentWord.substring(0, typingCharIndex + 1);
      typingCharIndex++;
      setTimeout(type, typingSpeed);
    } else if (typingIsDeleting && typingCharIndex > 0) {
      typingText.textContent = currentWord.substring(0, typingCharIndex - 1);
      typingCharIndex--;
      setTimeout(type, erasingSpeed);
    } else {
      if (!typingIsDeleting) {
        typingIsDeleting = true;
        setTimeout(type, wordPause);
      } else {
        typingIsDeleting = false;
        typingWordIndex = (typingWordIndex + 1) % typingWords.length;
        setTimeout(type, typingSpeed);
      }
    }
  }
  
  // Start after a delay
  setTimeout(type, 1000);
}

// FAQ Accordion
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function() {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      
      // Close all FAQ items
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
      });
      
      // Open clicked item if it wasn't open
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

// Calendar links with error handling and loading states
function initCalendarLinks() {
  document.querySelectorAll('.open-cal').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Track CTA click
      if (typeof trackCTA === 'function') {
        trackCTA('calendar_booking');
      }
      
      // Add loading state
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Opening...';
      btn.style.opacity = '0.7';
      btn.style.pointerEvents = 'none';
      
      try {
        // Attempt to open calendar
        const calendarWindow = window.open('https://calendly.com/jamesraviporter/30min', '_blank');
        
        // Check if popup was blocked
        if (!calendarWindow || calendarWindow.closed || typeof calendarWindow.closed == 'undefined') {
          throw new Error('Popup blocked');
        }
        
        // Success - restore button after delay
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.opacity = '1';
          btn.style.pointerEvents = 'auto';
        }, 1000);
        
      } catch (error) {
        console.error('Calendar link failed:', error);
        
        // Track fallback usage
        if (typeof trackCTA === 'function') {
          trackCTA('calendar_fallback_email');
        }
        
        // Fallback to email
        btn.innerHTML = 'Email Instead';
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
        
        // Change action to email
        btn.onclick = function() {
          window.location.href = 'mailto:james@viscaai.com?subject=Schedule%20a%20Call&body=Hi%20James,%20I%27d%20like%20to%20schedule%20a%20call%20to%20discuss%20AI%20solutions%20for%20my%20business.';
        };
      }
    });
  });
}

// Smooth scroll animations with section tracking
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        
        // Track section view
        if (typeof trackSectionView === 'function') {
          const sectionName = entry.target.className || entry.target.id || 'unknown_section';
          trackSectionView(sectionName);
        }
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

// Interactive Triangle Grid - Optimized
function initTriangleGrid() {
  const triangleContainer = document.getElementById('floating-shapes');
  if (!triangleContainer) return;
  
  const triangleSize = 60;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Calculate grid dimensions with reduced density for performance
  const cols = Math.ceil(viewportWidth / (triangleSize * 1.5)) + 1;
  const rows = Math.ceil(viewportHeight / (triangleSize * 1.5)) + 1;
  
  // Use DocumentFragment for better performance
  const fragment = document.createDocumentFragment();
  
  // Generate triangles with reduced count
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Skip some triangles for performance
      if ((row + col) % 2 === 0) continue;
      
      // Create upward triangle
      const triangleUp = document.createElement('div');
      triangleUp.className = 'triangle up';
      triangleUp.style.left = (col * triangleSize * 1.5) + 'px';
      triangleUp.style.top = (row * triangleSize * 1.5) + 'px';
      
      // Offset every other row for hexagonal pattern
      if (row % 2 === 1) {
        triangleUp.style.left = (col * triangleSize * 1.5 + triangleSize / 2) + 'px';
      }
      
      fragment.appendChild(triangleUp);
    }
  }
  
  triangleContainer.appendChild(fragment);
  
  // Debounced resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      triangleContainer.innerHTML = '';
      initTriangleGrid();
    }, 150);
  });
}


// Image loading with loading states
function initImageLoading() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Add loading class
    img.classList.add('loading');
    
    // Handle load success
    img.addEventListener('load', function() {
      this.classList.remove('loading');
      this.classList.add('loaded');
    });
    
    // Handle load error
    img.addEventListener('error', function() {
      this.classList.remove('loading');
      this.classList.add('error');
      console.warn('Image failed to load:', this.src);
    });
    
    // If already loaded
    if (img.complete) {
      img.classList.remove('loading');
      img.classList.add('loaded');
    }
  });
}

// Initialize everything when DOM is loaded - Optimized
document.addEventListener('DOMContentLoaded', function() {
  // Use requestIdleCallback for non-critical features
  const initNonCritical = () => {
    initTriangleGrid();
    initScrollAnimations();
  };
  
  // Initialize critical features immediately
  initTyping();
  initFAQ();
  initCalendarLinks();
  initImageLoading();
  
  // Initialize non-critical features when browser is idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(initNonCritical, { timeout: 2000 });
  } else {
    setTimeout(initNonCritical, 100);
  }
  
  // Add fade-in class to hero content
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add('fade-in');
    }, 500);
  }
});
