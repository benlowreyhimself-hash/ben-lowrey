import React from 'react';

const VideoCard = ({ videoId, title }) => (
    <div className="video-card" style={{
        position: 'relative',
        paddingBottom: '56.25%', /* 16:9 */
        height: 0,
        overflow: 'hidden',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginBottom: '20px',
        backgroundColor: '#000'
    }}>
        <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    </div>
);

const LifeSection = ({ title, date, text, videos, children }) => {
    return (
        <div className="life-section" style={{
            padding: '60px 0',
            borderBottom: '1px solid #eee'
        }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>

                {/* Header */}
                <div className="section-header text-center" style={{ marginBottom: '40px' }}>
                    {date && (
                        <span style={{
                            display: 'inline-block',
                            padding: '6px 12px',
                            backgroundColor: '#f0f0f0',
                            color: '#666',
                            borderRadius: '20px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            marginBottom: '15px'
                        }}>
                            {date}
                        </span>
                    )}
                    {title && <h2 style={{ fontSize: '2.2rem', color: '#333', marginBottom: '20px' }}>{title}</h2>}
                    {text && text.map((p, i) => (
                        <p key={i} style={{
                            fontSize: '1.1rem',
                            lineHeight: '1.8',
                            color: '#555',
                            marginBottom: '15px',
                            maxWidth: '700px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                            {p}
                        </p>
                    ))}
                </div>

                {/* Media Content */}
                {children}

                {/* Videos Grid */}
                {videos && videos.length > 0 && (
                    <div className="video-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: videos.length > 1 ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr',
                        gap: '30px',
                        marginTop: '30px'
                    }}>
                        {videos.map((v, i) => (
                            <VideoCard key={i} videoId={v.id} title={v.title} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LifeSection;
