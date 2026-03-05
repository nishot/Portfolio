'use client';
import { useEffect, useRef } from 'react';
import content from '@/content.json';
import SocialIcon from '@/components/SocialIcons';

// Firefly / particle type
interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    radius: number;
    opacity: number;
    opacityTarget: number;
    opacitySpeed: number;
    color: string;
    life: number;
    maxLife: number;
}

export default function HeroSection() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animFrameRef = useRef<number>(0);

    // ── Canvas firefly system ──────────────────────────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const colors = [
            'rgba(61,186,114,',
            'rgba(93,232,154,',
            'rgba(168,230,184,',
            'rgba(201,168,76,',
        ];

        const spawnParticle = (): Particle => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4 - 0.1,
            radius: Math.random() * 2.5 + 0.8,
            opacity: 0,
            opacityTarget: Math.random() * 0.7 + 0.3,
            opacitySpeed: Math.random() * 0.008 + 0.003,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 0,
            maxLife: Math.random() * 400 + 200,
        });

        // Seed initial particles
        for (let i = 0; i < 120; i++) {
            const p = spawnParticle();
            p.life = Math.random() * p.maxLife;
            p.opacity = Math.random() * p.opacityTarget;
            particlesRef.current.push(p);
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const particles = particlesRef.current;

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.life++;
                p.x += p.vx;
                p.y += p.vy;

                // Fade in/out
                if (p.life < p.maxLife * 0.3) {
                    p.opacity = Math.min(p.opacityTarget, p.opacity + p.opacitySpeed);
                } else if (p.life > p.maxLife * 0.7) {
                    p.opacity = Math.max(0, p.opacity - p.opacitySpeed);
                }

                if (p.life >= p.maxLife) {
                    particles.splice(i, 1);
                    particles.push(spawnParticle());
                    continue;
                }

                // Draw glowing orb
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
                gradient.addColorStop(0, `${p.color}${p.opacity})`);
                gradient.addColorStop(0.4, `${p.color}${p.opacity * 0.5})`);
                gradient.addColorStop(1, `${p.color}0)`);
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Core bright dot
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `${p.color}${Math.min(1, p.opacity * 1.5)})`;
                ctx.fill();
            }

            animFrameRef.current = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animFrameRef.current);
        };
    }, []);

    // ── Parallax on mouse move ────────────────────────────────────────────────
    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;
        const onMove = (e: MouseEvent) => {
            const rx = (e.clientX / window.innerWidth - 0.5) * 12;
            const ry = (e.clientY / window.innerHeight - 0.5) * 8;
            const bg = hero.querySelector('.hero-bg') as HTMLElement;
            if (bg) bg.style.transform = `translate(${rx}px, ${ry}px) scale(1.04)`;
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    // ── Animated number counter ───────────────────────────────────────────────
    useEffect(() => {
        const targets = document.querySelectorAll('[data-count-to]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target as HTMLElement;
                const target = parseInt(el.dataset.countTo || '0');
                let current = 0;
                const duration = 2000;
                const startTime = performance.now();
                const tick = (now: number) => {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    current = Math.round(target * eased);
                    el.textContent = current.toString();
                    if (progress < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
                observer.unobserve(el);
            });
        });
        targets.forEach(t => observer.observe(t));
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="hero"
            ref={heroRef}
            style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', minHeight: '600px' }}
        >
            {/* Background forest image with parallax */}
            <div
                className="hero-bg"
                style={{
                    position: 'absolute', inset: '-5% -3%',
                    backgroundImage: 'url(/hero-forest.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 30%',
                    transition: 'transform 0.1s linear',
                    zIndex: 0,
                }}
            />

            {/* Dark vignette overlay */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: 'radial-gradient(ellipse at center, rgba(5,10,7,0.1) 0%, rgba(5,10,7,0.5) 60%, rgba(5,10,7,0.85) 100%)',
            }} />

            {/* Bottom fog gradient */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', zIndex: 1,
                background: 'linear-gradient(to top, rgba(5,10,7,1) 0%, rgba(5,10,7,0.6) 50%, transparent 100%)',
            }} />

            {/* Top gradient for nav */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '30%', zIndex: 1,
                background: 'linear-gradient(to bottom, rgba(5,10,7,0.6) 0%, transparent 100%)',
            }} />

            {/* Fireflies Canvas */}
            <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }} />

            {/* Hero Content */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 3,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '0 20px', textAlign: 'center',
            }}>
                {/* Eyebrow label */}
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                    padding: '6px 18px',
                    background: 'rgba(61,186,114,0.1)',
                    border: '1px solid rgba(61,186,114,0.25)',
                    borderRadius: '50px',
                    marginBottom: '24px',
                }}>
                    <span style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        background: 'var(--forest-glow)',
                        boxShadow: '0 0 8px var(--forest-glow)',
                        animation: 'pulse-glow 2s ease-in-out infinite',
                        display: 'inline-block',
                    }} />
                    <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.15em',
                        color: 'var(--forest-bright)',
                        fontWeight: 500,
                    }}>
                        AVAILABLE FOR OPPORTUNITIES
                    </span>
                </div>

                {/* Main name */}
                <h1 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(3rem, 8vw, 7rem)',
                    fontWeight: 300,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.0,
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                    textShadow: '0 0 80px rgba(61,186,114,0.2)',
                }}>
                    {content.personal.name}
                </h1>

                {/* Title */}
                <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
                    fontWeight: 400,
                    letterSpacing: '0.2em',
                    color: 'var(--gold)',
                    textTransform: 'uppercase',
                    marginBottom: '20px',
                    textShadow: '0 0 20px rgba(201,168,76,0.4)',
                }}>
                    {content.personal.title}
                </p>

                {/* Tagline */}
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.9rem, 1.8vw, 1.15rem)',
                    fontWeight: 300,
                    color: 'var(--text-secondary)',
                    maxWidth: '560px',
                    lineHeight: 1.7,
                    marginBottom: '40px',
                }}>
                    {content.personal.tagline}
                </p>

                {/* CTA buttons */}
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <a href="#projects" style={{ textDecoration: 'none' }}>
                        <button style={{
                            padding: '14px 36px',
                            background: 'linear-gradient(135deg, #3dba72, #2d7a4f)',
                            border: 'none',
                            borderRadius: '50px',
                            color: '#050a07',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            cursor: 'pointer',
                            boxShadow: '0 0 30px rgba(61,186,114,0.4)',
                            transition: 'all 0.3s ease',
                        }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 50px rgba(61,186,114,0.6)';
                                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 30px rgba(61,186,114,0.4)';
                                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                            }}
                        >
                            View My Work
                        </button>
                    </a>
                    <a href="#about" style={{ textDecoration: 'none' }}>
                        <button style={{
                            padding: '14px 36px',
                            background: 'transparent',
                            border: '1px solid rgba(61,186,114,0.35)',
                            borderRadius: '50px',
                            color: 'var(--forest-bright)',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            letterSpacing: '0.05em',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backdropFilter: 'blur(10px)',
                        }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(61,186,114,0.1)';
                                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(61,186,114,0.6)';
                                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(61,186,114,0.35)';
                                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                            }}
                        >
                            About Me
                        </button>
                    </a>
                </div>
            </div>

            {/* ── Bottom-left stats ── */}
            <div className="hero-stats" style={{
                position: 'absolute', bottom: '40px', left: '40px', zIndex: 4,
                display: 'flex', gap: '40px',
            }}>
                {content.stats.map((stat) => (
                    <div key={stat.label}>
                        <div style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            lineHeight: 1,
                            display: 'flex', alignItems: 'baseline', gap: '2px',
                        }}>
                            <span data-count-to={stat.value}>0</span>
                            <span style={{ color: 'var(--forest-glow)' }}>{stat.suffix}</span>
                        </div>
                        <div style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.08em',
                            marginTop: '4px',
                        }}>
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Bottom-right social icons ── */}
            <div className="hero-socials" style={{
                position: 'absolute', bottom: '40px', right: '40px', zIndex: 4,
                display: 'flex', gap: '12px',
            }}>
                {content.socials.slice(0, 3).map((s) => (
                    <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={s.name}
                        style={{
                            width: '40px', height: '40px',
                            borderRadius: '50%',
                            background: 'rgba(61,186,114,0.1)',
                            border: '1px solid rgba(61,186,114,0.2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'var(--forest-bright)',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            backdropFilter: 'blur(10px)',
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(61,186,114,0.25)';
                            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 16px rgba(61,186,114,0.4)';
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(61,186,114,0.1)';
                            (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                        }}
                    >
                        <SocialIcon icon={s.icon} size={16} />
                    </a>
                ))}
            </div>

            {/* Scroll indicator */}
            <div style={{
                position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 4,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                animation: 'float-slow 3s ease-in-out infinite',
            }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>
                    SCROLL
                </span>
                <div style={{
                    width: '1px', height: '40px',
                    background: 'linear-gradient(to bottom, var(--forest-glow), transparent)',
                }} />
            </div>
        </section>
    );
}
