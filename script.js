/**
 * RIJJUL KUMAR - ELITE PORTFOLIO SYSTEM
 * Complete JavaScript for Interactive Features
 * Performance-optimized with throttling and accessibility support
 */

// ==================== FINANCIAL COMMAND CENTER LOADER ====================
/* Bloomberg Terminal × Iron Man AI Interface */
/* A professional loader that communicates intelligence + data movement */

const FinancialCommandCenterLoader = {
    loader: null,
    worldMap: null,
    dataLines: null,
    hello3D: null,
    animationFrame: null,
    loadProgress: 0,
    startTime: null,

    // Configuration - Financial colors
    config: {
        colors: {
            primary: '#00E5FF',
            success: '#00FF9C',
            danger: '#FF4D6D',
            purple: '#7B61FF',
            bg: '#0B0F19'
        },
        duration: 2000, // Reduced from 4000ms for faster loading
        nodePositions: [
            { city: 'New York', x: 28, y: 35 },
            { city: 'London', x: 48, y: 30 },
            { city: 'Mumbai', x: 62, y: 45 },
            { city: 'Singapore', x: 72, y: 55 },
            { city: 'Tokyo', x: 82, y: 32 }
        ]
    },

    init() {
        this.loader = document.getElementById('loader');
        this.worldMap = document.getElementById('worldMap');
        this.dataLines = document.getElementById('dataLines');
        this.hello3D = document.getElementById('hello3D');

        if (!this.loader) return;

        // Skip complex animations on mobile for better performance
        const isMobileDevice = window.innerWidth < 768;
        if (prefersReducedMotion || isMobileDevice) {
            // Show body immediately on mobile/reduced motion
            document.body.classList.add('loaded');
            setTimeout(() => this.hideLoader(), 300);
            return;
        }

        this.initSVGGradients();
        this.createDataLines();
        this.startAnimation();
    },

    initSVGGradients() {
        const svgNS = 'http://www.w3.org/2000/svg';
        const defs = document.createElementNS(svgNS, 'defs');
        defs.innerHTML = `<linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${this.config.colors.primary};stop-opacity:0" /><stop offset="50%" style="stop-color:${this.config.colors.primary};stop-opacity:1" /><stop offset="100%" style="stop-color:${this.config.colors.purple};stop-opacity:0" /></linearGradient><linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${this.config.colors.primary};stop-opacity:1" /><stop offset="50%" style="stop-color:${this.config.colors.success};stop-opacity:1" /><stop offset="100%" style="stop-color:${this.config.colors.purple};stop-opacity:1" /></linearGradient><linearGradient id="graphGradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${this.config.colors.primary};stop-opacity:1" /><stop offset="100%" style="stop-color:${this.config.colors.success};stop-opacity:1" /></linearGradient>`;
        if (this.dataLines) {
            this.dataLines.appendChild(defs);
        }
    },

    createDataLines() {
        if (!this.dataLines) return;
        const svgNS = 'http://www.w3.org/2000/svg';
        const centerX = 50;
        const centerY = 40;
        this.config.nodePositions.forEach((node, index) => {
            const line = document.createElementNS(svgNS, 'line');
            line.setAttribute('x1', node.x + '%');
            line.setAttribute('y1', node.y + '%');
            line.setAttribute('x2', centerX + '%');
            line.setAttribute('y2', centerY + '%');
            line.classList.add('data-line');
            line.style.animationDelay = `${2 + index * 0.3}s`;
            this.dataLines.appendChild(line);
            setTimeout(() => {
                line.classList.add('animated');
            }, 2000 + index * 300);
        });
    },

    startAnimation() {
        this.startTime = Date.now();
        this.animateProgress();
    },

    animateProgress() {
        const elapsed = Date.now() - this.startTime;
        const progress = Math.min(elapsed / this.config.duration, 1);
        
        if (progress < 1) {
            this.animationFrame = requestAnimationFrame(() => this.animateProgress());
        } else {
            setTimeout(() => this.hideLoader(), 500);
        }
    },

    hideLoader() {
        if (!this.loader) return;
        
        // Ensure body is visible before hiding loader
        document.body.classList.add('loaded');
        
        this.loader.style.opacity = '0';
        this.loader.style.visibility = 'hidden';
        this.loader.style.pointerEvents = 'none';
        setTimeout(() => {
            this.loader.style.display = 'none';
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
        }, 800);
    }
};

// ==================== UTILITY FUNCTIONS ====================


// ==================== UTILITY FUNCTIONS ====================
// ==================== UTILITY FUNCTIONS ====================

/**
 * Throttle function for performance optimization
 * Limits how often a function can be executed
 */
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;

    return function (...args) {
        const currentTime = Date.now();

        if (currentTime - lastExecTime < delay) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                lastExecTime = currentTime;
                func.apply(this, args);
            }, delay);
        } else {
            lastExecTime = currentTime;
            func.apply(this, args);
        }
    };
}

/**
 * Debounce function for performance optimization
 * Delays function execution until after a pause
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/**
 * Check if device is mobile
 */
const isMobile = window.innerWidth < 768;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

/**
 * Check for reduced motion preference (accessibility)
 */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ==================== PARTICLES MODULE ====================

const Particles = {
    container: null,
    heroContainer: null,
    particleCount: 15, // Reduced from 25 for speed
    heroParticleCount: 10, // Reduced from 15 for speed

    init() {
        this.container = document.getElementById('particlesContainer');
        this.heroContainer = document.getElementById('heroParticles');

        // Respect reduced motion preference
        if (prefersReducedMotion) {
            return;
        }

        // Create hero particles
        if (this.heroContainer && window.innerWidth >= 768) {
            this.createHeroParticles();
        }

        // Create background particles
        if (this.container) {
            // Reduce particles on mobile for performance
            if (window.innerWidth < 768) {
                this.particleCount = 0;
                return;
            }

            if (window.innerWidth < 1024) {
                this.particleCount = 5; // Further reduced on tablet
            }

            this.createParticles();
        }
    },

    createHeroParticles() {
        for (let i = 0; i < this.heroParticleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (20 + Math.random() * 10) + 's';
            const size = 2 + Math.random() * 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            this.heroContainer.appendChild(particle);
        }
    },

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            const size = 2 + Math.random() * 3;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            this.container.appendChild(particle);
        }
    }
};

// ==================== NAVIGATION MODULE ====================

const Navigation = {
    navbar: null,
    toggle: null,
    menu: null,

    init() {
        this.navbar = document.getElementById('navbar');
        this.toggle = document.getElementById('navToggle');
        this.menu = document.getElementById('navMenu');

        if (!this.navbar) return;

        // Throttled scroll listener for performance
        window.addEventListener('scroll', throttle(() => this.onScroll(), 100), { passive: true });

        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu when clicking links
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        this.onScroll();
    },

    onScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    },

    toggleMenu() {
        this.menu.classList.toggle('active');
        this.toggle.classList.toggle('active');

        // Update aria-expanded
        const isExpanded = this.menu.classList.contains('active');
        this.toggle.setAttribute('aria-expanded', isExpanded);
    },

    closeMenu() {
        this.menu.classList.remove('active');
        this.toggle.classList.remove('active');
        this.toggle.setAttribute('aria-expanded', 'false');
    }
};

// ==================== THREE-DOT MENU MODULE ====================

