function openVideoPopup() {
  const popup = document.getElementById('videoPopup');
  const video = document.getElementById('demoVideo');
  const controlBtn = document.getElementById('videoControlBtn');

  popup.style.display = 'flex';
  video.currentTime = 0;
  video.play();

  video.oncanplay = () => {
    controlBtn.innerHTML = '❚❚';
    controlBtn.style.display = 'none';
    controlBtn.style.opacity = '0';
  };
}

function closeSuccessPopup() {
  document.getElementById('successPopup').style.display = 'none';
}

  function openPopup() {
    document.getElementById('contactPopup').style.display = 'flex';
  }

  function closePopup() {
    document.getElementById('contactPopup').style.display = 'none';
  }

  window.onload = function () {
    const triggers = document.querySelectorAll('.open-modal');
    triggers.forEach(button => {
      button.addEventListener('click', openPopup);
    });

    document.getElementById("contactForm").addEventListener("submit", function(e) {
      e.preventDefault();
      document.getElementById("successPopup").style.display = "flex";
      this.reset();
    });
  };

  function openSuccessPopup() {
    document.getElementById('successPopup').style.display = 'flex';
  }

  function closeSuccessPopup() {
  document.getElementById('successPopup').style.display = 'none';
  closePopup(); // This will also close the form underneath
}


  function showDemoVideo() {
  closeSuccessPopup();   // hide the success popup first
  openVideoPopup();      // then open the video popup
}

function closeVideoPopup() {
  const popup = document.getElementById('videoPopup');
  const video = document.getElementById('demoVideo');
  const controlBtn = document.getElementById('videoControlBtn');

  popup.style.display = 'none';
  video.pause();
  video.currentTime = 0;
  controlBtn.style.display = 'none';
}