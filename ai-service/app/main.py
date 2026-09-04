import os

from fastapi import FastAPI, File, HTTPException, UploadFile

from .preprocessing import prepare_image
from .predictor import FoodPredictor


app = FastAPI(title="NutriLens Food Classification Service")
predictor = None


@app.on_event("startup")
def load_model():
    global predictor
    try:
        predictor = FoodPredictor()
    except RuntimeError as e:
        print(f"⚠️  {e} — Running in mock mode (random food predictions for testing)")
        predictor = FoodPredictor()


@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    if image.content_type not in {"image/jpeg", "image/png"}:
        raise HTTPException(status_code=422, detail="Please upload a valid JPG, JPEG, or PNG image.")
    contents = await image.read()
    if len(contents) > 5 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Image size exceeds the maximum allowed size.")
    if predictor is None:
        raise HTTPException(status_code=503, detail="Food classification service is initializing.")
    try:
        label, confidence = predictor.predict(prepare_image(contents))
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Unable to identify the food.") from exc
    return {"success": True, "prediction": label, "confidence": confidence}