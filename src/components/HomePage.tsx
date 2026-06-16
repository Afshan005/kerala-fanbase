import React from 'react';
import { motion } from 'motion/react';
import { Trophy, HelpCircle, Activity, Award, Flame, Navigation } from 'lucide-react';
import { PageIndex, ActivityFeedItem } from '../types';

interface HomePageProps {
  setCurrentPage: (page: PageIndex) => void;
  recentActivity: ActivityFeedItem[];
  totalVotes: number;
  activeFans: number;
}

const getTeamColor = (teamName: string) => {
  const name = teamName.toLowerCase();
  if (name.includes('argentina')) return 'text-sky-400 font-extrabold';
  if (name.includes('brazil')) return 'text-yellow-400 font-extrabold';
  if (name.includes('portugal')) return 'text-rose-400 font-extrabold';
  if (name.includes('france')) return 'text-blue-400 font-extrabold';
  if (name.includes('germany')) return 'text-amber-500 font-extrabold';
  if (name.includes('spain')) return 'text-red-400 font-extrabold';
  if (name.includes('england')) return 'text-red-400 font-extrabold';
  if (name.includes('netherlands')) return 'text-orange-400 font-extrabold';
  if (name.includes('italy')) return 'text-blue-400 font-extrabold';
  if (name.includes('croatia')) return 'text-red-400 font-extrabold';
  if (name.includes('belgium')) return 'text-yellow-400 font-extrabold';
  if (name.includes('uruguay')) return 'text-cyan-400 font-extrabold';
  if (name.includes('mexico')) return 'text-green-400 font-extrabold';
  if (name.includes('usa') || name.includes('united states')) return 'text-blue-400 font-extrabold';
  if (name.includes('canada')) return 'text-red-400 font-extrabold';
  return 'text-slate-400 font-bold';
};

