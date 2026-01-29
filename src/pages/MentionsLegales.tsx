import Layout from '../Layout';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';

export default function MentionsLegales() {
    return (
        <Layout>
            <SEO
                title="Mentions Légales"
                description="Mentions légales, politique de confidentialité et conditions d'utilisation du site Efficience EP2C."
                url='https://www.efficience-ep2c.com/mentions-legales'
                keywords=''
            />
            {/* Hero Section */}
            <div className="legal-page-wrapper">
                <div className="container">
                    <Reveal>
                        <h1 className="legal-page-title">Mentions Légales</h1>

                        <div className="legal-content-card">

                            <section className="legal-section">
                                <h2 className="legal-section-title">1. Édition du site</h2>
                                <p className="legal-text">
                                    En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site internet <strong>Efficience EP2C</strong> l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :
                                </p>
                                <ul className="legal-list">
                                    <li><strong>Dénomination sociale :</strong> EP2C GROUP</li>
                                    <li><strong>Forme juridique :</strong> SAS, société par actions simplifiée</li>
                                    <li><strong>Capital social :</strong> 42 939 235,00 €</li>
                                    <li><strong>Adresse du siège :</strong> 4 RUE DE LA TUILERIE, 31130 BALMA</li>
                                    <li><strong>SIREN :</strong> 904 925 724</li>
                                    <li><strong>SIRET (siège) :</strong> 904 925 724 00018</li>
                                    <li><strong>RCS :</strong> 904 925 724 R.C.S. Toulouse</li>
                                    <li><strong>Activité :</strong> Autres activités des services financiers, hors assurance et caisses de retraite, n.c.a.</li>
                                    <li><strong>TVA Intracommunautaire :</strong> FR63904925724</li>
                                    <li><strong>Date de création :</strong> 28/10/2021</li>
                                    <li><strong>Dirigeants :</strong> OGCS PARTNER, CLF HOLDING</li>
                                    <li><strong>Contact :</strong> contact@efficience-ep2c.com / +33 6 59 24 73 70</li>
                                </ul>
                            </section>

                            <section className="legal-section">
                                <h2 className="legal-section-title">2. Hébergement</h2>
                                <p className="legal-text">
                                    Le site est hébergé par [Nom de l'hébergeur], dont le siège social est situé [Adresse de l'hébergeur], joignable par téléphone au [Numéro].
                                </p>
                            </section>

                            <section className="legal-section">
                                <h2 className="legal-section-title">3. Propriété intellectuelle et contrefaçons</h2>
                                <p className="legal-text">
                                    <strong>Efficience EP2C</strong> est propriétaire des droits de propriété intellectuelle et détient les droits d’usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons.
                                </p>
                                <p className="legal-text mt-4">
                                    Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de <strong>Efficience EP2C</strong>.
                                </p>
                            </section>

                            <section className="legal-section">
                                <h2 className="legal-section-title">4. Limitations de responsabilité</h2>
                                <p className="legal-text">
                                    <strong>Efficience EP2C</strong> ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site.
                                </p>
                                <p className="legal-text mt-4">
                                    <strong>Efficience EP2C</strong> décline toute responsabilité quant à l’utilisation qui pourrait être faite des informations et contenus présents sur le site.
                                </p>
                            </section>

                            <section className="legal-section">
                                <h2 className="legal-section-title">5. CNIL et gestion des données personnelles</h2>
                                <p className="legal-text">
                                    Conformément aux dispositions de la loi 78-17 du 6 janvier 1978 modifiée, l’utilisateur du site dispose d’un droit d’accès, de modification et de suppression des informations collectées. Pour exercer ce droit, envoyez un message à notre Délégué à la Protection des Données.
                                </p>
                            </section>

                            <section className="legal-footer">
                                <p className="legal-small-text">
                                    Site développé par <a href="https://microdidact.com" target="_blank" rel="noopener noreferrer" className="microdidact-link">Microdidact</a>.
                                </p>
                            </section>

                        </div>
                    </Reveal>
                </div>
            </div>
        </Layout>
    );
}
