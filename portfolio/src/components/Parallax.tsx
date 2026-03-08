'use client';
import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxProps {
    children?: ReactNode;
    speed?: number;
    className?: string;
    style?: React.CSSProperties;
}

export default function Parallax({ children, speed = 1, className, style }: ParallaxProps) {
    const triggerRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!triggerRef.current || !targetRef.current) return;

        // Multiply speed to dictact how many pixels to drift up/down
        const yMove = speed * 80;

        const animation = gsap.fromTo(
            targetRef.current,
            { y: -yMove },
            {
                y: yMove,
                ease: 'none',
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5, // Smooth scrubbing
                },
            }
        );

        return () => {
            animation.kill();
        };
    }, [speed]);

    return (
        <div ref={triggerRef} className={className} style={{ ...style, position: style?.position || 'relative' }}>
            <div ref={targetRef} style={{ width: '100%', height: '100%', willChange: 'transform' }}>
                {children}
            </div>
        </div>
    );
}
