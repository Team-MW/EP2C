import React from 'react';

const row1 = [
  'SKF-2408-600x400.jpg',
  'SEGUIN-MOREAU_LOGO_2023_NOIR_RVB.png',
  'rh-paie.jpg',
  'newext-rh.png',
  'Microdidact_Logo (1).png',
  'microdidac_logo.jpg',
  'LOGO-EFC-PNG.png',
];

const row2 = [
  'KWS_SAAT_AG_logo.jpg',
  'fortify.jpg',
  'FINEA_RVB_400x145.jpg',
  'boumedienne.jpeg',
  '1630518882844.jpg',
  '1755682670-61281.png',
  '5f9071e51400007e7263df02.png'
];

const PartnersSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden relative border-t border-gray-100">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Ils nous font confiance</h2>
        <p className="text-gray-500 text-center max-w-2xl mx-auto">
          Découvrez les partenaires et clients qui collaborent avec Efficience EP2C au quotidien.
        </p>
      </div>

      {/* Fade Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      <div className="flex flex-col gap-12 relative">
        {/* Row 1 - Left to Right */}
        <div className="flex w-max gap-8 animate-scroll hover:animation-pause">
          {[...row1, ...row1].map((logo, index) => (
            <div 
              key={`row1-${index}`} 
              className="flex-shrink-0 w-48 h-24 md:w-56 md:h-28 bg-white border border-gray-100 rounded-xl shadow-sm flex items-center justify-center p-4 hover:shadow-md transition-shadow"
            >
              <img 
                src={`/partners/${logo}`} 
                alt={`Partenaire ${index}`} 
                className="max-w-full max-h-full object-contain transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Row 2 - Right to Left */}
        <div className="flex w-max gap-8 animate-scroll-reverse hover:animation-pause">
          {[...row2, ...row2].map((logo, index) => (
            <div 
              key={`row2-${index}`} 
              className="flex-shrink-0 w-48 h-24 md:w-56 md:h-28 bg-white border border-gray-100 rounded-xl shadow-sm flex items-center justify-center p-4 hover:shadow-md transition-shadow"
            >
              <img 
                src={`/partners/${logo}`} 
                alt={`Partenaire ${index}`} 
                className="max-w-full max-h-full object-contain transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
