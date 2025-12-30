// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebarClose');
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

// Close sidebar when X button is clicked
sidebarClose.addEventListener('click', () => {
    closeSidebar();
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


// Smooth Scrolling for Menu Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Menu Link on Scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.menu-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Search Functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    sections.forEach(section => {
        const sectionText = section.textContent.toLowerCase();
        const sectionId = section.getAttribute('id');
        const menuLink = document.querySelector(`a[href="#${sectionId}"]`);
        
        if (menuLink) {
            if (sectionText.includes(searchTerm) || searchTerm === '') {
                menuLink.style.display = 'block';
            } else {
                menuLink.style.display = 'none';
            }
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.project-card, .certification-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add active style to menu links
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

   
    
  
           
       
