import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { services } from '../data/services';

export default function FeatureBlocks() {
  // Take the top 4 services
  const features = services.slice(0, 4);

  return (
    <section className="relative z-30 -mt-28 sm:-mt-32 md:-mt-36">
      {/* This creates the white background for the bottom half of the blocks */}
      <div className="absolute top-1/2 bottom-0 w-full bg-white -z-10"></div>
      
      <div className="px-4 container mx-auto pb-12 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {features.map((feature, index) => (
          <Reveal key={feature.id} delay={`delay-${index * 100}`} className="h-full">
            <Link 
              to={`/services/${feature.slug}`}
              className="group block relative rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(16,68,169,0.2)] transition-all duration-500 h-full min-h-[220px] flex flex-col justify-between"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${feature.image})` }}
              ></div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/90 to-[#0f172a]/70 z-0 group-hover:from-[#1044A9] group-hover:via-[#1044A9]/90 group-hover:to-[#1044A9]/70 transition-colors duration-500"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between h-full p-8">
                {/* Top Section with Icon */}
                <div>
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-white mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-[#1044A9] border border-white/20">
                    <feature.icon size={28} strokeWidth={2} />
                  </div>
                  <h3 className="text-white text-xl font-bold max-w-[150px] leading-snug drop-shadow-md">
                    {feature.title}
                  </h3>
                </div>

                {/* Background Number */}
                <div className="absolute bottom-2 right-4 text-6xl md:text-7xl font-black text-white/10 group-hover:text-white/20 transition-all duration-500 transform group-hover:scale-110 origin-bottom-right select-none pointer-events-none">
                  {feature.id}
                </div>
              </div>
              
              {/* Animated bottom border */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#2962ff] group-hover:w-full transition-all duration-500 z-20"></div>
            </Link>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );
}
