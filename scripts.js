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

// Simple scroll animations for titles and descriptions
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Target all titles and descriptions below hero
  const animatedElements = document.querySelectorAll('.section-header h2, .section-header p, .service-title, .service-desc, .impact-value, .impact-label, .impact-description, .team-strip-content h2, .team-strip-content p, .final-header h2, .final-header p, .agent-card');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const contactModal = document.getElementById('contact-modal');
  const successModal = document.getElementById('success-modal');
  const openButtons = document.querySelectorAll('.open-modal');
  const closeButtons = document.querySelectorAll('.close-modal');
  
  // Open contact modal
  openButtons.forEach(button => {
    button.addEventListener('click', () => {
      // This code is now a no-op since modals are removed
    });
  });

  // Close modals
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      // This code is now a no-op since modals are removed
    });
  });

  // Close by clicking outside
  window.addEventListener('click', (e) => {
    // This code is now a no-op since modals are removed
  });


});

// Typing Animation (remade, robust, white caret)
const typingWords = ["Automate.", "Enhance.", "Scale."];
let typingWordIndex = 0;
let typingCharIndex = 0;
let typingIsDeleting = false;
const typingSpeed = 90;
const erasingSpeed = 40;
const wordPause = 1200;
let typingInterval;

function startTyping() {
  const typingText = document.getElementById('typing-text');
  if (!typingText) return;
  const currentWord = typingWords[typingWordIndex];

  // Only add the border caret, not the '|' character
  typingText.innerHTML =
    currentWord.substring(0, typingCharIndex) +
    '<span class="typing-caret"></span>';

  if (!typingIsDeleting && typingCharIndex < currentWord.length) {
    typingCharIndex++;
    typingInterval = setTimeout(startTyping, typingSpeed);
  } else if (typingIsDeleting && typingCharIndex > 0) {
    typingCharIndex--;
    typingInterval = setTimeout(startTyping, erasingSpeed);
  } else {
    if (!typingIsDeleting) {
      typingIsDeleting = true;
      typingInterval = setTimeout(startTyping, wordPause);
    } else {
      typingIsDeleting = false;
      typingWordIndex = (typingWordIndex + 1) % typingWords.length;
      typingInterval = setTimeout(startTyping, typingSpeed);
    }
  }
}

// Start typing animation only once
let typingStarted = false;
document.addEventListener('DOMContentLoaded', () => {
  if (!typingStarted) {
    typingStarted = true;
    startTyping();
  }
});

// Remove snaking timeline animation code
// Remove getShapePoints and drawMorphingShape (unused)

// --- Timeline Orb Morphing State ---
// Removed: orbMorphState, orbMorphT, orbMorphTarget, orbMorphRotation, and drawOpalOrb()

// --- 3D Timeline Orb (Three.js) ---
import * as THREE from 'https://unpkg.com/three@0.154.0/build/three.module.js';

