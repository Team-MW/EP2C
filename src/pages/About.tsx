import Layout from '../Layout';
import Reveal from '../components/Reveal';
import { Target, Heart, Users, Globe } from 'lucide-react';

export default function About() {
    return (
        <Layout>
            {/* Hero Section */}
            <div className="about-hero">
                <div
                    className="about-hero-bg"
                    style={{ backgroundImage: "url('/service_hr.png')" }}
                ></div>
                <div className="about-hero-overlay"></div>
                <div className="about-hero-content">
                    <Reveal>
                        <h1 className="about-title">À Propos d'EP2C</h1>
                        <p className="about-subtitle">
                            Excellence, Proximité, 2 Consultations
                        </p>
                    </Reveal>
                </div>
            </div>

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

            {/* Vision & Mission */}
            <section className="vision-section">
                <div className="container">
                    <div className="vision-grid">
                        <Reveal delay="delay-100">
                            <div className="vision-card">
                                <div className="vision-icon"><Target size={40} /></div>
                                <h3 className="vision-card-title">Notre Mission 🎯</h3>
                                <p className="vision-card-desc">
                                    Débloquer le potentiel de chaque organisation en optimisant ses ressources humaines,
                                    ses processus et sa stratégie de développement.
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delay="delay-200">
                            <div className="vision-card">
                                <div className="vision-icon"><Heart size={40} /></div>
                                <h3 className="vision-card-title">Nos Valeurs 💎</h3>
                                <p className="vision-card-desc">
                                    L'écoute, l'intégrité et l'excellence sont au cœur de chaque mission.
                                    Nous croyons en une approche bienveillante mais exigeante.
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delay="delay-300">
                            <div className="vision-card">
                                <div className="vision-icon"><Globe size={40} /></div>
                                <h3 className="vision-card-title">Notre Rayonnement 🌍</h3>
                                <p className="vision-card-desc">
                                    Une expertise sans frontières. Nous intervenons à l'international pour accompagner
                                    votre croissance sur de nouveaux marchés.
                                </p>
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
            <section className="team-section">
                <div className="container text-center">
                    <Reveal>
                        <h2 className="section-heading mb-12">L'Équipe Dirigeante 👥</h2>
                    </Reveal>
                    <div className="team-grid">
                        {[1, 2, 3, 4].map((item) => (
                            <Reveal key={item} delay={`delay-${item * 100}`}>
                                <div className="team-member-card">
                                    <div className="team-img-placeholder">
                                        <div className="placeholder-content">
                                            <Users size={32} />
                                        </div>
                                    </div>
                                    <h3 className="team-name">Membre {item}</h3>
                                    <p className="team-role">Expert Associé</p>
                                    <p className="team-bio">Spécialiste en transformation et stratégie.</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
