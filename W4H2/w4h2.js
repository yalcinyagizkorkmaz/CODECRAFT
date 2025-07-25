// Tek JS dosyası - Console'da çalıştır
console.log('🚀 UserManager başlatılıyor...');

// CSS stillerini ekle
const style = document.createElement('style');
style.textContent = `
    .user-app {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 999999;
        overflow-y: auto;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .user-container {
        max-width: 1200px;
        margin: 20px auto;
        padding: 30px;
        background: rgba(255, 255, 255, 0.95);
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
    }
    .header {
        text-align: center;
        margin-bottom: 40px;
    }
    .header h1 {
        font-size: 3rem;
        background: linear-gradient(45deg, #667eea, #764ba2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 15px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header p {
        font-size: 1.2rem;
        color: #666;
        margin: 0;
    }
    .loading {
        text-align: center;
        padding: 60px;
        font-size: 1.3rem;
        color: #667eea;
    }
    .loading h2 {
        margin-bottom: 15px;
        font-size: 2rem;
    }
    .error-message {
        background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        color: white;
        padding: 25px;
        border-radius: 15px;
        margin: 20px 0;
        text-align: center;
        box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
    }
    .users-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 25px;
        margin-top: 30px;
    }
    .user-card {
        background: white;
        border-radius: 20px;
        padding: 25px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transition: all 0.4s ease;
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
        background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
    }
    .user-card:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        border-color: #667eea;
    }
    .user-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .user-name {
        font-size: 1.4rem;
        font-weight: bold;
        color: #2c3e50;
        margin: 0;
        flex: 1;
    }
    .delete-btn {
        background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        margin-left: 15px;
        box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
    }
    .delete-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 20px rgba(255, 107, 107, 0.4);
    }
    .user-email {
        color: #667eea;
        font-size: 1.1rem;
        margin-bottom: 20px;
        padding: 10px;
        background: rgba(102, 126, 234, 0.1);
        border-radius: 8px;
        border-left: 4px solid #667eea;
    }
    .user-address {
        background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        padding: 20px;
        border-radius: 15px;
        border-left: 5px solid #667eea;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    .address-title {
        font-weight: bold;
        color: #2c3e50;
        margin-bottom: 12px;
        font-size: 1.1rem;
    }
    .address-details {
        color: #555;
        line-height: 1.6;
        font-size: 0.95rem;
    }
    .refresh-btn {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 15px;
        cursor: pointer;
        font-size: 1.1rem;
        margin: 30px auto;
        display: block;
        transition: all 0.3s ease;
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        font-weight: bold;
    }
    .refresh-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
    }
    .stats {
        display: flex;
        justify-content: space-around;
        background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        padding: 25px;
        border-radius: 20px;
        margin-bottom: 30px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    .stat-item {
        text-align: center;
        padding: 15px;
        border-radius: 15px;
        background: white;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }
    .stat-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }
    .stat-number {
        font-size: 2rem;
        font-weight: bold;
        background: linear-gradient(45deg, #667eea, #764ba2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 5px;
    }
    .stat-label {
        font-size: 0.9rem;
        color: #666;
        font-weight: 500;
    }
    .close-btn {
        position: fixed;
        top: 30px;
        right: 30px;
        background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        color: white;
        border: none;
        padding: 15px 20px;
        border-radius: 15px;
        cursor: pointer;
        font-size: 1.1rem;
        z-index: 1000000;
        transition: all 0.3s ease;
        box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
        font-weight: bold;
    }
    .close-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
    }
    @media (max-width: 768px) {
        .users-grid {
            grid-template-columns: 1fr;
        }
        .user-container {
            margin: 10px;
            padding: 20px;
        }
        .header h1 {
            font-size: 2rem;
        }
        .stats {
            flex-direction: column;
            gap: 15px;
        }
    }
`;
document.head.appendChild(style);

// Ana container oluştur
const app = document.createElement('div');
app.className = 'user-app';
app.innerHTML = `
    <button class="close-btn" onclick="this.parentElement.remove()">❌ Kapat</button>
    <div class="user-container">
        <div class="loading">
            <h2>Kullanıcılar yükleniyor...</h2>
            <p>Lütfen bekleyiniz...</p>
        </div>
    </div>
`;
document.body.appendChild(app);

// UserManager sınıfı
class UserManager {
    constructor() {
        this.apiUrl = 'https://jsonplaceholder.typicode.com/users';
        this.storageKey = 'users_data';
        this.storageExpiryKey = 'users_data_expiry';
        this.container = app.querySelector('.user-container');
        this.users = [];
        this.init();
    }

    init() {
        this.loadUsers();
    }

    async loadUsers() {
        try {
            // Önce localStorage'dan veri kontrolü
            const cachedData = this.getCachedData();
            if (cachedData) {
                this.users = cachedData;
                this.renderUsers();
                return;
            }

            this.showLoading();

            // Promise tabanlı veri çekme
            const users = await this.fetchUsersWithPromise();
            this.users = users;
            this.saveToLocalStorage(users);
            this.renderUsers();
        } catch (error) {
            this.showError('Veri yüklenirken hata: ' + error.message);
        }
    }

