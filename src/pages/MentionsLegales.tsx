import Layout from '../Layout';
import Reveal from '../components/Reveal';

export default function MentionsLegales() {
    return (
        <Layout>
            <div className="bg-gray-50 min-h-screen py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <Reveal>
                        <h1 className="text-4xl font-bold text-[#1044A9] mb-10 font-serif border-b pb-4">Mentions Légales</h1>

                        <div className="space-y-8 text-gray-700 bg-white p-8 rounded-lg shadow-sm">

                            <section>
                                <h2 className="text-2xl font-semibold text-[#2962ff] mb-4">1. Édition du site</h2>
                                <p>
                                    En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site internet <strong>Efficience EP2C</strong> l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :
                                </p>
                                <ul className="list-disc ml-6 mt-2 space-y-1">
                                    <li><strong>Propriétaire du site :</strong> Efficience EP2C</li>
                                    <li><strong>Adresse :</strong> PARC EUREKA, LE GENESIS 97 RUE DE FREYR, 34000 MONTPELLIER</li>
                                    <li><strong>Téléphone :</strong> +33 6 59 24 73 70</li>
                                    <li><strong>Email :</strong> contact@efficience-ep2c.com</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-[#2962ff] mb-4">2. Hébergement</h2>
                                <p>
                                    Le site est hébergé par [Nom de l'hébergeur], dont le siège social est situé [Adresse de l'hébergeur], joignable par téléphone au [Numéro].
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-[#2962ff] mb-4">3. Propriété intellectuelle et contrefaçons</h2>
                                <p>
                                    <strong>Efficience EP2C</strong> est propriétaire des droits de propriété intellectuelle et détient les droits d’usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons.
                                </p>
                                <p className="mt-2">
                                    Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de <strong>Efficience EP2C</strong>.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-[#2962ff] mb-4">4. Limitations de responsabilité</h2>
                                <p>
                                    <strong>Efficience EP2C</strong> ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site.
                                </p>
                                <p className="mt-2">
                                    <strong>Efficience EP2C</strong> décline toute responsabilité quant à l’utilisation qui pourrait être faite des informations et contenus présents sur le site.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-[#2962ff] mb-4">5. CNIL et gestion des données personnelles</h2>
                                <p>
                                    Conformément aux dispositions de la loi 78-17 du 6 janvier 1978 modifiée, l’utilisateur du site dispose d’un droit d’accès, de modification et de suppression des informations collectées. Pour exercer ce droit, envoyez un message à notre Délégué à la Protection des Données.
                                </p>
                            </section>

                            <section className="border-t pt-6 mt-8">
                                <p className="text-sm text-gray-500">
                                    Site développé par <a href="https://microdidact.com" target="_blank" rel="noopener noreferrer" className="text-[#2962ff] hover:underline">Microdidact</a>.
                                </p>
                            </section>

                        </div>
                    </Reveal>
                </div>
            </div>
        </Layout>
    );
}
