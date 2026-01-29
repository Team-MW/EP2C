import { Facebook, Linkedin, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/white-min.png';

export default function Footer() {
    return (
        <footer className="bg-[#0f172a] text-gray-300 py-10 text-sm">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* About */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                    <img src={logoImage} alt="Efficience EP2C" className="h-10 w-auto mb-2" />
                    <p className="leading-relaxed opacity-80 text-sm">
                        Votre partenaire privilégié pour optimiser la performance opérationnelle de votre entreprise à travers des solutions RH et managériales sur mesure.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a href="https://www.linkedin.com/company/efficience-ep2c/?originalSubdomain=fr" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-[#1044A9] transition-colors"><Linkedin size={18} /></a>
                        <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#1044A9] transition-colors"><Facebook size={18} /></a>

                    </div>
                </div>

                {/* Links */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h4 className="text-white font-bold text-base mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-1/2 md:after:left-0 after:-translate-x-1/2 md:after:translate-x-0 after:w-8 after:h-0.5 after:bg-[#1044A9]">
                        Liens Rapides
                    </h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-white hover:translate-x-1 transition-all inline-block">Accueil</Link></li>
                        <li><Link to="/about" className="hover:text-white hover:translate-x-1 transition-all inline-block">À propos de nous</Link></li>
                        <li><Link to="/services" className="hover:text-white hover:translate-x-1 transition-all inline-block">Nos Services</Link></li>
                        <li><Link to="/blog" className="hover:text-white hover:translate-x-1 transition-all inline-block">Blog & Actualités</Link></li>
                        <li><Link to="/contact" className="hover:text-white hover:translate-x-1 transition-all inline-block">Contact</Link></li>
                    </ul>
                </div>

                {/* Services */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h4 className="text-white font-bold text-base mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-1/2 md:after:left-0 after:-translate-x-1/2 md:after:translate-x-0 after:w-8 after:h-0.5 after:bg-[#1044A9]">
                        Nos Pôles
                    </h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/services/pole-coaching" className="hover:text-white hover:translate-x-1 transition-all inline-block">Coaching Professionnel</Link></li>
                        <li><Link to="/services/pole-ressources-humaines" className="hover:text-white hover:translate-x-1 transition-all inline-block">Ressources Humaines</Link></li>
                        <li><Link to="/services/pole-formation" className="hover:text-white hover:translate-x-1 transition-all inline-block">Formation</Link></li>
                        <li><Link to="/services/pole-audit" className="hover:text-white hover:translate-x-1 transition-all inline-block">Audit Social</Link></li>
                        <li><Link to="/services/pole-paie" className="hover:text-white hover:translate-x-1 transition-all inline-block">Gestion de Paie</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h4 className="text-white font-bold text-base mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-1/2 md:after:left-0 after:-translate-x-1/2 md:after:translate-x-0 after:w-8 after:h-0.5 after:bg-[#1044A9]">
                        Contactez-nous
                    </h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                            <MapPin size={18} className="text-[#1044A9] shrink-0 mt-0.5" />
                            <span>
                                PARC EUREKA<br />
                                LE GENESIS 97 RUE DE FREYR<br />
                                34000 MONTPELLIER
                            </span>
                        </li>
                        <li className="flex flex-col md:flex-row items-center md:items-center gap-3">
                            <Phone size={18} className="text-[#1044A9] shrink-0" />
                            <a href="tel:+33659247370" className="font-bold tracking-wide hover:text-[#1044A9] transition-colors">+33 6 59 24 73 70</a>
                        </li>
                        <li className="flex flex-col md:flex-row items-center md:items-center gap-3">
                            <Mail size={18} className="text-[#1044A9] shrink-0" />
                            <span>contact@efficience-ep2c.com</span>
                        </li>
                        <li className="flex flex-col md:flex-row items-center md:items-start gap-3 pt-2 opacity-80 bg-white/5 p-2 rounded-lg w-full md:w-auto">
                            <Clock size={18} className="text-[#1044A9] shrink-0 mt-0.5" />
                            <div>
                                <strong className="text-gray-200 block mb-0.5">Horaires :</strong>
                                Du Lundi au Vendredi<br />
                                9H-12H et 14H-18H
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 mt-10 pt-6">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60">

                    <p>&copy; 2026 Efficience EP2C. Tous droits réservés.</p>
                    <div className="flex gap-6">
                        <Link to="/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</Link>
                    </div>
                    <div className="flex items-center gap-1">
                        Développé par <a href="https://microdidact.com" target="_blank" rel="noopener noreferrer" className="text-[#1044A9] font-bold hover:underline">Microdidact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
