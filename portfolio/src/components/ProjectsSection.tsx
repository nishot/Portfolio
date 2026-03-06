'use client';
import { useEffect, useRef } from 'react';
import content from '@/content.json';

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.reveal-up').forEach((el, i) => {
                            setTimeout(() => el.classList.add('visible'), i * 80);
                        });
                    }
                });
            },
            { threshold: 0.05 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="projects"
            ref={sectionRef}
            style={{
                position: 'relative',
                background: 'linear-gradient(180deg, #080f0b 0%, var(--forest-black) 100%)',
                padding: '120px 40px',
                overflow: 'hidden',
            }}
        >
            {/* Background ambient glow */}
            <div style={{
                position: 'absolute', top: '30%', right: '-10%',
                width: '500px', height: '500px',
                background: 'radial-gradient(ellipse, rgba(61,186,114,0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Section header */}
                <div className="reveal-up" style={{ marginBottom: '70px' }}>
                    <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.7rem',
                        letterSpacing: '0.25em',
                        color: 'var(--forest-glow)',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '12px',
                    }}>
                        ◆ &nbsp; Selected Work
                    </span>
                    <h2 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                        fontWeight: 300,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.01em',
                    }}>
                        Projects &amp; <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Experiments</em>
                    </h2>
                </div>

                {/* Projects grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px',
                }}>
                    {content.projects.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface Project {
    title: string;
    description: string;
    tech: string[];
    githubUrl: string;
    demoUrl: string;
    featured: boolean;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <div
            className="reveal-up"
            style={{
                transitionDelay: `${index * 0.06}s`,
                position: 'relative',
                background: 'rgba(8, 25, 14, 0.55)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(61, 186, 114, 0.12)',
                borderRadius: '16px',
                padding: '40px 20px 32px',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
            onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(61, 186, 114, 0.35)';
                el.style.boxShadow = '0 0 40px rgba(61, 186, 114, 0.12), 0 20px 60px rgba(0,0,0,0.4)';
                el.style.transform = 'translateY(-6px)';
                el.style.background = 'rgba(15, 35, 22, 0.75)';
            }}
            onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(61, 186, 114, 0.12)';
                el.style.boxShadow = 'none';
                el.style.transform = 'translateY(0)';
                el.style.background = 'rgba(8, 25, 14, 0.55)';
            }}
        >
            {/* Featured badge */}
            {project.featured && (
                <div style={{
                    position: 'absolute', top: '20px', right: '20px',
                    padding: '4px 12px',
                    background: 'rgba(201,168,76,0.12)',
                    border: '1px solid rgba(201,168,76,0.3)',
                    borderRadius: '50px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    color: 'var(--gold)',
                    textTransform: 'uppercase',
                }}>
                    Featured
                </div>
            )}

            {/* Project number */}
            <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '3.5rem',
                fontWeight: 300,
                color: 'rgba(61,186,114,0.18)',
                lineHeight: 1,
                marginBottom: '20px',
                userSelect: 'none',
                letterSpacing: '-0.05em'
            }}>
                {String(index + 1).padStart(2, '0')}
            </div>

            {/* Title */}
            <h3 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '12px',
                letterSpacing: '-0.01em',
            }}>
                {project.title}
            </h3>

            {/* Description */}
            <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: '24px',
            }}>
                {project.description}
            </p>

            {/* Tech stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px', justifyContent: 'center' }}>
                {project.tech.map((t) => (
                    <span key={t} style={{
                        padding: '4px 12px',
                        background: 'rgba(61,186,114,0.08)',
                        border: '1px solid rgba(61,186,114,0.15)',
                        borderRadius: '50px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.72rem',
                        color: 'var(--forest-bright)',
                        letterSpacing: '0.04em',
                    }}>
                        {t}
                    </span>
                ))}
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: 'auto' }}>
                <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        color: 'var(--forest-glow)',
                        textDecoration: 'none',
                        display: 'flex', alignItems: 'center', gap: '6px',
                        letterSpacing: '0.05em',
                        transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--forest-bright)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--forest-glow)')}
                >
                    ↗ GitHub
                </a>
                {project.demoUrl && (
                    <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.8rem',
                            color: 'var(--text-muted)',
                            textDecoration: 'none',
                            display: 'flex', alignItems: 'center', gap: '6px',
                            letterSpacing: '0.05em',
                            transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                        ↗ Live Demo
                    </a>
                )}
            </div>

            {/* Hover glow line bottom */}
            <div style={{
                position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--forest-glow), transparent)',
                opacity: 0,
                transition: 'opacity 0.4s ease',
            }} className="card-glow-line" />
        </div>
    );
}
