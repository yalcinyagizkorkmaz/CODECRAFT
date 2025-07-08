const prompt = require('prompt-sync')();


const name = prompt('Adınız nedir? ');
const age = Number(prompt('Yaşınız kaç? '));
const job = prompt('Mesleğiniz nedir? ');

const user = { name, age, job };
console.log('Kullanıcı Bilgileri:', user);


let cart = [];

while (true) {
    const productName = prompt("Sepete eklemek istediğiniz ürünü yazın (çıkmak için q, ürün silmek için remove yazın): ");
    if (!productName) continue;
    if (productName.toLowerCase() === 'q') break;
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
    const price = Number(prompt('Ürünün fiyatı: '));
    if (!productName || isNaN(price) || price <= 0) {
        console.log('Geçersiz ürün veya fiyat girdiniz.');
        continue;
    }
    cart.push({ name: productName, price });
    console.log(`${productName} ürünü sepete eklendi. Fiyat: ${price} TL`);
}

console.log('Sepetiniz:', cart);
const total = cart.reduce((sum, item) => sum + item.price, 0);
console.log('Toplam Fiyat:', total, 'TL'); 