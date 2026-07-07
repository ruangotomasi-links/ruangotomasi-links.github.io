document.addEventListener('DOMContentLoaded', () => {
    // Create particles
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, i);
    }
    
    // Create floating characters
    const floatingCharsContainer = document.getElementById('floatingChars');
    const characters = ['⚙️', '🤖', '💻', '🚀', '✨', '🔧', '📊', '💡', '⚡', '🎯'];
    const charCount = 10;
    
    for (let i = 0; i < charCount; i++) {
        createFloatingChar(floatingCharsContainer, characters, i);
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
    
    // Create floating character function
    function createFloatingChar(container, chars, index) {
        const char = document.createElement('div');
        char.classList.add('floating-char');
        char.textContent = chars[index % chars.length];
        
        // Random properties
        const left = Math.random() * 85 + 5;
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 15;
        const fontSize = Math.random() * 2 + 1.5;
        const horizontalMove = Math.random() * 60 - 30;
        
        char.style.left = `${left}%`;
        char.style.animationDuration = `${duration}s`;
        char.style.animationDelay = `${delay}s`;
        char.style.fontSize = `${fontSize}rem`;
        
        // Custom animation for each character
        char.style.animationName = 'none';
        char.style.animation = `floatCharCustom-${index} ${duration}s linear infinite`;
        
        // Add dynamic keyframe
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatCharCustom-${index} {
                0% {
                    transform: translateY(100vh) translateX(0) rotate(0deg) scale(0.8);
                    opacity: 0;
                }
                5% {
                    opacity: 0.6;
                }
                95% {
                    opacity: 0.6;
                }
                100% {
                    transform: translateY(-150px) translateX(${horizontalMove}px) rotate(${Math.random() * 720}deg) scale(1.3);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        container.appendChild(char);
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
