import { useState, useEffect } from 'react';
import Reveal from './Reveal';

const backgroundImages = [
    '/hero.png',
    '/service_finance.png',
    '/service_hr.png',
    '/service_training.png',
    '/service_coaching.png',
    '/service_audit.png',
    '/service_management.png'
];

export default function Hero() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full h-screen min-h-[800px] flex items-center bg-[#0f172a] text-white overflow-hidden">
            {/* Dynamic Background with Gradient Mesh */}
            <div className="absolute inset-0 z-0">
                {backgroundImages.map((img, index) => (
                    <div
                        key={img}
                        className={`absolute inset-0 bg-cover bg-center mix-blend-overlay transition-opacity duration-1000 ease-in-out ${
                            index === currentImageIndex ? 'opacity-30' : 'opacity-0'
                        }`}
                        style={{ backgroundImage: `url('${img}')` }}
                    ></div>
                ))}
                {/* Refined gradient blobs */}
                <div className="absolute top-[-10%] right-[-5%] w-[900px] h-[900px] bg-[#1044A9] rounded-full filter blur-[140px] opacity-15 animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#2962ff] rounded-full filter blur-[120px] opacity-15"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>
            </div>


            {/* Main Content */}
            <div className="container relative z-10 h-full flex flex-col justify-center px-6">

                <div className="max-w-4xl mt-[-80px]">
                    <Reveal>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[0.9] text-white mb-8 tracking-tight">
                            Booster <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                                Votre Performance
                            </span> <br />
                            Opérationnelle.
                        </h1>
                    </Reveal>

                    <Reveal delay="delay-100">
                        <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mb-12 border-l-2 border-blue-500/50 pl-8">
                            Un accompagnement à 360° pour les entreprises ambitieuses.
                            <br />
                            <span className="text-white/60 text-lg mt-2 block">Coaching • RH • Formation • Paie • Audit</span>
                        </p>
                    </Reveal>


                </div>

            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white via-white/50 to-transparent"></div>
            </div>

        </section>
    );
}
