// Loading Screen Logic
document.addEventListener("DOMContentLoaded", () => {
  // Start background fade after 0.2s
  setTimeout(() => {
    document.querySelectorAll('.fluid-bg').forEach(bg => {
      bg.classList.add("loaded");
    });
    
    // Start content fade after 1.2s (1s after background starts)
    setTimeout(() => {
      document.querySelector('.site-content').classList.add("loaded");
    }, 0); // Content fade starts 1s after background
  }, 200); // Background fade starts at 0.2s
});


//sccroll 

gsap.registerPlugin(ScrollTrigger);

const steps = document.querySelectorAll(".step-block");

steps.forEach((step, i) => {
  ScrollTrigger.create({
    trigger: step,
    start: "top center",
    end: "bottom center",
    toggleClass: { targets: step, className: "active" },
    markers: false
  });
});

// Single Service Slider Logic
document.querySelectorAll('.gallery-slider').forEach((slider) => {
    const track = slider.querySelector('.gallery-track');
    const slides = Array.from(track.children);
    let currentIndex = 0;

    // Clone slides for infinite loop
    const slidesToClone = 3; // Increased from 2 to 3 for more buffer
    for (let i = 0; i < slidesToClone; i++) {
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            track.appendChild(clone);
        });
    }

    // Calculate dimensions
    function updateSlideWidth() {
        const containerWidth = slider.offsetWidth - 40;
        const gap = 20;
        const slideWidth = (containerWidth - gap * 2) / 3;
        return slideWidth + gap;
    }

    let slideWidth = updateSlideWidth();
    let position = 0;
    let isHovered = false;
    let isDragging = false;
    let startPos = 0;
    let dragStartPos = 0;

    // Handle window resize
    window.addEventListener('resize', () => {
        slideWidth = updateSlideWidth();
    });

    // Continuous movement animation
    function moveSlider() {
        if (!isHovered && !isDragging) {
            position -= 0.5;
            if (position <= -(slideWidth * slides.length)) {
                position = 0;
            }
            track.style.transform = `translateX(${position - 5}px)`;
        }
        requestAnimationFrame(moveSlider);
    }

    // Drag functionality
    function handleDragStart(e) {
        isDragging = true;
        startPos = getPositionX(e);
        dragStartPos = position;
        track.style.transition = 'none';
    }

    function handleDragMove(e) {
        if (!isDragging) return;
        const currentPosition = getPositionX(e);
        const diff = currentPosition - startPos;
        position = dragStartPos + diff;
        track.style.transform = `translateX(${position - 5}px)`;
    }

    function handleDragEnd() {
        isDragging = false;
        track.style.transition = 'transform 0.5s ease-out';
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    // Event listeners
    track.addEventListener('mouseenter', () => isHovered = true);
    track.addEventListener('mouseleave', () => {
        isHovered = false;
        if (!isDragging) {
            track.style.transition = 'transform 0.5s ease-out';
        }
    });

    // Mouse events
    track.addEventListener('mousedown', handleDragStart);
    track.addEventListener('mousemove', handleDragMove);
    track.addEventListener('mouseup', handleDragEnd);
    track.addEventListener('mouseleave', handleDragEnd);

    // Touch events
    track.addEventListener('touchstart', handleDragStart);
    track.addEventListener('touchmove', handleDragMove);
    track.addEventListener('touchend', handleDragEnd);

    // Start the animation
    moveSlider();
});

document.addEventListener('DOMContentLoaded', () => {
  const contactModal = document.getElementById('contact-modal');
  const successModal = document.getElementById('success-modal');
  const openButtons = document.querySelectorAll('.open-modal');
  const closeButtons = document.querySelectorAll('.close-modal');
  const timelineSelect = document.getElementById('timeline');
  const calendarSection = document.getElementById('calendar-section');
  const form = document.getElementById('demo-form');
  const bookCallButton = document.getElementById('book-call');
  
  // Open contact modal
  openButtons.forEach(button => {
    button.addEventListener('click', () => {
      contactModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modals
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.closest('.modal').style.display = 'none';
      document.body.style.overflow = '';
      if (button.closest('.modal') === successModal) {
        form.reset(); // Reset form when closing success modal
      }
    });
  });

  // Close by clicking outside
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
      document.body.style.overflow = '';
      if (e.target === successModal) {
        form.reset(); // Reset form when closing success modal
      }
    }
  });

  // Handle timeline selection
  timelineSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    if (value === 'immediate' || value === '1month') {
      calendarSection.style.display = 'block';
    } else {
      calendarSection.style.display = 'none';
    }
  });

  // Handle book call button click
  bookCallButton.addEventListener('click', () => {
    // Replace with your calendar booking link
    window.open('YOUR_CALENDAR_LINK', '_blank');
  });

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
      // Here you would send the form data to your backend
      console.log('Form submitted:', data);
      
      // Hide contact modal and show success modal
      contactModal.style.display = 'none';
      successModal.style.display = 'block';
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  });
});

// Typing Animation
const words = ["Automate.", "Enhance.", "Scale."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingDelay = 100;
const erasingDelay = 50;
const newWordDelay = 2000;

function type() {
  const current = words[wordIndex];
  const typingText = document.getElementById('typing-text');
  
  if (isDeleting) {
    typingText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(type, newWordDelay);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(type, isDeleting ? erasingDelay : typingDelay);
  }
}

// Start the typing animation when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, newWordDelay);
});
