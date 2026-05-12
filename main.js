/* ==============================================
   KISAN SETU - MAIN JAVASCRIPT
   ============================================== */

// ============ GLOBAL VARIABLES ============

let isDarkMode = localStorage.getItem('darkMode') === 'true';
let currentLanguage = localStorage.getItem('language') || 'en';
const scrollProgressBar = document.getElementById('scrollProgressBar');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.getElementById('themeToggle');
const languageSelector = document.getElementById('languageSelector');

// ============ INITIALIZATION ============

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initializeTheme();
    
    // Initialize language
    initializeLanguage();
    
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            offset: 100,
            easing: 'ease-in-out-quad',
            once: false
        });
    }

    // Initialize charts
    initializeCharts();
    
    // Setup event listeners
    setupEventListeners();
    
    // Start animations
    animateCounters();
    animateTypingEffect();
});

// ============ THEME MANAGEMENT ============

function initializeTheme() {
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        updateThemeIcon();
    }
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateThemeIcon();
    
    // Reinitialize charts for new theme
    setTimeout(() => {
        initializeCharts();
    }, 300);
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
}

// ============ LANGUAGE MANAGEMENT ============

const translations = {
    en: {
        'nav-home': 'Home',
        'nav-services': 'Services',
        'nav-dashboard': 'Dashboard',
        'nav-weather': 'Weather',
        'nav-marketplace': 'Marketplace',
        'nav-schemes': 'Schemes',
        'nav-community': 'Community',
        'nav-contact': 'Contact',
        'hero-title-1': 'Empowering Farmers',
        'hero-title-2': 'Through Smart Technology',
        'hero-subtitle': 'Connect with markets, monitor crops with AI, get weather forecasts, access government schemes, and join a thriving farmer community.',
        'btn-explore': 'Explore Services',
        'btn-ai': 'AI Crop Analysis',
        'btn-chat': 'Chat with AI'
    },
    hi: {
        'nav-home': 'होम',
        'nav-services': 'सेवाएं',
        'nav-dashboard': 'डैशबोर्ड',
        'nav-weather': 'मौसम',
        'nav-marketplace': 'बाज़ार',
        'nav-schemes': 'योजनाएं',
        'nav-community': 'समुदाय',
        'nav-contact': 'संपर्क',
        'hero-title-1': 'किसानों को सशक्त बनाना',
        'hero-title-2': 'स्मार्ट तकनीक के माध्यम से',
        'hero-subtitle': 'बाजार से जुड़ें, कृत्रिम बुद्धिमत्ता से फसल की निगरानी करें, मौसम पूर्वानुमान प्राप्त करें, सरकारी योजनाओं तक पहुंचें।'
    },
    pa: {
        'nav-home': 'ਘਰ',
        'nav-services': 'ਸੇਵਾਵਾਂ',
        'nav-dashboard': 'ਡੈਸ਼ਬੋਰਡ',
        'nav-weather': 'ਮੌਸਮ',
        'nav-marketplace': 'ਬਜ਼ਾਰ',
        'nav-schemes': 'ਸਕੀਮਾਂ',
        'nav-community': 'ਸਮਾਜ',
        'nav-contact': 'ਸੰਪਰਕ'
    }
};

function initializeLanguage() {
    languageSelector.value = currentLanguage;
    updateLanguage(currentLanguage);
}

function updateLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update text content based on language
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Show notification
    showNotification(`Language changed to ${lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी' : 'ਪੰਜਾਬੀ'}`, 'info', 2000);
}

// ============ EVENT LISTENERS ============

function setupEventListeners() {
    // Hamburger menu
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Language selector
    languageSelector.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });
    
    // Scroll events
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        toggleScrollTopBtn();
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Upload area drag and drop
    const uploadBox = document.getElementById('uploadBox');
    if (uploadBox) {
        uploadBox.addEventListener('click', () => {
            document.getElementById('cropImageInput').click();
        });
        
        uploadBox.addEventListener('dragover', handleDragOver);
        uploadBox.addEventListener('dragleave', handleDragLeave);
        uploadBox.addEventListener('drop', handleDrop);
    }
    
    // Image input change
    const cropImageInput = document.getElementById('cropImageInput');
    if (cropImageInput) {
        cropImageInput.addEventListener('change', handleImageUpload);
    }
    
    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', toggleFAQ);
    });
}

// ============ MOBILE MENU TOGGLE ============

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// ============ SCROLL PROGRESS ============

function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgressBar.style.width = scrolled + '%';
}

