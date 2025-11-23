# Vercel Deployment Guide

FlowVox AI portföy sitesini Vercel'e deploy etme rehberi.

## Ön Hazırlık

### 1. Backend Hosting

Backend için ayrı bir hosting servisi kullanmanız gerekiyor. Önerilen seçenekler:

#### Seçenek 1: Railway (Önerilen)
1. [Railway.app](https://railway.app) hesabı oluşturun
2. Yeni proje oluşturun
3. GitHub repository'nizi bağlayın
4. `backend` klasörünü root olarak ayarlayın
5. Environment variables ekleyin (gerekirse)
6. Deploy edin

#### Seçenek 2: Render
1. [Render.com](https://render.com) hesabı oluşturun
2. Yeni Web Service oluşturun
3. GitHub repository'nizi bağlayın
4. Build Command: `cd backend && pip install -r requirements.txt`
5. Start Command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Deploy edin

#### Seçenek 3: Fly.io
1. [Fly.io](https://fly.io) hesabı oluşturun
2. `flyctl` CLI'yi yükleyin
3. `backend` klasöründe `fly launch` komutunu çalıştırın
4. Deploy edin

### 2. Backend URL'ini Not Edin

Backend deploy edildikten sonra URL'ini not edin (örn: `https://flowvox-backend.railway.app`)

## Vercel Deployment

### Yöntem 1: Vercel Dashboard (Önerilen)

1. [Vercel.com](https://vercel.com) hesabı oluşturun veya giriş yapın
2. "Add New Project" butonuna tıklayın
3. GitHub repository'nizi seçin (`gokhandemirci1/fowvox`)
4. **Önemli**: Root Directory olarak `frontend` klasörünü seçin
5. Framework Preset: Next.js (otomatik algılanır)
6. Build Command: `npm run build` (otomatik)
7. Output Directory: `.next` (otomatik)
8. Install Command: `npm install` (otomatik)

### Environment Variables

Vercel dashboard'da "Environment Variables" bölümüne gidin ve şunu ekleyin:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

**Örnek:**
```
NEXT_PUBLIC_API_URL=https://flowvox-backend.railway.app
```

### Yöntem 2: Vercel CLI

```bash
# Vercel CLI'yi yükleyin
npm i -g vercel

# Frontend klasörüne gidin
cd frontend

# Vercel'e login olun
vercel login

# Deploy edin
vercel

# Production'a deploy
vercel --prod
```

Deploy sırasında sorulan sorular:
- **Set up and deploy?** → Yes
- **Which scope?** → Hesabınızı seçin
- **Link to existing project?** → No (ilk deploy)
- **Project name?** → flowvox-portfolio (veya istediğiniz isim)
- **Directory?** → `./` (frontend klasöründesiniz)
- **Override settings?** → No

### Environment Variables (CLI ile)

```bash
# Environment variable ekle
vercel env add NEXT_PUBLIC_API_URL

# Production için
vercel env add NEXT_PUBLIC_API_URL production
```

## CORS Ayarları

Backend'inizde CORS ayarlarını güncelleyin. `backend/main.py` dosyasında:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://your-vercel-domain.vercel.app",  # Vercel domain'inizi ekleyin
        "https://your-custom-domain.com"  # Özel domain varsa
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Domain Ayarları

1. Vercel dashboard'da projenize gidin
2. "Settings" → "Domains" bölümüne gidin
3. Özel domain ekleyin (opsiyonel)

## Otomatik Deploy

Vercel, GitHub repository'nize her push'ta otomatik olarak deploy eder. Bu özellik varsayılan olarak açıktır.

## Sorun Giderme

### Build Hatası
- `frontend` klasörünün root directory olarak ayarlandığından emin olun
- Environment variables'ın doğru ayarlandığını kontrol edin

### API Bağlantı Hatası
- Backend URL'inin doğru olduğundan emin olun
- CORS ayarlarını kontrol edin
- Backend'in çalıştığından emin olun

### Environment Variables
- `NEXT_PUBLIC_` prefix'i olan değişkenler client-side'da kullanılabilir
- Production, Preview ve Development için ayrı ayrı ayarlayabilirsiniz

## Önemli Notlar

1. **Backend ayrı deploy edilmeli**: Vercel sadece frontend'i host eder
2. **Database**: SQLite production'da önerilmez. PostgreSQL veya başka bir database kullanın
3. **Environment Variables**: Production URL'lerini kullanmayı unutmayın

## Sonraki Adımlar

1. ✅ Backend'i Railway/Render/Fly.io'ya deploy edin
2. ✅ Backend URL'ini not edin
3. ✅ Vercel'e frontend'i deploy edin
4. ✅ Environment variable ekleyin
5. ✅ CORS ayarlarını güncelleyin
6. ✅ Test edin!

