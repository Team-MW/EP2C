import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from 'lucide-react';
// We'll use Link later, but for now standard imports
import { Link } from 'react-router-dom';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-cover bg-center z-0 blur-sm opacity-20" style={{ backgroundImage: "url('/hero.png')" }}></div>
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1044A9]/10 to-[#121212]/5"></div>

            <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">

                {/* Header */}
                <div className="bg-[#1044A9] p-8 text-center relative">
                    <Link to="/" className="absolute top-4 left-4 text-white/70 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <h2 className="text-3xl font-serif font-bold text-white mb-2">Efficience</h2>
                    <p className="text-blue-100 text-sm tracking-widest uppercase">Espace Client</p>
                </div>

                {/* Form */}
                <div className="p-8 pt-10">
                    <form className="space-y-6">

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Professionnel</label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2962ff] transition-colors">
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="email"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-lg focus:border-[#2962ff] focus:bg-white outline-none transition-all text-gray-700 font-medium"
                                    placeholder="nom@entreprise.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Mot de passe</label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2962ff] transition-colors">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full pl-10 pr-12 py-3 bg-gray-50 border-2 border-gray-100 rounded-lg focus:border-[#2962ff] focus:bg-white outline-none transition-all text-gray-700 font-medium"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2 cursor-pointer group">
                                <div className="w-4 h-4 border-2 border-gray-300 rounded group-hover:border-[#2962ff] transition-colors relative flex items-center justify-center">
                                    {/* Checkbox state handling would be here */}
                                    {/* <div className="w-2.5 h-2.5 bg-[#2962ff] rounded-[1px]"></div> */}
                                </div>
                                <span className="text-gray-500 group-hover:text-gray-700">Se souvenir de moi</span>
                            </div>
                            <a href="#" className="text-[#2962ff] hover:underline font-medium">Mot de passe oublié ?</a>
                        </div>

                        <button className="w-full bg-[#1044A9] hover:bg-[#0d3685] text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                            SE CONNECTER
                        </button>

                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-400 text-sm">
                            Pas encore de compte ? <a href="#" className="text-[#2962ff] font-bold hover:underline">Nous contacter</a>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
