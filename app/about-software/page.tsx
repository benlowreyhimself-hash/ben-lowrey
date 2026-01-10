import Link from 'next/link';

export const metadata = {
    title: 'About This Software | Ben Lowrey',
    description: 'Learn about the technology and architecture behind the Ben Lowrey portfolio website.',
};

export default function AboutSoftwarePage() {
    return (
        <main className="min-h-screen relative">
            {/* Background matching site aesthetic */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition mb-8">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white mb-4">About This Software</h1>
                    <p className="text-white/60 text-lg">The technology powering benlowrey.com</p>
                </div>

                {/* Content */}
                <article className="prose prose-invert prose-lg max-w-none">
                    <div className="glass rounded-2xl p-8 md:p-12 space-y-6">
                        <p className="text-white/90 leading-relaxed">
                            The Ben Lowrey portfolio website represents a carefully architected digital presence, built with modern web technologies to showcase ventures, professional experiences, and opportunities for collaboration. This Next.js 15 application combines server-side rendering with client-side interactivity to deliver a fast, responsive experience across all devices.
                        </p>

                        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Technical Architecture</h2>
                        <p className="text-white/90 leading-relaxed">
                            At its core, this site leverages the Next.js App Router with React Server Components, enabling optimal performance through automatic code splitting and intelligent prefetching. The application uses TypeScript throughout for type safety and improved developer experience. Styling is handled through a custom CSS system with CSS variables for theming, creating the distinctive frosted-glass ("glassmorphism") aesthetic that defines the visual identity.
                        </p>

                        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Authentication & Administration</h2>
                        <p className="text-white/90 leading-relaxed">
                            The site includes a secure admin console protected by Clerk authentication. This allows for dynamic content management through a custom JSON-based persistence system. The admin interface enables real-time updates to opportunities, venture showcases, and background imagery—all committed to the repository and deployed through Vercel's CI/CD pipeline for production reliability.
                        </p>

                        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Key Features</h2>
                        <ul className="list-disc list-inside text-white/90 space-y-2">
                            <li>Dynamic venture cards with self-service branding and thumbnail management</li>
                            <li>Opportunities banner with configurable collaboration types</li>
                            <li>Background rotation system with admin-controlled image pool</li>
                            <li>Mobile-first responsive design with burger menu navigation</li>
                            <li>Google Analytics 4 integration for visitor insights</li>
                            <li>SEO-optimised metadata and structured data</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Design Philosophy</h2>
                        <p className="text-white/90 leading-relaxed">
                            The visual design follows a "Cinematic Visual Hardening" approach—using fixed blurred backgrounds with frosted-glass containers to create depth and focus. The teal accent colour (#14b8a6) provides visual consistency across interactive elements, while the dark colour palette ensures comfortable viewing in any lighting condition.
                        </p>

                        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Infrastructure</h2>
                        <p className="text-white/90 leading-relaxed">
                            Hosted on Vercel's edge network, the site benefits from global CDN distribution, automatic HTTPS, and instant rollbacks. The code-committed JSON store pattern ensures that all content changes are version-controlled, traceable, and recoverable. This architecture prioritises reliability and simplicity over complex database dependencies.
                        </p>

                        <div className="mt-12 pt-8 border-t border-white/10">
                            <p className="text-white/50 text-sm">
                                Built with Next.js 15, React 18, TypeScript, and deployed on Vercel.
                                <br />
                                © {new Date().getFullYear()} Ben Lowrey. All rights reserved.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}