export default function HomePage({
  setCurrentPage,
  recentActivity,
  totalVotes,
  activeFans
}: HomePageProps) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden bg-slate-50 pb-12" id="homepage-container">
      
      {/* Stadium/FIFA Style Curved Background elements and overlays */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-stadium-glow z-0 pointer-events-none" />
      
      {/* Dynamic Glowing FIFA Wave Background Vectors */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Hero Info */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left" id="homepage-hero-text">
          
          {/* World Cup 2026 Badge Indicator */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-black/40 border border-slate-700/80 text-[10px] md:text-xs font-black tracking-wider uppercase backdrop-blur-sm shadow-xl"
            id="world-cup-badge"
          >
            <Flame className="h-4 w-4 text-orange-500 animate-bounce drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#016bfc] via-[#00df89] via-[#cef07a] via-[#ff5f00] to-[#e3005c] font-black tracking-widest font-display">
              FIFA WORLD CUP 2026 SPECIAL CENSUS
            </span>
          </motion.div>

          {/* Large Headline */}
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]"
              id="hero-title"
            >
              Who Has The <br />
              <span className="font-extrabold pb-1 inline-flex flex-wrap justify-center lg:justify-start">
                {"Biggest Football".split("").map((char, index) => {
                  const colors = [
                    'text-[#016bfc]', // Active Blue
                    'text-[#00df89]', // Active Green
                    'text-[#cef07a]', // Lime Yellow
                    'text-[#ff5f00]', // Bold Orange
                    'text-[#e3005c]', // Bright pink/red
                    'text-[#38bdf8]', // Cyan
                  ];
                  const colorClass = char === " " ? "" : colors[index % colors.length];
                  return (
                    <span key={index} className={`${colorClass} transition-all duration-300 hover:scale-110 hover:brightness-125`}>
                      {char === " " ? "\u00A0" : char}
                    </span>
                  );
                })}
              </span> <br />
              Fan Base In Kerala?
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-xl mx-auto lg:mx-0 text-slate-600 text-xs sm:text-sm md:text-base font-medium leading-relaxed"
              id="hero-subtitle"
            >
              Join Kerala's largest football fan census and discover which World Cup nation truly dominates the hearts of Malayali football fans.
            </motion.p>
          </div>

          {/* Call to Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 w-full sm:w-auto"
          >
            <button
              onClick={() => setCurrentPage('team-selection')}
              className="group relative flex items-center justify-center space-x-2 px-5 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl bg-[#016bfc] hover:bg-[#ff5f00] font-display text-sm md:text-base lg:text-lg font-extrabold text-white shadow-xl shadow-[#016bfc]/20 hover:shadow-[#ff5f00]/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border border-white/10 cursor-pointer w-full sm:w-auto"
              id="start-voting-cta"
            >
              <span className="relative flex items-center justify-center">
                {/* Football icon custom animation */}
                <span className="text-lg inline-block group-hover:rotate-[360deg] transition-transform duration-1000 ease-out mr-1">⚽</span>
              </span>
              <span>Start Voting Now</span>
              <span className="group-hover:translate-x-1.5 transition-transform">→</span>
            </button>

            <button
              onClick={() => setCurrentPage('results')}
              className="flex items-center justify-center gap-2 px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 hover:text-slate-900 transition-all font-bold text-xs md:text-sm shadow-sm w-full sm:w-auto"
              id="view-results-cta"
            >
              <Activity className="h-4 w-4 text-blue-600" />
              View Live Brand Dashboard
            </button>
          </motion.div>

        </div>

        {/* Right Side: Visual Football Glassmorphic Showcase & Live Feed */}
        <div className="lg:col-span-5 w-full space-y-6" id="homepage-dashboard-sidebar">
          
          {/* Glassmorphism Interactive Voting Showcase Widget */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card rounded-3xl p-6 relative overflow-hidden group border border-slate-200/80 shadow-md"
            id="stadium-graphic-card"
          >
            <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center space-x-2 text-[10px] md:text-xs font-bold text-slate-500 tracking-wider uppercase font-mono">
                <span className="h-2 w-2 rounded-full bg-slate-500 animate-ping" />
                <span>Stadium Feed Live</span>
              </span>
              <Trophy className="h-5 w-5 text-slate-500" />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-xs md:text-sm font-extrabold text-[#74ACDF] tracking-wide flex items-center gap-1.5">
                    #1 Argentina
                    <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm animate-pulse-slow">
                      <span className="absolute h-2 w-2 rounded-full" style={{ backgroundColor: '#74ACDF' }} />
                      <span className="absolute h-0.5 w-0.5 rounded-full bg-white" />
                    </span>
                  </span>
                  <span className="font-mono text-[10px] md:text-xs font-black text-sky-400">82%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-200">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: '82%' }} 
                    transition={{ duration: 1.2, delay: 0.5 }} 
                    className="h-full bg-[#74ACDF]" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-xs md:text-sm font-extrabold text-[#FEDF00] tracking-wide flex items-center gap-1.5">
                    #2 Brazil
                    <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm animate-pulse-slow">
                      <span className="absolute h-2 w-2 rounded-full" style={{ backgroundColor: '#009739' }} />
                      <span className="absolute h-0.5 w-0.5 rounded-full bg-[#FEDF00]" />
                    </span>
                  </span>
                  <span className="font-mono text-[10px] md:text-xs font-black text-yellow-500">75%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-200">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: '75%' }} 
                    transition={{ duration: 1.2, delay: 0.6 }} 
                    className="h-full bg-[#FEDF00]" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-xs md:text-sm font-extrabold text-[#FF0000] tracking-wide flex items-center gap-1.5">
                    #3 Portugal
                    <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm animate-pulse-slow">
                      <span className="absolute h-2 w-2 rounded-full" style={{ backgroundColor: '#FF0000' }} />
                      <span className="absolute h-0.5 w-0.5 rounded-full bg-[#115533]" />
                    </span>
                  </span>
                  <span className="font-mono text-[10px] md:text-xs font-black text-rose-400">64%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-200">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: '64%' }} 
                    transition={{ duration: 1.2, delay: 0.7 }} 
                    className="h-full bg-[#FF0000]" 
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] md:text-xs text-slate-500">
              <span className="font-medium">Historical Rivalry Engine</span>
              <span className="font-mono text-slate-400 font-bold hover:underline cursor-pointer" onClick={() => setCurrentPage('results')}>
                Explore analytical map
              </span>
            </div>
            
          </motion.div>

          {/* Live Activity Feed - Realtime votes ticker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card rounded-2xl p-5 border border-slate-200/80 shadow-md"
            id="activity-feed-card"
          >
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 font-mono">
                <Activity className="h-4 w-4 text-slate-400" />
                Live Census Activity
              </h3>
              <span className="text-[9px] md:text-[10px] font-mono font-bold rounded-full px-2 py-0.5 bg-slate-100 text-slate-400 border border-slate-300 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse" />
                Streaming Live
              </span>
            </div>

            {/* List of continuous events */}
            <div className="space-y-2.5 max-h-[160px] overflow-y-auto no-scrollbar" id="recent-activity-list">
              {recentActivity.map((feed, index) => (
                <motion.div
                  key={feed.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-150 text-[11px] md:text-xs"
                >
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-150 bg-white shadow-sm select-none">⚽</span>
                    <div>
                      <span className="font-bold text-slate-800">{feed.district}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-400 font-mono text-[9px] md:text-[10px]">
                      voted <span className={getTeamColor(feed.teamName)}>{feed.teamName}</span>
                    </span>
                    <p className="text-[8px] md:text-[9px] text-slate-400 font-medium">{feed.timestamp}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>

    </div>
  );
}
