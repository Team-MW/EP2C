import { useState, useEffect } from 'react';
import { Search, ArrowRight, Menu, X, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const isActive = (path: string) => {
        return location.pathname === path ? 'active' : '';
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 text-white shadow-lg transition-all duration-300">
            <div className="container navbar-container flex items-center justify-between h-20 px-4">

                {/* Mobile View: Actions + Burger */}
                <div className="md:hidden flex items-center justify-between w-full gap-3">

                    {/* Left side actions on mobile */}
                    <div className="flex items-center gap-2">
                        <Link
                            to="/login"
                            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2.5 border border-white/30 rounded-full hover:bg-white/10 transition-all hover:border-white/50"
                        >
                            <User size={14} />
                            <span>Client</span>
                        </Link>
                        <Link
                            to="/prendre-rdv"
                            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2.5 bg-gradient-to-r from-[#1044A9] to-[#2962ff] rounded-full shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 transition-all hover:scale-105"
                        >
                            <span>RDV</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>

                    {/* Right side burger */}
                    <button
                        type="button"
                        className="p-2.5 text-white hover:text-blue-400 transition-colors ml-auto hover:bg-white/10 rounded-lg"
                        onClick={toggleMenu}
                        aria-label="Menu"
                    >
                        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`
                    fixed inset-0 bg-[#0f172a]/98 backdrop-blur-xl z-40 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) md:hidden
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                `}>
                    <div className="flex flex-col h-full justify-center items-center p-8 relative">
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white p-2 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <X size={32} />
                        </button>

                        <h2 className="text-3xl font-serif font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 tracking-widest">MENU</h2>

                        <ul className="flex flex-col items-center gap-8 text-xl font-medium tracking-wide">
                            <li className={`nav-item ${isActive('/')}`}>
                                <Link to="/" className="nav-link hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>ACCUEIL</Link>
                            </li>
                            <li className={`nav-item ${isActive('/about')}`}>
                                <Link to="/about" className="nav-link hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>À PROPOS</Link>
                            </li>
                            <li className={`nav-item ${isActive('/services')}`}>
                                <Link to="/services" className="nav-link hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>NOS EXPERTISES</Link>
                            </li>
                            <li className={`nav-item ${isActive('/blog')}`}>
                                <Link to="/blog" className="nav-link hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>ACTUALITÉS</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:flex items-center justify-between w-full">
                    <ul className="nav-list flex items-center gap-10 text-sm font-semibold tracking-wider text-gray-300">
                        <li className={`relative group ${isActive('/')}`}>
                            <Link to="/" className="hover:text-white transition-colors py-2 block">ACCUEIL</Link>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <li className={`relative group ${isActive('/about')}`}>
                            <Link to="/about" className="hover:text-white transition-colors py-2 block">À PROPOS</Link>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <li className={`relative group ${isActive('/services')}`}>
                            <Link to="/services" className="hover:text-white transition-colors py-2 block">NOS EXPERTISES</Link>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <li className={`relative group ${isActive('/blog')}`}>
                            <Link to="/blog" className="hover:text-white transition-colors py-2 block">ACTUALITÉS</Link>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    </ul>

                    <div className="navbar-cta flex items-center gap-6">
                        <button className="text-white/70 hover:text-white transition-colors">
                            <Search size={20} />
                        </button>
                        <div className="h-6 w-px bg-white/10"></div>

                        {/* Redesigned Connexion Button */}
                        <Link to="/login" className="relative group px-5 py-2 overflow-hidden rounded-full border border-white/20 hover:border-blue-500/50 transition-all duration-300">
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="relative text-xs font-bold uppercase tracking-widest text-white group-hover:text-blue-300 transition-colors flex items-center gap-2">
                                <User size={14} />
                                Connexion
                            </span>
                        </Link>

                        {/* Redesigned RDV Button */}
                        <Link to="/prendre-rdv" className="group relative px-6 py-3 bg-gradient-to-r from-[#1044A9] to-[#2962ff] text-white rounded-full font-bold shadow-lg shadow-blue-900/30 overflow-hidden transition-all duration-300 hover:shadow-blue-600/50 hover:scale-105">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
                            <span className="relative flex items-center gap-2 text-sm uppercase tracking-wide">
                                Prendre RDV
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
