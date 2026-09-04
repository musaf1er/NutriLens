from io import BytesIO

from PIL import Image, UnidentifiedImageError
from torchvision import transforms


IMAGE_SIZE = 224


def prepare_image(contents: bytes):
    """Validate and normalize an uploaded image for the classifier."""
    try:
        image = Image.open(BytesIO(contents)).convert("RGB")
    except (UnidentifiedImageError, OSError) as exc:
        raise ValueError("Unable to process image.") from exc

    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(IMAGE_SIZE),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
    ])
    return transform(image).unsqueeze(0)