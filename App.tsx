
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { PLAYERS, MATCHES, NEWS, LEAGUE_TABLE } from './constants';
import { ArrowRight, Calendar, MapPin, User, ChevronRight, ShoppingBag, Shirt, TrendingUp, Users, Trophy, Target, Mountain, Filter, Clock, Ticket, Award, Briefcase, GraduationCap, ClipboardCheck, Timer, Play, PlayCircle, Video, Brain, Zap, Heart, Footprints } from 'lucide-react';

// --- Helpers ---

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .slice(0, 3)
        .toUpperCase();
};

// --- Sub-Components ---

const SectionHeader: React.FC<{ title: string; subtitle: string; light?: boolean }> = ({ title, subtitle, light = false }) => (
  <div className="mb-12 text-center">
    <h3 className={`font-bold tracking-widest uppercase text-sm mb-2 ${light ? 'text-glama-light' : 'text-glama-primary'}`}>{subtitle}</h3>
    <h2 className={`text-4xl md:text-5xl font-display font-bold uppercase ${light ? 'text-white' : 'text-stone-900'}`}>{title}</h2>
    <div className={`h-1 w-24 mx-auto mt-4 ${light ? 'bg-glama-light' : 'bg-glama-primary'}`}></div>
  </div>
);

const MatchCard: React.FC<{ match: typeof MATCHES[0]; variant?: 'default' | 'compact' }> = ({ match, variant = 'default' }) => (
  <div className="bg-stone-900/80 backdrop-blur border border-stone-800 rounded-xl overflow-hidden hover:border-glama-primary transition-all duration-300 group shadow-lg">
    <div className="bg-stone-950/50 p-3 flex justify-between items-center text-xs text-stone-400 uppercase tracking-wider border-b border-stone-800">
      <span>{match.competition}</span>
      <span className={`font-bold ${match.status === 'Upcoming' ? 'text-glama-light' : 'text-stone-500'}`}>{match.status}</span>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        {/* Home */}
        <div className="flex flex-col items-center flex-1">
             {match.isHome ? (
                 <div className="w-16 h-16 bg-glama-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-glama-primary/20 mb-3 border-2 border-glama-light/20">FKG</div>
             ) : (
                <div className="w-16 h-16 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 font-bold text-xl border-2 border-stone-700 mb-3 group-hover:bg-stone-700 group-hover:text-white transition-colors">
                    {getInitials(match.opponent)}
                </div>
             )}
             <span className="text-white font-display font-bold text-lg text-center leading-tight">{match.isHome ? 'FK Glama' : match.opponent}</span>
        </div>

        {/* Score/Time */}
        <div className="mx-4 flex flex-col items-center justify-center">
            {match.status === 'Played' ? (
                <div className="bg-stone-900 px-5 py-3 rounded-lg border border-stone-800 shadow-inner">
                    <span className="text-3xl font-display font-bold text-white tracking-widest">{match.score}</span>
                </div>
            ) : (
                <div className="bg-stone-900 px-4 py-2 rounded-lg border border-stone-800 flex flex-col items-center min-w-[100px] shadow-inner">
                    <span className="text-xl font-display font-bold text-white">{match.time}</span>
                    <span className="text-xs text-glama-light">{new Date(match.date).toLocaleDateString('en-GB', {day: '2-digit', month: 'short'})}</span>
                </div>
            )}
        </div>

        {/* Away */}
        <div className="flex flex-col items-center flex-1">
             {!match.isHome ? (
                 <div className="w-16 h-16 bg-glama-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-glama-primary/20 mb-3 border-2 border-glama-light/20">FKG</div>
             ) : (
                 <div className="w-16 h-16 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 font-bold text-xl border-2 border-stone-700 mb-3 group-hover:bg-stone-700 group-hover:text-white transition-colors">
                    {getInitials(match.opponent)}
                </div>
             )}
             <span className="text-white font-display font-bold text-lg text-center leading-tight">{!match.isHome ? 'FK Glama' : match.opponent}</span>
        </div>
      </div>
      <div className="text-center">
         <div className="inline-flex items-center gap-1 text-xs text-stone-500 uppercase tracking-wider">
            <MapPin size={12} className="text-glama-primary" />
            {match.isHome ? 'Glama Hill Arena' : 'Away Ground'}
         </div>
      </div>
    </div>
  </div>
);

