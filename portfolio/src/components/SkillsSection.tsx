'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import content from '@/content.json';

// Map devicon slug → exact CDN filename variant
const DEVICON_MAP: Record<string, string> = {
    python: 'python/python-original.svg',
    cplusplus: 'cplusplus/cplusplus-original.svg',
    html5: 'html5/html5-original.svg',
    css3: 'css3/css3-original.svg',
    typescript: 'typescript/typescript-original.svg',
    fastapi: 'fastapi/fastapi-original.svg',
    postgresql: 'postgresql/postgresql-original.svg',
    mongodb: 'mongodb/mongodb-original.svg',
    react: 'react/react-original.svg',
    git: 'git/git-original.svg',
    postman: 'postman/postman-plain.svg',
    docker: 'docker/docker-original.svg',
    linux: 'linux/linux-original.svg',
    tensorflow: 'tensorflow/tensorflow-original.svg',
    scikitlearn: 'scikitlearn/scikitlearn-original.svg',
    pandas: 'pandas/pandas-original.svg',
    numpy: 'numpy/numpy-original.svg',
};

// Category accent colors
const CATEGORY_COLORS: Record<string, { border: string; glow: string; label: string }> = {
    Languages: { border: 'rgba(93,232,154,0.25)', glow: 'rgba(93,232,154,0.08)', label: '#5de89a' },
    Frameworks: { border: 'rgba(61,186,114,0.25)', glow: 'rgba(61,186,114,0.08)', label: '#3dba72' },
    Frontend: { border: 'rgba(127,200,255,0.25)', glow: 'rgba(127,200,255,0.08)', label: '#7fc8ff' },
    Databases: { border: 'rgba(201,168,76,0.3)', glow: 'rgba(201,168,76,0.08)', label: '#c9a84c' },
    Tools: { border: 'rgba(168,184,200,0.2)', glow: 'rgba(168,184,200,0.05)', label: '#a8b8c8' },
    'AI/ML': { border: 'rgba(200,130,200,0.25)', glow: 'rgba(200,130,200,0.07)', label: '#c882c8' },
};

interface Skill {
    name: string;
    devicon: string;
    category: string;
}

export default function SkillsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.reveal-up').forEach((el, i) => {
                            setTimeout(() => el.classList.add('visible'), i * 55);
                        });
                    }
                });
            },
            { threshold: 0.08 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const skills = content.skills as Skill[];
    const categories = [...new Set(skills.map(s => s.category))];

    return (
        <section
            id="skills"
            ref={sectionRef}
            style={{
                position: 'relative',
                background: 'linear-gradient(180deg, var(--forest-black) 0%, #060c09 100%)',
                padding: '120px 40px',
                overflow: 'hidden',
            }}
        >
            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '30%', left: '-8%',
                width: '420px', height: '420px',
                background: 'radial-gradient(ellipse, rgba(61,186,114,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', bottom: '10%', right: '-5%',
                width: '300px', height: '300px',
                background: 'radial-gradient(ellipse, rgba(200,130,200,0.04) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

                <div className="reveal-up" style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.2em',
                        color: 'var(--forest-glow)',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '8px',
                    }}>
                        ◆ &nbsp; Expertise
                    </span>
                    <h2 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                        fontWeight: 300,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.01em',
                    }}>
                        Skills &amp; <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Technologies</em>
                    </h2>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.95rem',
                        color: 'var(--text-muted)',
                        marginTop: '12px',
                    }}>
                        Tools and technologies I work with
                    </p>
                </div>

                {/* Category groups */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                    {categories.map((category) => {
                        const colors = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.Tools;
                        const catSkills = skills.filter(s => s.category === category);

                        return (
                            <div key={category} className="reveal-up">
                                {/* Category label */}
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '16px',
                                    marginBottom: '24px',
                                }}>
                                    <div style={{ flex: 1, height: '1px', background: `${colors.border}`, opacity: 0.3 }} />
                                    <span style={{
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '0.65rem',
                                        letterSpacing: '0.22em',
                                        color: colors.label,
                                        textTransform: 'uppercase',
                                        fontWeight: 600,
                                        padding: '0 8px'
                                    }}>
                                        {category}
                                    </span>
                                    <div style={{ flex: 1, height: '1px', background: `${colors.border}`, opacity: 0.3 }} />
                                </div>

                                {/* Skill card grid */}
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '14px',
                                    justifyContent: 'center',
                                }}>
                                    {catSkills.map((skill, i) => (
                                        <SkillCard
                                            key={skill.name}
                                            skill={skill}
                                            index={i}
                                            colors={colors}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function SkillCard({
    skill,
    index,
    colors,
}: {
    skill: Skill;
    index: number;
    colors: { border: string; glow: string; label: string };
}) {
    const iconUrl = DEVICON_MAP[skill.devicon]
        ? `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${DEVICON_MAP[skill.devicon]}`
        : null;

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                background: `${colors.glow}`,
                border: `1px solid ${colors.border}`,
                borderRadius: '12px',
                cursor: 'default',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                animation: `float ${3 + (index % 3) * 0.8}s ease-in-out infinite`,
                animationDelay: `${index * 0.25}s`,
                animationPlayState: 'paused',
                userSelect: 'none',
            }}
            onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.animationPlayState = 'running';
                el.style.borderColor = colors.label;
                el.style.boxShadow = `0 0 20px ${colors.glow.replace('0.08', '0.3')}, 0 8px 32px rgba(0,0,0,0.3)`;
                el.style.transform = 'translateY(-4px)';
                el.style.background = `${colors.glow.replace('0.08', '0.15')}`;
            }}
            onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.animationPlayState = 'paused';
                el.style.borderColor = colors.border;
                el.style.boxShadow = 'none';
                el.style.transform = 'translateY(0)';
                el.style.background = `${colors.glow}`;
            }}
        >
            {/* Logo */}
            <div style={{
                width: '36px',
                height: '36px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)',
                padding: '4px',
            }}>
                {iconUrl ? (
                    <Image
                        src={iconUrl}
                        alt={skill.name}
                        width={28}
                        height={28}
                        style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.1))' }}
                        unoptimized
                    />
                ) : (
                    <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: colors.label,
                    }}>
                        {skill.name.slice(0, 2).toUpperCase()}
                    </span>
                )}
            </div>

            {/* Name */}
            <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
            }}>
                {skill.name}
            </span>
        </div>
    );
}
