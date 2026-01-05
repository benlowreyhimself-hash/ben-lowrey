#!/usr/bin/env python3
import re

# Read the HTML file
with open('index.html', 'r') as f:
    html = f.read()

# Image mapping - old filename to new SEO-friendly filename
replacements = {
    # Hero/About
    'Ben-Lowrey-General-21-of-75.jpeg': 'ben-lowrey-about.jpeg',
    
    # 11 Houses
    'IMG-20230525-WA0020.jpeg': 'ben-lowrey-11-houses-header.jpeg',
    'image007.jpg': 'ben-lowrey-11-houses-1.jpg',
    
    # Real Awake
    'real-awake-group-1.jpg': 'ben-lowrey-real-awake-1.jpg',
    'real-awake-group-2.jpg': 'ben-lowrey-real-awake-2.jpg',
    'real-awake-group-3.jpg': 'ben-lowrey-real-awake-3.jpg',
    'real-awake-group-4.jpg': 'ben-lowrey-real-awake-4.jpg',
    'real-awake-group-5.jpg': 'ben-lowrey-real-awake-5.jpg',
    'real-awake-group-6.jpg': 'ben-lowrey-real-awake-6.jpg',
    
    # Pentre Plaza
    'IMG_2005-1-scaled.jpg': 'ben-lowrey-pentre-plaza-1.jpg',
    'IMG_2032-1-scaled.jpg': 'ben-lowrey-pentre-plaza-2.jpg',
    'IMG_1988-1-scaled.jpg': 'ben-lowrey-pentre-plaza-3.jpg',
    
    # Hen Party
    'PXL_20220319_160251305-scaled.jpg': 'ben-lowrey-hen-party-1.jpg',
    'IMG_9666-scaled.jpg': 'ben-lowrey-hen-party-2.jpg',
    'PXL_20220312_162546741.MP_-scaled.jpg': 'ben-lowrey-hen-party-3.jpg',
    
    # Handstands
    'IMG_1632-scaled.jpg': 'ben-lowrey-handstands-1.jpg',
    'IMG_0485-scaled.jpg': 'ben-lowrey-handstands-2.jpg',
    'IMG_2512.jpg': 'ben-lowrey-handstands-3.jpg',
    '40-furie-five-tuck-tucks9-1.jpg': 'ben-lowrey-handstands-4.jpg',
    'Handstands-160-1.jpg': 'ben-lowrey-handstands-5.jpg',
    'Cadbury-House-69-scaled.jpg': 'ben-lowrey-handstands-6.jpg',
    
    # Bodybuilding
    'fullsizeoutput_5cb8-scaled.jpeg': 'ben-lowrey-bodybuilding-1.jpeg',
    'Ben-Lowrey-Physique-95-of-180.jpeg': 'ben-lowrey-bodybuilding-2.jpeg',
    'Ben-Lowrey-Physique-176-of-180.jpeg': 'ben-lowrey-bodybuilding-3.jpeg',
    
    # Guitar
    '6085AE56-47DF-448D-BB54-A6EF80DEC7BC.jpeg': 'ben-lowrey-guitar-1.jpeg',
    '1929103_6636670172_130_n-2.jpg': 'ben-lowrey-guitar-2.jpg',
    '2010-02-28-04_01_5128.jpg': 'ben-lowrey-guitar-3.jpg',
    
    # Circoplex
    '0A7126C1-EFE7-4C7A-8282-D8D29ECC6626.jpeg': 'ben-lowrey-circoplex-1.jpeg',
    '6FD0181C-9260-4017-8B5B-1B3D242A7762_1_105_c.jpeg': 'ben-lowrey-circoplex-2.jpeg',
    'IMG_0327.jpg': 'ben-lowrey-circoplex-3.jpg',
    
    # Plant Medicine
    'circoplex-1.jpg': 'ben-lowrey-plant-medicine-header.jpg',
    
    # Contact
    'Clip-17.jpg': 'ben-lowrey-contact-1.jpg',
    'DAB7DD99-2892-4C32-A5A3-AF500C1DFED2_1_105_c.jpeg': 'ben-lowrey-contact-2.jpeg',
    'A778DF6B-9990-4515-A0B9-FAD32E1E321E_1_105_c.jpeg': 'ben-lowrey-contact-3.jpeg',
    'Ben-Lowrey-General-44-of-75_Original.jpeg': 'ben-lowrey-contact-4.jpeg',
    'Ben-Lowrey-General-48-of-75-rotated.jpeg': 'ben-lowrey-contact-5.jpeg',
    'IMG_8571.jpg': 'ben-lowrey-contact-6.jpg',
}

# Replace all image references
for old, new in replacements.items():
    html = html.replace(f'images/{old}', f'images/{new}')

# Write back
with open('index.html', 'w') as f:
    f.write(html)

print("HTML updated with SEO-friendly image names!")
