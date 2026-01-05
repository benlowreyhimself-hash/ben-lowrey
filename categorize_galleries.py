#!/usr/bin/env python3
import re
import os

# Read original HTML
with open('original.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract all image filenames from galleries
all_images = re.findall(r'https://web\.archive\.org/web/[^"]*/([\w\-\.]+\.(?:jpg|jpeg|png))', html)

# Get list of downloaded images
downloaded = set(os.listdir('images/'))

# Define gallery sections based on original HTML structure
galleries = {
    'Real Awake Events': [],
    'Property Renovation': [],
    'Hen Party Entertainment': [],
    'Handstands': [],
    'Alopecia & Bodybuilding': [],
    'Guitar & vGuitarLessons': [],
    'Circoplex Lightshow': [],
    'Pentre Plaza': [],
    'Current Focus': []
}

# Extract images for each section
for img in all_images:
    img_clean = img.split('?')[0]
    
    if img_clean in downloaded:
        # Categorize by filename patterns
        if any(x in img_clean.lower() for x in ['real', 'awake', 'party-promo', 'pxl_202303', 'ra-2023', 'dsc', 'sweep', 'foraging', 'lisa']):
            galleries['Real Awake Events'].append(img_clean)
        elif any(x in img_clean.lower() for x in ['img_19', 'img_20', 'img_21', 'img_4848']):
            galleries['Property Renovation'].append(img_clean)
        elif any(x in img_clean.lower() for x in ['hen', 'pxl_202203', 'img_9666']):
            galleries['Hen Party Entertainment'].append(img_clean)
        elif any(x in img_clean.lower() for x in ['handstand', 'cadbury', 'furie', '7b0e', 'img_0485', 'img_1632', 'img_2015', 'clip']):
            galleries['Handstands'].append(img_clean)
        elif any(x in img_clean.lower() for x in ['physique', 'fullsize', 'ben-lowrey-general-44']):
            galleries['Alopecia & Bodybuilding'].append(img_clean)
        elif any(x in img_clean.lower() for x in ['1929103', '2010-02', 'guitar', 'band']):
            galleries['Guitar & vGuitarLessons'].append(img_clean)
        elif any(x in img_clean.lower() for x in ['6085ae', 'f8923', 'dab7', 'a778']):
            galleries['Circoplex Lightshow'].append(img_clean)
        elif any(x in img_clean.lower() for x in ['pentre', 'plaza']):
            galleries['Pentre Plaza'].append(img_clean)
        elif any(x in img_clean.lower() for x in ['0a7126', 'dsc_0398', 'em1a5548']):
            galleries['Current Focus'].append(img_clean)

# Remove duplicates
for section in galleries:
    galleries[section] = list(set(galleries[section]))

# Print results
for section, images in galleries.items():
    print(f"\n{section}: {len(images)} images")
    for img in sorted(images)[:10]:
        print(f"  - {img}")
    if len(images) > 10:
        print(f"  ... and {len(images) - 10} more")

# Save to file for HTML generation
with open('gallery_structure.txt', 'w') as f:
    for section, images in galleries.items():
        f.write(f"## {section}\n")
        for img in sorted(images):
            f.write(f"{img}\n")
        f.write("\n")

print(f"\nTotal downloaded images: {len(downloaded)}")
print("Gallery structure saved to gallery_structure.txt")
