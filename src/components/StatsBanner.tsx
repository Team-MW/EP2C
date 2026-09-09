import { Users, Award, Briefcase, Layers, PhoneCall } from 'lucide-react';
import Reveal from './Reveal';
import CountUp from './CountUp';

const stats = [
    {
        id: 1,
        endValue: 120,
        prefix: "+",
        suffix: "",
        label: "Entreprises accompagnées",
        icon: Users
    },
    {
        id: 2,
        endValue: 95,
        prefix: "",
        suffix: "%",
        label: "De satisfaction client",
        icon: Award
    },
    {
        id: 3,
        endValue: 10,
        prefix: "",
        suffix: "k+",
        label: "Projets Complétés",
        icon: Briefcase
    },
    {
        id: 4,
        endValue: 6,
        prefix: "",
        suffix: "",
        label: "Pôles d'expertise",
        icon: Layers
    }
];

export default function StatsBanner() {
    return (
        <section className="py-12 bg-white relative z-20">
            <div className="container px-6">
                <div className="bg-[#151515] text-white shadow-2xl flex flex-col lg:flex-row items-stretch justify-between overflow-hidden relative">
                    
                    {/* Subtle texture overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

                    {/* Stats */}
                    <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-10 lg:p-12 relative z-10">
                        {stats.map((stat, index) => (
                            <div key={stat.id} className={`flex items-center gap-5 ${index !== 0 ? 'md:border-l-2 border-white/10 md:pl-8' : ''}`}>
                                <stat.icon size={40} strokeWidth={1.5} className="text-[#2962ff]" />
                                <div>
                                    <div className="text-3xl lg:text-4xl font-bold font-serif flex items-baseline gap-1">
                                        <CountUp
                                            end={stat.endValue}
                                            prefix={stat.prefix}
                                            suffix={stat.suffix}
                                            duration={2500}
                                        />
                                    </div>
                                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-1">
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="w-full lg:w-auto bg-[#1044A9] p-10 lg:px-16 flex items-center justify-center gap-6 cursor-pointer hover:bg-[#2962ff] transition-colors duration-300 group relative z-10">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-[#1044A9] shadow-[0_10px_20px_rgba(0,0,0,0.2)] group-hover:scale-110 transition-transform duration-300">
                            <PhoneCall size={28} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-blue-100 text-sm font-bold uppercase tracking-widest mb-1">Besoin d'aide ?</span>
                            <a href="tel:+33659247370" className="text-white font-bold text-2xl lg:text-3xl">
                                +33 6 59 24 73 70
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
