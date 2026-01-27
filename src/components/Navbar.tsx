import { Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="container navbar-container">
                {/* Navigation Links */}
                <ul className="nav-list">
                    <li className="nav-item active">
                        <Link to="/" className="nav-link">ACCUEIL</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link">À PROPOS</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/services" className="nav-link">SERVICES +</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/blog" className="nav-link">BLOG</Link>
                    </li>
                    <li className="nav-item">
                        <button className="nav-btn-search">
                            <Search size={18} />
                        </button>
                    </li>
                </ul>

                {/* CTA Button */}
                <div className="navbar-cta flex items-center gap-4">
                    <Link to="/login" className="btn-connexion">
                        CONNEXION
                    </Link>
                    <button className="btn-rdv">
                        Prendre RDV
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </nav>
    );
}
