import React from 'react';
import { motion } from 'framer-motion';
// Importing a recovered image directly. 
// Note: In a real app we might dynamic import or use a CMS URL, but for now we bind to a recovered asset.
import heroBg from '../assets/uploads/2022/04/IMG_19901-1080x607.jpg'; // Adjust path if needed once file structure settles

const Hero = () => {
    return (
        <section className="section" style={{
            position: 'relative',
            padding: '150px 0', /* Divi standard hero padding */
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            overflow: 'hidden',
            backgroundColor: '#333' /* Fallback */
        }}>
            {/* Background Image Parallax-ish */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${heroBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.5)', /* Keep text readable */
                zIndex: 0
            }} />

            {/* Content */}
            <div className="container" style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center'
            }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        fontSize: '3rem', /* Standard clear header size */
                        marginBottom: '10px',
                        color: '#ffffff',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }}
                >
                    Ben Lowrey
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    style={{
                        fontSize: '1.2rem',
                        opacity: 0.9,
                        margin: '0 auto',
                        maxWidth: '800px'
                    }}
                >
                    Developer. Photographer. Adventurer.
                </motion.p>
            </div>
        </section>
    );
};

export default Hero;
