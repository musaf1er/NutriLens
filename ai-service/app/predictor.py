import os
from pathlib import Path
from urllib.request import urlretrieve

import numpy as np
import onnxruntime as ort


MODEL_URL = os.getenv(
    "FOOD_MODEL_URL",
    "https://media.githubusercontent.com/media/STMicroelectronics/stm32ai-modelzoo/"
    "main/image_classification/efficientnetv2/ST_pretrainedmodel_public_dataset/food101/"
    "efficientnetv2b0_224_fft/efficientnetv2b0_224_fft_qdq_int8.onnx",
)
MODEL_PATH = Path(os.getenv("FOOD_MODEL_PATH", "/tmp/nutrilens-food101.onnx"))

FOOD101_LABELS = (
    "apple_pie", "baby_back_ribs", "baklava", "beef_carpaccio", "beef_tartare",
    "beet_salad", "beignets", "bibimbap", "bread_pudding", "breakfast_burrito",
    "bruschetta", "caesar_salad", "cannoli", "caprese_salad", "carrot_cake",
    "ceviche", "cheesecake", "cheese_plate", "chicken_curry", "chicken_quesadilla",
    "chicken_wings", "chocolate_cake", "chocolate_mousse", "churros", "clam_chowder",
    "club_sandwich", "crab_cakes", "creme_brulee", "croque_madame", "cup_cakes",
    "deviled_eggs", "donuts", "dumplings", "edamame", "eggs_benedict", "escargots",
    "falafel", "filet_mignon", "fish_and_chips", "foie_gras", "french_fries",
    "french_onion_soup", "french_toast", "fried_calamari", "fried_rice",
    "frozen_yogurt", "garlic_bread", "gnocchi", "greek_salad",
    "grilled_cheese_sandwich", "grilled_salmon", "guacamole", "gyoza", "hamburger",
    "hot_and_sour_soup", "hot_dog", "huevos_rancheros", "hummus", "ice_cream",
    "lasagna", "lobster_bisque", "lobster_roll_sandwich", "macaroni_and_cheese",
    "macarons", "miso_soup", "mussels", "nachos", "omelette", "onion_rings",
    "oysters", "pad_thai", "paella", "pancakes", "panna_cotta", "peking_duck", "pho",
    "pizza", "pork_chop", "poutine", "prime_rib", "pulled_pork_sandwich", "ramen",
    "ravioli", "red_velvet_cake", "risotto", "samosa", "sashimi", "scallops",
    "seaweed_salad", "shrimp_and_grits", "spaghetti_bolognese", "spaghetti_carbonara",
    "spring_rolls", "steak", "strawberry_shortcake", "sushi", "tacos", "takoyaki",
    "tiramisu", "tuna_tartare", "waffles",
)


class FoodPredictor:
    """Run a compact, quantized EfficientNetV2 Food-101 model on CPU."""

    def __init__(self):
        self._ensure_model()
        options = ort.SessionOptions()
        options.intra_op_num_threads = max(1, int(os.getenv("ONNX_NUM_THREADS", "2")))
        self.session = ort.InferenceSession(
            str(MODEL_PATH),
            sess_options=options,
            providers=["CPUExecutionProvider"],
        )
        self.input_name = self.session.get_inputs()[0].name

    @staticmethod
    def _ensure_model():
        if MODEL_PATH.exists() and MODEL_PATH.stat().st_size > 1_000_000:
            return
        MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
        partial_path = MODEL_PATH.with_suffix(".part")
        urlretrieve(MODEL_URL, partial_path)
        if partial_path.stat().st_size <= 1_000_000:
            partial_path.unlink(missing_ok=True)
            raise RuntimeError("Downloaded Food-101 model is incomplete.")
        partial_path.replace(MODEL_PATH)

    def predict(self, image_tensor):
        scores = self.session.run(None, {self.input_name: image_tensor})[0][0]
        scores = np.clip(scores.astype(np.float32), 0.0, None)
        total = float(scores.sum())
        if total <= 0:
            raise RuntimeError("Food-101 model returned invalid scores.")
        probabilities = scores / total
        index = int(np.argmax(probabilities))
        return FOOD101_LABELS[index], round(float(probabilities[index]), 4)