function createTimeline3DOrb() {
  const orbCanvas = document.querySelector('.timeline-orb-canvas');
  if (!orbCanvas) return;
  orbCanvas.width = 268;
  orbCanvas.height = 268;
  orbCanvas.style.background = 'transparent';

  // Three.js setup
  const renderer = new THREE.WebGLRenderer({ canvas: orbCanvas, alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(268, 268, false);
  const scene = new THREE.Scene();
  // Camera moved back for smaller shapes
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 8.5); // was 4.2, now further for ~2x smaller

  // Lighting (add blue ambient for opal effect)
  const light = new THREE.DirectionalLight(0xffffff, 1.1);
  light.position.set(2, 2, 4);
  scene.add(light);
  // Lower ambient light for more contrast
  scene.add(new THREE.AmbientLight(0xffffff, 0.45)); // softer ambient

  // --- Custom ShaderMaterial for Opal Effect ---
  const opalVertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const opalFragmentShader = `
    varying vec2 vUv;
    uniform float uTime;
    
    // Primary opal cloud colors
    vec3 milkyWhite = vec3(0.98, 0.98, 0.99);
    vec3 milkyPink  = vec3(1.0, 0.85, 0.93);
    vec3 lightBlue  = vec3(0.70, 0.92, 1.0);
    vec3 lightGreen = vec3(0.80, 1.0, 0.90);
    // Secondary
    vec3 orange     = vec3(1.0, 0.80, 0.55);
    // Tertiary
    vec3 purple     = vec3(0.85, 0.70, 1.0);
    vec3 yellow     = vec3(1.0, 0.98, 0.55);
    vec3 red        = vec3(1.0, 0.60, 0.60);
    
    void main() {
      float t = uTime * 0.5;
      // Large, overlapping primaries
      float p1 = smoothstep(0.55, 0.0, distance(vUv, vec2(0.45 + 0.13*sin(t), 0.55 + 0.11*cos(t)))); // white
      float p2 = smoothstep(0.50, 0.0, distance(vUv, vec2(0.65 + 0.09*cos(t*1.3), 0.35 + 0.13*sin(t*1.2)))); // pink
      float p3 = smoothstep(0.52, 0.0, distance(vUv, vec2(0.35 + 0.11*sin(t*0.7), 0.25 + 0.09*cos(t*1.7)))); // blue
      float p4 = smoothstep(0.48, 0.0, distance(vUv, vec2(0.55 + 0.12*cos(t*1.5), 0.75 + 0.08*sin(t*1.1)))); // green
      // Strong pink and orange
      float p5 = smoothstep(0.44, 0.0, distance(vUv, vec2(0.60 + 0.10*sin(t*0.9), 0.60 + 0.10*cos(t*1.4)))); // pink
      float p6 = smoothstep(0.40, 0.0, distance(vUv, vec2(0.50 + 0.14*sin(t*1.2), 0.30 + 0.10*cos(t*1.6)))); // orange
      // Tertiary, smaller
      float p7 = smoothstep(0.22, 0.0, distance(vUv, vec2(0.40 + 0.12*cos(t*1.7), 0.40 + 0.12*sin(t*1.3)))); // purple
      float p8 = smoothstep(0.20, 0.0, distance(vUv, vec2(0.55 + 0.10*sin(t*1.4), 0.20 + 0.09*cos(t*1.5)))); // yellow
      float p9 = smoothstep(0.18, 0.0, distance(vUv, vec2(0.30 + 0.10*sin(t*1.1), 0.60 + 0.08*cos(t*1.8)))); // red
      // Blend all for a swirling opal cloud
      vec3 color = milkyWhite * p1 + milkyPink * p2 + lightBlue * p3 + lightGreen * p4;
      color += milkyPink * p5 * 1.2 + orange * p6 * 1.1;
      color += purple * p7 * 0.7 + yellow * p8 * 0.5 + red * p9 * 0.5;
      float total = p1 + p2 + p3 + p4 + p5 * 1.2 + p6 * 1.1 + p7 * 0.7 + p8 * 0.5 + p9 * 0.5;
      color /= max(total, 0.001);
      // Fill gaps with milkyWhite if total is low
      color = mix(milkyWhite, color, clamp(total, 0.0, 1.0));
      // Soft edge
      float edge = smoothstep(0.98, 0.85, length(vUv - 0.5));
      color = mix(vec3(1.0), color, edge);
      gl_FragColor = vec4(color, 1.0);
    }
  `;
  const opalUniforms = {
    uTime: { value: 0 }
  };
  const material = new THREE.ShaderMaterial({
    uniforms: opalUniforms,
    vertexShader: opalVertexShader,
    fragmentShader: opalFragmentShader
  });

  // Geometries (smaller scale)
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.38, 48, 48), material); // was 1
  const pyramid = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.62, 4), material); // was 1,1.6
  const bipyramid = new THREE.Mesh(new THREE.OctahedronGeometry(0.38), material); // was 1
  const cube = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), material); // was 1.3

  pyramid.rotation.y = Math.PI / 4;
  bipyramid.rotation.y = Math.PI / 4;
  cube.rotation.y = Math.PI / 4;
  cube.rotation.x = Math.PI / 8;

  let currentMesh = null;
  function setShape(shape) {
    if (currentMesh) scene.remove(currentMesh);
    if (shape === 'sphere') currentMesh = sphere;
    else if (shape === 'pyramid') currentMesh = pyramid;
    else if (shape === 'bipyramid') currentMesh = bipyramid;
    else if (shape === 'cube') currentMesh = cube;
    else currentMesh = sphere;
    scene.add(currentMesh);
  }

  function animate() {
    if (currentMesh) {
      currentMesh.rotation.y += 0.012;
      currentMesh.rotation.x = Math.PI / 8;
      // Animate opal shader
      if (material.uniforms && material.uniforms.uTime) {
        material.uniforms.uTime.value = performance.now() * 0.001;
      }
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  function updateShapeFromTimeline() {
    const section = document.querySelector('.timeline-section');
    if (!section) return;
    const slots = Array.from(section.querySelectorAll('.timeline-slot'));
    let activeIdx = -1;
    slots.forEach((slot, idx) => {
      if (slot.classList.contains('active')) activeIdx = idx;
    });
    // Determine if orb is tracking a slot (phase 2 in 2D logic)
    // If no slot is active, or orb is not tracking, show sphere
    if (activeIdx === -1) {
      setShape('sphere');
    } else if (activeIdx === 0) {
      setShape('pyramid');
    } else if (activeIdx === 1) {
      setShape('bipyramid');
    } else if (activeIdx === 2) {
      setShape('cube');
    } else {
      setShape('sphere');
    }
  }
  setShape('sphere'); // Start with orb
  setInterval(updateShapeFromTimeline, 80);
}

document.addEventListener('DOMContentLoaded', createTimeline3DOrb);

// --- Timeline Orb Movement Logic (p1–p5, simple, modular, adaptive) ---
// Positions:
// p1: Below the title (centered)
// p2: Above the timeline (above/left of cards)
// p3: Left of 1st card (slotted)
// p4: Left of 2nd card (slotted)
// p5: Left of 3rd card (slotted)

function getTimelineOrbPositions() {
  // Returns an array of {x, y} for p1–p5 based on current layout
  const section = document.querySelector('.timeline-section');
  const header = section.querySelector('.section-header');
  const track = section.querySelector('.timeline-vertical-track');
  const slots = Array.from(section.querySelectorAll('.timeline-slot'));
  const orb = document.querySelector('.timeline-orb-canvas');
  if (!section || !header || !track || slots.length < 3 || !orb) return null;
  const sectionRect = section.getBoundingClientRect();
  const headerRect = header.getBoundingClientRect();
  const trackRect = track.getBoundingClientRect();
  const orbW = orb.offsetWidth, orbH = orb.offsetHeight;
  // p2: above the timeline (above/left of cards)
  const p2 = {
    x: trackRect.left - orbW * 0.7 - sectionRect.left,
    y: trackRect.top - orbH * 0.7 - sectionRect.top
  };
  // p1: horizontally centered, y same as p2
  const p1 = {
    x: headerRect.left + headerRect.width / 2 - orbW / 2 - sectionRect.left,
    y: p2.y
  };
  // p3–p5: left of each slot (vertically aligned)
  const slotPositions = slots.map(slot => {
    const slotRect = slot.getBoundingClientRect();
    return {
      x: slotRect.left - orbW * 0.7 - sectionRect.left,
      y: slotRect.top + slotRect.height / 2 - orbH / 2 - sectionRect.top
    };
  });
  return [p1, p2, ...slotPositions]; // [p1, p2, p3, p4, p5]
}

function getTimelineOrbTargetIndex() {
  // Returns the current target position index (0–4) based on scroll
  const section = document.querySelector('.timeline-section');
  const header = section.querySelector('.section-header');
  const track = section.querySelector('.timeline-vertical-track');
  const slots = Array.from(section.querySelectorAll('.timeline-slot'));
  if (!section || !header || !track || slots.length < 3) return 0;
  const sectionRect = section.getBoundingClientRect();
  const headerRect = header.getBoundingClientRect();
  const trackRect = track.getBoundingClientRect();
  const winH = window.innerHeight;
  // p1: before timeline enters view (header bottom below 1/2 viewport)
  if (headerRect.bottom < winH * 0.5) {
    // p2: timeline track top enters upper 1/2 of viewport
    if (trackRect.top < winH * 0.35) {
      // p3–p5: as each slot is centered in viewport
      let slotIdx = 0;
      for (let i = slots.length - 1; i >= 0; --i) {
        const slotRect = slots[i].getBoundingClientRect();
        const slotCenter = slotRect.top + slotRect.height / 2;
        if (slotCenter < winH / 2 + 24) { slotIdx = i; break; }
      }
      // Once orb enters timeline (p3), never go above p3
      return Math.max(2, slotIdx + 2); // 2=p3, 3=p4, 4=p5
    }
    return 1; // p2
  }
  return 0; // p1
}

function moveTimelineOrb() {
  const orb = document.querySelector('.timeline-orb-canvas');
  const positions = getTimelineOrbPositions();
  if (!orb || !positions) return;
  const targetIdx = getTimelineOrbTargetIndex();
  // Animate orb to target position (lerp for smoothness)
  if (!moveTimelineOrb.state) moveTimelineOrb.state = { x: positions[0].x, y: positions[0].y };
  const state = moveTimelineOrb.state;
  const target = positions[targetIdx];
  state.x += (target.x - state.x) * 0.18;
  state.y += (target.y - state.y) * 0.18;
  orb.style.transform = `translate(${state.x}px, ${state.y}px)`;
  // Mark active slot for shape morphing (optional)
  const slots = Array.from(document.querySelectorAll('.timeline-slot'));
  slots.forEach((slot, i) => slot.classList.toggle('active', targetIdx === i + 2));
  // Call shape morphing/rendering logic here if needed
  requestAnimationFrame(moveTimelineOrb);
}

// Start movement logic on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(moveTimelineOrb, 200); // Delay to allow layout
  window.addEventListener('resize', () => { moveTimelineOrb.state = null; });
  window.addEventListener('scroll', () => { /* No-op, movement is frame-based */ });
});

