'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const spiritRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const spirit = spiritRef.current;
        if (!spirit) return;

        // Optimized GSAP setters
        const xTo = gsap.quickTo(spirit, "x", { duration: 0.25, ease: "power2.out", force3D: true });
        const yTo = gsap.quickTo(spirit, "y", { duration: 0.25, ease: "power2.out", force3D: true });

        const onMouseMove = (e: MouseEvent) => {
            xTo(e.clientX - 6);
            yTo(e.clientY - 6);
        };

        const onMouseDown = () => spirit.classList.add('clicking');
        const onMouseUp = () => spirit.classList.remove('clicking');

        const onMouseEnterLink = () => spirit.classList.add('hovering');
        const onMouseLeaveLink = () => spirit.classList.remove('hovering');

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        // Add hover listeners to interactive elements
        const updateListeners = () => {
            const links = document.querySelectorAll('a, button, [data-cursor-hover]');
            links.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnterLink);
                el.removeEventListener('mouseleave', onMouseLeaveLink);
                el.addEventListener('mouseenter', onMouseEnterLink);
                el.addEventListener('mouseleave', onMouseLeaveLink);
            });
        };

        updateListeners();

        // Handle dynamic content changes with a debounced observer
        let timeoutId: NodeJS.Timeout;
        const observer = new MutationObserver(() => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(updateListeners, 500);
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={spiritRef}
            className="forest-spirit"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 9999
            }}
        />
    );
}

