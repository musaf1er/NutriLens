from io import BytesIO

import numpy as np
from PIL import Image, UnidentifiedImageError


IMAGE_SIZE = 224


def prepare_image(contents: bytes):
    """Decode, letterbox, and normalize an image for EfficientNetV2 Food-101."""
    try:
        image = Image.open(BytesIO(contents)).convert("RGB")
    except (UnidentifiedImageError, OSError) as exc:
        raise ValueError("Unable to process image.") from exc

    image.thumbnail((IMAGE_SIZE, IMAGE_SIZE), Image.Resampling.NEAREST)
    canvas = Image.new("RGB", (IMAGE_SIZE, IMAGE_SIZE))
    offset = ((IMAGE_SIZE - image.width) // 2, (IMAGE_SIZE - image.height) // 2)
    canvas.paste(image, offset)

    image_array = np.asarray(canvas, dtype=np.float32)
    image_array = (image_array / 127.5) - 1.0
    return np.transpose(image_array, (2, 0, 1))[None, ...]
