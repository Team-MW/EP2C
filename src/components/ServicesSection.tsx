import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { services } from '../data/services';

export default function ServicesSection() {
    return (
        <section className="py-24 bg-[#FAFAFA] relative overflow-hidden">
            <div className="container px-6 relative z-10">
                <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
                    
                    {/* Left Side: Text and Button */}
                    <div className="lg:sticky lg:top-32">
                        <Reveal>
                            <div className="inline-flex items-center gap-4 mb-6">
                                <div className="w-10 h-1 bg-[#2962ff]"></div>
                                <span className="font-bold text-gray-900 tracking-wide uppercase text-sm">Services</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-gray-900 leading-tight mb-8">
                                Nous offrons les <br/>
                                <span className="text-[#2962ff]">meilleurs services.</span>
                            </h2>
                            <p className="text-gray-600 mb-10 text-lg leading-relaxed max-w-md">
                                EP2C est un cabinet de conseil spécialisé qui accompagne votre entreprise dans son développement et sa structuration.
                            </p>
                            
                            <Link to="/services" className="inline-flex items-center group shadow-md hover:shadow-lg transition-shadow rounded-r-xl overflow-hidden">
                                <div className="bg-[#0f172a] text-white px-8 py-4 font-semibold text-sm tracking-wide transition-colors group-hover:bg-gray-800">
                                    Tous les services
                                </div>
                                <div className="bg-[#1044A9] text-white p-4 transition-colors group-hover:bg-[#2962ff]">
                                    <svg className="transform transition-transform group-hover:translate-x-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14m-7-7 7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        </Reveal>
                    </div>

                    {/* Right Side: Services Grid */}
                    <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                        {services.map((service, index) => (
                            <Reveal key={service.id} delay={`delay-${(index % 4) * 100}`} className="h-full">
                                <Link to={`/services/${service.slug}`} className="block h-full group">
                                    <div className="bg-white p-8 h-full border-t-4 border-transparent group-hover:border-[#2962ff] shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 rounded-b-xl flex flex-col">
                                        
                                        <div className="w-16 h-16 bg-blue-50/80 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#2962ff] group-hover:text-white transition-colors duration-300 text-[#1044A9]">
                                            <service.icon size={32} strokeWidth={1.5} />
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1044A9] transition-colors">
                                            {service.title}
                                        </h3>
                                        
                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                            {service.description}
                                        </p>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>

                </div>
            </div>
            
            {/* Background geometric pattern */}
            <div className="absolute top-0 left-0 w-1/2 h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1044A9 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        </section>
    );
}
