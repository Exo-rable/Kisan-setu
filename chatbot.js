/* ==============================================
   CHATBOT JAVASCRIPT
   ============================================== */

class KisanAIAssistant {
    constructor() {
        this.name = 'Kisan AI Assistant';
        this.version = '1.0.0';
        this.language = localStorage.getItem('language') || 'en';
        this.conversationHistory = [];
        this.initialized = false;
    }
    
    // Knowledge Base
    static knowledgeBase = {
        greetings: {
            en: ['Hello! How can I help you today?', 'नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूं?'],
            hi: ['नमस्ते! मैं आपकी कृषि संबंधी समस्याओं में मदद कर सकता हूं।'],
            pa: ['ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਮੈ ਤੁਹਾਨੂੰ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?']
        },
        
        crops: {
            en: ['Wheat is best grown in winter. Soil should be well-drained.',
                 'Rice requires standing water and warm weather for growth.',
                 'Corn needs good sunlight and regular irrigation.',
                 'Vegetables should be grown with proper spacing and fertilizers.'],
            hi: ['गेहूं सर्दियों में अच्छी तरह उगता है।',
                 'चावल को गर्म मौसम और पानी की आवश्यकता होती है।',
                 'मक्का को अच्छी धूप और नियमित सिंचाई की जरूरत है।']
        },
        
        irrigation: {
            en: ['Check soil moisture before irrigating.',
                 'Wheat needs 4-5 irrigations during its growth period.',
                 'Rice paddies should maintain 5-10 cm water level.',
                 'Drip irrigation saves up to 60% water.'],
            hi: ['सिंचाई से पहले मिट्टी की नमी जांचें।',
                 'गेहूं को 4-5 सिंचाई की आवश्यकता होती है।',
                 'ड्रिप सिंचाई 60% तक पानी बचाती है।']
        },
        
        diseases: {
            en: ['Early blight symptoms include dark spots on leaves.',
                 'Use fungicide spray for mold-related diseases.',
                 'Maintain proper spacing to prevent fungal infections.',
                 'Crop rotation helps prevent soil-borne diseases.'],
            hi: ['प्रारंभिक झुलसा के लक्षण पत्तियों पर गहरे धब्बे हैं।',
                 'फफूंद संबंधी रोगों के लिए कवकनाशी स्प्रे का उपयोग करें।',
                 'फसल चक्र कीटों को नियंत्रित करने में मदद करता है।']
        },
        
        fertilizer: {
            en: ['Nitrogen promotes leaf growth.',
                 'Phosphorus strengthens roots.',
                 'Potassium improves fruit quality.',
                 'Organic fertilizers are better for long-term soil health.'],
            hi: ['नाइट्रोजन पत्ती की वृद्धि को बढ़ावा देता है।',
                 'फॉस्फोरस जड़ों को मजबूत करता है।',
                 'जैव खाद दीर्घकालीन मिट्टी स्वास्थ्य के लिए बेहतर है।']
        },
        
        weather: {
            en: ['Check weather forecast before farming activities.',
                 'Heavy rainfall may cause crop damage. Provide drainage.',
                 'Extreme heat requires more frequent irrigation.',
                 'Frost can damage tender crops - use protective measures.'],
            hi: ['कृषि कार्य से पहले मौसम की जांच करें।',
                 'भारी बारिश फसल को नुकसान पहुंचा सकती है।',
                 'चरम गर्मी के लिए अधिक सिंचाई की आवश्यकता होती है।']
        },
        
        schemes: {
            en: ['PM-KISAN provides ₹6,000 annual support.',
                 'PMFBY offers crop insurance coverage.',
                 'Solar pump subsidy covers 50% of installation cost.',
                 'Check eligibility for government schemes.'],
            hi: ['पीएम-किसान ₹6,000 वार्षिक समर्थन प्रदान करता है।',
                 'पीएमएफबीवाई फसल बीमा कवरेज प्रदान करता है।',
                 'सोलर पंप सब्सिडी 50% स्थापना लागत को कवर करती है।']
        },
        
        help: {
            en: ['Ask me about crops, irrigation, diseases, fertilizers, weather, or schemes.',
                 'You can also request weather forecasts, mandi prices, or expert consultation.'],
            hi: ['मुझसे फसलें, सिंचाई, रोग, खाद, मौसम या योजनाओं के बारे में पूछें।',
                 'आप मौसम पूर्वानुमास, मंडी दर या विशेषज्ञ परामर्श के लिए कह सकते हैं।']
        }
    };
    
    // Intent Recognition
    static intents = {
        'crop': ['crop', 'farming', 'plant', 'फसल', 'खेत', 'पौधा'],
        'irrigation': ['water', 'irrigation', 'irrigate', 'पानी', 'सिंचाई'],
        'disease': ['disease', 'pest', 'problem', 'रोग', 'कीट'],
        'fertilizer': ['fertilizer', 'manure', 'nutrient', 'खाद', 'पोषक'],
        'weather': ['weather', 'rain', 'temperature', 'मौसम', 'बारिश'],
        'scheme': ['scheme', 'subsidy', 'government', 'योजना', 'सब्सिडी'],
        'greeting': ['hello', 'hi', 'hey', 'नमस्ते', 'हैलो']
    };
    