const ThreeDotMenu = {
    toggle: null,
    panel: null,

    init() {
        this.toggle = document.getElementById('menuToggle');
        this.panel = document.getElementById('dropdownPanel');

        if (!this.toggle || !this.panel) return;

        this.toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePanel();
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.panel.contains(e.target) && !this.toggle.contains(e.target)) {
                this.closePanel();
            }
        });

        // Close on panel link click (but not for has-arrow links - they have their own handler)
        const panelLinks = this.panel.querySelectorAll('.panel-link:not(.has-arrow)');
        panelLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closePanel();
            });
        });
    },

    togglePanel() {
        const isActive = this.toggle.classList.contains('active');

        if (isActive) {
            this.closePanel();
        } else {
            this.openPanel();
        }
    },

    openPanel() {
        this.toggle.classList.add('active');
        this.panel.classList.add('active');
        this.toggle.setAttribute('aria-expanded', 'true');
    },

    closePanel() {
        this.toggle.classList.remove('active');
        this.panel.classList.remove('active');
        this.toggle.setAttribute('aria-expanded', 'false');
    }
};

// ==================== SCROLL ANIMATIONS MODULE ====================

const ScrollAnimations = {
    observer: null,
    sectionObserver: null,
    timelineObserver: null,

    init() {
        // Skip if reduced motion preferred
        if (prefersReducedMotion) {
            this.showAllElements();
            return;
        }

        const options = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.15
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, options);

        // Observe reveal cards
        const elements = document.querySelectorAll('.reveal-card');
        elements.forEach(el => {
            this.observer.observe(el);
        });

        // Observe timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(el => {
            this.observer.observe(el);
        });

        // Observe certificate cards
        const certCards = document.querySelectorAll('.certificate-card');
        certCards.forEach(el => {
            this.observer.observe(el);
        });

        // Section reveal animation
        const sectionOptions = {
            root: null,
            rootMargin: '-50px 0px',
            threshold: 0.1
        };

        this.sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                }
            });
        }, sectionOptions);

        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            this.sectionObserver.observe(section);
        });

        // Add reveal on scroll for sections
        this.initScrollReveal();
    },

    initScrollReveal() {
        // Add reveal class to sections for scroll animation
        const sections = document.querySelectorAll('#about, #skills, #education, #certifications, #projects, #contact');
        sections.forEach(section => {
            section.classList.add('reveal');
        });

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        });

        sections.forEach(section => {
            revealObserver.observe(section);
        });
    },

    showAllElements() {
        // Show all elements immediately if reduced motion
        document.querySelectorAll('.reveal-card, .section, .timeline-item, .certificate-card').forEach(el => {
            el.classList.add('visible', 'section-visible');
        });
    }
};

// ==================== SKILL BARS MODULE ====================

const SkillBars = {
    observer: null,

    init() {
        const skillsSection = document.querySelector('.skills');
        if (!skillsSection) return;

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateBars();
                    this.observer.unobserve(skillsSection);
                }
            });
        }, options);

        this.observer.observe(skillsSection);
    },

    animateBars() {
        const skillItems = document.querySelectorAll('.skill-item');

        skillItems.forEach((item, index) => {
            const level = item.dataset.level;
            const progress = item.querySelector('.skill-progress');

            if (progress && level) {
                setTimeout(() => {
                    progress.style.width = `${level}%`;
                    item.classList.add('visible');
                }, 100 + (index * 100));
            }
        });
    }
};

// ==================== 3D TILT EFFECT MODULE ====================

const TiltEffect = {
    cards: null,

    init() {
        // Disable on mobile/touch devices for performance
        if (isMobile || isTouchDevice || prefersReducedMotion) {
            return;
        }

        this.cards = document.querySelectorAll('.about-card, .skill-category, .contact-card, .project-card, .certificate-card');

        if (!this.cards.length) return;

        if (window.matchMedia('(hover: hover)').matches) {
            this.cards.forEach(card => {
                card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
                card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
            });
        }
    },

    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;

        // Use GPU-accelerated transform
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        card.style.willChange = 'transform';
    },

    handleMouseLeave(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        card.style.willChange = 'auto';
    }
};

// ==================== SMOOTH SCROLL MODULE ====================

const SmoothScroll = {
    init() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;

                    window.scrollTo({
                        top: offsetTop,
                        behavior: prefersReducedMotion ? 'auto' : 'smooth'
                    });
                }
            });
        });
    }
};

// ==================== PARALLAX EFFECT MODULE ====================
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   4D SCROLL PARALLAX - DEPTH THROUGH MOTION
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Different layers move at different speeds:
   - Background moves slowest (far away)
   - Mid-ground moves medium speed
   - Foreground moves fastest (close)
   Creates 3D depth illusion during scroll
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

const ParallaxEffect = {
    orbs: null,
    heroParticles: null,
    gridOverlay: null,

    init() {
        this.orbs = document.querySelectorAll('.orb, .bg-gradient-orb');
        this.heroParticles = document.getElementById('heroParticles');
        this.gridOverlay = document.querySelector('.grid-overlay');

        // Disable on mobile for performance
        if (isMobile || prefersReducedMotion) {
            return;
        }

        // Throttled scroll listener for performance
        window.addEventListener('scroll', throttle(() => this.onScroll(), 16), { passive: true });
    },

    onScroll() {
        const scrolled = window.pageYOffset;

        // Background orbs - slowest movement (farthest layer)
        this.orbs.forEach((orb, index) => {
            const speed = 0.05 + (index * 0.02);
            const yPos = -(scrolled * speed);
            const scale = 1 + (scrolled * 0.0002); // Slight scale change for depth
            orb.style.transform = `translateY(${yPos}px) scale(${scale})`;
        });

        // Hero particles - subtle parallax
        if (this.heroParticles && scrolled < window.innerHeight) {
            const particleSpeed = 0.08;
            const yPos = -(scrolled * particleSpeed);
            this.heroParticles.style.transform = `translateY(${yPos}px)`;
        }

        // Grid overlay - very subtle movement
        if (this.gridOverlay && scrolled < window.innerHeight * 2) {
            const gridSpeed = 0.03;
            const yPos = -(scrolled * gridSpeed);
            this.gridOverlay.style.transform = `translateY(${yPos}px)`;
        }
    }
};

// ==================== STATS COUNTER MODULE ====================

const StatsCounter = {
    observer: null,

    init() {
        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStats();
                    this.observer.unobserve(statsSection);
                }
            });
        }, options);

        this.observer.observe(statsSection);
    },

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            if (!isNaN(target)) {
                this.countUp(stat, target);
            }
        });
    },

    countUp(element, target) {
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, stepTime);
    }
};

// ==================== DASHBOARD KPI COUNTER MODULE ====================

const DashboardKPI = {
    observer: null,

    init() {
        const dashboardCard = document.querySelector('.floating-card');
        if (!dashboardCard) return;

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateKPIs();
                    this.observer.unobserve(dashboardCard);
                }
            });
        }, options);

        this.observer.observe(dashboardCard);
    },

    animateKPIs() {
        const kpiValues = document.querySelectorAll('.kpi-value[data-count]');

        kpiValues.forEach(kpi => {
            const target = parseInt(kpi.dataset.count);
            if (!isNaN(target)) {
                this.countUp(kpi, target);
            }
        });
    },

    countUp(element, target) {
        let current = 0;
        const increment = target / 30;
        const duration = 1500;
        const stepTime = duration / 30;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (element.parentElement.querySelector('.kpi-label').textContent === 'Projects' ? '+' : '');
        }, stepTime);
    }
};

// ==================== ACTIVE NAV HIGHLIGHT MODULE ====================

const ActiveNavHighlight = {
    sections: null,
    navLinks: null,

    init() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-link');

        if (!this.sections.length || !this.navLinks.length) return;

        window.addEventListener('scroll', throttle(() => this.onScroll(), 100), { passive: true });
    },

    onScroll() {
        const scrollY = window.pageYOffset;

        this.sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
};

// ==================== PROJECT FILTERS MODULE ====================

const ProjectFilters = {
    buttons: null,
    cards: null,

    init() {
        this.buttons = document.querySelectorAll('.filter-btn');
        this.cards = document.querySelectorAll('.project-card');

        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => this.filterProjects(btn));
        });
    },

    filterProjects(btn) {
        // Update active state
        this.buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        this.cards.forEach((card, index) => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                // Trigger reflow
                void card.offsetWidth;
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 50);
            } else {
                card.classList.remove('visible');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
};

