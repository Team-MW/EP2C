import { Facebook, Linkedin, Twitter, Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container footer-grid">

                {/* About */}
                <div className="footer-col about">
                    <h3 className="footer-logo">Efficience EP2C</h3>
                    <p className="footer-desc">
                        Votre partenaire privilégié pour optimiser la performance opérationnelle de votre entreprise à travers des solutions RH et managériales sur mesure.
                    </p>
                    <div className="social-links">
                        <a href="https://www.linkedin.com/company/efficience-ep2c/?originalSubdomain=fr" target="_blank" rel="noopener noreferrer" className="social-icon"><Linkedin size={16} /></a>
                        <a href="#" className="social-icon"><Facebook size={16} /></a>
                        <a href="#" className="social-icon"><Twitter size={16} /></a>
                    </div>
                </div>

                {/* Links */}
                <div className="footer-col links">
                    <h4 className="footer-heading">Liens Rapides</h4>
                    <ul className="footer-list">
                        <li><a href="#">Accueil</a></li>
                        <li><a href="#">À propos de nous</a></li>
                        <li><a href="#">Nos Services</a></li>
                        <li><a href="#">Blog & Actualités</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>

                {/* Services */}
                <div className="footer-col services">
                    <h4 className="footer-heading">Nos Pôles</h4>
                    <ul className="footer-list">
                        <li><a href="#">Coaching Professionnel</a></li>
                        <li><a href="#">Ressources Humaines</a></li>
                        <li><a href="#">Formation</a></li>
                        <li><a href="#">Audit Social</a></li>
                        <li><a href="#">Gestion de Paie</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="footer-col contact">
                    <h4 className="footer-heading">Contactez-nous</h4>
                    <ul className="footer-list contact-list">
                        <li>
                            <MapPin size={18} className="contact-icon" />
                            <span>
                                PARC EUREKA<br />
                                LE GENESIS 97 RUE DE FREYR<br />
                                34000 MONTPELLIER
                            </span>
                        </li>
                        <li>
                            <Phone size={18} className="contact-icon" />
                            <span>+33 6 59 24 73 70</span>
                        </li>
                        <li>
                            <Mail size={18} className="contact-icon" />
                            <span>contact@efficience-ep2c.com</span>
                        </li>
                        <li className="open-hours">
                            <Clock size={18} className="contact-icon" />
                            <span>
                                <strong>Horaires d'ouverture :</strong><br />
                                Du Lundi au Vendredi<br />
                                9H-12H et 14H-18H
                            </span>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="container footer-bottom">
                <p>&copy; 2026 Efficience EP2C. Tous droits réservés.</p>
                <div className="legal-links">
                    <a href="/mentions-legales">Mentions Légales</a>
                    <a href="#">Politique de Confidentialité</a>
                </div>
                <div className="developer-credit">
                    Développé par <a href="https://microdidact.com" target="_blank" rel="noopener noreferrer">Microdidact</a>
                </div>
            </div>
        </footer>
    );
}
