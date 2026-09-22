import { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from './Reveal';

const testimonials = [
    {
        quote: "Un accompagnement de A à Z, très professionnel et humain à la fois. Grâce à EP2C, nous avons complètement réorganisé notre service RH avec des résultats visibles en moins de 6 mois. C'est le meilleur choix que nous ayons fait.",
        name: 'Christian B.',
        role: 'Directeur Général, PME Industrielle',
        image: 'https://i.pravatar.cc/150?img=12',
    },
    {
        quote: "EP2C a su comprendre nos enjeux et nous proposer une organisation paie fiable. Nos équipes gagnent du temps, et nous avons enfin une vraie sérénité sur la conformité sociale.",
        name: 'Sophie M.',
        role: 'DRH, Groupe Services',
        image: 'https://i.pravatar.cc/150?img=47',
    },
    {
        quote: "Un coaching de direction exigeant et bienveillant. Les résultats se mesurent concrètement dans le management et la dynamique d’équipe.",
        name: 'Laurent D.',
        role: 'CEO, Startup Tech',
        image: 'https://i.pravatar.cc/150?img=11',
    },
];

export default function TestimonialsSection() {
    const [index, setIndex] = useState(0);
    const current = testimonials[index];

    const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
    const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

    return (
        <section className="relative overflow-hidden">
            <div className="grid lg:grid-cols-[0.9fr_1.4fr] min-h-[560px]">

                {/* Left photo */}
                <div className="relative min-h-[320px] lg:min-h-full">
                    <img
                        src="/hero.png"
                        alt="Équipe EP2C et clients"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1044A9]/50 via-transparent to-transparent" />
                </div>

                {/* Right dark panel */}
                <div className="relative flex flex-col justify-between text-white">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/background_sections.png')" }}
                    />
                    <div className="absolute inset-0 bg-[#0b1220]/88" />

                    <div className="relative z-10 px-8 md:px-12 lg:px-16 pt-12 md:pt-16 pb-10 flex-1 flex flex-col">
                        <Reveal>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-[#7EB6FF] text-xs font-bold tracking-[0.25em] uppercase">
                                    Témoignages
                                </span>
                                <div className="h-px flex-1 max-w-[120px] bg-[#7EB6FF]/70" />
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight mb-10 max-w-xl">
                                Quelques retours de{' '}
                                <span className="text-white">nos fidèles clients</span>
                            </h2>
                        </Reveal>

                        <Reveal delay="delay-100" className="flex-1">
                            <div className="flex gap-4 md:gap-6 items-start max-w-2xl">
                                <Quote
                                    className="shrink-0 text-white/90 mt-1"
                                    size={42}
                                    strokeWidth={1.5}
                                />
                                <div>
                                    <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8">
                                        {current.quote}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={current.image}
                                            alt={current.name}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                                        />
                                        <div>
                                            <p className="text-[#7EB6FF] font-bold text-lg leading-tight">
                                                {current.name}
                                            </p>
                                            <p className="text-white/70 text-sm">{current.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Bottom nav bar */}
                    <div className="relative z-10 bg-white px-8 md:px-12 py-4 flex items-center justify-between">
                        <p className="text-xs text-gray-400 font-medium tracking-wide">
                            {index + 1} / {testimonials.length}
                        </p>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={prev}
                                aria-label="Témoignage précédent"
                                className="w-11 h-11 rounded-full border border-[#2962ff]/40 text-[#1044A9] flex items-center justify-center hover:bg-[#1044A9] hover:text-white hover:border-[#1044A9] transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                type="button"
                                onClick={next}
                                aria-label="Témoignage suivant"
                                className="w-11 h-11 rounded-full border border-[#2962ff]/40 text-[#1044A9] flex items-center justify-center hover:bg-[#1044A9] hover:text-white hover:border-[#1044A9] transition-colors"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
