// Animation Effects Utility
// This file contains utility functions for creating various animation effects

// Create and append a canvas element for particle effects
const createCanvas = (containerId, width, height) => {
  const container = document.getElementById(containerId);
  if (!container) return null;
  
  // Remove any existing canvas
  const existingCanvas = container.querySelector('canvas');
  if (existingCanvas) {
    container.removeChild(existingCanvas);
  }
  
  const canvas = document.createElement('canvas');
  canvas.width = width || container.offsetWidth;
  canvas.height = height || container.offsetHeight;
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '1000';
  container.appendChild(canvas);
  
  return canvas;
};

// Confetti effect for achievements and rewards
export const showConfetti = (containerId, duration = 3000, particleCount = 100) => {
  const canvas = createCanvas(containerId);
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const particles = [];
  const colors = ['#00ccff', '#00ff00', '#ffcc00', '#ff00cc', '#00ffcc', '#ffff00'];
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -20,
      size: Math.random() * 8 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 3 + 1,
      angle: Math.random() * Math.PI * 2,
      rotation: Math.random() * 0.2 - 0.1,
      rotationSpeed: Math.random() * 0.01 - 0.005
    });
  }
  
  // Animation loop
  let animationFrame;
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      // Update position
      particle.x += Math.sin(particle.angle) * particle.speed;
      particle.y += Math.cos(particle.angle) * particle.speed + particle.speed;
      particle.angle += particle.rotation;
      particle.rotation += particle.rotationSpeed;
      
      // Draw particle
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.angle);
      ctx.fillStyle = particle.color;
      ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
      ctx.restore();
    });
    
    // Remove particles that are off-screen
    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].y > canvas.height) {
        particles.splice(i, 1);
      }
    }
    
    if (particles.length > 0) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      // Remove canvas when animation is complete
      const container = document.getElementById(containerId);
      if (container && canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    }
  };
  
  animate();
  
  // Stop animation after duration
  setTimeout(() => {
    cancelAnimationFrame(animationFrame);
    const container = document.getElementById(containerId);
    if (container && canvas.parentNode === container) {
      container.removeChild(canvas);
    }
  }, duration);
};

// Particle burst effect for buttons and interactions
export const createParticleBurst = (x, y, color = '#00ccff', count = 20, container = document.body) => {
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '10000';
  container.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  const particles = [];
  
  // Create particles
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + 2;
    
    particles.push({
      x,
      y,
      size: Math.random() * 6 + 2,
      color,
      speedX: Math.cos(angle) * speed,
      speedY: Math.sin(angle) * speed,
      life: 30 + Math.random() * 20
    });
  }
  
  // Animation loop
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.life--;
      
      // Draw particle
      ctx.globalAlpha = particle.life / 50;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Remove dead particles
      if (particle.life <= 0) {
        particles.splice(index, 1);
      }
    });
    
    if (particles.length > 0) {
      requestAnimationFrame(animate);
    } else {
      // Remove canvas when animation is complete
      container.removeChild(canvas);
    }
  };
  
  animate();
};

// Pulsing glow effect for elements
export const addPulsingGlow = (element, color = '#00ccff', duration = 2000) => {
  if (!element) return;
  
  // Store original box-shadow
  const originalShadow = window.getComputedStyle(element).boxShadow;
  
  // Add animation
  element.style.transition = `box-shadow ${duration/2}ms ease-in-out`;
  element.style.boxShadow = `0 0 20px ${color}`;
  
  // Toggle animation
  let isGlowing = true;
  const toggleGlow = () => {
    if (isGlowing) {
      element.style.boxShadow = originalShadow;
    } else {
      element.style.boxShadow = `0 0 20px ${color}`;
    }
    isGlowing = !isGlowing;
  };
  
  const interval = setInterval(toggleGlow, duration/2);
  
  // Return function to stop animation
  return () => {
    clearInterval(interval);
    element.style.boxShadow = originalShadow;
    element.style.transition = '';
  };
};

// Network node connection animation
export const createNetworkConnections = (containerId, nodeCount = 20) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const canvas = createCanvas(containerId);
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const nodes = [];
  
  // Create nodes
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 1,
      speedY: (Math.random() - 0.5) * 1,
      connections: []
    });
  }
  
  // Animation loop
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update nodes and draw connections
    nodes.forEach(node => {
      // Update position
      node.x += node.speedX;
      node.y += node.speedY;
      
      // Bounce off edges
      if (node.x < 0 || node.x > canvas.width) node.speedX *= -1;
      if (node.y < 0 || node.y > canvas.height) node.speedY *= -1;
      
      // Draw node
      ctx.fillStyle = '#00ccff';
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw connections
      nodes.forEach(otherNode => {
        if (node === otherNode) return;
        
        const dx = node.x - otherNode.x;
        const dy = node.y - otherNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.strokeStyle = `rgba(0, 204, 255, ${1 - distance / 100})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(otherNode.x, otherNode.y);
          ctx.stroke();
        }
      });
    });
    
    requestAnimationFrame(animate);
  };
  
  animate();
};

export default {
  showConfetti,
  createParticleBurst,
  addPulsingGlow,
  createNetworkConnections
};
