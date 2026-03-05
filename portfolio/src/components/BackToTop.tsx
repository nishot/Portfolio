'use client';
import { useState, useEffect } from 'react';

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisible = () => setVisible(window.scrollY > 500);
        window.addEventListener('scroll', toggleVisible);
        return () => window.removeEventListener('scroll', toggleVisible);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            style={{
                position: 'fixed',
                bottom: '40px',
                right: '40px',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(61, 186, 114, 0.15)',
                border: '1px solid rgba(61, 186, 114, 0.3)',
                color: 'var(--forest-bright)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 90,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 20px rgba(61, 186, 114, 0.1)',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(61, 186, 114, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(61, 186, 114, 0.5)';
                e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(61, 186, 114, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(61, 186, 114, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
            title="Back to Top"
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 15l-6-6-6 6" />
            </svg>
        </button>
    );
}