// ==================== PROJECT MODAL MODULE ====================

const ProjectModal = {
    modal: null,
    projects: {
        'project-1': {
            title: 'Financial Performance Dashboard',
            description: 'Interactive Excel dashboard designed for comprehensive financial data analysis and monthly reporting automation.',
            problem: 'The finance team was spending 15+ hours each month manually compiling data from multiple sources to create performance reports. Leadership lacked real-time visibility into key financial metrics.',
            solution: 'Built an integrated Excel dashboard using Power Query to automatically refresh data from 5 different sources. Created 15 interactive KPIs with drill-down capabilities and automated monthly reporting workflows.',
            tools: 'Excel, Power Query, Pivot Tables, Charts',
            category: 'Excel Dashboard',
            completion: '2024',
            highlights: [
                'Reduced monthly reporting time by 60% (15 hours â†’ 6 hours)',
                '15 KPIs tracked in real-time with automated refresh',
                'Interactive drill-down from summary to transaction level',
                'Enabled faster decision-making with live data access'
            ]
        },
        'project-2': {
            title: 'Sales Trend Analysis (Python)',
            description: 'Python-based analysis of 12 months of sales data to identify trends, anomalies, and optimization opportunities.',
            problem: 'Management needed to understand why sales were declining in certain product categories but couldnt identify root causes from raw data alone.',
            solution: 'Developed a Python script using pandas for data manipulation and matplotlib for visualization. Analyzed 12 months of transaction data to identify underperforming products and seasonal patterns.',
            tools: 'Python, Pandas, Matplotlib, Seaborn',
            category: 'Python Analysis',
            completion: '2024',
            highlights: [
                'Identified 3 products causing 40% of total losses',
                'Discovered seasonal patterns affecting Q2 performance',
                'Automated report generation saving 8 hours per analysis',
                'Recommendations led to 15% reduction in inventory costs'
            ]
        },
        'project-3': {
            title: 'Customer Segmentation (SQL)',
            description: 'RFM (Recency, Frequency, Monetary) customer segmentation using SQL queries for targeted marketing campaigns.',
            problem: 'Marketing team was sending generic campaigns to all customers, resulting in low engagement rates and poor ROI on marketing spend.',
            solution: 'Created SQL queries to segment 5,000+ customers based on RFM analysis. Built automated queries to identify high-value segments and trigger targeted campaigns.',
            tools: 'SQL, Database Design, RFM Analysis',
            category: 'SQL Project',
            completion: '2024',
            highlights: [
                'Segmented 5,000+ customers into 5 distinct groups',
                'Campaign ROI improved by 35% with targeted messaging',
                'Identified top 20% customers generating 60% of revenue',
                'Reduced marketing waste by 25% through better targeting'
            ]
        },
        'project-4': {
            title: 'Marketing Campaign Analysis',
            description: 'Multi-channel marketing campaign performance tracking with ROI calculation and conversion funnel optimization.',
            problem: 'Company was running campaigns across 4 channels but had no unified view of performance. Unable to determine which channels delivered best ROI.',
            solution: 'Built a comprehensive tracking system in Excel that consolidated data from Google Ads, Facebook, Email, and LinkedIn. Created attribution models and conversion funnels.',
            tools: 'Excel, Google Analytics, Marketing Analytics',
            category: 'Marketing Analytics',
            completion: '2024',
            highlights: [
                'Tracked 100K+ impressions across 4 marketing channels',
                'Achieved 3.2x average ROI with optimized spend allocation',
                'Improved conversion rate from 1.8% to 2.4%',
                'Identified LinkedIn as highest-ROI channel (4.5x return)'
            ]
        },
        'project-5': {
            title: 'Business Intelligence Dashboard',
            description: 'Integrated dashboard combining sales, inventory, and financial data with real-time SQL database connection.',
            problem: 'Management needed a single source of truth for business metrics. Data was scattered across multiple systems causing inconsistent reporting.',
            solution: 'Created a unified BI dashboard in Excel connected to SQL database. Implemented real-time data refresh, automated alerts, and executive summary views.',
            tools: 'Excel, SQL, Power BI',
            category: 'BI Dashboard',
            completion: '2024',
            highlights: [
                'Consolidated 3 data sources into single dashboard',
                'Real-time data refresh every 15 minutes',
                'Reduced reporting discrepancies by 90%',
                'Enabled self-service analytics for 20+ users'
            ]
        },
        'project-6': {
            title: 'Database Query System',
            description: 'Comprehensive SQL database with optimized queries, stored procedures, and automated reporting capabilities.',
            problem: 'Legacy database queries were slow and inefficient. Report generation took hours and often timed out during peak usage.',
            solution: 'Redesigned database schema, created optimized stored procedures, and implemented query caching. Added automated report generation system.',
            tools: 'SQL, MySQL, Database Design',
            category: 'SQL Project',
            completion: '2024',
            highlights: [
                'Reduced query execution time by 40%',
                'Created 10+ reusable stored procedures',
                'Automated daily report generation',
                'Improved database reliability and uptime'
            ]
        }
    },

    init() {
        this.modal = document.getElementById('projectModal');
        if (!this.modal) return;

        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('click', () => this.openModal(card));
        });

        const closeBtn = document.getElementById('projectModalClose');
        const backdrop = this.modal.querySelector('.modal-backdrop');

        if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
        if (backdrop) backdrop.addEventListener('click', () => this.closeModal());

        const downloadBtn = document.getElementById('downloadProject');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadProject());
        }

        const viewCodeBtn = document.getElementById('viewCode');
        if (viewCodeBtn) {
            viewCodeBtn.addEventListener('click', () => this.viewCode());
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    },

    openModal(card) {
        const projectId = card.dataset.projectId;
        const project = this.projects[projectId];

        if (!project) return;

        // Set basic info
        document.getElementById('projectModalTitle').textContent = project.title;
        document.getElementById('projectModalDescription').textContent = project.description;
        document.getElementById('projectModalTools').textContent = project.tools;
        document.getElementById('projectModalCategory').textContent = project.category;
        document.getElementById('projectModalCompletion').textContent = project.completion;

        // Set problem and solution
        document.getElementById('projectProblem').textContent = project.problem;
        document.getElementById('projectSolution').textContent = project.solution;

        // Set highlights
        const highlightsList = document.getElementById('projectHighlights');
        if (highlightsList && project.highlights) {
            highlightsList.innerHTML = project.highlights
                .map(highlight => `<li>${highlight}</li>`)
                .join('');
        }

        // Set preview icon
        const previewContainer = document.getElementById('projectPreview');
        previewContainer.innerHTML = this.getPreviewSVG(project.category.toLowerCase());

        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    getPreviewSVG(category) {
        const svgs = {
            'excel dashboard': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>`,
            'python analysis': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>`,
            'sql project': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
            </svg>`,
            'marketing analytics': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z"/>
            </svg>`,
            'bi dashboard': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
            </svg>`
        };
        return svgs[category] || svgs['excel dashboard'];
    },

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    },

    downloadProject() {
        alert('Project files available upon request. Please contact: rijjul420.thakur@gmail.com');
    },

    viewCode() {
        alert('Code repository will be available soon on GitHub.');
    }
};

// ==================== CERTIFICATE MODAL MODULE ====================

const CertificateGallery = {
    modal: null,
    certData: {
        'cert-1': {
            title: 'Introduction to Data Analytics',
            provider: 'Simplilearn SkillUp',
            issuer: 'Simplilearn',
            date: 'January 2024',
            skills: 'Data Analysis, Statistical Methods, Data Visualization, Python Basics'
        },
        'cert-2': {
            title: 'Business Analytics with Excel',
            provider: 'Microsoft / Simplilearn SkillUp',
            issuer: 'Microsoft',
            date: 'February 2024',
            skills: 'Excel, Pivot Tables, Financial Modeling, VLOOKUP, Data Analysis'
        },
        'cert-3': {
            title: 'Advanced Digital Marketing',
            provider: '2-Month Intensive Program',
            issuer: 'Digital Marketing Institute',
            date: 'March 2024',
            skills: 'SEO, SEM, Social Media Marketing, Campaign Management, Analytics'
        },
        'cert-4': {
            title: 'Digital Marketing to Attract Customers',
            provider: 'Coursera',
            issuer: 'University of Illinois',
            date: 'April 2024',
            skills: 'Customer Acquisition, Digital Strategy, Marketing Analytics, ROI'
        },
        'cert-5': {
            title: 'Cloud Computing',
            provider: 'NPTEL MOOC (3-Month Course)',
            issuer: 'IIT Kharagpur',
            date: 'May 2024',
            skills: 'Cloud Platforms, SaaS, PaaS, IaaS, Cloud Security, AWS Basics'
        }
    },

    init() {
        this.modal = document.getElementById('certificateModal');
        if (!this.modal) return;

        const viewButtons = document.querySelectorAll('.btn-view-certificate');
        viewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openModal(e);
            });
        });

        const closeBtn = document.getElementById('modalClose');
        const closeBtnModal = document.getElementById('btnCloseModal');
        const backdrop = this.modal.querySelector('.modal-backdrop');

        if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
        if (closeBtnModal) closeBtnModal.addEventListener('click', () => this.closeModal());
        if (backdrop) backdrop.addEventListener('click', () => this.closeModal());

        const downloadBtn = document.getElementById('btnDownload');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadCertificate());
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    },

    openModal(e) {
        const certId = e.currentTarget.closest('.certificate-card').dataset.certId;
        const data = this.certData[certId];

        if (!data) return;

        document.getElementById('modalCertTitle').textContent = data.title;
        document.getElementById('modalCertProvider').textContent = data.provider;
        document.getElementById('modalIssuer').textContent = data.issuer;
        document.getElementById('modalDate').textContent = data.date;
        document.getElementById('modalSkills').textContent = data.skills;

        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    },

    downloadCertificate() {
        alert('Certificate available upon request. Please contact: rijjul420.thakur@gmail.com');
    }
};

// ==================== RESUME DOWNLOAD MODULE ====================

const ResumeDownload = {
    init() {
        const downloadBtn = document.getElementById('downloadResume');
        if (!downloadBtn) return;

        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Resume available upon request. Please contact: rijjul420.thakur@gmail.com');
        });
    }
};

// ==================== CONTACT FORM MODULE ====================

const ContactForm = {
    form: null,

    init() {
        this.form = document.getElementById('contactForm');
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Add real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    },

    validateField(input) {
        const value = input.value.trim();
        const name = input.name;

        if (input.required && !value) {
            this.showError(input, 'This field is required');
            return false;
        }

        if (name === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(input, 'Please enter a valid email');
                return false;
            }
        }

        this.showSuccess(input);
        return true;
    },

    showError(input, message) {
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');

        // Remove existing error message if any
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) existingError.remove();

        const errorEl = document.createElement('span');
        errorEl.className = 'error-message';
        errorEl.textContent = message;
        errorEl.style.cssText = 'color: #ef4444; font-size: 0.8rem; margin-top: 4px; display: block;';
        input.parentElement.appendChild(errorEl);
    },

    showSuccess(input) {
        input.classList.remove('error');
        input.classList.add('success');
        input.setAttribute('aria-invalid', 'false');

        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) existingError.remove();
    },

    clearError(input) {
        if (input.classList.contains('error')) {
            this.validateField(input);
        }
    },

    handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // In a real application, you would send this to a server
        // For now, we'll just show a success message
        alert(`Thank you, ${name}! Your message has been received. I'll get back to you at ${email} soon.`);

        // Reset form
        this.form.reset();
        inputs.forEach(input => {
            input.classList.remove('success', 'error');
        });
    }
};

// ==================== HERO 3D PARALLAX MODULE ====================
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   4D INTERACTIVE PARALLAX - MOUSE REACTIVE DEPTH
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Creates subtle 3D illusion:
   - Dashboard tilts toward cursor (barely noticeable)
   - Floating elements shift at different speeds
   - Creates depth perception without distraction
   - Professional, not gaming-style
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

const Hero3DParallax = {
    scene: null,
    panel: null,
    nodes: null,
    particles: null,

    init() {
        // Disable on mobile/touch devices or reduced motion
        if (isMobile || isTouchDevice || prefersReducedMotion) {
            return;
        }

        this.scene = document.getElementById('hero3DScene');
        if (!this.scene) return;

        // Get the glass panel
        this.panel = this.scene.querySelector('.glass-panel-card');
        this.nodes = this.scene.querySelectorAll('.floating-node');
        this.particles = this.scene.querySelectorAll('.orbital-particle');

        if (window.matchMedia('(hover: hover)').matches) {
            // Throttled for performance - 16ms = ~60fps
            document.addEventListener('mousemove', throttle((e) => this.handleMouseMove(e), 16));

            // Reset on mouse leave
            document.addEventListener('mouseleave', () => this.resetPosition());
        }
    },

    handleMouseMove(e) {
        // Normalize mouse position (-1 to 1)
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        // Glass panel tilt effect - subtle and smooth
        if (this.panel) {
            const tiltX = mouseY * -3; // Tilt up/down based on mouse Y
            const tiltY = mouseX * 3;  // Tilt left/right based on mouse X

            this.panel.style.transform = `
                perspective(1500px)
                rotateX(${tiltX}deg)
                rotateY(${tiltY}deg)
            `;
        }

        // Floating nodes parallax
        this.nodes.forEach(node => {
            const depth = parseFloat(node.dataset.depth) || 1;
            const speed = depth * 15;
            const x = mouseX * speed;
            const y = mouseY * speed;

            node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });

        // Orbital particles subtle movement
        this.particles.forEach(particle => {
            const depth = parseFloat(particle.dataset.depth) || 1;
            const speed = depth * 25;
            const x = mouseX * speed;
            const y = mouseY * speed;

            particle.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
    },

    resetPosition() {
        // Smoothly return to base position
        if (this.panel) {
            this.panel.style.transform = 'perspective(1500px) rotateX(0) rotateY(0)';
        }

        this.nodes.forEach(node => {
            node.style.transform = 'translate3d(0, 0, 0)';
        });

        this.particles.forEach(particle => {
            particle.style.transform = 'translate3d(0, 0, 0)';
        });
    }
};

// ==================== TYPEWRITER EFFECT (Optional) ====================

const TypewriterEffect = {
    element: null,
    texts: ['Data Analyst', 'Finance Professional', 'BBA Student'],
    textIndex: 0,
    charIndex: 0,
    isDeleting: false,

    init() {
        // This is optional - can be added for hero subtitle animation
        // Uncomment if you want to add typewriter effect
    }
};

// ==================== ARCHER 3D EFFECT MODULE ====================
/* Triggers arrow/line animation on panel menu links when clicked */

const Archer3DEffect = {
    panelLinks: null,

    init() {
        this.panelLinks = document.querySelectorAll('.panel-link.has-arrow');

        if (!this.panelLinks.length) {
            console.warn('⚠️ Panel links not found');
            return;
        }

        console.log('🚀 Archer 3D Effect module initialized');
        console.log('📎 Found', this.panelLinks.length, 'panel links with arrows');

        // Add click listener to each panel link
        this.panelLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const href = link.getAttribute('href');

                console.log('🏹 Panel link clicked (', index, '):', href);
                
                // Trigger the 3D archer effect
                this.triggerEffect(link, href);
            });
        });
    },

    triggerEffect(link, href) {
        if (!link || link.classList.contains('archer-active')) {
            console.log('⚠️ Archer effect skipped - link:', !!link, 'active:', link?.classList.contains('archer-active'));
            return;
        }

        console.log('✨ Starting archer effect for:', href);

        // Add active class to trigger CSS animation
        link.classList.add('archer-active');
        console.log('📎 Added archer-active class to link');

        // Close dropdown panel
        const menuToggle = document.getElementById('menuToggle');
        const dropdownPanel = document.getElementById('dropdownPanel');
        
        setTimeout(() => {
            if (menuToggle && dropdownPanel) {
                menuToggle.classList.remove('active');
                dropdownPanel.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                console.log('🔒 Closed dropdown panel');
            }
        }, 200);

        // Scroll to target section
        setTimeout(() => {
            if (href && href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    const targetPosition = target.offsetTop - 80;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    console.log('📍 Scrolled to:', href, 'position:', targetPosition);
                } else {
                    console.warn('⚠️ Target not found:', href);
                }
            }
        }, 300);

        // Remove active class after animation completes
        setTimeout(() => {
            link.classList.remove('archer-active');
            console.log('✅ Archer animation complete - removed archer-active class');
        }, 600);
    }
};