    // Generate Response
    generateResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        let response = '';
        let intent = '';
        
        // Detect intent
        for (const [key, keywords] of Object.entries(KisanAIAssistant.intents)) {
            if (keywords.some(keyword => lowerMessage.includes(keyword))) {
                intent = key;
                break;
            }
        }
        
        // Generate response based on intent
        switch(intent) {
            case 'crop':
                response = this.getRandomResponse(KisanAIAssistant.knowledgeBase.crops[this.language] || KisanAIAssistant.knowledgeBase.crops.en);
                break;
            case 'irrigation':
                response = this.getRandomResponse(KisanAIAssistant.knowledgeBase.irrigation[this.language] || KisanAIAssistant.knowledgeBase.irrigation.en);
                break;
            case 'disease':
                response = this.getRandomResponse(KisanAIAssistant.knowledgeBase.diseases[this.language] || KisanAIAssistant.knowledgeBase.diseases.en);
                break;
            case 'fertilizer':
                response = this.getRandomResponse(KisanAIAssistant.knowledgeBase.fertilizer[this.language] || KisanAIAssistant.knowledgeBase.fertilizer.en);
                break;
            case 'weather':
                response = this.getRandomResponse(KisanAIAssistant.knowledgeBase.weather[this.language] || KisanAIAssistant.knowledgeBase.weather.en);
                break;
            case 'scheme':
                response = this.getRandomResponse(KisanAIAssistant.knowledgeBase.schemes[this.language] || KisanAIAssistant.knowledgeBase.schemes.en);
                break;
            case 'greeting':
                response = 'Hello! 👋 How can I assist you with your farming today?';
                break;
            default:
                response = 'That\'s an interesting question! I can help you with crops, irrigation, diseases, fertilizers, weather, government schemes, and more. What would you like to know?';
        }
        
        return response;
    }
    
    // Get Random Response
    getRandomResponse(responses) {
        if (Array.isArray(responses)) {
            return responses[Math.floor(Math.random() * responses.length)];
        }
        return responses;
    }
    
    // Add to Conversation History
    addToHistory(message, sender) {
        this.conversationHistory.push({
            message: message,
            sender: sender,
            timestamp: new Date()
        });
    }
    
    // Get Conversation Summary
    getConversationSummary() {
        return this.conversationHistory.slice(-5);
    }
}

// ============ CHATBOT UI FUNCTIONS ============

function sendChatMessage(event) {
    event.preventDefault();
    
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addChatMessage(message, 'user');
    
    // Clear input
    input.value = '';
    input.focus();
    
    // Generate and send bot response
    const assistant = new KisanAIAssistant();
    assistant.language = localStorage.getItem('language') || 'en';
    
    setTimeout(() => {
        const response = assistant.generateResponse(message);
        addChatMessage(response, 'bot');
    }, 500);
}

function addChatMessage(message, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    
    if (sender === 'bot') {
        avatar.innerHTML = '<i class="fas fa-robot"></i>';
    } else {
        avatar.innerHTML = '<i class="fas fa-user"></i>';
    }
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const text = document.createElement('div');
    text.className = 'message-text';
    text.textContent = message;
    
    const time = document.createElement('div');
    time.className = 'message-time';
    const now = new Date();
    time.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
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

function openChatbot() {
    const chatbot = document.getElementById('chatbot');
    if (chatbot) {
        chatbot.classList.add('open');
        document.getElementById('chatInput').focus();
        
        // Show initial greeting if first time
        if (!localStorage.getItem('chatbotOpened')) {
            setTimeout(() => {
                const assistant = new KisanAIAssistant();
                addChatMessage('नमस्ते! 👋 मैं Kisan AI Assistant हूँ। आपकी कृषि संबंधी सभी समस्याओं में मदद कर सकता हूँ।', 'bot');
                localStorage.setItem('chatbotOpened', 'true');
            }, 300);
        }
    }
}

function closeChatbot() {
    const chatbot = document.getElementById('chatbot');
    if (chatbot) {
        chatbot.classList.remove('open');
    }
}

// Initialize Chatbot
document.addEventListener('DOMContentLoaded', () => {
    // Initialize KisanAIAssistant
    const assistant = new KisanAIAssistant();
    assistant.language = localStorage.getItem('language') || 'en';
    
    // Make globally accessible
    window.KisanAIAssistant = KisanAIAssistant;
    window.assistant = assistant;
});

// Export
window.sendChatMessage = sendChatMessage;
window.addChatMessage = addChatMessage;
window.openChatbot = openChatbot;
window.closeChatbot = closeChatbot;
