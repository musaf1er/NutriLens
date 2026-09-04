from fastapi import FastAPI, File, HTTPException, UploadFile

from .preprocessing import prepare_image
from .predictor import FoodPredictor


app = FastAPI(title="NutriLens Food Classification Service")
predictor = None
startup_error = None


@app.on_event("startup")
def load_model():
    global predictor, startup_error
    try:
        predictor = FoodPredictor()
        startup_error = None
        print("Food-101 model loaded and ready")
    except Exception as exc:
        predictor = None
        startup_error = str(exc)
        print(f"Food-101 model failed to load: {exc}")


@app.get("/health")
def health():
    if predictor is None:
        raise HTTPException(status_code=503, detail=startup_error or "Model is initializing.")
    return {"status": "ready", "model": "efficientnetv2b0-food101-int8"}


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
