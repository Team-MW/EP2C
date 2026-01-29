import Layout from '../Layout';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import FAQItem from '../components/FAQItem';
import { Calendar, User, ArrowRight, Sparkles } from 'lucide-react';

const blogPosts = [
    {
        id: 1,
        title: "Comment optimiser la gestion de la paie en 2026 ?",
        category: "Pôle Paie",
        date: "24 Jan 2026",
        author: "Sarah Martin",
        image: "/service_finance.png",
        excerpt: "Découvrez les nouvelles réglementations et nos conseils pour sécuriser vos bulletins de salaire tout en gagnant du temps."
    },
    {
        id: 2,
        title: "Le management hybride : les clés du succès",
        category: "Management",
        date: "12 Jan 2026",
        author: "Marc Dubois",
        image: "/service_management.png",
        excerpt: "Télétravail et présentiel : comment maintenir la cohésion et la performance de vos équipes dans un environnement flexible ?"
    },
    {
        id: 3,
        title: "Pourquoi l'audit social est indispensable",
        category: "Audit",
        date: "05 Jan 2026",
        author: "Elena Fisher",
        image: "/service_audit.png",
        excerpt: "Anticipez les risques et identifiez les leviers d'amélioration de votre climat social grâce à un diagnostic précis."
    },
    {
        id: 4,
        title: "Coaching de dirigeant : un luxe ou une nécessité ?",
        category: "Coaching",
        date: "20 Dec 2023",
        author: "Jean Alaric",
        image: "/service_coaching.png",
        excerpt: "Prendre du recul pour mieux décider. Découvrez comment le coaching peut transformer votre vision stratégique."
    }
];

export default function Blog() {
    return (
        <Layout>
            <SEO
                title="Blog & Actualités RH"
                description="Suivez toute l'actualité sociale, RH et managériale. Nos conseils d'experts, décryptages réglementaires et tendances pour piloter vos ressources humaines."
                keywords="blog RH, actualité sociale, veille juridique paie, conseils management, tendances RH, expertise sociale"
                url='https://www.efficience-ep2c.com/blog'
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
                                <span>Blog & Actualités</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                                Le Blog <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">EP2C</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
                                Actualités, conseils d'experts et tendances RH
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Blog Grid - Modern Cards */}
            <section className="relative py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <div className="absolute top-40 left-20 w-96 h-96 bg-blue-200 rounded-full filter blur-[120px]"></div>
                    <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-200 rounded-full filter blur-[120px]"></div>
                </div>

                <div className="container relative z-10">
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {blogPosts.map((post, index) => (
                            <Reveal key={post.id} delay={`delay-${index * 100}`}>
                                <article className="group relative h-full">
                                    {/* Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

                                    {/* Card */}
                                    <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                                        {/* Image Section */}
                                        <div className="relative h-56 overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                                style={{ backgroundImage: `url('${post.image}')` }}
                                            ></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                                            {/* Category Badge */}
                                            <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-blue-600 shadow-lg">
                                                {post.category}
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            {/* Meta Info */}
                                            <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    <span>{post.date}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <User size={14} />
                                                    <span>{post.author}</span>
                                                </div>
                                            </div>

                                            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                                                {post.title}
                                            </h2>
                                            <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                                                {post.excerpt}
                                            </p>

                                            {/* CTA */}
                                            <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all duration-300">
                                                <span>Lire l'article</span>
                                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                                            </div>
                                        </div>

                                        {/* Decorative Element */}
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="text-center mt-12">
                        <Reveal>
                            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <span className="relative z-10">Charger plus d'articles</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Reveal>
                        <h2 className="text-3xl font-serif font-bold text-center mb-10 text-gray-900">Questions Fréquentes</h2>
                        <div className="space-y-4">
                            <FAQItem
                                question="À quelle fréquence publiez-vous des articles ?"
                                answer="Nous publions de nouveaux articles chaque semaine pour vous tenir informé des dernières actualités sociales, juridiques et managériales."
                            />
                            <FAQItem
                                question="Puis-je m'abonner à une newsletter ?"
                                answer="Oui, vous pouvez vous inscrire à notre newsletter mensuelle via le formulaire en bas de page pour recevoir nos derniers articles directement dans votre boîte mail."
                            />
                            <FAQItem
                                question="Acceptez-vous les articles invités ?"
                                answer="Nous sommes ouverts aux collaborations avec des experts du domaine RH et juridique. N'hésitez pas à nous contacter via le formulaire de contact pour nous proposer un sujet."
                            />
                        </div>
                    </Reveal>
                </div>
            </section>
        </Layout>
    );
}