// --- Timeline Section Fade-In Fix (Fix-it Felix) ---
window.addEventListener('DOMContentLoaded', () => {
  function fadeInTimelineSection() {
    const section = document.querySelector('.timeline-section');
    if (!section) return;
    const fadeEls = section.querySelectorAll('.fade-on-scroll');
    const rect = section.getBoundingClientRect();
    const winH = window.innerHeight;
    if (rect.top < winH - 80) {
      fadeEls.forEach(el => el.classList.add('visible'));
    } else {
      fadeEls.forEach(el => el.classList.remove('visible'));
    }
  }
  window.addEventListener('scroll', fadeInTimelineSection);
  fadeInTimelineSection();
});

// BLOB ANIMATION SYSTEM
(function() {
  const canvas = document.getElementById('bg-blobs');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let dpr = window.devicePixelRatio || 1;
  let width = 0;
  let height = 0;
  function resize() {
    dpr = window.devicePixelRatio || 1;
    const hero = canvas.parentElement;
    width = hero.offsetWidth;
    height = hero.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resize);
  resize();

  const BLOB_SIZE = 20;
  const isMobile = window.innerWidth <= 768;

  class Blob {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.r = BLOB_SIZE;
      this.vx = (Math.random() < 0.5 ? -1 : 1) * 0.7;
      this.vy = (Math.random() < 0.5 ? -1 : 1) * 0.7;
      this.pulse = 0;
      this.highlight = false;
      this.bright = false;
      this.patches = [];
      const patchCount = Math.floor(Math.random() * 1) + 10;
      for (let i = 0; i < patchCount; ++i) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 0.7;
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        const clusterCount = 2 + Math.floor(Math.random() * 3);
        const ellipses = [];
        for (let j = 0; j < clusterCount; ++j) {
          const rx = 0.22 + Math.random() * 0.22;
          const ry = 0.22 + Math.random() * 0.22;
          const offsetAngle = Math.random() * Math.PI * 2;
          const offsetDist = Math.random() * 0.18;
          const base_ex = x + Math.cos(offsetAngle) * offsetDist;
          const base_ey = y + Math.sin(offsetAngle) * offsetDist;
          const rotation = Math.random() * Math.PI * 2;
          const pastelColors = [
            'rgba(255, 180, 255, 0.28)',
            'rgba(253, 163, 229, 0.22)',
            'rgba(179, 255, 246, 0.25)',
            'rgba(200,220,255,0.22)',
            'rgba(180,255,180,0.23)',
            'rgba(200,160,255,0.25)',
            'rgba(255, 208, 180, 0.22)',
            'rgba(255, 255, 180, 0.18)',
            'rgba(255, 170, 101, 0.18)',
          ];
          const color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
          const base_opacity = 0.18 + Math.random() * 0.18;
          const phase = Math.random() * Math.PI * 2;
          const speed = 0.3 + Math.random() * 0.7;
          ellipses.push({ base_ex, base_ey, rx, ry, rotation, color, base_opacity, phase, speed });
        }
        this.patches.push(ellipses);
      }
    }
    draw(ctx) {
      ctx.save();
      let drawR = this.r;
      const t = performance.now() * 0.001;
      ctx.save();
      ctx.filter = 'blur(0.7px)';
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(this.x, this.y, drawR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(this.x, this.y, drawR * 0.85, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,1)';
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, drawR * 0.85, 0, Math.PI * 2);
      ctx.clip();
      if (!isMobile) {
        for (let cluster of this.patches) {
          const animatedEllipses = cluster.map(ellipse => {
            const animX = ellipse.base_ex + Math.sin(t * ellipse.speed + ellipse.phase) * 0.07;
            const animY = ellipse.base_ey + Math.cos(t * ellipse.speed + ellipse.phase) * 0.07;
            const animOpacity = ellipse.base_opacity + Math.sin(t * ellipse.speed * 0.7 + ellipse.phase) * 0.18;
            return { ...ellipse, animX, animY, animOpacity };
          });
          animatedEllipses.sort((a, b) => a.animOpacity - b.animOpacity);
          for (let ellipse of animatedEllipses) {
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(
              this.x + ellipse.animX * drawR,
              this.y + ellipse.animY * drawR,
              ellipse.rx * drawR,
              ellipse.ry * drawR,
              ellipse.rotation,
              0,
              Math.PI * 2
            );
            ctx.globalAlpha = Math.max(0, Math.min(1, ellipse.animOpacity));
            ctx.fillStyle = ellipse.color;
            ctx.fill();
            ctx.restore();
          }
          for (let ellipse of cluster) {
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(
              this.x + ellipse.base_ex * drawR,
              this.y + ellipse.base_ey * drawR,
              ellipse.rx * drawR,
              ellipse.ry * drawR,
              ellipse.rotation,
              0,
              Math.PI * 2
            );
            ctx.globalAlpha = ellipse.base_opacity;
            ctx.fillStyle = ellipse.color;
            ctx.fill();
            ctx.restore();
          }
        }
      } else {
        for (let cluster of this.patches) {
          for (let ellipse of cluster) {
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(
              this.x + ellipse.base_ex * drawR,
              this.y + ellipse.base_ey * drawR,
              ellipse.rx * drawR,
              ellipse.ry * drawR,
              ellipse.rotation,
              0,
              Math.PI * 2
            );
            ctx.globalAlpha = ellipse.base_opacity;
            ctx.fillStyle = ellipse.color;
            ctx.fill();
            ctx.restore();
          }
        }
      }
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.ellipse(this.x - drawR * 0.3, this.y - drawR * 0.3, drawR * 0.18, drawR * 0.09, -Math.PI/6, 0, 2 * Math.PI);
      ctx.fillStyle = this.highlight || this.bright ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)';
      ctx.fill();
      ctx.restore();
    }
  }
  let blobs = [];
  function spawnInitialBlobs() {
    blobs.length = 0;
    let centerX = width / 2;
    let centerY = height / 2;
    let radius = Math.min(width, height) / 8;
    for (let i = 0; i < 10; ++i) {
      let angle = (i / 10) * Math.PI * 2;
      let x = centerX + Math.cos(angle) * radius;
      let y = centerY + Math.sin(angle) * radius;
      let nb = new Blob(x, y);
      let speed = 1.2 * 1.7;
      nb.vx = Math.cos(angle) * speed;
      nb.vy = Math.sin(angle) * speed;
      nb.highlight = false;
      nb.bright = false;
      blobs.push(nb);
    }
  }
  function trySpawnInitialBlobs() {
    if (width > 0 && height > 0) {
      spawnInitialBlobs();
    } else {
      requestAnimationFrame(trySpawnInitialBlobs);
    }
  }
  trySpawnInitialBlobs();
  const logo = document.querySelector('.logo-hero img');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      for (let b of blobs) b.highlight = true;
    });
    logo.addEventListener('mouseleave', () => {
      for (let b of blobs) b.highlight = false;
    });
    logo.addEventListener('click', () => {
      blobs.length = 0;
      let centerX = width / 2;
      let centerY = height / 2;
      let r = BLOB_SIZE;
      let diamondRows = [1, 3, 5, 3, 1];
      let rowSpacing = r * 2.1;
      let colSpacing = r * 2.1;
      let startY = centerY - rowSpacing * 2;
      for (let row = 0; row < diamondRows.length; ++row) {
        let count = diamondRows[row];
        let y = startY + row * rowSpacing;
        let startX = centerX - ((count - 1) * colSpacing) / 2;
        for (let i = 0; i < count; ++i) {
          let x = startX + i * colSpacing;
          let nb = new Blob(x, y);
          let dx = x - centerX, dy = y - centerY;
          let dist = Math.max(1, Math.hypot(dx, dy));
          let speed = 1.2 * 1.7 * (dist / (rowSpacing * 2.5) + 0.5);
          nb.vx = dx / dist * speed;
          nb.vy = dy / dist * speed;
          nb.highlight = false;
          nb.bright = false;
          blobs.push(nb);
        }
      }
    });
  }
  function moveBlobs() {
    for (let b of blobs) {
      b.x += b.vx;
      b.y += b.vy;
      b.vx *= 1;
      b.vy *= 1;
      let visibleR = b.r * 0.85;
      let bounced = false;
      if (b.x - visibleR < 0) { b.x = visibleR; b.vx = Math.abs(b.vx); bounced = true; }
      if (b.x + visibleR > width) { b.x = width - visibleR; b.vx = -Math.abs(b.vx); bounced = true; }
      if (b.y - visibleR < 0) { b.y = visibleR; b.vy = Math.abs(b.vy); bounced = true; }
      if (b.y + visibleR > height) { b.y = height - visibleR; b.vy = -Math.abs(b.vy); bounced = true; }
      if (bounced) {
        let speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        let angle = Math.atan2(b.vy, b.vx) + ((Math.random() - 0.5) * 2 * 0.04);
        b.vx = Math.cos(angle) * speed;
        b.vy = Math.sin(angle) * speed;
      }
    }
    for (let i = 0; i < blobs.length; ++i) {
      for (let j = i + 1; j < blobs.length; ++j) {
        let a = blobs[i], b = blobs[j];
        let dx = b.x - a.x, dy = b.y - a.y;
        let dist = Math.hypot(dx, dy);
        let minDist = (a.r * 0.75) + (b.r * 0.75);
        if (dist < minDist && dist > 0) {
          let overlap = minDist - dist;
          let nx = dx / dist, ny = dy / dist;
          a.x -= nx * overlap / 2;
          a.y -= ny * overlap / 2;
          b.x += nx * overlap / 2;
          b.y += ny * overlap / 2;
          let dvx = b.vx - a.vx;
          let dvy = b.vy - a.vy;
          let dot = dvx * nx + dvy * ny;
          if (dot < 0) {
            let impulse = dot;
            a.vx += nx * impulse;
            a.vy += ny * impulse;
            b.vx -= nx * impulse;
            b.vy -= ny * impulse;
            let speedA = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
            let angleA = Math.atan2(a.vy, a.vx) + ((Math.random() - 0.5) * 2 * 0.03);
            a.vx = Math.cos(angleA) * speedA;
            a.vy = Math.sin(angleA) * speedA;
            let speedB = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
            let angleB = Math.atan2(b.vy, b.vx) + ((Math.random() - 0.5) * 2 * 0.03);
            b.vx = Math.cos(angleB) * speedB;
            b.vy = Math.sin(angleB) * speedB;
          }
        }
      }
    }
  }
  function animate() {
    ctx.clearRect(0, 0, width, height);
    moveBlobs();
    for (let b of blobs) b.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate();
})();

