import { Phone, Mail, MapPin } from 'lucide-react';

export default function Header() {
    return (
        <header className="site-header">
            <div className="container header-container">
                {/* Logo Section */}
                <a href="/" className="logo-section" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                    <h1 className="logo-title">Efficience</h1>
                    <div className="logo-subtitle">
                        <span>Expertise Paie/RH</span>
                        <span>Conseil & Coaching</span>
                        <span>aux entreprises</span>
                    </div>
                </a>

                {/* Contact Info Section */}
                <div className="contact-section">

                    <div className="contact-item">
                        <div className="icon-circle">
                            <Phone size={20} />
                        </div>
                        <div className="contact-text">
                            <span className="contact-main">+33 6 59 24 73 70</span>
                            <span className="contact-sub">Lundi au Vendredi</span>
                        </div>
                    </div>

                    <div className="separator"></div>

                    <div className="contact-item">
                        <div className="icon-circle">
                            <Mail size={20} />
                        </div>
                        <div className="contact-text">
                            <span className="contact-main">Email :</span>
                            <span className="contact-sub">contact@efficience-ep2c.com</span>
                        </div>
                    </div>

                    <div className="separator"></div>

                    <div className="contact-item">
                        <div className="icon-circle">
                            <MapPin size={20} />
                        </div>
                        <div className="contact-text">
                            <span className="contact-main">Parc Eureka</span>
                            <span className="contact-sub">le Genesis 97 rue de Freyr</span>
                            <span className="contact-sub">34000 Montpellier</span>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
}
