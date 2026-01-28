import AboutSection from '../components/AboutSection';
import Hero from '../components/Hero';
import ProcessSection from '../components/ProcessSection';
import ServicesSection from '../components/ServicesSection';
import StatsBanner from '../components/StatsBanner';
import TestimonialsSection from '../components/TestimonialsSection';
import Layout from '../Layout';
import SEO from '../components/SEO';

export default function Home() {
    return (
        <Layout>
            <SEO
                title="Expertise Paie, RH, Conseil & Coaching"
                description="Optimisez votre performance RH avec Efficience EP2C. Nous accompagnons les entreprises en Gestion de Paie, Conseil RH, Audit Social et Coaching de Dirigeants."
                keywords="paie, RH, conseil, coaching, audit social, Montpellier, entreprise, gestion personnel"
            />
            <Hero />
            <ServicesSection />
            <AboutSection />
            <TestimonialsSection />
            <ProcessSection />
            <StatsBanner />
        </Layout>
    );
}
