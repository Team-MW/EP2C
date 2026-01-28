import Layout from '../Layout';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { services } from '../data/services';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ServicesPage() {
    return (
        <Layout>
            <SEO
                title="Nos Services et Expertises"
                description="Découvrez nos expertises : Gestion de Paie, Ressources Humaines, Formation, Audit Social et Coaching Professionnel. Une offre globale pour la performance de votre entreprise."
                keywords="services RH, gestion paie, formation professionnelle, audit social, coaching dirigeant, conseil entreprise, expertise sociale"
                url='https://www.efficience-ep2c.com/services'
            />
            {/* Hero Section */}
            <div className="services-hero">
                <div className="services-hero-bg"></div>
                <div className="services-hero-content">
                    <Reveal>
                        <h1 className="services-hero-title">Nos Expertises 🚀</h1>
                        <p className="services-hero-subtitle">
                            Une offre globale à 360° pour couvrir tous vos besoins
                        </p>
                    </Reveal>
                </div>
            </div>

            {/* Services Grid */}
            <section className="services-page-section">
                <div className="container">
                    <div className="services-page-grid">
                        {services.map((service, index) => (
                            <Reveal key={service.id} delay={`delay-${index * 100}`}>
                                <Link to={`/services/${service.slug}`} className="service-page-link">
                                    <div className="service-page-card group">
                                        <div className="service-card-image-wrapper">
                                            <div
                                                className="service-card-bg"
                                                style={{ backgroundImage: `url('${service.image}')` }}
                                            ></div>
                                            <div className="service-card-overlay"></div>
                                            <div className="service-card-icon">
                                                <service.icon size={20} />
                                            </div>
                                        </div>
                                        <div className="service-card-body">
                                            <h3 className="service-card-title">
                                                {service.title}
                                            </h3>
                                            <p className="service-card-desc">
                                                {service.description}
                                            </p>
                                            <div className="service-card-footer">
                                                En savoir plus <ArrowRight size={16} className="arrow-icon" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
