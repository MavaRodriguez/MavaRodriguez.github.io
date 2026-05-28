document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       THEME MANAGEMENT (DARK / LIGHT MODE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage or system preference for theme
    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };

    const setTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    // Initialize Theme
    const currentTheme = getPreferredTheme();
    setTheme(currentTheme);

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        const activeTheme = htmlElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    /* ==========================================================================
       MOBILE NAVIGATION MENU
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMobileMenu = () => {
        const isOpen = mainNav.classList.toggle('open');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
        
        // Prevent body scrolling when mobile menu is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });

    /* ==========================================================================
       SCROLL SPY & HEADER SHADOW
       ========================================================================== */
    const header = document.getElementById('main-header');
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
        // Add shadow to header when scrolling
        if (window.scrollY > 20) {
            header.style.boxShadow = 'var(--card-shadow)';
        } else {
            header.style.boxShadow = 'none';
        }

        // Active Navigation link detection (Scrollspy)
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run initially to set active state

    /* ==========================================================================
       SKILL BARS INTERSECTION OBSERVER ANIMATION
       ========================================================================== */
    const skillBars = document.querySelectorAll('.meter-bar-fill');
    
    // Store original widths and set to 0 initially
    const originalWidths = [];
    skillBars.forEach((bar, idx) => {
        originalWidths[idx] = bar.style.width;
        bar.style.width = '0';
    });

    const animateSkillBars = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const visibleBars = entry.target.querySelectorAll('.meter-bar-fill');
                visibleBars.forEach(bar => {
                    // Find original width in our saved array
                    const allBarsArr = Array.from(skillBars);
                    const idx = allBarsArr.indexOf(bar);
                    if (idx !== -1) {
                        bar.style.width = originalWidths[idx];
                    }
                });
                // Once animated, stop observing this category card
                observer.unobserve(entry.target);
            }
        });
    };

    const skillsCards = document.querySelectorAll('.skills-category-card');
    const observerOptions = {
        root: null, // viewport
        threshold: 0.15 // trigger when 15% of card is visible
    };

    const skillsObserver = new IntersectionObserver(animateSkillBars, observerOptions);
    
    skillsCards.forEach(card => {
        skillsObserver.observe(card);
    });

    /* ==========================================================================
       INTERACTIVE EXPERIENCE DASHBOARD TABS
       ========================================================================== */
    const tabBtns = document.querySelectorAll('.exp-tab-btn');
    const panelContents = document.querySelectorAll('.exp-panel-content');

    if (tabBtns.length > 0 && panelContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                
                // Set active tab button
                tabBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                
                // Set active panel content
                panelContents.forEach(panel => {
                    panel.classList.remove('active');
                    if (panel.getAttribute('id') === `pane-${targetTab}`) {
                        panel.classList.add('active');
                    }
                });
            });
        });
    }

    /* ==========================================================================
       CONTACT FORM SUBMISSION WITH AJAX (FORMSPREE)
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const actionUrl = contactForm.getAttribute('action');

            const data = new FormData(contactForm);
            submitBtn.disabled = true;
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Enviando...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            formStatus.className = 'form-status-message';
            formStatus.innerText = '';

            try {
                const response = await fetch(actionUrl, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showFormStatus('¡Muchas gracias! Tu mensaje ha sido enviado con éxito. Me pondré en contacto contigo pronto.', 'success');
                    contactForm.reset();
                } else {
                    const responseData = await response.json();
                    if (responseData.errors) {
                        showFormStatus(responseData.errors.map(error => error.message).join(", "), 'error');
                    } else {
                        showFormStatus('Ups... Ocurrió un problema al enviar el formulario. Por favor, inténtalo de nuevo.', 'error');
                    }
                }
            } catch (error) {
                showFormStatus('Error de red. Por favor verifica tu conexión e inténtalo de nuevo.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            }
        });
    }

    function showFormStatus(message, type) {
        formStatus.className = `form-status-message ${type}`;
        formStatus.innerText = message;
    }
});
