'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import content from '@/content.json';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: scrolled ? '12px 40px' : '20px 40px',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                background: scrolled
                    ? 'rgba(5, 10, 7, 0.85)'
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(61, 186, 114, 0.12)' : 'none',
            }}
        >
            <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Logo / Name */}
                <Link href="#hero" style={{ textDecoration: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '38px', height: '38px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            boxShadow: '0 0 16px rgba(61,186,114,0.45)',
                            border: '1px solid rgba(61,186,114,0.3)',
                            flexShrink: 0,
                        }}>
                            <Image
                                src="/logo.png"
                                alt={content.personal.name}
                                width={38}
                                height={38}
                                style={{ objectFit: 'cover', display: 'block' }}
                            />
                        </div>
                        <span style={{
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 600,
                            fontSize: '1rem',
                            color: 'var(--text-primary)',
                            letterSpacing: '0.02em',
                        }}>
                            {content.personal.name}
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }} className="hidden md:flex">
                    {content.nav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
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
                </div>

                {/* Contact Button */}
                <Link href="/cv.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <button
                        style={{
                            padding: '10px 24px',
                            background: 'linear-gradient(135deg, #2d7a4f, #1a3a2a)',
                            border: '1px solid rgba(61, 186, 114, 0.4)',
                            borderRadius: '50px',
                            color: 'var(--forest-bright)',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            letterSpacing: '0.08em',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 0 20px rgba(61, 186, 114, 0.2)',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #3dba72, #2d7a4f)';
                            e.currentTarget.style.boxShadow = '0 0 30px rgba(61, 186, 114, 0.5)';
                            e.currentTarget.style.color = '#050a07';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #2d7a4f, #1a3a2a)';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(61, 186, 114, 0.2)';
                            e.currentTarget.style.color = 'var(--forest-bright)';
                        }}
                    >
                        CV
                    </button>
                </Link>
            </div>


        </nav>
    );
}
