import { Users, Target, Play } from 'lucide-react';
import Reveal from './Reveal';

export default function AboutSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
                    
                    {/* Left Column: Image & Blobs */}
                    <Reveal className="relative flex justify-center items-center">
                        {/* Abstract Background Blobs */}
                        <div className="relative w-full max-w-md aspect-square flex items-center justify-center group cursor-pointer">
                            
                            {/* Main Blue Blob SVG */}
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full text-blue-100 transform scale-110 -z-10 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-125">
                                <path fill="currentColor" d="M45.7,-76.4C58.9,-69.3,69,-56.3,77,-42.1C85,-27.9,90.9,-12.4,90.3,2.9C89.7,18.2,82.5,33.3,72.4,45.8C62.2,58.3,49.1,68.2,34.7,74.5C20.3,80.8,4.6,83.5,-10.8,80.7C-26.2,77.9,-41.3,69.5,-53.4,57.7C-65.5,45.9,-74.6,30.8,-79.3,14.3C-84,-2.2,-84.3,-20.1,-76.7,-35.1C-69.1,-50.1,-53.6,-62.1,-38.7,-68.8C-23.8,-75.5,-9.5,-76.9,6.1,-84.4C21.7,-91.9,32.5,-83.5,45.7,-76.4Z" transform="translate(100 100)" />
                            </svg>

                            {/* Decorative Outline Blob */}
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%] text-[#1044A9] opacity-20 -z-20 transform -rotate-12 transition-transform duration-1000 group-hover:-rotate-45 group-hover:scale-110">
                                <path fill="none" stroke="currentColor" strokeWidth="2" d="M41.7,-67.2C54.4,-59.5,65.2,-48.5,73.5,-35.3C81.8,-22.1,87.6,-6.6,85.6,8.2C83.6,23,73.8,37.1,62.1,48.8C50.4,60.5,36.8,69.8,21.8,74.9C6.8,80,-9.6,80.9,-25.1,76.5C-40.6,72.1,-55.2,62.4,-65.4,49.3C-75.6,36.2,-81.4,19.7,-81.6,3.1C-81.8,-13.5,-76.4,-30.2,-66.1,-43.3C-55.8,-56.4,-40.6,-65.9,-26.3,-71.4C-12,-76.9,1.4,-78.4,15.1,-75.8C28.8,-73.2,29,-74.9,41.7,-67.2Z" transform="translate(100 100)" />
                            </svg>

                            {/* Floating decorative elements */}
                            <div className="absolute top-[10%] left-[10%] w-6 h-6 bg-[#2962ff] rounded-full animate-bounce"></div>
                            <div className="absolute bottom-[20%] right-[-5%] w-12 h-12 bg-[#1044A9] rounded-full drop-shadow-lg" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}></div>
                            <div className="absolute top-[40%] right-[5%] text-[#1044A9]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20"/></svg>
                            </div>
                            
                            {/* Grey Sphere */}
                            <div className="absolute bottom-[10%] left-[-10%] w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-xl border border-white/50"></div>

                            {/* Scattered particles on hover */}
                            <div className="absolute top-[20%] left-[20%] w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-x-12 group-hover:-translate-y-12 transition-all duration-700 ease-out delay-100"></div>
                            <div className="absolute bottom-[20%] left-[30%] w-4 h-4 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-x-16 group-hover:translate-y-8 transition-all duration-700 ease-out delay-200"></div>
                            <div className="absolute top-[30%] right-[20%] w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-x-16 group-hover:-translate-y-10 transition-all duration-700 ease-out delay-300"></div>

                            {/* Glowing Rotating Ring */}
                            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#2962ff] via-indigo-400 to-[#1044A9] opacity-0 group-hover:opacity-100 animate-spin-slow blur-xl transition-opacity duration-700 -z-10"></div>
                            <div className="absolute inset-4 rounded-full border-[6px] border-dashed border-blue-200/50 opacity-0 group-hover:opacity-100 animate-[spin_10s_linear_reverse_infinite] transition-opacity duration-700 -z-10 scale-110"></div>

                            {/* User Image Container */}
                            <div className="relative w-[85%] h-[85%] rounded-full overflow-hidden border-8 border-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.15)] z-10 bg-white transition-all duration-700 group-hover:shadow-[0_0_80px_rgba(41,98,255,0.6)] group-hover:scale-[1.05] group-hover:-translate-y-4 group-hover:border-white">
                                
                                {/* Inner glow overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#1044A9]/40 to-transparent mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>
                                
                                <img 
                                    src="/partners/boumedienne.jpeg" 
                                    alt="À propos de EP2C" 
                                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 group-hover:rotate-3"
                                />
                            </div>

                        </div>
                    </Reveal>

                    {/* Right Column: Text Content */}
                    <div className="space-y-8 pl-0 lg:pl-10">
                        
                        {/* Subtitle */}
                        <Reveal>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-1 bg-[#2962ff]"></div>
                                <span className="text-gray-900 font-bold text-lg">À propos de nous</span>
                            </div>
                            
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mt-6 font-serif">
                                Nous offrons toujours les <span className="text-[#2962ff]">meilleures solutions</span>
                            </h2>
                        </Reveal>

                        {/* Drop cap text and video thumbnail */}
                        <Reveal delay="delay-100">
                            <div className="flex flex-col sm:flex-row gap-8 items-start">
                                <div className="flex-1 relative">
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        <span className="float-left text-6xl font-bold text-[#1044A9] leading-[0.8] mr-3 mt-1 font-serif">E</span>
                                        P2C a été optimisé pour vous offrir la meilleure expérience en matière d'accompagnement RH, de gestion de la paie et de formation. Nous créons des stratégies sur-mesure pour votre succès.
                                    </p>
                                </div>
                                
                                {/* Video Thumbnail Mockup */}
                                <div className="w-40 h-28 flex-shrink-0 bg-gray-200 rounded-xl overflow-hidden relative shadow-md group cursor-pointer">
                                    <img src="/service_hr.png" alt="Video thumbnail" className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                        <div className="w-10 h-10 bg-[#2962ff] rounded-full flex items-center justify-center pl-1 group-hover:bg-[#1044A9] transition-colors">
                                            <Play className="text-white w-5 h-5 fill-current" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        <div className="h-px w-full bg-gray-100 my-8"></div>

                        {/* Features Icons */}
                        <Reveal delay="delay-200">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="flex items-center gap-4">
                                    <div className="text-[#2962ff]">
                                        <Users size={48} strokeWidth={1.5} />
                                    </div>
                                    <span className="font-bold text-gray-900 text-lg leading-tight">
                                        Équipe<br/>d'experts
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-[#2962ff]">
                                        <Target size={48} strokeWidth={1.5} />
                                    </div>
                                    <span className="font-bold text-gray-900 text-lg leading-tight">
                                        Solutions<br/>innovantes
                                    </span>
                                </div>
                            </div>
                        </Reveal>

                    </div>
                </div>
            </div>
        </section>
    );
}
