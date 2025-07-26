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
            this.loadFavorites();
            this.loadProducts();
        },
        
        loadFavorites: function() {
            const favorites = localStorage.getItem(this.favoritesKey);
            if (favorites) {
                this.favorites = JSON.parse(favorites);
            }
        },
        
        saveFavorites: function() {
            localStorage.setItem(this.favoritesKey, JSON.stringify(this.favorites));
        },
        
        loadProducts: async function() {
            try {
                console.log('📦 Ürünler yükleniyor...');
                const response = await fetch(this.apiUrl);
                const products = await response.json();
                
                this.products = products;
                console.log(`✅ ${products.length} ürün yüklendi`);
                
                this.buildHTML();
                this.buildCSS();
                this.setEvents();
            } catch (error) {
                console.error('❌ Ürünler yüklenirken hata:', error);
            }
        },
        
        buildHTML: function() {
            if (this.products.length === 0) {
                console.log('❌ Ürün yok');
                return;
            }

            const html = `
                <div class="lcw-carousel-container">
                    <div class="lcw-carousel-header">
                        <h3 class="lcw-carousel-title">Benzer Ürünler</h3>
                    </div>
                    <div class="lcw-carousel-wrapper">
                        <button class="lcw-carousel-btn lcw-carousel-btn-prev" aria-label="Önceki">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        
                        <div class="lcw-carousel-slider">
                            <div class="lcw-carousel-track">
                                ${this.products.map(product => `
                                    <div class="lcw-carousel-slide" data-product-id="${product.id}">
                                        <div class="lcw-product-card">
                                            <div class="lcw-product-image">
                                                <img src="${product.image}" alt="${product.name}" loading="lazy">
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
                                                    <span class="lcw-price-current">${product.price} TRY</span>
                                                    ${product.oldPrice ? `<span class="lcw-price-old">${product.oldPrice} TRY</span>` : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <button class="lcw-carousel-btn lcw-carousel-btn-next" aria-label="Sonraki">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;

            // .product-detail elementinden sonra ekle
            const productDetail = document.querySelector('.product-detail');
            if (productDetail) {
                productDetail.insertAdjacentHTML('afterend', html);
            } else {
                // Test için body'ye ekle
                document.body.insertAdjacentHTML('beforeend', html);
            }
            
            this.container = document.querySelector('.lcw-carousel-container');
            this.slider = document.querySelector('.lcw-carousel-track');
            console.log('✅ HTML oluşturuldu');
        },
        
        buildCSS: function() {
            const css = `
                .lcw-carousel-container {
                    margin: 40px 0;
                    padding: 0 20px;
                    max-width: 1200px;
                    margin-left: auto;
                    margin-right: auto;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .lcw-carousel-header {
                    margin-bottom: 20px;
                }

                .lcw-carousel-title {
                    font-size: 24px;
                    font-weight: 600;
                    color: #333;
                    margin: 0;
                }

                .lcw-carousel-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .lcw-carousel-slider {
                    flex: 1;
                    overflow: hidden;
                    position: relative;
                }

                .lcw-carousel-track {
                    display: flex;
                    transition: transform 0.3s ease;
                    gap: 20px;
                }

                .lcw-carousel-slide {
                    flex: 0 0 calc(16.666% - 16.67px);
                    min-width: 0;
                }

                .lcw-product-card {
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    cursor: pointer;
                    position: relative;
                }

                .lcw-product-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
                }

                .lcw-product-image {
                    position: relative;
                    aspect-ratio: 1;
                    overflow: hidden;
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
                    top: 10px;
                    right: 10px;
                    background: white;
                    border: none;
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    color: #ccc;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                .lcw-favorite-btn:hover {
                    transform: scale(1.1);
                    color: #ff4757;
                }

                .lcw-favorite-btn.active {
                    color: #ff4757;
                    background: #fff5f5;
                }

                .lcw-product-info {
                    padding: 15px;
                }

                .lcw-product-name {
                    font-size: 14px;
                    font-weight: 500;
                    color: #333;
                    margin: 0 0 8px 0;
                    line-height: 1.3;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .lcw-product-price {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .lcw-price-current {
                    font-size: 16px;
                    font-weight: 600;
                    color: #333;
                }

                .lcw-price-old {
                    font-size: 14px;
                    color: #999;
                    text-decoration: line-through;
                }

                .lcw-carousel-btn {
                    background: white;
                    border: 1px solid #e0e0e0;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    color: #666;
                    flex-shrink: 0;
                }

                .lcw-carousel-btn:hover {
                    background: #f8f9fa;
                    border-color: #ccc;
                    color: #333;
                }

                .lcw-carousel-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                /* Responsive Design */
                @media (max-width: 1200px) {
                    .lcw-carousel-slide {
                        flex: 0 0 calc(20% - 16px);
                    }
                }

                @media (max-width: 1024px) {
                    .lcw-carousel-slide {
                        flex: 0 0 calc(25% - 15px);
                    }
                }

                @media (max-width: 768px) {
                    .lcw-carousel-container {
                        padding: 0 15px;
                        margin: 30px 0;
                    }

                    .lcw-carousel-title {
                        font-size: 20px;
                    }

                    .lcw-carousel-slide {
                        flex: 0 0 calc(33.333% - 13.33px);
                    }

                    .lcw-carousel-wrapper {
                        gap: 10px;
                    }

                    .lcw-carousel-track {
                        gap: 15px;
                    }

                    .lcw-product-info {
                        padding: 12px;
                    }

                    .lcw-product-name {
                        font-size: 13px;
                    }

                    .lcw-price-current {
                        font-size: 15px;
                    }
                }

                @media (max-width: 480px) {
                    .lcw-carousel-slide {
                        flex: 0 0 calc(50% - 10px);
                    }

                    .lcw-carousel-btn {
                        width: 36px;
                        height: 36px;
                    }

                    .lcw-favorite-btn {
                        width: 28px;
                        height: 28px;
                    }
                }
            `;

            const style = document.createElement('style');
            style.textContent = css;
            document.head.appendChild(style);
        },
        
        setEvents: function() {
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