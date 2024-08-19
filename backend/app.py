from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from googletrans import Translator
app = FastAPI()

# ตั้งค่า CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # เพิ่มโดเมนที่ต้องการอนุญาต
    allow_credentials=True,
    allow_methods=["*"],  # อนุญาตทุก HTTP methods
    allow_headers=["*"],  # อนุญาตทุก headers
)

class TranslateRequest(BaseModel):
    text: str

@app.post("/api/translate")
async def translate(request: TranslateRequest):
    # Implement your translation logic here
    translator = Translator()
    trans = translator.translate(
        text=request.text,
        dest="en",
        src="th"
    )
    return {"translated_text":trans.text}
