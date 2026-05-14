document.addEventListener('DOMContentLoaded', () => {
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const openBtn = document.getElementById('open-invitation');
    const bgMusic = document.getElementById('bg-music');
    const body = document.body;

    // Bloquear scroll inicialmente
    body.classList.add('no-scroll');

    openBtn.addEventListener('click', () => {
        // Reproducir música
        bgMusic.play().catch(error => {
            console.log("Autoplay prevenido por el navegador. La música empezará al interactuar.");
        });

        // Desvanecer overlay
        welcomeOverlay.classList.add('fade-out');
        
        // Habilitar scroll
        body.classList.remove('no-scroll');
    });

    const firefliesContainer = document.querySelector('.fireflies');
    const fireflyCount = 30;

    for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.classList.add('firefly');
        
        // Posición inicial aleatoria
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        
        // Variaciones de movimiento aleatorias
        const moveX = (Math.random() - 0.5) * 400; // Movimiento horizontal
        const moveY = (Math.random() - 0.5) * 400; // Movimiento vertical
        
        // Duración aleatoria para que no se muevan todas igual
        const duration = 10 + Math.random() * 15;
        const delay = Math.random() * 10;

        firefly.style.left = `${startX}%`;
        firefly.style.top = `${startY}%`;
        firefly.style.setProperty('--x', `${moveX}px`);
        firefly.style.setProperty('--y', `${moveY}px`);
        firefly.style.setProperty('--duration', `${duration}s`);
        firefly.style.animationDelay = `${delay}s`;

        firefliesContainer.appendChild(firefly);
    }

    // Efecto simple de aparición al hacer scroll
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 1s ease-out';
        observer.observe(section);
    });

    // Lógica de la Cuenta Regresiva
    const countdownDate = new Date("December 5, 2026 16:40:00").getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("timer").innerHTML = "¡Es hoy!";
        }
    };

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Llamada inicial
});
