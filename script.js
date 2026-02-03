const coin = document.getElementById('coin');
const flipBtn = document.getElementById('flipBtn');
const statusText = document.getElementById('status');

function flipCoin() {
    // 1. Disable button during animation
    flipBtn.disabled = true;
    statusText.textContent = "Flipping...";

    // 2. Determine result (Fair Randomness)
    // Math.random() returns 0 to 1. < 0.5 is Heads, >= 0.5 is Tails
    const result = Math.random() < 0.5 ? 'heads' : 'tails';

    // 3. Reset animation
    // We remove the style first to allow a re-flip if necessary
    coin.style.transition = 'none';
    coin.style.transform = 'rotateY(0deg)'; // Reset position
    
    // Force a browser reflow (flush CSS changes) so the reset happens instantly
    coin.offsetHeight; 

    // 4. Calculate Rotation
    // We want it to spin multiple times (e.g., 5 full spins = 1800deg)
    // If heads: land on multiple of 360 (e.g., 1800)
    // If tails: land on multiple of 360 + 180 (e.g., 1980)
    const spins = 5;
    const degrees = result === 'heads' ? (spins * 360) : (spins * 360) + 180;

    // 5. Apply Animation
    coin.style.transition = 'transform 3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    coin.style.transform = `rotateY(${degrees}deg)`;

    // 6. Wait for animation to finish
    setTimeout(() => {
        statusText.textContent = `It's ${result.toUpperCase()}!`;
        flipBtn.disabled = false;
        
        // Optional: Vibration feedback on mobile
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }, 3000); // Matches CSS transition time
}

flipBtn.addEventListener('click', flipCoin);

// --- PWA Service Worker Registration ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker Registered'))
            .catch(err => console.log('Service Worker Error:', err));
    });
}