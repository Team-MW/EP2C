import { Wallet, Users, GraduationCap, Brain, FileSearch, TrendingUp } from 'lucide-react';
import Reveal from './Reveal';

const services = [
    {
        id: '01',
        title: 'Pôle Paie',
        image: '/service_finance.png',
        icon: Wallet
    },
    {
        id: '02',
        title: 'Pôle Ressources Humaines',
        image: '/service_hr.png',
        icon: Users
    },
    {
        id: '03',
        title: 'Pôle Formation',
        image: '/service_training.png',
        icon: GraduationCap
    },
    {
        id: '04',
        title: 'Pôle Coaching',
        image: '/service_coaching.png',
        icon: Brain
    },
    {
        id: '05',
        title: 'Pôle Audit',
        image: '/service_audit.png',
        icon: FileSearch
    },
    {
        id: '06',
        title: 'Pôle Management et Transformation',
        image: '/service_management.png',
        icon: TrendingUp
    }
];

export default function ServicesSection() {
    return (
        <section className="py-20 relative overflow-visible" style={{ position: 'relative', padding: '5rem 0 0 0', overflow: 'visible' }}>
            {/* Decorative Gear - positioned to overlap top-left */}

            <div className="container" style={{ padding: '0 20px' }}>
                <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '-150px', position: 'relative', zIndex: 30 }}>
                    {services.map((service, index) => (
                        <Reveal key={service.id} delay={`delay-${(index % 3) * 100}`}>
                            <div className="service-card group">
                                {/* Background Image */}
                                <div
                                    className="bg-image"
                                    style={{ backgroundImage: `url('${service.image}')` }}
                                ></div>

                                {/* Dark Overlay */}
                                <div className="service-overlay"></div>

                                {/* Content */}
                                <div className="service-content">
                                    {/* Top: Icon */}
                                    <div className="service-icon">
                                        <service.icon size={40} strokeWidth={1.5} />
                                    </div>

                                    {/* Bottom: Title & Number */}
                                    <div className="service-info">
                                        <h3 className="service-title">
                                            {service.title}
                                        </h3>
                                        <span className="service-id">
                                            {service.id}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Bottom Button */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                    <button className="btn-all-services">
                        <span>Voir tous nos services</span>
                        <div className="btn-icon-circle">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14m-7-7 7 7-7 7" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
}
