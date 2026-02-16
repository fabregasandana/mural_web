// ===== GALLERY DATA =====
const galleryImages = [
    { src: 'public/assets/gallery/IMG-20250726-WA0004 (1).jpg.jpeg', title: 'Featured Mural', category: 'mural' },
    { src: 'public/assets/gallery/cover.jpg.jpeg', title: 'Wall Mural Art', category: 'mural' },
    { src: 'public/assets/gallery/Guan Yu Kuda 4.jpg.jpeg', title: 'Canvas Painting', category: 'canvas' },
    { src: 'public/assets/gallery/airnav kualanamu-06.jpg.jpeg', title: 'Custom Commission', category: 'canvas' },
    { src: 'public/assets/gallery/20250816_141355.jpg.jpeg', title: 'Studio Artwork', category: 'mural' },
    { src: 'public/assets/gallery/Beige and Gray Minimalist Painting Frame Mockup Instagram Post_20240929_151202_0000.png', title: 'Urban Mural', category: 'mural' },
    { src: 'public/assets/gallery/Gemini_Generated_Image_mp8p54mp8p54mp8p.jpg.jpeg', title: 'Artist at Work', category: 'mural' },
    { src: 'public/assets/gallery/Grey 3D Industrial Style Wall Frame Mockup Instagram Post.jpg.jpeg', title: 'Creative Space', category: 'canvas' },
    { src: 'public/assets/gallery/IMG_3375.PNG', title: 'Street Art Mural', category: 'mural' },
    { src: 'public/assets/gallery/IMG_3373.PNG', title: 'Interior Mural', category: 'mural' },
    { src: 'public/assets/gallery/IMG_3371.PNG', title: 'Abstract Canvas', category: 'canvas' },
    { src: 'public/assets/gallery/Pemuda Batak 3.jpg.jpeg', title: 'Portrait Canvas', category: 'canvas' },
    { src: 'public/assets/gallery/Salinan dari REELS MURAL MEDAN POST (1).jpg.jpeg', title: 'Exterior Mural', category: 'mural' },
    { src: 'public/assets/gallery/Salinan dari REELS MURAL MEDAN POST (3).jpg.jpeg', title: 'Gallery Display', category: 'canvas' },
    { src: 'public/assets/gallery/Salinan Salinan dari REELS MURAL MEDAN POST (21).jpg.jpeg', title: 'Mural Project', category: 'mural' },
];

// ===== TEAM DATA =====
const teamMembers = [
    {
        image: 'public/assets/team/owner-1.jpeg',
        name: 'Owner',
        role: 'Founder & Master Muralist',
        bio: 'Passionate about transforming spaces with art'
    },
    {
        image: 'public/assets/team/muralis-1.jpeg',
        name: 'Muralist',
        role: 'Senior Muralist',
        bio: 'Specializing in large-scale mural projects'
    },
];

// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const galleryGrid = document.getElementById('galleryGrid');
const teamGrid = document.getElementById('teamGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const contactForm = document.getElementById('contactForm');
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
const toast = document.getElementById('toast');

let currentImageIndex = 0;
let currentFilter = 'all';
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

// ===== CUSTOM CURSOR =====
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice && cursorDot && cursorRing) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    const animateRing = () => {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    };
    animateRing();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .gallery-item, .service-card, .team-member, .filter-btn, .social-link, input, select, textarea');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
}

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
}, { passive: true });

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const updateActiveNav = () => {
    const scrollY = window.scrollY + 150;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
};
window.addEventListener('scroll', updateActiveNav, { passive: true });

// ===== MOBILE MENU TOGGLE =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// ===== SMOOTH SCROLL & CLOSE MOBILE MENU =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('active');
            }, parseFloat(delay) * 1000);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

const observeReveals = () => {
    document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        if (!el.classList.contains('active')) {
            revealObserver.observe(el);
        }
    });
};

// ===== COUNTER ANIMATION =====
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            let current = 0;
            const increment = target / 60;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = Math.floor(current);
            }, 25);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    counterObserver.observe(el);
});

// ===== PARALLAX ON HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg-layer');
    if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}, { passive: true });

