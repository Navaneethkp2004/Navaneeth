document.addEventListener('DOMContentLoaded', () => {
    // --- Floating Wave Animation ---
    const header = document.querySelector('header');
    const waveCanvas = document.createElement('canvas');
    waveCanvas.id = 'waveCanvas';
    header.appendChild(waveCanvas);

    const waveCtx = waveCanvas.getContext('2d');
    let wavePhase = 0;

    function resizeWaveCanvas() {
        waveCanvas.width = header.clientWidth;
        waveCanvas.height = 100; // Fixed height for the wave
    }

    function drawWave() {
        waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
        waveCtx.beginPath();

        const baseHeight = waveCanvas.height * 0.8; // Base of the wave
        const amplitude = 15; // Height of the wave
        const frequency = 0.02; // How spread out the waves are
        const numWaves = 4; // Number of distinct wave segments

        const waveColor = getComputedStyle(document.documentElement).getPropertyValue('--wave-color').trim();
        waveCtx.fillStyle = waveColor; // Use CSS variable for wave color

        waveCtx.moveTo(0, baseHeight + amplitude * Math.sin(wavePhase));

        for (let i = 0; i <= waveCanvas.width; i += 10) {
            const y = baseHeight + amplitude * Math.sin(i * frequency + wavePhase);
            waveCtx.lineTo(i, y);
        }

        waveCtx.lineTo(waveCanvas.width, waveCanvas.height);
        waveCtx.lineTo(0, waveCanvas.height);
        waveCtx.closePath();
        waveCtx.fill();

        wavePhase += 0.05; // Speed of the wave
        requestAnimationFrame(drawWave);
    }

    window.addEventListener('resize', resizeWaveCanvas);
    resizeWaveCanvas();
    drawWave();


    // --- Brightening Stars Animation ---
    const starCanvas = document.createElement('canvas');
    starCanvas.id = 'starCanvas';
    document.body.insertBefore(starCanvas, document.body.firstChild); // Insert at the beginning of body

    const starCtx = starCanvas.getContext('2d');
    let stars = [];
    const numStars = 100; // Number of stars

    function resizeStarCanvas() {
        starCanvas.width = window.innerWidth;
        starCanvas.height = window.innerHeight;
    }

    function createStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * starCanvas.width,
                y: Math.random() * starCanvas.height,
                radius: Math.random() * 1.5 + 0.5, // Small stars
                opacity: Math.random(),
                speed: Math.random() * 0.02 + 0.005, // Speed of brightening/dimming
                direction: Math.random() > 0.5 ? 1 : -1 // 1 for brightening, -1 for dimming
            });
        }
    }

    function animateStars() {
        starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
        const starColor = getComputedStyle(document.documentElement).getPropertyValue('--star-color').trim();

        stars.forEach(star => {
            star.opacity += star.speed * star.direction;

            if (star.opacity > 1) {
                star.opacity = 1;
                star.direction = -1; // Start dimming
            } else if (star.opacity < 0) {
                star.opacity = 0;
                star.direction = 1; // Start brightening
                // Reset position after fading out to create continuous motion
                star.x = Math.random() * starCanvas.width;
                star.y = Math.random() * starCanvas.height;
                star.radius = Math.random() * 1.5 + 0.5;
            }

            starCtx.fillStyle = `rgba(${parseInt(starColor.slice(1, 3), 16)}, ${parseInt(starColor.slice(3, 5), 16)}, ${parseInt(starColor.slice(5, 7), 16)}, ${star.opacity})`;
            starCtx.beginPath();
            starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            starCtx.fill();
        });

        requestAnimationFrame(animateStars);
    }

    window.addEventListener('resize', () => {
        resizeStarCanvas();
        createStars(); // Recreate stars on resize
    });
    resizeStarCanvas();
    createStars();
    animateStars();

    // --- Name Color Change Animation ---
    const nameElement = document.querySelector('header h1');
    const nameColors = [
        '#E74C3C', // Alizarin
        '#3498DB', // Peter River
        '#2ECC71', // Emerald
        '#F1C40F', // Sunflower
        '#9B59B6', // Amethyst
        '#1ABC9C'  // Turquoise
    ];
    let currentColorIndex = 0;

    function changeNameColor() {
        nameElement.style.color = nameColors[currentColorIndex];
        currentColorIndex = (currentColorIndex + 1) % nameColors.length;
    }

    setInterval(changeNameColor, 1500); // Change color every 1.5 seconds

    // --- Color Cycle Session (User Customization) ---
    const root = document.documentElement;

    document.getElementById('bgColor').addEventListener('input', (e) => {
        root.style.setProperty('--bg-color', e.target.value);
    });

    document.getElementById('textColor').addEventListener('input', (e) => {
        root.style.setProperty('--text-color', e.target.value);
    });

    document.getElementById('accentColor').addEventListener('input', (e) => {
        root.style.setProperty('--accent-color', e.target.value);
    });

    document.getElementById('headerFooterBgColor').addEventListener('input', (e) => {
        root.style.setProperty('--header-footer-bg-color', e.target.value);
    });

    document.getElementById('waveColor').addEventListener('input', (e) => {
        root.style.setProperty('--wave-color', e.target.value);
    });

    document.getElementById('starColor').addEventListener('input', (e) => {
        root.style.setProperty('--star-color', e.target.value);
    });

    // Initialize color pickers with current CSS variable values
    document.getElementById('bgColor').value = getComputedStyle(root).getPropertyValue('--bg-color').trim();
    document.getElementById('textColor').value = getComputedStyle(root).getPropertyValue('--text-color').trim();
    document.getElementById('accentColor').value = getComputedStyle(root).getPropertyValue('--accent-color').trim();
    document.getElementById('headerFooterBgColor').value = getComputedStyle(root).getPropertyValue('--header-footer-bg-color').trim();
    document.getElementById('waveColor').value = getComputedStyle(root).getPropertyValue('--wave-color').trim();
    document.getElementById('starColor').value = getComputedStyle(root).getPropertyValue('--star-color').trim();

});
