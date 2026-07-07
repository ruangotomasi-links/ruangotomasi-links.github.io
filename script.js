document.addEventListener('DOMContentLoaded', () => {
    // Audio setup
    let audioContext;
    let soundEnabled = true;
    
    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }
    
    // Play hover sound (soft pop)
    function playHoverSound() {
        if (!soundEnabled) return;
        initAudio();
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.08);
        
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    // Play click sound (satisfying tap)
    function playClickSound() {
        if (!soundEnabled) return;
        initAudio();
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(450, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.12);
        
        gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
    }
    
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
        
        const left = Math.random() * 85 + 5;
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 15;
        const fontSize = Math.random() * 2 + 1.5;
        const horizontalMove = Math.random() * 60 - 30;
        
        char.style.left = `${left}%`;
        char.style.animationDuration = `${duration}s`;
        char.style.animationDelay = `${delay}s`;
        char.style.fontSize = `${fontSize}rem`;
        
        char.style.animation = `floatCharCustom-${index} ${duration}s linear infinite`;
        
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
    
    // Sound toggle
    const soundToggle = document.getElementById('soundToggle');
    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundToggle.classList.toggle('muted', !soundEnabled);
        playClickSound();
    });
    
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
        
        // Add hover and click sound
        link.addEventListener('mouseenter', playHoverSound);
        link.addEventListener('click', playClickSound);
        
        // Add CRAZY escape effect for coming soon buttons
        if (link.classList.contains('coming-soon')) {
            let positionX = 0;
            let positionY = 0;
            let returnTimeout;
            
            link.addEventListener('mousemove', (e) => {
                // Clear timeout if mouse comes back
                clearTimeout(returnTimeout);
                
                const buttonRect = link.getBoundingClientRect();
                const buttonCenterX = buttonRect.left + buttonRect.width / 2;
                const buttonCenterY = buttonRect.top + buttonRect.height / 2;
                
                const deltaX = e.clientX - buttonCenterX;
                const deltaY = e.clientY - buttonCenterY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                
                const maxDistance = 200;
                
                if (distance < maxDistance) {
                    // Escape with more extreme movement
                    const multiplier = 1.5;
                    const randomX = (Math.random() - 0.5) * 100;
                    const randomY = (Math.random() - 0.5) * 100;
                    
                    positionX += (-deltaX * multiplier) + randomX;
                    positionY += (-deltaY * multiplier) + randomY;
                    
                    // Limit movement range
                    const maxMove = 250;
                    positionX = Math.max(-maxMove, Math.min(maxMove, positionX));
                    positionY = Math.max(-maxMove, Math.min(maxMove, positionY));
                    
                    link.style.transform = `translate(${positionX}px, ${positionY}px) rotate(${(Math.random() - 0.5) * 10}deg)`;
                }
            });
            
            link.addEventListener('mouseleave', () => {
                // Wait 3 seconds before returning to original position
                returnTimeout = setTimeout(() => {
                    positionX = 0;
                    positionY = 0;
                    link.style.transform = 'translate(0, 0) rotate(0deg)';
                }, 3000);
            });
            
            // Prevent click
            link.addEventListener('click', (e) => {
                e.preventDefault();
                playClickSound();
            });
        }
    });
});
