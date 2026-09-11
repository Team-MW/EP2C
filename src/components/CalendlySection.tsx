import { useEffect } from 'react';
import Reveal from './Reveal';

export default function CalendlySection() {
    useEffect(() => {
        const scriptId = 'calendly-script-home';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://assets.calendly.com/assets/external/widget.js";
            script.type = "text/javascript";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="container px-6 mx-auto relative z-10">
                <Reveal>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-6 tracking-tight">
                            Prenez rendez-vous avec un <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1044A9] to-[#2962ff]">expert EP2C</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Choisissez le créneau qui vous convient le mieux pour échanger sur vos besoins en RH, Paie, Formation ou Coaching.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay="delay-100">
                    <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-4 md:p-8 max-w-5xl mx-auto border border-gray-100">
                        {/* Calendly inline widget begin */}
                        <div 
                            className="calendly-inline-widget w-full" 
                            data-url="https://calendly.com/ep2c/30min" 
                            style={{ minWidth: '320px', height: '700px' }}
                        ></div>
                        {/* Calendly inline widget end */}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
