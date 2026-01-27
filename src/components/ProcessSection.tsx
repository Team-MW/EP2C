import { Rocket, Users, Target, Handshake, ChevronRight } from 'lucide-react';
import Reveal from './Reveal';

const steps = [
    {
        id: 1,
        number: "1",
        title: "Premier contact 👋",
        description: "Vous prenez contact avec notre équipe pour exprimer vos besoins ou problématiques.",
        icon: Rocket,
        link: "Nous contacter",
        hasLink: true
    },
    {
        id: 2,
        number: "2",
        title: "Diagnostic & échange 🔍",
        description: "Nous organisons un rendez-vous pour analyser votre situation, vos objectifs et vos enjeux.",
        icon: Users
    },
    {
        id: 3,
        number: "3",
        title: "Proposition sur-mesure 📝",
        description: "Nous construisons ensemble un plan d’action clair et adapté à votre structure, avec les bons experts de nos 6 pôles.",
        icon: Target
    },
    {
        id: 4,
        number: "4",
        title: "Mise en œuvre & suivi ✅",
        description: "Nous lançons l’accompagnement avec un suivi régulier, des indicateurs précis et un interlocuteur dédié.",
        icon: Handshake
    }
];

export default function ProcessSection() {
    return (
        <section className="process-section">
            <div className="container">

                {/* Header */}
                <div className="process-header">
                    <Reveal>
                        <div className="section-tag">
                            <span className="tag-text" style={{ color: '#2962ff' }}>Étapes de notre accompagnement</span>
                            <span className="tag-line" style={{ width: '60px', backgroundColor: '#2962ff' }}></span>
                        </div>
                    </Reveal>

                    <Reveal delay="delay-100">
                        <h2 className="process-heading">
                            Un processus simple et structuré pour des <br />
                            résultats concrets et durables.
                        </h2>
                    </Reveal>
                </div>

                {/* Steps Visual */}
                <div className="process-steps-wrapper">
                    {/* Dotted Line Background */}
                    <div className="process-line-bg">
                        <svg width="100%" height="100" viewBox="0 0 1200 100" preserveAspectRatio="none">
                            <path
                                d="M100,50 C300,80 500,20 700,50 S1100,20 1100,50"
                                fill="none"
                                stroke="#cbd5e1"
                                strokeWidth="2"
                                strokeDasharray="8 8"
                                className="process-path"
                            />
                        </svg>
                    </div>

                    <div className="process-steps-grid">
                        {steps.map((step, index) => (
                            <Reveal key={step.id} className="process-step-item" delay={`delay-${index * 200}`}>

                                {/* Icon Bubble */}
                                <div className="step-bubble-wrapper animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                                    <div className="step-number">{step.number}</div>
                                    <div className="step-icon-circle">
                                        <step.icon size={32} strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="step-content">
                                    <h3 className="step-title">{step.title}</h3>
                                    <p className="step-desc">{step.description}</p>

                                    {step.hasLink && (
                                        <a href="/contact" className="step-link">
                                            {step.link} <ChevronRight size={16} />
                                        </a>
                                    )}
                                </div>

                            </Reveal>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
