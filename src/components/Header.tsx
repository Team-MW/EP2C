import { Phone, Mail, MapPin } from 'lucide-react';
import logoImage from '../assets/logo.png';

export default function Header() {
    return (
        <header className="site-header hidden md:block">
            <div className="container header-container">

                {/* Left Contact: Phone & Email - Hidden on Mobile */}
                <div className="contact-group-left hidden md:flex" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div className="contact-item">
                        <div className="icon-circle">
                            <Phone size={20} />
                        </div>
                        <div className="contact-text">
                            <a href="tel:+33659247370" className="contact-main no-underline hover:text-blue-600 transition-colors cursor-pointer">+33 6 59 24 73 70</a>
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
                            <a href="mailto:contact@efficience-ep2c.com" className="contact-sub no-underline hover:text-blue-600 transition-colors cursor-pointer">contact@efficience-ep2c.com</a>
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
                        <a href="https://maps.google.com/?q=Parc+Eureka+le+Genesis+97+rue+de+Freyr,+34000+Montpellier" target="_blank" rel="noopener noreferrer" className="contact-text no-underline hover:text-blue-600 transition-colors cursor-pointer" style={{ textAlign: 'right', alignItems: 'flex-end', display: 'flex', flexDirection: 'column' }}>
                            <span className="contact-main">Parc Eureka</span>
                            <span className="contact-sub">le Genesis 97 rue de Freyr, 34000 Montpellier</span>
                        </a>
                    </div>
                </div>

            </div>
        </header>
    );
}
