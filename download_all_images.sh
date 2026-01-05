#!/bin/bash
cd images

# Extract ALL image URLs from original.html
grep -o 'src="https://web.archive.org/web/[^"]*\.\(jpg\|jpeg\|png\)[^"]*' ../original.html | \
    sed 's/src="//g' | \
    sed 's/&amp;/\&/g' | \
    sort -u | \
    while IFS= read -r url; do
        # Extract filename from URL
        filename=$(echo "$url" | sed 's/.*\///' | sed 's/?.*$//' | head -c 100)
        
        # Skip if already exists and has size > 0
        if [ -f "$filename" ] && [ -s "$filename" ]; then
            echo "Skip: $filename (already exists)"
            continue
        fi
        
        echo "Downloading: $filename"
        curl -s -L "$url" -o "$filename" &
        
        # Limit concurrent downloads
        if [ $(jobs -r | wc -l) -ge 10 ]; then
            wait -n
        fi
    done

wait
echo "Download complete!"

# Remove 0-byte files
find . -type f -size 0 -delete
echo "Cleaned up empty files"

# Count successful downloads
echo "Total images: $(ls -1 | wc -l)"
