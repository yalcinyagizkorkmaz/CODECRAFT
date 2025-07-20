// Mini E-Ticaret / Ürün Kataloğu Uygulaması
// Fake Store API: https://fakestoreapi.com/products

// CSS stillerini ekle
function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            color: white;
        }

        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .controls {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }

        .btn {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            margin: 0 5px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            min-width: 120px;
            height: 45px;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        .search-section, .load-section {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .search-input {
            padding: 10px 15px;
            border: none;
            border-radius: 20px;
            text-align: center;
            font-size: 16px;
            width: 180px;
            background: rgba(255,255,255,0.9);
            color: #333;
            flex-shrink: 0;
            height: 45px;
        }

        .search-input:focus {
            outline: none;
            box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
        }

        .product-count {
            padding: 10px;
            border: none;
            border-radius: 20px;
            text-align: center;
            font-size: 16px;
            margin: 0 5px;
            width: 80px;
            flex-shrink: 0;
            height: 45px;
        }

        .loading {
            text-align: center;
            color: white;
            font-size: 18px;
            margin: 20px 0;
        }

        .spinner {
            border: 4px solid rgba(255,255,255,0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .shake {
            animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }

        .bounce {
            animation: bounce 0.5s ease-in-out;
        }

        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        /* Modal CSS Stilleri */
        .modal-content {
            padding: 20px;
            max-width: 700px;
            background: white;
            border-radius: 15px;
        }

        .modal-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            align-items: start;
        }

        .modal-image {
            text-align: center;
        }

        .modal-image img {
            width: 300px;
            height: 300px;
            object-fit: contain;
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            background: white;
            padding: 20px;
        }

        .modal-details h2 {
            color: #333;
            margin-bottom: 15px;
            font-size: 1.5rem;
        }

        .modal-details p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 20px;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
        }

        .modal-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }

        .price-box, .rating-box {
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            color: white;
        }

        .price-box {
            background: #667eea;
        }

        .rating-box {
            background: #28a745;
        }

        .price-box strong, .rating-box strong {
            display: block;
            margin-bottom: 5px;
        }

        .price-box span {
            font-size: 1.2rem;
            font-weight: bold;
        }

        .category-box {
            background: #ffc107;
            color: #333;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 20px;
        }

        .category-box strong {
            display: block;
            margin-bottom: 5px;
        }

        .category-box span {
            text-transform: capitalize;
        }

        .modal-add-to-cart {
            width: 100%;
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 15px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .modal-add-to-cart:hover {
            background: #ff5252;
            transform: translateY(-2px);
        }

        .main-content {
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 30px;
        }

        .product-section {
            background: rgba(255,255,255,0.1);
            border-radius: 15px;
            padding: 30px;
        }

        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }

        .product-card {
            background: white;
            border-radius: 15px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 350px;
        }

        /* Hover efektleri jQuery ile yönetilecek */
        .product-card.hovered {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
            border: 2px solid #667eea;
        }

        .product-card.active {
            transform: scale(1.02);
            box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4);
        }

        .product-card img {
            width: 150px;
            height: 150px;
            object-fit: contain;
            margin-bottom: 15px;
            border-radius: 10px;
            transition: all 0.3s ease;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }

        .product-card.hovered img {
            transform: scale(1.1);
        }

        .product-card h3 {
            color: #333;
            margin-bottom: 10px;
            font-size: 1.1rem;
            line-height: 1.4;
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .product-card .price {
            color: #667eea;
            font-weight: bold;
            font-size: 1.3rem;
            margin-bottom: 8px;
            text-align: center;
        }

        .product-card .rating {
            color: #ffc107;
            margin-bottom: 15px;
            font-weight: bold;
            text-align: center;
        }

        .product-card button {
            background: #667eea;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
            margin: 5px;
            transition: all 0.3s ease;
            width: 100%;
            max-width: 200px;
        }

        .product-card button.hovered {
            background: #ff6b6b;
            transform: scale(1.05);
        }

        .cart-section {
            background: rgba(255,255,255,0.1);
            border-radius: 15px;
            padding: 20px;
            color: white;
            height: fit-content;
        }

        .cart-section h2 {
            text-align: center;
            margin-bottom: 20px;
            font-size: 1.5rem;
        }

        .cart-summary {
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 20px;
            text-align: center;
        }

        .cart-summary p {
            margin-bottom: 10px;
            font-size: 1.1rem;
        }

        .cart-items {
            max-height: 300px;
            overflow-y: auto;
        }

        .cart-item {
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            padding: 10px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
        }

        .cart-item.updated {
            background: rgba(40, 167, 69, 0.2);
            transform: scale(1.02);
            animation: pulse 0.6s ease;
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        .cart-item-actions {
            display: flex;
            align-items: center;
        }

        .cart-item img {
            border-radius: 5px;
        }

        .cart-item-details {
            flex: 1;
        }

        .cart-item-details h4 {
            font-size: 0.9rem;
            margin-bottom: 5px;
        }

        .cart-item-details p {
            font-size: 0.8rem;
            color: #ddd;
        }

        .remove-item {
            background: #ff6b6b;
            color: white;
            border: none;
            border-radius: 50%;
            width: 25px;
            height: 25px;
            cursor: pointer;
            font-size: 12px;
        }

        .slider-section {
            background: rgba(255,255,255,0.1);
            border-radius: 15px;
            padding: 30px;
            margin-top: 40px;
            grid-column: 1 / -1;
        }

        /* Slick Slider Özel Stilleri */
        .slick-slide {
            display: flex !important;
            justify-content: center;
            align-items: stretch;
            height: auto;
        }

        .slick-track {
            display: flex !important;
            align-items: stretch;
        }

        .slick-list {
            overflow: hidden;
        }

        .slick-slide > div {
            height: 100%;
            display: flex;
        }

        .slider-section h2 {
            color: white;
            text-align: center;
            margin-bottom: 20px;
            font-size: 1.8rem;
        }

        .slider-card {
            background: white;
            border-radius: 10px;
            padding: 15px;
            margin: 0 10px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            height: 250px;
            width: 100%;
        }

        .slider-card img {
            width: 100px;
            height: 100px;
            object-fit: contain;
            border-radius: 10px;
            margin-bottom: 10px;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }

        .slider-card h4 {
            color: #333;
            margin-bottom: 8px;
            font-size: 1rem;
            line-height: 1.3;
            text-align: center;
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 40px;
        }

        .slider-card .price {
            color: #667eea;
            font-weight: bold;
            font-size: 1.1rem;
            margin-bottom: 8px;
            text-align: center;
            order: 1;
        }

        .slider-card .rating {
            color: #ffc107;
            font-weight: bold;
            text-align: center;
            order: 2;
        }

        /* Slider kartı hover efekti */
        .slider-card.hovered {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .slider-card .price-info {
            margin-top: auto;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        @media (max-width: 768px) {
            .main-content {
                grid-template-columns: 1fr;
            }
            
            .product-grid {
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            }
            
            .product-card img {
                width: 120px;
                height: 120px;
            }
            
            .product-card {
                min-height: 300px;
            }
            
            .slider-card img {
                width: 80px;
                height: 80px;
            }
            
            .slider-card {
                height: 200px;
                padding: 10px;
            }
        }
    `;
    document.head.appendChild(style);
}

// HTML yapısını oluştur
function createHTMLStructure() {
    // Sayfa başlığını ayarla
    document.title = 'Mini E-Ticaret / Ürün Kataloğu';
    
    document.body.innerHTML = '';
    
    const container = document.createElement('div');
    container.className = 'container';
    
    container.innerHTML = `
        <div class="header">
            <h1>🛍️ Mini E-Ticaret / Ürün Kataloğu</h1>
         
        </div>

        <div class="controls">
            <input type="number" id="productSearch" class="search-input" placeholder="Ürün ID'si girin (1-20)" min="1" max="20">
            <button id="searchProduct" class="btn">🔍 Ürün Ara</button>
            <input type="number" id="productCount" class="product-count" placeholder="8" min="1" max="20" value="8">
            <button id="loadProducts" class="btn">📦 Ürünleri Yükle</button>
            <button id="clearCart" class="btn">🗑️ Sepeti Temizle</button>
        </div>

        <div id="loading" class="loading" style="display: none;">
            <div class="spinner"></div>
            <p>Ürünler yükleniyor...</p>
        </div>

        <div class="main-content">
            <div class="product-section">
                <h2 style="color: white; text-align: center; margin-bottom: 20px;">🛍️ Ürün Kataloğu</h2>
                <div id="productGrid" class="product-grid">
                    <div style="text-align: center; color: white; font-size: 18px; padding: 50px; grid-column: 1 / -1;">
                        <p>👆 Yukarıdaki "Ürünleri Yükle" butonuna tıklayarak ürün kataloğunu görüntüleyin!</p>
                    </div>
                </div>
            </div>

            <div class="cart-section">
                <h2>🛒 Sepetim</h2>
                <div class="cart-summary">
                    <p>Toplam Ürün: <span id="cartCount">0</span></p>
                    <p>Toplam Tutar: <span id="cartTotal">$0.00</span></p>
                </div>
                <div id="cartItems" class="cart-items">
                    <div style="text-align: center; color: #ddd; padding: 20px;">
                        <p>🛒 Sepet boş</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="slider-section">
            <h2>🎠 Ürün Slider</h2>
            <div id="productSlider" class="user-slider">
                <div style="text-align: center; color: white; font-size: 16px; padding: 30px;">
                    <p>🎠 Ürün Slider</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(container);
}

// Kütüphaneleri yükle
function loadLibraries() {
    return new Promise((resolve) => {
        // jQuery yükle
        if (typeof jQuery === 'undefined') {
            const jqueryScript = document.createElement('script');
            jqueryScript.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
            jqueryScript.onload = () => {
                console.log('jQuery yüklendi');
                loadFancybox();
            };
            document.head.appendChild(jqueryScript);
        } else {
            console.log('jQuery zaten yüklü');
            loadFancybox();
        }
        
        function loadFancybox() {
            // Fancybox CSS yükle
            const fancyboxCSS = document.createElement('link');
            fancyboxCSS.rel = 'stylesheet';
            fancyboxCSS.href = 'https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css';
            fancyboxCSS.onload = () => console.log('Fancybox CSS yüklendi');
            fancyboxCSS.onerror = () => console.error('Fancybox CSS yüklenemedi');
            document.head.appendChild(fancyboxCSS);
            
            // Fancybox JS yükle
            const fancyboxScript = document.createElement('script');
            fancyboxScript.src = 'https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js';
            fancyboxScript.onload = () => {
                console.log('Fancybox JS yüklendi');
                // Fancybox'ın tamamen yüklenmesini bekle
                setTimeout(() => {
                    if (typeof $.fancybox !== 'undefined') {
                        console.log('Fancybox hazır ve kullanılabilir');
                        // Fancybox ayarlarını yap
                        $.fancybox.defaults = {
                            closeClickOutside: false,
                            closeBtn: true,
                            touch: false,
                            autoFocus: false,
                            hideScrollbar: false,
                            helpers: {
                                overlay: {
                                    locked: false
                                }
                            }
                        };
                        loadSlickSlider();
                    } else {
                        console.error('Fancybox yüklenemedi');
                        loadSlickSlider();
                    }
                }, 1000); // Daha uzun bekleme süresi
            };
            fancyboxScript.onerror = () => {
                console.error('Fancybox JS yüklenemedi');
                loadSlickSlider();
            };
            document.head.appendChild(fancyboxScript);
        }
        
        function loadSlickSlider() {
            // Slick CSS yükle
            const slickCSS = document.createElement('link');
            slickCSS.rel = 'stylesheet';
            slickCSS.href = 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css';
            document.head.appendChild(slickCSS);
            
            const slickThemeCSS = document.createElement('link');
            slickThemeCSS.rel = 'stylesheet';
            slickThemeCSS.href = 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css';
            document.head.appendChild(slickThemeCSS);
            
            // Slick JS yükle
            const slickScript = document.createElement('script');
            slickScript.src = 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js';
            slickScript.onload = () => {
                console.log('Slick Slider yüklendi');
                resolve();
            };
            document.head.appendChild(slickScript);
        }
    });
}

// Uygulamayı başlat
function startApp() {
    // Document ready kontrolü
    if (typeof $ !== 'undefined') {
        $(document).ready(function() {
            console.log('startApp - Document ready kontrolü geçildi');
            initStartApp();
        });
    } else {
        console.log('startApp - jQuery yok, doğrudan başlatılıyor');
        initStartApp();
    }
}

function initStartApp() {
    let allProducts = [];
    let cart = [];
    
    // LocalStorage'dan sepet verilerini yükle
    function loadCartFromStorage() {
        try {
            const savedCart = localStorage.getItem('miniEticaretCart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
                console.log('Sepet localStorage\'dan yüklendi:', cart.length, 'ürün');
                
                // DOM'u güncelle
                const cartItems = document.getElementById('cartItems');
                cartItems.innerHTML = '';
                
                if (cart.length > 0) {
                    cart.forEach(item => {
                        addProductToCartDOM(item);
                    });
                } else {
                    cartItems.innerHTML = `
                        <div style="text-align: center; color: #666; padding: 20px;">
                            <p>🛒 Sepet boş</p>
                        </div>
                    `;
                }
                
                updateCartDisplay();
            }
        } catch (error) {
            console.error('LocalStorage sepet yükleme hatası:', error);
            cart = [];
        }
    }
    
    // Sepeti localStorage'a kaydet
    function saveCartToStorage() {
        try {
            localStorage.setItem('miniEticaretCart', JSON.stringify(cart));
            console.log('Sepet localStorage\'a kaydedildi:', cart.length, 'ürün');
        } catch (error) {
            console.error('LocalStorage sepet kaydetme hatası:', error);
        }
    }
    
    // Debounce fonksiyonu
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

    // Throttle fonksiyonu
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Bildirim gösterme fonksiyonu
    function showNotification(message, type = 'info') {
        console.log('Bildirim gösteriliyor:', message);
        
        // Bildirim container'ı oluştur
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">×</button>
            </div>
        `;
        
        // CSS stilleri
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
            max-width: 300px;
            font-size: 14px;
            font-weight: 500;
        `;
        
        // İçerik stilleri
        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
        `;
        
        // Kapatma butonu stilleri
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.2s ease;
        `;
        
        // Kapatma butonu hover efekti
        closeBtn.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255,255,255,0.2)';
        });
        
        closeBtn.addEventListener('mouseleave', function() {
            this.style.background = 'none';
        });
        
        // Kapatma butonu event listener
        closeBtn.addEventListener('click', function() {
            hideNotification(notification);
        });
        
        // Body'ye ekle
        document.body.appendChild(notification);
        
        // Animasyonla göster
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 100);
        
        // Otomatik kapatma (5 saniye)
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
        
        return notification;
    }
    
    // Bildirimi gizleme fonksiyonu
    function hideNotification(notification) {
        if (notification && notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }

    // AJAX ile ürün arama fonksiyonu
    function searchProductById(productId) {
        if (!productId || productId < 1 || productId > 20) {
            alert('Lütfen 1-20 arasında geçerli bir ürün ID\'si girin!');
            return;
        }

        // Loading göster
        const productGrid = document.getElementById('productGrid');
        productGrid.innerHTML = `
            <div style="text-align: center; color: white; font-size: 18px; padding: 50px; grid-column: 1 / -1;">
                <div class="spinner"></div>
                <p>Ürün aranıyor... ID: ${productId}</p>
            </div>
        `;

        // AJAX isteği
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ürün bulunamadı!');
                }
                return response.json();
            })
            .then(product => {
                console.log('Aranan ürün:', product);
                
                // Ürünü göster
                productGrid.innerHTML = '';
                const productCard = createProductCard(product, 0);
                productGrid.appendChild(productCard);
                
                // Slider'ı güncelle
                updateProductSlider([product]);
                
                // Başarı mesajı
                if (typeof $ !== 'undefined') {
                    $('<div>')
                        .addClass('success-message')
                        .text(`✅ Ürün bulundu: ${product.title}`)
                        .css({
                            position: 'fixed',
                            top: '20px',
                            right: '20px',
                            background: '#28a745',
                            color: 'white',
                            padding: '15px',
                            borderRadius: '10px',
                            zIndex: '10000',
                            animation: 'slideInRight 0.5s ease'
                        })
                        .appendTo('body')
                        .delay(3000)
                        .fadeOut(500, function() {
                            $(this).remove();
                        });
                }
            })
            .catch(error => {
                console.error('Arama hatası:', error);
                productGrid.innerHTML = `
                    <div style="text-align: center; color: white; font-size: 18px; padding: 50px; grid-column: 1 / -1;">
                        <p>❌ Hata: ${error.message}</p>
                        <button class="btn" onclick="loadProducts()">📦 Tüm Ürünleri Yükle</button>
                    </div>
                `;
            });
    }

    // Debounced arama fonksiyonu
    const debouncedSearch = debounce(searchProductById, 500);

    // Uygulama başladığında sepeti yükle
    loadCartFromStorage();
    
    // Ürünleri yükle butonu
    document.getElementById('loadProducts').addEventListener('click', function() {
        if (typeof $ !== 'undefined') {
            $(this)
                .animate({ scale: 0.95 }, 100)
                .fadeTo(100, 0.8)
                .animate({ scale: 1 }, 100)
                .fadeTo(100, 1, function() {
                    loadProducts();
                });
        } else {
            this.classList.add('shake');
            setTimeout(() => this.classList.remove('shake'), 500);
            loadProducts();
        }
    });
    
    // Sepeti temizle butonu
    document.getElementById('clearCart').addEventListener('click', function() {
        if (typeof $ !== 'undefined') {
            $(this)
                .animate({ scale: 0.95 }, 100)
                .fadeTo(100, 0.7)
                .animate({ scale: 1 }, 100)
                .fadeTo(100, 1, function() {
                    clearCart();
                });
        } else {
            this.classList.add('bounce');
            setTimeout(() => this.classList.remove('bounce'), 500);
            clearCart();
        }
    });
    
    // Arama event listener'ları
    document.getElementById('searchProduct').addEventListener('click', function() {
        const productId = parseInt(document.getElementById('productSearch').value);
        
        if (typeof $ !== 'undefined') {
            $(this)
                .animate({ scale: 0.9 }, 150)
                .fadeTo(150, 0.6)
                .animate({ scale: 1 }, 150)
                .fadeTo(150, 1, function() {
                    searchProductById(productId);
                });
        } else {
            searchProductById(productId);
        }
    });
    
    // Debounced input event
    document.getElementById('productSearch').addEventListener('input', function() {
        const productId = parseInt(this.value);
        if (productId && productId >= 1 && productId <= 20) {
            debouncedSearch(productId);
        }
    });
    
    // Enter tuşu ile arama
    document.getElementById('productSearch').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const productId = parseInt(this.value);
            searchProductById(productId);
        }
    });
    
    // Ürünleri yükleme fonksiyonu
    function loadProducts() {
        const productCount = document.getElementById('productCount').value || 8;
        
        document.getElementById('loading').style.display = 'block';
        document.getElementById('productGrid').innerHTML = '';
        
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                console.log('Ürünler yüklendi:', data.length);
                
                allProducts = data.slice(0, productCount);
                displayProducts(allProducts);
                updateProductSlider(allProducts);
                
                document.getElementById('loading').style.display = 'none';
            })
            .catch(error => {
                console.error('Ürün yükleme hatası:', error);
                document.getElementById('loading').style.display = 'none';
                alert('Ürünler yüklenirken hata oluştu. Lütfen tekrar deneyin.');
            });
    }
    
    // Ürünleri görüntüleme
    function displayProducts(products) {
        const productGrid = document.getElementById('productGrid');
        
        products.forEach((product, index) => {
            const productCard = createProductCard(product, index);
            productGrid.appendChild(productCard);
            
            // jQuery animasyonları ekle
            if (typeof $ !== 'undefined') {
                $(productCard)
                    .hide()
                    .delay(index * 100) // Staggered animation
                    .fadeIn(800)
                    .slideDown(600);
            }
        });
    }
    
    // Ürün kartı oluşturma
    function createProductCard(product, index) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-product-index', index);
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title.substring(0, 50)}${product.title.length > 50 ? '...' : ''}</h3>
            <div class="price">$${product.price}</div>
            <div class="rating">⭐ ${product.rating.rate} (${product.rating.count})</div>
            <button class="detail-btn">👆 Detayları Göster</button>
            <button class="add-to-cart-btn">🛒 Sepete Ekle</button>
        `;
        
        // jQuery hover efektleri ekle
        if (typeof $ !== 'undefined') {
            // Ürün kartı hover efekti
            $(card).hover(
                function() {
                    $(this).addClass('hovered');
                },
                function() {
                    $(this).removeClass('hovered');
                }
            );
            
            // Buton hover efektleri - fadeTo ve toggleClass ile
            $(card).find('button').hover(
                function() {
                    $(this)
                        .fadeTo(200, 0.8)
                        .toggleClass('active', true)
                        .animate({
                            transform: 'scale(1.05)',
                            boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
                        }, 200);
                },
                function() {
                    $(this)
                        .fadeTo(200, 1)
                        .toggleClass('active', false)
                        .animate({
                            transform: 'scale(1)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                        }, 200);
                }
            );
        }
        
        // Detay butonu
        card.querySelector('.detail-btn').addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Detay butonu tıklandı:', product.title);
            
            if (typeof $ !== 'undefined') {
                $(this)
                    .animate({ scale: 0.95 }, 100)
                    .fadeTo(100, 0.7)
                    .animate({ scale: 1 }, 100)
                    .fadeTo(100, 1, function() {
                        showProductModal(product);
                    });
            } else {
                this.style.transform = 'scale(0.95)';
                this.style.background = '#ff6b6b';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    this.style.background = '#667eea';
                    showProductModal(product);
                }, 150);
            }
        });
        
        // Sepete ekle butonu
        card.querySelector('.add-to-cart-btn').addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Sepete ekleniyor:', product.title);
            addToCart(product);
            
            if (typeof $ !== 'undefined') {
                $(this)
                    .animate({ scale: 1.1 }, 200)
                    .fadeTo(200, 0.8)
                    .text('✅ Eklendi!')
                    .css('background', '#28a745')
                    .animate({ scale: 1 }, 200)
                    .fadeTo(200, 1)
                    .delay(1500)
                    .animate({ scale: 0.9 }, 100)
                    .text('🛒 Sepete Ekle')
                    .css('background', '#ff6b6b')
                    .animate({ scale: 1 }, 100);
            } else {
                this.textContent = '✅ Eklendi!';
                this.style.background = '#28a745';
                setTimeout(() => {
                    this.textContent = '🛒 Sepete Ekle';
                    this.style.background = '#ff6b6b';
                }, 2000);
            }
        });
        
        return card;
    }
    
    // Ürün modalı gösterme
    function showProductModal(product) {
        console.log('showProductModal çağrıldı:', product.title);
        
        // jQuery ve Fancybox kontrolü
        if (typeof jQuery === 'undefined') {
            console.error('jQuery yüklenmemiş!');
            alert('jQuery kütüphanesi yüklenemedi. Lütfen sayfayı yenileyin.');
            return;
        }
        
        if (typeof $.fancybox === 'undefined') {
            console.error('Fancybox yüklenmemiş!');
            alert('Modal kütüphanesi yüklenemedi. Lütfen sayfayı yenileyin.');
            return;
        }
        
        // Önceki modal'ı temizle
        if ($('#temp-modal-content').length > 0) {
            $('#temp-modal-content').remove();
        }
        
        // HTML karakterlerini tamamen temizle ve güvenli hale getir
        const cleanTitle = product.title
            .replace(/[<>]/g, '')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/&/g, '&amp;');
            
        const cleanDescription = product.description
            .replace(/[<>]/g, '')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/&/g, '&amp;');
            
        const cleanCategory = product.category
            .replace(/[<>]/g, '')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/&/g, '&amp;');
        
        // Basit ve temiz modal içeriği
        const modalContent = `
            <div class="modal-content">
                <div class="modal-grid">
                    <div class="modal-image">
                        <img src="${product.image}" alt="${cleanTitle}">
                    </div>
                    <div class="modal-details">
                        <h2>${cleanTitle}</h2>
                        <p>${cleanDescription}</p>
                        <div class="modal-info">
                            <div class="price-box">
                                <strong>Fiyat</strong>
                                <span>$${product.price}</span>
                            </div>
                            <div class="rating-box">
                                <strong>Değerlendirme</strong>
                                <span>${product.rating.rate} (${product.rating.count})</span>
                            </div>
                        </div>
                        <div class="category-box">
                            <strong>Kategori</strong>
                            <span>${cleanCategory}</span>
                        </div>
                        <button class="modal-add-to-cart">Sepete Ekle - $${product.price}</button>
                    </div>
                </div>
            </div>
        `;
        
        try {
            console.log('Fancybox modal açılıyor...');
            
            // Önceki modal'ı temizle
            if ($('#temp-modal-content').length > 0) {
                $('#temp-modal-content').remove();
            }
            
            // Modal içeriğini oluştur
            const modalDiv = $('<div>').attr('id', 'temp-modal-content').html(modalContent);
            $('body').append(modalDiv);
            
            // Event listener'ı ekle
            $('#temp-modal-content .modal-add-to-cart').on('click', function() {
                console.log('Modal sepete ekle butonu tıklandı');
                addToCart(product);
                $(this).text('✅ Sepete Eklendi!').css('background', '#28a745').prop('disabled', true);
                setTimeout(() => {
                    $.fancybox.close();
                }, 1500);
            });
            
            // Fancybox'ı aç
            $.fancybox.open({
                src: '#temp-modal-content',
                type: 'inline',
                opts: {
                    closeClickOutside: false,
                    closeBtn: true,
                    touch: false,
                    autoFocus: false,
                    hideScrollbar: false,
                    helpers: {
                        overlay: {
                            locked: false
                        }
                    },
                    afterClose: function() {
                        console.log('Modal kapatıldı, temizleniyor...');
                        $('#temp-modal-content').remove();
                    }
                }
            });
            
            console.log('Fancybox modal başarıyla açıldı!');
            
        } catch (error) {
            console.error('Fancybox modal açma hatası:', error);
            $('#temp-modal-content').remove();
            
            // Fancybox'ı tekrar deneyelim
            setTimeout(() => {
                try {
                    console.log('Fancybox tekrar deneniyor...');
                    $.fancybox.open({
                        src: modalContent,
                        type: 'html',
                        opts: {
                            closeClickOutside: false,
                            closeBtn: true,
                            touch: false,
                            autoFocus: false
                        }
                    });
                } catch (retryError) {
                    console.error('Fancybox tekrar deneme hatası:', retryError);
                    alert('Modal açılamadı. Lütfen sayfayı yenileyin.');
                }
            }, 100);
        }
    }
    

    
    // Sepete ekleme
    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        // DOM'a ürün ekleme
        addProductToCartDOM(product);
        
        updateCartDisplay();
        saveCartToStorage(); // LocalStorage'a kaydet
        console.log('Sepete eklendi:', product.title);
        
        // Sağ üst köşede bildirim göster
        showNotification(`✅ Ürün sepete eklendi!`, 'success');
        
        // Sepet animasyonu
        if (typeof $ !== 'undefined') {
            $('#cart').animate({ scale: 1.05 }, 200).animate({ scale: 1 }, 200);
        }
    }
    
    // DOM'a ürün ekleme
    function addProductToCartDOM(product) {
        const cartItems = document.getElementById('cartItems');
        
        // Ürünün küçük kopyasını oluştur
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.setAttribute('data-product-id', product.id);
        
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}" style="width: 50px; height: 50px; object-fit: contain; border-radius: 5px;">
            <div class="cart-item-details">
                <h4>${product.title.substring(0, 25)}${product.title.length > 25 ? '...' : ''}</h4>
                <p>$${product.price} x <span class="quantity">1</span></p>
            </div>
            <div class="cart-item-actions">
                <button class="remove-item" data-id="${product.id}">❌</button>
            </div>
        `;
        
        // Mevcut ürün varsa quantity'yi güncelle
        const existingCartItem = cartItems.querySelector(`[data-product-id="${product.id}"]`);
        if (existingCartItem) {
            const quantitySpan = existingCartItem.querySelector('.quantity');
            const currentQuantity = parseInt(quantitySpan.textContent);
            quantitySpan.textContent = currentQuantity + 1;
            
            // Animasyon efekti
            if (typeof $ !== 'undefined') {
                $(existingCartItem).addClass('updated').delay(300).queue(function() {
                    $(this).removeClass('updated');
                    $(this).dequeue();
                });
            }
        } else {
            // Yeni ürün ekleme animasyonu
            cartItem.style.opacity = '0';
            cartItem.style.transform = 'translateX(-20px)';
            cartItems.appendChild(cartItem);
            
            // Fade-in animasyonu
            setTimeout(() => {
                cartItem.style.transition = 'all 0.3s ease';
                cartItem.style.opacity = '1';
                cartItem.style.transform = 'translateX(0)';
            }, 10);
        }
        
        // Remove butonu event listener
        cartItem.querySelector('.remove-item').addEventListener('click', function() {
            removeFromCart(product.id);
        });
    }
    
    // Sepet görüntüleme güncelleme
    function updateCartDisplay() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        document.getElementById('cartCount').textContent = totalItems;
        document.getElementById('cartTotal').textContent = `$${totalPrice.toFixed(2)}`;
        
        const cartItems = document.getElementById('cartItems');
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div style="text-align: center; color: #666; padding: 20px;">
                    <p>🛒 Sepet boş</p>
                 
                </div>
            `;
            return;
        }
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: contain;">
                <div class="cart-item-details">
                    <h4>${item.title.substring(0, 30)}...</h4>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
                <button class="remove-item" data-id="${item.id}">❌</button>
            `;
            
            cartItem.querySelector('.remove-item').addEventListener('click', function() {
                removeFromCart(item.id);
            });
            
            cartItems.appendChild(cartItem);
        });
        
        // LocalStorage bilgisi
        const storageInfo = document.createElement('div');
        storageInfo.style.cssText = 'text-align: center; color: #999; font-size: 12px; padding: 10px; border-top: 1px solid #ddd; margin-top: 10px;';
      
        cartItems.appendChild(storageInfo);
    }
    
    // Sepetten çıkarma
    function removeFromCart(productId) {
        // Ürün bilgisini al
        const removedProduct = cart.find(item => item.id === productId);
        
        // Array'den çıkar
        cart = cart.filter(item => item.id !== productId);
        
        // DOM'dan çıkar
        const cartItem = document.querySelector(`[data-product-id="${productId}"]`);
        if (cartItem) {
            if (typeof $ !== 'undefined') {
                // jQuery ile animasyonlu silme
                $(cartItem).slideUp(300, function() {
                    $(this).remove();
                });
            } else {
                // Vanilla JS ile silme
                cartItem.style.transition = 'all 0.3s ease';
                cartItem.style.opacity = '0';
                cartItem.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    cartItem.remove();
                }, 300);
            }
        }
        
        updateCartDisplay();
        saveCartToStorage(); // LocalStorage'a kaydet
        console.log('Sepetten çıkarıldı:', productId);
        
        // Bildirim göster
        if (removedProduct) {
            showNotification(`🗑️ ${removedProduct.title} sepetten çıkarıldı!`, 'info');
        }
    }
    
    // Sepeti temizleme
    function clearCart() {
        // DOM'dan tüm ürünleri sil - .empty() kullanarak
        const cartItems = document.getElementById('cartItems');
        
        if (typeof $ !== 'undefined') {
            // jQuery ile .empty() kullanarak temizleme
            $('#cartItems').fadeOut(300, function() {
                $(this).empty().html(`
                    <div style="text-align: center; color: #666; padding: 20px;">
                        <p>🛒 Sepet boş</p>
                    </div>
                `).fadeIn(300);
            });
        } else {
            // Vanilla JS ile temizleme
            cartItems.innerHTML = `
                <div style="text-align: center; color: #666; padding: 20px;">
                    <p>🛒 Sepet boş</p>
                </div>
            `;
        }
        
        // Array'i temizle
        cart = [];
        
        // LocalStorage'dan temizle
        saveCartToStorage();
        
        // Sepet sayısını güncelle
        updateCartDisplay();
        
        console.log('Sepet temizlendi - .empty() kullanıldı');
        
        // Bildirim göster
        showNotification('🗑️ Sepet tamamen temizlendi!', 'info');
    }
    
    // Ürün slider'ı güncelleme
    function updateProductSlider(products) {
        const slider = document.getElementById('productSlider');
        
        if (slider.classList.contains('slick-initialized')) {
            $(slider).slick('unslick');
        }
        
        slider.innerHTML = '';
        
        if (products.length > 0) {
            products.forEach((product, index) => {
                const sliderCard = document.createElement('div');
                sliderCard.className = 'slider-card';
                sliderCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h4>${product.title.substring(0, 30)}...</h4>
                    <div class="price-info">
                        <p class="price">$${product.price}</p>
                        <div class="rating">⭐ ${product.rating.rate}</div>
                    </div>
                `;
                
                // Slider kartı hover efekti - fadeTo ve animate ile
                if (typeof $ !== 'undefined') {
                    $(sliderCard).hover(
                        function() {
                            $(this)
                                .fadeTo(300, 0.9)
                                .toggleClass('hovered', true)
                                .animate({
                                    transform: 'translateY(-10px)',
                                    boxShadow: '0 15px 35px rgba(0,0,0,0.3)'
                                }, 300);
                        },
                        function() {
                            $(this)
                                .fadeTo(300, 1)
                                .toggleClass('hovered', false)
                                .animate({
                                    transform: 'translateY(0)',
                                    boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                                }, 300);
                        }
                    );
                }
                
                slider.appendChild(sliderCard);
                
                // Slider kartı fadeIn animasyonu
                if (typeof $ !== 'undefined') {
                    $(sliderCard)
                        .hide()
                        .delay(index * 150)
                        .fadeIn(600)
                        .slideDown(400);
                }
            });
            
            $(slider).slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: Math.min(4, products.length),
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                pauseOnHover: false,
                pauseOnFocus: false,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: Math.min(3, products.length),
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: Math.min(2, products.length),
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
            
            $(slider).slick('slickPlay');
        } else {
            slider.innerHTML = `
                <div style="text-align: center; color: white; font-size: 16px; padding: 30px;">
                    <p>🎠 Slider temizlendi</p>
                </div>
            `;
        }
    }
    
    // Fancybox ayarları
    if (typeof $.fancybox !== 'undefined') {
        $.fancybox.defaults = {
            closeBtn: true,
            closeClickOutside: false,
            touch: false,
            autoFocus: false,
            helpers: {
                overlay: {
                    locked: false
                }
            },
            beforeShow: function() {
                console.log('Fancybox beforeShow');
            },
            afterShow: function() {
                console.log('Fancybox afterShow');
            },
            beforeClose: function() {
                console.log('Fancybox beforeClose');
            },
            afterClose: function() {
                console.log('Fancybox afterClose');
            }
        };
    }
    
    console.log('initStartApp tamamlandı - Uygulama hazır!');
}

// Tamamen bağımsız çalışan E-Ticaret uygulaması
// HTML dosyası olmadan, sadece JavaScript ile çalışır

// Document ready ile uygulama başlatma
function initApp() {
    'use strict';
    
    console.log('Document ready - E-Ticaret uygulaması başlatılıyor...');
    
    // CSS stillerini ekle
    addStyles();
    
    // HTML yapısını oluştur
    createHTMLStructure();
    
    // Kütüphaneleri yükle ve uygulamayı başlat
    loadLibraries().then(() => {
        console.log('Tüm kütüphaneler yüklendi, uygulama başlatılıyor...');
        
        // jQuery'nin yüklenmesini bekle
        const checkJQuery = setInterval(() => {
            if (typeof jQuery !== 'undefined') {
                clearInterval(checkJQuery);
                console.log('jQuery hazır, uygulama başlatılıyor...');
                startApp();
            }
        }, 100);
    });
}

// Document ready kontrolü
if (typeof $ !== 'undefined') {
    // jQuery zaten yüklü
    $(document).ready(initApp);
} else {
    // jQuery henüz yüklenmemiş, DOMContentLoaded kullan
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        // DOM zaten yüklü
        initApp();
    }
}