// ===== LOAD GALLERY =====
const loadGallery = (filter = 'all') => {
    galleryGrid.innerHTML = '';

    const filteredImages = filter === 'all'
        ? galleryImages
        : galleryImages.filter(img => img.category === filter);

    filteredImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item reveal-scale';
        galleryItem.dataset.delay = (index * 0.08).toFixed(2);
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}" loading="lazy">
            <div class="gallery-overlay">
                <div class="gallery-info">
                    <h4>${image.title}</h4>
                    <p>${image.category.charAt(0).toUpperCase() + image.category.slice(1)}</p>
                </div>
                <div class="view-icon">
                    <svg viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                </div>
            </div>
        `;

        galleryItem.addEventListener('click', () => {
            openLightbox(filteredImages, index);
        });

        // Add cursor hover for dynamically created items
        if (!isTouchDevice && cursorRing) {
            galleryItem.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
            galleryItem.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
        }

        galleryGrid.appendChild(galleryItem);
    });

    // Re-observe new elements
    setTimeout(observeReveals, 50);
};

// ===== GALLERY FILTERS =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        currentFilter = filter;

        // Add fade-out effect
        galleryGrid.style.opacity = '0';
        galleryGrid.style.transform = 'translateY(20px)';
        setTimeout(() => {
            loadGallery(filter);
            galleryGrid.style.opacity = '1';
            galleryGrid.style.transform = 'translateY(0)';
        }, 300);
    });
});

// Add transition to gallery grid
if (galleryGrid) {
    galleryGrid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}

// ===== LIGHTBOX FUNCTIONALITY =====
const openLightbox = (images, index) => {
    currentImageIndex = index;
    const image = images[index];
    lightboxImg.src = image.src;
    lightboxCaption.textContent = image.title;
    lightboxCounter.textContent = `${index + 1} / ${images.length}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lightbox.images = images;
};

const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
};

const showPrevImage = () => {
    const images = lightbox.images;
    if (!images) return;
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    lightboxImg.style.animation = 'none';
    lightboxImg.offsetHeight; // trigger reflow
    lightboxImg.style.animation = 'lightboxIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    lightboxImg.src = images[currentImageIndex].src;
    lightboxCaption.textContent = images[currentImageIndex].title;
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
};

const showNextImage = () => {
    const images = lightbox.images;
    if (!images) return;
    currentImageIndex = (currentImageIndex + 1) % images.length;
    lightboxImg.style.animation = 'none';
    lightboxImg.offsetHeight;
    lightboxImg.style.animation = 'lightboxIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    lightboxImg.src = images[currentImageIndex].src;
    lightboxCaption.textContent = images[currentImageIndex].title;
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
};

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

document.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') showPrevImage();
    else if (e.key === 'ArrowRight') showNextImage();
});

// ===== LOAD TEAM =====
const loadTeam = () => {
    teamGrid.innerHTML = '';

    teamMembers.forEach((member, index) => {
        const teamMember = document.createElement('div');
        teamMember.className = 'team-member reveal-up';
        teamMember.dataset.delay = (index * 0.15).toFixed(2);
        teamMember.innerHTML = `
            <div class="team-image-wrap">
                <img src="${member.image}" alt="${member.name}" loading="lazy">
                <div class="team-paint-overlay">
                    <p>"${member.bio}"</p>
                </div>
            </div>
            <h3>${member.name}</h3>
            <p class="role">${member.role}</p>
        `;

        if (!isTouchDevice && cursorRing) {
            teamMember.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
            teamMember.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
        }

        teamGrid.appendChild(teamMember);
    });

    setTimeout(observeReveals, 50);
};


// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// ===== TILT EFFECT ON SERVICE CARDS =====
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `translateY(-12px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    loadTeam();
    observeReveals();

    // Animate hero elements on load
    document.querySelectorAll('.hero .reveal-up, .hero .reveal-fade').forEach(el => {
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
            el.classList.add('active');
        }, parseFloat(delay) * 1000);
    });
});

// ===== PRELOAD CRITICAL IMAGES =====
const preloadImages = () => {
    const criticalImages = [
        'https://mgx-backend-cdn.metadl.com/generate/images/683429/2026-02-14/1b856f1c-0b7f-46dc-8c11-9c1166ac3695.png'
    ];
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

preloadImages();

console.log('MuralMedan Studio — Living Canvas Edition loaded!');