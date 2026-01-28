import Layout from '../Layout';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
    {
        id: 1,
        title: "Comment optimiser la gestion de la paie en 2026 ?",
        category: "Pôle Paie",
        date: "24 Jan 2026",
        author: "Sarah Martin",
        image: "/service_finance.png",
        excerpt: "Découvrez les nouvelles réglementations et nos conseils pour sécuriser vos bulletins de salaire tout en gagnant du temps."
    },
    {
        id: 2,
        title: "Le management hybride : les clés du succès",
        category: "Management",
        date: "12 Jan 2026",
        author: "Marc Dubois",
        image: "/service_management.png",
        excerpt: "Télétravail et présentiel : comment maintenir la cohésion et la performance de vos équipes dans un environnement flexible ?"
    },
    {
        id: 3,
        title: "Pourquoi l'audit social est indispensable",
        category: "Audit",
        date: "05 Jan 2026",
        author: "Elena Fisher",
        image: "/service_audit.png",
        excerpt: "Anticipez les risques et identifiez les leviers d'amélioration de votre climat social grâce à un diagnostic précis."
    },
    {
        id: 4,
        title: "Coaching de dirigeant : un luxe ou une nécessité ?",
        category: "Coaching",
        date: "20 Dec 2023",
        author: "Jean Alaric",
        image: "/service_coaching.png",
        excerpt: "Prendre du recul pour mieux décider. Découvrez comment le coaching peut transformer votre vision stratégique."
    }
];

export default function Blog() {
    return (
        <Layout>
            <SEO
                title="Blog & Actualités RH"
                description="Suivez toute l'actualité sociale, RH et managériale. Nos conseils d'experts, décryptages réglementaires et tendances pour piloter vos ressources humaines."
                keywords="blog RH, actualité sociale, veille juridique paie, conseils management, tendances RH, expertise sociale"
                url='https://www.efficience-ep2c.com/blog'
            />
            {/* Hero Section */}
            <div className="blog-hero">
                <div className="blog-hero-content">
                    <Reveal>
                        <h1 className="blog-hero-title">Le Blog EP2C 💡</h1>
                        <p className="blog-hero-subtitle">Actualités, conseils d'experts et tendances RH</p>
                    </Reveal>
                </div>
            </div>

            {/* Blog Grid */}
            <section className="blog-section">
                <div className="container">
                    <div className="blog-grid">
                        {blogPosts.map((post, index) => (
                            <Reveal key={post.id} delay={`delay-${index * 100}`}>
                                <article className="blog-card group">
                                    <div className="blog-card-image-wrapper">
                                        <div
                                            className="blog-card-bg"
                                            style={{ backgroundImage: `url('${post.image}')` }}
                                        ></div>
                                        <div className="blog-category-tag">
                                            {post.category}
                                        </div>
                                    </div>
                                    <div className="blog-card-meta">
                                        <div className="meta-item"><Calendar size={14} /> {post.date}</div>
                                        <div className="meta-item"><User size={14} /> {post.author}</div>
                                    </div>
                                    <h2 className="blog-card-title">
                                        {post.title}
                                    </h2>
                                    <p className="blog-card-excerpt">
                                        {post.excerpt}
                                    </p>
                                    <span className="blog-read-more">
                                        Lire l'article <ArrowRight size={16} className="arrow-icon" />
                                    </span>
                                </article>
                            </Reveal>
                        ))}
                    </div>

                    <div className="blog-pagination">
                        <button className="btn-load-more">
                            Charger plus d'articles
                        </button>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
