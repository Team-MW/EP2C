import { useEffect, useState } from 'react';
import Layout from '../Layout';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { Calendar, Clock, User, CheckCircle } from 'lucide-react';

const JOTFORM_ID = '262514688940365';
const CALENDLY_URL = 'https://calendly.com/ep2c/30min';

export default function PrendreRDV() {
    const [calendlyReady, setCalendlyReady] = useState(false);

    useEffect(() => {
        const scriptId = 'calendly-widget-js';
        if (document.getElementById(scriptId)) {
            setCalendlyReady(true);
            return;
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        const markReady = () => setCalendlyReady(true);
        script.onload = markReady;
        script.onerror = markReady;
        document.body.appendChild(script);

        const timeoutId = window.setTimeout(markReady, 4000);
        return () => window.clearTimeout(timeoutId);
    }, []);

    return (
        <Layout>
            <SEO
                title="Prendre Rendez-vous - Contact"
                description="Réservez votre consultation expert Paie & RH. Contactez Efficience EP2C pour un accompagnement personnalisé en France et à l'international."
                keywords="contact EP2C, prendre rdv, devis paie, contact RH, consultant Montpellier"
                url="https://www.efficience-ep2c.com/prendre-rdv"
            />

            <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(/contact_hero_bg.png)' }}
                />
                <div className="absolute inset-0 bg-black/60 z-[1]" />
                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                    <Reveal>
                        <Calendar size={64} className="mx-auto mb-6" />
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">Prendre Rendez-vous</h1>
                        <p className="text-xl md:text-2xl font-light text-gray-200">
                            Réservez un créneau avec nos experts pour discuter de vos besoins
                        </p>
                    </Reveal>
                </div>
            </div>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Pas de Reveal ici : sinon Calendly/JotForm restent en opacity:0 */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Réservez votre consultation</h2>
                                <p className="text-gray-600">
                                    Choisissez un créneau ci-dessous et nous vous confirmerons le rendez-vous
                                </p>
                            </div>

                            {!calendlyReady && (
                                <div className="flex flex-col items-center justify-center py-16">
                                    <div className="w-12 h-12 border-4 border-gray-100 border-t-[#2962ff] rounded-full animate-spin mb-4" />
                                    <p className="text-gray-500 font-medium text-sm animate-pulse">
                                        Chargement du calendrier...
                                    </p>
                                </div>
                            )}

                            <div
                                className="calendly-inline-widget w-full"
                                data-url={CALENDLY_URL}
                                style={{
                                    minWidth: '320px',
                                    height: '700px',
                                    display: calendlyReady ? 'block' : 'none',
                                }}
                            />

                            <div className="mt-16 text-center mb-8 border-t border-gray-100 pt-16">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Questionnaire de découverte</h2>
                                <p className="text-gray-600">
                                    Pour mieux comprendre votre besoin, vous pouvez remplir ce questionnaire
                                </p>
                            </div>

                            <iframe
                                id={`JotFormIFrame-${JOTFORM_ID}`}
                                title="Questionnaire de découverte EP2C"
                                allow="geolocation; microphone; camera; fullscreen"
                                src={`https://form.jotform.com/${JOTFORM_ID}`}
                                className="w-full border-0 rounded-xl bg-white"
                                style={{ minHeight: '1100px', width: '100%' }}
                            />
                        </div>

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