// ============ SCROLL TO TOP ============

function toggleScrollTopBtn() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============ NAVIGATION FUNCTIONS ============

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        navMenu.classList.remove('active');
    }
}

// ============ ANIMATE COUNTERS ============

function animateCounters() {
    const counterElements = document.querySelectorAll('[data-target]');
    const speed = 200;

    counterElements.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        let current = 0;
        
        const increment = target / speed;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target.toLocaleString();
                clearInterval(counter);
            } else {
                el.textContent = Math.floor(current).toLocaleString();
            }
        }, 50);
    });
}

// ============ TYPING EFFECT ============

function animateTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const text = typingElement.textContent;
    typingElement.textContent = '';
    
    let index = 0;
    const speed = 100;
    
    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    // Start animation after a short delay
    setTimeout(type, 500);
}

// ============ CHART INITIALIZATION ============

let growthChart, revenueChart, waterUsageChart;

function initializeCharts() {
    // Destroy existing charts
    if (growthChart) growthChart.destroy();
    if (revenueChart) revenueChart.destroy();
    if (waterUsageChart) waterUsageChart.destroy();
    
    const chartColor = isDarkMode ? '#e9ecef' : '#495057';
    const gridColor = isDarkMode ? '#495057' : '#dee2e6';
    
    // Growth Chart
    const growthCtx = document.getElementById('growthChart');
    if (growthCtx) {
        growthChart = new Chart(growthCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
                datasets: [{
                    label: 'Crop Growth %',
                    data: [15, 25, 35, 45, 62, 78, 85],
                    borderColor: '#2ECC71',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    tension: 0.4,
                    borderWidth: 2,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: '#2ECC71',
                    pointBorderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        labels: { color: chartColor }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { color: chartColor },
                        grid: { color: gridColor }
                    },
                    x: {
                        ticks: { color: chartColor },
                        grid: { color: gridColor }
                    }
                }
            }
        });
    }
    
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        revenueChart = new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue (₹1000s)',
                    data: [45, 52, 48, 65, 72, 85],
                    backgroundColor: '#2ECC71',
                    borderRadius: 5,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        labels: { color: chartColor }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: chartColor },
                        grid: { color: gridColor }
                    },
                    x: {
                        ticks: { color: chartColor },
                        grid: { color: gridColor }
                    }
                }
            }
        });
    }
    
    // Water Usage Chart
    const waterCtx = document.getElementById('waterUsageChart');
    if (waterCtx) {
        waterUsageChart = new Chart(waterCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Water Used (Liters)',
                    data: [1200, 1400, 1100, 1600, 1450, 1300, 1250],
                    borderColor: '#42A5F5',
                    backgroundColor: 'rgba(66, 165, 245, 0.1)',
                    tension: 0.4,
                    borderWidth: 2,
                    fill: true,
                    pointRadius: 4,
                    pointBackgroundColor: '#42A5F5'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        labels: { color: chartColor }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: chartColor },
                        grid: { color: gridColor }
                    },
                    x: {
                        ticks: { color: chartColor },
                        grid: { color: gridColor }
                    }
                }
            }
        });
    }
}

// ============ DRAG AND DROP UPLOAD ============

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.style.borderColor = '#2ECC71';
    this.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    this.style.borderColor = '#2ECC71';
    this.style.backgroundColor = 'transparent';
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.style.borderColor = '#2ECC71';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        document.getElementById('cropImageInput').files = files;
        handleImageUpload();
    }
}

function handleImageUpload() {
    const input = document.getElementById('cropImageInput');
    const file = input.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('imagePreview');
            const previewImage = document.getElementById('previewImage');
            
            previewImage.src = e.target.result;
            preview.style.display = 'block';
            
            // Hide upload box and show results after delay
            setTimeout(() => {
                document.getElementById('uploadBox').style.display = 'none';
                startAIDiagnosis();
            }, 500);
        };
        reader.readAsDataURL(file);
    }
}

function clearUpload() {
    document.getElementById('cropImageInput').value = '';
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('uploadBox').style.display = 'block';
    document.getElementById('diagnosisResults').style.display = 'none';
}

// ============ AI DIAGNOSIS ============

function startAIDiagnosis() {
    const diagnosisResults = document.getElementById('diagnosisResults');
    const aiLoader = document.getElementById('aiLoader');
    const resultsContent = document.getElementById('resultsContent');
    
    diagnosisResults.style.display = 'block';
    aiLoader.style.display = 'block';
    resultsContent.style.display = 'none';
    
    // Simulate AI processing
    setTimeout(() => {
        aiLoader.style.display = 'none';
        resultsContent.style.display = 'block';
        showNotification('Disease detected successfully!', 'success', 3000);
    }, 3000);
}

