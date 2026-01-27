import AboutSection from '../components/AboutSection';
import Hero from '../components/Hero';
import ProcessSection from '../components/ProcessSection';
import ServicesSection from '../components/ServicesSection';
import StatsBanner from '../components/StatsBanner';
import TestimonialsSection from '../components/TestimonialsSection';
import Layout from '../Layout';

export default function Home() {
    return (
        <Layout>
            <Hero />
            <ServicesSection />
            <AboutSection />
            <TestimonialsSection />
            <ProcessSection />
            <StatsBanner />
        </Layout>
    );
}
