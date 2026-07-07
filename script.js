document.addEventListener('DOMContentLoaded', () => {
    // Create particles
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, i);
    }
    
    // Create particle function
    function createParticle(container, index) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 80 + 15;
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 12;
        const delay = Math.random() * 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
    
    // Hero and links animation
    const hero = document.querySelector('.hero');
    const links = document.querySelectorAll('.link');

    hero.style.opacity = '0';
    hero.style.transform = 'translateY(-30px)';
    hero.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

    setTimeout(() => {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }, 150);

    links.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(30px)';
        link.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 350 + (index * 120));
    });
});
