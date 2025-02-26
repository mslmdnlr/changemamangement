# Node.js tabanlı bir imaj kullanıyoruz
FROM node:18-alpine

# Çalışma dizinini oluştur
WORKDIR /app

# Nginx kurulumu
RUN apk add --no-cache nginx

# Uygulama dosyalarını kopyala
COPY index.html .
COPY style.css .
COPY script.js .
COPY html2canvas.min.js .
COPY assets/css/font-awesome.min.css ./assets/css/
COPY assets/webfonts/ ./assets/webfonts/

# Nginx konfigürasyonu
COPY nginx.conf /etc/nginx/nginx.conf

# Port 80'i dışarı aç
EXPOSE 80

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"] 