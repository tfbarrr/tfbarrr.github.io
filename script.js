// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0,0,0,0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(0,0,0,0.95)';
    }
});

// Typing Effect
function typeWriter(element, texts, speed = 100) {
    let textIndex = 0;
    let charIndex = 0;
    function type() {
        if (charIndex < texts[textIndex].length) {
            element.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                charIndex = 0;
                textIndex = (textIndex + 1) % texts.length;
                element.textContent = '';
                type();
            }, 2000);
        }
    }
    type();
}
typeWriter(document.getElementById('typewriter'), ['learning dev', 'active student', 'checkout my shits bellow']);

// AOS Animation
AOS.init({ duration: 1000, once: true });

// Skills Progress Bar
document.querySelectorAll('.skill-progress').forEach(bar => {
    const width = bar.getAttribute('data-width');
    setTimeout(() => {
        bar.style.width = width;
    }, 500);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});
