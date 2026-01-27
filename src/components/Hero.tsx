export default function Hero() {
    return (
        <section className="hero-section">
            {/* Background Image */}
            <div
                className="hero-bg"
                style={{ backgroundImage: "url('/hero.png')" }}
            ></div>

            {/* Overlay */}
            <div className="hero-overlay"></div>

            {/* Floating Elements - Left Side */}
            <div className="hero-floating-left">
                <div className="vertical-contact">
                    <div className="dash"></div>
                    <span>Contactez-nous</span>
                </div>

                <a href="https://www.linkedin.com/company/efficience-ep2c/?originalSubdomain=fr" target="_blank" rel="noopener noreferrer" className="social-icon-box" style={{ textDecoration: 'none' }}>
                    <span>in</span>
                </a>
            </div>

            {/* Main Content */}
            <div className="container hero-content">

                <div className="carousel-arrows">
                    <span>&gt;&gt;&gt;&gt;&gt;</span>
                </div>

                <h1 className="hero-title">
                    6 pôles pour booster <br />
                    <span className="text-highlight">votre performance 🚀</span> <br />
                    opérationnelle
                </h1>

                <p className="hero-subtitle">
                    Coaching 🧠, RH 👥, formation 🎓, paie 💼, audit 🔎 ou transformation managériale 📈 :
                    Efficience EP2C vous aide à passer à l'étape supérieure.
                </p>

                <button className="btn-solutions">
                    Accédez à nos solutions ✨
                </button>

            </div>

            {/* Carousel Dots */}
            <div className="hero-dots">
                <div className="dot"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
            </div>



        </section>
    );
}
