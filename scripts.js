


// Loading Screen Logic
window.addEventListener("load", () => {
  // Add a slight delay to ensure the animation completes before removal
  setTimeout(() => {
    document.body.classList.add("loaded");
    // Optionally remove the loading screen after fade-out
    setTimeout(() => {
      const loadingScreen = document.getElementById("loading-screen");
      if (loadingScreen) loadingScreen.remove();
    }, 1500); // matches CSS fade-out duration
  }, 6500); // matches total animation duration in CSS
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

document.querySelectorAll('.gallery-slider').forEach((slider) => {
  const track = slider.querySelector('.gallery-track');
  const slides = Array.from(track.children);
  let index = 0;
  let startX = 0;
  let isDragging = false;
  const slideWidth = 290;

  // Clone first and last slides for seamless loop
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  track.insertBefore(lastClone, slides[0]);
  track.appendChild(firstClone);

  const updatedSlides = Array.from(track.children);
  index = 1;
  setPosition();

  function setPosition() {
    track.style.transition = 'none';
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  function smoothPosition() {
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  function autoAdvance() {
    index++;
    smoothPosition();
  }

  track.addEventListener('transitionend', () => {
    if (index >= updatedSlides.length - 1) {
      index = 1;
      setPosition();
    } else if (index <= 0) {
      index = updatedSlides.length - 2;
      setPosition();
    }
  });

  slider.addEventListener('touchstart', dragStart);
  slider.addEventListener('touchmove', dragMove);
  slider.addEventListener('touchend', dragEnd);
  slider.addEventListener('mousedown', dragStart);
  slider.addEventListener('mousemove', dragMove);
  slider.addEventListener('mouseup', dragEnd);
  slider.addEventListener('mouseleave', dragEnd);

  function dragStart(e) {
    isDragging = true;
    startX = getX(e);
    track.style.transition = 'none';
  }

  function dragMove(e) {
    if (!isDragging) return;
    const currentX = getX(e);
    const deltaX = currentX - startX;
    track.style.transform = `translateX(${ -index * slideWidth + deltaX }px)`;
  }

  function dragEnd(e) {
    if (!isDragging) return;
    const movedBy = getX(e) - startX;
    if (movedBy < -50) index++;
    else if (movedBy > 50) index--;
    smoothPosition();
    isDragging = false;
  }

  function getX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }

  if (slider.hasAttribute('data-autoplay')) {
    setInterval(autoAdvance, 7000);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('contact-modal');
  const openButtons = document.querySelectorAll('.open-modal');
  const closeButton = document.querySelector('.close-modal');
  

  // Open modal
  openButtons.forEach(button => {
    button.addEventListener('click', () => {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  });

  // Close by clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
});
