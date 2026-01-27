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
                    <span className="text-highlight">votre performance</span> <br />
                    opérationnelle
                </h1>

                <p className="hero-subtitle">
                    Coaching, RH, formation, paie, audit ou transformation managériale :
                    Efficience EP2C vous aide à passer à l'étape supérieure.
                </p>

                <button className="btn-solutions">
                    Accédez à nos solutions
                </button>

            </div>

            {/* Carousel Dots */}
            <div className="hero-dots">
                <div className="dot"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
            </div>

            {/* WhatsApp Button */}
            <div className="hero-whatsapp">
                <div className="whatsapp-circle">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382C17.112 14.202 15.344 13.332 15.013 13.212C14.685 13.092 14.445 13.032 14.205 13.392C13.965 13.752 13.275 14.562 13.065 14.802C12.855 15.042 12.645 15.072 12.285 14.892C11.925 14.712 10.765 14.332 9.388 13.105C8.303 12.139 7.57 10.945 7.36 10.585C7.15 10.225 7.338 10.03 7.519 9.85C7.679 9.691 7.875 9.436 8.055 9.226C8.235 9.016 8.295 8.866 8.415 8.626C8.535 8.386 8.475 8.176 8.385 7.996C8.295 7.816 7.605 6.115 7.311 5.42C7.03 4.752 6.741 4.842 6.541 4.842H5.971C5.761 4.842 5.431 4.922 5.161 5.222C4.891 5.522 4.125 6.242 4.125 7.712C4.125 9.182 5.176 10.602 5.326 10.802C5.476 11.002 7.427 14.072 10.457 15.392C12.518 16.291 13.328 16.142 14.158 16.032C15.088 15.909 17.112 14.825 17.532 13.645C17.952 12.465 17.952 11.445 17.892 11.345C17.832 11.245 17.652 11.185 17.292 11.005H17.472V14.382Z" />
                    </svg>
                </div>
            </div>

        </section>
    );
}
