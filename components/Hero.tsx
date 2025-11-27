import React from 'react';
import { ArrowRight, Calendar, MapPin, Clock, Users } from 'lucide-react';

export const Hero: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-950">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=2500&auto=format&fit=crop" 
          alt="Stadium Atmosphere" 
          className="w-full h-full object-cover animate-hero-zoom origin-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/50 to-transparent opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-3xl">
          {/* New Badge: Next Match Teaser */}
          <div 
            onClick={() => onNavigate('matches')}
            className="inline-flex items-center gap-2 md:gap-3 bg-stone-900/90 backdrop-blur-md border border-stone-800 rounded-2xl md:rounded-full p-1.5 pr-3 md:pr-5 cursor-pointer hover:border-glama-primary/50 transition-all duration-300 group opacity-0 animate-hero-fade-up [animation-delay:200ms] mb-8 shadow-2xl flex-col md:flex-row items-start md:items-center"
          >
              <div className="flex w-full md:w-auto items-center gap-2">
                 {/* Label */}
                <span className="bg-glama-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-glama-primary/20 shrink-0 self-start md:self-auto">
                    Next Match
                </span>
                {/* Mobile Time (Visible only on mobile next to label) */}
                 <div className="md:hidden flex items-center gap-1.5 text-glama-light text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ml-auto">
                    <Clock size={10} />
                    <span>Sat 18:00</span>
                </div>
              </div>

              {/* Matchup Visuals */}
              <div className="flex items-center gap-2 sm:gap-3 px-1 md:px-0">
                  {/* Home */}
                  <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-glama-primary flex items-center justify-center text-[8px] font-bold text-white ring-2 ring-stone-950 border border-glama-light/20 shadow-lg shadow-glama-primary/20">
                          FKG
                      </div>
                      <span className="hidden sm:block text-xs font-bold text-white uppercase tracking-wide">FK Glama</span>
                  </div>

                  {/* VS */}
                  <span className="text-[10px] font-black text-stone-600 uppercase">VS</span>

                  {/* Away */}
                  <div className="flex items-center gap-2">
                       <span className="hidden sm:block text-xs font-bold text-stone-400 uppercase tracking-wide group-hover:text-white transition-colors">FK Meteor</span>
                       <div className="w-6 h-6 rounded-full bg-stone-800 flex items-center justify-center text-[8px] font-bold text-stone-400 ring-2 ring-stone-950 border border-stone-700">
                          FKM
                      </div>
                  </div>
              </div>

              {/* Divider (Desktop Only) */}
              <div className="hidden md:block w-px h-3 bg-stone-800 mx-1"></div>

              {/* Time (Desktop Only) */}
              <div className="hidden md:flex items-center gap-1.5 text-glama-light text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                  <Clock size={12} />
                  <span>Sat 18:00</span>
              </div>
          </div>
          
          <h1 className="font-display font-bold text-6xl md:text-8xl text-white leading-[0.9] mb-6 uppercase drop-shadow-2xl opacity-0 animate-hero-fade-up [animation-delay:400ms]">
            Pride of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-glama-light via-glama-primary to-glama-accent">The Hill</span>
          </h1>
          
          <p className="text-lg md:text-xl text-stone-300 mb-10 max-w-xl leading-relaxed opacity-0 animate-hero-fade-up [animation-delay:600ms]">
            Join the passion. Feel the energy. Support FK Glama as we climb to new heights this season.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-hero-fade-up [animation-delay:800ms]">
            <button 
                onClick={() => onNavigate('matches')}
                className="bg-glama-primary text-white px-8 py-4 rounded-sm font-display font-bold text-xl uppercase tracking-wider hover:bg-glama-light hover:text-glama-dark hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-glama-primary/20"
            >
              Match Center <ArrowRight size={20} />
            </button>
            <button 
                 onClick={() => onNavigate('squad')}
                 className="border border-white/20 bg-white/5 backdrop-blur-md text-white px-8 py-4 rounded-sm font-display font-bold text-xl uppercase tracking-wider hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Meet the Squad <Users size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-2 bg-gradient-to-l from-glama-accent to-glama-primary"></div>
    </div>
  );
};