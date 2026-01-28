import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';

export default function Login() {

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
                        <p>© 2026 Efficience EP2C</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="login-form-container">
                <div className="login-form-wrapper" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>

                    <SignIn
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "shadow-none border-none",
                                formButtonPrimary: "bg-[#1044A9] hover:bg-[#0d3685]",
                                footerActionLink: "text-[#1044A9] hover:text-[#0d3685]"
                            }
                        }}
                        signUpUrl="/contact"
                        afterSignInUrl="/panel"
                    />

                </div>
            </div>

        </div>
    );
}
