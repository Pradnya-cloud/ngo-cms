import cloudinary
import cloudinary.uploader
import cloudinary.api
from django.conf import settings


def upload_image(file, folder="ngo-cms"):
    """Upload an image to Cloudinary. Returns the secure URL or None."""
    try:
        result = cloudinary.uploader.upload(file, folder=folder)
        return result.get("secure_url")
    except Exception:
        return None


def upload_video(file, folder="ngo-cms"):
    try:
        result = cloudinary.uploader.upload(file, folder=folder, resource_type="video")
        return result.get("secure_url")
    except Exception:
        return None


def delete_image(public_id):
    try:
        cloudinary.uploader.destroy(public_id)
        return True
    except Exception:
        return False