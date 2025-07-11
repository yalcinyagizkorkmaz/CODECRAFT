
    let interval = null;
    let kalan = 0;

    const sureInput = document.getElementById("time");
    const baslatBtn = document.getElementById("start");
    const sifirlaBtn = document.getElementById("reset");
    const geriSayimP = document.getElementById("countdown");

    baslatBtn.addEventListener("click", function() {
        kalan = parseInt(sureInput.value, 10);
        if (isNaN(kalan) || kalan < 1) {
            geriSayimP.innerText = "Lütfen geçerli bir süre giriniz.";
            return;
        }
        geriSayimP.innerText = kalan + " saniye kaldı";
        clearInterval(interval);
        interval = setInterval(() => {
            kalan--;
            if (kalan > 0) {
                geriSayimP.innerText = kalan + " saniye kaldı";
            } else {
                geriSayimP.innerText = "Süre doldu!";
                clearInterval(interval);
            }
        }, 1000);
    });

    sifirlaBtn.addEventListener("click", function() {
        clearInterval(interval);
        geriSayimP.innerText = "Süre giriniz ve başlatın.";
        sureInput.value = "";
    });

// Gradient renklerini döngüyle değiştirme
const gradients = [
    'linear-gradient(135deg, #e0eafc 0%, #cfdef3 50%, #f9f9f9 100%)',
    'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    'linear-gradient(135deg, #f9d423 0%, #ff4e50 100%)',
    'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    'linear-gradient(135deg, #fbc2eb 0%, #f9d423 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
    'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
    'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'
];
let gradientIndex = 0;
setInterval(() => {
    document.body.style.background = gradients[gradientIndex];
    gradientIndex = (gradientIndex + 1) % gradients.length;
}, 2000);
