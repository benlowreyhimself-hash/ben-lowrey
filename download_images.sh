#!/bin/bash
cd images
counter=1
while IFS= read -r url; do
    filename=$(echo "$url" | sed 's/.*\///g' | sed 's/?.*//g' | head -c 50)
    echo "Downloading $counter: $filename"
    curl -s -L "$url" -o "$filename" &
    if [ $((counter % 10)) -eq 0 ]; then
        wait
    fi
    counter=$((counter + 1))
done < ../clean_urls.txt
wait
echo "Done downloading all images"
