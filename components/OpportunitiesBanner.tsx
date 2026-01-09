'use client';

import { useEffect, useState } from 'react';
import { Opportunity, VENTURES, getVentureName } from '@/lib/opportunities';

export default function OpportunitiesBanner() {
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [ventureImages, setVentureImages] = useState<Record<string, string>>({});
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Fetch opportunities and settings from API (persistent server storage)
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data.opportunities) {
                    setOpportunities(data.opportunities);
                }
                if (data.ventureImages) {
                    setVentureImages(data.ventureImages);
                }
            })
            .catch(err => {
                console.error('Failed to load opportunities:', err);
            });
    }, []);

    // Helper to resolve image
    const resolveImage = (ventureId: string) => {
        // Try custom image from API settings
        if (ventureImages[ventureId]) return ventureImages[ventureId];
        // Fallback to default
        return VENTURES.find(v => v.id === ventureId)?.defaultImage || '/images/logo.jpg';
    };

    // Don't render until mounted (SSR safety)
    if (!mounted) return null;

    const hasOpportunities = opportunities.length > 0;

    return (
        <div className="opportunities-card-simple" data-aos="fade-up">
            <h3>Ways to Work with Ben</h3>
            {hasOpportunities ? (
                <>
                    <p>I&apos;m currently looking for partners and collaborators across my ventures:</p>
                    <div className="opportunities-list-simple">
                        {opportunities.map(opp => (
                            <div key={opp.id} className="opportunity-item-simple">
                                <img
                                    src={resolveImage(opp.ventureId)}
                                    alt={getVentureName(opp.ventureId)}
                                    className="opportunity-thumb-simple"
                                />
                                <div className="opportunity-info-simple">
                                    <div className="opportunity-header-simple">
                                        <h4>{opp.title}</h4>
                                        <span className="venture-label">{getVentureName(opp.ventureId)}</span>
                                    </div>
                                    <p>{opp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <a href="#contact" className="btn-modern btn-small">Get in Touch</a>
                </>
            ) : (
                <>
                    <p>I&apos;m always open to discussing new opportunities across property development, retreats, and entertainment ventures.</p>
                    <a href="#contact" className="btn-modern btn-small">Get in Touch</a>
                </>
            )}
        </div>
    );
}