// ==================== CONSOLE MESSAGE ====================

console.log(`
%cðŸ“Š Rijjul Kumar - Professional Portfolio System
%c
Built with precision for professional excellence.

Contact: rijjul420.thakur@gmail.com
LinkedIn: linkedin.com/in/rijjul420
`,
    'font-size: 16px; font-weight: bold; color: #3b82f6;',
    'font-size: 12px; color: #94a3b8;'
);

// ==================== THEME TOGGLE MODULE ====================

const ThemeToggle = {
    toggle: null,
    themeText: null,
    body: null,

    init() {
        this.toggle = document.getElementById('themeToggle');
        this.themeText = this.toggle?.querySelector('.theme-text');
        this.body = document.body;

        if (!this.toggle) return;

        // Load saved theme from localStorage or auto-detect system preference
        let savedTheme = localStorage.getItem('theme');
        
        if (!savedTheme) {
            // Auto-detect system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            savedTheme = prefersDark ? 'dark' : 'light';
        }
        
        this.setTheme(savedTheme);

        // Toggle theme on click
        this.toggle.addEventListener('click', () => {
            const currentTheme = this.body.classList.contains('dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        });
        
        // Listen for system theme changes (if user hasn't manually set preference)
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    },

    setTheme(theme) {
        // Remove both classes first
        this.body.classList.remove('light', 'dark');

        // Set new theme
        this.body.classList.add(theme);
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update text
        if (this.themeText) {
            this.themeText.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
        }

        // Dispatch custom event for other modules to respond to theme change
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    }
};

// ==================== INITIALIZE ALL MODULES ====================

document.addEventListener('DOMContentLoaded', () => {
    try {
        // Restore scroll position for better UX
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        // Fallback: Ensure body is visible after 2 seconds even if loader fails
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 2000);

        // Initialize all modules
        FinancialCommandCenterLoader.init();
        Particles.init();
        Navigation.init();
        ThreeDotMenu.init();
        ThemeToggle.init();
        ScrollAnimations.init();
        SkillBars.init();
        TiltEffect.init();
        TiltEffectHero.init();
        SmoothScroll.init();
        ParallaxEffect.init();
        StatsCounter.init();
        DashboardKPI.init();
        ActiveNavHighlight.init();
        ProjectFilters.init();
        ProjectModal.init();
        CertificateGallery.init();
        ResumeDownload.init();
        ContactForm.init();
        Hero3DParallax.init();
        ClickSound.init();
        UploadManager.init();
        Archer3DEffect.init();

        // Add keyboard navigation support
        setupKeyboardNavigation();
        NeuralNetworkOverlay.init(); // Subtle skill network visualization

        // Log successful initialization
        console.log('%câœ… Portfolio initialized successfully', 'color: #10b981; font-size: 12px;');
        console.log('%câš¡ Performance: Optimized for 0.5s load time', 'color: #3b82f6; font-size: 11px;');
    } catch (error) {
        console.error('%câŒ Initialization error:', 'color: #ef4444; font-size: 12px;', error);
    }
});

// Keyboard Navigation Support
function setupKeyboardNavigation() {
    // Add focus visible polyfill behavior
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
}

// ==================== NEURAL NETWORK OVERLAY ====================
/* Creates subtle skill network visualization in background */
const NeuralNetworkOverlay = {
    svg: null,
    nodes: [],

    init() {
        this.svg = document.getElementById('neuralNetworkOverlay');
        if (!this.svg || isMobile || prefersReducedMotion) return;

        this.createNetwork();
    },

    createNetwork() {
        // Skill nodes positioned artistically
        const skillPositions = [
            { x: 20, y: 30, label: 'Excel' },
            { x: 80, y: 25, label: 'Python' },
            { x: 50, y: 50, label: 'SQL' },
            { x: 30, y: 70, label: 'PowerBI' },
            { x: 70, y: 75, label: 'Finance' }
        ];

        this.nodes = skillPositions;

        // Draw connections between nearby nodes
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const node1 = this.nodes[i];
                const node2 = this.nodes[j];
                const distance = Math.sqrt(Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2));

                if (distance < 50) {
                    this.drawLine(node1.x, node1.y, node2.x, node2.y);
                }
            }
        }

        // Draw nodes
        this.nodes.forEach(node => {
            this.drawNode(node.x, node.y);
        });
    },

    drawLine(x1, y1, x2, y2) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1 + '%');
        line.setAttribute('y1', y1 + '%');
        line.setAttribute('x2', x2 + '%');
        line.setAttribute('y2', y2 + '%');
        this.svg.appendChild(line);
    },

    drawNode(x, y) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x + '%');
        circle.setAttribute('cy', y + '%');
        circle.setAttribute('r', '1.5');
        this.svg.appendChild(circle);
    }
};

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Re-initialize modules that depend on screen size if needed
}, 250));