window.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  const blobsWrapper = document.getElementById('blobs-wrapper');
  const logoHero = document.querySelector('.logo-hero');
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtext = document.querySelector('.hero-subtext');
  const btnCta = document.querySelector('.btn-cta-hero') || document.querySelector('.btn-white.btn-cta');
  const typingText = document.getElementById('typing-text');
  [logoHero, heroTitle, heroSubtext, btnCta, typingText].forEach(el => { if (el) el.style.opacity = '0'; });
  blobsWrapper.style.opacity = '1';
  const logoOverlay = document.getElementById('logo-fade-overlay');
  if (logoOverlay) {
    logoOverlay.style.opacity = '0';
    logoOverlay.style.display = 'flex';
    setTimeout(() => {
      logoOverlay.style.transition = 'opacity 0.7s';
      logoOverlay.style.opacity = '1';
      setTimeout(() => {
        logoOverlay.style.opacity = '0';
        setTimeout(() => {
          logoOverlay.style.display = 'none';
          if (heroTitle) heroTitle.style.opacity = '1';
          setTimeout(() => {
            [logoHero, heroSubtext, btnCta, typingText].forEach(el => { if (el) el.style.opacity = '1'; });
          }, 400);
        }, 600);
      }, 1100);
    }, 20);
  } else {
    setTimeout(() => {
      if (heroTitle) heroTitle.style.opacity = '1';
      setTimeout(() => {
        [logoHero, heroSubtext, btnCta, typingText].forEach(el => { if (el) el.style.opacity = '1'; });
      }, 400);
    }, 700);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.parentElement;
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function(i) {
        i.classList.remove('open');
      });
      if (!isOpen) item.classList.add('open');
    });
  });
});

document.querySelectorAll('.open-cal').forEach(function(btn) {
  btn.addEventListener('click', function() {
    window.open('https://calendly.com/jamesraviporter/30min', '_blank');
  });
});

window.addEventListener('click', function(e) {
  console.log('Clicked:', e.target);
});

