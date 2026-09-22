import { useState } from 'react';
import { Flag, Eye, Lightbulb } from 'lucide-react';
import Reveal from './Reveal';

const tabs = [
    {
        id: 'mission',
        title: 'Notre Mission',
        icon: Flag,
        content:
            "EP2C a été optimisé pour vous offrir la meilleure expérience en matière d'accompagnement RH, de gestion de la paie et de formation. Nous créons des stratégies sur-mesure pour votre succès.",
    },
    {
        id: 'vision',
        title: 'Notre Vision',
        icon: Eye,
        content:
            "Nous offrons toujours les meilleures solutions pour accompagner les entreprises ambitieuses. Anticiper les évolutions du marché, sécuriser vos pratiques et accélérer votre performance sociale.",
    },
    {
        id: 'philosophy',
        title: 'Notre Philosophie',
        icon: Lightbulb,
        content:
            "Une équipe d'experts et des solutions innovantes au service de votre croissance. Proximité, excellence et engagement humain : chaque accompagnement est pensé pour des résultats concrets et durables.",
    },
];

export default function AboutSection() {
    const [activeTab, setActiveTab] = useState('mission');
    const active = tabs.find((t) => t.id === activeTab) ?? tabs[0];

    return (
        <section className="py-20 md:py-28 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <Reveal>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-1 bg-[#2962ff]" />
                        <span className="text-gray-900 font-bold text-base md:text-lg">À propos de nous</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-serif text-gray-900 leading-tight mb-12 md:mb-16 max-w-2xl">
                        Nous offrons toujours les{' '}
                        <span className="text-[#2962ff]">meilleures solutions</span>
                    </h2>
                </Reveal>

                <div className="grid lg:grid-cols-[0.9fr_1.3fr] gap-10 lg:gap-12 items-center">

                    {/* Photo */}
                    <Reveal className="relative flex justify-center items-center">
                        <div className="relative w-full max-w-md aspect-square flex items-center justify-center group">
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full text-blue-100 transform scale-110 -z-10 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-125">
                                <path fill="currentColor" d="M45.7,-76.4C58.9,-69.3,69,-56.3,77,-42.1C85,-27.9,90.9,-12.4,90.3,2.9C89.7,18.2,82.5,33.3,72.4,45.8C62.2,58.3,49.1,68.2,34.7,74.5C20.3,80.8,4.6,83.5,-10.8,80.7C-26.2,77.9,-41.3,69.5,-53.4,57.7C-65.5,45.9,-74.6,30.8,-79.3,14.3C-84,-2.2,-84.3,-20.1,-76.7,-35.1C-69.1,-50.1,-53.6,-62.1,-38.7,-68.8C-23.8,-75.5,-9.5,-76.9,6.1,-84.4C21.7,-91.9,32.5,-83.5,45.7,-76.4Z" transform="translate(100 100)" />
                            </svg>

                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%] text-[#1044A9] opacity-20 -z-20 transform -rotate-12 transition-transform duration-1000 group-hover:-rotate-45 group-hover:scale-110">
                                <path fill="none" stroke="currentColor" strokeWidth="2" d="M41.7,-67.2C54.4,-59.5,65.2,-48.5,73.5,-35.3C81.8,-22.1,87.6,-6.6,85.6,8.2C83.6,23,73.8,37.1,62.1,48.8C50.4,60.5,36.8,69.8,21.8,74.9C6.8,80,-9.6,80.9,-25.1,76.5C-40.6,72.1,-55.2,62.4,-65.4,49.3C-75.6,36.2,-81.4,19.7,-81.6,3.1C-81.8,-13.5,-76.4,-30.2,-66.1,-43.3C-55.8,-56.4,-40.6,-65.9,-26.3,-71.4C-12,-76.9,1.4,-78.4,15.1,-75.8C28.8,-73.2,29,-74.9,41.7,-67.2Z" transform="translate(100 100)" />
                            </svg>

                            <div className="absolute top-[10%] left-[10%] w-6 h-6 bg-[#2962ff] rounded-full animate-bounce" />
                            <div className="absolute bottom-[20%] right-[-5%] w-12 h-12 bg-[#1044A9] drop-shadow-lg" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }} />
                            <div className="absolute bottom-[10%] left-[-10%] w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-xl border border-white/50" />

                            <div className="relative w-[85%] h-[85%] rounded-full overflow-hidden border-8 border-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.15)] z-10 bg-white transition-all duration-700 group-hover:shadow-[0_0_80px_rgba(41,98,255,0.45)] group-hover:scale-[1.03]">
                                <img
                                    src="/partners/boumedienne.jpeg"
                                    alt="À propos de EP2C"
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </Reveal>

                    {/* Tabs + blue panel */}
                    <div className="relative grid sm:grid-cols-[240px_1fr] gap-6 lg:gap-0 items-center min-h-[360px]">
                        <Reveal className="relative z-20 flex flex-col gap-4 sm:-mr-6">
                            {tabs.map((tab) => {
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-3 w-full rounded-full p-2.5 pr-5 text-left transition-all duration-300 ${
                                            isActive ? 'shadow-xl scale-[1.02]' : 'hover:brightness-95'
                                        }`}
                                        style={{
                                            backgroundColor: isActive ? '#0f172a' : '#f3f4f6',
                                            color: isActive ? '#ffffff' : '#111827',
                                        }}
                                    >
                                        <span
                                            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                                            style={{
                                                backgroundColor: isActive ? '#2962ff' : '#ffffff',
                                                color: isActive ? '#ffffff' : '#2962ff',
                                                boxShadow: isActive ? 'none' : '0 1px 2px rgba(0,0,0,0.08)',
                                            }}
                                        >
                                            <tab.icon size={20} strokeWidth={1.8} />
                                        </span>
                                        <span
                                            className="font-bold text-sm md:text-base"
                                            style={{ color: isActive ? '#ffffff' : '#111827' }}
                                        >
                                            {tab.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </Reveal>

                        <Reveal delay="delay-100" className="relative z-10 min-h-[320px] flex items-center">
                            <div
                                className="absolute inset-y-0 left-0 right-0 bg-[#2962ff]"
                                style={{ clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0% 100%)' }}
                            />
                            <div
                                className="absolute inset-y-4 left-6 right-3 bg-[#1044A9]/35"
                                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 2% 100%)' }}
                            />

                            <div className="relative z-10 w-full max-w-md mx-auto sm:ml-10 sm:mr-6 px-5 py-8">
                                <div className="bg-white rounded-2xl shadow-2xl p-7 md:p-8 border border-white/40">
                                    <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                                        <span className="float-left text-5xl font-bold text-[#1044A9] leading-[0.85] mr-3 mt-1 font-serif">
                                            {active.id === 'mission' ? 'E' : ''}
                                        </span>
                                        {active.id === 'mission' ? active.content.slice(1) : active.content}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
