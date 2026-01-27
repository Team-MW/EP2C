import { Wallet, Users, GraduationCap, Brain, FileSearch, TrendingUp } from 'lucide-react';

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
        <section className="bg-white py-20 relative overflow-hidden">
            {/* Background Gear/Texture placeholder - visual element */}
            <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
                {/* Simple gear SVG representation for background */}
                <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900 w-96 h-96">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
                    <path d="M20 12C20 11.2 19.8 10.4 19.5 9.7L22.1 7.1C22.2 6.9 22.3 6.6 22.1 6.4L20.2 3.1C20.1 2.9 19.8 2.8 19.5 2.9L16.2 4.1C15 3.3 13.6 2.7 12 2.7V0.7C12 0.3 11.7 0 11.3 0H9.3C8.9 0 8.7 0.3 8.7 0.7V2.7C7.1 2.7 5.7 3.3 4.5 4.1L1.2 2.9C0.9 2.8 0.6 2.9 0.5 3.1L0.8 6.4C0.6 6.6 0.7 6.9 0.8 7.1L3.4 9.7C3.1 10.4 3 11.2 3 12C3 12.8 3.1 13.6 3.4 14.3L0.8 16.9C0.7 17.1 0.6 17.4 0.8 17.6L2.6 20.9C2.7 21.1 3 21.2 3.3 21.1L6.6 19.9C7.8 20.7 9.2 21.3 10.8 21.3V23.3C10.8 23.7 11.1 24 11.5 24H13.5C13.9 24 14.2 23.7 14.2 23.3V21.3C15.8 21.3 17.2 20.7 18.4 19.9L21.7 21.1C22 21.2 22.3 21.1 22.4 20.9L24.2 17.6C24.4 17.4 24.3 17.1 24.2 16.9L21.6 14.3C21.9 13.6 22 12.8 22 12ZM12 16.5C9.5 16.5 7.5 14.5 7.5 12C7.5 9.5 9.5 7.5 12 7.5C14.5 7.5 16.5 9.5 16.5 12C16.5 14.5 14.5 16.5 12 16.5Z" />
                </svg>
            </div>

            <div className="container" style={{ padding: '4rem 20px' }}>
                <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {services.map((service) => (
                        <div key={service.id} className="service-card group">
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
