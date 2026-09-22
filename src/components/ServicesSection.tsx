import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { services } from '../data/services';

export default function ServicesSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container px-6 relative z-10">
                <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-16 items-start">

                    {/* Left: intro (contenu EP2C) */}
                    <div className="lg:sticky lg:top-32">
                        <Reveal>
                            <div className="inline-flex items-center gap-3 mb-5">
                                <div className="w-8 h-[3px] bg-[#2962ff]" />
                                <span className="font-bold text-gray-900 tracking-wide text-sm">
                                    Services
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.15] mb-6">
                                Nous offrons les{' '}
                                <span className="text-[#2962ff]">meilleurs services.</span>
                            </h2>

                            <p className="text-gray-500 mb-10 text-base leading-relaxed max-w-md">
                                EP2C est un cabinet de conseil spécialisé qui accompagne votre entreprise dans son développement et sa structuration.
                            </p>

                            <Link
                                to="/services"
                                className="inline-flex items-center group overflow-hidden rounded-md shadow-sm hover:shadow-md transition-shadow"
                            >
                                <span className="bg-[#111] text-white px-6 py-3.5 text-sm font-semibold tracking-wide group-hover:bg-black transition-colors">
                                    Tous les services
                                </span>
                                <span className="bg-[#2962ff] text-white p-3.5 transition-colors group-hover:bg-[#1044A9]">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14m-7-7 7 7-7 7" />
                                    </svg>
                                </span>
                            </Link>
                        </Reveal>
                    </div>

                    {/* Right: cards style maquette 2 */}
                    <div className="grid sm:grid-cols-2 gap-5">
                        {services.map((service, index) => (
                            <Reveal key={service.id} delay={`delay-${(index % 4) * 100}`} className="h-full">
                                <Link to={`/services/${service.slug}`} className="block h-full group">
                                    <div className="relative h-full bg-[#F5F5F5] p-5 md:p-6 transition-all duration-300 group-hover:bg-[#EEEEEE]">
                                        {/* Barre jaune en haut à gauche */}
                                        <div className="absolute top-0 left-0 w-10 h-[3px] bg-[#2962ff]" />

                                        <div className="flex items-start gap-4 pt-2">
                                            <div className="shrink-0 w-14 h-14 bg-white flex items-center justify-center shadow-sm text-gray-900 group-hover:scale-105 transition-transform duration-300">
                                                <service.icon size={26} strokeWidth={1.6} />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1.5 leading-snug group-hover:text-black transition-colors">
                                                    {service.title}
                                                </h3>
                                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                                    {service.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
