import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

const CALENDLY_URL = 'https://calendly.com/ep2c/30min';
const SCRIPT_ID = 'calendly-widget-js';

declare global {
    interface Window {
        Calendly?: {
            initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
        };
    }
}

export default function CalendlySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        let observer: MutationObserver | null = null;
        let fallbackTimer: number | undefined;

        const markReady = () => {
            if (!cancelled) setIsLoading(false);
        };

        const watchIframe = (root: HTMLElement) => {
            const existing = root.querySelector('iframe');
            if (existing) {
                if ((existing as HTMLIFrameElement).contentWindow) {
                    // iframe already there — wait for load or short delay
                    existing.addEventListener('load', markReady, { once: true });
                }
                // Calendly sometimes won't fire load reliably → small delay after presence
                window.setTimeout(markReady, 1200);
                return;
            }

            observer = new MutationObserver(() => {
                const iframe = root.querySelector('iframe');
                if (iframe) {
                    iframe.addEventListener('load', markReady, { once: true });
                    window.setTimeout(markReady, 1200);
                    observer?.disconnect();
                }
            });
            observer.observe(root, { childList: true, subtree: true });
        };

        const initWidget = () => {
            const el = containerRef.current;
            if (!el || cancelled) return;

            el.innerHTML = '';

            if (window.Calendly?.initInlineWidget) {
                window.Calendly.initInlineWidget({
                    url: CALENDLY_URL,
                    parentElement: el,
                });
            } else {
                // Fallback: class-based embed
                el.className = 'calendly-inline-widget w-full';
                el.setAttribute('data-url', CALENDLY_URL);
                el.style.minWidth = '320px';
                el.style.height = '700px';
            }

            watchIframe(el);
        };

        const loadScript = () => {
            const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
            if (existing) {
                // Script already there — wait a tick for Calendly global
                window.setTimeout(initWidget, 100);
                return;
            }

            const script = document.createElement('script');
            script.id = SCRIPT_ID;
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            script.async = true;
            script.onload = () => initWidget();
            script.onerror = () => markReady();
            document.body.appendChild(script);
        };

        loadScript();

        // Never leave the loader forever
        fallbackTimer = window.setTimeout(markReady, 10000);

        return () => {
            cancelled = true;
            observer?.disconnect();
            if (fallbackTimer) window.clearTimeout(fallbackTimer);
        };
    }, []);

    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

            <div className="container px-6 mx-auto relative z-10">
                <Reveal>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-6 tracking-tight">
                            Prenez rendez-vous avec un{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1044A9] to-[#2962ff]">
                                expert EP2C
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Choisissez le créneau qui vous convient le mieux pour échanger sur vos besoins en RH, Paie, Formation ou Coaching.
                        </p>
                    </div>
                </Reveal>

                {/* Pas de Reveal autour du widget : sinon opacity 0 cache le loader */}
                <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-4 md:p-8 max-w-5xl mx-auto border border-gray-100 relative min-h-[700px]">
                    {isLoading && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 rounded-3xl backdrop-blur-[1px]">
                            <div className="w-12 h-12 border-4 border-blue-100 border-t-[#2962ff] rounded-full animate-spin mb-4" />
                            <p className="text-gray-600 font-medium text-sm">Chargement de l&apos;agenda…</p>
                            <p className="text-gray-400 text-xs mt-2">Calendly se charge, merci de patienter</p>
                        </div>
                    )}

                    <div
                        ref={containerRef}
                        className="calendly-inline-widget w-full"
                        style={{ minWidth: '320px', height: '700px' }}
                        aria-busy={isLoading}
                    />
                </div>
            </div>
        </section>
    );
}
