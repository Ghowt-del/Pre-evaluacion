import sqlite3
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()

#CORS
origins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#PYDANTIC, BASEMODEL
class Factura(BaseModel):
    numero_factura: int
    fecha: str
    cliente: str
    total: int

#CONECTAR CON LA BASE DE DATOS 
def conectar():
    conn = sqlite3.connect("master.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.get("/facturas")
async def obtener_facturas():
    db = conectar()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM facturas ORDER BY fecha DESC")
    resultado = cursor.fetchall()
    db.close()
    
    facturas = [dict(row) for row in resultado]
    return facturas


@app.get("/facturas/{id}")
async def obtener_facturas_id(id: int):
    db = conectar()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM facturas WHERE id = ?", (id,))
    resultado = cursor.fetchone()
    db.close()
    
    if resultado is None:
        return {"error": "Factura no encontrada"}
        
    return dict(resultado)

@app.post("/facturas")
async def crear_factura(factura: Factura):
    db = conectar()
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO facturas (numero_factura, fecha, cliente, total) VALUES (?, ?, ?, ?)",
        (
            factura.numero_factura,
            factura.fecha,
            factura.cliente,
            factura.total,
        ),
    )

    db.commit()
    db.close()
    return {"mensaje": "Factura creada correctamente"}