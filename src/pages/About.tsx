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
