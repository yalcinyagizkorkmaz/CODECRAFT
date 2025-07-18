
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
            document.head.appendChild(fancyboxCSS);
            
            // Fancybox JS yükle
            const fancyboxScript = document.createElement('script');
            fancyboxScript.src = 'https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js';
            fancyboxScript.onload = () => {
                console.log('Fancybox yüklendi');
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

// HTML yapısını oluştur
document.body.innerHTML = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mini E-Ticaret / Ürün Kataloğu</title>
    
    <style>
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
            text-align: center;
            margin-bottom: 30px;
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
            margin: 0 10px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        .btn:active {
            transform: translateY(0);
        }

        .product-count {
            padding: 10px;
            border: none;
            border-radius: 20px;
            text-align: center;
            font-size: 16px;
            margin: 0 10px;
            width: 80px;
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

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideIn {
            from { 
                opacity: 0; 
                transform: translateY(-50px) scale(0.9);
            }
            to { 
                opacity: 1; 
                transform: translateY(0) scale(1);
            }
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
            opacity: 0;
            transform: translateY(20px);
        }

        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
            border: 2px solid #667eea;
        }

        .product-card img {
            width: 150px;
            height: 150px;
            object-fit: contain;
            margin-bottom: 15px;
            border-radius: 10px;
            transition: all 0.3s ease;
        }

        .product-card:hover img {
            transform: scale(1.1);
        }

        .product-card h3 {
            color: #333;
            margin-bottom: 10px;
            font-size: 1.1rem;
            line-height: 1.4;
        }

        .product-card .price {
            color: #667eea;
            font-weight: bold;
            font-size: 1.3rem;
            margin-bottom: 8px;
        }

        .product-card .rating {
            color: #ffc107;
            margin-bottom: 15px;
            font-weight: bold;
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
        }

        .product-card button:hover {
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
            justify-content: flex-start;
            min-height: 200px;
        }

        .slider-card img {
            width: 100px;
            height: 100px;
            object-fit: contain;
            border-radius: 10px;
            margin-bottom: 10px;
        }

        .slider-card h4 {
            color: #333;
            margin-bottom: 8px;
            font-size: 1rem;
            line-height: 1.3;
        }

        .slider-card .price {
            color: #667eea;
            font-weight: bold;
            font-size: 1.1rem;
            margin-bottom: 5px;
        }

        .slider-card .rating {
            color: #ffc107;
            font-weight: bold;
        }

        @media (max-width: 768px) {
            .main-content {
                grid-template-columns: 1fr;
            }
            
            .product-grid {
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛍️ Mini E-Ticaret / Ürün Kataloğu</h1>
            <p>Fake Store API ile gerçek ürün verileri</p>
        </div>

        <div class="controls">
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
    </div>
</body>
</html>
`;

// Kütüphaneler yüklendikten sonra uygulamayı başlat
loadLibraries().then(() => {
    console.log('Tüm kütüphaneler yüklendi, uygulama başlatılıyor...');
    
    // jQuery ve diğer kütüphaneler yüklendikten sonra çalışacak kod
    $(document).ready(function() {
    let allProducts = [];
    let cart = [];
    
    // Fancybox başlatma
    console.log('Fancybox başlatılıyor...');
    if (typeof $.fancybox !== 'undefined') {
        console.log('Fancybox başarıyla yüklendi!');
    } else {
        console.error('Fancybox yüklenemedi!');
    }
    
    // Ürünleri yükle butonu
    $('#loadProducts').on('click', function() {
        $(this).addClass('shake');
        setTimeout(() => $(this).removeClass('shake'), 500);
        loadProducts();
    });
    
    // Sepeti temizle butonu
    $('#clearCart').on('click', function() {
        $(this).addClass('bounce');
        setTimeout(() => $(this).removeClass('bounce'), 500);
        clearCart();
    });
    
    // Ürünleri yükleme fonksiyonu
    function loadProducts() {
        const productCount = $('#productCount').val() || 8;
        
        $('#loading').show();
        $('#productGrid').empty();
        
        $.ajax({
            url: 'https://fakestoreapi.com/products',
            method: 'GET',
            success: function(data) {
                console.log('Ürünler yüklendi:', data.length);
                
                // Belirtilen sayıda ürün al
                allProducts = data.slice(0, productCount);
                
                displayProducts(allProducts);
                updateProductSlider(allProducts);
                
                $('#loading').hide();
            },
            error: function(xhr, status, error) {
                console.error('Ürün yükleme hatası:', error);
                $('#loading').hide();
                alert('Ürünler yüklenirken hata oluştu. Lütfen tekrar deneyin.');
            }
        });
    }
    
    // Ürünleri görüntüleme
    function displayProducts(products) {
        products.forEach((product, index) => {
            const productCard = createProductCard(product, index);
            $('#productGrid').append(productCard);
        });
    }
    
    // Ürün kartı oluşturma
    function createProductCard(product, index) {
        const card = $(`
            <div class="product-card" data-product-index="${index}">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title.substring(0, 50)}${product.title.length > 50 ? '...' : ''}</h3>
                <div class="price">$${product.price}</div>
                <div class="rating">⭐ ${product.rating.rate} (${product.rating.count})</div>
                <button class="detail-btn">👆 Detayları Göster</button>
                <button class="add-to-cart-btn">🛒 Sepete Ekle</button>
            </div>
        `);
        
        // Detay butonu tıklama
        card.find('.detail-btn').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Detay butonu tıklandı:', product.title);
            $(this).css('transform', 'scale(0.95)');
            $(this).css('background', '#ff6b6b');
            setTimeout(() => {
                $(this).css('transform', 'scale(1)');
                $(this).css('background', '#667eea');
                console.log('Modal açılıyor...');
                showProductModal(product);
            }, 150);
        });
        
        // Sepete ekle butonu
        card.find('.add-to-cart-btn').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Sepete ekleniyor:', product.title);
            addToCart(product);
            $(this).text('✅ Eklendi!');
            $(this).css('background', '#28a745');
            setTimeout(() => {
                $(this).text('🛒 Sepete Ekle');
                $(this).css('background', '#ff6b6b');
            }, 2000);
        });
        
        // Hover efektleri
        card.hover(
            function() {
                $(this).find('img').fadeTo(300, 0.8);
            },
            function() {
                $(this).find('img').fadeTo(300, 1);
            }
        );
        
        return card;
    }
    
    // Ürün modalı gösterme
    function showProductModal(product) {
        console.log('showProductModal çağrıldı:', product.title);
        
        // Fancybox kontrolü
        if (typeof $.fancybox === 'undefined') {
            console.error('Fancybox yüklenmemiş!');
            alert('Modal kütüphanesi yüklenemedi. Lütfen sayfayı yenileyin.');
            return;
        }
        
        // Modal içeriği
        const modalContent = `
            <div class="modal-content" style="padding: 20px; max-width: 700px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: start;">
                    <div style="text-align: center;">
                        <img src="${product.image}" alt="${product.title}" style="
                            width: 300px;
                            height: 300px;
                            object-fit: contain;
                            border-radius: 15px;
                            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
                            background: white;
                            padding: 20px;
                        ">
                    </div>
                    
                    <div>
                        <h2 style="color: #333; margin-bottom: 15px; font-size: 1.5rem;">${product.title}</h2>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                            <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">${product.description}</p>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                            <div style="background: #667eea; color: white; padding: 15px; border-radius: 10px; text-align: center;">
                                <strong style="display: block; margin-bottom: 5px;">💰 Fiyat</strong>
                                <span style="font-size: 1.2rem; font-weight: bold;">$${product.price}</span>
                            </div>
                            <div style="background: #28a745; color: white; padding: 15px; border-radius: 10px; text-align: center;">
                                <strong style="display: block; margin-bottom: 5px;">⭐ Değerlendirme</strong>
                                <span>${product.rating.rate} (${product.rating.count})</span>
                            </div>
                        </div>
                        
                        <div style="background: #ffc107; color: #333; padding: 15px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
                            <strong style="display: block; margin-bottom: 5px;">🏷️ Kategori</strong>
                            <span style="text-transform: capitalize;">${product.category}</span>
                        </div>
                        
                        <button class="modal-add-to-cart" style="
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
                        ">🛒 Sepete Ekle - $${product.price}</button>
                    </div>
                </div>
            </div>
        `;
        
        try {
            console.log('Fancybox açılıyor...');
            
            // Geçici div oluştur ve DOM'a ekle
            const tempDiv = $('<div>').html(modalContent).attr('id', 'temp-modal-content');
            $('body').append(tempDiv);
            
            // Modal içindeki sepete ekle butonu
            $('#temp-modal-content .modal-add-to-cart').on('click', function() {
                addToCart(product);
                $(this).text('✅ Sepete Eklendi!');
                $(this).css('background', '#28a745');
                setTimeout(() => {
                    $.fancybox.close();
                }, 1500);
            });
            
            // Fancybox ile modal aç
            $.fancybox.open({
                src: '#temp-modal-content',
                type: 'inline',
                opts: {
                    closeClickOutside: false,
                    closeBtn: true,
                    helpers: {
                        overlay: {
                            locked: false
                        }
                    },
                    afterClose: function() {
                        // Modal kapandıktan sonra geçici div'i temizle
                        $('#temp-modal-content').remove();
                    }
                }
            });
            
            console.log('Fancybox modal açıldı!');
            
        } catch (error) {
            console.error('Fancybox hatası:', error);
            // Hata durumunda geçici div'i temizle
            $('#temp-modal-content').remove();
            alert('Modal açılırken hata oluştu. Lütfen tekrar deneyin.');
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
        
        updateCartDisplay();
        console.log('Sepete eklendi:', product.title);
    }
    
    // Sepet görüntüleme güncelleme
    function updateCartDisplay() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        $('#cartCount').text(totalItems);
        $('#cartTotal').text(`$${totalPrice.toFixed(2)}`);
        
        // Sepet içeriğini güncelle
        $('#cartItems').empty();
        cart.forEach(item => {
            const cartItem = $(`
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: contain;">
                    <div class="cart-item-details">
                        <h4>${item.title.substring(0, 30)}...</h4>
                        <p>$${item.price} x ${item.quantity}</p>
                    </div>
                    <button class="remove-item" data-id="${item.id}">❌</button>
                </div>
            `);
            
            cartItem.find('.remove-item').on('click', function() {
                removeFromCart(item.id);
            });
            
            $('#cartItems').append(cartItem);
        });
    }
    
    // Sepetten çıkarma
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartDisplay();
        console.log('Sepetten çıkarıldı:', productId);
    }
    
    // Sepeti temizleme
    function clearCart() {
        cart = [];
        updateCartDisplay();
        console.log('Sepet temizlendi');
        
        $('#cartItems').html(`
            <div style="text-align: center; color: #666; padding: 20px;">
                <p>🛒 Sepet boş</p>
            </div>
        `);
    }
    
    // Ürün slider'ı güncelleme
    function updateProductSlider(products) {
        const slider = $('#productSlider');
        
        if (slider.hasClass('slick-initialized')) {
            slider.slick('unslick');
        }
        
        slider.empty();
        
        if (products.length > 0) {
            products.forEach(product => {
                const sliderCard = $(`
                    <div class="slider-card">
                        <img src="${product.image}" alt="${product.title}">
                        <h4>${product.title.substring(0, 30)}...</h4>
                        <p class="price">$${product.price}</p>
                        <div class="rating">⭐ ${product.rating.rate}</div>
                    </div>
                `);
                
                slider.append(sliderCard);
            });
            
            // Slick slider'ı başlat
            slider.slick({
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
            
            slider.slick('slickPlay');
        } else {
            slider.html(`
                <div style="text-align: center; color: white; font-size: 16px; padding: 30px;">
                    <p>🎠 Slider temizlendi</p>
                </div>
            `);
        }
    }
    
    // Fancybox ayarları
    $.fancybox.defaults = {
        closeBtn: true,
        closeClickOutside: false,
        helpers: {
            overlay: {
                locked: false
            }
        }
    };
    
    });
});
