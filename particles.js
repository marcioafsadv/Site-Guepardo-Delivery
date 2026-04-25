/**
 * Guepardo Delivery - Particle Background System
 * Pure Canvas API - High Performance & Lightweight
 */

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let meteors = [];

// Configuration
const PARTICLE_COUNT = 80;
const METEOR_PROBABILITY = 0.02; // Probability of a meteor appearing per frame
const COLORS = {
    primary: '#FF6200',
    secondary: '#FFA500',
    white: '#FFFFFF'
};

function init() {
    resize();
    createParticles();
    animate();
}

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = -(Math.random() * 0.8 + 0.2); // Flutua para cima
        this.opacity = Math.random() * 0.5 + 0.2;
        this.life = Math.random() * 100 + 100;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.y < -10) {
            this.y = height + 10;
            this.x = Math.random() * width;
        }
        
        if (this.x < -10 || this.x > width + 10) {
            this.x = Math.random() * width;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 98, 0, ${this.opacity})`;
        ctx.shadowBlur = 5;
        ctx.shadowColor = COLORS.primary;
        ctx.fill();
    }
}

class Meteor {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width * 1.5;
        this.y = -100;
        this.length = Math.random() * 80 + 50;
        this.speedX = -(Math.random() * 15 + 10);
        this.speedY = Math.random() * 15 + 10;
        this.opacity = 1;
        this.active = true;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y > height + 100 || this.x < -100) {
            this.active = false;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.length, this.y - this.length);
        
        const gradient = ctx.createLinearGradient(
            this.x, this.y, 
            this.x + this.length, this.y - this.length
        );
        gradient.addColorStop(0, COLORS.primary);
        gradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }
}

function createParticles() {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update & Draw Particles (Embers)
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Randomly spawn meteors
    if (Math.random() < METEOR_PROBABILITY && meteors.length < 3) {
        meteors.push(new Meteor());
    }

    // Update & Draw Meteors
    meteors = meteors.filter(m => m.active);
    meteors.forEach(m => {
        m.update();
        m.draw();
    });

    requestAnimationFrame(animate);
}

// Start the engine
init();
