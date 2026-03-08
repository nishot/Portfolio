'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import content from '@/content.json';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = 'unset';
    };

    return (
        <>
            <nav
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    padding: scrolled ? '12px 20px' : '20px 20px',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    background: scrolled
                        ? 'rgba(5, 10, 7, 0.85)'
                        : (isMenuOpen ? '#050a07' : 'transparent'),
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(61, 186, 114, 0.12)' : 'none',
                }}
            >
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Logo / Name */}
                    <Link href="#hero" onClick={closeMenu} style={{ textDecoration: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                                width: '34px', height: '34px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: '0 0 16px rgba(61,186,114,0.45)',
                                border: '1px solid rgba(61,186,114,0.3)',
                                flexShrink: 0,
                            }}>
                                <Image
                                    src="/logo.png"
                                    alt={content.personal.name}
                                    width={34}
                                    height={34}
                                    style={{ objectFit: 'cover', display: 'block' }}
                                    priority
                                />
                            </div>
                            <span style={{
                                fontFamily: 'var(--font-sans)',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                color: 'var(--text-primary)',
                                letterSpacing: '0.02em',
                            }} className="nav-logo-text">
                                {content.personal.name}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }} className="nav-desktop">
                        {content.nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={(e) => {
                                    if (item.href.startsWith('#')) {
                                        e.preventDefault();
                                        const target = document.querySelector(item.href);
                                        if (target && 'lenis' in window) {
                                            window.history.pushState(null, '', item.href);
                                            (window as unknown as { lenis: { scrollTo: (el: Element) => void } }).lenis.scrollTo(target);
                                        }
                                    }
                                    closeMenu();
                                }}
                                style={{
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '0.875rem',
                                    fontWeight: 400,
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    letterSpacing: '0.05em',
                                    transition: 'color 0.3s ease',
                                    position: 'relative',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--forest-bright)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                            >
                                {item.label}
                            </Link>
                        ))}
                        {/* CV Button Desktop */}
                        <Link href="/cv.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <button
                                style={{
                                    padding: '8px 20px',
                                    background: 'linear-gradient(135deg, #2d7a4f, #1a3a2a)',
                                    border: '1px solid rgba(61, 186, 114, 0.4)',
                                    borderRadius: '50px',
                                    color: 'var(--forest-bright)',
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '0.8rem',
                                    fontWeight: 500,
                                    letterSpacing: '0.08em',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 0 20px rgba(61, 186, 114, 0.2)',
                                }}
                            >
                                CV
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={toggleMenu}
                        style={{
                            display: 'none',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(61, 186, 114, 0.1)',
                            border: '1px solid rgba(61, 186, 114, 0.2)',
                            borderRadius: '8px',
                            padding: '8px',
                            color: 'var(--forest-bright)',
                            cursor: 'pointer',
                            zIndex: 1100,
                        }}
                        className="mobile-toggle"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay - Moved OUTSIDE nav for absolute control */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: '#050a07',
                    zIndex: 900,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '80px 20px',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
                    opacity: isMenuOpen ? 1 : 0,
                    pointerEvents: isMenuOpen ? 'all' : 'none',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
                    {content.nav.map((item, i) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={(e) => {
                                if (item.href.startsWith('#')) {
                                    e.preventDefault();
                                    const target = document.querySelector(item.href);
                                    if (target && 'lenis' in window) {
                                        window.history.pushState(null, '', item.href);
                                        (window as unknown as { lenis: { scrollTo: (el: Element) => void } }).lenis.scrollTo(target);
                                    }
                                }
                                closeMenu();
                            }}
                            style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: '2.5rem',
                                fontWeight: 300,
                                color: 'var(--text-primary)',
                                textDecoration: 'none',
                                letterSpacing: '0.02em',
                                transition: 'all 0.3s ease',
                                opacity: isMenuOpen ? 1 : 0,
                                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                                transitionDelay: `${i * 0.05}s`,
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div style={{ marginTop: '20px', width: '240px' }}>
                        <Link href="/cv.pdf" target="_blank" rel="noopener noreferrer" onClick={closeMenu} style={{ textDecoration: 'none' }}>
                            <button
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    background: 'linear-gradient(135deg, #3dba72, #2d7a4f)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: '#050a07',
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    letterSpacing: '0.1em',
                                    cursor: 'pointer',
                                    boxShadow: '0 0 20px rgba(61, 186, 114, 0.3)',
                                }}
                            >
                                DOWNLOAD CV
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (min-width: 769px) {
                    .nav-desktop { display: flex !important; }
                    .mobile-toggle { display: none !important; }
                }
                @media (max-width: 768px) {
                    .nav-desktop { display: none !important; }
                    .mobile-toggle { display: flex !important; }
                    .nav-logo-text { display: none !important; }
                }
            `}} />
        </>
    );
}
