import { Target, Rocket, Globe, MapPin, Sparkles } from 'lucide-react';
import Reveal from './Reveal';

export default function AboutSection() {
    return (
        <section className="py-28 relative overflow-hidden bg-slate-50">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-300/20 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3"></div>

            <div className="container relative z-10 grid lg:grid-cols-2 gap-20 items-center px-6">

                {/* Left Column: Visual */}
                <Reveal>
                    <div className="relative group">
                        {/* Animated Glow Behind */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700"></div>
                        
                        <div className="relative bg-white/90 backdrop-blur-xl border border-white rounded-[2.5rem] p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] transition-transform duration-700 group-hover:-translate-y-2">
                            
                            {/* Decorative element */}
                            <div className="absolute -top-5 -right-5 w-14 h-14 bg-gradient-to-br from-[#1044A9] to-indigo-500 rounded-full shadow-xl flex items-center justify-center animate-bounce">
                                <Sparkles size={24} className="text-white" />
                            </div>

                            <div className="flex flex-col gap-10">
                                <div className="flex items-baseline justify-center select-none py-6">
                                    <span className="text-[6rem] md:text-[7.5rem] font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-[#1044A9] to-blue-800 drop-shadow-sm transition-transform duration-300 hover:scale-105">e</span>
                                    <span className="text-[7.5rem] md:text-[9rem] font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-[#2962ff] to-blue-600 -ml-2 drop-shadow-md transition-transform duration-300 hover:scale-105">P</span>
                                    <span className="text-[6rem] md:text-[7.5rem] font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-gray-600 -ml-2 drop-shadow-sm transition-transform duration-300 hover:scale-105">2</span>
                                    <span className="text-[5rem] md:text-[6.5rem] font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-400 to-gray-300 transition-transform duration-300 hover:scale-105">c</span>
                                </div>
                                
                                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                                
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-5 bg-gradient-to-b from-gray-50 to-white rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 border border-gray-100 hover:border-blue-100 group/item">
                                        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover/item:scale-110 transition-transform duration-300 group-hover/item:bg-blue-100 shadow-sm">
                                            <Globe className="text-[#2962ff]" size={28} />
                                        </div>
                                        <span className="font-bold text-gray-900 text-base md:text-lg">International</span>
                                        <span className="text-xs md:text-sm text-gray-500 font-medium mt-1">Présence Globale</span>
                                    </div>
                                    <div className="p-5 bg-gradient-to-b from-gray-50 to-white rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 border border-gray-100 hover:border-blue-100 group/item">
                                        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover/item:scale-110 transition-transform duration-300 group-hover/item:bg-blue-100 shadow-sm">
                                            <MapPin className="text-[#2962ff]" size={28} />
                                        </div>
                                        <span className="font-bold text-gray-900 text-base md:text-lg">Proximité</span>
                                        <span className="text-xs md:text-sm text-gray-500 font-medium mt-1">Ancrage Local</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Right Column: Content */}
                <div className="space-y-10">

                    <Reveal delay="delay-100">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white text-[#1044A9] text-sm font-bold border border-blue-100 shadow-sm">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                            </span>
                            À propos de nous
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-[1.15] mt-6 tracking-tight">
                            Depuis 2020, EP2C 🌍 <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1044A9] to-indigo-600 pb-2 inline-block">
                                accompagne les entreprises.
                            </span>
                        </h2>
                    </Reveal>

                    <Reveal delay="delay-200">
                        <div className="relative">
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#2962ff] to-indigo-500 rounded-full"></div>
                            <p className="text-lg md:text-xl text-gray-600 leading-relaxed pl-8 py-2">
                                Basés en <strong className="text-gray-900 font-semibold">France 🇫🇷 et en Algérie 🇩🇿</strong>, et bientôt en Suisse 🇨🇭,
                                nous accompagnons des entreprises de toutes tailles avec une vision internationale
                                et des solutions locales.
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid sm:grid-cols-2 gap-6 pt-4">

                        {/* Mission Card */}
                        <Reveal delay="delay-300">
                            <div className="group p-8 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 transition-colors duration-500"></div>
                                <div className="relative z-10 w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100/50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-[#1044A9] group-hover:text-white transition-all duration-500 shadow-sm">
                                    <Target size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Notre mission 🎯</h3>
                                <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                                    Des solutions sur-mesure à fort impact pour votre développement structurel et stratégique.
                                </p>
                            </div>
                        </Reveal>

                        {/* Valeurs Card */}
                        <Reveal delay="delay-400">
                            <div className="group p-8 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-100 transition-colors duration-500"></div>
                                <div className="relative z-10 w-14 h-14 bg-gradient-to-br from-indigo-50 to-indigo-100/50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                    <Rocket size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Nos valeurs 💎</h3>
                                <ul className="text-sm text-gray-600 space-y-3 relative z-10 font-medium">
                                    <li className="flex items-center gap-3"><span className="text-lg">🌟</span> Excellence</li>
                                    <li className="flex items-center gap-3"><span className="text-lg">🤝</span> Proximité</li>
                                    <li className="flex items-center gap-3"><span className="text-lg">🔥</span> Engagement</li>
                                </ul>
                            </div>
                        </Reveal>

                    </div>

                </div>
            </div>
        </section>
    );
}