function downloadReport() {
    alert('Report download feature coming soon!');
    showNotification('Generating PDF report...', 'info', 2000);
}

function shareDiagnosis() {
    alert('Share diagnosis with expert feature coming soon!');
    showNotification('Opening expert consultation panel...', 'info', 2000);
}

// ============ FORM HANDLING ============

function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        state: formData.get('state'),
        message: formData.get('message')
    };
    
    console.log('Form submitted:', data);
    
    // Reset form
    event.target.reset();
    
    // Show success message
    showNotification('Thank you! We will contact you soon.', 'success', 3000);
}

function subscribeNewsletter(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    console.log('Newsletter subscription:', email);
    
    event.target.reset();
    showNotification('Successfully subscribed! Check your email.', 'success', 3000);
}

// ============ SCHEME APPLICATION ============

function applyScheme(schemeName) {
    console.log('Applying for scheme:', schemeName);
    showNotification(`Redirecting to ${schemeName} application...`, 'info', 2000);
    
    // In a real application, this would redirect to the scheme application page
    setTimeout(() => {
        alert(`Application form for ${schemeName} would open here.`);
    }, 2000);
}

// ============ EXPERT CONSULTATION ============

function bookExpert(expertName) {
    console.log('Booking expert:', expertName);
    showNotification(`Booking consultation with ${expertName}...`, 'info', 2000);
    
    setTimeout(() => {
        alert(`Availability calendar for ${expertName} would open here.`);
    }, 2000);
}

// ============ IRRIGATION CONTROL ============

function toggleIrrigation(element) {
    element.classList.toggle('active');
    const isActive = element.classList.contains('active');
    showNotification(
        isActive ? 'Irrigation system turned ON' : 'Irrigation system turned OFF',
        'success',
        2000
    );
}

// ============ NOTIFICATION SYSTEM ============

function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 350px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

function getNotificationColor(type) {
    const colors = {
        'success': '#2ECC71',
        'error': '#FF6B35',
        'warning': '#FFA726',
        'info': '#42A5F5'
    };
    return colors[type] || '#2ECC71';
}

// ============ FAQ ACCORDION ============

function toggleFAQ(event) {
    const faqItem = event.target.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// ============ CHATBOT FUNCTIONALITY ============

function openChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.classList.add('open');
    document.getElementById('chatInput').focus();
}

function closeChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.classList.remove('open');
}

function sendChatMessage(event) {
    event.preventDefault();
    
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    
    // Clear input
    input.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const responses = [
            'That\'s a great question! I\'m here to help you with farming guidance.',
            'Based on current weather patterns, it\'s a good time for irrigation.',
            'I recommend checking the government schemes section for available subsidies.',
            'Have you tried our AI disease detection feature? It can help identify crop problems.',
            'For market prices, check the Mandi section for real-time rates.',
            'Our expert consultants are available for personalized advice.'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addChatMessage(randomResponse, 'bot');
    }, 1000);
}

function addChatMessage(message, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const text = document.createElement('div');
    text.className = 'message-text';
    text.textContent = message;
    
    const time = document.createElement('div');
    time.className = 'message-time';
    time.textContent = new Date().toLocaleTimeString();
    
    content.appendChild(text);
    content.appendChild(time);
    
    if (sender === 'bot') {
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
    } else {
        messageDiv.appendChild(content);
        messageDiv.appendChild(avatar);
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ============ EXPORT FUNCTIONS ============

// Ensure functions are globally accessible
window.scrollToSection = scrollToSection;
window.toggleFAQ = toggleFAQ;
window.handleContactForm = handleContactForm;
window.subscribeNewsletter = subscribeNewsletter;
window.applyScheme = applyScheme;
window.bookExpert = bookExpert;
window.toggleIrrigation = toggleIrrigation;
window.openChatbot = openChatbot;
window.closeChatbot = closeChatbot;
window.sendChatMessage = sendChatMessage;
window.downloadReport = downloadReport;
window.shareDiagnosis = shareDiagnosis;
window.clearUpload = clearUpload;
window.scrollToTop = scrollToTop;
window.showNotification = showNotification;
window.handleDragOver = handleDragOver;
window.handleDragLeave = handleDragLeave;
window.handleDrop = handleDrop;
