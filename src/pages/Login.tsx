import { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <div className="login-page">

            {/* Left Side - Image & Branding */}
            <div className="login-visual">
                <div className="login-visual-overlay"></div>
                <div className="login-bg-image" style={{ backgroundImage: "url('/hero.png')" }}></div>

                <div className="login-visual-content">
                    <Link to="/" className="back-home-link">
                        <ArrowLeft size={20} /> Retour au site
                    </Link>

                    <div className="visual-text animate-float">
                        <h1 className="visual-heading">Efficience EP2C.</h1>
                        <p className="visual-sub">
                            Accédez à votre espace sécurisé et pilotez votre activité en toute sérénité.
                        </p>
                    </div>

                    <div className="visual-footer">
                        <p>© 2024 Efficience EP2C</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="login-form-container">
                <div className="login-form-wrapper">

                    <div className="form-header">
                        <h2 className="form-title">Bienvenue</h2>
                        <p className="form-subtitle">Veuillez entrer vos coordonnées pour vous connecter.</p>
                    </div>

                    <form className="login-form">

                        <div className="input-group">
                            <label className="input-label">Email</label>
                            <input
                                type="email"
                                className="clean-input"
                                placeholder="votre@email.com"
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Mot de passe</label>
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="clean-input"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="password-toggle-btn"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="form-actions">
                            <div
                                className={`remember-checkbox ${rememberMe ? 'active' : ''}`}
                                onClick={() => setRememberMe(!rememberMe)}
                            >
                                <div className="checkbox-box">
                                    {rememberMe && <Check size={12} strokeWidth={4} />}
                                </div>
                                <span>Se souvenir de moi</span>
                            </div>
                            <a href="#" className="forgot-link">Mot de passe oublié ?</a>
                        </div>

                        <button className="submit-btn">
                            Connexion
                        </button>
                    </form>

                    <div className="form-footer">
                        Vous n'avez pas de compte ? <a href="#" className="register-link">Contactez-nous</a>
                    </div>

                </div>
            </div>

        </div>
    );
}
