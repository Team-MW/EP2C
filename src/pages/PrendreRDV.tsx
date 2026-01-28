
import Layout from '../Layout';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { Calendar, Clock, User, CheckCircle } from 'lucide-react';

export default function PrendreRDV() {


    return (
        <Layout>
            <SEO
                title="Prendre Rendez-vous - Contact"
                description="Réservez votre consultation expert Paie & RH. Contactez Efficience EP2C pour un accompagnement personnalisé en France et à l'international."
                keywords="contact EP2C, prendre rdv, devis paie, contact RH, consultant Montpellier"
                url='https://www.efficience-ep2c.com/prendre-rdv'
            />
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(/contact_hero_bg.png)' }}
                ></div>
                <div className="absolute inset-0 bg-black/60 z-1"></div>
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

            {/* Success Notification */}


            {/* Form Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <Reveal>
                            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                                <div className="text-center mb-0">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Réservez votre consultation</h2>
                                    <p className="text-gray-600">Remplissez le formulaire ci-dessous et nous vous recontacterons dans les plus brefs délais</p>
                                </div>

                                <iframe
                                    data-tally-src="https://tally.so/r/1A9jVQ?transparentBackground=1&hideTitle=1"
                                    className="w-full -mt-8"
                                    width="100%"
                                    height="500"
                                    frameBorder="0"
                                    marginHeight={0}
                                    marginWidth={0}
                                    title="Contact form"
                                    style={{ background: 'transparent' }}
                                ></iframe>
                                <script async src="https://tally.so/widgets/embed.js"></script>
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
