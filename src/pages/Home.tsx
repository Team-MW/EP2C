import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import Layout from '../Layout';

export default function Home() {
    return (
        <Layout>
            <Hero />
            <ServicesSection />
        </Layout>
    );
}
