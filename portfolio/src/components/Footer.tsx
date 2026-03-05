'use client';
import content from '@/content.json';
import SocialIcon from '@/components/SocialIcons';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            style={{
                position: 'relative',
                background: 'var(--forest-black)',
                padding: '40px 40px 32px',
                overflow: 'hidden',
            }}
        >
            {/* Subtle top divider */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '10%',
                right: '10%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(61,186,114,0.2), transparent)',
            }} />

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {/* Top row: Back to top */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '32px',
                }}>
                    <button
                        onClick={scrollToTop}
                        style={{
                            background: 'rgba(61,186,114,0.08)',
                            border: '1px solid rgba(61,186,114,0.2)',
                            borderRadius: '50px',
                            padding: '10px 24px',
                            color: 'var(--forest-glow)',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            letterSpacing: '0.08em',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(61,186,114,0.18)';
                            e.currentTarget.style.borderColor = 'rgba(61,186,114,0.45)';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(61,186,114,0.15)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(61,186,114,0.08)';
                            e.currentTarget.style.borderColor = 'rgba(61,186,114,0.2)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <span style={{ fontSize: '1rem' }}>↑</span> Back to Top
                    </button>
                </div>

                {/* Social icons row */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '16px',
                    marginBottom: '28px',
                }}>
                    {content.socials.map((s) => (
                        <a
                            key={s.name}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={s.name}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: 'rgba(61,186,114,0.06)',
                                border: '1px solid rgba(61,186,114,0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-muted)',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.color = 'var(--forest-bright)';
                                e.currentTarget.style.borderColor = 'rgba(61,186,114,0.4)';
                                e.currentTarget.style.background = 'rgba(61,186,114,0.12)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = 'var(--text-muted)';
                                e.currentTarget.style.borderColor = 'rgba(61,186,114,0.15)';
                                e.currentTarget.style.background = 'rgba(61,186,114,0.06)';
                            }}
                        >
                            <SocialIcon icon={s.icon} size={15} />
                        </a>
                    ))}
                </div>

                {/* Bottom row */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    paddingTop: '20px',
                    borderTop: '1px solid rgba(61,186,114,0.06)',
                }}>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                    }}>
                        © {new Date().getFullYear()} {content.personal.name}. Crafted with intention.
                    </p>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.04em',
                        opacity: 0.6,
                    }}>
                        Built with Next.js · {content.personal.location}
                    </p>
                </div>
            </div>
        </footer>
    );
}
