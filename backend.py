from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/cards")
async def get_card_filenames():
    try:
        cards_dir = os.path.join(os.getcwd(), "public", "cards")
        files = os.listdir(cards_dir)
        return JSONResponse(content=files)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Failed to read card files"})