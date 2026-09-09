import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Reveal from './Reveal';

const avatars = [
    { src: 'https://i.pravatar.cc/150?img=11', size: 'w-24 h-24', pos: 'top-10 left-10', delay: '0s' },
    { src: 'https://i.pravatar.cc/150?img=32', size: 'w-16 h-16', pos: 'top-4 right-20', delay: '0.2s' },
    { src: 'https://i.pravatar.cc/150?img=47', size: 'w-32 h-32', pos: 'top-32 right-0', delay: '0.4s' },
    { src: 'https://i.pravatar.cc/150?img=12', size: 'w-40 h-40', pos: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', delay: '0.1s', featured: true },
    { src: 'https://i.pravatar.cc/150?img=5', size: 'w-20 h-20', pos: 'bottom-20 left-4', delay: '0.3s' },
    { src: 'https://i.pravatar.cc/150?img=60', size: 'w-28 h-28', pos: 'bottom-10 right-24', delay: '0.5s' },
    { src: 'https://i.pravatar.cc/150?img=68', size: 'w-14 h-14', pos: 'bottom-4 left-1/3', delay: '0.6s' },
];

export default function TestimonialsSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    {/* Left: Content */}
                    <div className="space-y-10">
                        <Reveal>
                            <div className="inline-flex items-center gap-4 mb-4">
                                <div className="w-10 h-1 bg-[#2962ff]"></div>
                                <span className="font-bold text-gray-900 tracking-wide uppercase text-sm">Témoignages</span>
                            </div>
                            
                            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 leading-tight">
                                Quelques retours de <br/>
                                <span className="text-[#2962ff]">nos fidèles clients</span>
                            </h2>
                        </Reveal>

                        <Reveal delay="delay-100">
                            <div className="flex gap-1 text-[#1044A9] mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} fill="currentColor" />
                                ))}
                            </div>
                            
                            <p className="text-gray-500 text-lg leading-relaxed italic mb-10 relative">
                                <Quote className="absolute -top-4 -left-6 text-gray-200 opacity-50 transform -scale-x-100" size={60} />
                                <span className="relative z-10">
                                    "Un accompagnement de A à Z, très professionnel et humain à la fois.
                                    Grâce à EP2C, nous avons complètement réorganisé notre service RH
                                    avec des résultats visibles en moins de 6 mois. C'est le meilleur
                                    choix que nous ayons fait."
                                </span>
                            </p>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <img src="https://i.pravatar.cc/150?img=12" alt="Client" className="w-16 h-16 rounded-full object-cover shadow-md" />
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900">Christian B.</h4>
                                        <p className="text-sm text-gray-500">Directeur Général, PME Industrielle</p>
                                    </div>
                                </div>
                                
                                <div className="flex gap-3">
                                    <button className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#1044A9] hover:text-white transition-colors shadow-sm hover:shadow-md">
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#1044A9] hover:text-white transition-colors shadow-sm hover:shadow-md">
                                        <ChevronRight size={24} />
                                    </button>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right: Avatars Cluster */}
                    <div className="relative h-[500px] hidden lg:block">
                        {/* A large soft background blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-80"></div>
                        
                        {avatars.map((avatar, i) => (
                            <div 
                                key={i} 
                                className={`absolute rounded-full border-[6px] border-white shadow-xl overflow-hidden animate-float ${avatar.size} ${avatar.pos} ${avatar.featured ? 'z-20 ring-8 ring-[#2962ff]/10' : 'z-10 grayscale hover:grayscale-0 transition-all duration-500'}`}
                                style={{ animationDelay: avatar.delay }}
                            >
                                <img src={avatar.src} alt="Client avatar" className="w-full h-full object-cover" />
                            </div>
                        ))}
                        
                        {/* Decorative floating social icons */}
                        <div className="absolute top-1/4 left-1/4 w-14 h-14 bg-gradient-to-br from-blue-500 to-[#1044A9] rounded-full shadow-lg flex items-center justify-center text-white z-30 animate-bounce" style={{ animationDelay: '0.2s'}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </div>
                        <div className="absolute bottom-1/4 right-1/4 w-14 h-14 bg-gradient-to-br from-[#2962ff] to-cyan-500 rounded-full shadow-lg flex items-center justify-center text-white z-30 animate-bounce" style={{ animationDelay: '0.7s'}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                        </div>
                    </div>

                </div>
            </div>
            
            {/* Soft decorative blob on bottom left */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
            
            {/* Top right decorative shape */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-400 rounded-full opacity-0"></div> 
            {/* Hidden yellow shape to replicate the yellow dot if we wanted to, but we keep it blue for branding. I'll make a subtle blue one */}
            <div className="absolute top-10 right-20 w-32 h-32 bg-gradient-to-br from-[#2962ff] to-[#1044A9] rounded-full blur-2xl opacity-10"></div>
        </section>
    );
}
