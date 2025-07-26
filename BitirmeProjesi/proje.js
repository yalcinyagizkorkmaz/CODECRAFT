(() => {
    const self = {
        products: [],
        favorites: [],
        currentSlide: 0,
        slidesToShow: 10,
        container: null,
        slider: null,
        apiUrl: 'https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json',
        storageKey: 'lcw_products',
        favoritesKey: 'lcw_favorites',
        
        init: function() {
            console.log('🚀 LC Waikiki Karusel başlatılıyor...');
            console.log('📍 .product-detail elementi:', document.querySelector('.product-detail'));
            this.loadFavorites();
            this.loadProducts();
        },
        
        loadFavorites: function() {
            try {
                const favorites = localStorage.getItem(this.favoritesKey);
                if (favorites) {
                    this.favorites = JSON.parse(favorites);
                    console.log('❤️ Favoriler yüklendi:', this.favorites);
                    console.log('📊 Favori sayısı:', this.favorites.length);
                } else {
                    this.favorites = [];
                    console.log('❤️ Favori yok, boş array oluşturuldu');
                }
            } catch (error) {
                console.error('❌ Favoriler yüklenirken hata:', error);
                this.favorites = [];
            }
        },
        
        saveFavorites: function() {
            localStorage.setItem(this.favoritesKey, JSON.stringify(this.favorites));
        },
        
        loadProducts: async function() {
            try {
                console.log('📦 Ürünler yükleniyor...');
                
                
                const cachedData = this.getCachedProducts();
                if (cachedData && cachedData.length > 0) {
                    console.log('💾 Cache\'den ürünler yüklendi');
                    console.log('📊 Cache\'den yüklenen ürün sayısı:', cachedData.length);
                    this.products = cachedData;
                    this.buildHTML();
                    this.buildCSS();
                    this.setEvents();
                    return;
                }
                
                console.log('🌐 Cache boş, API\'den ürünler yükleniyor...');
                console.log('🌐 API URL:', this.apiUrl);
                
                const response = await fetch(this.apiUrl);
                console.log('📡 Response status:', response.status);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const products = await response.json();
                console.log('📋 Ham ürün verisi:', products);
                
             
                this.products = products.map((product, index) => {
                    
                    let formattedPrice = product.price;
                    if (typeof formattedPrice === 'number') {
                        formattedPrice = formattedPrice.toFixed(2).replace('.', ',');
                    } else if (typeof formattedPrice === 'string') {
                        formattedPrice = formattedPrice.replace('.', ',');
                    }

                    return {
                        id: product.id,
                        name: product.name,
                        price: formattedPrice,
                        oldPrice: product.oldPrice || null,
                        image: product.img,
                        url: product.url
                    };
                });
                
                console.log(`✅ ${this.products.length} ürün yüklendi`);
                
                if (this.products.length > 0) {
                    console.log('📦 İlk ürün örneği:', this.products[0]);
                }
                
             
                this.saveProductsToCache();
                
                this.buildHTML();
                this.buildCSS();
                this.setEvents();
            } catch (error) {
                console.error('❌ Ürünler yüklenirken hata:', error);
                console.error('❌ Hata detayı:', error.message);
                
             
                console.log('🔄 Test ürünleri oluşturuluyor...');
          
                
                this.buildHTML();
                this.buildCSS();
                this.setEvents();
            }
        },
        
        getCachedProducts: function() {
            try {
                const cached = localStorage.getItem(this.storageKey);
                if (!cached) {
                    console.log('💾 Cache bulunamadı');
                    return null;
                }
                
                const data = JSON.parse(cached);
                const now = new Date().getTime();
                
               
                if (now - data.timestamp > 86400000) {
                    console.log('⏰ Cache süresi dolmuş, siliniyor');
                    localStorage.removeItem(this.storageKey);
                    return null;
                }
                
                console.log('💾 Cache geçerli, ürünler döndürülüyor');
                return data.products;
            } catch (error) {
                console.error('❌ Cache okuma hatası:', error);
                return null;
            }
        },
        
        saveProductsToCache: function() {
            try {
                const data = {
                    products: this.products,
                    timestamp: new Date().getTime()
                };
                localStorage.setItem(this.storageKey, JSON.stringify(data));
                console.log('💾 Ürünler cache\'e kaydedildi');
            } catch (error) {
                console.error('❌ Cache kaydetme hatası:', error);
            }
        },
        
        buildHTML: function() {
            console.log('🏗️ HTML oluşturuluyor...');
            console.log('📦 Ürün sayısı:', this.products.length);
            
            if (this.products.length === 0) {
                console.log('❌ Ürün yok, HTML oluşturulmuyor');
                return;
            }

            const html = `
                <div class="lcw-carousel-container">
                    <div class="lcw-carousel-wrapper">
                        <button class="lcw-carousel-btn lcw-carousel-btn-prev" aria-label="previous">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242">
                                <path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path>
                            </svg>
                        </button>
                        
                        <div class="lcw-carousel-slider">
                            <p class="lcw-carousel-title">Bunları da Beğenebilirsin</p>
                            <div class="lcw-carousel-track">
                                ${this.products.map(product => `
                                    <div class="lcw-carousel-slide" data-product-id="${product.id}">
                                        <div class="lcw-product-card">
                                            <div class="lcw-product-image">
                                                <img src="${product.image}" alt="${product.name}" loading="lazy" 
                                                     onerror="this.src='https://www.lcwaikiki.com/Resource/Images/Product/Default/xxlarge/4375665-1_l.jpg'">
                                                <button class="lcw-favorite-btn ${this.favorites.includes(String(product.id)) ? 'active' : ''}" 
                                                        data-product-id="${product.id}" aria-label="Favorilere ekle">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="${this.favorites.includes(String(product.id)) ? 'currentColor' : 'none'}">
                                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                                                              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div class="lcw-product-info">
                                                <h4 class="lcw-product-name">${product.name}</h4>
                                                <div class="lcw-product-price">
                                                    <span class="lcw-price-current">${product.price} TL</span>
                                                    ${product.oldPrice ? `<span class="lcw-price-old">${product.oldPrice} TL</span>` : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <button class="lcw-carousel-btn lcw-carousel-btn-next" aria-label="next">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242">
                                <path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `;

            console.log('📄 HTML oluşturuldu, DOM\'a ekleniyor...');
            console.log('❤️ Favori durumu kontrol ediliyor...');
            console.log('📊 Mevcut favoriler:', this.favorites);
            console.log('📊 Favori tipi:', typeof this.favorites[0]);
            
           
            const favoriteProducts = this.products.filter(p => this.favorites.includes(String(p.id)));
            console.log('❤️ Favori olan ürünler:', favoriteProducts.map(p => ({id: p.id, name: p.name})));
            
           
            this.products.forEach(product => {
                const isFavorite = this.favorites.includes(String(product.id));
                console.log(`🔍 Ürün ${product.id} (${typeof product.id}): Favori mi? ${isFavorite}`);
            });

           
            const productDetail = document.querySelector('.product-detail');
            if (productDetail) {
                console.log('✅ .product-detail bulundu, sonrasına ekleniyor');
                productDetail.insertAdjacentHTML('afterend', html);
            } else {
                console.log('⚠️ .product-detail bulunamadı, body\'ye ekleniyor');
                document.body.insertAdjacentHTML('beforeend', html);
            }
            
            this.container = document.querySelector('.lcw-carousel-container');
            this.slider = document.querySelector('.lcw-carousel-track');
            
            console.log('🎯 Container bulundu mu?', !!this.container);
            console.log('🎯 Slider bulundu mu?', !!this.slider);
            console.log('✅ HTML oluşturuldu');
        },
        
        buildCSS: function() {
            console.log('🎨 CSS oluşturuluyor...');
            
            const css = `
                .lcw-carousel-container {
                    margin: 40px 0;
                    padding: 10px;
                    background-color: #f8f9fa;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                @media (max-width: 1200px) {
                    .lcw-carousel-wrapper {
                        width: 90%;
                        gap: 8px;
                    }
                    
                    .lcw-carousel-slide {
                        flex: 0 0 calc((100% - 56px) / 6);
                        min-width: 160px;
                    }
                }

                @media (max-width: 1024px) {
                    .lcw-carousel-wrapper {
                        width: 95%;
                        gap: 6px;
                    }
                    
                    .lcw-carousel-slide {
                        flex: 0 0 calc((100% - 42px) / 5);
                        min-width: 150px;
                    }
                    
                    .lcw-carousel-title {
                        font-size: 28px;
                        line-height: 30px;
                    }
                }

                @media (max-width: 768px) {
                    .lcw-carousel-container {
                        margin: 30px 0;
                        padding: 8px;
                    }
                    
                    .lcw-carousel-wrapper {
                        width: 98%;
                        gap: 4px;
                    }
                    
                    .lcw-carousel-slide {
                        flex: 0 0 calc((100% - 28px) / 4);
                        min-width: 140px;
                    }
                    
                    .lcw-carousel-title {
                        font-size: 24px;
                        line-height: 26px;
                        padding: 12px 0;
                    }
                    
                    .lcw-product-info {
                        padding: 6px;
                        min-height: 100px;
                    }
                    
                    .lcw-product-name {
                        font-size: 12px;
                        line-height: 1.2;
                    }
                    
                    .lcw-price-current {
                        font-size: 16px;
                    }
                    
                    .lcw-price-old {
                        font-size: 12px;
                    }
                    
                    .lcw-favorite-btn {
                        width: 28px;
                        height: 28px;
                    }
                }

                @media (max-width: 480px) {
                    .lcw-carousel-container {
                        margin: 20px 0;
                        padding: 6px;
                    }
                    
                    .lcw-carousel-wrapper {
                        width: 100%;
                        gap: 3px;
                    }
                    
                    .lcw-carousel-slide {
                        flex: 0 0 calc((100% - 21px) / 3);
                        min-width: 120px;
                    }
                    
                    .lcw-carousel-title {
                        font-size: 20px;
                        line-height: 22px;
                        padding: 10px 0;
                    }
                    
                    .lcw-product-info {
                        padding: 4px;
                        min-height: 80px;
                    }
                    
                    .lcw-product-name {
                        font-size: 11px;
                        line-height: 1.1;
                        -webkit-line-clamp: 2;
                    }
                    
                    .lcw-price-current {
                        font-size: 14px;
                    }
                    
                    .lcw-price-old {
                        font-size: 11px;
                    }
                    
                    .lcw-favorite-btn {
                        width: 24px;
                        height: 24px;
                        top: 4px;
                        right: 4px;
                    }
                    
                    .lcw-carousel-btn {
                        width: 32px !important;
                        height: 32px !important;
                    }
                }

                @media (max-width: 360px) {
                    .lcw-carousel-slide {
                        flex: 0 0 calc((100% - 14px) / 2);
                        min-width: 100px;
                    }
                    
                    .lcw-carousel-title {
                        font-size: 18px;
                        line-height: 20px;
                    }
                    
                    .lcw-product-name {
                        font-size: 10px;
                    }
                    
                    .lcw-price-current {
                        font-size: 12px;
                    }
                }

                .lcw-carousel-title {
                    font-size: 35px;
    color: #29323b;
    line-height: 33px;
    font-weight: lighter;
    padding: 15px 0;
    margin: 0;
                }

                                .lcw-carousel-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    
                    
                    margin: 0 auto;
                    width: 84%;
                    min-height: 520px;
                    height: 100%;
                }

                .lcw-carousel-slider {
                    height: 100%;
                    flex: 1;
                    overflow: hidden;
                    position: relative;
                    width: 100%;
                }

                .lcw-carousel-track {
                    display: flex;
                    transition: transform 0.3s ease;
                    gap: 12px;
                    min-height: 520px;
                    width: 100%;
                    margin-top: 10px;
                }

                                .lcw-carousel-slide {
                    flex: 0 0 calc((100% - 84px) / 7.8);
                    min-width: 180px;
                    height: 100%;
                }

                .lcw-product-card {
                    background: white;
                    width: 100%;
                    min-width: 180px;
                 
                    overflow: hidden;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    cursor: pointer;
                    position: relative;
                    border: none;
                }

                .lcw-product-card:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                }

                .lcw-product-image {
                    position: relative;
                    aspect-ratio: 1/1.4;
                    min-height: 250px;
                    overflow: hidden;
                    background: #f8f9fa;
                }

                .lcw-product-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }

                .lcw-product-card:hover .lcw-product-image img {
                    transform: scale(1.05);
                }

                .lcw-favorite-btn {
                    position: absolute;
                    top: 6px;
                    right: 6px;
                    background: transparent;
                    border: none;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    color: #ccc;
                    box-shadow: none;
                }

                .lcw-favorite-btn:hover {
                    transform: none;
                    color: #ccc;
                }

                .lcw-favorite-btn.active {
                    color: #0066cc !important;
                }
                
                .lcw-favorite-btn.active svg {
                    fill: #0066cc !important;
                }

                .lcw-product-info {
                   
                    padding: 8px;
                  
                    min-height: 120px;
                    min-width: 180px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .lcw-product-name {
                    font-size: 14px;
                    font-weight: 400;
                    color: #333;
                    margin: 0;
                    margin-top:0px;
                    line-height: 1.3;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    min-width: 160px;
                }

                .lcw-product-price {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .lcw-price-current {
                    font-size: 18px;
                    font-weight: 600;
                    color: #0066cc;
                    min-width: 80px;
                }

                .lcw-price-old {
                    font-size: 13px;
                    color: #999;
                    text-decoration: line-through;
                }

                .lcw-carousel-btn {
                    background: transparent !important;
                    border: none !important;
                    width: 36px !important;
                    height: 36px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    cursor: pointer !important;
                    transition: all 0.2s ease !important;
                    color: #333 !important;
                    flex-shrink: 0 !important;
                    box-shadow: none !important;
                    position: relative !important;
                    z-index: 10 !important;
                    pointer-events: auto !important;
                }

                .lcw-carousel-btn:hover {
                    background: transparent !important;
                    transform: scale(1.02) !important;
                    color: #0066cc !important;
                }

                .lcw-carousel-btn:disabled {
                    opacity: 0.3 !important;
                    cursor: not-allowed !important;
                    transform: none !important;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.1) !important;
                }

                .lcw-carousel-btn:not(:disabled) {
                    opacity: 1 !important;
                    cursor: pointer !important;
                }

                .lcw-carousel-btn-next svg {
                    transform: rotate(180deg);
                }



                
            `;

            const style = document.createElement('style');
            style.textContent = css;
            document.head.appendChild(style);
            
            console.log('✅ CSS oluşturuldu');
        },
        
        setEvents: function() {
            console.log('🎯 Event listener\'lar ekleniyor...');
            
            const prevBtn = document.querySelector('.lcw-carousel-btn-prev');
            const nextBtn = document.querySelector('.lcw-carousel-btn-next');

            console.log('🔍 Prev buton bulundu mu?', !!prevBtn);
            console.log('🔍 Next buton bulundu mu?', !!nextBtn);

            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('⬅️ Prev buton tıklandı');
                    this.navigateCarousel('prev');
                });
                console.log('✅ Prev buton event listener eklendi');
            } else {
                console.log('❌ Prev buton bulunamadı!');
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('➡️ Next buton tıklandı');
                    this.navigateCarousel('next');
                });
                console.log('✅ Next buton event listener eklendi');
            } else {
                console.log('❌ Next buton bulunamadı!');
            }

            document.addEventListener('click', (e) => {
                const productCard = e.target.closest('.lcw-product-card');
                const favoriteBtn = e.target.closest('.lcw-favorite-btn');

                if (productCard && !favoriteBtn) {
                    const productId = productCard.closest('.lcw-carousel-slide').dataset.productId;
                    const product = this.products.find(p => p.id == productId);
                    if (product && product.url) {
                        window.open(product.url, '_blank');
                    }
                }

                if (favoriteBtn) {
                    e.preventDefault();
                    e.stopPropagation();
                    const productId = favoriteBtn.dataset.productId;
                    this.toggleFavorite(productId, favoriteBtn);
                }
            });

            this.updateNavigationButtons();
            
            window.addEventListener('resize', () => {
                this.updateNavigationButtons();
            });
            
            console.log('✅ Event listener\'lar eklendi');
        },

        navigateCarousel: function(direction) {
            console.log(`🎯 Carousel navigasyonu: ${direction}`);
            console.log('📊 Mevcut slide:', this.currentSlide);
            
            const totalProducts = this.products.length;
            const visibleProducts = this.getVisibleProducts();
            const maxSlides = Math.max(0, totalProducts - visibleProducts + 1);
            
            console.log('📊 Toplam ürün sayısı:', totalProducts);
            console.log('📊 Görünen ürün sayısı:', visibleProducts);
            console.log('📊 Maksimum slide sayısı:', maxSlides);

            if (direction === 'prev') {
                this.currentSlide = Math.max(0, this.currentSlide - 1);
                console.log('⬅️ Önceki slide\'a geçildi:', this.currentSlide);
            } else {
                this.currentSlide = Math.min(maxSlides, this.currentSlide + 1);
                console.log('➡️ Sonraki slide\'a geçildi:', this.currentSlide);
            }

            const slideWidth = 100 / visibleProducts;
            const translateX = -(this.currentSlide * slideWidth);
            console.log('🎯 Transform değeri:', translateX + '%');
            
            if (this.slider) {
                this.slider.style.transform = `translateX(${translateX}%)`;
                console.log('✅ Transform uygulandı');
            } else {
                console.log('❌ Slider bulunamadı!');
            }

            this.updateNavigationButtons();
        },

        getVisibleProducts: function() {
            const width = window.innerWidth;
            if (width <= 360) return 2;
            if (width <= 480) return 3;
            if (width <= 768) return 4;
            if (width <= 1024) return 5;
            if (width <= 1200) return 6;
            return 8;
        },

        updateNavigationButtons: function() {
            const prevBtn = document.querySelector('.lcw-carousel-btn-prev');
            const nextBtn = document.querySelector('.lcw-carousel-btn-next');
            const totalProducts = this.products.length;
            const visibleProducts = this.getVisibleProducts();
            const maxSlides = Math.max(0, totalProducts - visibleProducts + 1);

            console.log('🔍 Navigation butonları güncelleniyor...');
            console.log('📊 Mevcut slide:', this.currentSlide);
            console.log('📊 Maksimum slide:', maxSlides);

            if (prevBtn) {
                const prevDisabled = this.currentSlide === 0;
                prevBtn.disabled = prevDisabled;
                console.log('⬅️ Prev buton disabled:', prevDisabled);
            } else {
                console.log('❌ Prev buton bulunamadı!');
            }

            if (nextBtn) {
                const nextDisabled = this.currentSlide >= maxSlides;
                nextBtn.disabled = nextDisabled;
                console.log('➡️ Next buton disabled:', nextDisabled);
            } else {
                console.log('❌ Next buton bulunamadı!');
            }
        },

        toggleFavorite: function(productId, button) {
            const productIdStr = String(productId);
            const index = this.favorites.indexOf(productIdStr);
            
            if (index > -1) {
                this.favorites.splice(index, 1);
                button.classList.remove('active');
                button.querySelector('svg').setAttribute('fill', 'none');
                console.log(`💔 ${productIdStr} favorilerden çıkarıldı`);
            } else {
                this.favorites.push(productIdStr);
                button.classList.add('active');
                button.querySelector('svg').setAttribute('fill', 'currentColor');
                console.log(`❤️ ${productIdStr} favorilere eklendi`);
            }

            this.saveFavorites();
            console.log('💾 Favoriler kaydedildi:', this.favorites);
            
            this.debugFavorites();
        },
        
        debugFavorites: function() {
            console.log('🔍 DEBUG: Favori durumu kontrol ediliyor...');
            console.log('📊 Mevcut favoriler (memory):', this.favorites);
            
            const stored = localStorage.getItem(this.favoritesKey);
            console.log('💾 localStorage\'da saklanan:', stored);
            
            if (stored) {
                const parsed = JSON.parse(stored);
                console.log('📋 Parse edilmiş favoriler:', parsed);
            }
            
            const activeButtons = document.querySelectorAll('.lcw-favorite-btn.active');
            console.log('❤️ Aktif favori buton sayısı:', activeButtons.length);
        }
    };

    self.init();
    
    window.lcwDebug = {
        checkFavorites: function() {
            console.log('🔍 Favori durumu kontrol ediliyor...');
            const favorites = JSON.parse(localStorage.getItem('lcw_favorites')) || [];
            console.log('❤️ localStorage\'daki favoriler:', favorites);
            console.log('📊 Favori sayısı:', favorites.length);
            return favorites;
        },
        
        checkCache: function() {
            console.log('🔍 Cache durumu kontrol ediliyor...');
            const cached = localStorage.getItem('lcw_products');
            if (cached) {
                const data = JSON.parse(cached);
                console.log('💾 Cache verisi:', data);
                console.log('📊 Cache\'deki ürün sayısı:', data.products ? data.products.length : 0);
                console.log('⏰ Cache zamanı:', new Date(data.timestamp));
            } else {
                console.log('💾 Cache bulunamadı');
            }
        },
        
        testCarousel: function() {
            console.log('🎯 Carousel test ediliyor...');
            
            const prevBtn = document.querySelector('.lcw-carousel-btn-prev');
            const nextBtn = document.querySelector('.lcw-carousel-btn-next');
            const slider = document.querySelector('.lcw-carousel-track');
            
            console.log('🔍 Prev buton:', prevBtn);
            console.log('🔍 Next buton:', nextBtn);
            console.log('🔍 Slider:', slider);
            
            if (prevBtn) {
                console.log('✅ Prev buton bulundu');
                console.log('📊 Prev buton disabled:', prevBtn.disabled);
                console.log('📊 Prev buton style:', prevBtn.style.cssText);
            }
            
            if (nextBtn) {
                console.log('✅ Next buton bulundu');
                console.log('📊 Next buton disabled:', nextBtn.disabled);
                console.log('📊 Next buton style:', nextBtn.style.cssText);
            }
            
            if (slider) {
                console.log('✅ Slider bulundu');
                console.log('📊 Slider transform:', slider.style.transform);
            }
            
         
            if (window.self && window.self.navigateCarousel) {
                console.log('✅ navigateCarousel fonksiyonu mevcut');
                console.log('📊 Mevcut slide:', window.self.currentSlide);
            }
        },
        
        clearAll: function() {
            console.log('🗑️ Tüm localStorage temizleniyor...');
            localStorage.removeItem('lcw_favorites');
            localStorage.removeItem('lcw_products');
            console.log('✅ Temizlendi, sayfayı yenileyin');
        }
    };
    
    console.log('🎯 Debug komutları:');
    console.log('lcwDebug.checkFavorites() - Favorileri kontrol et');
    console.log('lcwDebug.checkCache() - Cache\'i kontrol et');
    console.log('lcwDebug.testCarousel() - Carousel butonlarını test et');
    console.log('lcwDebug.clearAll() - Tüm verileri temizle');
})();