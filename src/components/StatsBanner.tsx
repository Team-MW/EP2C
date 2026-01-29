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
        <section className="relative py-20 bg-[#0f172a] overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1e40af] to-[#0f172a] opacity-90"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

            <div className="container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <Reveal key={stat.id} delay={`delay-${index * 100}`}>
                            <div className="relative group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                                <div className="absolute -top-6 left-6 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <stat.icon size={24} className="text-white" />
                                </div>

                                <div className="mt-8 text-white">
                                    <div className="text-4xl font-bold font-serif mb-2 flex items-baseline gap-1">
                                        <CountUp
                                            end={stat.endValue}
                                            prefix={stat.prefix}
                                            suffix={stat.suffix}
                                            duration={2500}
                                        />
                                    </div>
                                    <p className="text-blue-200 text-sm font-medium uppercase tracking-wider">
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Call Action Block */}
                <Reveal delay="delay-400">
                    <div className="mt-16 flex justify-center">
                        <div className="inline-flex items-center gap-6 p-2 pr-8 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/15 transition-colors group cursor-pointer">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse">
                                <PhoneCall size={20} />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-blue-200 text-xs font-bold uppercase tracking-wide">Une question ?</span>
                                <a href="tel:+33659247370" className="text-white font-bold text-lg group-hover:text-blue-300 transition-colors">
                                    +33 6 59 24 73 70
                                </a>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
