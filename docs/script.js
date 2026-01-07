// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const sidebar = document.getElementById('sidebar');
const menuLinks = document.querySelectorAll('.menu-link');

// Function to close sidebar
function closeSidebar() {
    sidebar.classList.remove('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
}

// Function to open sidebar
function openSidebar() {
    sidebar.classList.add('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
}

// Toggle sidebar on hamburger menu click
mobileMenuToggle.addEventListener('click', () => {
    if (sidebar.classList.contains('active')) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

// Close sidebar when clicking on menu links (mobile)
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeSidebar();
    });
});

// Close sidebar when clicking outside (mobile)
document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('active') &&
        !sidebar.contains(e.target) &&
        !mobileMenuToggle.contains(e.target)) {
        closeSidebar();
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = target.offsetTop - 100;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    });
});

// Active Menu Link on Scroll
const sections = document.querySelectorAll('.section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.pageYOffset >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });

    menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Search Functionality
const searchInput = document.getElementById('searchInput');
const sectionTexts = Array.from(sections).map(section => ({
    id: section.getAttribute('id'),
    text: section.textContent.toLowerCase()
}));

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    sectionTexts.forEach(section => {
        const link = document.querySelector(`a[href="#${section.id}"]`);
        if (link) link.style.display = (section.text.includes(term) || term === '') ? 'block' : 'none';
    });
});

// Intersection Observer for Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.project-card, .certification-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active style for menu links
const style = document.createElement('style');
style.textContent = `
    .menu-link.active {
        color: var(--primary-color);
        font-weight: 600;
        padding-left: 20px;
    }
`;
document.head.appendChild(style);

console.log('Portfolio website loaded successfully!');