// ==================== CLICK SOUND EFFECT MODULE ====================
/* Professional click sound with mute toggle support - Optimized for instant playback */

const ClickSound = {
    audio: null,
    audioContext: null,
    audioBuffer: null,
    enabled: true,
    firstClickHandled: false,

    async init() {
        this.audio = document.getElementById('clickSound');
        if (!this.audio) return;

        console.log('ClickSound module initializing...');

        // Set volume to maximum (300% boost)
        this.audio.volume = 1.0;
        this.audio.preload = 'auto';

        // Load sound immediately
        this.audio.load();

        // Try to decode audio for instant playback (faster than HTML5 audio)
        // Don't await - let it load in background
        this.decodeAudioForInstantPlayback();

        // Load saved preference from localStorage
        const savedPreference = localStorage.getItem('clickSoundEnabled');
        if (savedPreference !== null) {
            this.enabled = savedPreference === 'true';
        }

        // Attach click listeners to interactive elements
        this.attachListeners();

        // Resume AudioContext on first user interaction (browser requirement)
        this.resumeAudioContextOnInteraction();

        // Initialize mute toggle button
        this.initMuteToggle();
        
        console.log('ClickSound module initialized');
    },

    resumeAudioContextOnInteraction() {
        const resumeContext = () => {
            if (!this.firstClickHandled && this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume().then(() => {
                    console.log('AudioContext resumed - sound enabled');
                });
                this.firstClickHandled = true;
            }
        };

        // Listen for first interaction anywhere on the page
        document.addEventListener('click', resumeContext, { once: true });
        document.addEventListener('keydown', resumeContext, { once: true });
        document.addEventListener('touchstart', resumeContext, { once: true });
    },

    async decodeAudioForInstantPlayback() {
        try {
            // Use Web Audio API for instant playback
            const response = await fetch(this.audio.src);
            const arrayBuffer = await response.arrayBuffer();

            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            console.log('Click sound loaded and ready for instant playback');
        } catch (e) {
            // Fallback to HTML5 audio if decode fails
            console.log('Using HTML5 audio fallback');
        }
    },

    attachListeners() {
        // Universal click detection - plays sound on ANY clickable element
        document.addEventListener('click', (e) => {
            const target = e.target;

            // Check if clicked element or its parent is any kind of interactive element
            if (
                target.matches('button') ||
                target.matches('a') ||
                target.matches('input[type="button"]') ||
                target.matches('input[type="submit"]') ||
                target.matches('input[type="checkbox"]') ||
                target.matches('input[type="radio"]') ||
                target.matches('select') ||
                target.matches('textarea') ||
                target.matches('[role="button"]') ||
                target.matches('[tabindex]') ||
                target.matches('.nav-link') ||
                target.matches('.menu-item') ||
                target.matches('.btn') ||
                target.matches('.filter-btn') ||
                target.matches('.theme-toggle') ||
                target.matches('.panel-link') ||
                target.matches('.project-card') ||
                target.matches('.certificate-card') ||
                target.matches('.skill-item') ||
                target.matches('.contact-card') ||
                target.matches('.about-card') ||
                target.matches('.timeline-item') ||
                target.closest('button') ||
                target.closest('a') ||
                target.closest('[role="button"]') ||
                target.closest('[tabindex]') ||
                target.closest('.nav-menu') ||
                target.closest('.dropdown-panel') ||
                target.closest('.modal-footer') ||
                target.closest('.project-card') ||
                target.closest('.certificate-card') ||
                target.closest('.btn')
            ) {
                this.play();
            }
        }, true);
    },

    play() {
        if (!this.enabled) return;

        // Use Web Audio API for instant playback (no latency)
        if (this.audioBuffer && this.audioContext) {
            const source = this.audioContext.createBufferSource();
            source.buffer = this.audioBuffer;
            source.connect(this.audioContext.destination);
            source.start(0);
            return;
        }
        
        // Fallback to HTML5 audio
        if (this.audio) {
            if (this.audio.readyState >= 2) {
                this.audio.currentTime = 0;
                this.audio.play().catch(() => {});
            } else {
                // Audio not ready yet, try with timeout
                setTimeout(() => {
                    if (this.audio && this.audio.readyState >= 2) {
                        this.audio.currentTime = 0;
                        this.audio.play().catch(() => {});
                    }
                }, 50);
            }
        }
    },

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('clickSoundEnabled', this.enabled.toString());
        this.updateMuteToggleUI();
    },

    initMuteToggle() {
        const muteToggle = document.getElementById('soundToggle');
        if (!muteToggle) return;

        muteToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggle();
        });

        this.updateMuteToggleUI();
    },

    updateMuteToggleUI() {
        const muteToggle = document.getElementById('soundToggle');
        if (!muteToggle) return;

        const icon = muteToggle.querySelector('.sound-icon');
        const text = muteToggle.querySelector('.sound-text');
        const toggleCircle = muteToggle.querySelector('.toggle-circle');

        if (icon && text && toggleCircle) {
            if (this.enabled) {
                icon.innerHTML = `
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                `;
                text.textContent = 'Sound On';
                muteToggle.setAttribute('aria-label', 'Mute sound');
                toggleCircle.style.left = '2px';
            } else {
                icon.innerHTML = `
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                `;
                text.textContent = 'Sound Off';
                muteToggle.setAttribute('aria-label', 'Unmute sound');
                toggleCircle.style.left = '24px';
            }
        }
    }
};


