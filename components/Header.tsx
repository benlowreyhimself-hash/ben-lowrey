'use client';

import { useState } from 'react';
import { useUser, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isSignedIn } = useUser();
    // Admin link shown when signed in - middleware protects the actual route

    return (
        <header className="navbar-modern" id="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Link href="/">
                        <img src="/images/logo.jpg" alt="Ben Lowrey" className="navbar-logo" />
                    </Link>
                </div>

                <div className="navbar-right">
                    <a href="#contact" className="btn-modern btn-small nav-contact-btn">Contact</a>

                    {/* Burger Menu */}
                    <button
                        className={`burger-menu ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                {/* Dropdown Menu */}
                <nav className={`nav-dropdown ${menuOpen ? 'open' : ''}`}>
                    <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
                    <a href="#ventures" onClick={() => setMenuOpen(false)}>Ventures</a>
                    <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>

                    <div className="nav-divider"></div>

                    {isSignedIn ? (
                        <>
                            <Link href="/admin/opportunities" onClick={() => setMenuOpen(false)} className="nav-admin-link">
                                ⚙️ Admin Console
                            </Link>
                            <SignOutButton>
                                <button className="nav-logout-btn">Logout</button>
                            </SignOutButton>
                        </>
                    ) : (
                        <Link href="/sign-in" onClick={() => setMenuOpen(false)} className="nav-signin-link">
                            Sign In
                        </Link>
                    )}
                </nav>
            </div>

            {/* Overlay */}
            {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)}></div>}
        </header>
    );
}
