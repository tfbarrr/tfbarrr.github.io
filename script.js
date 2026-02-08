// 1. Init AOS Animation (Jalankan paling awal)
AOS.init({
    duration: 800,
    once: true,
    offset: 50
});

// 2. Theme Toggle Logic (Safe Mode)
const toggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;

// Cek dulu apakah tombol ada? (Supaya tidak error di halaman Labs/Projects)
if (toggleBtn) {
    const icon = toggleBtn.querySelector('i');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    toggleBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if(theme === 'dark') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
}

// 3. Custom Cursor Logic (Independent)
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with delay (animation defined in CSS/JS)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover Effects
    document.querySelectorAll('a, button, .bento-item, .code-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(var(--accent-color), 0.1)';
            cursorOutline.style.borderColor = 'transparent';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorOutline.style.borderColor = 'var(--text-secondary)';
        });
    });
}

// 4. Update Local Time
const timeDisplay = document.getElementById('local-time');
if (timeDisplay) {
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        timeDisplay.textContent = timeString + " WIB";
    }
    setInterval(updateTime, 1000);
    updateTime();
}

// 5. Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) {
        if (window.scrollY > 50) {
            nav.style.boxShadow = "var(--shadow-sm)";
            nav.style.background = "rgba(var(--card-bg), 0.9)";
        } else {
            nav.style.boxShadow = "none";
            nav.style.background = "rgba(var(--card-bg), 0.8)";
        }
    }
});
// ... (Kode sebelumnya) ...

// 6. Mobile Navbar Logic (Hamburger)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        // Toggle class active
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Ganti icon Bars (Garis) jadi Times (Silang)
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Fitur Tambahan: Tutup menu otomatis saat link diklik
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Reset icon ke bars
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }));

    // Fitur Tambahan: Tutup menu jika klik di luar menu (opsional)
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}