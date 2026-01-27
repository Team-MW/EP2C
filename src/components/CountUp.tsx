import { useEffect, useState, useRef } from 'react';

interface CountUpProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
}

export default function CountUp({ end, duration = 2000, suffix = "", prefix = "" }: CountUpProps) {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLSpanElement>(null);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.5 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => {
            if (countRef.current) observer.unobserve(countRef.current);
        };
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime: number | null = null;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;

            // Easing function (easeOutExpo)
            const currentCount = Math.min(
                Math.floor((end * progress) / duration),
                end
            );

            setCount(currentCount);

            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                setCount(end); // Ensure final value is exact
            }
        };

        requestAnimationFrame(animate);
    }, [hasStarted, end, duration]);

    return (
        <span ref={countRef}>
            {prefix}{count}{suffix}
        </span>
    );
}
