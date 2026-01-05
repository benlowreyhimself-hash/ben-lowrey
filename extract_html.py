#!/usr/bin/env python3
import re

# Read the original HTML
with open('original.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove Wayback Machine wrapper - get just the body content
# Find the main content between <body> and </body>
body_match = re.search(r'<body[^>]*>(.*)</body>', html, re.DOTALL)
if body_match:
    body_content = body_match.group(1)
    
    # Replace all Wayback Machine image URLs with local paths
    # Pattern: https://web.archive.org/web/20250313124654im_/https://i0.wp.com/benlowrey.com/wp-content/uploads/...
    body_content = re.sub(
        r'https://web\.archive\.org/web/\d+im_/https://i0\.wp\.com/benlowrey\.com/wp-content/uploads/([^"?]+)',
        r'images/\1',
        body_content
    )
    
    # Also replace direct benlowrey.com URLs
    body_content = re.sub(
        r'https://benlowrey\.com/wp-content/uploads/([^"?]+)',
        r'images/\1',
        body_content
    )
    
    # Remove Wayback toolbar/scripts
    body_content = re.sub(r'<!-- BEGIN WAYBACK.*?END WAYBACK TOOLBAR INSERT -->', '', body_content, flags=re.DOTALL)
    
    # Create simple HTML
    simple_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BenLowrey.com | Property Developer & Real Awake Founder</title>
    <link rel="stylesheet" href="style.css">
</head>
{body_content}
</html>'''
    
    with open('index_new.html', 'w', encoding='utf-8') as f:
        f.write(simple_html)
    
    print("Created index_new.html")
else:
    print("Could not find body content")
