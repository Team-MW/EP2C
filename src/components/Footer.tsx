import { Facebook, Linkedin, Twitter, Mail, Phone, MapPin, Clock } from 'lucide-react';
import logoImage from '../assets/logo.png';

export default function Footer() {
    return (
        <footer className="bg-[#0f172a] text-gray-300 py-16 text-sm">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* About */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                    <img src={logoImage} alt="Efficience EP2C" className="h-12 w-auto mb-2" />
                    <p className="leading-relaxed opacity-80">
                        Votre partenaire privilégié pour optimiser la performance opérationnelle de votre entreprise à travers des solutions RH et managériales sur mesure.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a href="https://www.linkedin.com/company/efficience-ep2c/?originalSubdomain=fr" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-[#1044A9] transition-colors"><Linkedin size={18} /></a>
                        <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#1044A9] transition-colors"><Facebook size={18} /></a>
                        <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#1044A9] transition-colors"><Twitter size={18} /></a>
                    </div>
                </div>

                {/* Links */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h4 className="text-white font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-1/2 md:after:left-0 after:-translate-x-1/2 md:after:translate-x-0 after:w-8 after:h-0.5 after:bg-[#1044A9]">
                        Liens Rapides
                    </h4>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Accueil</a></li>
                        <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">À propos de nous</a></li>
                        <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Nos Services</a></li>
                        <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Blog & Actualités</a></li>
                        <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Contact</a></li>
                    </ul>
                </div>

                {/* Services */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h4 className="text-white font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-1/2 md:after:left-0 after:-translate-x-1/2 md:after:translate-x-0 after:w-8 after:h-0.5 after:bg-[#1044A9]">
                        Nos Pôles
                    </h4>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Coaching Professionnel</a></li>
                        <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Ressources Humaines</a></li>
                        <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Formation</a></li>
                        <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Audit Social</a></li>
                        <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Gestion de Paie</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h4 className="text-white font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-1/2 md:after:left-0 after:-translate-x-1/2 md:after:translate-x-0 after:w-8 after:h-0.5 after:bg-[#1044A9]">
                        Contactez-nous
                    </h4>
                    <ul className="space-y-4">
                        <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                            <MapPin size={20} className="text-[#1044A9] shrink-0 mt-0.5" />
                            <span>
                                PARC EUREKA<br />
                                LE GENESIS 97 RUE DE FREYR<br />
                                34000 MONTPELLIER
                            </span>
                        </li>
                        <li className="flex flex-col md:flex-row items-center md:items-center gap-3">
                            <Phone size={20} className="text-[#1044A9] shrink-0" />
                            <span className="font-bold tracking-wide">+33 6 59 24 73 70</span>
                        </li>
                        <li className="flex flex-col md:flex-row items-center md:items-center gap-3">
                            <Mail size={20} className="text-[#1044A9] shrink-0" />
                            <span>contact@efficience-ep2c.com</span>
                        </li>
                        <li className="flex flex-col md:flex-row items-center md:items-start gap-3 pt-2 opacity-80 bg-white/5 p-3 rounded-lg w-full md:w-auto">
                            <Clock size={20} className="text-[#1044A9] shrink-0 mt-0.5" />
                            <div className="text-xs">
                                <strong className="text-gray-200 block mb-1">Horaires d'ouverture :</strong>
                                Du Lundi au Vendredi<br />
                                9H-12H et 14H-18H
                            </div>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 mt-16 pt-8">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60">
                    <p>&copy; 2026 Efficience EP2C. Tous droits réservés.</p>
                    <div className="flex gap-6">
                        <a href="/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</a>
                        <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
                    </div>
                    <div className="flex items-center gap-1">
                        Développé par <a href="https://microdidact.com" target="_blank" rel="noopener noreferrer" className="text-[#1044A9] font-bold hover:underline">Microdidact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
