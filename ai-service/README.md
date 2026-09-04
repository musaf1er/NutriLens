# NutriLens AI Service

This FastAPI service only classifies food images. It expects a TorchScript Food-101-compatible model and a JSON labels file mapping output indexes to Food-101 labels, for example `{ "0": "apple_pie" }`.

Install with `pip install -r requirements.txt`, configure `FOOD_MODEL_PATH` and `FOOD_LABELS_PATH`, then start with `uvicorn app.main:app --reload --port 8000`.