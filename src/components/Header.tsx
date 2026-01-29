import { Phone, Mail, MapPin } from 'lucide-react';
import logoImage from '../assets/logo.png';

export default function Header() {
    return (
        <header className="site-header">
            <div className="container header-container">

                {/* Left Contact: Phone & Email - Hidden on Mobile */}
                <div className="contact-group-left hidden md:flex" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
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
                </div>

                {/* Logo Section - Center on all screens */}
                <a
                    href="/"
                    className="logo-section"
                    style={{
                        textDecoration: 'none',
                        cursor: 'pointer',
                        margin: '0 auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <img
                        src={logoImage}
                        alt="Efficience EP2C - Expertise Paie/RH, Conseil & Coaching"
                        className="logo-image"
                        style={{
                            height: '70px',
                            width: 'auto',
                            maxWidth: '100%'
                        }}
                    />
                </a>

                {/* Right Contact: Address - Hidden on Mobile */}
                <div className="contact-group-right hidden md:flex" style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="contact-item">
                        <div className="icon-circle">
                            <MapPin size={20} />
                        </div>
                        <div className="contact-text" style={{ textAlign: 'right', alignItems: 'flex-end' }}>
                            <span className="contact-main">Parc Eureka</span>
                            <span className="contact-sub">le Genesis 97 rue de Freyr, 34000 Montpellier</span>
                        </div>
                    </div>
                </div>

            </div>
        </header>
    );
}
