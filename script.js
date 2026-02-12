// ===== GALLERY DATA =====
const galleryImages = [
    { src: 'public/assets/gallery/cover.jpg.jpeg', title: 'Featured Mural', category: 'mural' },
    { src: 'public/assets/gallery/airnav kualanamu-02.jpg.jpeg', title: 'Airport Mural', category: 'mural' },
    { src: 'public/assets/gallery/Salinan dari REELS MURAL MEDAN POST (3).jpg.jpeg', title: 'Street Mural', category: 'mural' },
    { src: 'public/assets/gallery/5.jpg.jpeg', title: 'Artistic Mural', category: 'mural' },
    { src: 'public/assets/gallery/20250816_141433.jpg.jpeg', title: 'Wall Art', category: 'mural' },
    { src: 'public/assets/gallery/20250816_141408.jpg.jpeg', title: 'Mural Detail', category: 'mural' },
    { src: 'public/assets/gallery/20250816_141355.jpg.jpeg', title: 'Creative Mural', category: 'mural' },
    { src: 'public/assets/gallery/Pemuda Batak 3.jpg.jpeg', title: 'Cultural Canvas', category: 'canvas' },
    { src: 'public/assets/gallery/Guan Yu Kuda 4.jpg.jpeg', title: 'Guan Yu Canvas', category: 'canvas' },
    { src: 'public/assets/gallery/Ikan Koi 2.jpg.jpeg', title: 'Koi Fish Canvas', category: 'canvas' },
    { src: 'public/assets/gallery/Beige and Gray Minimalist Painting Frame Mockup Instagram Post_20240929_151202_0000.png', title: 'Canvas Mockup', category: 'canvas' },
    { src: 'public/assets/gallery/Grey 3D Industrial Style Wall Frame Mockup Instagram Post.jpg.jpeg', title: 'Frame Mockup', category: 'canvas' },
    { src: 'public/assets/gallery/cover (1).jpg.jpeg', title: 'Canvas Art', category: 'canvas' },
    { src: 'public/assets/gallery/Salinan dari REELS MURAL MEDAN POST (1).jpg.jpeg', title: 'Mural Project', category: 'mural' },
    { src: 'public/assets/gallery/Salinan Salinan dari REELS MURAL MEDAN POST (21).jpg.jpeg', title: 'Mural Showcase', category: 'mural' }
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
    // { 
    //     image: '/images/MuralArtist.jpg', 
    //     name: 'Artist', 
    //     role: 'Canvas & Mural Artist',
    //     bio: 'Expert in both traditional and modern techniques'
    // },
    // { 
    //     image: 'assets/gallery/Gemini_Generated_Image_mp8p54mp8p54mp8p.jpg.jpeg', 
    //     name: 'Team Member', 
    //     role: 'Mural Assistant',
    //     bio: 'Bringing fresh perspectives to every project'
    // },
    // { 
    //     image: 'assets/gallery/IMG-20250726-WA0004 (1)/images/Mural.jpg', 
    //     name: 'Artist', 
    //     role: 'Canvas Specialist',
    //     bio: 'Creating beautiful canvas artworks'
    // }
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
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const contactForm = document.getElementById('contactForm');

let currentImageIndex = 0;
let currentFilter = 'all';

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

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
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxBg = document.querySelector('.hero-background');
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    parallaxElements.forEach(element => {
        const speed = 0.1;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = () => {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealElements);

// ===== LOAD GALLERY =====
const loadGallery = (filter = 'all') => {
    galleryGrid.innerHTML = '';
    
    const filteredImages = filter === 'all' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === filter);
    
    filteredImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item reveal';
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}" loading="lazy">
            <div class="gallery-overlay">
                <div class="gallery-info">
                    <h4>${image.title}</h4>
                    <p>${image.category.charAt(0).toUpperCase() + image.category.slice(1)}</p>
                </div>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => {
            openLightbox(filteredImages, index);
        });
        
        galleryGrid.appendChild(galleryItem);
    });
    
    // Trigger reveal animation for new items
    setTimeout(revealElements, 100);
};

// ===== GALLERY FILTERS =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value and load gallery
        const filter = btn.getAttribute('data-filter');
        currentFilter = filter;
        loadGallery(filter);
    });
});

// ===== LIGHTBOX FUNCTIONALITY =====
const openLightbox = (images, index) => {
    currentImageIndex = index;
    const image = images[index];
    lightboxImg.src = image.src;
    lightboxCaption.textContent = image.title;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Store images array for navigation
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
    lightboxImg.src = images[currentImageIndex].src;
    lightboxCaption.textContent = images[currentImageIndex].title;
};

const showNextImage = () => {
    const images = lightbox.images;
    if (!images) return;
    
    currentImageIndex = (currentImageIndex + 1) % images.length;
    lightboxImg.src = images[currentImageIndex].src;
    lightboxCaption.textContent = images[currentImageIndex].title;
};

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

// Close lightbox on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        showPrevImage();
    } else if (e.key === 'ArrowRight') {
        showNextImage();
    }
});

// ===== LOAD TEAM =====
const loadTeam = () => {
    teamGrid.innerHTML = '';
    
    teamMembers.forEach(member => {
        const teamMember = document.createElement('div');
        teamMember.className = 'team-member reveal';
        teamMember.innerHTML = `
            <div class="team-image">
                <img src="${member.image}" alt="${member.name}" loading="lazy">
                <div class="team-overlay">
                    <p>${member.bio}</p>
                </div>
            </div>
            <h3>${member.name}</h3>
            <p class="role">${member.role}</p>
        `;
        
        teamGrid.appendChild(teamMember);
    });
    
    // Trigger reveal animation for team items
    setTimeout(revealElements, 100);
};

// ===== CONTACT FORM SUBMISSION =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== LAZY LOADING IMAGES =====
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    loadTeam();
    revealElements();
    lazyLoadImages();
    
    // Add reveal class to sections
    const sections = document.querySelectorAll('section > .container > *');
    sections.forEach(section => {
        if (!section.classList.contains('hero-content')) {
            section.classList.add('reveal');
        }
    });
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        revealElements();
    });
}, { passive: true });

// ===== PRELOAD CRITICAL IMAGES =====
const preloadImages = () => {
    const criticalImages = [
        'https://mgx-backend-cdn.metadl.com/generate/images/691914/2026-02-11/f60e71fe-fb57-4254-acc0-c1c2c557ecb1.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

preloadImages();

console.log('ArtMural Studio website loaded successfully!');