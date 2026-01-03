from fastapi import FastAPI
from app.api import dashboard, export, stock

app = FastAPI(title="Buffett + AI Backend")

app.include_router(dashboard.router, prefix="/api")
app.include_router(export.router, prefix="/api")
app.include_router(stock.router, prefix="/api")
