import React from 'react';
import { Trophy, Activity, Users } from 'lucide-react';
import { PageIndex } from '../types';

interface HeaderProps {
  totalVotes: number;
  activeFans: number;
  currentPage: PageIndex;
  setCurrentPage: (page: PageIndex) => void;
  userVoted: boolean;
}

export default function Header({
  totalVotes,
  activeFans,
  currentPage,
  setCurrentPage,
  userVoted
}: HeaderProps) {
  // Format numbers with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div 
          onClick={() => setCurrentPage('home')} 
          className="flex cursor-pointer items-center space-x-2.5 hover:opacity-95 transition-opacity"
          id="header-logo-container"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#016bfc] via-[#e3005c] to-[#ff5f00]" id="header-logo-badge">
            <Trophy className="h-5 w-5 text-white animate-pulse-slow" />
            <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#00df89] animate-ping" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-display text-xs sm:text-sm md:text-base font-black tracking-tight text-slate-900 leading-none">
              FANS OF KERALA
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-widest text-[#ff5f00] font-black uppercase mt-1">
              CENSUS 2026
            </span>
          </div>
        </div>

        {/* Center Nav Link/Badge */}
        <div className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => setCurrentPage('home')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-colors ${
              currentPage === 'home' 
                ? 'text-slate-900 bg-slate-100 border border-slate-200/80' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            id="nav-btn-home"
          >
            Home
          </button>
          
          <button
            onClick={() => {
              setCurrentPage('results');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase flex items-center gap-1.5 transition-colors ${
              currentPage === 'results' 
                ? 'text-slate-900 bg-slate-100 border border-slate-200/80' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            id="nav-btn-results"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            Live Results
          </button>
        </div>

        {/* Live Metrics Counter */}
        <div className="flex items-center space-x-3 sm:space-x-4" id="header-metrics-panel">
          
          {/* Total Votes Counted */}
          <div className="flex flex-col text-right">
            <div className="flex items-center justify-end space-x-1">
              <div className="h-1 w-1 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-mono text-[10px] font-bold sm:text-xs text-slate-900 tracking-tight">
                {formatNumber(totalVotes)}
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] font-medium tracking-wider text-slate-500 uppercase">
              Votes Counted
            </span>
          </div>

          {/* Portable Results button for mobile */}
          <button
            onClick={() => setCurrentPage(currentPage === 'results' ? 'home' : 'results')}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
            title="Toggle Results"
            id="mobile-results-toggle"
          >
            <Activity className="h-4 w-4" />
          </button>

        </div>

      </div>
    </header>
  );
}