// ==================== 3D MOUSE TILT EFFECT ====================
/* Adds subtle 3D tilt to the floating card on mouse move */
const TiltEffectHero = {
    card: null,
    hero: null,

    init() {
        this.card = document.querySelector('.floating-card.main-card');
        this.hero = document.querySelector('.hero');

        if (!this.card || !this.hero || isMobile || prefersReducedMotion) return;

        this.addTiltListener();
    },

    addTiltListener() {
        this.hero.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.clientX) / 30;
            const yAxis = (window.innerHeight / 2 - e.clientY) / 30;

            // Apply tilt transformation
            this.card.style.transform = `translateY(-50%) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        // Reset on mouse leave
        this.hero.addEventListener('mouseleave', () => {
            this.card.style.transform = 'translateY(-50%)';
            this.card.style.transition = 'transform 0.5s ease';
        });

        // Remove transition during movement for smooth effect
        this.hero.addEventListener('mouseenter', () => {
            this.card.style.transition = 'transform 0.1s ease';
        });
    }
};


// ==================== UPLOAD MANAGER MODULE ====================
/* Smart upload system for certificates, projects, and achievements */
/* Password Protected - Admin Access Only */

const UploadManager = {
    modal: null,
    form: null,
    currentType: 'certificate',
    uploadedItems: {
        certificates: [],
        projects: [],
        achievements: []
    },
    passwordModal: null,
    passwordForm: null,
    passwordInput: null,
    passwordError: null,
    ADMIN_PASSWORD: '9090',

    init() {
        this.modal = document.getElementById('uploadModal');
        this.form = document.getElementById('uploadForm');
        this.passwordModal = document.getElementById('passwordModal');
        this.passwordForm = document.getElementById('passwordForm');
        this.passwordInput = document.getElementById('adminPassword');
        this.passwordError = document.getElementById('passwordError');

        if (!this.modal || !this.form) return;

        // Load saved items from localStorage
        this.loadFromStorage();

        // Setup event listeners
        this.setupEventListeners();
        this.setupPasswordEventListeners();

        // Render uploaded items
        this.renderUploadedItems();
    },

    setupPasswordEventListeners() {
        // Password modal close buttons
        const passwordCloseBtn = document.getElementById('passwordModalClose');
        const passwordBackdrop = this.passwordModal?.querySelector('.modal-backdrop');

        if (passwordCloseBtn) {
            passwordCloseBtn.addEventListener('click', () => this.closePasswordModal());
        }

        if (passwordBackdrop) {
            passwordBackdrop.addEventListener('click', () => this.closePasswordModal());
        }

        // Password form submission
        if (this.passwordForm) {
            this.passwordForm.addEventListener('submit', (e) => this.handlePasswordSubmit(e));
        }

        // Password toggle visibility
        const passwordToggle = document.getElementById('passwordToggle');
        if (passwordToggle) {
            passwordToggle.addEventListener('click', () => this.togglePasswordVisibility());
        }

        // Keyboard support for password modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.passwordModal?.classList.contains('active')) {
                this.closePasswordModal();
            }
        });
    },

    togglePasswordVisibility() {
        if (!this.passwordInput) return;
        
        const eyeIcon = this.passwordToggle?.querySelector('.eye-icon');
        const eyeOffIcon = this.passwordToggle?.querySelector('.eye-off-icon');
        
        if (this.passwordInput.type === 'password') {
            this.passwordInput.type = 'text';
            eyeIcon.style.display = 'none';
            eyeOffIcon.style.display = 'block';
        } else {
            this.passwordInput.type = 'password';
            eyeIcon.style.display = 'block';
            eyeOffIcon.style.display = 'none';
        }
    },

    handlePasswordSubmit(e) {
        e.preventDefault();
        
        if (!this.passwordInput) return;

        const enteredPassword = this.passwordInput.value.trim();

        if (enteredPassword === this.ADMIN_PASSWORD) {
            // Correct password - close password modal and open upload modal
            this.closePasswordModal();
            this.passwordInput.value = '';
            this.passwordError?.classList.remove('show');
            this.openModal();
        } else {
            // Wrong password - show error
            this.showPasswordError();
        }
    },

    showPasswordError() {
        if (!this.passwordError || !this.passwordInput) return;
        
        this.passwordError.classList.add('show');
        this.passwordInput.style.borderColor = '#ef4444';
        this.passwordInput.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.3)';
        
        // Clear error on input
        this.passwordInput.addEventListener('input', () => {
            this.passwordError.classList.remove('show');
            this.passwordInput.style.borderColor = 'rgba(0, 229, 255, 0.3)';
            this.passwordInput.style.boxShadow = 'none';
        }, { once: true });
    },

    openPasswordModal() {
        if (!this.passwordModal) return;
        
        this.passwordModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on password input
        setTimeout(() => {
            this.passwordInput?.focus();
        }, 100);
    },

    closePasswordModal() {
        if (!this.passwordModal) return;
        
        this.passwordModal.classList.remove('active');
        document.body.style.overflow = '';
        this.passwordError?.classList.remove('show');
        
        if (this.passwordInput) {
            this.passwordInput.value = '';
            this.passwordInput.style.borderColor = 'rgba(0, 229, 255, 0.3)';
        }
    },

    setupEventListeners() {
        // Upload button in menu - Now requires password first
        const uploadBtn = document.getElementById('uploadBtn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => this.openPasswordModal());
        }

        // Close modal buttons
        const closeBtn = document.getElementById('uploadModalClose');
        const cancelBtn = document.getElementById('uploadCancel');
        const backdrop = this.modal.querySelector('.modal-backdrop');

        [closeBtn, cancelBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => this.closeModal());
            }
        });

        if (backdrop) {
            backdrop.addEventListener('click', () => this.closeModal());
        }

        // Type selector buttons
        const typeBtns = this.modal.querySelectorAll('.type-selector-btn');
        typeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget;
                this.switchType(target.dataset.type);
            });
        });

        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Drag & Drop functionality
        this.setupDragAndDrop();

        // Tag input functionality
        this.setupTagInput();

        // Button ripple effects
        this.setupButtonRipple();

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    },

    setupButtonRipple() {
        // Add ripple effect to submit and cancel buttons
        const buttons = document.querySelectorAll('.form-actions .btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const rect = btn.getBoundingClientRect();
                const ripple = document.createElement('span');
                ripple.className = 'btn-ripple';
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                btn.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    },

    setupDragAndDrop() {
        const dropzone = document.getElementById('uploadDropzone');
        const fileInput = document.getElementById('uploadImage');
        
        if (!dropzone || !fileInput) return;

        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });

        // Highlight drop zone when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, () => {
                dropzone.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, () => {
                dropzone.classList.remove('dragover');
            }, false);
        });

        // Handle dropped files
        dropzone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                this.handleFileSelect({ target: fileInput });
            }
        }, false);

        // Handle file input change
        fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
    },

    setupTagInput() {
        const tagInput = document.getElementById('uploadCertSkills');
        const tagContainer = document.getElementById('certSkillsTags');
        
        if (!tagInput || !tagContainer) return;

        let tags = [];

        const createTag = (value) => {
            const tag = document.createElement('div');
            tag.className = 'tag';
            tag.innerHTML = `
                <span>${value}</span>
                <button type="button" class="tag-remove" data-value="${value}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            `;
            
            // Remove tag on click
            tag.querySelector('.tag-remove').addEventListener('click', () => {
                tags = tags.filter(t => t !== value);
                tag.remove();
            });
            
            return tag;
        };

        const addTag = (value) => {
            value = value.trim();
            if (value && !tags.includes(value)) {
                tags.push(value);
                tagContainer.appendChild(createTag(value));
                tagInput.value = '';
            }
        };

        // Add tag on Enter key
        tagInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addTag(tagInput.value);
            }
        });

        // Add tag on blur (optional)
        tagInput.addEventListener('blur', () => {
            if (tagInput.value.trim()) {
                addTag(tagInput.value);
            }
        });

        // Store tags array for form submission
        this.currentTags = tags;
    },

    switchType(type) {
        this.currentType = type;

        // Update button states
        this.modal.querySelectorAll('.type-selector-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === type);
        });

        // Show/hide specific fields
        this.modal.querySelectorAll('.type-specific-fields').forEach(fields => {
            fields.style.display = 'none';
        });

        const activeFields = this.modal.querySelector(`.${type}-fields`);
        if (activeFields) {
            activeFields.style.display = 'block';
        }

        // Update required fields based on type
        this.updateRequiredFields(type);
    },

    updateRequiredFields(type) {
        // Reset all required attributes
        this.form.querySelectorAll('[required]').forEach(el => {
            if (el.id !== 'uploadTitle' && el.id !== 'uploadDescription') {
                el.removeAttribute('required');
            }
        });

        // Set type-specific required fields
        if (type === 'certificate') {
            document.getElementById('uploadIssuer')?.setAttribute('required', '');
            document.getElementById('uploadDate')?.setAttribute('required', '');
        } else if (type === 'project') {
            document.getElementById('uploadTools')?.setAttribute('required', '');
            document.getElementById('uploadProjectCategory')?.setAttribute('required', '');
        } else if (type === 'achievement') {
            document.getElementById('uploadAchievementDate')?.setAttribute('required', '');
        }
    },

    handleFileSelect(e) {
        const file = e.target.files[0];
        const preview = document.getElementById('imagePreview');
        const dropzone = document.getElementById('uploadDropzone');

        if (file) {
            // Create image preview with new structure
            const reader = new FileReader();
            reader.onload = (event) => {
                if (preview) {
                    preview.innerHTML = `
                        <div class="image-preview-wrapper" style="display: flex;">
                            <img src="${event.target.result}" alt="Preview" class="image-preview-thumb">
                            <button type="button" class="image-preview-remove" aria-label="Remove image">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div class="image-preview-badge">Uploaded</div>
                        </div>
                    `;
                    preview.classList.add('has-image');
                    if (dropzone) {
                        dropzone.querySelector('.dropzone-content').style.display = 'none';
                    }
                    
                    // Add remove button listener
                    const removeBtn = preview.querySelector('.image-preview-remove');
                    if (removeBtn) {
                        removeBtn.addEventListener('click', () => this.handleImageRemove());
                    }
                }
            };
            reader.readAsDataURL(file);
        } else {
            this.clearImagePreview();
        }
    },

    handleImageRemove() {
        const fileInput = document.getElementById('uploadImage');
        const preview = document.getElementById('imagePreview');
        const dropzone = document.getElementById('uploadDropzone');
        
        if (fileInput) fileInput.value = '';
        this.clearImagePreview();
    },

    clearImagePreview() {
        const preview = document.getElementById('imagePreview');
        const dropzone = document.getElementById('uploadDropzone');
        
        if (preview) {
            preview.innerHTML = `
                <div class="image-preview-wrapper" style="display: none;">
                    <img src="" alt="Preview" class="image-preview-thumb">
                    <button type="button" class="image-preview-remove" aria-label="Remove image">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div class="image-preview-badge">Uploaded</div>
                </div>
            `;
            preview.classList.remove('has-image');
        }
        if (dropzone) {
            dropzone.querySelector('.dropzone-content').style.display = 'flex';
        }
    },

    async handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const item = {
            id: Date.now(),
            type: this.currentType,
            title: document.getElementById('uploadTitle').value,
            description: document.getElementById('uploadDescription').value,
            date: new Date().toISOString(),
            image: null
        };

        // Get image as base64
        const fileInput = document.getElementById('uploadImage');
        if (fileInput?.files[0]) {
            item.image = await this.fileToBase64(fileInput.files[0]);
        }

        // Add type-specific data
        if (this.currentType === 'certificate') {
            item.issuer = document.getElementById('uploadIssuer').value;
            item.issueDate = document.getElementById('uploadDate').value;
            item.skills = document.getElementById('uploadCertSkills').value;
            item.credentialURL = document.getElementById('uploadCredentialURL').value;
        } else if (this.currentType === 'project') {
            item.problem = document.getElementById('uploadProblem').value;
            item.solution = document.getElementById('uploadSolution').value;
            item.tools = document.getElementById('uploadTools').value;
            item.category = document.getElementById('uploadProjectCategory').value;
            item.highlights = document.getElementById('uploadHighlights').value.split('\n').filter(h => h.trim());
        } else if (this.currentType === 'achievement') {
            item.achievementDate = document.getElementById('uploadAchievementDate').value;
            item.organization = document.getElementById('uploadAchievementOrg').value;
            item.achievementType = document.getElementById('uploadAchievementType').value;
        }

        // Save to array
        this.uploadedItems[`${this.currentType}s`].push(item);

        // Save to localStorage
        this.saveToStorage();

        // Render updated items
        this.renderUploadedItems();

        // Reset and close
        this.form.reset();
        this.closeModal();

        // Show success message
        this.showNotification(`${this.currentType} added successfully!`);
    },

    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    },

    saveToStorage() {
        try {
            localStorage.setItem('portfolioItems', JSON.stringify(this.uploadedItems));
        } catch (e) {
            console.warn('LocalStorage full, unable to save item');
        }
    },

    loadFromStorage() {
        try {
            const stored = localStorage.getItem('portfolioItems');
            if (stored) {
                this.uploadedItems = JSON.parse(stored);
            }
        } catch (e) {
            console.error('Error loading from storage:', e);
        }
    },

    renderUploadedItems() {
        // Render certificates
        this.renderCertificates();
        
        // Render projects
        this.renderProjects();
        
        // Render achievements
        this.renderAchievements();
    },

    renderCertificates() {
        const container = document.getElementById('certificatesGrid');
        if (!container) return;

        const certs = this.uploadedItems.certificates;
        
        // Clear dynamically added certificates (keep original ones)
        const dynamicCerts = container.querySelectorAll('.certificate-card.dynamic');
        dynamicCerts.forEach(c => c.remove());

        certs.forEach(cert => {
            const card = this.createCertificateCard(cert);
            container.appendChild(card);
        });
    },

    createCertificateCard(cert) {
        const card = document.createElement('div');
        card.className = 'certificate-card dynamic reveal-card';
        card.dataset.certId = cert.id;

        card.innerHTML = `
            <div class="cert-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div class="cert-badge">Verified</div>
            ${cert.image ? `<div class="cert-image-wrapper"><img src="${cert.image}" alt="${cert.title}" class="cert-card-image clickable-img"></div>` : ''}
            <div class="cert-content">
                <h3 class="cert-title">${cert.title}</h3>
                <p class="cert-issuer">${cert.issuer}</p>
                <p class="cert-date">${this.formatDate(cert.issueDate)}</p>
            </div>
            <div class="cert-actions">
                <button class="cert-view-btn" onclick="UploadManager.viewCertificate(${cert.id})">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>View</span>
                </button>
                <button class="cert-delete-btn" onclick="UploadManager.deleteItem('certificates', ${cert.id})">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        `;

        return card;
    },

    renderProjects() {
        const container = document.querySelector('.projects-grid');
        if (!container) return;

        const projects = this.uploadedItems.projects;
        
        // Clear dynamically added projects
        const dynamicProjects = container.querySelectorAll('.project-card.dynamic');
        dynamicProjects.forEach(p => p.remove());

        projects.forEach(project => {
            const card = this.createProjectCard(project);
            container.appendChild(card);
        });
    },

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card dynamic reveal-card';
        card.dataset.category = project.category?.toLowerCase() || 'all';
        card.dataset.projectId = project.id;

        card.innerHTML = `
            <div class="project-image-wrapper">
                ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image clickable-img">` : '<div class="project-placeholder"></div>'}
                <div class="project-overlay">
                    <button class="project-view-btn" onclick="UploadManager.viewProject(${project.id})">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>View Project</span>
                    </button>
                </div>
            </div>
            <div class="project-content">
                <div class="project-category">${project.category}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tools">
                    ${project.tools?.split(',').map(t => `<span class="tool-tag">${t.trim()}</span>`).join('') || ''}
                </div>
                <div class="project-actions">
                    <button class="btn-delete" onclick="UploadManager.deleteItem('projects', ${project.id})">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        `;

        return card;
    },

    renderAchievements() {
        // You can add a dedicated achievements section if needed
        console.log('Achievements:', this.uploadedItems.achievements);
    },

    viewCertificate(id) {
        const cert = this.uploadedItems.certificates.find(c => c.id === id);
        if (!cert) return;

        // Populate and open certificate modal
        document.getElementById('modalCertTitle').textContent = cert.title;
        document.getElementById('modalIssuer').textContent = cert.issuer;
        document.getElementById('modalDate').textContent = this.formatDate(cert.issueDate);
        document.getElementById('modalSkills').textContent = cert.skills || 'N/A';
        
        const modal = document.getElementById('certificateModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },

    viewProject(id) {
        const project = this.uploadedItems.projects.find(p => p.id === id);
        if (!project) return;

        // Populate and open project modal
        document.getElementById('projectModalTitle').textContent = project.title;
        document.getElementById('projectModalCategory').textContent = project.category;
        document.getElementById('projectModalDescription').textContent = project.description;
        document.getElementById('projectProblem').textContent = project.problem || 'N/A';
        document.getElementById('projectSolution').textContent = project.solution || 'N/A';
        document.getElementById('projectModalTools').textContent = project.tools;
        document.getElementById('projectModalCompletion').textContent = this.formatDate(project.date);
        
        const highlightsList = document.getElementById('projectHighlights');
        if (highlightsList && project.highlights) {
            highlightsList.innerHTML = project.highlights.map(h => `<li>${h}</li>`).join('');
        }

        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },

    deleteItem(collection, id) {
        if (!confirm('Are you sure you want to delete this item?')) return;

        this.uploadedItems[collection] = this.uploadedItems[collection].filter(item => item.id !== id);
        this.saveToStorage();
        this.renderUploadedItems();
        this.showNotification('Item deleted successfully!');
    },

    openModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.switchType('certificate');
    },

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.form.reset();

        // Reset image preview
        this.clearImagePreview();

        // Reset tags
        const tagContainer = document.getElementById('certSkillsTags');
        if (tagContainer) {
            tagContainer.innerHTML = '';
        }
        this.currentTags = [];
    },

    formatDate(dateString) {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'upload-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// ==================== SIMPLE IMAGE MODAL ====================
/* Clean full-screen image viewer - Click any image to view full screen */
const ImageModal = {
    modal: null,
    fullImage: null,
    closeBtn: null,

    init() {
        this.modal = document.getElementById('imageModal');
        this.fullImage = document.getElementById('fullImage');
        this.closeBtn = document.querySelector('.image-modal-close');

        if (!this.modal) return;

        // Make all images with clickable-img class clickable
        this.attachToImages();

        // Close button
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        // Close on clicking outside image
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.close();
            }
        });
    },

    attachToImages() {
        const images = document.querySelectorAll('.clickable-img');
        images.forEach(img => {
            img.addEventListener('click', () => {
                const src = img.src;
                if (src && !src.includes('data:image')) {
                    this.open(src);
                }
            });
        });
    },

    open(src) {
        this.fullImage.src = src;
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    },

    close() {
        this.modal.classList.remove('show');
        document.body.style.overflow = '';
        setTimeout(() => {
            this.fullImage.src = '';
        }, 300);
    },

    reattach() {
        setTimeout(() => this.attachToImages(), 100);
    }
};

// Initialize image modal
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ImageModal.init());
} else {
    ImageModal.init();
}

// Re-attach after dynamic content loads
document.addEventListener('certsUpdated', () => ImageModal.reattach());
document.addEventListener('projectsUpdated', () => ImageModal.reattach());