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
            background: linear-gradient(45deg,rgb(31, 53, 154), #764ba2);
            color: white;
            font-weight: bold;
            transition: all 0.3s ease;
        }

        .product-count:focus {
            outline: none;
            box-shadow: 0 0 15px rgba(102, 126, 234, 0.6);
            background: linear-gradient(45deg, #764ba2, #667eea);
            transform: scale(1.05);
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

        /* Lightbox2 Modal Stilleri */
        .lightbox-modal-content {
            background: white;
            border-radius: 15px;
            padding: 30px;
            max-width: 800px;
            margin: 20px auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .lightbox-modal-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            align-items: start;
        }

        .lightbox-modal-image img {
            width: 100%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .lightbox-modal-details h2 {
            color: #333;
            margin-bottom: 15px;
            font-size: 1.8rem;
        }

        .lightbox-modal-details p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 20px;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
        }

        .lightbox-modal-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }

        .lightbox-price-box, .lightbox-rating-box {
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            color: white;
        }

        .lightbox-price-box {
            background: #667eea;
        }

        .lightbox-rating-box {
            background: #28a745;
        }

        .lightbox-price-box strong, .lightbox-rating-box strong {
            display: block;
            margin-bottom: 5px;
        }

        .lightbox-price-box span {
            font-size: 1.2rem;
            font-weight: bold;
        }

        .lightbox-category-box {
            background: #ffc107;
            color: #333;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 20px;
        }

        .lightbox-category-box strong {
            display: block;
            margin-bottom: 5px;
        }

        .lightbox-category-box span {
            text-transform: capitalize;
        }

        .lightbox-modal-add-to-cart {
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

        .lightbox-modal-add-to-cart:hover {
            background: #ff5252;
            transform: translateY(-2px);
        }

        .lightbox-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 9998;
            cursor: pointer;
        }

        #lightbox-modal-content {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999;
            max-height: 90vh;
            overflow-y: auto;
        }

        .main-content {
            display: grid;
            grid-template-columns: 1fr 350px;
            gap: 30px;
        }

        .sidebar {
            display: flex;
            flex-direction: column;
            gap: 20px;
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

        .featured-badge {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            padding: 5px 15px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: bold;
            text-align: center;
            margin: 5px auto;
            width: fit-content;
            box-shadow: 0 2px 10px rgba(255, 107, 107, 0.3);
            animation: pulse 2s infinite;
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
            margin-bottom: 0;
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
            margin: 5px 0 0 0;
            font-size: 12px;
            color: #666;
        }

        /* Favoriler Bölümü */
        .favorites-section {
            background: rgba(255,255,255,0.1);
            border-radius: 15px;
            padding: 20px;
            margin: 0;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
        }

        .favorites-section h2 {
            color: white;
            margin-bottom: 15px;
            text-align: center;
            font-size: 1.5rem;
        }

        .favorites-summary {
            text-align: center;
            color: white;
            margin-bottom: 15px;
        }

        .favorites-summary p {
            margin: 5px 0;
            font-size: 16px;
        }

        .favorites-items {
            max-height: 300px;
            overflow-y: auto;
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            padding: 10px;
            margin-top: 10px;
        }

        .favorite-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            background: rgba(255,255,255,0.9);
            border-radius: 8px;
            margin-bottom: 8px;
            transition: all 0.3s ease;
            position: relative;
        }

        .favorite-item:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .favorite-item img {
            width: 50px;
            height: 50px;
            object-fit: contain;
            border-radius: 5px;
        }

        .favorite-item-details {
            flex: 1;
            margin-right: 50px; /* Remove butonu için yer bırak */
        }

        .favorite-item-details h4 {
            margin: 0;
            font-size: 14px;
            color: #333;
            word-wrap: break-word;
            overflow-wrap: break-word;
        }

        .favorite-item-details p {
            margin: 5px 0 0 0;
            font-size: 12px;
            color: #666;
        }

        .favorite-item-actions {
            margin-left: auto;
            flex-shrink: 0;
        }

        .remove-favorite {
            background: #e91e63;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s ease;
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
        }

        .remove-favorite:hover {
            background: #c2185b;
            transform: scale(1.1);
        }

        /* Ürün Aksiyonları */
        .product-actions {
            display: flex;
            gap: 8px;
            margin-top: 10px;
        }

        .product-actions button {
            flex: 1;
            padding: 8px 12px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s ease;
        }

        .add-to-favorites-btn {
            background: linear-gradient(45deg, #667eea, #ee5a24);
            color: white;
            font-weight: bold;
            min-width: 40px;
            flex: 0 0 auto;
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
         <input type="number" id="productCount" class="product-count" placeholder="8" min="1" max="20" value="8">
            <button id="loadProducts" class="btn">📦 Ürünleri Yükle</button>
            <input type="number" id="productSearch" class="search-input" placeholder="Ürün ID'si girin (1-20)" min="1" max="20">
            <button id="searchProduct" class="btn">🔍 Ürün Ara</button>
            
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

            <div class="sidebar">
                <div class="cart-section">
                    <h2>🛒 Sepetim</h2>
                    <div class="cart-summary">
                        <p>Toplam Ürün: <span id="cartCount">0</span></p>
                        <p>Toplam Tutar: <span id="cartTotal">$0.00</span></p>
                        <button id="clearCartBtn" style="background: #dc3545; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px; width: 100%;">🗑️ Sepeti Temizle</button>
                    </div>
                    <div id="cartItems" class="cart-items">
                        <div style="text-align: center; color: #ddd; padding: 20px;">
                            <p>🛒 Sepet boş</p>
                        </div>
                    </div>
                </div>
                
                <div class="favorites-section">
                    <h2>❤️ Favorilerim</h2>
                    <div class="favorites-summary">
                        <p>Toplam Favori: <span id="favoritesCount">0</span></p>
                    </div>
                    <div id="favoritesContainer" class="favorites-container">
                        <div id="favoritesItems" class="favorites-items">
                            <div style="text-align: center; color: #ddd; padding: 20px;">
                                <p>❤️ Favori ürün yok</p>
                            </div>
                        </div>
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
                loadLightbox2();
            };
            document.head.appendChild(jqueryScript);
        } else {
            console.log('jQuery zaten yüklü');
            loadLightbox2();
        }
        
        function loadLightbox2() {
            // Lightbox2 CSS yükle
            const lightboxCSS = document.createElement('link');
            lightboxCSS.rel = 'stylesheet';
            lightboxCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.4/css/lightbox.min.css';
            lightboxCSS.onload = () => console.log('Lightbox2 CSS yüklendi');
            lightboxCSS.onerror = () => console.error('Lightbox2 CSS yüklenemedi');
            document.head.appendChild(lightboxCSS);
            
            // Lightbox2 JS yükle (jQuery bağımlılığı ile)
            const lightboxScript = document.createElement('script');
            lightboxScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.4/js/lightbox.min.js';
            lightboxScript.onload = () => {
                console.log('Lightbox2 JS yüklendi');
                // Lightbox2'nin tamamen yüklenmesini bekle
                setTimeout(() => {
                    if (typeof lightbox !== 'undefined' && typeof $ !== 'undefined') {
                        console.log('Lightbox2 hazır ve kullanılabilir');
                        // Lightbox2 ayarlarını yap
                        try {
                            lightbox.option({
                                'resizeDuration': 200,
                                'wrapAround': true,
                                'albumLabel': 'Resim %1 / %2',
                                'fadeDuration': 300,
                                'imageFadeDuration': 300
                            });
                        } catch (optionError) {
                            console.warn('Lightbox2 ayarları yapılamadı:', optionError);
                        }
                        loadSlickSlider();
                    } else {
                        console.warn('Lightbox2 veya jQuery yüklenemedi, basit modal kullanılacak');
                        loadSlickSlider();
                    }
                }, 1000);
            };
            lightboxScript.onerror = () => {
                console.error('Lightbox2 JS yüklenemedi');
                loadSlickSlider();
            };
            document.head.appendChild(lightboxScript);
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

// jQuery Plugin Fonksiyonları - $.each() ve $.extend() kullanarak
function initCustomPlugins() {
    'use strict';
    
    console.log('Özel jQuery plugin\'leri tanımlanıyor...');
    
    // 1. Sepet İşlemleri Plugin'i
    $.fn.cartManager = function(options = {}) {
        const defaults = {
            storageKey: 'ecommerce_cart',
            animationDuration: 300,
            showNotifications: true
        };
        
        const settings = $.extend({}, defaults, options);
        
        // Plugin instance'ını oluştur
        const plugin = {
            addToCart: function(product) {
                const cart = JSON.parse(localStorage.getItem(settings.storageKey) || '[]');
                const existingItem = cart.find(item => item.id === product.id);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        ...product,
                        quantity: 1,
                        addedAt: new Date().toISOString()
                    });
                }
                
                localStorage.setItem(settings.storageKey, JSON.stringify(cart));
                
                // Animasyon efekti
                this.addClass('cart-added').delay(settings.animationDuration).queue(function() {
                    $(this).removeClass('cart-added').dequeue();
                });
                
                if (settings.showNotifications && typeof window.showNotification === 'function') {
                    window.showNotification(`🛒 Ürün sepete eklendi!`, 'success');
                }
                
                console.log('Plugin: Sepete eklendi', product.title);
                return this;
            },
            
            removeFromCart: function(productId) {
                const cart = JSON.parse(localStorage.getItem(settings.storageKey) || '[]');
                const updatedCart = cart.filter(item => item.id !== productId);
                localStorage.setItem(settings.storageKey, JSON.stringify(updatedCart));
                
                // Animasyon efekti
                this.addClass('cart-removed').delay(settings.animationDuration).queue(function() {
                    $(this).removeClass('cart-removed').dequeue();
                });
                
                if (settings.showNotifications && typeof window.showNotification === 'function') {
                    window.showNotification('🗑️ Ürün sepetten çıkarıldı!', 'info');
                }
                
                console.log('Plugin: Sepetten çıkarıldı', productId);
                return this;
            },
            
            clearCart: function() {
                localStorage.removeItem(settings.storageKey);
                
                // Animasyon efekti
                this.addClass('cart-cleared').delay(settings.animationDuration).queue(function() {
                    $(this).removeClass('cart-cleared').dequeue();
                });
                
                if (settings.showNotifications && typeof window.showNotification === 'function') {
                    window.showNotification('🗑️ Sepet tamamen temizlendi!', 'warning');
                }
                
                console.log('Plugin: Sepet temizlendi');
                return this;
            },
            
            getCart: function() {
                return JSON.parse(localStorage.getItem(settings.storageKey) || '[]');
            },
            
            getCartCount: function() {
                const cart = this.getCart();
                return cart.reduce((total, item) => total + item.quantity, 0);
            },
            
            updateCartDisplay: function() {
                const cart = this.getCart();
                const totalItems = this.getCartCount();
                const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
                
                // Sepet sayısını güncelle
                $('#cartCount').text(totalItems);
                $('#cartTotal').text(`$${totalPrice.toFixed(2)}`);
                
                // Sepet içeriğini güncelle
                const cartItems = $('#cartItems');
                cartItems.empty();
                
                if (cart.length === 0) {
                    cartItems.html(`
                        <div style="text-align: center; color: #666; padding: 20px;">
                            <p>🛒 Sepet boş</p>
                        </div>
                    `);
                } else {
                    $.each(cart, function(index, item) {
                        const cartItem = $(`
                            <div class="cart-item" data-id="${item.id}">
                                <img src="${item.image}" alt="${item.title}" style="width: 40px; height: 40px; object-fit: contain;">
                                <div class="cart-item-details">
                                    <h4>${item.title.substring(0, 25)}...</h4>
                                    <p>$${item.price} x ${item.quantity}</p>
                                </div>
                                <button class="remove-cart-item" data-id="${item.id}">🗑️</button>
                            </div>
                        `);
                        
                        cartItems.append(cartItem);
                    });
                }
                
                // Remove butonu event listener'ını ekle
                $('#cartItems').off('click', '.remove-cart-item').on('click', '.remove-cart-item', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const productId = $(this).data('id');
                    console.log('Plugin: Sepetten çıkarılıyor:', productId);
                    
                    // Plugin kullanarak sepetten çıkar
                    $('#cartContainer').cartManager().removeFromCart(productId);
                    
                    // Display'i güncelle
                    $('#cartContainer').cartManager().updateCartDisplay();
                });
                
                return this;
            }
        };
        
        // Plugin method'larını jQuery objesine ekle
        $.extend(this, plugin);
        
        return this;
    };
    
    // 2. Favoriler İşlemleri Plugin'i
    $.fn.favoritesManager = function(options = {}) {
        const defaults = {
            storageKey: 'ecommerce_favorites',
            animationDuration: 300,
            showNotifications: true
        };
        
        const settings = $.extend({}, defaults, options);
        
        // Plugin instance'ını oluştur
        const plugin = {
            addToFavorites: function(product) {
                const favorites = JSON.parse(localStorage.getItem(settings.storageKey) || '[]');
                const exists = favorites.some(item => item.id === product.id);
                
                if (!exists) {
                    favorites.push({
                        ...product,
                        addedAt: new Date().toISOString()
                    });
                    localStorage.setItem(settings.storageKey, JSON.stringify(favorites));
                    
                    // Animasyon efekti
                    this.addClass('favorite-added').delay(settings.animationDuration).queue(function() {
                        $(this).removeClass('favorite-added').dequeue();
                    });
                    
                    if (settings.showNotifications && typeof window.showNotification === 'function') {
                        window.showNotification(`❤️ Ürün favorilere eklendi!`, 'success');
                    }
                    
                    console.log('Plugin: Favorilere eklendi', product.title);
                } else {
                    if (settings.showNotifications && typeof window.showNotification === 'function') {
                        window.showNotification('⚠️ Bu ürün zaten favorilerde!', 'warning');
                    }
                }
                
                return this;
            },
            
            removeFromFavorites: function(productId) {
                const favorites = JSON.parse(localStorage.getItem(settings.storageKey) || '[]');
                const updatedFavorites = favorites.filter(item => item.id !== productId);
                localStorage.setItem(settings.storageKey, JSON.stringify(updatedFavorites));
                
                // Animasyon efekti
                this.addClass('favorite-removed').delay(settings.animationDuration).queue(function() {
                    $(this).removeClass('favorite-removed').dequeue();
                });
                
                if (settings.showNotifications && typeof window.showNotification === 'function') {
                    window.showNotification('💔 Ürün favorilerden çıkarıldı!', 'info');
                }
                
                console.log('Plugin: Favorilerden çıkarıldı', productId);
                return this;
            },
            
            clearFavorites: function() {
                localStorage.removeItem(settings.storageKey);
                
                // Animasyon efekti
                this.addClass('favorites-cleared').delay(settings.animationDuration).queue(function() {
                    $(this).removeClass('favorites-cleared').dequeue();
                });
                
                if (settings.showNotifications && typeof window.showNotification === 'function') {
                    window.showNotification('💔 Tüm favoriler temizlendi!', 'warning');
                }
                
                console.log('Plugin: Favoriler temizlendi');
                return this;
            },
            
            getFavorites: function() {
                return JSON.parse(localStorage.getItem(settings.storageKey) || '[]');
            },
            
            isFavorite: function(productId) {
                const favorites = this.getFavorites();
                return favorites.some(item => item.id === productId);
            },
            
            updateFavoritesDisplay: function() {
                const favorites = this.getFavorites();
                const totalFavorites = favorites.length;
                
                // Favori sayısını güncelle
                $('#favoritesCount').text(totalFavorites);
                
                // Favori içeriğini güncelle
                const favoritesItems = $('#favoritesItems');
                favoritesItems.empty();
                
                if (favorites.length === 0) {
                    favoritesItems.html(`
                        <div style="text-align: center; color: #666; padding: 20px;">
                            <p>❤️ Favori ürün yok</p>
                        </div>
                    `);
                } else {
                    $.each(favorites, function(index, item) {
                        const favoriteItem = $(`
                            <div class="favorite-item" data-id="${item.id}">
                                <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: contain;">
                                <div class="favorite-item-details">
                                    <h4>${item.title.substring(0, 30)}...</h4>
                                    <p>$${item.price}</p>
                                </div>
                                <button class="remove-favorite" data-id="${item.id}" title="Favorilerden Çıkar">💔</button>
                            </div>
                        `);
                        
                        favoritesItems.append(favoriteItem);
                    });
                }
                
                return this;
            }
        };
        
        // Plugin method'larını jQuery objesine ekle
        $.extend(this, plugin);
        
        return this;
    };
    
    // 3. Ürün İşlemleri Plugin'i
    $.fn.productManager = function(options = {}) {
        const defaults = {
            animationDuration: 300,
            showNotifications: true
        };
        
        const settings = $.extend({}, defaults, options);
        
        // Plugin instance'ını oluştur
        const plugin = {
            showProductDetails: function(product) {
                // Modal açma animasyonu
                this.fadeIn(settings.animationDuration);
                
                if (settings.showNotifications && typeof window.showNotification === 'function') {
                    window.showNotification(`📋 ${product.title} detayları gösteriliyor...`, 'info');
                }
                
                console.log('Plugin: Ürün detayları gösteriliyor', product.title);
                return this;
            },
            
            searchProducts: function(query, products) {
                const filtered = products.filter(product => 
                    product.title.toLowerCase().includes(query.toLowerCase()) ||
                    product.description.toLowerCase().includes(query.toLowerCase()) ||
                    product.category.toLowerCase().includes(query.toLowerCase())
                );
                
                if (settings.showNotifications && typeof window.showNotification === 'function') {
                    window.showNotification(`🔍 ${filtered.length} ürün bulundu`, 'info');
                }
                
                console.log('Plugin: Ürün arama yapıldı', query, filtered.length);
                return filtered;
            },
            
            sortProducts: function(products, sortBy = 'name', order = 'asc') {
                const sorted = [...products].sort((a, b) => {
                    let aVal, bVal;
                    
                    switch(sortBy) {
                        case 'price':
                            aVal = a.price;
                            bVal = b.price;
                            break;
                        case 'rating':
                            aVal = a.rating.rate;
                            bVal = b.rating.rate;
                            break;
                        case 'name':
                        default:
                            aVal = a.title.toLowerCase();
                            bVal = b.title.toLowerCase();
                            break;
                    }
                    
                    if (order === 'desc') {
                        return aVal < bVal ? 1 : -1;
                    }
                    return aVal > bVal ? 1 : -1;
                });
                
                if (settings.showNotifications && typeof window.showNotification === 'function') {
                    window.showNotification(`📊 Ürünler ${sortBy} göre sıralandı`, 'info');
                }
                
                console.log('Plugin: Ürünler sıralandı', sortBy, order);
                return sorted;
            }
        };
        
        // Plugin method'larını jQuery objesine ekle
        $.extend(this, plugin);
        
        return this;
    };
    
    // 4. Animasyon Plugin'i
    $.fn.animationManager = function(options = {}) {
        const defaults = {
            duration: 300,
            easing: 'swing'
        };
        
        const settings = $.extend({}, defaults, options);
        
        // Plugin instance'ını oluştur
        const plugin = {
            bounce: function() {
                this.animate({
                    transform: 'translateY(-20px)'
                }, settings.duration / 2, settings.easing).animate({
                    transform: 'translateY(0)'
                }, settings.duration / 2, settings.easing);
                return this;
            },
            
            shake: function() {
                const originalPosition = this.position();
                this.animate({
                    left: originalPosition.left - 10
                }, 100).animate({
                    left: originalPosition.left + 20
                }, 100).animate({
                    left: originalPosition.left - 10
                }, 100).animate({
                    left: originalPosition.left
                }, 100);
                return this;
            },
            
            pulse: function() {
                this.animate({
                    transform: 'scale(1.1)'
                }, settings.duration / 2, settings.easing).animate({
                    transform: 'scale(1)'
                }, settings.duration / 2, settings.easing);
                return this;
            },
            
            fadeInCustom: function() {
                this.hide().fadeIn(settings.duration, settings.easing);
                return this;
            },
            
            fadeOutCustom: function() {
                this.fadeOut(settings.duration, settings.easing);
                return this;
            }
        };
        
        // Plugin method'larını jQuery objesine ekle
        $.extend(this, plugin);
        
        return this;
    };
    
    // 5. Bildirim Plugin'i
    $.fn.notificationManager = function(options = {}) {
        const defaults = {
            duration: 3000,
            position: 'top-right',
            animationDuration: 300
        };
        
        const settings = $.extend({}, defaults, options);
        
        // Plugin instance'ını oluştur
        const plugin = {
            showSuccess: function(message) {
                if (typeof window.showNotification === 'function') {
                    window.showNotification(message, 'success');
                }
                return this;
            },
            
            showError: function(message) {
                if (typeof window.showNotification === 'function') {
                    window.showNotification(message, 'error');
                }
                return this;
            },
            
            showWarning: function(message) {
                if (typeof window.showNotification === 'function') {
                    window.showNotification(message, 'warning');
                }
                return this;
            },
            
            showInfo: function(message) {
                if (typeof window.showNotification === 'function') {
                    window.showNotification(message, 'info');
                }
                return this;
            }
        };
        
        // Plugin method'larını jQuery objesine ekle
        $.extend(this, plugin);
        
        return this;
    };
    
    console.log('Özel jQuery plugin\'leri başarıyla tanımlandı!');
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

    // Bildirim gösterme fonksiyonu (Global scope'a ekle)
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
    
    // Global scope'a ekle
    window.showNotification = showNotification;
    
    // Bildirimi gizleme fonksiyonu (Global scope'a ekle)
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
    
    // Global scope'a ekle
    window.hideNotification = hideNotification;

    // Plugin'leri başlat (showNotification fonksiyonundan sonra)
    initCustomPlugins();
    
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
                
                // Slider'ı etkileme - arama sonucunda slider normal akışında kalsın
                // Slider'da mevcut ürünler gösterilmeye devam eder
                
                // Başarı mesajı
                if (typeof $ !== 'undefined') {
                    $('<div>')
                        .addClass('success-message')
                        .text(`✅ Ürün bulundu`)
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
                
                // Arama input'unu temizle
                document.getElementById('productSearch').value = '';
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

    // Eski LocalStorage key'lerini temizle
    function cleanupOldStorageKeys() {
        try {
            // Eski miniEticaretCart key'ini temizle
            if (localStorage.getItem('miniEticaretCart')) {
                localStorage.removeItem('miniEticaretCart');
                console.log('✅ Eski miniEticaretCart key\'i temizlendi');
            }
            
            // Diğer eski key'leri de kontrol et ve temizle
            const oldKeys = [
                'miniEticaretCart',
                'cart',
                'favorites',
                'old_cart_data'
            ];
            
            oldKeys.forEach(key => {
                if (localStorage.getItem(key)) {
                    localStorage.removeItem(key);
                    console.log(`✅ Eski ${key} key\'i temizlendi`);
                }
            });
            
            console.log('🧹 LocalStorage temizleme işlemi tamamlandı');
        } catch (error) {
            console.error('LocalStorage temizleme hatası:', error);
        }
    }
    
    // LocalStorage durumunu göster (Debug için)
    function showStorageStatus() {
        console.log('📊 Mevcut LocalStorage Durumu:');
        console.log('🛒 Sepet (ecommerce_cart):', localStorage.getItem('ecommerce_cart') ? '✅ Mevcut' : '❌ Yok');
        console.log('❤️ Favoriler (ecommerce_favorites):', localStorage.getItem('ecommerce_favorites') ? '✅ Mevcut' : '❌ Yok');
        console.log('🗑️ Eski miniEticaretCart:', localStorage.getItem('miniEticaretCart') ? '⚠️ Hala mevcut' : '✅ Temizlendi');
    }
    
    // LocalStorage temizleme işlemini çalıştır
    cleanupOldStorageKeys();
    
    // Temizleme sonrası durumu göster
    setTimeout(() => {
        showStorageStatus();
    }, 100);
    
    // Uygulama başladığında sepet ve favoriler display'ini güncelle
    // Plugin'ler yüklendikten sonra display'leri güncelle
    setTimeout(() => {
        if (typeof $ !== 'undefined' && $.fn.cartManager) {
            updateCartDisplay();
        }
        if (typeof $ !== 'undefined' && $.fn.favoritesManager) {
            updateFavoritesDisplay();
        }
    }, 200);
    
    // Favorilerden çıkarma event delegation
    if (typeof $ !== 'undefined') {
        $('#favoritesItems').off('click', '.remove-favorite').on('click', '.remove-favorite', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = $(this).data('id');
            console.log('Favorilerden çıkarılıyor:', productId);
            
            // Plugin kullanarak favorilerden çıkar
            $('#favoritesContainer').favoritesManager().removeFromFavorites(productId);
            
            // Display'i hemen güncelle
            updateFavoritesDisplay();
            
            // Animasyon efekti
            $(this).closest('.favorite-item').fadeOut(300, function() {
                $(this).remove();
            });
        });
        
        // Sepet temizleme butonu event delegation
        $('#clearCartBtn').off('click').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Sepet temizleme butonu tıklandı');
            
            // Plugin kullanarak sepeti temizle
            $('#cartContainer').cartManager().clearCart();
            
            // Display'i güncelle
            updateCartDisplay();
        });
    }
    
    // Ürünleri yükle butonu - Güvenli element kontrolü
    const loadProductsBtn = document.getElementById('loadProducts');
    if (loadProductsBtn) {
        loadProductsBtn.addEventListener('click', function() {
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
    }
    
    // Sepeti temizle butonu artık HTML'de yok, bu event listener kaldırıldı
    // Sepet temizleme işlemi artık plugin ile yönetiliyor
    
    // Arama event listener'ları - Güvenli element kontrolü
    const searchProductBtn = document.getElementById('searchProduct');
    const productSearchInput = document.getElementById('productSearch');
    
    if (searchProductBtn) {
        searchProductBtn.addEventListener('click', function() {
            const productId = parseInt(productSearchInput ? productSearchInput.value : 0);
            
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
    }
    
    // Enter tuşu ile arama - Güvenli element kontrolü
    if (productSearchInput) {
        productSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const productId = parseInt(this.value);
                searchProductById(productId);
            }
        });
    }
    
    // Ürünleri yükleme fonksiyonu - Güvenli element kontrolü
    function loadProducts() {
        const productCountElement = document.getElementById('productCount');
        const loadingElement = document.getElementById('loading');
        const productGridElement = document.getElementById('productGrid');
        
        const productCount = productCountElement ? productCountElement.value || 8 : 8;
        
        if (loadingElement) loadingElement.style.display = 'block';
        if (productGridElement) productGridElement.innerHTML = '';
        
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                console.log('Ürünler yüklendi:', data.length);
                
                allProducts = data.slice(0, productCount);
                displayProducts(allProducts);
                updateProductSlider(allProducts);
                
                if (loadingElement) loadingElement.style.display = 'none';
            })
            .catch(error => {
                console.error('Ürün yükleme hatası:', error);
                if (loadingElement) loadingElement.style.display = 'none';
                alert('Ürünler yüklenirken hata oluştu. Lütfen tekrar deneyin.');
            });
    }
    
    // Ürünleri görüntüleme - Güvenli element kontrolü
    function displayProducts(products) {
        const productGrid = document.getElementById('productGrid');
        
        if (!productGrid) {
            console.warn('productGrid elementi bulunamadı');
            return;
        }
        
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
    
    // Ürün kartı template'i oluşturma
    function createProductCardTemplate() {
        const template = document.createElement('div');
        template.className = 'product-card-template';
        template.style.display = 'none';
        template.innerHTML = `
            <div class="product-card" data-product-id="">
                <img src="" alt="">
                <h3></h3>
                <div class="price"></div>
                <div class="rating"></div>
                <div class="product-actions">
                    <button class="detail-btn">👆 Detayları Göster</button>
                    <button class="add-to-cart-btn">🛒 Sepete Ekle</button>
                    <button class="add-to-favorites-btn" title="Favorilere Ekle">❤️</button>
                </div>
             
            </div>
        `;
        document.body.appendChild(template);
        return template;
    }

    // Template'den ürün kartı oluşturma (Cloning)
    function createProductCard(product, index) {
        // Template'i oluştur (eğer yoksa)
        let template = document.querySelector('.product-card-template');
        if (!template) {
            template = createProductCardTemplate();
        }
        
        // Template'i clone'la
        const card = template.querySelector('.product-card').cloneNode(true);
        card.setAttribute('data-product-index', index);
        card.setAttribute('data-product-id', product.id);
        
        // Template verilerini doldur
        card.querySelector('img').src = product.image;
        card.querySelector('img').alt = product.title;
        card.querySelector('h3').textContent = product.title.substring(0, 50) + (product.title.length > 50 ? '...' : '');
        card.querySelector('.price').textContent = `$${product.price}`;
        card.querySelector('.rating').textContent = `⭐ ${product.rating.rate} (${product.rating.count})`;
        
        // Favori butonunun durumunu kontrol et ve güncelle
        if (typeof $ !== 'undefined' && $.fn.favoritesManager) {
            const isFavorite = $('#favoritesContainer').favoritesManager().isFavorite(product.id);
            const favoriteBtn = card.querySelector('.add-to-favorites-btn');
            
            if (isFavorite) {
                favoriteBtn.textContent = '💖';
                favoriteBtn.style.background = '#e91e63';
                favoriteBtn.title = 'Favorilerden Çıkar';
            } else {
                favoriteBtn.textContent = '❤️';
                favoriteBtn.style.background = 'linear-gradient(45deg, #667eea, #ee5a24)';
                favoriteBtn.title = 'Favorilere Ekle';
            }
        }
        
        // After/Before kullanımı: Yüksek fiyatlı ürünlere "Öne Çıkan" etiketi ekle
        if (product.price > 50) {
            if (typeof $ !== 'undefined') {
                $(card).after('<div class="featured-badge">🔥 Öne Çıkan</div>');
            } else {
                const featuredBadge = document.createElement('div');
                featuredBadge.className = 'featured-badge';
                featuredBadge.textContent = '🔥 Öne Çıkan';
                card.parentNode.insertBefore(featuredBadge, card.nextSibling);
            }
        }
        
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
            
            // Detayları göster butonu hover efekti
            $(card).find('.detail-btn').hover(
                function() {
                    $(this)
                        .fadeTo(200, 0.9)
                        .toggleClass('active', true)
                        .animate({
                            transform: 'scale(1.08)',
                            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                            background: 'linear-gradient(45deg, #667eea, #764ba2)'
                        }, 200);
                },
                function() {
                    $(this)
                        .fadeTo(200, 1)
                        .toggleClass('active', false)
                        .animate({
                            transform: 'scale(1)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                            background: 'linear-gradient(45deg, #667eea, #ee5a24)'
                        }, 200);
                }
            );
            
            // Sepete ekle butonu hover efekti
            $(card).find('.add-to-cart-btn').hover(
                function() {
                    $(this)
                        .fadeTo(200, 0.9)
                        .toggleClass('active', true)
                        .animate({
                            transform: 'scale(1.08)',
                            boxShadow: '0 10px 30px rgba(255, 107, 107, 0.4)',
                            background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)'
                        }, 200);
                },
                function() {
                    $(this)
                        .fadeTo(200, 1)
                        .toggleClass('active', false)
                        .animate({
                            transform: 'scale(1)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                            background: 'linear-gradient(45deg, #667eea, #ee5a24)'
                        }, 200);
                }
            );
            
            // Favorilere ekle butonu hover efekti
            $(card).find('.add-to-favorites-btn').hover(
                function() {
                    $(this)
                        .fadeTo(200, 0.9)
                        .toggleClass('active', true)
                        .animate({
                            transform: 'scale(1.08)',
                            boxShadow: '0 10px 30px rgba(233, 30, 99, 0.4)',
                            background: 'linear-gradient(45deg, #e91e63, #9c27b0)'
                        }, 200);
                },
                function() {
                    $(this)
                        .fadeTo(200, 1)
                        .toggleClass('active', false)
                        .animate({
                            transform: 'scale(1)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                            background: 'linear-gradient(45deg, #667eea, #ee5a24)'
                        }, 200);
                }
            );
        }
        
        // Event delegation için product grid'e event listener ekle
        if (typeof $ !== 'undefined') {
            // Detay butonu event delegation
            $('#productGrid').off('click', '.detail-btn').on('click', '.detail-btn', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Traversing: Butondan ürün kartına ulaş
                const productCard = $(this).closest('.product-card');
                const productId = productCard.data('product-id');
                const product = allProducts.find(p => p.id === productId);
                
                console.log('Detay butonu tıklandı (Event Delegation):', product?.title);
                
                if (product) {
                    $(this)
                        .animate({ scale: 0.95 }, 100)
                        .fadeTo(100, 0.7)
                        .animate({ scale: 1 }, 100)
                        .fadeTo(100, 1, function() {
                            showProductModal(product);
                        });
                }
            });
            
            // Sepete ekle butonu event delegation
            $('#productGrid').off('click', '.add-to-cart-btn').on('click', '.add-to-cart-btn', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Traversing: Butondan ürün kartına ulaş
                const productCard = $(this).closest('.product-card');
                const productId = productCard.data('product-id');
                const product = allProducts.find(p => p.id === productId);
                
                console.log('Sepete ekleniyor (Event Delegation):', product?.title);
                
                if (product) {
                    addToCart(product);
                    
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
                        .css('background', '#667eea')
                        .animate({ scale: 1 }, 100);
                }
            });
            
            // Favorilere ekle butonu event delegation
            $('#productGrid').off('click', '.add-to-favorites-btn').on('click', '.add-to-favorites-btn', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Traversing: Butondan ürün kartına ulaş
                const productCard = $(this).closest('.product-card');
                const productId = productCard.data('product-id');
                const product = allProducts.find(p => p.id === productId);
                
                console.log('Favorilere ekleniyor (Event Delegation):', product?.title);
                
                if (product) {
                    // Ürünün favorilerde olup olmadığını kontrol et
                    const isFavorite = $('#favoritesContainer').favoritesManager().isFavorite(product.id);
                    
                    if (!isFavorite) {
                        // Plugin kullanarak favorilere ekle
                        $('#favoritesContainer').favoritesManager().addToFavorites(product);
                        
                        // Favoriler display'ini hemen güncelle
                        updateFavoritesDisplay();
                        
                        $(this)
                            .animate({ scale: 1.2 }, 200)
                            .fadeTo(200, 0.8)
                            .text('💖')
                            .css('background', '#e91e63')
                            .attr('title', 'Favorilerden Çıkar')
                            .animate({ scale: 1 }, 200)
                            .fadeTo(200, 1);
                    } else {
                        // Zaten favorilerde, favorilerden çıkar
                        $('#favoritesContainer').favoritesManager().removeFromFavorites(product.id);
                        
                        // Favoriler display'ini hemen güncelle
                        updateFavoritesDisplay();
                        
                        $(this)
                            .animate({ scale: 0.8 }, 200)
                            .fadeTo(200, 0.6)
                            .text('💔')
                            .css('background', '#666')
                            .attr('title', 'Favorilere Ekle')
                            .animate({ scale: 1 }, 200)
                            .fadeTo(200, 1)
                            .delay(1000)
                            .animate({ scale: 0.9 }, 100)
                            .text('❤️')
                            .css('background', 'linear-gradient(45deg, #667eea, #ee5a24)')
                            .animate({ scale: 1 }, 100);
                    }
                }
            });
        
        }
        
        return card;
    }
    
    // Ürün modalı gösterme
    function showProductModal(product) {
        console.log('showProductModal çağrıldı:', product.title);
        
        // jQuery kontrolü
        if (typeof jQuery === 'undefined') {
            console.error('jQuery yüklenmemiş!');
            alert('jQuery kütüphanesi yüklenemedi. Lütfen sayfayı yenileyin.');
            return;
        }
        
        // jQuery kontrolü (Lightbox2 yerine kendi modal sistemimizi kullanacağız)
        if (typeof $ === 'undefined') {
            console.error('jQuery yüklenmemiş!');
            alert('jQuery kütüphanesi yüklenemedi. Lütfen sayfayı yenileyin.');
            return;
        }
        
        // Önceki modal'ı temizle
        if ($('#lightbox-modal-content').length > 0) {
            $('#lightbox-modal-content').remove();
        }
        
        // HTML karakterlerini tamamen temizle ve güvenli hale getir
        const cleanTitle = String(product.title || 'Ürün')
            .replace(/[<>]/g, '')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/&/g, '&amp;')
            .substring(0, 100);
            
        const cleanDescription = String(product.description || 'Açıklama bulunmuyor.')
            .replace(/[<>]/g, '')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/&/g, '&amp;')
            .substring(0, 200);
            
        const cleanCategory = String(product.category || 'Genel')
            .replace(/[<>]/g, '')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/&/g, '&amp;')
            .substring(0, 50);
        
        // Lightbox2 için modal içeriği
        const modalContent = `
            <div class="lightbox-modal-content">
                <div class="lightbox-modal-grid">
                    <div class="lightbox-modal-image">
                        <img src="${String(product.image || '')}" alt="${cleanTitle}">
                    </div>
                    <div class="lightbox-modal-details">
                        <h2>${cleanTitle}</h2>
                        <p>${cleanDescription}</p>
                        <div class="lightbox-modal-info">
                            <div class="lightbox-price-box">
                                <strong>Fiyat</strong>
                                <span>$${Number(product.price || 0).toFixed(2)}</span>
                            </div>
                            <div class="lightbox-rating-box">
                                <strong>Değerlendirme</strong>
                                <span>${Number(product.rating?.rate || 0).toFixed(1)} (${Number(product.rating?.count || 0)})</span>
                            </div>
                        </div>
                        <div class="lightbox-category-box">
                            <strong>Kategori</strong>
                            <span>${cleanCategory}</span>
                        </div>
                        <button class="lightbox-modal-add-to-cart">Sepete Ekle - $${Number(product.price || 0).toFixed(2)}</button>
                    </div>
                </div>
            </div>
        `;
        
        try {
            console.log('Lightbox2 modal açılıyor...');
            
            // Önceki modal'ı temizle
            if ($('#lightbox-modal-content').length > 0) {
                $('#lightbox-modal-content').remove();
            }
            
            // Modal içeriğini oluştur
            const modalDiv = $('<div>').attr('id', 'lightbox-modal-content').html(modalContent);
            $('body').append(modalDiv);
            
            // Event listener'ı ekle
            $('#lightbox-modal-content .lightbox-modal-add-to-cart').on('click', function() {
                console.log('Lightbox modal sepete ekle butonu tıklandı');
                addToCart(product);
                $(this).text('✅ Sepete Eklendi!').css('background', '#28a745').prop('disabled', true);
                setTimeout(() => {
                    // Modal'ı kapat
                    $('#lightbox-modal-content').remove();
                    $('.lightbox-overlay').remove();
                    $(document).off('keydown.lightbox');
                }, 1500);
            });
            
            // Kendi modal sistemimizi kullan
            $('#lightbox-modal-content').show();
            $('body').append('<div class="lightbox-overlay"></div>');
            
            // Overlay'e tıklayınca kapat
            $('.lightbox-overlay').on('click', function() {
                $('#lightbox-modal-content').remove();
                $('.lightbox-overlay').remove();
                $(document).off('keydown.lightbox');
            });
            
            // ESC tuşu ile kapat
            $(document).on('keydown.lightbox', function(e) {
                if (e.key === 'Escape') {
                    $('#lightbox-modal-content').remove();
                    $('.lightbox-overlay').remove();
                    $(document).off('keydown.lightbox');
                }
            });
            
            console.log('Modal başarıyla açıldı!');
            
        } catch (error) {
            console.error('Modal açma hatası:', error);
            $('#lightbox-modal-content').remove();
            $('.lightbox-overlay').remove();
            
            // Basit alert ile fallback
            const fallbackMessage = `
                Ürün Detayları:
                
                ${cleanTitle}
                Fiyat: $${Number(product.price || 0).toFixed(2)}
                Kategori: ${cleanCategory}
                
                ${cleanDescription}
            `;
            alert(fallbackMessage);
        }
    }
    

    
    // Sepete ekleme (Plugin kullanarak)
    function addToCart(product) {
        console.log('Sepete ekleme işlemi başlatıldı:', product.title);
        
        // Plugin kullanarak sepete ekle
        $('#cartContainer').cartManager().addToCart(product);
        
        // Mevcut cart array'ini güncelle
        cart = $('#cartContainer').cartManager().getCart();
        
        // DOM'a ekle
        addProductToCartDOM(product);
        
        // Sepet sayısını güncelle
        updateCartDisplay();
        
        // Favoriler sayısını güncelle
        updateFavoritesDisplay();
        
        // Sepet animasyonu
        if (typeof $ !== 'undefined') {
            $('#cart').animate({ scale: 1.05 }, 200).animate({ scale: 1 }, 200);
        }
        
        console.log('Sepete ekleme işlemi tamamlandı (Plugin ile)');
    }
    
    // DOM'a ürün ekleme (Clone ve Append/Prepend kullanarak)
    function addProductToCartDOM(product) {
        const cartItems = document.getElementById('cartItems');
        
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
            // Yeni ürün için template oluştur ve clone'la
            const cartItemTemplate = document.createElement('div');
            cartItemTemplate.className = 'cart-item-template';
            cartItemTemplate.style.display = 'none';
            cartItemTemplate.innerHTML = `
                <div class="cart-item" data-product-id="">
                    <img src="" alt="" style="width: 50px; height: 50px; object-fit: contain; border-radius: 5px;">
                    <div class="cart-item-details">
                        <h4></h4>
                        <p>$<span class="price">0</span> x <span class="quantity">1</span></p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="remove-cart-item" data-id="">🗑️</button>
                    </div>
                </div>
            `;
            
            // Template'i clone'la
            const cartItem = cartItemTemplate.querySelector('.cart-item').cloneNode(true);
            cartItem.setAttribute('data-product-id', product.id);
            
            // Template verilerini doldur
            cartItem.querySelector('img').src = product.image;
            cartItem.querySelector('img').alt = product.title;
            cartItem.querySelector('h4').textContent = product.title.substring(0, 25) + (product.title.length > 25 ? '...' : '');
            cartItem.querySelector('.price').textContent = product.price;
            cartItem.querySelector('.remove-cart-item').setAttribute('data-id', product.id);
            
            // Clone'lanan elementi DOM'a ekle (prepend kullanarak - en üste ekle)
            if (typeof $ !== 'undefined') {
                // jQuery ile prepend kullanarak en üste ekle
                $(cartItems).prepend(cartItem);
                
                // Fade-in animasyonu
                $(cartItem).hide().fadeIn(300);
            } else {
                // Vanilla JS ile insertBefore kullanarak en üste ekle
                const firstChild = cartItems.firstChild;
                cartItems.insertBefore(cartItem, firstChild);
                
                // Fade-in animasyonu
                cartItem.style.opacity = '0';
                cartItem.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    cartItem.style.transition = 'all 0.3s ease';
                    cartItem.style.opacity = '1';
                    cartItem.style.transform = 'translateX(0)';
                }, 10);
            }
        }
        
        // Remove butonu event listener artık plugin içinde yönetiliyor
        // Plugin'in updateCartDisplay fonksiyonunda .remove-cart-item için event delegation var
    }
    
    // Sepet görüntüleme güncelleme
    function updateCartDisplay() {
        try {
            // Plugin'in yüklenip yüklenmediğini kontrol et
            if (typeof $ === 'undefined' || !$.fn.cartManager) {
                console.warn('CartManager plugin henüz yüklenmemiş');
                return;
            }
            
            // Plugin kullanarak sepet display'ini güncelle
            $('#cartContainer').cartManager().updateCartDisplay();
            
        } catch (error) {
            console.error('Sepet display güncelleme hatası:', error);
        }
    }
    
    // Sepetten çıkarma (Plugin kullanarak)
    function removeFromCart(productId) {
        console.log('Sepetten çıkarma işlemi başlatıldı:', productId);
        
        // Plugin kullanarak sepetten çıkar
        $('#cartContainer').cartManager().removeFromCart(productId);
        
        // Mevcut cart array'ini güncelle
        cart = $('#cartContainer').cartManager().getCart();
        
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
        console.log('Sepetten çıkarma işlemi tamamlandı (Plugin ile)');
    }
    
    // Sepeti temizleme (Plugin kullanarak)
    function clearCart() {
        console.log('Sepet temizleme işlemi başlatıldı');
        
        // Plugin kullanarak sepeti temizle
        $('#cartContainer').cartManager().clearCart();
        
        // Mevcut cart array'ini güncelle
        cart = $('#cartContainer').cartManager().getCart();
        
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
        
        // Sepet sayısını güncelle
        updateCartDisplay();
        
        console.log('Sepet temizlendi (Plugin ile)');
    }
    
    // Favoriler görüntüleme güncelleme
    function updateFavoritesDisplay() {
        try {
            // Plugin'in yüklenip yüklenmediğini kontrol et
            if (typeof $ === 'undefined' || !$.fn.favoritesManager) {
                console.warn('FavoritesManager plugin henüz yüklenmemiş');
                return;
            }
            
            // Plugin kullanarak favoriler display'ini güncelle
            $('#favoritesContainer').favoritesManager().updateFavoritesDisplay();
            
        } catch (error) {
            console.error('Favoriler display güncelleme hatası:', error);
        }
    }
    
    // Ürün slider'ı güncelleme - Güvenli element kontrolü
    function updateProductSlider(products) {
        const slider = document.getElementById('productSlider');
        
        if (!slider) {
            console.warn('productSlider elementi bulunamadı');
            return;
        }
        
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
