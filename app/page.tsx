'use client';

import { useEffect, useState } from 'react';
import OpportunitiesBanner from '@/components/OpportunitiesBanner';
import Header from '@/components/Header';

export default function HomePage() {
    const [aosReady, setAosReady] = useState(false);

    // Initialize AOS on mount with retry logic
    useEffect(() => {
        const initAOS = () => {
            // @ts-expect-error - AOS is loaded via script tag
            if (typeof window !== 'undefined' && window.AOS) {
                // @ts-expect-error - AOS is loaded via script tag
                window.AOS.init({
                    duration: 800,
                    easing: 'ease-out-cubic',
                    once: true,
                    offset: 50,
                    delay: 100,
                });
                // Add class to html element for CSS to target
                document.documentElement.classList.add('aos-init');
                setAosReady(true);
                return true;
            }
            return false;
        };

        // Try immediately
        if (!initAOS()) {
            // Retry every 100ms until AOS loads
            const interval = setInterval(() => {
                if (initAOS()) {
                    clearInterval(interval);
                }
            }, 100);

            // Cleanup after 5 seconds
            const timeout = setTimeout(() => {
                clearInterval(interval);
                setAosReady(true); // Show content anyway
            }, 5000);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, []);

    // Lightbox functionality
    useEffect(() => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement;

        if (!lightbox || !lightboxImg) return;

        const handleImageClick = (e: Event) => {
            const target = e.target as HTMLImageElement;
            if (target.tagName === 'IMG') {
                lightbox.style.display = 'flex';
                lightboxImg.src = target.src;
                document.body.style.overflow = 'hidden';
            }
        };

        const closeLightbox = () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        // Add click handlers to gallery images
        document.querySelectorAll('.gallery-modern').forEach(gallery => {
            gallery.addEventListener('click', handleImageClick);
        });

        // Close handlers
        const closeBtn = document.querySelector('.lightbox-close');
        closeBtn?.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });

        return () => {
            document.querySelectorAll('.gallery-modern').forEach(gallery => {
                gallery.removeEventListener('click', handleImageClick);
            });
        };
    }, []);

    return (
        <>
            {/* Header Navigation with Burger Menu */}
            <Header />

            {/* Hero Section */}
            <section className="hero-modern" id="home">
                <div className="hero-bg" style={{ backgroundImage: "url('/images/ben-lowrey-hero-header.jpg')" }}></div>
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title" data-aos="fade-up">Ben Lowrey</h1>
                    <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="200">
                        Creative Entrepreneur • Property Developer • Mortgage Broker • Retreat Organiser • South Wales, UK
                    </p>
                </div>
            </section>

            {/* About Section */}
            <section className="section-modern about-section" id="about">
                <div className="container-modern">
                    <div className="about-grid">
                        <div className="about-image" data-aos="fade-right">
                            <img src="/images/ben-lowrey-about.jpeg" alt="Ben Lowrey" />
                            <div className="image-frame"></div>
                        </div>
                        <div className="about-content" data-aos="fade-left">
                            <h2 className="section-title">CREATIVE ENTREPRENEUR</h2>
                            <p className="section-text">I&apos;m Ben Lowrey, a creative entrepreneur, event organiser, business owner, and property developer living in South Wales, UK.</p>
                            <p className="section-text">From building successful online businesses to developing properties and creating transformative events, I&apos;ve always followed my passion for innovation and community building.</p>
                            <div className="video-modern" data-aos="fade-up">
                                <iframe
                                    src="https://www.youtube.com/embed/BnfhFYEMI2I"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            {/* Opportunities Card - placed after video */}
                            <OpportunitiesBanner />
                        </div>
                    </div>
                </div>
            </section>

            {/* Ventures Section */}
            <section className="section-modern ventures-section" id="ventures">
                <div className="container-modern">
                    {/* 11 Houses Development */}
                    <div className="venture-card" data-aos="fade-up">
                        <div className="venture-bg" style={{ backgroundImage: "url('/images/ben-lowrey-11-houses-header.jpeg')" }}></div>
                        <div className="venture-content">
                            <h3>11 Houses Development</h3>
                            <h4>March 2022 - Ongoing</h4>
                            <p>Partner in the development of 11 houses in Carmarthen, South Wales. Work commenced March 2022.</p>
                            <div className="venture-media">
                                <img src="/images/ben-lowrey-11-houses-1.jpg" alt="11 Houses" />
                                <div className="video-modern">
                                    <iframe
                                        src="https://www.youtube.com/embed/U84KQ-y7-s4"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Real Awake Events */}
                    <div className="venture-card" data-aos="fade-up">
                        <div className="venture-bg" style={{ backgroundImage: "url('/images/ben-lowrey-real-awake-new-header.jpg')" }}></div>
                        <div className="venture-content">
                            <h3>Real Awake Retreats</h3>
                            <h4>March 2022 - Ongoing</h4>
                            <p>Fun events for spiritual people - creating transformative experiences and building community.</p>
                            <div className="video-modern">
                                <iframe
                                    src="https://www.youtube.com/embed/NqXg6E2PSmM"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="gallery-modern">
                                <img src="/images/ben-lowrey-real-awake-1.jpg" alt="Real Awake" />
                                <img src="/images/ben-lowrey-real-awake-2.jpg" alt="Real Awake" />
                                <img src="/images/ben-lowrey-real-awake-3.jpg" alt="Real Awake" />
                                <img src="/images/ben-lowrey-real-awake-4.jpg" alt="Real Awake" />
                                <img src="/images/ben-lowrey-real-awake-5.jpg" alt="Real Awake" />
                                <img src="/images/ben-lowrey-real-awake-6.jpg" alt="Real Awake" />
                            </div>
                            <a href="https://www.realawake.co.uk/" target="_blank" className="btn-modern btn-small">Visit Website</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Past Projects Section */}
            <section className="section-modern journey-section">
                <div className="container-modern">
                    <div className="journey-grid">
                        {/* Pentre Plaza */}
                        <div className="journey-card" data-aos="fade-up">
                            <h3>Pentre Plaza</h3>
                            <h4>Spring 2021</h4>
                            <p>My first property renovation, purchased with a Lease Option agreement. I renovated the property prior to buying it, with a pre-agreed purchase price.</p>
                            <div className="gallery-modern">
                                <img src="/images/ben-lowrey-pentre-plaza-1.jpg" alt="Pentre Plaza" />
                                <img src="/images/ben-lowrey-pentre-plaza-2.jpg" alt="Pentre Plaza" />
                                <img src="/images/ben-lowrey-pentre-plaza-3.jpg" alt="Pentre Plaza" />
                            </div>
                        </div>

                        {/* Pentre Palace */}
                        <div className="venture-card" data-aos="fade-up">
                            <div className="venture-bg" style={{ backgroundImage: "url('/images/ben-lowrey-pentre-palace-garden.jpg')" }}></div>
                            <div className="venture-content">
                                <h3>Pentre Palace Renovation</h3>
                                <h4>September 2023 - June 2024</h4>
                                <p>A comprehensive renovation project transforming a 5-bed terraced house in South Wales.</p>
                                <div className="video-modern">
                                    <iframe
                                        src="https://www.youtube.com/embed/Ddtd0tZl9uc"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>

                        {/* Hen Party Entertainment */}
                        <div className="venture-card" data-aos="fade-up">
                            <div className="venture-bg" style={{ backgroundImage: "url('/images/ben-lowrey-hen-party-header.jpg')" }}></div>
                            <div className="venture-content">
                                <h3>Hen Party Entertainment Ltd</h3>
                                <h4>2013 - Ongoing</h4>
                                <p>One of my longest standing businesses. Started as a side hustle, now does 250+ bookings per year, employing male models all over the country.</p>
                                <div className="gallery-modern">
                                    <img src="/images/ben-lowrey-hen-party-1.jpg" alt="Hen Party" />
                                    <img src="/images/ben-lowrey-hen-party-2.jpg" alt="Hen Party" />
                                </div>
                                <a href="https://henpartyentertainment.co.uk/" target="_blank" className="btn-modern btn-small">Visit Website</a>
                            </div>
                        </div>

                        {/* Handstands */}
                        <div className="journey-card" data-aos="fade-up">
                            <h3>Handstands &amp; Movement</h3>
                            <h4>2013 - 2019</h4>
                            <p>In 2013, I decided to learn handstands. From 2015 to 2019, I taught workshops all over the UK, produced extensive video tutorials, and ran movement bootcamps.</p>
                            <div className="gallery-modern">
                                <img src="/images/ben-lowrey-handstands-1.jpg" alt="Handstands" />
                                <img src="/images/ben-lowrey-handstands-3.jpg" alt="Handstands" />
                                <img src="/images/ben-lowrey-handstands-6.jpg" alt="Handstands" />
                                <img src="/images/ben-lowrey-handstands-7.jpeg" alt="Handstands" />
                            </div>
                            <div className="video-modern">
                                <iframe
                                    src="https://www.youtube.com/embed/GglFEos8yRk"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="video-modern">
                                <iframe
                                    src="https://www.youtube.com/embed/sq2MAAt6Zig"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <a href="https://circoplex.com/" target="_blank" className="btn-modern btn-small">Visit Website</a>
                        </div>

                        {/* Phantom Assets */}
                        <div className="journey-card" data-aos="fade-up">
                            <h3>Phantom Assets Property Group</h3>
                            <h4>August 2024 - Ongoing</h4>
                            <p>Working with private investors to structure property acquisitions.</p>
                            <div className="gallery-modern">
                                <img src="/images/ben-lowrey-phantom-assets-header.jpg" alt="Phantom Assets" />
                            </div>
                            <a href="https://www.phantom-assets.co.uk/" target="_blank" className="btn-modern btn-small">Visit Website</a>
                        </div>

                        {/* Alopecia & Bodybuilding */}
                        <div className="venture-card" data-aos="fade-up">
                            <div className="venture-bg" style={{ backgroundImage: "url('/images/ben-lowrey-bodybuilding-header.jpg')" }}></div>
                            <div className="venture-content">
                                <h3>Alopecia &amp; Natural Bodybuilding</h3>
                                <h4>2012 - 2019</h4>
                                <p>In 2013, my hair spontaneously fell out - total Alopecia. This triggered my interest in fitness. In 2015, I competed in a Natural Bodybuilding Competition.</p>
                                <div className="gallery-modern">
                                    <img src="/images/ben-lowrey-bodybuilding-1.jpeg" alt="Bodybuilding" />
                                    <img src="/images/ben-lowrey-bodybuilding-2.jpeg" alt="Bodybuilding" />
                                    <img src="/images/ben-lowrey-bodybuilding-3.jpeg" alt="Bodybuilding" />
                                </div>
                            </div>
                        </div>

                        {/* Guitar */}
                        <div className="venture-card" data-aos="fade-up">
                            <div className="venture-bg" style={{ backgroundImage: "url('/images/ben-lowrey-guitar-crowd.jpg')" }}></div>
                            <div className="venture-content">
                                <h3>Guitar</h3>
                                <h4>Age 9 - Age 23</h4>
                                <p>From age 9 to 22, I played electric guitar. In 2006, I transitioned to uploading video guitar lessons to the internet in the early days of YouTube. At its peak, vGuitarLessons.com turned over £180,000 in sales.</p>
                                <div className="gallery-modern">
                                    <img src="/images/ben-lowrey-guitar-header.jpg" alt="Guitar" />
                                    <img src="/images/ben-lowrey-guitar-2.jpg" alt="Guitar" />
                                    <img src="/images/ben-lowrey-guitar-3.jpg" alt="Guitar" />
                                    <img src="/images/ben-lowrey-guitar-4.jpg" alt="Guitar" />
                                </div>
                            </div>
                        </div>

                        {/* Circoplex */}
                        <div className="journey-card" data-aos="fade-up">
                            <h3>Circoplex Lightshow</h3>
                            <h4>2018</h4>
                            <p>I&apos;ve always been fascinated with ambient lighting. In 2018, I spent 3 months building an addressable LED lightshow for my Yoga events.</p>
                            <div className="video-modern">
                                <iframe
                                    src="https://www.youtube.com/embed/kwkZYW7zTy8"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <a href="https://circoplex.com/lightshow/" target="_blank" className="btn-modern btn-small">Technical Spec</a>
                        </div>

                        {/* Plant Medicine */}
                        <div className="venture-card" data-aos="fade-up">
                            <div className="venture-bg" style={{ backgroundImage: "url('/images/ben-lowrey-plant-medicine-header.jpg')" }}></div>
                            <div className="venture-content">
                                <h3>Plant Medicine Journey</h3>
                                <h4>2008 - Present</h4>
                                <p>In 2008, I first did Ayahuasca at a Shamanic Ceremony in Glastonbury. After 13 years, I reconnected in 2021 with Magic Mushrooms and noticed massive mental health benefits.</p>
                                <div className="video-modern">
                                    <iframe
                                        src="https://www.youtube.com/embed/FhMXdeo3RU4"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section-modern contact-section" id="contact">
                <div className="container-modern">
                    <div className="contact-content" data-aos="fade-up">
                        <span className="section-label">Get In Touch</span>
                        <h2 className="section-title">LET&apos;S CONNECT</h2>
                        <div className="contact-info">
                            <a href="mailto:ben@benlowrey.com" className="contact-link">
                                <span className="contact-icon">✉</span>
                                ben@benlowrey.com
                            </a>
                            <a href="tel:07747571426" className="contact-link">
                                <span className="contact-icon">📱</span>
                                07747 571426
                            </a>
                        </div>
                        <div className="gallery-modern" style={{ marginTop: '3rem' }} data-aos="fade-up">
                            <img src="/images/ben-lowrey-contact-1.jpg" alt="Ben Lowrey" />
                            <img src="/images/ben-lowrey-contact-2.jpeg" alt="Ben Lowrey" />
                            <img src="/images/ben-lowrey-contact-3.jpeg" alt="Ben Lowrey" />
                            <img src="/images/ben-lowrey-contact-4.jpeg" alt="Ben Lowrey" />
                            <img src="/images/ben-lowrey-contact-5.jpeg" alt="Ben Lowrey" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            <div id="lightbox" className="lightbox">
                <span className="lightbox-close">&times;</span>
                <img className="lightbox-content" id="lightbox-img" alt="" />
            </div>

            {/* Footer */}
            <footer className="footer-modern">
                <p>© 2026 Ben Lowrey. All rights reserved.</p>
            </footer>
        </>
    );
}
