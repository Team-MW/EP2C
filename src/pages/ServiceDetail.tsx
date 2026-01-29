import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md bg-white">
            <button
                className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-semibold text-gray-800 text-lg">{question}</span>
                {isOpen ? (
                    <ChevronUp className="text-[#1044A9]" size={20} />
                ) : (
                    <ChevronDown className="text-gray-400" size={20} />
                )}
            </button>
            <div
                className={`transition-all duration-300 ease-in-out text-gray-600 overflow-hidden ${isOpen ? 'max-h-40 opacity-100 p-5 pt-0 border-t border-gray-100' : 'max-h-0 opacity-0'
                    }`}
            >
                {answer}
            </div>
        </div>
    );
}
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

            {/* Content Section - Modern Futuristic Design */}
            <div className="relative bg-gradient-to-b from-white via-gray-50 to-white py-24 overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full filter blur-[120px]"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full filter blur-[120px]"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Notre Approche - Hero Style */}
                    <Reveal>
                        <div className="max-w-4xl mx-auto text-center mb-20">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm font-semibold text-blue-600 mb-6 backdrop-blur-sm">
                                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                <span>Notre Méthodologie</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                                Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Approche</span>
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed mb-6">
                                Chez EP2C, nous comprenons que chaque entreprise est unique. C'est pourquoi notre offre
                                <strong className="text-gray-900"> {service.title}</strong> est conçue pour s'adapter spécifiquement à vos enjeux et à votre culture d'entreprise.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                Nous mettons à votre disposition des experts chevronnés capables de transformer vos défis en opportunités de croissance.
                                Notre méthodologie rigoureuse garantit des résultats mesurables et durables, tout en assurant une transition fluide pour vos équipes.
                            </p>

                            {/* CTA Button */}
                            <Link to="/contact" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                                <span className="relative z-10">Demander un devis</span>
                                <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                        </div>
                    </Reveal>

                    {/* Ce que nous proposons - Modern Cards Grid */}
                    <Reveal delay="delay-100">
                        <div className="max-w-6xl mx-auto">
                            {/* Section Header */}
                            <div className="text-center mb-12">
                                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Ce que nous <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">proposons</span>
                                </h3>
                                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
                            </div>

                            {/* Services Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {service.details?.map((detail, idx) => (
                                    <Reveal key={idx} delay={`delay-${(idx + 2) * 50}`}>
                                        <div className="group relative">
                                            {/* Glow Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

                                            {/* Card */}
                                            <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                                                <div className="flex items-start gap-4">
                                                    {/* Icon */}
                                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                                                        <CheckCircle className="text-white" size={24} />
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1">
                                                        <p className="text-gray-800 font-semibold leading-relaxed group-hover:text-blue-600 transition-colors duration-300">
                                                            {detail}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Decorative Element */}
                                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl"></div>
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>

                            {/* Icon Badge at Bottom */}
                            <div className="flex justify-center mt-12">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                                    <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                                        <service.icon size={40} className="text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Benefits Section */}
            {service.benefits && service.benefits.length > 0 && (
                <Reveal delay="delay-200">
                    <div className="container mx-auto px-4 relative z-10 mt-16">
                        <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#1044A9] to-[#2563eb] p-10 rounded-2xl text-white shadow-xl">
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
                    </div>
                </Reveal>
            )}

            {/* FAQ Section */}
            {service.faq && service.faq.length > 0 && (
                <Reveal delay="delay-300">
                    <div className="container mx-auto px-4 relative z-10 mt-20">
                        <div className="max-w-3xl mx-auto">
                            <h3 className="text-3xl font-serif font-bold text-center mb-10 text-gray-900">Questions Fréquentes</h3>
                            <div className="space-y-4">
                                {service.faq.map((item, idx) => (
                                    <FAQItem key={idx} question={item.question} answer={item.answer} />
                                ))}
                            </div>
                        </div>
                    </div>
                </Reveal>
            )}

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
