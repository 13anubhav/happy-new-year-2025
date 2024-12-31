
        // Create stars background
        function createStars() {
            const starsContainer = document.querySelector('.stars');
            for (let i = 0; i < 200; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.animationDelay = `${Math.random() * 2}s`;
                starsContainer.appendChild(star);
            }
        }

        // Create firework effect
        function createFirework() {
            const colors = ['#ff6b6b', '#ffd93d', '#6c5ce7', '#a8e6cf', '#ff9ff3'];
            const container = document.querySelector('.firework-container');
            
            const firework = document.createElement('div');
            firework.style.position = 'absolute';
            firework.style.left = `${Math.random() * 100}%`;
            firework.style.top = `${Math.random() * 100}%`;

            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.position = 'absolute';
                particle.style.borderRadius = '50%';
                
                const angle = (Math.PI * 2 * i) / 20;
                const velocity = 50 + Math.random() * 50;
                particle.style.transform = `rotate(${angle}rad) translate(${velocity}px)`;
                
                firework.appendChild(particle);
            }

            container.appendChild(firework);
            setTimeout(() => firework.remove(), 1500);
        }

        // Initialize
        createStars();
        setInterval(createFirework, 1000);

        // Add interactive particles on mouse move
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.9) {
                createParticle(e.clientX, e.clientY);
            }
        });

        function createParticle(x, y) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1500);
        }
 