const PlayerCard: React.FC<{ player: typeof PLAYERS[0] }> = ({ player }) => (
  <div className="group relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 shadow-xl transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-glama-primary/20 hover:-translate-y-2">
    {/* Background Pattern/Watermark */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-stone-800/50 to-stone-950/0 z-0"></div>
    <div className="absolute -top-10 -right-10 text-[180px] font-display font-bold text-stone-800/30 select-none z-0 leading-none group-hover:text-stone-700/30 transition-colors duration-500">
        {player.number}
    </div>

    {/* Player Image */}
    <img 
        src={player.image} 
        alt={player.name} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 z-10 filter grayscale-[20%] group-hover:grayscale-0" 
    />
    
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent z-20 opacity-90"></div>

    {/* Content */}
    <div className="absolute inset-0 z-30 flex flex-col justify-end p-6">
        <div>
            <div className="flex justify-between items-end mb-1">
                 <h3 className="text-3xl font-display font-bold text-white uppercase leading-none drop-shadow-md">
                    <span className="text-glama-primary text-4xl mr-1">{player.number}</span>
                    {player.name}
                 </h3>
            </div>
            <div className="flex items-center gap-3 mb-4">
                 <span className="bg-white/10 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
                    {player.position}
                 </span>
                 <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold border-l border-stone-600 pl-3">
                    {player.nationality}
                 </span>
            </div>
            
            {/* Stats Reveal */}
            <div className="grid grid-cols-2 gap-2 overflow-hidden transition-all duration-500 ease-out max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100">
                <div className="bg-stone-950/80 backdrop-blur p-2 rounded border border-stone-800 text-center">
                    <span className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">Apps</span>
                    <span className="font-display font-bold text-white text-xl">{player.apps}</span>
                </div>
                <div className="bg-stone-950/80 backdrop-blur p-2 rounded border border-stone-800 text-center">
                    <span className="block text-[10px] text-stone-500 uppercase tracking-widest mb-1">Goals</span>
                    <span className="font-display font-bold text-white text-xl">{player.goals}</span>
                </div>
            </div>
        </div>
    </div>
  </div>
);

const NewsCard: React.FC<{ news: typeof NEWS[0] }> = ({ news }) => (
    <article className="group cursor-pointer h-full flex flex-col">
        <div className="relative overflow-hidden rounded-xl aspect-video mb-4 shadow-lg">
            <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            <div className="absolute top-4 left-4 bg-glama-primary text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-widest">
                {news.category}
            </div>
        </div>
        <div className="flex items-center gap-2 text-stone-500 text-xs mb-2 uppercase tracking-wide">
            <Calendar size={12} />
            {news.date}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-glama-light transition-colors line-clamp-2">{news.title}</h3>
        <p className="text-stone-400 text-sm line-clamp-2 mb-4 flex-grow">{news.summary}</p>
        <div className="mt-auto flex items-center text-glama-light text-sm font-bold uppercase tracking-wider gap-1 group-hover:gap-2 transition-all">
            Read More <ArrowRight size={14} />
        </div>
    </article>
);

const ManagementCard = ({ role, name, bio }: { role: string, name: string, bio: string }) => (
  <div className="relative bg-stone-900 border border-stone-800 p-8 md:p-10 rounded-2xl group hover:border-glama-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-glama-primary/10 hover:-translate-y-2 overflow-hidden h-full">
    {/* Decorative BG */}
    <div className="absolute top-0 right-0 w-40 h-40 bg-glama-primary/5 rounded-full blur-3xl group-hover:bg-glama-primary/10 transition-colors pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-stone-800/20 rounded-full blur-2xl pointer-events-none"></div>
    
    <div className="relative z-10 flex flex-col items-center text-center h-full">
        {/* Avatar Placeholder */}
        <div className="w-28 h-28 mb-8 relative">
             <div className="absolute inset-0 bg-stone-800/50 rounded-full border-2 border-stone-700 group-hover:border-glama-primary transition-colors duration-500 flex items-center justify-center shadow-inner">
                <User size={48} className="text-stone-500 group-hover:text-white transition-colors duration-300" />
             </div>
             {/* Role Icon Overlay */}
             <div className="absolute -bottom-2 -right-2 bg-stone-900 border border-stone-700 p-2 rounded-full text-glama-primary group-hover:scale-110 transition-transform">
                <Briefcase size={16} />
             </div>
        </div>
        
        <div className="mb-6 flex-grow">
             <span className="inline-block px-4 py-1.5 bg-glama-primary/10 text-glama-primary text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-4 border border-glama-primary/20 group-hover:bg-glama-primary group-hover:text-white transition-colors duration-300">
                {role}
             </span>
             <h3 className="text-3xl md:text-4xl font-display font-bold text-white uppercase leading-none mb-4 group-hover:text-glama-light transition-colors">{name}</h3>
             <div className="w-16 h-1 bg-stone-800 rounded-full mx-auto group-hover:w-24 group-hover:bg-glama-primary transition-all duration-500"></div>
        </div>
        
        <p className="text-stone-400 leading-relaxed text-sm md:text-base max-w-sm mx-auto border-t border-stone-800/50 pt-6 mt-auto">
            {bio}
        </p>
    </div>
  </div>
);

const LeagueTableWidget = () => (
    <div className="bg-stone-900 rounded-xl overflow-hidden border border-stone-800 h-full flex flex-col shadow-xl">
      <div className="bg-stone-950 p-4 border-b border-stone-800 flex justify-between items-center">
         <h3 className="font-display font-bold text-xl text-white uppercase flex items-center gap-2">
            <TrendingUp size={20} className="text-glama-primary" /> Standings
         </h3>
         <span className="text-xs text-stone-500 font-mono">MD 18</span>
      </div>
      <div className="flex-grow">
          <table className="w-full text-sm text-left">
             <thead className="text-xs text-stone-500 uppercase bg-stone-950/50">
               <tr>
                 <th className="px-4 py-3">Pos</th>
                 <th className="px-4 py-3">Club</th>
                 <th className="px-4 py-3 text-center">Pl</th>
                 <th className="px-4 py-3 text-center">Pts</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-stone-800">
               {LEAGUE_TABLE.map((team) => (
                  <tr key={team.pos} className={`transition-colors ${team.name === 'FK Glama' ? 'bg-glama-primary/10' : 'hover:bg-white/5'}`}>
                     <td className="px-4 py-3 font-bold text-stone-500">{team.pos}</td>
                     <td className="px-4 py-3 font-semibold text-white flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${team.name === 'FK Glama' ? 'bg-glama-light' : 'bg-stone-700'}`}></span>
                        {team.name}
                     </td>
                     <td className="px-4 py-3 text-center text-stone-500">{team.played}</td>
                     <td className="px-4 py-3 text-center font-bold text-white">{team.pts}</td>
                  </tr>
               ))}
             </tbody>
          </table>
      </div>
      <div className="p-3 text-center border-t border-stone-800 bg-stone-950">
         <button className="text-xs text-glama-light font-bold uppercase tracking-wider hover:text-white transition flex items-center justify-center gap-1 w-full">
            Full Table <ChevronRight size={12} />
         </button>
      </div>
    </div>
  );

const GlamaTVSection: React.FC = () => {
    const videos = [
        {
            id: 1,
            title: "Highlights: FK Glama vs FK Meteor",
            duration: "10:24",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop",
            featured: true
        },
        {
            id: 2,
            title: "Inside Training: Rondo Session",
            duration: "04:15",
            image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=800&auto=format&fit=crop",
            featured: false
        },
        {
            id: 3,
            title: "Tunnel Cam: The Pre-Match Roar",
            duration: "06:30",
            image: "https://images.unsplash.com/photo-1516733968668-dbdce39c4651?q=80&w=800&auto=format&fit=crop",
            featured: false
        }
    ];

    return (
        <section className="bg-stone-900 py-16 md:py-24 border-t border-stone-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-glama-dark/50 to-transparent pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12">
                     <div className="w-full md:w-auto">
                        <h3 className="text-glama-primary font-bold tracking-widest uppercase text-xs md:text-sm mb-2 flex items-center gap-2">
                             <Video size={16} /> Glama TV
                        </h3>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase leading-none">Access All Areas</h2>
                     </div>
                     <button className="mt-6 md:mt-0 w-full md:w-auto justify-center text-white border border-stone-700 hover:bg-stone-800 px-6 py-2 rounded-full font-bold uppercase tracking-wider text-xs md:text-sm transition-colors flex items-center gap-2">
                         View Channel <ChevronRight size={16} />
                     </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Featured Video (Large) */}
                    <div className="lg:col-span-2 group cursor-pointer relative rounded-2xl overflow-hidden aspect-video shadow-2xl border border-stone-800">
                         <img src={videos[0].image} alt={videos[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                         <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent"></div>
                         
                         <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 md:w-20 md:h-20 bg-glama-primary/90 rounded-full flex items-center justify-center text-white backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 shadow-[0_0_40px_rgba(21,128,61,0.5)]">
                                  <Play fill="white" className="ml-1" size={24} />
                              </div>
                         </div>

                         <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                              <span className="inline-block px-2 py-1 md:px-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest rounded mb-2 md:mb-3">Featured</span>
                              <h3 className="text-2xl md:text-3xl font-display font-bold text-white uppercase mb-2 leading-none">{videos[0].title}</h3>
                              <div className="flex items-center gap-4 text-stone-400 text-sm font-medium">
                                  <span className="flex items-center gap-1"><Clock size={14} /> {videos[0].duration}</span>
                                  <span>•</span>
                                  <span>Yesterday</span>
                              </div>
                         </div>
                    </div>

                    {/* Side Videos - Flex col on desktop, grid on tablet, flex col on mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col gap-4 md:gap-8">
                        {videos.slice(1).map((video) => (
                            <div key={video.id} className="group cursor-pointer relative flex-1 rounded-2xl overflow-hidden border border-stone-800 shadow-xl aspect-video lg:aspect-auto">
                                <img src={video.image} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-70 group-hover:opacity-100" />
                                <div className="absolute inset-0 bg-stone-950/60 group-hover:bg-stone-950/40 transition-colors"></div>
                                
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md group-hover:bg-glama-primary group-hover:border-glama-primary transition-all duration-300">
                                        <Play fill="white" className="ml-1" size={14} />
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 p-4 md:p-5 w-full bg-gradient-to-t from-stone-950 to-transparent">
                                    <h4 className="font-display font-bold text-lg md:text-xl text-white uppercase mb-1 leading-tight line-clamp-2 group-hover:text-glama-light transition-colors">{video.title}</h4>
                                    <span className="text-stone-400 text-xs font-bold flex items-center gap-1"><Clock size={10} /> {video.duration}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Pages ---

const HomePage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => (
  <div className="animate-in fade-in duration-500 bg-black">
    <Hero onNavigate={onNavigate} />
    
    {/* Latest Result & Next Match Section - THEME UPDATED: Textured Dark Stone */}
    <section className="py-24 relative overflow-hidden bg-stone-950">
        {/* Background Overlay with subtle topographical lines idea (simulated with radial gradient dots) */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        {/* Green glow from bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-glama-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <SectionHeader title="Match Center" subtitle="The Heart of the Action" light={true} />
            
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Latest Result */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                         <h3 className="text-stone-400 font-display font-bold text-xl uppercase mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> Latest Result
                         </h3>
                         <MatchCard match={MATCHES.find(m => m.status === 'Played') || MATCHES[0]} />
                    </div>
                    <div>
                         <h3 className="text-stone-400 font-display font-bold text-xl uppercase mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-glama-light rounded-full"></span> Up Next
                         </h3>
                         <MatchCard match={MATCHES.find(m => m.status === 'Upcoming') || MATCHES[1]} />
                    </div>
                </div>

                {/* Sidebar: Table & Quick Stats */}
                <div className="flex flex-col gap-8">
                     <LeagueTableWidget />
                     
                     {/* Top Scorer Mini Widget */}
                     <div className="bg-glama-primary rounded-xl p-6 relative overflow-hidden group shadow-lg border border-glama-light/20">
                        <img src={PLAYERS[4].image} alt="Top Scorer" className="absolute right-[-20px] bottom-[-20px] w-32 h-40 object-cover rounded-lg opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform" />
                        <h4 className="font-bold text-white/70 uppercase text-xs tracking-widest mb-1">Top Scorer</h4>
                        <div className="text-3xl font-display font-bold text-white mb-2">{PLAYERS[4].name.split(' ')[1]}</div>
                        <div className="inline-block bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded font-bold text-lg border border-white/10">{PLAYERS[4].goals} Goals</div>
                     </div>
                </div>
            </div>
        </div>
    </section>

    {/* Shop / Merch Section */}
    <section className="bg-stone-900 py-20 relative border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-stone-800 to-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-700/50">
                <div className="grid md:grid-cols-2 items-center">
                    <div className="p-12 md:p-16">
                        <div className="inline-flex items-center gap-2 bg-glama-primary/20 text-glama-light border border-glama-primary/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                            <ShoppingBag size={14} /> Official Store
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase leading-none mb-6">
                            Wear The <br/><span className="text-glama-primary">Colors</span>
                        </h2>
                        <p className="text-stone-400 text-lg mb-8 leading-relaxed">
                            Get the official 23/24 home kit. Designed for the players, worn by the faithful. Support FK Glama wherever you go.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-glama-primary text-white px-8 py-3 rounded-full font-display font-bold text-xl uppercase hover:bg-glama-light hover:text-glama-dark transition-colors flex items-center gap-2 shadow-lg shadow-glama-primary/25">
                                Shop Now <ArrowRight size={18} />
                            </button>
                            <button className="px-8 py-3 rounded-full font-display font-bold text-xl uppercase text-white border border-stone-600 hover:bg-white/5 transition-colors">
                                View Collection
                            </button>
                        </div>
                    </div>
                    <div className="h-full min-h-[400px] relative">
                         <img src="https://placehold.co/600x800/1c1917/15803d?text=Official+Kit+23%2F24" className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700" alt="Kit" />
                         <div className="absolute inset-0 bg-gradient-to-r from-stone-800 via-transparent to-transparent"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* News Section */}
    <section className="bg-stone-950 py-16 md:py-24 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-end mb-8 md:mb-12 gap-4">
                <div className="w-full sm:w-auto">
                     <h3 className="text-glama-primary font-bold tracking-widest uppercase text-xs md:text-sm mb-2">From the Club</h3>
                     <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase leading-none">Latest News</h2>
                </div>
                <button className="hidden sm:flex items-center gap-2 text-stone-400 border border-stone-800 px-6 py-2 rounded-full hover:bg-stone-800 hover:text-white transition font-display font-bold tracking-wide text-sm">
                    View All News <ChevronRight size={16} />
                </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {NEWS.map(item => <NewsCard key={item.id} news={item} />)}
            </div>
            {/* Mobile View All Button */}
            <button className="sm:hidden w-full mt-8 flex items-center justify-center gap-2 text-stone-400 border border-stone-800 px-6 py-3 rounded-full hover:bg-stone-800 hover:text-white transition font-display font-bold tracking-wide text-sm">
                View All News <ChevronRight size={16} />
            </button>
        </div>
    </section>

    {/* Glama TV Section */}
    <GlamaTVSection />

    {/* Membership CTA */}
    <section className="py-24 bg-stone-100 relative overflow-hidden">
        {/* Replaced skewed div with high-res SVG for crisp diagonal edge */}
        <div className="absolute top-0 right-0 h-full w-full md:w-2/3 pointer-events-none">
             <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full text-stone-200 fill-current">
                 <path d="M20 0 L100 0 L100 100 L0 100 Z" vectorEffect="non-scaling-stroke" />
             </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl">
                <h3 className="text-glama-primary font-bold tracking-widest uppercase text-sm mb-2 flex items-center gap-2">
                    <Users size={16} /> Become a Member
                </h3>
                <h2 className="text-5xl font-display font-bold text-stone-900 uppercase mb-6">Join the Glama Army</h2>
                <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                    Be closer to the club than ever before. Exclusive content, priority ticket access, and discounts on official merchandise.
                </p>
                <form className="flex gap-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="flex-1 bg-white border border-stone-300 rounded-lg px-4 py-3 text-stone-900 focus:outline-none focus:border-glama-primary focus:ring-1 focus:ring-glama-primary"
                    />
                    <button className="bg-stone-900 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-glama-primary transition-colors shadow-xl">
                        Join
                    </button>
                </form>
            </div>
        </div>
    </section>
  </div>
);

const SquadPage: React.FC = () => {
    const [filter, setFilter] = useState('All');
    const [filteredPlayers, setFilteredPlayers] = useState(PLAYERS);

    useEffect(() => {
        if (filter === 'All') {
            setFilteredPlayers(PLAYERS);
        } else {
            // Mapping button labels to data types. 'Goalkeepers' -> 'Goalkeeper'
            const type = filter.slice(0, -1);
            setFilteredPlayers(PLAYERS.filter(p => p.position === type));
        }
    }, [filter]);

    return (
        <div className="pt-32 pb-20 bg-stone-950 min-h-screen relative">
            {/* Background Texture */}
             <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="opacity-0 animate-hero-fade-up">
                    <SectionHeader title="The First Team" subtitle="Season 23/24" light={true} />
                </div>
                
                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-16 opacity-0 animate-hero-fade-up [animation-delay:200ms]">
                    {['All', 'Goalkeepers', 'Defenders', 'Midfielders', 'Forwards'].map((f) => (
                        <button 
                            key={f} 
                            onClick={() => setFilter(f)}
                            className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                                filter === f 
                                ? 'bg-glama-primary text-white shadow-lg shadow-glama-primary/25 scale-105' 
                                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-white hover:border-stone-600 hover:bg-stone-800'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="opacity-0 animate-hero-fade-up [animation-delay:400ms]">
                    {filteredPlayers.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filteredPlayers.map(player => <PlayerCard key={player.id} player={player} />)}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-stone-500 uppercase tracking-widest">No players found in this position.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const MatchesPage: React.FC = () => {
    const nextMatch = MATCHES.find(m => m.status === 'Upcoming');
    const upcomingMatches = MATCHES.filter(m => m.status === 'Upcoming' && m.id !== nextMatch?.id);
    const pastMatches = MATCHES.filter(m => m.status === 'Played');

    // Helper to group matches by month
    const groupedMatches = upcomingMatches.reduce((acc, match) => {
        const date = new Date(match.date);
        const month = date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
        if (!acc[month]) acc[month] = [];
        acc[month].push(match);
        return acc;
    }, {} as Record<string, typeof MATCHES>);

    return (
        <div className="pt-32 pb-20 bg-stone-950 min-h-screen relative">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="opacity-0 animate-hero-fade-up">
                    <SectionHeader title="Fixtures & Results" subtitle="Follow The Journey" light={true} />
                </div>

                {/* --- Spotlight: Next Match --- */}
                {nextMatch && (
                    <div className="mb-20 opacity-0 animate-hero-fade-up [animation-delay:200ms]">
                        <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden relative shadow-2xl">
                            {/* Decorative Background for Card */}
                            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 to-stone-900"></div>
                            {/* Updated Background Image: Football Stadium */}
                            <div className="absolute right-0 top-0 w-2/3 h-full opacity-20 bg-[url('https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center blend-overlay"></div>
                            
                            <div className="relative z-10 p-8 md:p-12">
                                <div className="flex items-center gap-2 mb-8 justify-center lg:justify-start">
                                    <span className="bg-glama-primary text-white text-xs font-bold uppercase px-3 py-1 rounded tracking-widest animate-pulse">Next Match</span>
                                    <span className="text-stone-400 text-xs font-bold uppercase tracking-widest border-l border-stone-700 pl-2">{nextMatch.competition}</span>
                                </div>
                                
                                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                                    {/* Teams */}
                                    <div className="flex items-center gap-4 sm:gap-8 md:gap-16 w-full lg:w-auto justify-center">
                                        {/* Home */}
                                        <div className="flex flex-col items-center gap-4">
                                            {nextMatch.isHome ? (
                                                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-glama-primary rounded-full flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shadow-[0_0_30px_rgba(21,128,61,0.4)] border-4 border-glama-light/10">FKG</div>
                                            ) : (
                                                 <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 font-bold text-2xl sm:text-3xl border-4 border-stone-700">
                                                    {getInitials(nextMatch.opponent)}
                                                </div>
                                            )}
                                            <span className="text-white font-display font-bold text-xl sm:text-2xl md:text-3xl uppercase text-center">{nextMatch.isHome ? 'FK Glama' : nextMatch.opponent}</span>
                                        </div>

                                        <div className="text-center">
                                            <span className="block text-3xl sm:text-4xl md:text-6xl font-display font-bold text-stone-700 select-none">VS</span>
                                        </div>

                                        {/* Away */}
                                        <div className="flex flex-col items-center gap-4">
                                            {!nextMatch.isHome ? (
                                                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-glama-primary rounded-full flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shadow-[0_0_30px_rgba(21,128,61,0.4)] border-4 border-glama-light/10">FKG</div>
                                            ) : (
                                                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 font-bold text-2xl sm:text-3xl border-4 border-stone-700">
                                                    {getInitials(nextMatch.opponent)}
                                                </div>
                                            )}
                                            <span className="text-white font-display font-bold text-xl sm:text-2xl md:text-3xl uppercase text-center">{!nextMatch.isHome ? 'FK Glama' : nextMatch.opponent}</span>
                                        </div>
                                    </div>

                                    {/* Info & CTA */}
                                    <div className="flex flex-col items-center lg:items-end gap-6 text-center lg:text-right border-t lg:border-t-0 lg:border-l border-stone-800 pt-8 lg:pt-0 lg:pl-12 w-full lg:w-auto">
                                        <div>
                                            <div className="flex items-center justify-center lg:justify-end gap-2 text-stone-300 text-lg font-bold mb-1">
                                                <Calendar size={18} className="text-glama-primary" />
                                                {new Date(nextMatch.date).toLocaleDateString('en-GB', {weekday: 'long', day: 'numeric', month: 'long'})}
                                            </div>
                                            <div className="flex items-center justify-center lg:justify-end gap-2 text-stone-400 text-sm font-medium uppercase tracking-wider">
                                                <Clock size={14} /> {nextMatch.time} KO
                                            </div>
                                            <div className="flex items-center justify-center lg:justify-end gap-2 text-stone-500 text-xs font-medium uppercase tracking-wider mt-2">
                                                <MapPin size={12} /> {nextMatch.isHome ? 'Glama Hill Arena' : 'Away'}
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <button className="bg-glama-primary text-white px-8 py-3 rounded-full font-display font-bold text-lg uppercase hover:bg-glama-light hover:text-glama-dark transition-all shadow-lg flex items-center gap-2">
                                                <Ticket size={18} /> Buy Tickets
                                            </button>
                                            <button className="px-6 py-3 rounded-full font-display font-bold text-lg uppercase text-stone-400 border border-stone-700 hover:text-white hover:border-white transition-all">
                                                Preview
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- Content Grid: Upcoming & Results --- */}
                <div className="grid lg:grid-cols-3 gap-12 opacity-0 animate-hero-fade-up [animation-delay:400ms]">
                    
                    {/* Left Col: Upcoming List */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-8">
                             <h3 className="text-2xl font-display font-bold text-white uppercase flex items-center gap-3">
                                <Calendar className="text-glama-primary" /> Upcoming Fixtures
                             </h3>
                             <div className="flex gap-2">
                                <button className="p-2 rounded bg-stone-900 border border-stone-800 text-stone-400 hover:text-white"><Filter size={16} /></button>
                             </div>
                        </div>

                        <div className="space-y-12">
                            {Object.entries(groupedMatches).map(([month, matches]) => (
                                <div key={month}>
                                    <h4 className="text-stone-500 font-bold uppercase tracking-widest text-xs border-b border-stone-800 pb-2 mb-6">{month}</h4>
                                    <div className="space-y-4">
                                        {matches.map(match => (
                                            <div key={match.id} className="bg-stone-900/50 border border-stone-800/50 hover:border-glama-primary/50 hover:bg-stone-900 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-6 transition-all group">
                                                {/* Date Box */}
                                                <div className="flex sm:flex-col items-center gap-2 sm:gap-0 min-w-[80px] text-center">
                                                    <span className="text-2xl font-display font-bold text-white">{new Date(match.date).getDate()}</span>
                                                    <span className="text-xs text-stone-500 font-bold uppercase">{new Date(match.date).toLocaleDateString('en-GB', {weekday: 'short'})}</span>
                                                </div>

                                                {/* Matchup */}
                                                <div className="flex-1 flex items-center justify-between w-full sm:w-auto gap-4">
                                                     <div className="flex items-center gap-3 w-1/3 justify-end text-right">
                                                         <span className={`font-bold text-sm uppercase ${match.isHome ? 'text-white' : 'text-stone-400'}`}>{match.isHome ? 'FK Glama' : match.opponent}</span>
                                                         {match.isHome ? (
                                                             <div className="w-8 h-8 bg-glama-primary rounded-full flex items-center justify-center text-white text-[10px] font-bold border border-white/10">FKG</div>
                                                         ) : (
                                                              <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 text-[10px] font-bold">
                                                                {getInitials(match.opponent)}
                                                              </div>
                                                         )}
                                                     </div>

                                                     <div className="bg-stone-950 px-3 py-1 rounded text-xs text-stone-500 font-mono">{match.time}</div>

                                                     <div className="flex items-center gap-3 w-1/3 justify-start text-left">
                                                         {!match.isHome ? (
                                                             <div className="w-8 h-8 bg-glama-primary rounded-full flex items-center justify-center text-white text-[10px] font-bold border border-white/10">FKG</div>
                                                         ) : (
                                                             <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 text-[10px] font-bold">
                                                                {getInitials(match.opponent)}
                                                              </div>
                                                         )}
                                                         <span className={`font-bold text-sm uppercase ${!match.isHome ? 'text-white' : 'text-stone-400'}`}>{!match.isHome ? 'FK Glama' : match.opponent}</span>
                                                     </div>
                                                </div>

                                                {/* Action */}
                                                <div className="sm:border-l border-stone-800 sm:pl-6 flex items-center">
                                                    {match.isHome ? (
                                                        <button className="text-xs font-bold uppercase tracking-wider text-glama-primary hover:text-white transition flex items-center gap-1">
                                                            Tickets <ChevronRight size={14} />
                                                        </button>
                                                    ) : (
                                                        <span className="text-xs text-stone-600 font-bold uppercase tracking-wider">Away</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Col: Recent Results */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-display font-bold text-white uppercase flex items-center gap-3 mb-8">
                                <TrendingUp className="text-glama-primary" /> Recent Form
                            </h3>
                            
                            {/* Form Guide Visualization */}
                            <div className="flex gap-2 mb-8">
                                {['W', 'D', 'W', 'L', 'W'].map((res, i) => (
                                    <div key={i} className={`flex-1 h-2 rounded-full ${res === 'W' ? 'bg-glama-primary' : res === 'D' ? 'bg-stone-600' : 'bg-red-500'}`}></div>
                                ))}
                            </div>

                            <div className="space-y-2">
                                {pastMatches.map((match) => (
                                    <div key={match.id} className="bg-stone-900 border border-stone-800 p-4 rounded-xl flex items-center justify-between hover:bg-stone-800 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className={`w-1.5 h-1.5 rounded-full ${match.score?.startsWith('2') || match.score?.startsWith('3') ? 'bg-glama-primary' : match.score?.startsWith('0') ? 'bg-red-500' : 'bg-stone-500'}`}></span>
                                            <div className="flex flex-col">
                                                <span className="text-xs text-stone-500 uppercase font-bold">{new Date(match.date).toLocaleDateString('en-GB', {day: 'numeric', month: 'short'})}</span>
                                                <span className="text-sm font-bold text-white">{match.opponent}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-xs font-bold uppercase tracking-wider ${match.isHome ? 'text-stone-500' : 'text-glama-primary'}`}>{match.isHome ? '(H)' : '(A)'}</span>
                                            <span className="font-display font-bold text-xl text-white bg-stone-950 px-2 py-1 rounded border border-stone-800">{match.score}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <button className="w-full mt-4 py-3 border border-stone-800 text-stone-400 font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-stone-800 hover:text-white transition">View Archive</button>
                        </div>

                         {/* Quick Table Snippet */}
                         <div className="bg-stone-900 p-6 rounded-xl border border-stone-800">
                             <h4 className="text-white font-display font-bold text-lg uppercase mb-4">League Table</h4>
                             <table className="w-full text-xs">
                                 <thead className="text-stone-500 uppercase border-b border-stone-800">
                                     <tr>
                                         <th className="text-left pb-2">Club</th>
                                         <th className="text-center pb-2">P</th>
                                         <th className="text-right pb-2">Pts</th>
                                     </tr>
                                 </thead>
                                 <tbody className="divide-y divide-stone-800">
                                    {LEAGUE_TABLE.slice(0,4).map((row) => (
                                        <tr key={row.pos} className="text-stone-300">
                                            <td className="py-2 flex items-center gap-2">
                                                <span className="text-stone-600 font-bold">{row.pos}</span>
                                                {row.name}
                                            </td>
                                            <td className="text-center">{row.played}</td>
                                            <td className="text-right font-bold text-white">{row.pts}</td>
                                        </tr>
                                    ))}
                                 </tbody>
                             </table>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ClubPage: React.FC = () => (
    <div className="pt-0 bg-stone-950 min-h-screen relative">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        {/* NEW CLUB HERO SECTION */}
        <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mb-20 pb-12 pt-32">
            <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover animate-hero-zoom origin-center" alt="Club History" />
                <div className="absolute inset-0 bg-stone-950/80"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/50"></div>
            </div>
            <div className="relative z-10 text-center max-w-4xl px-4">
                 <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/10 text-glama-light text-xs font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md opacity-0 animate-hero-fade-up">Since 1952</span>
                 <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-bold text-white uppercase leading-[0.9] mb-8 opacity-0 animate-hero-fade-up [animation-delay:200ms]">
                     More Than <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-glama-primary to-glama-light">A Club</span>
                 </h1>
                 <p className="text-xl md:text-2xl text-stone-300 leading-relaxed max-w-2xl mx-auto font-light opacity-0 animate-hero-fade-up [animation-delay:400ms]">
                    Rooted in the rugged terrain of Bela Palanka. Forged by seventy years of passion, resilience, and community spirit.
                 </p>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Club DNA Section (Bento Grid) */}
            <div className="mb-24 opacity-0 animate-hero-fade-up [animation-delay:600ms]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Origins Card - Wide */}
                    <div className="lg:col-span-2 bg-stone-900 rounded-3xl p-8 md:p-12 border border-stone-800 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800/50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 text-glama-primary">
                                    <Mountain size={24} />
                                </div>
                                <h3 className="font-display font-bold text-3xl md:text-4xl text-white uppercase">The Origins</h3>
                            </div>
                            <p className="text-stone-400 text-lg leading-relaxed max-w-2xl">
                                Established in 1952 by local quarry workers, FK Glama was named after the imposing limestone hill that shadows the training ground. 
                                The founders believed that the team should embody the characteristics of the hill: <span className="text-white font-bold">immovable in defense and majestic in presence.</span>
                            </p>
                        </div>
                        {/* Decorative '52' */}
                        <div className="absolute bottom-[-20px] right-[-20px] font-display font-bold text-[180px] text-stone-800/20 leading-none select-none pointer-events-none">
                            52
                        </div>
                    </div>

                    {/* Founded Stat - Tall/Square */}
                    <div className="bg-glama-primary rounded-3xl p-8 border border-glama-light/20 relative overflow-hidden flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-500">
                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-glama-light/20 to-transparent"></div>
                         <div className="relative z-10">
                             <span className="text-glama-dark/70 font-bold uppercase tracking-widest text-sm">Established</span>
                             <h4 className="font-display font-bold text-6xl md:text-8xl text-white mt-2">1952</h4>
                         </div>
                         <div className="relative z-10">
                             <p className="text-glama-dark font-bold text-sm leading-tight mt-4">
                                 Seven decades of football tradition in Bela Palanka.
                             </p>
                         </div>
                         <Calendar className="absolute bottom-4 right-4 text-glama-dark/20 w-24 h-24" />
                    </div>

                    {/* Identity - Tall/Square */}
                    <div className="bg-stone-900 rounded-3xl p-8 border border-stone-800 relative overflow-hidden flex flex-col group">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-950/80 z-10"></div>
                        <img src="https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" alt="Texture" />
                        
                        <div className="relative z-20 h-full flex flex-col">
                             <div className="p-3 bg-glama-primary w-fit rounded-2xl text-white mb-auto shadow-lg">
                                <Target size={24} />
                            </div>
                            <div className="mt-8">
                                <h3 className="font-display font-bold text-3xl text-white uppercase mb-2">The Identity</h3>
                                <p className="text-stone-300 text-sm leading-relaxed">
                                    We play <span className="text-glama-light font-bold">"Hillsman Football"</span> - a high-energy, physical style. Green and White representing the forest and the rock.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Strip - Wide */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { label: "League Titles", value: "3", icon: Trophy, color: "text-yellow-500" },
                            { label: "Cup Finals", value: "12", icon: Award, color: "text-glama-light" },
                            { label: "Local Players", value: "85%", icon: MapPin, color: "text-blue-400" }
                        ].map((stat, i) => (
                            <div key={i} className="bg-stone-900 rounded-3xl p-6 border border-stone-800 flex items-center gap-4 hover:border-stone-700 transition-colors">
                                <div className={`p-3 rounded-full bg-stone-950 border border-stone-800 ${stat.color}`}>
                                    <stat.icon size={20} />
                                </div>
                                <div>
                                    <div className="font-display font-bold text-3xl text-white leading-none">{stat.value}</div>
                                    <div className="text-xs text-stone-500 uppercase tracking-wider font-bold">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

            {/* Management Section - IMPROVED EMPHASIS */}
            <div className="bg-stone-900 py-24 mb-24 border-y border-stone-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-glama-primary/5 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <SectionHeader title="Leadership" subtitle="The Boardroom" light={true} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        <ManagementCard role="President" name="Goran Petrovic" bio="Former club captain who took over the presidency in 2015. The heart and soul of the administration." />
                        <ManagementCard role="Sporting Director" name="Marko Ilic" bio="Architect of the modern academy system. Focused on developing local talent into first-team stars." />
                        <ManagementCard role="Head Coach" name="Milos Stojanovic" bio="Tactical mastermind known for his high-pressing style. Joined the club from FK Meteor last season." />
                        <ManagementCard role="Head of Academy" name="Dragan Vasic" bio="Responsible for the U19 and U17 squads. Has produced 5 first-team starters in 2 years." />
                    </div>
                </div>
            </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-20">
            {/* Stadium Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl">
                {/* Updated Stadium Image */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2500&auto=format&fit=crop')] bg-cover bg-center opacity-40 hover:scale-105 transition-transform duration-[2s]"></div>
                <div className="relative z-10 p-6 py-12 md:p-24 text-center">
                    <Trophy className="mx-auto text-glama-primary mb-6" size={48} />
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase mb-6">Glama Hill Arena</h2>
                    
                    <div className="flex flex-col gap-6 max-w-2xl mx-auto mb-10">
                         <div className="flex flex-wrap justify-center gap-3 text-sm md:text-base font-bold uppercase tracking-widest text-glama-light">
                            <span className="bg-stone-950/50 backdrop-blur px-4 py-2 rounded-full border border-white/10">Capacity: 4,500</span>
                            <span className="bg-stone-950/50 backdrop-blur px-4 py-2 rounded-full border border-white/10">Built: 1960</span>
                            <span className="bg-stone-950/50 backdrop-blur px-4 py-2 rounded-full border border-white/10">Renovated: 2018</span>
                         </div>
                         <p className="text-stone-300 text-base md:text-lg leading-relaxed">
                            A cauldron of noise on matchdays. The stands are built directly into the base of the hill, creating unique acoustics.
                         </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                         <button className="bg-white text-stone-950 px-8 py-3 rounded-full font-bold uppercase hover:bg-glama-primary hover:text-white transition-colors">
                            Stadium Guide
                         </button>
                         <button className="border border-white/30 text-white px-8 py-3 rounded-full font-bold uppercase hover:bg-white/10 transition-colors">
                            History Tour
                         </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const AcademyPage: React.FC = () => (
    <div className="pt-0 bg-stone-950 min-h-screen relative">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        {/* Academy Hero */}
        <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden mb-20 pb-12 pt-32">
             <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover animate-hero-zoom origin-center" alt="Youth Academy" />
                <div className="absolute inset-0 bg-stone-950/80"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/50"></div>
            </div>
            <div className="relative z-10 text-center max-w-4xl px-4">
                 <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white uppercase leading-[0.9] mb-6 opacity-0 animate-hero-fade-up">
                     Forging <br/><span className="text-glama-primary">The Future</span>
                 </h1>
                 <p className="text-xl text-stone-300 font-light opacity-0 animate-hero-fade-up [animation-delay:200ms]">
                    The FK Glama Academy. Where talent meets hard work.
                 </p>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20 opacity-0 animate-hero-fade-up [animation-delay:400ms]">
            
            {/* PHILOSOPHY SECTION */}
            <div className="mb-24">
                 <SectionHeader title="Our Philosophy" subtitle="Development First" light={true} />
                 
                 <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
                     <div className="space-y-6 text-lg leading-relaxed text-stone-400">
                        <p className="text-2xl font-display font-bold text-white uppercase mb-4">
                            "The best players aren't bought, <span className="text-glama-primary">they are built</span>."
                        </p>
                        <p>
                             Our academy isn't just about football; it's about life. We focus on technical excellence, tactical intelligence, and physical resilience. But more importantly, we build character.
                        </p>
                        <p>
                             Every young player is taught the "Glama Way" - playing with courage, respecting the opponent, and never giving up on the team.
                        </p>
                     </div>
                     <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-800 group">
                         <img src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110" alt="Training" />
                         <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-90"></div>
                         <div className="absolute bottom-8 left-8 right-8">
                             <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl">
                                 <p className="font-display font-bold text-2xl uppercase leading-none text-white italic mb-3">"This is where dreams begin."</p>
                                 <div className="flex items-center gap-3">
                                     <div className="w-10 h-10 bg-glama-primary rounded-full flex items-center justify-center text-white font-bold text-xs">DV</div>
                                     <div>
                                         <p className="text-xs font-bold text-white uppercase tracking-wider">Dragan Vasic</p>
                                         <p className="text-[10px] text-glama-light uppercase tracking-widest">Head of Academy</p>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* Core Values Grid */}
                 <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "Technique", icon: Brain, desc: "Mastery of the ball is the foundation of our game." },
                        { title: "Resilience", icon: Zap, desc: "Building the physical engine to dominate for 90 minutes." },
                        { title: "Character", icon: Heart, desc: "Respect, discipline, and loyalty to the badge." }
                    ].map((value, i) => (
                        <div key={i} className="bg-stone-900 p-8 rounded-2xl border border-stone-800 hover:border-glama-primary/50 transition-colors group">
                             <div className="w-12 h-12 bg-stone-950 rounded-xl flex items-center justify-center text-glama-primary border border-stone-800 mb-6 group-hover:scale-110 transition-transform">
                                 <value.icon size={24} />
                             </div>
                             <h4 className="font-display font-bold text-2xl text-white uppercase mb-3">{value.title}</h4>
                             <p className="text-stone-400 text-sm leading-relaxed">{value.desc}</p>
                        </div>
                    ))}
                 </div>
            </div>

            {/* PATHWAY / AGE GROUPS */}
            <div className="mb-24">
                <SectionHeader title="The Pathway" subtitle="Road to the First Team" light={true} />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                    {/* Visual Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-stone-800 -z-10 -translate-y-1/2"></div>

                    {[
                        { title: "Foundation", ages: "U12 - U14", phase: "Development Phase", icon: Footprints },
                        { title: "Performance", ages: "U15 - U17", phase: "Tactical Phase", icon: Target },
                        { title: "Excellence", ages: "U19", phase: "Professional Phase", icon: Trophy },
                    ].map((step, i) => (
                        <div key={i} className="bg-stone-950 p-8 rounded-2xl border border-stone-800 relative group hover:-translate-y-2 transition-transform duration-300">
                             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <step.icon size={64} />
                             </div>
                             <div className="inline-block px-3 py-1 rounded bg-stone-900 text-glama-light text-xs font-bold uppercase tracking-widest border border-stone-800 mb-4">
                                {step.ages}
                             </div>
                             <h4 className="font-display font-bold text-3xl text-white uppercase mb-1">{step.title}</h4>
                             <p className="text-stone-500 text-sm font-bold uppercase tracking-wider mb-6">{step.phase}</p>
                             
                             <div className="w-full bg-stone-900 h-1.5 rounded-full overflow-hidden">
                                 <div className={`h-full bg-glama-primary ${i === 0 ? 'w-1/3' : i === 1 ? 'w-2/3' : 'w-full'}`}></div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* HIGH IMPACT CTA */}
            <div className="relative rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-glama-dark to-glama-primary"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                
                <div className="relative z-10 p-12 md:p-16 text-center">
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase mb-6 drop-shadow-lg">
                        Do You Have What It Takes?
                    </h2>
                    <p className="text-glama-light text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
                        Open trials for the 24/25 season begin this Summer. Join the ranks of FK Glama.
                    </p>
                    <button className="bg-white text-glama-dark px-10 py-4 rounded-full font-display font-bold text-xl uppercase tracking-wider hover:bg-stone-100 hover:scale-105 transition-all shadow-2xl flex items-center gap-3 mx-auto">
                        Register For Trials <ChevronRight size={24} />
                    </button>
                    <p className="mt-6 text-white/60 text-xs uppercase tracking-widest font-bold">Next Trial Date: June 15th, 2024</p>
                </div>
            </div>

        </div>
    </div>
);

const MainLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Fix: Scroll to top on route change, instantly
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [location.pathname]);

    // Helper to get current page ID from path
    const getCurrentPage = () => {
        const path = location.pathname.substring(1);
        return path || 'home';
    }

    const handleNavigate = (page: string) => {
        // Removed explicit scrollTo here to avoid scrolling the previous page
        if (page === 'home') {
            navigate('/');
        } else {
            navigate(`/${page}`);
        }
    };

    return (
        <div className="bg-stone-950 min-h-screen text-stone-50 font-sans selection:bg-glama-primary selection:text-white">
            <Navbar currentPage={getCurrentPage()} onNavigate={handleNavigate} />
            
            <Routes>
                <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
                <Route path="/squad" element={<SquadPage />} />
                <Route path="/matches" element={<MatchesPage />} />
                <Route path="/academy" element={<AcademyPage />} />
                <Route path="/club" element={<ClubPage />} />
            </Routes>

            <Footer />
        </div>
    );
};

export default function App() {
  return (
    <HashRouter>
        <MainLayout />
    </HashRouter>
  );
}