/* ======================================================
   INTERACTIVE.JS — Runtime interactivity enhancements
   3D Max Pro Platform
   ====================================================== */

(function () {
    'use strict';

    // ---- 1. Button Ripple Effect ----
    function addRipple(e) {
        const btn = e.currentTarget;
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
        btn.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    }

    function attachRipples() {
        document.querySelectorAll('.btn-primary, .send-btn, .btn-cta').forEach(btn => {
            btn.removeEventListener('click', addRipple);
            btn.addEventListener('click', addRipple);
        });
    }

    // ---- 2. Card 3D Tilt ----
    function attachTilt(card) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotY = ((x - cx) / cx) * 5;   // max ±5deg
            const rotX = -((y - cy) / cy) * 4;  // max ±4deg
            card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-5px) scale(1.01)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    }

    function attachTilts() {
        document.querySelectorAll('.card').forEach(card => {
            card.removeEventListener('mousemove', null);
            attachTilt(card);
        });
    }

    // ---- 3. Card Entrance Animation with IntersectionObserver ----
    function observeCards() {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.style.animationDelay = `${i * 0.07}s`;
                    el.classList.add('card-animate');
                    io.unobserve(el);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.card').forEach(card => {
            if (!card.classList.contains('card-animate')) {
                card.style.opacity = '0';
                io.observe(card);
            }
        });
    }

    // ---- 4. Upload Area Drag & Drop Highlight ----
    function attachUploadDrag() {
        document.querySelectorAll('.upload-area').forEach(area => {
            area.addEventListener('dragover', (e) => {
                e.preventDefault();
                area.classList.add('drag-over');
            });
            area.addEventListener('dragleave', () => area.classList.remove('drag-over'));
            area.addEventListener('drop', (e) => {
                e.preventDefault();
                area.classList.remove('drag-over');
            });
        });
    }

    // ---- 5. Page Content Transition ----
    function enhancePageTransition() {
        const content = document.getElementById('content-area');
        if (!content) return;

        // Patch the existing opacity transition in app.js by watching it
        const origStyle = Object.getOwnPropertyDescriptor(CSSStyleDeclaration.prototype, 'opacity');
        // We use MutationObserver instead for safety
        const mo = new MutationObserver(() => {
            if (content.style.opacity === '1') {
                content.classList.add('page-entered');
                content.classList.remove('page-entering');
                // Re-attach after each page change
                setTimeout(() => {
                    attachRipples();
                    attachTilts();
                    observeCards();
                    attachUploadDrag();
                    attachTooltips();
                    animateProgressBars();
                }, 50);
            } else {
                content.classList.add('page-entering');
                content.classList.remove('page-entered');
            }
        });
        mo.observe(content, { attributes: true, attributeFilter: ['style'] });
    }

    // ---- 6. Animate Progress Bars ----
    function animateProgressBars() {
        document.querySelectorAll('.progress-fill').forEach(bar => {
            const target = bar.style.width || '0%';
            bar.style.setProperty('--progress-target', target);
            bar.style.width = '0%';
            requestAnimationFrame(() => {
                bar.style.transition = 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
                bar.style.width = target;
            });
        });
    }

    // ---- 7. Tooltips for nav-items ----
    function attachTooltips() {
        const navLabels = {
            'courses': 'Mening Kurslarim',
            'homework': 'Uyga Vazifalar',
            'certificates': 'Sertifikatlar',
            'chat': 'Guruh Chat',
            'settings': 'Sozlamalar',
        };
        document.querySelectorAll('.nav-item').forEach(item => {
            const page = item.getAttribute('data-page');
            if (page && navLabels[page] && !item.hasAttribute('data-tooltip')) {
                item.setAttribute('data-tooltip', navLabels[page]);
            }
        });
    }

    // ---- 8. Scroll-Triggered Header Shadow ----
    function attachHeaderScroll() {
        const content = document.querySelector('.page-content');
        const header = document.querySelector('.top-header');
        if (!content || !header) return;
        content.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', content.scrollTop > 10);
        });
    }

    // ---- 9. Typing Indicator in Chat (fun detail) ----
    function patchChat() {
        const inputWrapper = document.querySelector('.input-wrapper input');
        if (!inputWrapper) return;
        let timer;
        inputWrapper.addEventListener('input', () => {
            clearTimeout(timer);
            // Could add a "typing..." indicator here in a real app
        });
    }

    // ---- 10. Logo Sparkle on Click ----
    function logoSparkle() {
        const logo = document.querySelector('.logo-icon, .logo-area .logo-icon');
        if (!logo) return;
        logo.addEventListener('click', () => {
            logo.style.animation = 'none';
            logo.offsetHeight; // reflow
            logo.style.animation = 'spin3d 0.8s linear, pulse-glow 0.8s ease';
            setTimeout(() => {
                logo.style.animation = 'float 4s ease-in-out infinite';
            }, 850);
        });
    }



    // ---- Init ----
    function init() {
        attachRipples();
        attachTilts();
        observeCards();
        attachUploadDrag();
        attachTooltips();
        attachHeaderScroll();
        enhancePageTransition();
        animateProgressBars();
        logoSparkle();
        patchChat();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
