const gorevForm = document.getElementById('gorevForm');
const gorevListesi = document.getElementById('gorevListesi');
const hataMesaji = document.getElementById('hataMesaji');
const filtreBtn = document.getElementById('filtreBtn');
const siralaSelect = document.getElementById('siralaSelect');

let gorevler = [];
let sadeceTamamlanan = false;

gorevForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const baslik = document.getElementById('baslik').value;
    console.log(baslik); 
    hataMesaji.textContent = '';
    try {
        const aciklama = document.getElementById('aciklama').value.trim();
        const oncelikRadio = document.querySelector('input[name="oncelik"]:checked');
        if (!baslik) {
            hataMesaji.textContent = 'Başlık zorunludur!';
            return;
        }
        if (!oncelikRadio) {
            hataMesaji.textContent = 'Lütfen bir öncelik seçiniz!';
            return;
        }
        const oncelik = oncelikRadio.value;
        const gorev = {
            id: Date.now(),
            baslik,
            aciklama,
            oncelik,
            tamamlandi: false
        };
        gorevler.push(gorev);
        gorevForm.reset();
        renderGorevler();
    } catch (err) {
        hataMesaji.textContent = 'Beklenmedik bir hata oluştu!';
        console.error(err);
    }
});

gorevListesi.addEventListener('click', function(e) {
    console.log(e.target);
    e.stopPropagation();
    const li = e.target.closest('li');
    if (!li) return;
    const id = Number(li.dataset.id);

    if (e.target.classList.contains('sil-btn')) {
        gorevler = gorevler.filter(g => g.id !== id);
        renderGorevler();
    }
    if (e.target.classList.contains('tamamla-btn')) {
        const gorev = gorevler.find(g => g.id === id);
        if (gorev) {
            gorev.tamamlandi = !gorev.tamamlandi;
            renderGorevler();
        }
    }
});

filtreBtn.addEventListener('click', function() {
    sadeceTamamlanan = !sadeceTamamlanan;
    filtreBtn.textContent = sadeceTamamlanan ? 'Tüm görevleri göster' : 'Sadece tamamlananları göster';
    renderGorevler();
});

siralaSelect.addEventListener('change', function() {
    renderGorevler();
});


const oncelikRadios = document.querySelectorAll('input[name="oncelik"]');

oncelikRadios.forEach(function(radio) {
    radio.addEventListener('change', function(e) {
        console.log('Seçilen öncelik:', e.target.value);
    });
});


const baslikInput = document.getElementById('baslik');
const aciklamaInput = document.getElementById('aciklama');

baslikInput.addEventListener('mouseover', function() {
    console.log('Başlık inputunun üzerine gelindi.');
});

aciklamaInput.addEventListener('mouseover', function() {
    console.log('Açıklama textarea üzerine gelindi.');
});

function renderGorevler() {
    let gosterilecekler = [...gorevler];
    if (sadeceTamamlanan) {
        gosterilecekler = gosterilecekler.filter(g => g.tamamlandi);
    }
    if (siralaSelect.value === 'oncelikAsc') {
        const oncelikSirasi = { 'Düşük': 1, 'Orta': 2, 'Yüksek': 3 };
        gosterilecekler.sort((a, b) => oncelikSirasi[a.oncelik] - oncelikSirasi[b.oncelik]);
    }
    if (siralaSelect.value === 'oncelikDesc' || siralaSelect.value === 'yuksektenDusuge') {
        const oncelikSirasi = { 'Düşük': 1, 'Orta': 2, 'Yüksek': 3 };
        gosterilecekler.sort((a, b) => oncelikSirasi[b.oncelik] - oncelikSirasi[a.oncelik]);
    }
    gorevListesi.innerHTML = '';
    gosterilecekler.forEach(gorev => {
        const li = document.createElement('li');
        li.className = 'gorev-item' + (gorev.tamamlandi ? ' tamamlandi' : '');
        li.dataset.id = gorev.id;
        const tamamlaClass = gorev.tamamlandi ? 'tamamla-btn gerial' : 'tamamla-btn';
        const tamamlaText = gorev.tamamlandi ? 'Geri Al' : 'Tamamla';
        li.innerHTML = `
            <span class="gorev-baslik">${gorev.baslik}</span>
            ${gorev.aciklama ? `<span class="gorev-aciklama">${gorev.aciklama}</span>` : ''}
            <span class="gorev-oncelik">Öncelik: ${gorev.oncelik}</span>
            <div style="margin-top:8px;">
                <button class="${tamamlaClass}">${tamamlaText}</button>
                <button class="sil-btn">Sil</button>
            </div>
        `;
        gorevListesi.appendChild(li);
    });
}