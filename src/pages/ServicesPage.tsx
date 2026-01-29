import Layout from '../Layout';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import FAQItem from '../components/FAQItem';
import { services } from '../data/services';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ServicesPage() {
    return (
        <Layout>
            <SEO
                title="Nos Services et Expertises"
                description="Découvrez nos expertises : Gestion de Paie, Ressources Humaines, Formation, Audit Social et Coaching Professionnel. Une offre globale pour la performance de votre entreprise."
                keywords="services RH, gestion paie, formation professionnelle, audit social, coaching dirigeant, conseil entreprise, expertise sociale"
                url='https://www.efficience-ep2c.com/services'
            />
            {/* Futuristic Hero Section */}
            <section className="relative w-full h-[60vh] min-h-[500px] flex items-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-[#1044A9] rounded-full filter blur-[140px] opacity-20 animate-pulse-slow"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#2962ff] rounded-full filter blur-[120px] opacity-20 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
                </div>

                {/* Hero Content */}
                <div className="container relative z-10 px-6">
                    <Reveal>
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm font-semibold text-blue-400 mb-6 backdrop-blur-sm">
                                <Sparkles size={16} className="animate-pulse" />
                                <span>Nos Expertises</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                                Des Solutions <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">360°</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
                                Une offre globale pour couvrir tous vos besoins en RH, Paie, Formation et Coaching
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Services Grid - Modern 3D Cards */}
            <section className="relative py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <div className="absolute top-40 left-20 w-96 h-96 bg-blue-200 rounded-full filter blur-[120px]"></div>
                    <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-200 rounded-full filter blur-[120px]"></div>
                </div>

                <div className="container relative z-10">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <Reveal key={service.id} delay={`delay-${index * 100}`}>
                                <Link to={`/services/${service.slug}`} className="block group">
                                    <div className="relative h-full">
                                        {/* Glow Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

                                        {/* Card */}
                                        <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-100">
                                            {/* Image Section */}
                                            <div className="relative h-48 overflow-hidden">
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                                    style={{ backgroundImage: `url('${service.image}')` }}
                                                ></div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                                                {/* Icon */}
                                                <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                                                    <service.icon size={24} className="text-blue-600" />
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-6">
                                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                                                    {service.title}
                                                </h3>
                                                <p className="text-gray-600 leading-relaxed mb-4">
                                                    {service.description}
                                                </p>

                                                {/* CTA */}
                                                <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all duration-300">
                                                    <span>En savoir plus</span>
                                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                                                </div>
                                            </div>

                                            {/* Decorative Element */}
                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                        </div>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* General FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Reveal>
                        <h2 className="text-3xl font-serif font-bold text-center mb-10 text-gray-900">Questions Fréquentes sur nos Services</h2>
                        <div className="space-y-4">
                            <FAQItem
                                question="Comment savoir de quel service j'ai besoin ?"
                                answer="Nous commençons toujours par un audit ou un entretien de découverte gratuit pour analyser votre situation et vous orienter vers la solution la plus adaptée (externalisation, formation, coaching...)."
                            />
                            <FAQItem
                                question="Intervenez-vous partout en France ?"
                                answer="Oui, notre siège est à Montpellier, mais nous accompagnons des entreprises sur tout le territoire national, aussi bien en présentiel qu'à distance grâce à nos outils digitaux."
                            />
                            <FAQItem
                                question="Proposez-vous des offres sur-mesure ?"
                                answer="Absolument. Chaque entreprise est unique, c'est pourquoi nous adaptons nos interventions, nos formations et nos accompagnements à vos enjeux spécifiques et à votre culture d'entreprise."
                            />
                            <FAQItem
                                question="Quels sont vos délais de mise en place ?"
                                answer="Cela dépend du service. Pour une mission de conseil ou d'audit, nous pouvons généralement intervenir sous 1 à 2 semaines. Pour l'externalisation de la paie, nous établissons un calendrier de reprise précis."
                            />
                        </div>
                    </Reveal>
                </div>
            </section>
        </Layout>
    );
}
