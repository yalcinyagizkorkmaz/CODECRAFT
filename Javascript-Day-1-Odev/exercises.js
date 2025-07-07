// JavaScript Alıştırmaları
// 1. Kullanıcı bilgileri objesi
let userInfo = null;

// 2. Sepet array'i
let cart = [];

// 3. Kullanıcı bilgilerini alma fonksiyonu (form ile)
function handleUserFormSubmit(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('user-name');
    const ageInput = document.getElementById('user-age');
    const jobInput = document.getElementById('user-job');
    
    if (!nameInput || !ageInput || !jobInput) return;
    
    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value);
    const profession = jobInput.value.trim();
    
    if (name && !isNaN(age) && age > 0 && profession) {
        userInfo = {
            name: name,
            age: age,
            profession: profession
        };
        
        displayUserInfo();
        showNotification('Kullanıcı bilgileri başarıyla kaydedildi! ✅');
        
        // Form'u gizle ve bilgileri göster
        const form = document.getElementById('user-form');
        const userInfoDiv = document.getElementById('user-info');
        const cartSection = document.getElementById('cart-section');
        
        if (form && userInfoDiv) {
            form.style.display = 'none';
            userInfoDiv.style.display = 'block';
        }
        
        // Sepet bölümünü göster
        if (cartSection) {
            cartSection.style.display = 'block';
            // Animasyonlu gösterim
            cartSection.style.opacity = '0';
            cartSection.style.transform = 'translateY(20px)';
            cartSection.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                cartSection.style.opacity = '1';
                cartSection.style.transform = 'translateY(0)';
            }, 100);
        }
    } else {
        showNotification('Lütfen tüm bilgileri doğru şekilde doldurun! ❌');
    }
}

// 4. Kullanıcı bilgilerini gösterme fonksiyonu
function displayUserInfo() {
    const userInfoDiv = document.getElementById('user-info');
    
    if (userInfo && userInfoDiv) {
        userInfoDiv.innerHTML = `
            <p><strong>Ad:</strong> ${userInfo.name}</p>
            <p><strong>Yaş:</strong> ${userInfo.age}</p>
            <p><strong>Meslek:</strong> ${userInfo.profession}</p>
            <button onclick="editUserInfo()" class="exercise-btn" style="margin-top: 1rem;">
                <i class="fas fa-edit"></i> Bilgileri Düzenle
            </button>
        `;
    } else if (userInfoDiv) {
        userInfoDiv.innerHTML = '<p>Kullanıcı bilgileri henüz girilmedi.</p>';
    }
}

// 4.1. Kullanıcı bilgilerini düzenleme fonksiyonu
function editUserInfo() {
    const form = document.getElementById('user-form');
    const userInfoDiv = document.getElementById('user-info');
    const cartSection = document.getElementById('cart-section');
    
    if (form && userInfoDiv) {
        form.style.display = 'block';
        userInfoDiv.style.display = 'none';
        
        // Sepet bölümünü gizle
        if (cartSection) {
            cartSection.style.display = 'none';
        }
        
        // Form alanlarını mevcut bilgilerle doldur
        if (userInfo) {
            const nameInput = document.getElementById('user-name');
            const ageInput = document.getElementById('user-age');
            const jobInput = document.getElementById('user-job');
            
            if (nameInput && ageInput && jobInput) {
                nameInput.value = userInfo.name;
                ageInput.value = userInfo.age;
                jobInput.value = userInfo.profession;
            }
        }
    }
}

// 5. Ürün ekleme fonksiyonu (dinamik olarak)
function addProduct() {
    const nameInput = document.getElementById('product-name');
    const priceInput = document.getElementById('product-price');
    
    if (!nameInput || !priceInput) return;
    
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    
    if (name && !isNaN(price) && price > 0) {
        const product = {
            id: Date.now(), // Benzersiz ID için timestamp
            name: name,
            price: price
        };
        
        cart.push(product); // Array'e ekleme
        
        // Input alanlarını temizle
        nameInput.value = '';
        priceInput.value = '';
        
        // Sepeti güncelle
        displayCart();
        calculateTotal();
        
        showNotification(`"${name}" sepete eklendi! 🛒`);
    } else {
        showNotification('Lütfen geçerli ürün adı ve fiyat girin! ❌');
    }
}

// 6. Sepeti gösterme fonksiyonu (array listeleme)
function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    
    if (!cartItemsDiv) return;
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Sepet boş</p>';
        return;
    }
    
    const cartHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price.toFixed(2)} ₺</div>
            </div>
            <button class="remove-btn" onclick="removeProduct(${item.id})">Kaldır</button>
        </div>
    `).join('');
    
    cartItemsDiv.innerHTML = cartHTML;
}

// 7. Ürün kaldırma fonksiyonu (array'den çıkarma)
function removeProduct(productId) {
    const index = cart.findIndex(item => item.id === productId);
    
    if (index !== -1) {
        const removedProduct = cart[index];
        cart.splice(index, 1); // Array'den çıkarma
        
        displayCart();
        calculateTotal();
        
        showNotification(`"${removedProduct.name}" sepetten kaldırıldı! 🗑️`);
    }
}

// 8. Toplam fiyat hesaplama fonksiyonu (reduce kullanarak)
function calculateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = total.toFixed(2);
    }
}

// 9. Sepeti temizleme fonksiyonu
function clearCart() {
    if (cart.length > 0) {
        cart = [];
        displayCart();
        calculateTotal();
        showNotification('Sepet temizlendi! 🧹');
    } else {
        showNotification('Sepet zaten boş! 📭');
    }
}

// 10. Bildirim gösterme fonksiyonu
function showNotification(message) {
    // Mevcut bildirimleri temizle
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Yeni bildirim oluştur
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Stil ekle
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animasyon
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Kapatma butonu
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Otomatik kapatma
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
}

// 11. Event listener'ları ekleme
document.addEventListener('DOMContentLoaded', function() {
    // Form submit event listener
    const userForm = document.getElementById('user-form');
    if (userForm) {
        userForm.addEventListener('submit', handleUserFormSubmit);
    }
    
    // Sepet işlemleri için event listener'lar
    const addProductBtn = document.getElementById('add-product');
    const clearCartBtn = document.getElementById('clear-cart');
    
    if (addProductBtn) {
        addProductBtn.addEventListener('click', addProduct);
    }
    
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
    
    // Enter tuşu ile ürün ekleme
    const productNameInput = document.getElementById('product-name');
    const productPriceInput = document.getElementById('product-price');
    
    if (productNameInput && productPriceInput) {
        productNameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                productPriceInput.focus();
            }
        });
        
        productPriceInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addProduct();
            }
        });
    }
    
    // Sayfa yüklendiğinde sepet bölümünü gizle
    const cartSection = document.getElementById('cart-section');
    if (cartSection) {
        cartSection.style.display = 'none';
    }
    
    // Sayfa yüklendiğinde sepeti göster (sadece görsel amaçlı)
    displayCart();
    calculateTotal();
});

console.log('JavaScript Alıştırmaları yüklendi! 🚀'); 