'use client';

import { useEffect, useState } from 'react';
import { Opportunity, getOpportunities, getVentureName, getVentureEmoji } from '@/lib/opportunities';

export default function OpportunitiesCard() {
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setOpportunities(getOpportunities());
    }, []);

    // Don't render anything until mounted (SSR safety)
    if (!mounted) {
        return null;
    }

    // Don't render if no opportunities
    if (opportunities.length === 0) {
        return null;
    }

    return (
        <section className="section-modern opportunities-section" id="opportunities">
            <div className="container-modern">
                <div className="opportunities-header" data-aos="fade-up">
                    <h2>Want to Work with Ben?</h2>
                    <p>Here are the current ways you can get involved across my ventures.</p>
                </div>

                <div className="opportunities-grid">
                    {opportunities.map((opp, index) => (
                        <div
                            key={opp.id}
                            className="opportunity-card"
                            data-aos="fade-up"
                            data-aos-delay={100 + (index * 100)}
                        >
                            <span className="venture-tag">
                                {getVentureEmoji(opp.ventureId)} {getVentureName(opp.ventureId)}
                            </span>
                            <h3>{opp.title}</h3>
                            <p>{opp.description}</p>
                            <a href="#contact" className="btn-modern btn-small">Get in Touch</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
