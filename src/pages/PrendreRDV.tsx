import { useState } from 'react';
import Layout from '../Layout';
import Reveal from '../components/Reveal';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';

export default function PrendreRDV() {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        entreprise: '',
        service: '',
        date: '',
        heure: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simuler l'envoi
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            setFormData({
                nom: '',
                prenom: '',
                email: '',
                telephone: '',
                entreprise: '',
                service: '',
                date: '',
                heure: '',
                message: ''
            });

            // Masquer le message de succès après 5 secondes
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
        }, 1500);
    };

    return (
        <Layout>
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1044A9] to-[#2563eb]">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'url(/service_hr.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                </div>
                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                    <Reveal>
                        <Calendar size={64} className="mx-auto mb-6" />
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">Prendre Rendez-vous</h1>
                        <p className="text-xl md:text-2xl font-light text-blue-100">
                            Réservez un créneau avec nos experts pour discuter de vos besoins
                        </p>
                    </Reveal>
                </div>
            </div>

            {/* Success Notification */}
            {showSuccess && (
                <div className="fixed top-8 right-8 z-50 animate-in slide-in-from-right duration-500">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 min-w-[320px]">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-lg mb-1">Demande envoyée !</h4>
                            <p className="text-sm text-green-50">Nous vous contacterons rapidement</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Form Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <Reveal>
                            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                                <div className="text-center mb-10">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Réservez votre consultation</h2>
                                    <p className="text-gray-600">Remplissez le formulaire ci-dessous et nous vous recontacterons dans les plus brefs délais</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Nom et Prénom */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <User size={16} className="inline mr-2" />
                                                Nom *
                                            </label>
                                            <input
                                                type="text"
                                                name="nom"
                                                value={formData.nom}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                                placeholder="Votre nom"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <User size={16} className="inline mr-2" />
                                                Prénom *
                                            </label>
                                            <input
                                                type="text"
                                                name="prenom"
                                                value={formData.prenom}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                                placeholder="Votre prénom"
                                            />
                                        </div>
                                    </div>

                                    {/* Email et Téléphone */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <Mail size={16} className="inline mr-2" />
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                                placeholder="votre@email.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <Phone size={16} className="inline mr-2" />
                                                Téléphone *
                                            </label>
                                            <input
                                                type="tel"
                                                name="telephone"
                                                value={formData.telephone}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                                placeholder="+33 6 12 34 56 78"
                                            />
                                        </div>
                                    </div>

                                    {/* Entreprise et Service */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Entreprise
                                            </label>
                                            <input
                                                type="text"
                                                name="entreprise"
                                                value={formData.entreprise}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                                placeholder="Nom de votre entreprise"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Service concerné *
                                            </label>
                                            <select
                                                name="service"
                                                value={formData.service}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            >
                                                <option value="">Sélectionnez un service</option>
                                                <option value="paie">Pôle Paie</option>
                                                <option value="rh">Pôle Ressources Humaines</option>
                                                <option value="conseil">Pôle Conseil</option>
                                                <option value="coaching">Pôle Coaching</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Date et Heure */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <Calendar size={16} className="inline mr-2" />
                                                Date souhaitée *
                                            </label>
                                            <input
                                                type="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleChange}
                                                required
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <Clock size={16} className="inline mr-2" />
                                                Heure souhaitée *
                                            </label>
                                            <select
                                                name="heure"
                                                value={formData.heure}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            >
                                                <option value="">Sélectionnez une heure</option>
                                                <option value="09:00">09:00</option>
                                                <option value="10:00">10:00</option>
                                                <option value="11:00">11:00</option>
                                                <option value="14:00">14:00</option>
                                                <option value="15:00">15:00</option>
                                                <option value="16:00">16:00</option>
                                                <option value="17:00">17:00</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <MessageSquare size={16} className="inline mr-2" />
                                            Message (optionnel)
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                                            placeholder="Décrivez brièvement l'objet de votre rendez-vous..."
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-[#1044A9] to-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Envoi en cours...
                                                </>
                                            ) : (
                                                <>
                                                    <Calendar size={24} />
                                                    Confirmer le rendez-vous
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Reveal>

                        {/* Info Cards */}
                        <div className="grid md:grid-cols-3 gap-6 mt-12">
                            <Reveal delay="delay-100">
                                <div className="bg-white p-6 rounded-xl shadow-md text-center">
                                    <Clock size={40} className="mx-auto mb-4 text-[#1044A9]" />
                                    <h3 className="font-bold text-gray-900 mb-2">Réponse rapide</h3>
                                    <p className="text-gray-600 text-sm">Nous vous recontactons sous 24h</p>
                                </div>
                            </Reveal>
                            <Reveal delay="delay-200">
                                <div className="bg-white p-6 rounded-xl shadow-md text-center">
                                    <User size={40} className="mx-auto mb-4 text-[#1044A9]" />
                                    <h3 className="font-bold text-gray-900 mb-2">Experts dédiés</h3>
                                    <p className="text-gray-600 text-sm">Un consultant spécialisé vous accompagne</p>
                                </div>
                            </Reveal>
                            <Reveal delay="delay-300">
                                <div className="bg-white p-6 rounded-xl shadow-md text-center">
                                    <CheckCircle size={40} className="mx-auto mb-4 text-[#1044A9]" />
                                    <h3 className="font-bold text-gray-900 mb-2">Sans engagement</h3>
                                    <p className="text-gray-600 text-sm">Premier échange gratuit et sans obligation</p>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
