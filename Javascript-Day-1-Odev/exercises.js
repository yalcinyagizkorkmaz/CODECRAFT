const prompt = require('prompt-sync')();


let name;
while (true) {
    name = prompt('Adınız nedir? ');
    if (!name || name.trim() === '') {
        console.log('İsim boş olamaz.');
        continue;
    }
    if (/\d/.test(name)) {
        console.log('İsimde sayı olamaz, lütfen sadece harf girin.');
        continue;
    }
    break;
}


let age;
while (true) {
    const ageInput = prompt('Yaşınız kaç? ');
    age = Number(ageInput);
    if (ageInput.trim() === '' || isNaN(age)) {
        console.log('Yaş kısmına sadece sayı giriniz.');
        continue;
    }
    break;
}


let job;
while (true) {
    job = prompt('Mesleğiniz nedir? ');
    if (!job || job.trim() === '') {
        console.log('Meslek boş olamaz.');
        continue;
    }
    if (/^\d+$/.test(job)) {
        console.log('Meslek kısmına sayı girilemez, lütfen geçerli bir meslek girin.');
        continue;
    }
    break;
}

const user = { name, age, job };
console.log('Kullanıcı Bilgileri:', user);

let cart = [];

while (true) {
    const productName = prompt("Sepete eklemek istediğiniz ürünü yazın (çıkmak için q, ürün silmek için remove yazın, tümünü silmek için clear yazın): ");
    if (!productName) continue;
    if (productName.toLowerCase() === 'q') break;
    if (productName.toLowerCase() === 'clear') {
        if (cart.length === 0) {
            console.log('Sepet zaten boş.');
        } else {
            cart = [];
            console.log('Sepetteki tüm ürünler silindi.');
        }
        continue;
    }
    if (productName.toLowerCase() === 'remove') {
        if (cart.length === 0) {
            console.log('Sepet boş, silinecek ürün yok.');
            continue;
        }
        const removeName = prompt('Sepetten çıkarmak istediğiniz ürünün adını yazın: ');
        const index = cart.findIndex(item => item.name.toLowerCase() === removeName.toLowerCase());
        if (index !== -1) {
            const removed = cart.splice(index, 1)[0];
            console.log(`${removed.name} ürünü sepetten çıkarıldı.`);
        } else {
            console.log('Ürün sepette bulunamadı.');
        }
        continue;
    }
    const priceInput = prompt('Ürünün fiyatı: ');
    const price = Number(priceInput);
    if (priceInput.trim() === '' || isNaN(price)) {
        console.log('Lütfen geçerli bir sayı girin.');
        continue;
    }
    if (!productName || price <= 0) {
        console.log('Geçersiz ürün veya fiyat girdiniz.');
        continue;
    }
    cart.push({ name: productName, price });
    console.log(`${productName} ürünü sepete eklendi. Fiyat: ${price} TL`);
}

console.log('Sepetiniz:', cart);
const total = cart.reduce((sum, item) => sum + item.price, 0);
console.log('Toplam Fiyat:', total, 'TL'); 