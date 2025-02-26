document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addNewBox');
    const boxSelector = document.getElementById('boxSelector');
    const boxContent = document.getElementById('boxContent');
    const mainBoxes = document.querySelectorAll('.main-box');
    
    let editingBox = null;
    // Her kutu için içerikleri saklayacak dizi
    let boxContents = [[], [], []];

    // Kutu seçimi değiştiğinde içeriği göster
    boxSelector.addEventListener('change', function() {
        const selectedIndex = parseInt(this.value);
        // Seçilen kutunun içeriklerini textarea'ya getir
        boxContent.value = boxContents[selectedIndex].join('\n');
        
        // Düzenleme modunu sıfırla
        editingBox = null;
        addButton.textContent = 'Güncelle';
        addButton.style.backgroundColor = '#28a745';
    });

    addButton.addEventListener('click', function() {
        const selectedBoxIndex = parseInt(boxSelector.value);
        
        if (!boxContent.value.trim()) {
            alert('Lütfen bir içerik girin!');
            return;
        }

        // Mevcut içeriği temizle
        const targetBox = mainBoxes[selectedBoxIndex].querySelector('.info-boxes');
        targetBox.innerHTML = '';
        
        // Yeni içeriği diziye kaydet ve kutuları oluştur
        const lines = boxContent.value.split('\n').filter(line => line.trim() !== '');
        boxContents[selectedBoxIndex] = lines;
        
        lines.forEach((line, index) => {
            const newInfoBox = document.createElement('div');
            newInfoBox.className = 'info-box';
            newInfoBox.textContent = line.trim();
            
            // Kutuya tıklama olayı ekle
            newInfoBox.addEventListener('click', function() {
                editBox(this);
            });
            
            targetBox.appendChild(newInfoBox);

            // Animasyon efektleri
            newInfoBox.style.opacity = '0';
            newInfoBox.style.transform = 'translateY(-20px)';
            newInfoBox.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                newInfoBox.style.opacity = '1';
                newInfoBox.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Başarılı güncelleme mesajı
        showMessage('Başarıyla güncellendi!');
    });

    // Kutu düzenleme fonksiyonu
    function editBox(box) {
        editingBox = box;
        
        // Hangi ana kutuda olduğunu bul
        const parentMainBox = box.closest('.main-box');
        const mainBoxIndex = Array.from(mainBoxes).indexOf(parentMainBox);
        
        // Kutuyu seç ve içeriği getir
        boxSelector.value = mainBoxIndex;
        boxContent.value = boxContents[mainBoxIndex].join('\n');
        
        // Scroll to form
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    }
});

function downloadAsImage() {
    const wrapper = document.querySelector('.workflow-wrapper');
    
    // Yükleniyor göstergesi
    const button = document.querySelector('.download-icon');
    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;

    // Capture ayarları
    const options = {
        backgroundColor: '#ffffff',
        scale: 2, // Daha yüksek kalite için
        useCORS: true,
        allowTaint: true,
        onclone: function(clonedDoc) {
            // Klonlanmış elementte stilleri korumak için
            const clonedWrapper = clonedDoc.querySelector('.workflow-wrapper');
            clonedWrapper.style.margin = '0';
            clonedWrapper.style.width = wrapper.offsetWidth + 'px';
            clonedWrapper.style.height = wrapper.offsetHeight + 'px';
            clonedWrapper.style.position = 'relative';
            clonedWrapper.style.transform = 'none';
        }
    };

    html2canvas(wrapper, options).then(canvas => {
        try {
            // Canvas'ı PNG olarak kaydet
            const image = canvas.toDataURL('image/png', 1.0);
            
            // İndirme bağlantısı oluştur
            const link = document.createElement('a');
            link.download = 'konfigurasyon-diyagrami.png';
            link.href = image;
            link.click();
        } catch (error) {
            console.error('Resim oluşturulurken hata:', error);
            alert('Resim oluşturulurken bir hata oluştu.');
        } finally {
            // Butonu eski haline getir
            setTimeout(() => {
                button.innerHTML = originalContent;
                button.disabled = false;
            }, 1000);
        }
    });
}

// Başarı mesajını güncelle
function showMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    
    // İkon ve mesaj ekle
    const icon = document.createElement('i');
    icon.className = 'fas fa-check-circle';
    messageDiv.appendChild(icon);
    
    const text = document.createElement('span');
    text.textContent = message;
    messageDiv.appendChild(text);
    
    document.querySelector('.add-form').appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 2000);
} 