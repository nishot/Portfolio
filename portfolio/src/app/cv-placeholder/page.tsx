'use client';
import Link from 'next/link';

export default function CVPlaceholder() {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--forest-black)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            padding: '20px',
            textAlign: 'center'
        }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', marginBottom: '20px', color: 'var(--gold)' }}>
                CV Coming Soon
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', marginBottom: '40px', lineHeight: '1.6' }}>
                I am currently updating my resume to reflect my latest projects and skills. Please check back later!
            </p>
            <Link href="/" style={{
                padding: '12px 30px',
                background: 'rgba(61, 186, 114, 0.1)',
                border: '1px solid rgba(61, 186, 114, 0.3)',
                borderRadius: '50px',
                color: 'var(--forest-bright)',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.3s ease'
            }}
                onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(61, 186, 114, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(61, 186, 114, 0.5)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(61, 186, 114, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(61, 186, 114, 0.3)';
                }}>
                Back to Portfolio
            </Link>
        </div>
    );
}
