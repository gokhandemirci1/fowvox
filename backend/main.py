from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
import sqlite3
import os

app = FastAPI(title="FlowVox AI Portfolio API", version="1.0.0")

# CORS middleware - frontend ile iletişim için
# Environment variable'dan CORS origins al, yoksa default kullan
cors_origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:3000,http://localhost:3001"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
DB_FILE = "appointments.db"

def init_db():
    """Veritabanını başlat"""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            company TEXT,
            service TEXT NOT NULL,
            message TEXT,
            preferred_date TEXT,
            preferred_time TEXT,
            created_at TEXT NOT NULL,
            status TEXT DEFAULT 'pending'
        )
    """)
    conn.commit()
    conn.close()

# Veritabanını başlat
init_db()

# Pydantic modelleri
class AppointmentRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    company: Optional[str] = None
    service: str
    message: Optional[str] = None
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = None

class AppointmentResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    company: Optional[str]
    service: str
    message: Optional[str]
    preferred_date: Optional[str]
    preferred_time: Optional[str]
    created_at: str
    status: str

# API Endpoints
@app.get("/")
async def root():
    return {"message": "FlowVox AI Portfolio API", "status": "running"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.post("/api/appointments", response_model=AppointmentResponse)
async def create_appointment(appointment: AppointmentRequest):
    """Yeni randevu talebi oluştur"""
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        
        created_at = datetime.now().isoformat()
        
        cursor.execute("""
            INSERT INTO appointments 
            (name, email, phone, company, service, message, preferred_date, preferred_time, created_at, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            appointment.name,
            appointment.email,
            appointment.phone,
            appointment.company,
            appointment.service,
            appointment.message,
            appointment.preferred_date,
            appointment.preferred_time,
            created_at,
            "pending"
        ))
        
        appointment_id = cursor.lastrowid
        conn.commit()
        
        # Oluşturulan randevuyu getir
        cursor.execute("SELECT * FROM appointments WHERE id = ?", (appointment_id,))
        row = cursor.fetchone()
        conn.close()
        
        if row:
            return AppointmentResponse(
                id=row[0],
                name=row[1],
                email=row[2],
                phone=row[3],
                company=row[4],
                service=row[5],
                message=row[6],
                preferred_date=row[7],
                preferred_time=row[8],
                created_at=row[9],
                status=row[10]
            )
        else:
            raise HTTPException(status_code=500, detail="Randevu oluşturulamadı")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Sunucu hatası: {str(e)}")

@app.get("/api/appointments", response_model=list[AppointmentResponse])
async def get_appointments():
    """Tüm randevuları listele (admin için)"""
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM appointments ORDER BY created_at DESC")
        rows = cursor.fetchall()
        conn.close()
        
        appointments = []
        for row in rows:
            appointments.append(AppointmentResponse(
                id=row[0],
                name=row[1],
                email=row[2],
                phone=row[3],
                company=row[4],
                service=row[5],
                message=row[6],
                preferred_date=row[7],
                preferred_time=row[8],
                created_at=row[9],
                status=row[10]
            ))
        
        return appointments
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Sunucu hatası: {str(e)}")

@app.get("/api/appointments/{appointment_id}", response_model=AppointmentResponse)
async def get_appointment(appointment_id: int):
    """Belirli bir randevuyu getir"""
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM appointments WHERE id = ?", (appointment_id,))
        row = cursor.fetchone()
        conn.close()
        
        if not row:
            raise HTTPException(status_code=404, detail="Randevu bulunamadı")
        
        return AppointmentResponse(
            id=row[0],
            name=row[1],
            email=row[2],
            phone=row[3],
            company=row[4],
            service=row[5],
            message=row[6],
            preferred_date=row[7],
            preferred_time=row[8],
            created_at=row[9],
            status=row[10]
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Sunucu hatası: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

