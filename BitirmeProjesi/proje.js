(() => {
    const init = () => {
        self.buildHTML();
        self.buildCSS();
        self.setEvents();
    };

    const buildHTML = () => {
      
        const html = `
            <div class="container">
                <div class="recommendation-carousel">
                <div class="carousel-container">
                <p class="similar-products-title">Benzer Ürünler</p>
                <div class="carousel padded-carousel">
                <button type="button" aria-label="previous" class="buttonBack___1mlaL carousel__back-button carousel-arrow carousel-arrow-left"><svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242"><path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242"><path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path>
                <path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path>
                </svg>
                </button>
               <div class="horizontalSlider___281Ls carousel__slider carousel__slider--horizontal" aria-live="polit" aria-label="slider" role="listbox">
               <div class="carousel__slider-tray-wrapper carousel__slider-tray-wrap--horizontal">
               <div class="sliderTray___-vHFQ sliderAnimation___300FY carousel__slider-tray carousel__slider-tray--horizontal" style="display: flex; align-items: stretch; width: 370.528%; transform: translateX(-6.66667%) translateX(0px); flex-direction: row;">
               <div class="slide___3-Nqo slideHorizontal___1NzNV carousel__slide carousel__slide--hidden" aria-selected="false" aria-label="slide" role="option" style="width: 6.66667%; padding-bottom: unset; height: unset"> </div>
               </div>
               </div>
               </div>
                </div>
                </div>
                </div>
            </div>
        `;

        $('.product-detail').append(html);
    };

    const buildCSS = () => {
        const css = `
            .container {
                background-color: red;
                height: 100px;
                width: 100px;
            }
        `;

        $('<style>').addClass('carousel-style').html(css).appendTo('head');
    };

    const setEvents = () => {
        $('').on('click', () => {
            console.log('clicked');
        });
    };

    init();
})();