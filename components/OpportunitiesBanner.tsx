'use client';

import { useEffect, useState } from 'react';
import { Opportunity, getOpportunities, getVentureName } from '@/lib/opportunities';

export default function OpportunitiesBanner() {
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setOpportunities(getOpportunities());
    }, []);

    // Don't render until mounted (SSR safety)
    if (!mounted) return null;

    // Don't render if no opportunities
    if (opportunities.length === 0) return null;

    return (
        <section className="opportunities-banner" id="opportunities">
            <div className="banner-container">
                <div className="banner-icon">🤝</div>
                <div className="banner-content">
                    <h3>Work with Ben</h3>
                    <p>
                        {opportunities.length === 1
                            ? `Currently looking for: ${opportunities[0].title}`
                            : `${opportunities.length} opportunities available across ${[...new Set(opportunities.map(o => getVentureName(o.ventureId)))].join(', ')}`
                        }
                    </p>
                </div>
                <a href="#opportunities-detail" className="banner-cta">View Opportunities →</a>
            </div>
        </section>
    );
}
