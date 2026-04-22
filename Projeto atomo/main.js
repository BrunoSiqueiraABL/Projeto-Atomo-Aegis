// ====================================
// Navigation Toggle (Mobile)
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // ====================================
    // Navbar Scroll Effect
    // ====================================
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ====================================
    // Smooth Scrolling
    // ====================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignore empty or just # hrefs
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ====================================
    // Scroll Animation Observer
    // ====================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animate-on-scroll class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // Animate cards on scroll
    const cards = document.querySelectorAll('.problem-card, .feature-card, .pricing-card, .win-card');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        card.classList.add('animate-on-scroll');
        observer.observe(card);
    });

    // ====================================
    // Contact Form Handler
    // ====================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Show success message
            showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');

            // Reset form
            contactForm.reset();
        });
    }

    // ====================================
    // Notification System
    // ====================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add notification styles if not exist
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                    z-index: 9999;
                    animation: slideInRight 0.3s ease-out;
                    max-width: 400px;
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .notification-success {
                    border-left: 4px solid var(--success-color);
                }
                .notification-success i {
                    color: var(--success-color);
                    font-size: 20px;
                }
                .notification-info {
                    border-left: 4px solid var(--primary-color);
                }
                .notification-info i {
                    color: var(--primary-color);
                    font-size: 20px;
                }
                @keyframes slideInRight {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // ====================================
    // Dynamic Stats Counter
    // ====================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            // Format number based on target
            if (target >= 1000000) {
                element.textContent = (current / 1000000).toFixed(1) + 'M+';
            } else if (target >= 1000) {
                element.textContent = (current / 1000).toFixed(0) + 'K+';
            } else {
                element.textContent = Math.floor(current) + '%';
            }
        }, 16);
    }

    // Animate hero stats when visible
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !heroStats.classList.contains('animated')) {
                    heroStats.classList.add('animated');
                    
                    // Animate each stat
                    animateCounter(heroStats.querySelectorAll('.stat-number')[0], 100000, 2000);
                    animateCounter(heroStats.querySelectorAll('.stat-number')[1], 95, 2000);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(heroStats);
    }

    // ====================================
    // Active Navigation Link Highlighting
    // ====================================
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);

    // Add active link styles
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu a.active {
            color: var(--primary-color);
            font-weight: 700;
        }
    `;
    document.head.appendChild(style);

    // ====================================
    // Pricing Plan Interactions
    // ====================================
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        const button = card.querySelector('.btn');
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const planName = card.querySelector('h3').textContent;
                showNotification(`Você selecionou o plano ${planName}. Funcionalidade em breve!`, 'info');
            });
        }
    });

    // ====================================
    // Demo Interface Animation
    // ====================================
    const demoInterface = document.querySelector('.demo-interface');
    if (demoInterface) {
        // Simulate typing effect in demo input
        const demoInput = demoInterface.querySelector('input');
        if (demoInput) {
            const textToType = 'https://oferta-suspeita.com/iphone-14-899';
            let charIndex = 0;

            function typeText() {
                if (charIndex < textToType.length) {
                    demoInput.value += textToType.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeText, 100);
                } else {
                    // After typing, show the result with animation
                    setTimeout(() => {
                        const demoResult = demoInterface.querySelector('.demo-result');
                        if (demoResult) {
                            demoResult.style.opacity = '0';
                            demoResult.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                demoResult.style.transition = 'all 0.5s ease';
                                demoResult.style.opacity = '1';
                                demoResult.style.transform = 'scale(1)';
                            }, 100);
                        }
                    }, 500);
                }
            }

            // Start typing when hero section is visible
            const heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !demoInterface.classList.contains('animated')) {
                        demoInterface.classList.add('animated');
                        setTimeout(() => {
                            typeText();
                        }, 1000);
                    }
                });
            }, { threshold: 0.5 });

            heroObserver.observe(document.querySelector('.hero'));
        }
    }

    // ====================================
    // Lazy Load Images (if any)
    // ====================================
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ====================================
    // Back to Top Button
    // ====================================
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(backToTop);

    // Add back to top button styles
    const backToTopStyles = document.createElement('style');
    backToTopStyles.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--gradient-primary);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: var(--shadow-lg);
        }
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        .back-to-top:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-xl);
        }
    `;
    document.head.appendChild(backToTopStyles);

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ====================================
    // Feature Cards Hover Effect
    // ====================================
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--primary-color)';
        });
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('premium')) {
                this.style.borderColor = 'transparent';
            }
        });
    });

    // ====================================
    // Demo Section - Tabs
    // ====================================
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoTabContents = document.querySelectorAll('.demo-tab-content');

    demoTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active from all tabs
            demoTabs.forEach(t => t.classList.remove('active'));
            demoTabContents.forEach(c => c.classList.remove('active'));

            // Add active to clicked tab
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });

    // ====================================
    // Demo Section - Analyze Button
    // ====================================
    const analyzeBtn = document.querySelector('.btn-analyze');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            // Get active tab
            const activeTab = document.querySelector('.demo-tab.active').getAttribute('data-tab');
            let inputValue = '';

            if (activeTab === 'link') {
                inputValue = document.getElementById('input-link').value;
            } else if (activeTab === 'texto') {
                inputValue = document.getElementById('input-texto').value;
            }

            if (!inputValue.trim()) {
                showNotification('Por favor, insira um link ou mensagem para análise', 'info');
                return;
            }

            // Show loading
            analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analisando...';
            analyzeBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                showDemoResult(inputValue);
                analyzeBtn.innerHTML = '<i class="fas fa-shield-alt"></i> Analisar Agora (Grátis)';
                analyzeBtn.disabled = false;

                // Scroll to result
                document.getElementById('demo-result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 2000);
        });
    }

    function showDemoResult(input) {
        const resultArea = document.getElementById('demo-result');
        
        // Simular análise (na prática, seria chamada à API)
        const isSuspicious = input.toLowerCase().includes('899') || 
                           input.toLowerCase().includes('promoção') ||
                           input.toLowerCase().includes('últimas unidades');
        
        const score = isSuspicious ? Math.floor(Math.random() * 30) + 10 : Math.floor(Math.random() * 30) + 70;
        
        let classification, color, icon, message, alternatives;
        
        if (score >= 80) {
            classification = 'Alta Confiança';
            color = '#10b981';
            icon = 'check-circle';
            message = 'Esta oferta parece segura baseada em nossa análise.';
            alternatives = '';
        } else if (score >= 50) {
            classification = 'Atenção Necessária';
            color = '#f59e0b';
            icon = 'exclamation-triangle';
            message = 'Recomendamos verificar mais detalhes antes de prosseguir.';
            alternatives = '';
        } else {
            classification = 'Alto Risco de Golpe';
            color = '#ef4444';
            icon = 'times-circle';
            message = 'ATENÇÃO! Esta oferta apresenta sinais de golpe. Veja alternativas seguras abaixo.';
            alternatives = `
                <div class="result-alternatives">
                    <h4>✅ Ofertas Seguras Recomendadas</h4>
                    <div class="mini-alternatives">
                        <div class="mini-alt-card">
                            <i class="fas fa-store"></i>
                            <span>Mercado Livre</span>
                            <strong>R$ 4.899</strong>
                            <div class="mini-score">95/100</div>
                        </div>
                        <div class="mini-alt-card">
                            <i class="fab fa-amazon"></i>
                            <span>Amazon</span>
                            <strong>R$ 4.999</strong>
                            <div class="mini-score">98/100</div>
                        </div>
                        <div class="mini-alt-card">
                            <i class="fas fa-shopping-bag"></i>
                            <span>Magazine Luiza</span>
                            <strong>R$ 4.799</strong>
                            <div class="mini-score">93/100</div>
                        </div>
                    </div>
                </div>
            `;
        }

        resultArea.innerHTML = `
            <div class="result-header">
                <i class="fas fa-${icon}" style="color: ${color};"></i>
                <h3>Resultado da Análise</h3>
            </div>
            <div class="result-score" style="border-color: ${color};">
                <div class="score-circle">
                    <svg width="150" height="150">
                        <circle cx="75" cy="75" r="65" fill="none" stroke="#e5e7eb" stroke-width="12"/>
                        <circle cx="75" cy="75" r="65" fill="none" stroke="${color}" stroke-width="12"
                                stroke-dasharray="${(score / 100) * 408} 408" 
                                stroke-linecap="round" 
                                transform="rotate(-90 75 75)"/>
                    </svg>
                    <div class="score-number" style="color: ${color};">${score}</div>
                </div>
                <div class="score-info">
                    <h4 style="color: ${color};">${classification}</h4>
                    <p>${message}</p>
                    <div class="score-details">
                        <div class="score-detail-item">
                            <i class="fas fa-building"></i>
                            <span>CNPJ: ${isSuspicious ? 'Não encontrado' : 'Válido'}</span>
                        </div>
                        <div class="score-detail-item">
                            <i class="fas fa-globe"></i>
                            <span>Domínio: ${isSuspicious ? '5 dias' : '8 anos'}</span>
                        </div>
                        <div class="score-detail-item">
                            <i class="fas fa-comments"></i>
                            <span>Reputação: ${isSuspicious ? 'Sem dados' : 'Boa (8.5/10)'}</span>
                        </div>
                        <div class="score-detail-item">
                            <i class="fas fa-tag"></i>
                            <span>Preço: ${isSuspicious ? '80% abaixo' : 'Competitivo'}</span>
                        </div>
                    </div>
                </div>
            </div>
            ${alternatives}
            <div class="result-actions">
                <button class="btn btn-primary" onclick="location.href='#planos'">
                    <i class="fas fa-crown"></i>
                    Fazer Análises Ilimitadas (Premium)
                </button>
                <button class="btn btn-outline" onclick="document.getElementById('input-link').value=''; document.getElementById('input-texto').value=''; document.getElementById('demo-result').style.display='none';">
                    <i class="fas fa-redo"></i>
                    Nova Análise
                </button>
            </div>
        `;

        // Add styles for result
        const resultStyles = `
            .result-header {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid var(--border-color);
            }
            .result-header i {
                font-size: 36px;
            }
            .result-header h3 {
                font-size: 28px;
                font-weight: 800;
                color: var(--text-primary);
            }
            .result-score {
                display: flex;
                gap: 40px;
                align-items: center;
                background: var(--bg-secondary);
                padding: 30px;
                border-radius: 15px;
                border-left: 5px solid;
                margin-bottom: 30px;
            }
            .score-circle {
                position: relative;
                flex-shrink: 0;
            }
            .score-number {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 48px;
                font-weight: 900;
            }
            .score-info {
                flex: 1;
            }
            .score-info h4 {
                font-size: 24px;
                font-weight: 800;
                margin-bottom: 10px;
            }
            .score-info p {
                font-size: 16px;
                color: var(--text-secondary);
                margin-bottom: 20px;
            }
            .score-details {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 12px;
            }
            .score-detail-item {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 14px;
                color: var(--text-secondary);
            }
            .score-detail-item i {
                color: var(--primary-color);
            }
            .result-alternatives {
                margin-bottom: 30px;
            }
            .result-alternatives h4 {
                font-size: 20px;
                font-weight: 700;
                margin-bottom: 20px;
                color: var(--text-primary);
            }
            .mini-alternatives {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
            }
            .mini-alt-card {
                background: white;
                border: 2px solid var(--border-color);
                border-radius: 10px;
                padding: 20px;
                text-align: center;
            }
            .mini-alt-card i {
                font-size: 32px;
                color: var(--primary-color);
                margin-bottom: 10px;
            }
            .mini-alt-card span {
                display: block;
                font-size: 14px;
                color: var(--text-secondary);
                margin-bottom: 8px;
            }
            .mini-alt-card strong {
                display: block;
                font-size: 24px;
                color: var(--success-color);
                margin-bottom: 8px;
            }
            .mini-score {
                display: inline-block;
                background: var(--primary-color);
                color: white;
                padding: 4px 10px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 700;
            }
            .result-actions {
                display: flex;
                gap: 15px;
                flex-wrap: wrap;
            }
            .result-actions .btn {
                flex: 1;
                min-width: 200px;
                justify-content: center;
            }
            @media (max-width: 768px) {
                .result-score {
                    flex-direction: column;
                }
                .score-details {
                    grid-template-columns: 1fr;
                }
                .mini-alternatives {
                    grid-template-columns: 1fr;
                }
                .result-actions {
                    flex-direction: column;
                }
                .result-actions .btn {
                    width: 100%;
                }
            }
        `;

        if (!document.getElementById('demo-result-styles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'demo-result-styles';
            styleEl.textContent = resultStyles;
            document.head.appendChild(styleEl);
        }

        resultArea.style.display = 'block';
    }

    // ====================================
    // Technology Section Animations
    // ====================================
    const aibrainLayers = document.querySelectorAll('.brain-layer');
    if (aibrainLayers.length > 0) {
        const brainObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aibrainLayers.forEach((layer, index) => {
                        layer.style.opacity = '0';
                        layer.style.transform = layer.style.transform + ' scale(0.8)';
                        setTimeout(() => {
                            layer.style.transition = 'all 0.5s ease';
                            layer.style.opacity = '1';
                            layer.style.transform = layer.style.transform.replace('scale(0.8)', 'scale(1)');
                        }, index * 200);
                    });A
                    brainObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        const aiBrain = document.querySelector('.ai-brain');
        if (aiBrain) {
            brainObserver.observe(aiBrain);
        }
    }

    // ====================================
    // Testimonials Carousel Effect
    // ====================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        card.classList.add('animate-on-scroll');
        observer.observe(card);
    });

    // ====================================
    // Console Welcome Message
    // ====================================
    console.log('%c🛡️ Aegis.IA', 'font-size: 24px; font-weight: bold; color: #2563eb;');
    console.log('%cProteção Inteligente Contra Golpes Digitais | Powered by Advanced AI', 'font-size: 14px; color: #6b7280;');
    console.log('%c✨ Landing Page desenvolvida com HTML, CSS e JavaScript', 'font-size: 12px; color: #9ca3af;');
});




// ====================================
// Performance Optimization
// ====================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedScroll = debounce(function() {
    // Any scroll-heavy operations can go here
}, 100);

// Tela login 

 window.location.href = "./TelaLogin/Login.html";
    function entrar(){
        window.location.href = "app.html";
    }




    






  