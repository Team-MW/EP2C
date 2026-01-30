import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, ArrowRight, Menu, X, User, ChevronRight, Phone, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => {
        // Simple active check
        if (path === '/' && location.pathname !== '/') return '';
        return location.pathname.startsWith(path) ? 'active' : '';
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navLinks = [
        { path: '/', label: 'ACCUEIL' },
        { path: '/about', label: 'À PROPOS' },
        { path: '/services', label: 'NOS EXPERTISES' },
        { path: '/blog', label: 'ACTUALITÉS' },
    ];

    // Mobile Menu Portal Component
    const MobileMenu = () => {
        if (typeof document === 'undefined') return null;

        return createPortal(
            <div
                className={`fixed inset-0 z-[9999] md:hidden transition-all duration-500 ${isMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none delay-300'
                    }`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Menu Panel */}
                <div
                    className={`absolute right-0 top-0 h-full w-[85%] max-w-[400px] bg-[#0f172a] shadow-2xl transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    {/* Decorative Gradients */}
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

                    <div className="flex flex-col h-full relative z-10">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold tracking-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">EP2C</span>
                            </Link>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
                                aria-label="Close menu"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        {/* Links */}
                        <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-6">
                            <nav className="flex flex-col gap-2">
                                {navLinks.map((link, idx) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`group flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${location.pathname === link.path
                                            ? 'bg-blue-600/20 text-white'
                                            : 'hover:bg-white/10 text-white'
                                            } border border-transparent hover:border-white/10`}
                                        style={{ transitionDelay: `${idx * 50}ms` }}
                                    >
                                        <span className="text-lg font-medium tracking-wide font-serif" style={{ color: '#ffffff' }}>{link.label}</span>
                                        <ChevronRight
                                            size={18}
                                            className={`transition-transform duration-300 ${location.pathname === link.path ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                                                }`}
                                        />
                                    </Link>
                                ))}
                            </nav>

                            {/* Divider */}
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

                            {/* Contact Info */}
                            <div className="space-y-4 px-2">
                                <a href="tel:+33123456789" className="flex items-center gap-4 text-white hover:text-blue-400 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                        <Phone size={18} />
                                    </div>
                                    <span className="text-sm font-semibold" style={{ color: '#ffffff' }}>+33 1 23 45 67 89</span>
                                </a>
                                <div className="flex items-center gap-4 text-white">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                        <MapPin size={18} />
                                    </div>
                                    <span className="text-sm font-semibold" style={{ color: '#ffffff' }}>Paris, France</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer (CTA) */}
                        <div className="p-6 border-t border-white/5 bg-[#0f172a]/50 backdrop-blur-lg mt-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white hover:bg-gray-100 text-[#0f172a] transition-all text-sm font-semibold shadow-lg"
                                >
                                    <User size={16} />
                                    <span>Compte</span>
                                </Link>
                                <Link
                                    to="/prendre-rdv"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 transition-all text-sm font-semibold"
                                >
                                    <span>Rendez-vous</span>
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>,
            document.body
        );
    };

    return (
        <>
            <nav className={`navbar sticky top-0 z-50 bg-[#0f172a]/95 backdrop-blur-md border-b border-white/5 text-white shadow-lg transition-all duration-300 ${scrolled ? 'py-0' : 'py-2'}`}>
                <div className="container navbar-container flex items-center justify-between h-16 md:h-20 px-4">

                    {/* Logo (Visible Mobile & Desktop) */}
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <Link to="/" className="text-2xl font-bold text-white tracking-tight z-[60]">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">EP2C</span>
                        </Link>

                        {/* Mobile Menu Burger */}
                        <button
                            type="button"
                            className="md:hidden p-2 text-white hover:text-blue-400 transition-colors hover:bg-white/10 rounded-lg z-[60]"
                            onClick={toggleMenu}
                            aria-label="Menu"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center justify-between flex-1 pl-12">
                        <ul className="nav-list flex items-center gap-8 text-sm font-semibold tracking-wider text-gray-300">
                            {navLinks.map((link) => (
                                <li key={link.path} className={`relative group ${isActive(link.path)}`}>
                                    <Link to={link.path} className="hover:text-white transition-colors py-2 block">
                                        {link.label}
                                    </Link>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                                </li>
                            ))}
                        </ul>

                        <div className="navbar-cta flex items-center gap-6">
                            <button className="text-white/70 hover:text-white transition-colors">
                                <Search size={20} />
                            </button>
                            <div className="h-6 w-px bg-white/10"></div>

                            <Link to="/login" className="relative group px-5 py-2 overflow-hidden rounded-full border border-white/20 hover:border-blue-500/50 transition-all duration-300">
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <span className="relative text-xs font-bold uppercase tracking-widest text-white group-hover:text-blue-300 transition-colors flex items-center gap-2">
                                    <User size={14} />
                                    Connexion
                                </span>
                            </Link>

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

            <MobileMenu />
        </>
    );
}
