
class UserManager{
    constructor() {
        this.apiUrl = 'https://jsonplaceholder.typicode.com/users';
        this.storageKey = 'users_data';
        this.storageExpiryKey = 'users_expiry';
        this.container = document.querySelector('.ins-api-users');
        this.users = [];
        
        this.init();
    }

    // Sistem start 
    init() {
        this.createStyles();
        this.loadUsers();
    }

    // css 
    createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .ins-api-users {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            .users-header {
                text-align: center;
                margin-bottom: 30px;
                color: #333;
            }

            .users-header h1 {
                font-size: 2.5rem;
                margin-bottom: 10px;
                color: #2c3e50;
            }

            .users-header p {
                font-size: 1.1rem;
                color: #7f8c8d;
            }

            .loading {
                text-align: center;
                padding: 40px;
                font-size: 1.2rem;
                color: #3498db;
            }

            .error-message {
                background: #e74c3c;
                color: white;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
                text-align: center;
                font-weight: bold;
            }

            .users-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 20px;
                margin-top: 20px;
            }

            .user-card {
                background: white;
                border-radius: 12px;
                padding: 25px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
                border: 2px solid transparent;
                position: relative;
                overflow: hidden;
            }

            .user-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, #3498db, #9b59b6, #e74c3c);
            }

            .user-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                border-color: #3498db;
            }

            .user-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 15px;
            }

            .user-name {
                font-size: 1.4rem;
                font-weight: bold;
                color: #2c3e50;
                margin: 0;
                flex: 1;
            }

            .delete-btn {
                background: #e74c3c;
                color: white;
                border: none;
                padding: 8px 12px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.3s ease;
                margin-left: 10px;
            }

            .delete-btn:hover {
                background: #c0392b;
                transform: scale(1.05);
            }

            .user-email {
                color: #3498db;
                font-size: 1rem;
                margin-bottom: 15px;
                word-break: break-all;
            }

            .user-address {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                border-left: 4px solid #3498db;
            }

            .address-title {
                font-weight: bold;
                color: #2c3e50;
                margin-bottom: 8px;
                font-size: 0.95rem;
            }

            .address-details {
                color: #555;
                line-height: 1.5;
                font-size: 0.9rem;
            }

            .refresh-btn {
                background: #3498db;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 1rem;
                margin: 20px auto;
                display: block;
                transition: all 0.3s ease;
            }

            .refresh-btn:hover {
                background: #2980b9;
                transform: scale(1.05);
            }

            .stats {
                display: flex;
                justify-content: space-around;
                background: #ecf0f1;
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 20px;
            }

            .stat-item {
                text-align: center;
            }

            .stat-number {
                font-size: 1.5rem;
                font-weight: bold;
                color: #2c3e50;
            }

            .stat-label {
                font-size: 0.9rem;
                color: #7f8c8d;
            }

            .empty-state {
                text-align: center;
                padding: 60px 20px;
                color: #7f8c8d;
            }

            .empty-state h3 {
                font-size: 1.5rem;
                margin-bottom: 10px;
            }

            @media (max-width: 768px) {
                .users-grid {
                    grid-template-columns: 1fr;
                }
                
                .user-card {
                    padding: 20px;
                }
                
                .users-header h1 {
                    font-size: 2rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

   
    async loadUsers() {
        try {
            // local storage veri kontrolü
            const cachedData = this.getCachedData();
            
            if (cachedData) {
                this.users = cachedData;
                this.renderUsers();
                return;
            }

   
            this.showLoading();

            // api veri çekme
            const users = await this.fetchUsers();
            this.users = users;
            
        
            this.saveToLocalStorage(users);
            
        
            this.renderUsers();

        } catch (error) {
            this.showError('Kullanıcı verileri yüklenirken hata oluştu: ' + error.message);
            console.log("Kullanıcı verileri yüklenirken hata oluştu: " + error.message);
        }
    }

    //Hata yönetimi
    fetchUsers() {
        return new Promise((resolve, reject) => {
            fetch(this.apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getCachedData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            const expiry = localStorage.getItem(this.storageExpiryKey);
            
            if (!data || !expiry) {
                return null;
            }

            // süre kontrolu 1 gün 
            const now = new Date().getTime();
            const expiryTime = parseInt(expiry);
            
            if (now > expiryTime) {
               
                localStorage.removeItem(this.storageKey);
                localStorage.removeItem(this.storageExpiryKey);
                return null;
            }

            return JSON.parse(data);
        } catch (error) {
            console.error('localStorage okuma hatası:', error);
            return null;
        }
    }


    saveToLocalStorage(data) {
        try {
            //süre bir gün
            const expiry = new Date().getTime() + (24 * 60 * 60 * 1000); 
            
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            localStorage.setItem(this.storageExpiryKey, expiry.toString());
        } catch (error) {
            console.error('localStorage kaydetme hatası:', error);
        }
    }

    // Loading gösterimi
    showLoading() {
        this.container.innerHTML = `
            <div class="loading">
                <h2><strong>Kullanıcılar yükleniyor...</strong></h2>
                <p><strong>Lütfen bekleyiniz...</strong></p>
            </div>
        `;
    }

    // Hata mesajı
    showError(message) {
        this.container.innerHTML = `
            <div class="error-message">
                <h3><strong>Hata!</strong></h3>
                <p><strong>${message}</strong></p>
                <button class="refresh-btn" onclick="userManager.loadUsers()"><strong>Tekrar Dene</strong></button>
            </div>
        `;
    }

    // Kullanıcı render edilmesi (gösterilmesi arayüzde)
    renderUsers() {
        if (!this.users || this.users.length === 0) {
            console.log("Kullanıcı bulunamadı");
            this.container.innerHTML = `
                <div class="empty-state">
                    <h3>Kullanıcı bulunamadı</h3>
                    <p>Henüz hiç kullanıcı yüklenmemiş.</p>
                    <button class="refresh-btn" onclick="userManager.loadUsers()">Yenile</button>
                </div>
            `;
            return;
        }

        const stats = this.calculateStats();
        
        this.container.innerHTML = `
            <div class="users-header">
                <h1>👥 Kullanıcı Yönetimi</h1>
                <p>Toplam ${this.users.length} kullanıcı bulundu</p>
            </div>
            
            <div class="stats">
                <div class="stat-item">
                    <div class="stat-number">${stats.total}</div>
                    <div class="stat-label">Toplam Kullanıcı</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${stats.cities}</div>
                    <div class="stat-label">Farklı Şehir</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${stats.companies}</div>
                    <div class="stat-label">Farklı Şirket</div>
                </div>
            </div>
            
            <button class="refresh-btn" onclick="userManager.refreshData()">
                🔄 Verileri Yenile
            </button>
            
            <div class="users-grid">
                ${this.users.map(user => this.createUserCard(user)).join('')}
            </div>
        `;

        
        this.addDeleteListeners();
    }

    // İstatistikleri hesaplama
    calculateStats() {
        const cities = new Set(this.users.map(user => user.address.city));
        const companies = new Set(this.users.map(user => user.company.name));
        
        return {
            total: this.users.length,
            cities: cities.size,
            companies: companies.size
        };
    }

    // Kullanıcı kart yapısı oluşturma
    createUserCard(user) {
        return `
            <div class="user-card" data-user-id="${user.id}">
                <div class="user-header">
                    <h3 class="user-name">${this.sanitizeHtml(user.name)}</h3>
                    <button class="delete-btn" data-user-id="${user.id}">
                        🗑️ Sil
                    </button>
                </div>
                
                <div class="user-email">
                    📧 ${this.sanitizeHtml(user.email)}
                </div>
                
                <div class="user-address">
                    <div class="address-title">📍 Adres Bilgileri</div>
                    <div class="address-details">
                        <strong>Şehir:</strong> ${this.sanitizeHtml(user.address.city)}<br>
                        <strong>Cadde:</strong> ${this.sanitizeHtml(user.address.street)}<br>
                        <strong>Suite:</strong> ${this.sanitizeHtml(user.address.suite)}<br>
                        <strong>Zipcode:</strong> ${this.sanitizeHtml(user.address.zipcode)}
                    </div>
                </div>
            </div>
        `;
    }

    // gelen veriyi güvenli bir şekilde gsötermek için
    sanitizeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

  
    addDeleteListeners() {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const userId = parseInt(button.getAttribute('data-user-id'));
                this.deleteUser(userId);
            });
        });
    }

  //Özel alet kullanıcı silme onayı için 
    deleteUser(userId) {
      
        const alertOverlay = document.createElement('div');
        alertOverlay.className = 'alert-overlay';
        alertOverlay.innerHTML = `
            <div class="alert-box">
                <div class="alert-icon">
                    <div class="icon-container">
                        <span class="warning-icon">⚠️</span>
                    </div>
                </div>
                <div class="alert-header">
                    <h3>Kullanıcı Silme Onayı</h3>
                    <p class="alert-subtitle">Bu işlem geri alınamaz!</p>
                </div>
                <div class="alert-content">
                    <p>Bu kullanıcıyı kalıcı olarak silmek istediğinizden emin misiniz?</p>
                    <div class="warning-details">
                        <div class="warning-item">
                            <span class="warning-dot">•</span>
                            <span>Kullanıcı verileri tamamen silinecek</span>
                        </div>
                        <div class="warning-item">
                            <span class="warning-dot">•</span>
                            <span>Bu işlem geri alınamaz</span>
                        </div>
                        <div class="warning-item">
                            <span class="warning-dot">•</span>
                            <span>Yerel depolama güncellenecek</span>
                        </div>
                    </div>
                </div>
                <div class="alert-buttons">
                    <button class="alert-btn cancel-btn" onclick="this.closest('.alert-overlay').remove()">
                        <span class="btn-icon">✋</span>
                        <span class="btn-text">İptal Et</span>
                    </button>
                    <button class="alert-btn confirm-btn" onclick="userManager.confirmDeleteUser(${userId})">
                        <span class="btn-icon">🗑️</span>
                        <span class="btn-text">Sil</span>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(alertOverlay);
        
        // ESC tuşu ile kapatma
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                alertOverlay.remove();
                document.removeEventListener('keydown', handleEsc);
            }
        };
        document.addEventListener('keydown', handleEsc);
        
        // Overlay'e tıklayarak kapatma
        alertOverlay.addEventListener('click', (e) => {
            if (e.target === alertOverlay) {
                alertOverlay.remove();
                document.removeEventListener('keydown', handleEsc);
            }
        });
        
        // Enter tuşu ile onaylama
        const handleEnter = (e) => {
            if (e.key === 'Enter') {
                userManager.confirmDeleteUser(userId);
                document.removeEventListener('keydown', handleEnter);
            }
        };
        document.addEventListener('keydown', handleEnter);
    }
    
    // Silme işlemini onaylama
    confirmDeleteUser(userId) {
        // Array den kaldırma
        this.users = this.users.filter(user => user.id !== userId);
        
        // localStorage'ı güncelle
        this.saveToLocalStorage(this.users);
        
        // UI'ı güncelle
        this.renderUsers();
        
        // Alert'i kapat
        const alertOverlay = document.querySelector('.alert-overlay');
        if (alertOverlay) {
            alertOverlay.remove();
        }
        
        // Başarı mesajı
        this.showNotification('Kullanıcı başarıyla silindi!', 'success');
    }

 
    async refreshData() {
        try {
         
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.storageExpiryKey);
            
          
            await this.loadUsers();
            
            this.showNotification('Veriler başarıyla yenilendi!', 'success');
        } catch (error) {
            this.showError('Veriler yenilenirken hata oluştu: ' + error.message);
        }
    }

    // Bildirim gösterme
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            background: ${type === 'success' ? '#27ae60' : '#3498db'};
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // 4 ssn sonra kaldırmak 
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.4s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// animasyon css
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes scaleIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    
    /* Alert Styles */
    .alert-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    }
    
    .alert-box {
        background: white;
        border-radius: 20px;
        padding: 0;
        max-width: 450px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        animation: scaleIn 0.3s ease;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .alert-icon {
        background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        padding: 30px 20px 20px;
        text-align: center;
    }
    
    .icon-container {
        display: inline-block;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
    }
    
    .warning-icon {
        font-size: 30px;
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    .alert-header {
        background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        color: white;
        padding: 0 30px 30px;
        text-align: center;
        margin: 0;
    }
    
    .alert-header h3 {
        margin: 0 0 10px 0;
        font-size: 24px;
        font-weight: bold;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .alert-subtitle {
        margin: 0;
        font-size: 14px;
        opacity: 0.9;
        font-weight: 500;
    }
    
    .alert-content {
        padding: 30px;
        text-align: left;
        background: white;
    }
    
    .alert-content p {
        margin: 0 0 20px 0;
        font-size: 16px;
        line-height: 1.6;
        color: #333;
        text-align: center;
    }
    
    .warning-details {
        background: #fff5f5;
        border: 1px solid #fed7d7;
        border-radius: 12px;
        padding: 20px;
        margin-top: 20px;
    }
    
    .warning-item {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        font-size: 14px;
        color: #c53030;
    }
    
    .warning-item:last-child {
        margin-bottom: 0;
    }
    
    .warning-dot {
        color: #e53e3e;
        font-weight: bold;
        margin-right: 10px;
        font-size: 16px;
    }
    
    .alert-buttons {
        display: flex;
        gap: 15px;
        padding: 0 30px 30px;
        background: white;
    }
    
    .alert-btn {
        flex: 1;
        padding: 15px 20px;
        border: none;
        border-radius: 12px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        position: relative;
        overflow: hidden;
    }
    
    .alert-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
    }
    
    .alert-btn:hover::before {
        left: 100%;
    }
    
    .cancel-btn {
        background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        color: #6c757d;
        border: 2px solid #dee2e6;
    }
    
    .cancel-btn:hover {
        background: linear-gradient(135deg, #e9ecef, #dee2e6);
        border-color: #adb5bd;
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    }
    
    .confirm-btn {
        background: linear-gradient(135deg, #dc3545, #c82333);
        color: white;
        border: 2px solid #dc3545;
    }
    
    .confirm-btn:hover {
        background: linear-gradient(135deg, #c82333, #bd2130);
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(220, 53, 69, 0.4);
    }
    
    .btn-icon {
        font-size: 16px;
    }
    
    .btn-text {
        font-weight: 600;
    }
`;
document.head.appendChild(animationStyle);

// Sistem başlatma (kullanıcı yönetimi sistemi)
const userManager = new UserManager();
