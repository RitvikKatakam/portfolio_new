document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const toggleBtn = document.getElementById('toggleBtn');
    const navMenu = document.getElementById('navMenu');
    
    toggleBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                toggleBtn.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Update active link
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active-link');
                });
                this.classList.add('active-link');
            }
        });
    });
    
    // Typewriter effect
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        const text = typewriter.textContent;
        typewriter.textContent = '';
        
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                typewriter.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 100);
    }
    
    // Form submission
    const cyberForm = document.getElementById('cyberForm');
    const successOverlay = document.getElementById('successOverlay');
    
    if (cyberForm) {
        cyberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('.cyber-button');
            submitButton.innerHTML = '<span>SENDING...</span><div class="cyber-button__glow"></div><div class="cyber-button__border"></div>';
            submitButton.disabled = true;
            
            // Simulate sending delay
            setTimeout(() => {
                successOverlay.classList.add('active');
                
                // Actually submit the form after animation
                setTimeout(() => {
                    this.submit();
                }, 1500);
            }, 2000);
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section-title, .project-card, .skill-item, .experience-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Set active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active-link');
            if (link.classList.contains(current)) {
                link.classList.add('active-link');
            }
        });
    });
    
    // Infinite skills animation
    const skillsTrack = document.querySelector('.skills-track');
    const skillsGrid = document.querySelector('.skills-grid');
    
    if (skillsTrack && skillsGrid) {
        // Clone skills for seamless looping
        skillsGrid.innerHTML += skillsGrid.innerHTML;
        
        let animationFrame;
        let scrollPos = 0;
        
        const animateSkills = () => {
            scrollPos -= 0.5;
            if (scrollPos <= -skillsGrid.scrollWidth / 2) {
                scrollPos = 0;
            }
            skillsGrid.style.transform = `translateX(${scrollPos}px)`;
            animationFrame = requestAnimationFrame(animateSkills);
        };
        
        animateSkills();
        
        // Pause on hover
        skillsTrack.addEventListener('mouseenter', () => {
            cancelAnimationFrame(animationFrame);
        });
        
        skillsTrack.addEventListener('mouseleave', () => {
            animateSkills();
        });
    }
});