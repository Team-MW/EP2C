import { Target, Rocket } from 'lucide-react';

export default function AboutSection() {
    return (
        <section className="about-section">
            <div className="container about-grid">

                {/* Left Column: Creative Typography / Visual */}
                <div className="about-visual">
                    <div className="ep2c-typo">
                        <span>e</span>
                        <span className="p-letter">P</span>
                        <span className="two">2</span>
                        <span className="c-letter">c</span>
                    </div>
                    {/* Decorative abstract elements */}
                    <div className="circle-deco"></div>
                </div>

                {/* Right Column: Content */}
                <div className="about-content">

                    <div className="section-tag">
                        <span className="tag-line"></span>
                        <span className="tag-text">À propos de nous</span>
                    </div>

                    <h2 className="about-heading">
                        Depuis 2020, EP2C <br />
                        accompagne les entreprises.
                    </h2>

                    <div className="about-highlight">
                        <p>
                            Basés en <strong>France, en Algérie et à Monaco</strong>, et bientôt en Suisse,
                            nous accompagnons des entreprises de toutes tailles avec une vision internationale
                            et des solutions locales.
                        </p>
                    </div>

                    <div className="about-features">

                        {/* Mission */}
                        <div className="feature-item">
                            <div className="feature-icon">
                                <Target size={28} strokeWidth={1.5} />
                            </div>
                            <div className="feature-text">
                                <h3>Notre mission</h3>
                                <p>
                                    Accompagner les entreprises dans leur développement humain, structurel et stratégique
                                    en leur offrant des solutions sur-mesure à fort impact.
                                </p>
                            </div>
                        </div>

                        {/* Valeurs */}
                        <div className="feature-item">
                            <div className="feature-icon">
                                <Rocket size={28} strokeWidth={1.5} />
                            </div>
                            <div className="feature-text">
                                <h3>Nos valeurs</h3>
                                <ul className="values-list">
                                    <li><strong>Excellence :</strong> Des solutions pointues et adaptées à chaque contexte.</li>
                                    <li><strong>Proximité :</strong> Une relation de confiance durable.</li>
                                    <li><strong>Engagement :</strong> Un accompagnement de bout en bout.</li>
                                    <li><strong>Innovation :</strong> Des approches modernes, tournées vers le futur du travail.</li>
                                </ul>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
