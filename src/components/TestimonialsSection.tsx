import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from './Reveal';

export default function TestimonialsSection() {
    return (
        <section className="testimonials-section">
            {/* Background with overlay */}
            <div className="testimonials-bg" style={{ backgroundImage: "url('/hero.png')" }}></div>
            <div className="testimonials-overlay"></div>

            <div className="container testimonials-container">
                <div className="testimonials-grid">

                    {/* Left Image Group */}
                    <div className="testimonials-image-wrapper">
                        <Reveal delay="delay-100" className="h-full">
                            <div className="client-image-box">
                                {/* Ideally replace with the specific client team image */}
                                <img src="/hero.png" alt="Happy Clients" className="client-img animate-float" />
                            </div>
                        </Reveal>
                    </div>

                    {/* Right Content */}
                    <div className="testimonials-content">
                        <Reveal>
                            <div className="section-tag light">
                                <span className="tag-line"></span>
                                <span className="tag-text">Ils nous font confiance</span>
                            </div>

                            <h2 className="testimonials-heading">
                                Nos clients témoignent de <br />
                                l’impact concret de notre <br />
                                accompagnement.
                            </h2>
                        </Reveal>

                        <Reveal delay="delay-200">
                            <div className="testimonial-card">
                                <Quote className="quote-icon" size={40} />
                                <p className="testimonial-text">
                                    Un accompagnement de A à Z, très professionnel et humain à la fois.
                                    Grâce à EP2C, nous avons complètement réorganisé notre service RH
                                    avec des résultats visibles en moins de 6 mois.
                                </p>

                                <div className="testimonial-author">
                                    <span className="author-name">Christian B.</span>
                                    <span className="author-role">Directeur Général – PME industrielle (France)</span>
                                </div>
                            </div>
                        </Reveal>

                        {/* Navigation */}
                        <Reveal delay="delay-300">
                            <div className="testimonials-nav">
                                <button className="nav-circle prev">
                                    <ChevronLeft size={24} />
                                </button>
                                <button className="nav-circle next">
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </Reveal>

                    </div>
                </div>
            </div>
        </section>
    );
}
