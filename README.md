# FlowVox AI Portfolio Website

FlowVox AI şirketi için modern portföy sitesi ve randevu yönetim sistemi.

## Proje Yapısı

```
flowvox/
├── frontend/          # Next.js frontend uygulaması (Vercel'e deploy edilir)
├── backend/           # Python FastAPI backend servisi (Railway/Render/Fly.io'ya deploy edilir)
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
- **SQLite** - Database (development için)
- **Pydantic** - Data validation

## Hızlı Başlangıç

### Local Development

#### Backend Kurulumu

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

#### Frontend Kurulumu

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

## Deployment

### Vercel (Frontend)

Detaylı deployment rehberi için [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) dosyasına bakın.

**Hızlı Özet:**
1. Vercel dashboard'da yeni proje oluşturun
2. GitHub repository'nizi bağlayın
3. **Root Directory**: `frontend` olarak ayarlayın
4. Environment Variable ekleyin: `NEXT_PUBLIC_API_URL=https://your-backend-url.com`
5. Deploy edin!

### Backend Hosting

Backend için önerilen platformlar:
- **Railway** (Önerilen) - [railway.app](https://railway.app)
- **Render** - [render.com](https://render.com)
- **Fly.io** - [fly.io](https://fly.io)

Backend deploy edildikten sonra:
1. Backend URL'ini not edin
2. CORS ayarlarını güncelleyin (Vercel domain'inizi ekleyin)
3. Environment variable ekleyin: `CORS_ORIGINS=https://your-vercel-domain.vercel.app`

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

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend
```
CORS_ORIGINS=http://localhost:3000,http://localhost:3001,https://your-vercel-domain.vercel.app
DATABASE_URL=appointments.db
```

## Geliştirme

Projeyi geliştirmek için:

1. Backend ve frontend'i ayrı terminal pencerelerinde çalıştırın
2. Backend değişiklikleri otomatik olarak yeniden yüklenir (--reload)
3. Frontend değişiklikleri hot-reload ile otomatik güncellenir

## Lisans

Bu proje FlowVox AI için özel olarak geliştirilmiştir.
