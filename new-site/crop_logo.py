import sys
from PIL import Image
import os

def make_square(image_path, output_path):
    try:
        img = Image.open(image_path)
        width, height = img.size
        
        # Determine strict square size (min dimension)
        new_size = min(width, height)
        
        # Center crop
        left = (width - new_size) / 2
        top = (height - new_size) / 2
        right = (width + new_size) / 2
        bottom = (height + new_size) / 2
        
        img_cropped = img.crop((left, top, right, bottom))
        
        # Resize for favicon (standard 32x32 and 192x192 for apple touch)
        # We'll stick to a high-res version for the main logo and letting browser scale for favicon usually works, 
        # but let's make a specific clean one or just keep the high res cropped one as 'logo.jpg'
        
        img_cropped.save(output_path, quality=95)
        print(f"Successfully cropped to {new_size}x{new_size} and saved to {output_path}")

    except Exception as e:
        print(f"Error: {e}")

input_path = "src/assets/logo-original.jpg"
output_path = "src/assets/logo.jpg"
make_square(input_path, output_path)
