import { Target, Rocket, Globe, MapPin } from 'lucide-react';
import Reveal from './Reveal';

export default function AboutSection() {
    return (
        <section className="py-24 relative overflow-hidden bg-white">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

            <div className="container relative z-10 grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Column: Visual */}
                <Reveal>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-20 blur-lg transform -rotate-2"></div>
                        <div className="relative bg-white border border-gray-100 rounded-2xl p-8 shadow-2xl">
                            <div className="flex flex-col gap-6">
                                <div className="flex items-baseline justify-center">
                                    <span className="text-8xl font-serif font-bold text-[#1044A9]">e</span>
                                    <span className="text-9xl font-serif font-bold text-[#2962ff] -ml-2">P</span>
                                    <span className="text-8xl font-serif font-bold text-gray-800 -ml-2">2</span>
                                    <span className="text-6xl font-serif font-bold text-gray-400">c</span>
                                </div>
                                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-xl flex flex-col items-center text-center">
                                        <Globe className="text-blue-600 mb-2" size={24} />
                                        <span className="font-bold text-gray-900">International</span>
                                        <span className="text-xs text-gray-500">Présence Globale</span>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl flex flex-col items-center text-center">
                                        <MapPin className="text-blue-600 mb-2" size={24} />
                                        <span className="font-bold text-gray-900">Proximité</span>
                                        <span className="text-xs text-gray-500">Ancrage Local</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Right Column: Content */}
                <div className="space-y-8">

                    <Reveal delay="delay-100">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold border border-blue-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                            À propos de nous
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mt-4">
                            Depuis 2020, EP2C 🌍 <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1044A9] to-[#2962ff]">
                                accompagne les entreprises.
                            </span>
                        </h2>
                    </Reveal>

                    <Reveal delay="delay-200">
                        <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-blue-500 pl-6 italic bg-blue-50/50 p-4 rounded-r-lg">
                            Basés en <strong>France 🇫🇷, en Algérie 🇩🇿 et à Monaco 🇲🇨</strong>, et bientôt en Suisse 🇨🇭,
                            nous accompagnons des entreprises de toutes tailles avec une vision internationale
                            et des solutions locales.
                        </p>
                    </Reveal>

                    <div className="grid md:grid-cols-2 gap-6 pt-4">

                        {/* Mission Card */}
                        <Reveal delay="delay-300">
                            <div className="group p-6 bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Target size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Notre mission 🎯</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Des solutions sur-mesure à fort impact pour votre développement structurel et stratégique.
                                </p>
                            </div>
                        </Reveal>

                        {/* Valeurs Card */}
                        <Reveal delay="delay-400">
                            <div className="group p-6 bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <Rocket size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Nos valeurs 💎</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>🌟 Excellence</li>
                                    <li>🤝 Proximité</li>
                                    <li>🔥 Engagement</li>
                                </ul>
                            </div>
                        </Reveal>

                    </div>

                </div>
            </div>
        </section>
    );
}
