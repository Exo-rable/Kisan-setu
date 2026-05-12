/* ==============================================
   DASHBOARD JAVASCRIPT - DATA & INTERACTIONS
   ============================================== */

// ============ DASHBOARD DATA ============

const dashboardData = {
    activeCrops: 4,
    soilHealth: 87,
    currentTemp: 23,
    alerts: 3,
    crops: [
        { name: 'Wheat', status: 'Healthy', progress: 75 },
        { name: 'Rice', status: 'Healthy', progress: 82 },
        { name: 'Corn', status: 'Warning', progress: 60 },
        { name: 'Vegetables', status: 'Excellent', progress: 90 }
    ],
    sensors: {
        nitrogen: 82,
        phosphorus: 76,
        potassium: 89,
        moisture: 68
    },
    weather: {
        temp: 28,
        humidity: 72,
        rainfall: 25,
        windSpeed: 12,
        uvIndex: 6
    },
    revenue: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [45, 52, 48, 65, 72, 85]
    }
};

// ============ WEATHER API INTEGRATION (Mock) ============

class WeatherService {
    static async fetchWeather(location) {
        // Mock API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    location: location,
                    temperature: 28,
                    condition: 'Partly Cloudy',
                    humidity: 72,
                    windSpeed: 12,
                    rainfall: 25,
                    forecast: [
                        { day: 'Today', temp: 28, condition: 'Partly Cloudy', icon: '⛅' },
                        { day: 'Tomorrow', temp: 26, condition: 'Cloudy', icon: '☁️' },
                        { day: 'Wednesday', temp: 24, condition: 'Rainy', icon: '🌧️' }
                    ]
                });
            }, 500);
        });
    }
    
    static async fetchAirQuality(location) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    aqi: 65,
                    pm25: 32,
                    pm10: 45,
                    o3: 78
                });
            }, 300);
        });
    }
}

// ============ MANDI PRICES API (Mock) ============

class MandiService {
    static async fetchPrices() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { crop: 'Wheat', price: 2850, change: '+2.5%', market: 'Delhi' },
                    { crop: 'Rice', price: 4200, change: '-1.2%', market: 'Punjab' },
                    { crop: 'Corn', price: 1850, change: '+0.8%', market: 'Haryana' },
                    { crop: 'Cotton', price: 5100, change: '+1.5%', market: 'Gujarat' },
                    { crop: 'Tomato', price: 2200, change: '+3.2%', market: 'Karnataka' }
                ]);
            }, 500);
        });
    }
    
    static async searchPrices(crop, region) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    crop: crop,
                    region: region,
                    price: Math.random() * 5000,
                    trend: Math.random() > 0.5 ? 'up' : 'down'
                });
            }, 300);
        });
    }
}

// ============ AI ANALYSIS SERVICE (Mock) ============

class AIService {
    static async analyzeDisease(imageData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const diseases = [
                    { name: 'Early Blight', confidence: 94 },
                    { name: 'Leaf Rust', confidence: 87 },
                    { name: 'Septoria Leaf Blotch', confidence: 91 },
                    { name: 'Powdery Mildew', confidence: 85 },
                    { name: 'Fusarium Wilt', confidence: 79 }
                ];
                
                const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
                resolve(randomDisease);
            }, 2000);
        });
    }
    
    static async getCropRecommendations(season, region) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    season: season,
                    region: region,
                    recommendations: [
                        'Plant wheat for better yield',
                        'Consider crop rotation',
                        'Apply organic fertilizers',
                        'Use drip irrigation system'
                    ]
                });
            }, 500);
        });
    }
    
    static async getFertilizerSuggestions(soilData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    nitrogen: { need: 'High', amount: '60 kg/acre' },
                    phosphorus: { need: 'Medium', amount: '30 kg/acre' },
                    potassium: { need: 'Low', amount: '15 kg/acre' }
                });
            }, 400);
        });
    }
}

// ============ NOTIFICATION SERVICE ============

class NotificationService {
    static alerts = [];
    
    static addAlert(title, message, type = 'info', duration = 5000) {
        const alert = {
            id: Date.now(),
            title: title,
            message: message,
            type: type,
            timestamp: new Date()
        };
        
        this.alerts.push(alert);
        this.displayAlert(alert);
        
        if (duration > 0) {
            setTimeout(() => this.removeAlert(alert.id), duration);
        }
        
        return alert.id;
    }
    
    static displayAlert(alert) {
        const alertBox = document.createElement('div');
        alertBox.className = `notification-box notification-${alert.type}`;
        alertBox.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border-left: 4px solid ${this.getAlertColor(alert.type)};
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        alertBox.innerHTML = `
            <div style="font-weight: 600; color: #333;">${alert.title}</div>
            <div style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">${alert.message}</div>
        `;
        
        document.body.appendChild(alertBox);
        
        setTimeout(() => {
            alertBox.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => alertBox.remove(), 300);
        }, 4700);
    }
    
    static getAlertColor(type) {
        const colors = {
            'success': '#2ECC71',
            'error': '#FF6B35',
            'warning': '#FFA726',
            'info': '#42A5F5'
        };
        return colors[type] || '#2ECC71';
    }
    
    static removeAlert(id) {
        this.alerts = this.alerts.filter(alert => alert.id !== id);
    }
}

