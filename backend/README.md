# FlowVox AI Backend API

Python FastAPI tabanlı backend servisi.

## Kurulum

```bash
# Virtual environment oluştur
python -m venv venv

# Virtual environment'ı aktifleştir
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Bağımlılıkları yükle
pip install -r requirements.txt
```

## Çalıştırma

```bash
# Development modunda çalıştır
uvicorn main:app --reload --port 8000

# Veya
python main.py
```

API dokümantasyonu: http://localhost:8000/docs

## API Endpoints

- `GET /` - API durumu
- `GET /api/health` - Sağlık kontrolü
- `POST /api/appointments` - Yeni randevu oluştur
- `GET /api/appointments` - Tüm randevuları listele
- `GET /api/appointments/{id}` - Belirli bir randevuyu getir