    // Promise fonksiyonu ile hata yönetimi
    fetchUsersWithPromise() {
        return new Promise((resolve, reject) => {
            fetch(this.apiUrl)
                .then(response => {
                    // HTTP durum kontrolü
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Veri kontrolü
                    if (!data || !Array.isArray(data)) {
                        throw new Error('Geçersiz veri formatı');
                    }
                    if (data.length === 0) {
                        throw new Error('Kullanıcı verisi bulunamadı');
                    }
                    resolve(data);
                })
                .catch(error => {
                    // Detaylı hata mesajları
                    let errorMessage = 'Bilinmeyen hata oluştu';
                    
                    if (error.name === 'TypeError' && error.message.includes('fetch')) {
                        errorMessage = 'API\'ye bağlanılamıyor. İnternet bağlantınızı kontrol edin.';
                    } else if (error.message.includes('HTTP 404')) {
                        errorMessage = 'API endpoint bulunamadı.';
                    } else if (error.message.includes('HTTP 500')) {
                        errorMessage = 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.';
                    } else if (error.message.includes('HTTP 403')) {
                        errorMessage = 'API erişimi reddedildi.';
                    } else if (error.message.includes('HTTP 429')) {
                        errorMessage = 'Çok fazla istek gönderildi. Lütfen bekleyin.';
                    } else if (error.message.includes('Geçersiz veri formatı')) {
                        errorMessage = 'API\'den gelen veri formatı geçersiz.';
                    } else if (error.message.includes('Kullanıcı verisi bulunamadı')) {
                        errorMessage = 'API\'den kullanıcı verisi alınamadı.';
                    } else {
                        errorMessage = `Veri çekme hatası: ${error.message}`;
                    }
                    
                    console.error('Promise hatası:', error);
                    reject(new Error(errorMessage));
                });
        });
    }

    getCachedData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            const expiry = localStorage.getItem(this.storageExpiryKey);

            if (data && expiry) {
                const expiryTime = parseInt(expiry, 10);
                if (Date.now() < expiryTime) {
                    return JSON.parse(data);
                }
            }
            return null;
        } catch (error) {
            console.error('localStorage okuma hatası:', error);
            return null;
        }
    }

    saveToLocalStorage(data) {
        try {
            const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // 1 gün sonra
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            localStorage.setItem(this.storageExpiryKey, expiryTime.toString());
        } catch (error) {
            console.error('localStorage kaydetme hatası:', error);
        }
    }

    showLoading() {
        this.container.innerHTML = `
            <div class="loading">
                <h2>Kullanıcılar yükleniyor...</h2>
                <p>Lütfen bekleyiniz...</p>
            </div>
        `;
    }

    showError(message) {
        this.container.innerHTML = `
            <div class="error-message">
                <h2>Hata!</h2>
                <p>${message}</p>
                <button class="refresh-btn" onclick="userManager.loadUsers()">Tekrar Dene</button>
            </div>
        `;
    }

    renderUsers() {
        if (!this.users || this.users.length === 0) {
            this.container.innerHTML = '<div class="loading"><h3>Kullanıcı bulunamadı</h3></div>';
            return;
        }

        const stats = this.calculateStats();
        
        this.container.innerHTML = `
            <div class="header">
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

    calculateStats() {
        const cities = new Set(this.users.map(user => user.address.city));
        const companies = new Set(this.users.map(user => user.company.name));
        
        return {
            total: this.users.length,
            cities: cities.size,
            companies: companies.size
        };
    }

    createUserCard(user) {
        return `
            <div class="user-card" data-user-id="${user.id}">
                <div class="user-header">
                    <h3 class="user-name">${user.name}</h3>
                    <button class="delete-btn" data-user-id="${user.id}">
                        🗑️ Sil
                    </button>
                </div>
                
                <div class="user-email">📧 ${user.email}</div>
                
                <div class="user-address">
                    <div class="address-title">📍 Adres Bilgileri</div>
                    <div class="address-details">
                        <strong>Şehir:</strong> ${user.address.city}<br>
                        <strong>Cadde:</strong> ${user.address.street}<br>
                        <strong>Suite:</strong> ${user.address.suite}<br>
                        <strong>Zipcode:</strong> ${user.address.zipcode}
                    </div>
                </div>
            </div>
        `;
    }

    addDeleteListeners() {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const userId = parseInt(button.getAttribute('data-user-id'));
                this.deleteUser(userId);
            });
        });
    }

    deleteUser(userId) {
        if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
            // Array'den kullanıcıyı kaldır
            this.users = this.users.filter(user => user.id !== userId);
            
            // localStorage'ı güncelle
            this.saveToLocalStorage(this.users);
            
            // Ekranı yenile
            this.renderUsers();
            
            // Başarı mesajı
            alert('Kullanıcı başarıyla silindi!');
            
            console.log(`Kullanıcı ID ${userId} silindi. Kalan kullanıcı sayısı: ${this.users.length}`);
        }
    }

    async refreshData() {
        try {
            // localStorage'ı temizle
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.storageExpiryKey);
            
            // Verileri yeniden yükle
            await this.loadUsers();
            
            alert('Veriler başarıyla yenilendi!');
        } catch (error) {
            this.showError('Veriler yenilenirken hata oluştu: ' + error.message);
        }
    }
}

// UserManager'ı başlat
const userManager = new UserManager();

console.log('✅ Uygulama başlatıldı! Sağ üstteki ❌ butonuna tıklayarak kapatabilirsin.');
