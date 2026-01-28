import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Layout from '../Layout';
import { services } from '../data/services';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';

export default function ServiceDetail() {
    const { slug } = useParams();
    const service = services.find(s => s.slug === slug);

    if (!service) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-serif mb-4">Service non trouvé</h1>
                        <Link to="/" className="text-blue-600 hover:underline">Retour à l'accueil</Link>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <SEO
                title={`${service.title} - Expertise Efficience EP2C`}
                description={service.description}
                keywords={`${service.title}, expertise RH, gestion social, cabinet conseil, Montpellier`}
                image={service.image}
                url={`https://www.efficience-ep2c.com/services/${service.slug}`}
            />
            {/* Hero Banner */}
            <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url('${service.image}')` }}
                ></div>
                <div className="absolute inset-0 bg-black/50 z-10"></div>

                <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
                    <Reveal>
                        <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
                            Expertise EP2C
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">{service.title}</h1>
                        <p className="text-xl md:text-2xl font-light text-gray-200 max-w-2xl mx-auto">
                            {service.description}
                        </p>
                    </Reveal>
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-start">

                        {/* Description & Context */}
                        <Reveal>
                            <div>
                                <h2 className="text-3xl font-serif font-bold mb-6 text-gray-900">
                                    Notre approche
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                    Chez EP2C, nous comprenons que chaque entreprise est unique. C'est pourquoi notre offre
                                    <strong> {service.title}</strong> est conçue pour s'adapter spécifiquement à vos enjeux et à votre culture d'entreprise.
                                    Nous mettons à votre disposition des experts chevronnés capable de transformer vos défis en opportunités de croissance.
                                </p>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Notre méthodologie rigoureuse garantit des résultats mesurables et durables, tout en assurant une transition fluide pour vos équipes.
                                </p>

                                <div className="mt-10">
                                    <Link to="/contact" className="btn-connexion bg-[#1044A9] inline-flex rounded-lg hover:bg-[#0d3685] !border-none shadow-lg">
                                        Demander un devis
                                    </Link>
                                </div>
                            </div>
                        </Reveal>

                        {/* Details List */}
                        <Reveal delay="delay-100">
                            <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="w-16 h-16 bg-[#eaf3ff] rounded-2xl flex items-center justify-center mb-8 text-[#1044A9]">
                                    <service.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-6 text-gray-900">Ce que nous proposons</h3>
                                <ul className="space-y-4">
                                    {service.details?.map((detail, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <CheckCircle className="text-[#1044A9] shrink-0 mt-1" size={20} />
                                            <span className="text-gray-700 font-medium">{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>

                    </div>

                    {/* Benefits Section */}
                    {service.benefits && service.benefits.length > 0 && (
                        <Reveal delay="delay-200">
                            <div className="mt-16 bg-gradient-to-br from-[#1044A9] to-[#2563eb] p-10 rounded-2xl text-white shadow-xl">
                                <h3 className="text-2xl font-bold mb-6">Vos bénéfices</h3>
                                <ul className="space-y-4">
                                    {service.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <CheckCircle className="text-white shrink-0 mt-1" size={20} />
                                            <span className="text-white/90 font-medium">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    )}
                </div>
            </div>

            {/* Navigation to other services */}
            <div className="bg-gray-900 py-16 text-white border-t border-gray-800">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-2xl font-serif mb-8">Découvrir nos autres expertises</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {services.filter(s => s.slug !== service.slug).slice(0, 3).map(s => (
                            <Link key={s.id} to={`/services/${s.slug}`} className="px-6 py-3 border border-gray-700 rounded-full hover:bg-white hover:text-black transition-all">
                                {s.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