// ============ USER PROFILE SERVICE ============

class UserService {
    static userProfile = {
        name: 'Rajesh Kumar',
        state: 'Punjab',
        district: 'Jalandhar',
        totalArea: 5,
        mainCrops: ['Wheat', 'Rice'],
        farmType: 'Irrigated',
        phoneNumber: '+91 9876543210',
        email: 'rajesh@example.com'
    };
    
    static async getProfile() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.userProfile);
            }, 300);
        });
    }
    
    static async updateProfile(updates) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.userProfile = { ...this.userProfile, ...updates };
                resolve(this.userProfile);
            }, 500);
        });
    }
    
    static async getFarmStats() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    totalArea: 5,
                    activeCrops: 4,
                    totalProduction: 45,
                    averageYield: 9,
                    revenue: 85000
                });
            }, 400);
        });
    }
}

// ============ SCHEME SERVICE ============

class SchemeService {
    static schemes = [
        {
            id: 'pm-kisan',
            name: 'Pradhan Mantri Kisan Samman Nidhi',
            description: 'Direct income support for farmers',
            amount: 6000,
            eligibility: ['Land ≤ 2 hectares', 'Indian citizen'],
            status: 'Eligible'
        },
        {
            id: 'pmfby',
            name: 'Pradhan Mantri Fasal Bima Yojana',
            description: 'Crop insurance scheme',
            amount: 'Variable',
            eligibility: ['All farmers', 'Notified crops'],
            status: 'Eligible'
        },
        {
            id: 'subsidy',
            name: 'Agricultural Subsidy Program',
            description: 'Equipment and input subsidy',
            amount: '50% subsidy',
            eligibility: ['Marginal farmers', 'Small farmers'],
            status: 'Eligible'
        }
    ];
    
    static async getSchemes() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.schemes);
            }, 400);
        });
    }
    
    static async checkEligibility(schemeId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    schemeId: schemeId,
                    eligible: true,
                    reasons: ['Land holding matches criteria', 'Income eligible']
                });
            }, 300);
        });
    }
    
    static async applyForScheme(schemeId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    applicationId: 'APP-' + Date.now(),
                    message: 'Application submitted successfully'
                });
            }, 500);
        });
    }
}

// ============ EXPERT SERVICE ============

class ExpertService {
    static experts = [
        {
            id: 1,
            name: 'Dr. Ramesh Singh',
            specialization: 'Soil & Irrigation',
            rating: 4.9,
            consultations: 1250,
            responseTime: '15 min',
            price: 500,
            available: true
        },
        {
            id: 2,
            name: 'Ms. Priya Sharma',
            specialization: 'Plant Pathology',
            rating: 5.0,
            consultations: 2100,
            responseTime: '10 min',
            price: 600,
            available: true
        },
        {
            id: 3,
            name: 'Mr. Arjun Malhotra',
            specialization: 'Agribusiness',
            rating: 4.8,
            consultations: 890,
            responseTime: '20 min',
            price: 700,
            available: false
        }
    ];
    
    static async getExperts() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.experts);
            }, 300);
        });
    }
    
    static async getExpertAvailability(expertId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    expertId: expertId,
                    availability: [
                        { date: '2026-05-13', slots: ['10:00', '11:00', '14:00', '15:00'] },
                        { date: '2026-05-14', slots: ['09:00', '10:00', '16:00'] }
                    ]
                });
            }, 400);
        });
    }
    
    static async bookConsultation(expertId, dateTime) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    bookingId: 'BOOK-' + Date.now(),
                    consultationDetails: {
                        expertId: expertId,
                        dateTime: dateTime,
                        duration: 30,
                        meetingLink: 'https://meet.kisansetu.com/abc123'
                    }
                });
            }, 500);
        });
    }
}

// ============ ANALYTICS SERVICE ============

class AnalyticsService {
    static async trackEvent(eventName, eventData) {
        console.log(`Event tracked: ${eventName}`, eventData);
        // Send to analytics backend
    }
    
    static async trackPageView(pageName) {
        console.log(`Page viewed: ${pageName}`);
        // Send to analytics backend
    }
    
    static async trackConversion(conversionName) {
        console.log(`Conversion tracked: ${conversionName}`);
        // Send to analytics backend
    }
    
    static async getUserAnalytics() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    pagesViewed: 23,
                    timeSpent: 156,
                    interactions: 45,
                    lastActive: '2 minutes ago'
                });
            }, 300);
        });
    }
}

// ============ EXPORT SERVICES ============

window.WeatherService = WeatherService;
window.MandiService = MandiService;
window.AIService = AIService;
window.NotificationService = NotificationService;
window.UserService = UserService;
window.SchemeService = SchemeService;
window.ExpertService = ExpertService;
window.AnalyticsService = AnalyticsService;

// ============ INITIALIZE DASHBOARD DATA ============

document.addEventListener('DOMContentLoaded', async () => {
    // Load dashboard data
    try {
        // You can load real data here
        console.log('Dashboard data loaded:', dashboardData);
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
});
