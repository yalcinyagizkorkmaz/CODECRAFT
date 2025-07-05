
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});


document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


const favoriteBtn = document.getElementById('favorite-btn');
let isFavorite = false;

favoriteBtn.addEventListener('click', () => {
    isFavorite = !isFavorite;
    
    if (isFavorite) {
        favoriteBtn.classList.add('active');
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Favorilerden Çıkar';
        
        
        favoriteBtn.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            favoriteBtn.style.animation = '';
        }, 500);
        
       
        showNotification('Breaking Bad favorilere eklendi! ❤️');
    } else {
        favoriteBtn.classList.remove('active');
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Favorilere Ekle';
        
      
        showNotification('Breaking Bad favorilerden çıkarıldı 💔');
    }
});


function showNotification(message) {
   
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
        color: #333;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
   
    document.body.appendChild(notification);
    
 
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
  
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}


window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);


document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});


const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);


document.querySelectorAll('.character-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});


document.querySelectorAll('.episode').forEach(episode => {
    episode.addEventListener('click', () => {
        episode.style.transform = 'translateX(10px) scale(1.02)';
        setTimeout(() => {
            episode.style.transform = 'translateX(10px)';
        }, 200);
    });
});

console.log('Breaking Bad Fan Site loaded successfully! 🎬');


let currentLanguage = 'tr';


function changeLanguage(lang) {
    currentLanguage = lang;
    
   
    const translatableElements = document.querySelectorAll('[data-tr][data-en]');
    
    translatableElements.forEach(element => {
        if (lang === 'tr') {
            element.textContent = element.getAttribute('data-tr');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });
    
   
    const currentLangSpan = document.querySelector('.current-lang');
    if (currentLangSpan) {
        currentLangSpan.textContent = lang.toUpperCase();
    }
    
  
    const dropdown = document.getElementById('language-dropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
    
   
    localStorage.setItem('preferredLanguage', lang);
}


document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        changeLanguage(savedLanguage);
    }
    

    const languageBtn = document.getElementById('language-btn');
    const languageDropdown = document.getElementById('language-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    
    if (languageBtn) {
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
        });
    }
    
    if (langOptions) {
        langOptions.forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                changeLanguage(lang);
            });
        });
    }
    
   
    document.addEventListener('click', function(e) {
        if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
            languageDropdown.classList.remove('active');
        }
    });
}); 