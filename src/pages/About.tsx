import Layout from '../Layout';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { Target, Heart, Globe, Sparkles, Zap, Award } from 'lucide-react';

export default function About() {
    return (
        <Layout>
            <SEO
                title="Qui Sommes-Nous ? - Efficience EP2C"
                description="Efficience EP2C est un cabinet expert en performance sociale. Découvrez notre équipe, nos valeurs et notre méthodologie d'accompagnement RH & Paie."
                keywords="agence EP2C, équipe paie Montpellier, consultants RH, expert comptable paie, cabinet conseil social"
                url='https://www.efficience-ep2c.com/about'
            />
            {/* Futuristic Hero Section */}
            <section className="relative w-full h-[70vh] min-h-[600px] flex items-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#1044A9] rounded-full filter blur-[120px] opacity-20 animate-pulse-slow"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#2962ff] rounded-full filter blur-[100px] opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full filter blur-[150px] opacity-30"></div>

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
                </div>

                {/* Hero Content */}
                <div className="container relative z-10 px-6">
                    <Reveal>
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm font-semibold text-blue-400 mb-6 backdrop-blur-sm">
                                <Sparkles size={16} className="animate-pulse" />
                                <span>Notre Histoire</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                                À Propos d'<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">EP2C</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl">
                                Excellence, Proximité, 2 Consultations
                            </p>
                            <div className="flex items-center gap-4 mt-8">
                                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                <span className="text-sm text-gray-400 uppercase tracking-wider">Depuis 2020</span>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* Floating Elements */}
                <div className="absolute bottom-10 right-10 hidden lg:flex gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center animate-float">
                        <Award className="text-blue-400" size={28} />
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
                        <Zap className="text-purple-400" size={28} />
                    </div>
                </div>
            </section>

            {/* Introduction Story */}
            <section className="about-intro-section">
                <div className="container">
                    <div className="about-intro-wrapper">
                        <Reveal>
                            <h2 className="section-heading">Notre Histoire 📖</h2>
                            <p className="section-text mb-6">
                                Fondé en 2020, <strong>Efficience EP2C</strong> est né d'une ambition simple : apporter aux entreprises un accompagnement
                                à la fois stratégique et opérationnel, sans jamais perdre de vue l'humain.
                            </p>
                            <p className="section-text">
                                Forts de notre présence en France 🇫🇷, en Algérie 🇩🇿 et à Monaco 🇲🇨, nous avons construit un réseau d'experts
                                passionnés, capables d'intervenir sur des problématiques complexes avec pragmatisme et agilité.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Vision & Mission - Glassmorphic Cards */}
            <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full filter blur-[100px]"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full filter blur-[120px]"></div>
                </div>

                <div className="container relative z-10">
                    <Reveal>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Vision</span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Des valeurs fortes qui guident chacune de nos actions
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <Reveal delay="delay-100">
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                                <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                        <Target size={32} className="text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre Mission 🎯</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Débloquer le potentiel de chaque organisation en optimisant ses ressources humaines,
                                        ses processus et sa stratégie de développement.
                                    </p>
                                    <div className="mt-6 h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay="delay-200">
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                                <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                        <Heart size={32} className="text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Nos Valeurs 💎</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        L'écoute, l'intégrité et l'excellence sont au cœur de chaque mission.
                                        Nous croyons en une approche bienveillante mais exigeante.
                                    </p>
                                    <div className="mt-6 h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay="delay-300">
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                                <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                        <Globe size={32} className="text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre Rayonnement 🌍</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Une expertise sans frontières. Nous intervenons à l'international pour accompagner
                                        votre croissance sur de nouveaux marchés.
                                    </p>
                                    <div className="mt-6 h-1 w-20 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"></div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Efficience EP2C Section */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <Reveal>
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-16 h-1 bg-[#1044A9]"></div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                        Efficience EP2C — Conseil & Coaching aux entreprises
                                    </h2>
                                </div>
                                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                                    Depuis 2020, <strong>EP2C</strong> accompagne les entreprises dans leur développement humain, stratégique et organisationnel.
                                    Présent en <strong>France</strong>, en <strong>Algérie</strong>, à <strong>Monaco</strong> et bientôt en <strong>Suisse</strong>,
                                    notre cabinet intervient avec une approche pragmatique, éthique et orientée résultats.
                                </p>
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Nos valeurs fondamentales :</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#1044A9] text-xl">»</span>
                                            <span className="font-semibold text-gray-800">Excellence</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#1044A9] text-xl">»</span>
                                            <span className="font-semibold text-gray-800">Éthique & transparence</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#1044A9] text-xl">»</span>
                                            <span className="font-semibold text-gray-800">Proximité humaine</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#1044A9] text-xl">»</span>
                                            <span className="font-semibold text-gray-800">Innovation utile</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delay="delay-200">
                            <div className="relative">
                                <img
                                    src="/service_hr.png"
                                    alt="Efficience EP2C"
                                    className="rounded-2xl shadow-2xl"
                                />
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                                    <div className="text-center text-white">
                                        <div className="text-3xl mb-1">🏆</div>
                                        <div className="text-xs font-bold">High Quality</div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Notre Histoire - Timeline */}
            <section className="bg-gray-900 text-white py-20">
                <div className="container mx-auto px-4">
                    <Reveal>
                        <div className="text-center mb-16">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="w-16 h-1 bg-blue-500"></div>
                                <h2 className="text-3xl md:text-4xl font-bold">Notre histoire</h2>
                            </div>
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                                Découvrez les grandes étapes qui ont marqué le développement d'Efficience EP2C depuis sa naissance.
                            </p>
                        </div>
                    </Reveal>

                    <div className="max-w-5xl mx-auto">
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500/30 hidden md:block"></div>

                            {/* Timeline Items */}
                            <div className="space-y-12">
                                {/* Start */}
                                <Reveal delay="delay-100">
                                    <div className="relative flex items-center justify-center">
                                        <div className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg">
                                            Start
                                        </div>
                                    </div>
                                </Reveal>

                                {/* Septembre 2020 - Left */}
                                <Reveal delay="delay-200">
                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                        <div className="md:text-right">
                                            <h3 className="text-2xl font-bold mb-2">Septembre 2020</h3>
                                            <p className="text-gray-400">Création du Pôle Paie</p>
                                        </div>
                                        <div className="relative flex items-center">
                                            <div className="hidden md:block absolute left-0 w-4 h-4 bg-blue-500 rounded-full -translate-x-1/2"></div>
                                            <div className="md:ml-8">
                                                <p className="text-gray-300">Naissance EFFICIENCE EP2C</p>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>

                                {/* Octobre 2020 - Right */}
                                <Reveal delay="delay-300">
                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                        <div className="md:text-right order-2 md:order-1">
                                            <div className="relative flex items-center justify-end">
                                                <div className="hidden md:block absolute right-0 w-4 h-4 bg-blue-500 rounded-full translate-x-1/2"></div>
                                            </div>
                                        </div>
                                        <div className="order-1 md:order-2">
                                            <h3 className="text-2xl font-bold mb-2">Octobre 2020</h3>
                                            <p className="text-gray-400">Création du pôle Ressources Humaines</p>
                                        </div>
                                    </div>
                                </Reveal>

                                {/* Novembre 2020 - Left */}
                                <Reveal delay="delay-400">
                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                        <div className="md:text-right">
                                            <h3 className="text-2xl font-bold mb-2">Novembre 2020</h3>
                                            <p className="text-gray-400">Certification Coaching professionnel de niveau</p>
                                        </div>
                                        <div className="relative flex items-center">
                                            <div className="hidden md:block absolute left-0 w-4 h-4 bg-blue-500 rounded-full -translate-x-1/2"></div>
                                        </div>
                                    </div>
                                </Reveal>

                                {/* Juin 2021 - Right */}
                                <Reveal delay="delay-500">
                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                        <div className="md:text-right order-2 md:order-1">
                                            <div className="relative flex items-center justify-end">
                                                <div className="hidden md:block absolute right-0 w-4 h-4 bg-blue-500 rounded-full translate-x-1/2"></div>
                                            </div>
                                        </div>
                                        <div className="order-1 md:order-2">
                                            <h3 className="text-2xl font-bold mb-2">Juin 2021</h3>
                                            <p className="text-gray-400">Création du Pôle Formation</p>
                                        </div>
                                    </div>
                                </Reveal>

                                {/* Mai 2021 - Left */}
                                <Reveal delay="delay-600">
                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                        <div className="md:text-right">
                                            <h3 className="text-2xl font-bold mb-2">Mai 2021</h3>
                                            <p className="text-gray-400">Création du Pôle Audit</p>
                                        </div>
                                        <div className="relative flex items-center">
                                            <div className="hidden md:block absolute left-0 w-4 h-4 bg-blue-500 rounded-full -translate-x-1/2"></div>
                                        </div>
                                    </div>
                                </Reveal>

                                {/* Septembre 2022 - Right */}
                                <Reveal delay="delay-700">
                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                        <div className="md:text-right order-2 md:order-1">
                                            <div className="relative flex items-center justify-end">
                                                <div className="hidden md:block absolute right-0 w-4 h-4 bg-blue-500 rounded-full translate-x-1/2"></div>
                                            </div>
                                        </div>
                                        <div className="order-1 md:order-2">
                                            <h3 className="text-2xl font-bold mb-2">Septembre 2022</h3>
                                            <p className="text-gray-400">Création du Pôle Management et Transformation</p>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Placeholder */}

        </Layout>
    );
}
