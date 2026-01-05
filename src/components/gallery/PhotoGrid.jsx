import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Dynamically import all recovered images
// In Vite, import.meta.glob returns an object with paths as keys and import functions as values
const imagesGlob = import.meta.glob('../../assets/uploads/**/*.{jpg,jpeg,png,webp}', { eager: true });

// Convert globular object to array of image URLs
// Filtering for high-quality images (excluding thumbnails like 150x150 if possible)
const allImages = Object.keys(imagesGlob)
    .filter(path => !path.includes('150x150') && !path.includes('300x169')) // naive filter for thumbnails
    .map(path => imagesGlob[path].default);

const PhotoGrid = ({ limit }) => {
    const displayImages = limit ? allImages.slice(0, limit) : allImages;

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
            padding: '1rem 0'
        }}>
            <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                    overflow: 'hidden',
                    borderRadius: '3px', /* Divi style */
                    aspectRatio: '4/3', /* Standard */
                    cursor: 'pointer',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
                }}
                whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.15)' }}
            >
                <img
                    src={src}
                    alt={`Gallery Item ${index}`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease'
                    }}
                />
            </motion.div>
        </div>
    );
};

export default PhotoGrid;
