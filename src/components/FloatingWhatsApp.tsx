import { useEffect, useState } from 'react';

export default function FloatingWhatsApp() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.querySelector('.site-footer');
            if (!footer) return;

            const footerRect = footer.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Logic to hide only when footer is in view
            if (footerRect.top <= windowHeight) {
                // Optionally, you can make it absolute positioned relative to container to stop it, 
                // but hiding it is cleaner for now as requested "disparait au niveau du footer"
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial state

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <a
            href="https://wa.me/33659247370"
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed z-50 bottom-8 left-8 transition-all duration-500 ease-in-out transform hover:scale-110 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60px',
                height: '60px',
                backgroundColor: '#25D366',
                borderRadius: '50%',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                cursor: 'pointer',
                animation: 'pulse-green 2s infinite' // Custom pulse animation defined in CSS
            }}
            aria-label="Contact on WhatsApp"
        >
            <svg width="35" height="35" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.149.224-.579.73-.709.88-.131.149-.261.168-.486.056-.224-.112-.953-.351-1.815-1.12-.673-.6-1.125-1.34-1.257-1.565-.131-.224-.014-.345.099-.458.101-.101.224-.262.336-.393.112-.131.149-.224.224-.374.075-.149.037-.28-.019-.393-.056-.112-.504-1.214-.69-1.662-.181-.435-.366-.377-.504-.383-.131-.006-.28-.006-.43-.006-.149 0-.393.056-.6.28-.205.225-.786.767-.786 1.871 0 1.104.804 2.17.916 2.32.112.15 1.582 2.415 3.832 3.387 1.536.663 1.85.53 2.168.497.318-.033 1.018-.415 1.168-.816.149-.401.149-.745.105-.816-.045-.075-.168-.112-.393-.224" />
            </svg>
        </a>
    );
}
