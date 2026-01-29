import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';

export default function Login() {

    return (
        <div className="login-page relative">

            {/* Left Side - Image & s Branding */}
            <div className="login-visual relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#1044A9] rounded-full filter blur-[120px] opacity-30 animate-pulse-slow"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#2962ff] rounded-full filter blur-[100px] opacity-30 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="login-visual-overlay"></div>
                <div className="login-bg-image" style={{ backgroundImage: "url('/hero.png')" }}></div>

                <div className="login-visual-content relative z-10">
                    <Link to="/" className="back-home-link inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all">
                        <ArrowLeft size={20} /> Retour au site
                    </Link>

                    <div className="visual-text animate-float">
                        <h1 className="visual-heading text-5xl md:text-6xl font-bold mb-4 text-white">
                            Efficience <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">EP2C</span>
                        </h1>
                        <p className="visual-sub text-xl text-gray-200">
                            Accédez à votre espace sécurisé et pilotez votre activité en toute sérénité.
                        </p>
                    </div>

                    <div className="visual-footer">
                        <p className="text-white/60">© 2026 Efficience EP2C</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="login-form-container relative">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full filter blur-[120px] opacity-20"></div>

                <div className="login-form-wrapper relative z-10" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>

                    <SignIn
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "shadow-xl border border-gray-100 rounded-2xl",
                                formButtonPrimary: "bg-gradient-to-r from-[#1044A9] to-[#2962ff] hover:shadow-lg transition-all",
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
