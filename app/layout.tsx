import { ClerkProvider } from '@clerk/nextjs';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
    variable: '--font-inter',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['700', '900'],
    variable: '--font-playfair',
});

export const metadata = {
    title: 'Ben Lowrey | Entrepreneur & Property Developer',
    description: 'Creative entrepreneur, property developer, and Real Awake founder based in South Wales, UK',
    openGraph: {
        type: 'website',
        url: 'https://benlowrey.com/',
        title: 'Ben Lowrey | Creative Entrepreneur & Property Developer',
        description: 'Creative Entrepreneur • Property Developer • Mortgage Broker • Retreat Organiser',
        images: ['https://benlowrey.com/images/ben-lowrey-hero-header.jpg'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ben Lowrey | Creative Entrepreneur & Property Developer',
        description: 'Creative Entrepreneur • Property Developer • Mortgage Broker • Retreat Organiser',
        images: ['https://benlowrey.com/images/ben-lowrey-hero-header.jpg'],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    return (
        <ClerkProvider>
            <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
                <head>
                    <link rel="icon" type="image/jpeg" href="/images/logo.jpg" />
                    {/* Google Analytics 4 */}
                    {gaMeasurementId && (
                        <>
                            <Script
                                src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
                                strategy="afterInteractive"
                            />
                            <Script id="google-analytics" strategy="afterInteractive">
                                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaMeasurementId}');
                `}
                            </Script>
                        </>
                    )}
                    {/* AOS Animation - CSS handled in globals.css */}
                </head>
                <body>
                    {children}
                    <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js" strategy="afterInteractive" />
                </body>
            </html>
        </ClerkProvider>
    );
}
