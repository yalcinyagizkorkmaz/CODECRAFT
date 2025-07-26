(() => {
    const self = {
        products: [],
        favorites: [],
        currentSlide: 0,
        slidesToShow: 6,
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
            const favorites = localStorage.getItem(this.favoritesKey);
            if (favorites) {
                this.favorites = JSON.parse(favorites);
                console.log('❤️ Favoriler yüklendi:', this.favorites);
            } else {
                console.log('❤️ Favori yok');
            }
        },
        
        saveFavorites: function() {
            localStorage.setItem(this.favoritesKey, JSON.stringify(this.favorites));
        },
        
        loadProducts: async function() {
            try {
                console.log('📦 Ürünler yükleniyor...');
                console.log('🌐 API URL:', this.apiUrl);
                
                const response = await fetch(this.apiUrl);
                console.log('📡 Response status:', response.status);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const products = await response.json();
                console.log('📋 Ham ürün verisi:', products);
                
            
                
                // Ürün verilerini temizle ve eksik alanları doldur
                this.products = products.map((product, index) => {
                    // Fiyatı Türkçe formatla
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
                        image: product.img, // img alanı doğrudan kullanılıyor
                        url: product.url
                    };
                });
                
                console.log(`✅ ${this.products.length} ürün yüklendi`);
                
                if (this.products.length > 0) {
                    console.log('📦 İlk ürün örneği:', this.products[0]);
                }
                
                this.buildHTML();
                this.buildCSS();
                this.setEvents();
            } catch (error) {
                console.error('❌ Ürünler yüklenirken hata:', error);
                console.error('❌ Hata detayı:', error.message);
                
                // Test için örnek ürünler oluştur
                console.log('🔄 Test ürünleri oluşturuluyor...');
          
                
                this.buildHTML();
                this.buildCSS();
                this.setEvents();
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
                                                <button class="lcw-favorite-btn ${this.favorites.includes(product.id) ? 'active' : ''}" 
                                                        data-product-id="${product.id}" aria-label="Favorilere ekle">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="${this.favorites.includes(product.id) ? 'currentColor' : 'none'}">
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

            // .product-detail elementinden sonra ekle
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
                    padding: 20px;
                    background-color: white;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
                    gap: 10px;
                    
                    margin: 0 auto;
                    width: 85%;
                    min-height: 520px;
                    height: 100%;
                }

                .lcw-carousel-slider {
                    height: 100%;
                    flex: 1;
                    overflow: hidden;
                    position: relative;
                }

                .lcw-carousel-track {
                    display: flex;
                    transition: transform 0.3s ease;
                    gap: 12px;
                    min-height: 520px;
                }

                                .lcw-carousel-slide {
                    flex: 0 0 calc(13.5% - 12px);
                    min-width: 0;
                    height: 100%;
                }

                .lcw-product-card {
                    background: white;
                 
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
                    color: #0066cc;
                }

                .lcw-product-info {
                    padding: 8px;
                    min-height: 120px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .lcw-product-name {
                    font-size: 14px;
                    font-weight: 400;
                    color: #333;
                    margin: 0;
                    line-height: 1.3;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
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
                }

                .lcw-price-old {
                    font-size: 13px;
                    color: #999;
                    text-decoration: line-through;
                }

                .lcw-carousel-btn {
                    background: transparent;
                    border: none;
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    color: #333;
                    flex-shrink: 0;
                    box-shadow: none;
                    position: relative;
                }

                .lcw-carousel-btn:hover {
                    background: transparent;
                    transform: scale(1.02);
                }

                .lcw-carousel-btn:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                    transform: none;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
                }

                .lcw-carousel-btn-next svg {
                    transform: rotate(180deg);
                }



                /* Responsive Design */
                @media (max-width: 1200px) {
                    .lcw-carousel-slide {
                        flex: 0 0 calc(100% - 12px);
                    }
                }

                @media (max-width: 1024px) {
                    .lcw-carousel-slide {
                        flex: 0 0 calc(25% - 10.25px);
                    }
                }

                @media (max-width: 768px) {
                    .lcw-carousel-container {
                        padding: 15px;
                        margin: 30px 0;
                    }

                    .lcw-carousel-title {
                        font-size: 20px;
                    }

                    .lcw-carousel-slide {
                        flex: 0 0 calc(33.333% - 10px);
                    }

                    .lcw-carousel-wrapper {
                        gap: 10px;
                    }

                    .lcw-carousel-track {
                        gap: 12px;
                    }

                    .lcw-product-info {
                        padding: 5px;
                    }

                    .lcw-product-name {
                        font-size: 14px;
                    }

                    .lcw-price-current {
                        font-size: 14px;
                    }
                }

                @media (max-width: 480px) {
                    .lcw-carousel-slide {
                        flex: 0 0 calc(100% - 7.5px);
                    }

                    .lcw-carousel-btn {
                        width: 32px;
                        height: 32px;
                    }

                    .lcw-favorite-btn {
                        width: 24px;
                        height: 24px;
                    }
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

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    this.navigateCarousel('prev');
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    this.navigateCarousel('next');
                });
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
            console.log('✅ Event listener\'lar eklendi');
        },

        navigateCarousel: function(direction) {
            const totalSlides = this.products.length;
            const maxSlides = Math.ceil(totalSlides / this.slidesToShow);

            if (direction === 'prev') {
                this.currentSlide = Math.max(0, this.currentSlide - 1);
            } else {
                this.currentSlide = Math.min(maxSlides - 1, this.currentSlide + 1);
            }

            const translateX = -(this.currentSlide * (100 / this.slidesToShow));
            this.slider.style.transform = `translateX(${translateX}%)`;

            this.updateNavigationButtons();
        },

        updateNavigationButtons: function() {
            const prevBtn = document.querySelector('.lcw-carousel-btn-prev');
            const nextBtn = document.querySelector('.lcw-carousel-btn-next');
            const totalSlides = this.products.length;
            const maxSlides = Math.ceil(totalSlides / this.slidesToShow);

            if (prevBtn) {
                prevBtn.disabled = this.currentSlide === 0;
            }

            if (nextBtn) {
                nextBtn.disabled = this.currentSlide >= maxSlides - 1;
            }
        },

        toggleFavorite: function(productId, button) {
            const index = this.favorites.indexOf(productId);
            
            if (index > -1) {
                this.favorites.splice(index, 1);
                button.classList.remove('active');
                button.querySelector('svg').setAttribute('fill', 'none');
            } else {
                this.favorites.push(productId);
                button.classList.add('active');
                button.querySelector('svg').setAttribute('fill', 'currentColor');
            }

            this.saveFavorites();
        }
    };

    // Başlat
    self.init();
})();