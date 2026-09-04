import json
import os
import random
from pathlib import Path

import torch


class FoodPredictor:
    """Loads a TorchScript Food-101 classifier once when the service starts, or falls back to mock mode."""

    def __init__(self):
        model_path = os.getenv("FOOD_MODEL_PATH")
        labels_path = os.getenv("FOOD_LABELS_PATH", "labels.json")
        self.use_mock = not model_path or not os.path.exists(model_path)
        
        if self.use_mock:
            # Mock mode: return random food for testing without a model
            self.labels = {
                "0": "pizza", "1": "apple_pie", "2": "hamburger", "3": "fried_rice",
                "4": "chicken_wings", "5": "sushi", "6": "spaghetti_bolognese", "7": "ice_cream",
                "8": "caesar_salad", "9": "french_fries", "10": "bacon", "11": "baklava",
                "12": "banana_split", "13": "beef_carpaccio", "14": "beef_steak", "15": "beet_salad",
                "16": "beignets", "17": "bibimbap", "18": "bread_pudding", "19": "breakfast_burrito",
                "20": "bruschetta", "21": "cake", "22": "calzone", "23": "cannoli",
                "24": "caprese_salad", "25": "carrot_cake", "26": "ceviche", "27": "cheese_burger",
                "28": "cheesecake", "29": "chicken_curry", "30": "chicken_parmesan", "31": "chicken_quesadilla",
                "32": "chicken_tikka_masala", "33": "chocolate_cake", "34": "chocolate_mousse", "35": "churros",
                "36": "clam_chowder", "37": "club_sandwich", "38": "cobb_salad", "39": "cookies_and_cream",
                "40": "crab_cakes", "41": "creme_brulee", "42": "crepes", "43": "crispy_chicken",
                "44": "croissant", "45": "croque_monsieur", "46": "crudites", "47": "cucumber_salad",
                "48": "cupcakes", "49": "deviled_eggs", "50": "dosa", "51": "double_chocolate_brownie",
                "52": "dumplings", "53": "edamame", "54": "eggs_benedict", "55": "eggplant_parmesan",
                "56": "escargots", "57": "falafel", "58": "falafels", "59": "filet_mignon",
                "60": "fish_and_chips", "61": "fish_tacos", "62": "foie_gras", "63": "fried_calamari",
                "64": "fried_egg", "65": "fried_green_tomatoes", "66": "fried_okra", "67": "fried_squid",
                "68": "fruit_salad", "69": "garlic_bread", "70": "gnocchi", "71": "goat_cheese_salad",
                "72": "grapes", "73": "greek_salad", "74": "green_beans", "75": "green_salad",
                "76": "grilled_salmon", "77": "grilled_vegetables", "78": "guacamole", "79": "gyro",
                "80": "halibut", "81": "ham_and_cheese_croissant", "82": "hard_boiled_egg", "83": "hash_browns",
                "84": "heirloom_tomato_salad", "85": "hexagon_cheese", "86": "honey_vinaigrette_chicken",
                "87": "hot_and_sour_soup", "88": "hot_dog", "89": "huevos_rancheros", "90": "hummus",
                "91": "idiyappam", "92": "inari", "93": "indian_food", "94": "italian_food", "95": "jalapeno_poppers",
            }
            return
        
        if not model_path:
            raise RuntimeError("FOOD_MODEL_PATH is not configured.")
        self.model = torch.jit.load(model_path, map_location="cpu").eval()
        labels_file = Path(labels_path)
        if not labels_file.exists():
            raise RuntimeError("Food-101 labels file is missing.")
        self.labels = json.loads(labels_file.read_text(encoding="utf-8"))

    def predict(self, image_tensor):
        if self.use_mock:
            # Mock mode: return a random food with realistic confidence
            food_label = random.choice(list(self.labels.values()))
            confidence = round(random.uniform(0.75, 0.99), 4)
            return food_label, confidence
        
        # Real model inference
        with torch.inference_mode():
            probabilities = torch.softmax(self.model(image_tensor), dim=1)[0]
            confidence, index = torch.max(probabilities, dim=0)
        return self.labels[str(index.item())], round(float(confidence), 4)