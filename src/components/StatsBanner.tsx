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
        label: "Pôles d'expertise complémentaires",
        icon: Layers
    }
];

export default function StatsBanner() {
    return (
        <section className="stats-banner-section">
            <div className="container banner-wrapper">

                {/* Stats Grid */}
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <Reveal key={stat.id} className="stat-item" delay={`delay-${index * 100}`}>
                            {/* Vertical separator (except for the first item) */}
                            {index !== 0 && <div className="stat-separator"></div>}

                            <div className="stat-content">
                                <div className="stat-icon-wrapper">
                                    <stat.icon size={32} strokeWidth={1.5} />
                                </div>
                                <div className="stat-info">
                                    <span className="stat-value">
                                        <CountUp
                                            end={stat.endValue}
                                            prefix={stat.prefix}
                                            suffix={stat.suffix}
                                            duration={2500}
                                        />
                                    </span>
                                    <span className="stat-label">{stat.label}</span>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Call Action Block */}
                <div className="banner-cta">
                    <div className="cta-icon-box">
                        <PhoneCall size={24} />
                    </div>
                    <div className="cta-text">
                        <span className="cta-label">Besoin d'aide ?</span>
                        <a href="tel:+33659247370" className="cta-phone">+33 6 59 24 73 70</a>
                    </div>
                </div>

            </div>
        </section>
    );
}
