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
        <nav className="navbar relative z-50 bg-black text-white">
            <div className="container navbar-container flex items-center justify-between h-full px-4">

                {/* Mobile View: Actions + Burger */}
                <div className="md:hidden flex items-center justify-between w-full gap-2">

                    {/* Left side actions on mobile */}
                    <div className="flex items-center gap-2">
                        <Link to="/login" className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-3 py-2 border border-white/20 rounded hover:bg-white/10 transition-colors">
                            <User size={14} />
                            <span>Connexion</span>
                        </Link>
                        <Link to="/prendre-rdv" className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-3 py-2 bg-[#1044A9] rounded hover:bg-[#0d3685] transition-colors">
                            <span>Prendre RDV</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>

                    {/* Right side burger */}
                    <button
                        className="p-2 text-white hover:text-blue-400 transition-colors ml-auto"
                        onClick={toggleMenu}
                        aria-label="Menu"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu Overlay (Contains Navigation Links) */}
                <div className={`
                    fixed inset-0 bg-black/95 backdrop-blur-sm z-40 transform transition-transform duration-300 ease-in-out md:hidden
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                `}>
                    <div className="flex flex-col h-full justify-center items-center p-8 relative">
                        {/* Close button inside overlay */}
                        <button
                            className="absolute top-6 right-6 text-white p-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <X size={32} />
                        </button>

                        <h2 className="text-2xl font-bold mb-12 text-blue-500 tracking-widest">MENU</h2>

                        <ul className="flex flex-col items-center gap-8 text-xl font-medium">
                            <li className={`nav-item ${isActive('/')}`}>
                                <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>ACCUEIL</Link>
                            </li>
                            <li className={`nav-item ${isActive('/about')}`}>
                                <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>À PROPOS</Link>
                            </li>
                            <li className={`nav-item ${isActive('/services')}`}>
                                <Link to="/services" className="nav-link" onClick={() => setIsMenuOpen(false)}>SERVICES +</Link>
                            </li>
                            <li className={`nav-item ${isActive('/blog')}`}>
                                <Link to="/blog" className="nav-link" onClick={() => setIsMenuOpen(false)}>BLOG</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Desktop View: Full Navigation + Actions */}
                <div className="hidden md:flex items-center justify-between w-full">
                    <ul className="nav-list flex items-center gap-8 text-sm lg:text-base font-medium">
                        <li className={`nav-item ${isActive('/')}`}>
                            <Link to="/" className="nav-link">ACCUEIL</Link>
                        </li>
                        <li className={`nav-item ${isActive('/about')}`}>
                            <Link to="/about" className="nav-link">À PROPOS</Link>
                        </li>
                        <li className={`nav-item ${isActive('/services')}`}>
                            <Link to="/services" className="nav-link">SERVICES +</Link>
                        </li>
                        <li className={`nav-item ${isActive('/blog')}`}>
                            <Link to="/blog" className="nav-link">BLOG</Link>
                        </li>
                        <li>
                            <button className="nav-btn-search hover:text-blue-400 transition-colors">
                                <Search size={18} />
                            </button>
                        </li>
                    </ul>

                    <div className="navbar-cta flex items-center gap-4">
                        <Link to="/login" className="btn-connexion">
                            CONNEXION
                        </Link>
                        <Link to="/prendre-rdv" className="btn-rdv">
                            Prendre RDV
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
