import { useState } from 'react';
import { Flag, Eye, Lightbulb, Play } from 'lucide-react';
import Reveal from './Reveal';

const tabs = [
    {
        id: 'mission',
        title: 'Notre Mission',
        icon: Flag,
        content: "Nous nous engageons à fournir des solutions sur-mesure à fort impact pour votre développement structurel et stratégique. Plus de 20 ans d'expérience à bâtir des relations de confiance."
    },
    {
        id: 'vision',
        title: 'Notre Vision',
        icon: Eye,
        content: "Devenir le partenaire incontournable des entreprises ambitieuses, en anticipant les évolutions du marché pour vous offrir une longueur d'avance sur vos concurrents."
    },
    {
        id: 'philosophy',
        title: 'Notre Philosophie',
        icon: Lightbulb,
        content: "L'excellence, la proximité et l'engagement sont au cœur de notre ADN. Nous croyons en une approche humaine et personnalisée pour chaque défi d'entreprise."
    }
];

const skills = [
    { name: 'Conseil RH & Stratégie', value: 90 },
    { name: 'Gestion de la Paie', value: 95 },
    { name: 'Audit & Formation', value: 85 }
];

export default function VisionSection() {
    const [activeTab, setActiveTab] = useState('mission');

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    {/* Left Column: Tabs & Skills */}
                    <div>
                        <Reveal>
                            <div className="flex flex-col gap-4 mb-16 relative z-10">
                                {tabs.map((tab) => {
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center gap-6 p-3 pr-6 rounded-full w-full max-w-xs md:max-w-sm transition-all duration-300 ${
                                                isActive 
                                                    ? 'bg-gray-900 text-white shadow-xl scale-105 ml-2 md:ml-4' 
                                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-sm shrink-0 ${
                                                isActive ? 'bg-[#2962ff] text-white' : 'bg-white text-[#2962ff]'
                                            }`}>
                                                <tab.icon size={22} />
                                            </div>
                                            <span className="font-bold text-lg">{tab.title}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </Reveal>

                        <Reveal delay="delay-100">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <div>
                                    <h2 className="text-4xl font-bold font-serif text-gray-900 leading-tight">
                                        Compétences <br/>
                                        <span className="text-[#2962ff]">essentielles.</span>
                                    </h2>
                                </div>
                                <div className="space-y-6">
                                    {skills.map((skill, idx) => (
                                        <div key={idx}>
                                            <div className="flex justify-between text-sm font-bold text-gray-900 mb-2">
                                                <span>{skill.name}</span>
                                                <span className="bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded">{skill.value}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-[#2962ff] rounded-full transition-all duration-1000 ease-out" 
                                                    style={{ width: `${skill.value}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right Column: Visual and Content */}
                    <div className="relative mt-10 lg:mt-0">
                        <Reveal delay="delay-200">
                            {/* Background decorative blob */}
                            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#1044A9]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 z-0"></div>
                            
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                                
                                {/* The active tab text box */}
                                <div className="bg-white p-8 md:p-10 shadow-2xl rounded-2xl z-20 flex-1 border border-gray-100 md:translate-x-12 min-h-[200px] flex items-center relative">
                                    <p className="text-gray-600 leading-relaxed text-lg font-medium relative z-10">
                                        {tabs.find(t => t.id === activeTab)?.content}
                                    </p>
                                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rotate-45 border-l border-b border-gray-100 hidden md:block"></div>
                                </div>
                                
                                {/* Image side */}
                                <div className="relative w-full md:w-2/3 rounded-tl-[4rem] rounded-br-[4rem] overflow-hidden shadow-2xl aspect-[4/5] z-10 bg-gray-900">
                                    <img src="/hero.png" alt="Corporate" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 opacity-80 mix-blend-overlay" />
                                    
                                    {/* Play button overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center group cursor-pointer">
                                        <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-[#2962ff] shadow-2xl group-hover:scale-110 transition-transform relative z-10">
                                            <div className="absolute inset-0 rounded-full border border-white/50 animate-ping"></div>
                                            <Play size={24} className="ml-1" fill="currentColor" />
                                        </div>
                                    </div>
                                    
                                    {/* Diagonal accent overlay to simulate the V shape from the reference */}
                                    <div className="absolute bottom-0 right-0 w-full h-2/3 bg-gradient-to-tr from-[#2962ff] to-transparent opacity-60"></div>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                </div>
            </div>
        </section>
    );
}
