
        // Create stars
        function createStars() {
            const starsContainer = document.querySelector('.stars');
            for(let i = 0; i < 200; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.animationDelay = `${Math.random() * 1}s`;
                starsContainer.appendChild(star);
            }
        }

        // Create laser beams
        function createLaser() {
            const laser = document.createElement('div');
            laser.className = 'laser';
            document.body.appendChild(laser);
            setTimeout(() => laser.remove(), 8000);
        }

        // Enhanced countdown
        function updateCountdown() {
            const newYear = new Date('January 1, 2025').getTime();
            const now = new Date().getTime();
            const difference = newYear - now;

            const timeUnits = [
                { label: 'DAYS', value: Math.floor(difference / (1000 * 60 * 60 * 24)) },
                { label: 'HOURS', value: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) },
                { label: 'MINS', value: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)) },
                { label: 'SECS', value: Math.floor((difference % (1000 * 60)) / 1000) }
            ];

            document.getElementById('countdown').innerHTML = timeUnits
                .map(unit => `
                    <div class="countdown-item">
                        <div class="countdown-value">${String(unit.value).padStart(2, '0')}</div>
                        <div class="countdown-label">${unit.label}</div>
                    </div>
                `).join('');
        }

        function celebrate() {
            createLaser();
            
            // Confetti Effect
            const duration = 3000;
            const end = Date.now() + duration;

            // Realistic confetti burst
            const colors = ['#ff006e', '#3a86ff', '#ffbe0b', '#fb5607', '#ff006e', '#8338ec'];
            
            (function frame() {
                confetti({
                    particleCount: 7,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                
                confetti({
                    particleCount: 7,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());

            // Fire multiple energy rings
            for(let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const x = window.innerWidth / 2;
                    const y = window.innerHeight / 2;
                    createEnergyRing(x, y);
                }, i * 200);
            }

            // Add random energy rings
            for(let i = 0; i < 10; i++) {
                setTimeout(() => {
                    const x = Math.random() * window.innerWidth;
                    const y = Math.random() * window.innerHeight;
                    createEnergyRing(x, y);
                }, Math.random() * 2000);
            }

            // School Pride Effect
            setTimeout(() => {
                const end = Date.now() + 1000;
                
                const colors = ['#ff006e', '#3a86ff'];
                
                (function frame() {
                    confetti({
                        particleCount: 2,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 },
                        colors: colors
                    });
                    
                    confetti({
                        particleCount: 2,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 },
                        colors: colors
                    });

                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    }
                }());
            }, duration);

            // Fire works effect
            setTimeout(() => {
                const defaults = {
                    spread: 360,
                    ticks: 50,
                    gravity: 0,
                    decay: 0.94,
                    startVelocity: 30,
                    colors: ['#ff006e', '#3a86ff', '#ffbe0b', '#fb5607', '#ff006e', '#8338ec']
                };

                function shoot() {
                    confetti({
                        ...defaults,
                        particleCount: 40,
                        scalar: 1.2,
                        shapes: ['star']
                    });

                    confetti({
                        ...defaults,
                        particleCount: 10,
                        scalar: 0.75,
                        shapes: ['circle']
                    });
                }

                setTimeout(shoot, 0);
                setTimeout(shoot, 100);
                setTimeout(shoot, 200);
            }, duration / 2);
        }

        // Matrix Rain Effect
        function createMatrixRain() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
            const matrixRain = document.querySelector('.matrix-rain');
            
            function createDrop() {
                const drop = document.createElement('div');
                drop.className = 'matrix-drop';
                drop.style.left = `${Math.random() * 100}%`;
                drop.style.animationDuration = `${Math.random() * 2 + 1}s`;
                drop.textContent = characters[Math.floor(Math.random() * characters.length)];
                matrixRain.appendChild(drop);
                
                setTimeout(() => drop.remove(), 3000);
            }

            setInterval(createDrop, 50);
        }

        // Energy Ring Effect
        function createEnergyRing(x, y) {
            const ring = document.createElement('div');
            ring.className = 'energy-ring';
            ring.style.left = x + 'px';
            ring.style.top = y + 'px';
            document.body.appendChild(ring);
            
            setTimeout(() => ring.remove(), 2000);
        }

        // Mouse move effect
        document.addEventListener('mousemove', (e) => {
            if(Math.random() > 0.9) {
                createEnergyRing(e.clientX, e.clientY);
            }
        });

        // Initialize all effects
        window.addEventListener('load', () => {
            createStars();
            createMatrixRain();
            setInterval(updateCountdown, 1000);
            updateCountdown();
            setInterval(createLaser, 10000);
        });

        const audio = new Audio('music1.mp3');
        let isPlaying = false;

        function toggleMusic() {
            const musicIcon = document.querySelector('.music-icon');
            
            if (isPlaying) {
                audio.pause();
                musicIcon.classList.remove('rotating');
                isPlaying = false;
            } else {
                audio.play()
                    .then(() => {
                        musicIcon.classList.add('rotating');
                        isPlaying = true;
                    })
                    .catch(error => {
                        console.log("Audio play failed:", error);
                    });
            }
        }

        // Handle page visibility
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && isPlaying) {
                audio.pause();
                document.querySelector('.music-icon').classList.remove('rotating');
            } else if (!document.hidden && isPlaying) {
                audio.play();
                document.querySelector('.music-icon').classList.add('rotating');
            }
        });
   