import React from 'react';
import { motion } from 'framer-motion';
// Importing a recovered image directly. 
// Note: In a real app we might dynamic import or use a CMS URL, but for now we bind to a recovered asset.
import heroBg from '../assets/uploads/2020/10/AE289605-8A5A-4920-9369-E5FD56FBF208.jpeg'; // Adjust path if needed once file structure settles

const Hero = () => {
    return (
        <section style={{
            position: 'relative',
            height: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: '24px',
            margin: '0 0 4rem 0'
        }}>
            {/* Background Image with Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${heroBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.6)',
                zIndex: 0
            }} />

            {/* Content */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                color: '#fff'
            }}>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        marginBottom: '1rem',
                        textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        lineHeight: 1.1
                    }}
                >
                    Ben Lowrey
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    style={{
                        fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                        opacity: 0.9,
                        maxWidth: '600px',
                        margin: '0 auto',
                        fontWeight: 300
                    }}
                >
                    Developer. Photographer. Adventurer.
                </motion.p>
            </div>
        </section>
    );
};

export default Hero;
