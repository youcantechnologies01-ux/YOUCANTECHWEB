document.addEventListener('DOMContentLoaded', () => {
    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ---- Smooth Scrolling & Active Link Update ----
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    // Add click event for smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed navbar
                const navbarHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navbar.offsetHeight - 50;
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // ---- Simple Reveal Animation ----
    const revealElements = document.querySelectorAll('.service-card, .why-us .feature-list li, .cta-box');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + scrollY;
            
            // Add slight initial hidden state
            if (!element.style.opacity && element.style.opacity !== "1") {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
            
            if (scrollY > elementTop - windowHeight + 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Listen for scroll
    window.addEventListener('scroll', revealOnScroll);

    // ---- Quote Modal Popup ----
    const quoteModal = document.getElementById('quoteModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    // Show modal after 10 seconds
    const modalTimer = setTimeout(() => {
        if(quoteModal) quoteModal.classList.add('active');
    }, 10000); // 10 seconds

    // Close modal functions
    const closeModal = () => {
        if(quoteModal) quoteModal.classList.remove('active');
    };

    if(closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === quoteModal) {
            closeModal();
        }
    });

});
