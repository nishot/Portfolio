'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import content from '@/content.json';
import Parallax from './Parallax';

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach((el, i) => {
                            setTimeout(() => el.classList.add('visible'), i * 120);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            style={{
                position: 'relative',
                background: 'linear-gradient(180deg, var(--forest-black) 0%, #060d08 50%, #080f0b 100%)',
                padding: '60px 40px',
                overflow: 'hidden',
            }}
        >
            {/* Subtle ambient green glow top-center */}
            <div style={{
                position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
                width: '600px', height: '400px',
                background: 'radial-gradient(ellipse, rgba(61,186,114,0.06) 0%, transparent 70%)',
                pointerEvents: 'none', zIndex: 0,
            }} />

            <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Two-column layout */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1.2fr',
                    gap: '80px',
                    alignItems: 'center',
                }}
                    className="about-grid"
                >
                    {/* Left - Ancient tree image */}
                    <Parallax speed={0.5} className="reveal-left" style={{ position: 'relative', maxWidth: '440px', margin: '0 auto' }}>
                        {/* Decorative frame lines */}
                        <div style={{
                            position: 'absolute', top: '-12px', left: '-12px', right: '12px', bottom: '12px',
                            border: '1px solid rgba(61,186,114,0.15)',
                            borderRadius: '16px',
                            pointerEvents: 'none',
                            zIndex: 0,
                        }} />
                        {/* Gold corner accents */}
                        <div style={{ position: 'absolute', top: '-16px', left: '-16px', width: '24px', height: '24px', borderTop: '2px solid var(--gold)', borderLeft: '2px solid var(--gold)', zIndex: 2 }} />
                        <div style={{ position: 'absolute', bottom: '-16px', right: '-16px', width: '24px', height: '24px', borderBottom: '2px solid var(--gold)', borderRight: '2px solid var(--gold)', zIndex: 2 }} />

                        {/* Coordinates (decorative like the reference) */}
                        <Parallax speed={-0.3} style={{
                            position: 'absolute', left: '-36px', top: '50%', transform: 'translateY(-50%) rotate(-90deg)',
                            fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.12em',
                            color: 'var(--text-muted)', whiteSpace: 'nowrap', zIndex: 2,
                        }}>
                            27.7006° N, 83.4486° E
                        </Parallax>

                        <div style={{
                            position: 'relative',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                            border: '1px solid rgba(61,186,114,0.1)'
                        }}>
                            <Image
                                src={content.personal.avatar}
                                alt={content.personal.name}
                                width={440}
                                height={587}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    objectFit: 'cover'
                                }}
                                sizes="(max-width: 768px) 100vw, 40vw"
                                priority
                            />
                            {/* Green overlay tint */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(180deg, transparent 60%, rgba(5,10,7,0.4) 100%)',
                            }} />
                            {/* Vertical line accent */}
                            <div style={{ position: 'absolute', top: '0', bottom: '0', left: '-16px', width: '1px', background: 'linear-gradient(180deg, var(--gold), transparent)' }} />
                        </div>
                    </Parallax>

                    {/* Right - Editorial text */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        {/* THE VISIONARY title */}
                        <div className="reveal-right">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                                <div style={{ width: '8px', height: '8px', background: 'var(--gold)', borderRadius: '50%', boxShadow: '0 0 12px var(--gold)' }} />
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>Portfolio</span>
                            </div>
                            <h2 style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                                fontWeight: 300,
                                lineHeight: 1.0,
                                color: 'var(--text-primary)',
                                letterSpacing: '-0.01em',
                            }}>
                                THE<br />
                                <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>VISIONARY</em>
                            </h2>
                        </div>

                        {/* Bio paragraph */}
                        <div className="reveal-right" style={{ transitionDelay: '0.12s' }}>
                            <p style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
                                fontWeight: 300,
                                lineHeight: 1.85,
                                color: 'var(--text-secondary)',
                            }}>
                                {content.personal.bio}
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="reveal-right" style={{ transitionDelay: '0.2s' }}>
                            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', marginBottom: '28px' }} />

                            {/* Collaborations section */}
                            <p style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.7rem',
                                letterSpacing: '0.25em',
                                color: 'var(--text-muted)',
                                textTransform: 'uppercase',
                                marginBottom: '20px',
                            }}>
                                Interests & Exploration
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                {(content.collaborations as { name: string }[]).length > 0 ? (
                                    (content.collaborations as { name: string }[]).map((collab) => (
                                        <div
                                            key={collab.name}
                                            style={{
                                                padding: '8px 18px',
                                                background: 'rgba(201,168,76,0.06)',
                                                border: '1px solid rgba(201,168,76,0.2)',
                                                borderRadius: '50px',
                                                fontFamily: 'var(--font-body)',
                                                fontSize: '0.8rem',
                                                color: 'var(--gold-light)',
                                                transition: 'all 0.3s ease',
                                            }}
                                            onMouseEnter={e => {
                                                (e.currentTarget as HTMLDivElement).style.background = 'rgba(201,168,76,0.12)';
                                                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 16px rgba(201,168,76,0.2)';
                                            }}
                                            onMouseLeave={e => {
                                                (e.currentTarget as HTMLDivElement).style.background = 'rgba(201,168,76,0.06)';
                                                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                                            }}
                                        >
                                            {collab.name}
                                        </div>
                                    ))
                                ) : (
                                    ['Machine Learning', 'Deep Learning', 'System Design'].map((topic) => (
                                        <div
                                            key={topic}
                                            style={{
                                                padding: '8px 18px',
                                                background: 'rgba(201,168,76,0.06)',
                                                border: '1px solid rgba(201,168,76,0.2)',
                                                borderRadius: '50px',
                                                fontFamily: 'var(--font-body)',
                                                fontSize: '0.8rem',
                                                color: 'var(--gold-light)',
                                                transition: 'all 0.3s ease',
                                            }}
                                            onMouseEnter={e => {
                                                (e.currentTarget as HTMLDivElement).style.background = 'rgba(201,168,76,0.12)';
                                                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 16px rgba(201,168,76,0.2)';
                                            }}
                                            onMouseLeave={e => {
                                                (e.currentTarget as HTMLDivElement).style.background = 'rgba(201,168,76,0.06)';
                                                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                                            }}
                                        >
                                            {topic}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
        </section >
    );
}
