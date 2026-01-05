import React from 'react';
import { motion } from 'framer-motion';

const LifeTimeline = () => {
    const events = [
        { year: '2024', title: 'New Horizons', description: 'Expanding into software engineering and AI agents.' },
        { year: '2022', title: 'Adventures', description: 'Traveling, photography, and exploring the world.', image: 'src/assets/uploads/2022/04/IMG_19861.jpg' }, // Example path
        { year: '2020', title: 'Creative Focus', description: 'Deep dive into digital content and storytelling.' },
    ];

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <h2 className="text-center" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Life Timeline</h2>
            <div style={{ position: 'relative', borderLeft: '2px solid #e0e0e0', marginLeft: '20px' }}>
                {events.map((event, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        style={{ paddingLeft: '40px', marginBottom: '4rem', position: 'relative' }}
                    >
                        <div style={{
                            position: 'absolute',
                            left: '-11px',
                            top: '5px',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: 'var(--color-primary)',
                            border: '4px solid var(--color-background)'
                        }} />
                        <span style={{ fontSize: '1rem', color: 'var(--color-primary)', fontWeight: 'bold', textTransform: 'uppercase' }}>{event.year}</span>
                        <h3 style={{ fontSize: '1.8rem', margin: '0.5rem 0' }}>{event.title}</h3>
                        <p style={{ opacity: 0.8, fontSize: '1rem', maxWidth: '600px', color: 'var(--color-text-light)' }}>{event.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LifeTimeline;
