document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animations
    const observerOptions = {
        threshold: 0.1, // Lower threshold for mobile
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before entering
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    }

    // 2. Countdown Timer
    const weddingDate = new Date("December 12, 2026 18:30:00").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector(".countdown-container").innerHTML = "<span>¡Hoy es el gran día!</span>";
        }
    };

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // 3. Premium Gift Box interaction & Hearts
    const giftBox = document.getElementById('gift-box');
    const giftReveal = document.getElementById('gift-reveal');
    const giftHint = document.getElementById('gift-hint');
    const ibanLink = document.getElementById('iban-link');
    const ibanDisplay = document.getElementById('iban-display');

    if (giftBox) {
        giftBox.addEventListener('click', () => {
            // Animación de explosión/desaparición
            giftBox.classList.add('exploding');
            if (giftHint) giftHint.style.opacity = '0';

            // Obtener posición del centro de la caja para los corazones
            const rect = giftBox.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            createHearts(centerX, centerY);

            // Mostrar el link después de la animación de la caja
            setTimeout(() => {
                giftBox.style.display = 'none';
                if (giftHint) giftHint.style.display = 'none';
                giftReveal.style.display = 'flex';
            }, 650);
        });
    }

    if (ibanLink) {
        ibanLink.addEventListener('click', (e) => {
            e.preventDefault();
            ibanLink.style.display = 'none';
            ibanDisplay.style.display = 'block';

            // Simular escritura del IBAN
            const fullIban = "ES86 2080 5490 6730 4018 7777";
            let i = 0;
            ibanDisplay.innerText = "";
            const typeWriter = () => {
                if (i < fullIban.length) {
                    ibanDisplay.innerText += fullIban.charAt(i);
                    i++;
                    setTimeout(typeWriter, 60);
                }
            };
            typeWriter();
        });
    }

    function createHearts(originX, originY) {
        const colors = ['#FF69B4', '#FF0000', '#FFC0CB', '#FFFFFF'];
        const heartIcons = ['❤️', '💖', '💝', '💕', '🤍'];

        for (let i = 0; i < 60; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = heartIcons[Math.floor(Math.random() * heartIcons.length)];

            // Parámetros aleatorios para la explosión radial
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 350 + 150;
            const tx = Math.cos(angle) * distance + 'px';
            const ty = Math.sin(angle) * distance + 'px';
            const scale = Math.random() * 1.5 + 0.8;
            const rot = (Math.random() * 720 - 360) + 'deg';

            // Posicionamiento absoluto respecto al viewport
            heart.style.position = 'fixed';
            heart.style.left = originX + 'px';
            heart.style.top = originY + 'px';
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.setProperty('--tx', tx);
            heart.style.setProperty('--ty', ty);
            heart.style.setProperty('--scale', scale);
            heart.style.setProperty('--rot', rot);

            heart.style.animation = `floatHeartOut ${Math.random() * 1.5 + 1}s forwards cubic-bezier(0.12, 0, 0.39, 0)`;

            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 2500);
        }
    }

    // 4. RSVP Interaction
    const rsvpBtn = document.querySelector('.btn-rsvp');
    if (rsvpBtn) {
        rsvpBtn.addEventListener('click', () => {
            window.open('https://withjoy.com/marcos-caballerosanchez-and-marcos2', '_blank');
        });
    }
});

