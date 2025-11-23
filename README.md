# FlowVox AI Portfolio Website

FlowVox AI şirketi için modern portföy sitesi ve randevu yönetim sistemi.

## Proje Yapısı

```
flowvox/
├── frontend/          # Next.js frontend uygulaması
├── backend/           # Python FastAPI backend servisi
└── README.md
```

## Teknolojiler

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Hook Form** - Form management
- **Axios** - HTTP client

### Backend
- **Python 3.10+** - Programming language
- **FastAPI** - Modern web framework
- **SQLite** - Database
- **Pydantic** - Data validation

## Kurulum ve Çalıştırma

### Backend Kurulumu

```bash
cd backend

# Virtual environment oluştur
python -m venv venv

# Virtual environment'ı aktifleştir
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Bağımlılıkları yükle
pip install -r requirements.txt

# Backend'i çalıştır
uvicorn main:app --reload --port 8000
```

Backend API: http://localhost:8000
API Dokümantasyonu: http://localhost:8000/docs

### Frontend Kurulumu

```bash
cd frontend

# Bağımlılıkları yükle
npm install

# Ortam değişkenlerini ayarla
cp .env.local.example .env.local
# .env.local dosyasını düzenleyin: NEXT_PUBLIC_API_URL=http://localhost:8000

# Frontend'i çalıştır
npm run dev
```

Frontend: http://localhost:3000

## Özellikler

- ✅ Modern ve responsive tasarım
- ✅ Randevu talebi formu
- ✅ Backend API entegrasyonu
- ✅ Form validasyonu
- ✅ Animasyonlar ve geçişler
- ✅ SQLite veritabanı ile randevu yönetimi

## API Endpoints

- `GET /` - API durumu
- `GET /api/health` - Sağlık kontrolü
- `POST /api/appointments` - Yeni randevu oluştur
- `GET /api/appointments` - Tüm randevuları listele
- `GET /api/appointments/{id}` - Belirli bir randevuyu getir

## Geliştirme

Projeyi geliştirmek için:

1. Backend ve frontend'i ayrı terminal pencerelerinde çalıştırın
2. Backend değişiklikleri otomatik olarak yeniden yüklenir (--reload)
3. Frontend değişiklikleri hot-reload ile otomatik güncellenir

## Lisans

Bu proje FlowVox AI için özel olarak geliştirilmiştir.

