'use client';
import { useEffect, useRef, useState } from 'react';
import content from '@/content.json';
import SocialIcon from '@/components/SocialIcons';

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach((el, i) => {
                            setTimeout(() => el.classList.add('visible'), i * 100);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch(content.contact.formAction, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                setStatus('sent');
                setForm({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Form error:', error);
            setStatus('error');
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '14px 18px',
        background: 'rgba(8,25,14,0.5)',
        border: '1px solid rgba(61,186,114,0.18)',
        borderRadius: '10px',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-body)',
        fontSize: '0.95rem',
        outline: 'none',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
    };

    // socialIcons mapping no longer needed — using SocialIcon component

    return (
        <section
            id="contact"
            ref={sectionRef}
            style={{
                position: 'relative',
                background: 'linear-gradient(180deg, #060c09 0%, var(--forest-black) 100%)',
                padding: '30px 40px 80px',
                overflow: 'hidden',
            }}
        >
            {/* Ambient glow center */}
            <div style={{
                position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
                width: '700px', height: '400px',
                background: 'radial-gradient(ellipse, rgba(61,186,114,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '70px' }}>
                    <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.7rem',
                        letterSpacing: '0.25em',
                        color: 'var(--forest-glow)',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '12px',
                    }}>
                        ◆ &nbsp; Get In Touch
                    </span>
                    <h2 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                        fontWeight: 300,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.01em',
                        marginBottom: '16px',
                    }}>
                        Let&apos;s <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Connect</em>
                    </h2>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem',
                        color: 'var(--text-secondary)',
                        maxWidth: '500px',
                        margin: '0 auto',
                        lineHeight: 1.7,
                    }}>
                        Open to collaborations, interesting projects, and conversations about the future of AI.
                    </p>
                </div>

                {/* Two-column: form + info */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '48px', alignItems: 'start' }}
                    className="contact-grid">

                    {/* Contact Form */}
                    <div className="reveal-left">
                        <div style={{
                            background: 'rgba(8,25,14,0.55)',
                            backdropFilter: 'blur(24px)',
                            border: '1px solid rgba(61,186,114,0.14)',
                            borderRadius: '20px',
                            padding: '40px',
                        }}>
                            {status === 'sent' ? (
                                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                    <div style={{
                                        width: '64px', height: '64px', borderRadius: '50%',
                                        background: 'rgba(61,186,114,0.15)',
                                        border: '1px solid rgba(61,186,114,0.3)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 20px',
                                        fontSize: '1.5rem',
                                        color: 'var(--forest-glow)',
                                    }}>✓</div>
                                    <h3 style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', marginBottom: '8px' }}>Message Sent!</h3>
                                    <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                        Thanks for reaching out. I&apos;ll get back to you soon.
                                    </p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        style={{ marginTop: '20px', background: 'none', border: '1px solid rgba(61,186,114,0.3)', color: 'var(--forest-glow)', padding: '8px 20px', borderRadius: '50px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                                    >
                                        Send Another
                                    </button>
                                </div>
                            ) : status === 'error' ? (
                                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                    <div style={{
                                        width: '64px', height: '64px', borderRadius: '50%',
                                        background: 'rgba(255, 107, 107, 0.15)',
                                        border: '1px solid rgba(255, 107, 107, 0.3)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 20px',
                                        fontSize: '1.5rem',
                                        color: '#ff6b6b',
                                    }}>!</div>
                                    <h3 style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', marginBottom: '8px' }}>Oops!</h3>
                                    <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                        Something went wrong. Please check your connection or try again.
                                    </p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        style={{ marginTop: '20px', background: 'none', border: '1px solid rgba(255, 107, 107, 0.3)', color: '#ff6b6b', padding: '8px 20px', borderRadius: '50px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                                    >
                                        Try Again
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontFamily: 'var(--font-body)',
                                            fontSize: '0.75rem',
                                            letterSpacing: '0.12em',
                                            color: 'var(--text-muted)',
                                            textTransform: 'uppercase',
                                            marginBottom: '8px',
                                        }}>
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            suppressHydrationWarning
                                            placeholder="Your name"
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                            style={inputStyle}
                                            onFocus={e => {
                                                e.target.style.borderColor = 'rgba(61,186,114,0.45)';
                                                e.target.style.boxShadow = '0 0 20px rgba(61,186,114,0.1)';
                                            }}
                                            onBlur={e => {
                                                e.target.style.borderColor = 'rgba(61,186,114,0.18)';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontFamily: 'var(--font-body)',
                                            fontSize: '0.75rem',
                                            letterSpacing: '0.12em',
                                            color: 'var(--text-muted)',
                                            textTransform: 'uppercase',
                                            marginBottom: '8px',
                                        }}>
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            suppressHydrationWarning
                                            placeholder="your@email.com"
                                            value={form.email}
                                            onChange={e => setForm({ ...form, email: e.target.value })}
                                            style={inputStyle}
                                            onFocus={e => {
                                                e.target.style.borderColor = 'rgba(61,186,114,0.45)';
                                                e.target.style.boxShadow = '0 0 20px rgba(61,186,114,0.1)';
                                            }}
                                            onBlur={e => {
                                                e.target.style.borderColor = 'rgba(61,186,114,0.18)';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontFamily: 'var(--font-body)',
                                            fontSize: '0.75rem',
                                            letterSpacing: '0.12em',
                                            color: 'var(--text-muted)',
                                            textTransform: 'uppercase',
                                            marginBottom: '8px',
                                        }}>
                                            Message
                                        </label>
                                        <textarea
                                            required
                                            suppressHydrationWarning
                                            rows={5}
                                            placeholder="Tell me about your project..."
                                            value={form.message}
                                            onChange={e => setForm({ ...form, message: e.target.value })}
                                            style={{ ...inputStyle, resize: 'vertical', minHeight: '130px' }}
                                            onFocus={e => {
                                                e.target.style.borderColor = 'rgba(61,186,114,0.45)';
                                                e.target.style.boxShadow = '0 0 20px rgba(61,186,114,0.1)';
                                            }}
                                            onBlur={e => {
                                                e.target.style.borderColor = 'rgba(61,186,114,0.18)';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        suppressHydrationWarning
                                        disabled={status === 'sending'}
                                        style={{
                                            padding: '14px 32px',
                                            background: 'linear-gradient(135deg, #3dba72, #2d7a4f)',
                                            border: 'none',
                                            borderRadius: '50px',
                                            color: '#050a07',
                                            fontFamily: 'var(--font-sans)',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            letterSpacing: '0.05em',
                                            cursor: status === 'sending' ? 'wait' : 'pointer',
                                            boxShadow: '0 0 24px rgba(61,186,114,0.3)',
                                            transition: 'all 0.3s ease',
                                            opacity: status === 'sending' ? 0.8 : 1,
                                        }}
                                    >
                                        {status === 'sending' ? 'Sending...' : 'Send Message →'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Info panel */}
                    <div className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <div>
                            <p style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: '1.15rem',
                                lineHeight: 1.8,
                                color: 'var(--text-secondary)',
                                fontStyle: 'italic',
                                marginBottom: '24px',
                            }}>
                                &ldquo;The best way to predict the future is to build it.&rdquo;
                            </p>
                            <div style={{
                                height: '1px',
                                background: 'linear-gradient(90deg, var(--forest-accent), transparent)',
                                marginBottom: '28px',
                            }} />
                        </div>

                        {/* Direct contact */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <p style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.18em',
                                    color: 'var(--text-muted)',
                                    textTransform: 'uppercase',
                                    marginBottom: '12px',
                                }}>
                                    Quick Chat
                                </p>
                                <a
                                    href={`https://wa.me/${content.contact.whatsapp.replace(/\+/g, '')}?text=Hi%20Nishot,%20I%20saw%20your%20portfolio...`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        padding: '12px 24px',
                                        background: 'rgba(37, 211, 102, 0.1)',
                                        border: '1px solid rgba(37, 211, 102, 0.25)',
                                        borderRadius: '50px',
                                        color: '#25d366',
                                        fontFamily: 'var(--font-sans)',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease',
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(37, 211, 102, 0.15)';
                                        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(37, 211, 102, 0.5)';
                                        (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 20px rgba(37, 211, 102, 0.2)';
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(37, 211, 102, 0.1)';
                                        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(37, 211, 102, 0.25)';
                                        (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                                    }}
                                >
                                    <SocialIcon icon="mail" size={14} /> {/* Using mail icon as placeholder for WhatsApp if needed, or better, no icon if socialIcon doesn't have it */}
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Social links */}
                        <div>
                            <p style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.7rem',
                                letterSpacing: '0.18em',
                                color: 'var(--text-muted)',
                                textTransform: 'uppercase',
                                marginBottom: '16px',
                            }}>
                                Find Me Online
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {content.socials.map((s) => (
                                    <a
                                        key={s.name}
                                        href={s.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '14px',
                                            padding: '12px 18px',
                                            background: 'rgba(8,25,14,0.4)',
                                            border: '1px solid rgba(61,186,114,0.1)',
                                            borderRadius: '10px',
                                            textDecoration: 'none',
                                            transition: 'all 0.3s ease',
                                            backdropFilter: 'blur(10px)',
                                        }}
                                        onMouseEnter={e => {
                                            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(61,186,114,0.3)';
                                            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(15,35,22,0.6)';
                                            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateX(4px)';
                                        }}
                                        onMouseLeave={e => {
                                            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(61,186,114,0.1)';
                                            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(8,25,14,0.4)';
                                            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateX(0)';
                                        }}
                                    >
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '8px',
                                            background: 'rgba(61,186,114,0.1)',
                                            border: '1px solid rgba(61,186,114,0.2)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: 'var(--forest-glow)',
                                        }}>
                                            <SocialIcon icon={s.icon} size={15} />
                                        </div>
                                        <span style={{
                                            fontFamily: 'var(--font-sans)',
                                            fontSize: '0.875rem',
                                            color: 'var(--text-secondary)',
                                            fontWeight: 400,
                                        }}>
                                            {s.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}
