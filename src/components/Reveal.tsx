import { useEffect, useRef, useState } from 'react';

interface RevealProps {
    children: React.ReactNode;
    threshold?: number;
    className?: string;
    delay?: string; // e.g., "delay-100"
}

export default function Reveal({ children, threshold = 0.1, className = "", delay = "" }: RevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Only trigger once
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: threshold
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    return (
        <div
            ref={ref}
            className={`reveal-hidden ${isVisible ? 'reveal-visible' : ''} ${delay} ${className}`}
        >
            {children}
        </div>
    );
}
