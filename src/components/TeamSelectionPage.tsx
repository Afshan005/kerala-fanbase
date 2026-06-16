import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Trophy, Check, ArrowRight, Star } from 'lucide-react';
import { Team, PageIndex } from '../types';

interface TeamSelectionPageProps {
  teams: Team[];
  selectedTeamId: string | null;
  setSelectedTeamId: (id: string) => void;
  setCurrentPage: (page: PageIndex) => void;
}

export default function TeamSelectionPage({
  teams,
  selectedTeamId,
  setSelectedTeamId,
  setCurrentPage
}: TeamSelectionPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Host Nations list (Canada, Mexico, USA)
  const hostNationIds = ['canada', 'mexico', 'usa'];

  // Filter teams based on search query
  const filteredTeams = useMemo(() => {
    return teams.filter(team => 
      team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [teams, searchQuery]);

  // Separate hosts and qualified
  const hosts = useMemo(() => {
    return filteredTeams.filter(team => hostNationIds.includes(team.id));
  }, [filteredTeams]);

  const qualified = useMemo(() => {
    return filteredTeams.filter(team => !hostNationIds.includes(team.id));
  }, [filteredTeams]);

  // Find the selected team object
  const selectedTeam = useMemo(() => {
    return teams.find(t => t.id === selectedTeamId) || null;
  }, [teams, selectedTeamId]);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-50 pb-20 pt-10" id="team-selection-container">
      {/* Background ambience */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-2 text-[10px] md:text-xs font-mono font-bold tracking-wider text-blue-600 mb-4 uppercase">
          <span>Step 1 of 2</span>
          <span>•</span>
          <span className="text-slate-500 font-bold">Team Selection</span>
        </div>

        {/* Header Title & Description */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10" id="team-selection-header">
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
            Choose Your Favourite Team
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            Select the national football team you proudly support. Help prove which nation has Kerala's largest, most passionate fanbase!
          </p>
        </div>

        {/* Sticky Search and Progress Area */}
        <div className="sticky top-16 z-30 bg-slate-50/95 backdrop-blur-md py-4 mb-8 border-b border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between" id="search-sticky-bar">
          
          {/* Search Box */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search among 48 nations (e.g. Argentina, Brazil, Portugal)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-slate-400 focus:outline-none focus:border-blue-500 text-xs text-slate-800 transition-colors placeholder:text-slate-400 shadow-sm"
              id="team-search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 hover:text-slate-800"
              >
                Clear
              </button>
            )}
          </div>

          {/* Prompt Selection Info */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {selectedTeam ? (
              <div className="flex items-center gap-2 bg-blue-100 border border-blue-350 px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-bold text-slate-800 animate-fadeIn shadow-sm">
                <span className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm select-none">
                  <span className="absolute h-2.5 w-2.5 rounded-full" style={{ backgroundColor: selectedTeam.primaryColor }} />
                  <span className="absolute h-0.5 w-0.5 rounded-full" style={{ backgroundColor: selectedTeam.secondaryColor }} />
                </span>
                <span>Selected {selectedTeam.name}</span>
                <Check className="h-3.5 w-3.5 text-blue-600" />
              </div>
            ) : (
              <span className="text-[10px] md:text-xs text-blue-600 font-bold bg-blue-50 px-2.5 py-1.5 rounded-xl border border-blue-200">
                ⚠️ Select a team first to continue
              </span>
            )}

            <button
              disabled={!selectedTeamId}
              onClick={() => setCurrentPage('district-selection')}
              className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-xl font-semibold text-[10px] md:text-xs tracking-wider uppercase transition-all flex-shrink-0 cursor-pointer ${
                selectedTeamId 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-95' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
              }`}
              id="team-continue-btn"
            >
              <span>Continue</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Grid List Container */}
        <div className="space-y-12" id="teams-grid-container">
          
          {/* HOST NATIONS SECTION */}
          {hosts.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-[10px] md:text-xs font-bold font-mono tracking-widest text-blue-600 uppercase flex items-center gap-2">
                <Star className="h-4 w-4 text-blue-500 fill-blue-500" />
                Host Nations (World Cup 2026)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {hosts.map(team => {
                  const isSelected = selectedTeamId === team.id;
                  return (
                    <motion.div
                      key={team.id}
                      onClick={() => setSelectedTeamId(team.id)}
                      whileHover={{ y: -3 }}
                      className={`relative cursor-pointer rounded-2xl p-4 transition-all flex items-center justify-between overflow-hidden border ${
                        isSelected 
                          ? 'bg-blue-50 border-blue-500 shadow-md shadow-blue-500/5' 
                          : 'bg-white border-slate-200 hover:border-slate-350 hover:shadow-sm'
                      }`}
                      style={{
                        boxShadow: isSelected ? `0 0 20px -3px ${team.primaryColor}25` : ''
                      }}
                      id={`team-card-${team.id}`}
                    >
                      {/* Left color glow accent */}
                      <div 
                        className="absolute left-0 top-0 bottom-0 w-1"
                        style={{ backgroundColor: team.primaryColor }}
                      />

                      <div className="flex items-center space-x-3.5">
                        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm select-none">
                          <span className="absolute h-6.5 w-6.5 rounded-full" style={{ backgroundColor: team.primaryColor }} />
                          <span className="absolute h-1.5 w-1.5 rounded-full" style={{ backgroundColor: team.secondaryColor }} />
                        </span>
                        <div className="flex flex-col">
                          <span className="font-display font-semibold text-xs sm:text-sm md:text-base text-slate-800">
                            {team.name}
                          </span>
                          <span className="text-[9px] md:text-[10px] text-slate-500">Host Nation</span>
                        </div>
                      </div>

                      {/* Selection dot */}
                      <div className={`h-4 w-4 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-blue-500 border-blue-400 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="h-2.5 w-2.5 text-white stroke-[3px]" />}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ALL QUALIFIED TEAMS */}
          {qualified.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-[10px] md:text-xs font-bold font-mono tracking-widest text-slate-500 uppercase flex items-center gap-2">
                <Trophy className="h-4 w-4 text-slate-400" />
                Qualified Teams
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
                {qualified.map(team => {
                  const isSelected = selectedTeamId === team.id;
                  // Specially style top Kerala giants with gold border or label
                  const isKeralaGiant = ['argentina', 'brazil', 'portugal', 'france', 'germany'].includes(team.id);

                  return (
                    <motion.div
                      key={team.id}
                      onClick={() => setSelectedTeamId(team.id)}
                      whileHover={{ y: -3 }}
                      className={`relative cursor-pointer rounded-xl p-3.5 transition-all flex items-center justify-between overflow-hidden border ${
                        isSelected 
                          ? 'bg-blue-50 border-blue-500 shadow-md shadow-blue-500/5' 
                          : 'bg-white border-slate-200 hover:border-slate-350 hover:shadow-sm'
                      }`}
                      style={{
                        boxShadow: isSelected ? `0 0 15px -4px ${team.primaryColor}35` : ''
                      }}
                      id={`team-card-${team.id}`}
                    >
                      {/* Left color glow accent */}
                      <div 
                        className="absolute left-0 top-0 bottom-0 w-[3px]"
                        style={{ backgroundColor: team.primaryColor }}
                      />

                      <div className="flex items-center space-x-2.5 min-w-0">
                        <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm select-none shrink-0">
                          <span className="absolute h-5 w-5 rounded-full" style={{ backgroundColor: team.primaryColor }} />
                          <span className="absolute h-1.5 w-1.5 rounded-full" style={{ backgroundColor: team.secondaryColor }} />
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="font-display font-semibold text-[11px] sm:text-xs md:text-sm text-slate-800 truncate">
                            {team.name}
                          </span>
                          {isKeralaGiant && (
                            <span className="text-[8px] font-mono text-blue-500 uppercase font-bold tracking-wider">
                              Kerala Favourite
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Selection indicator bubble */}
                      <div className={`h-3 w-3 rounded-full border shrink-0 flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-blue-500 border-blue-400 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="h-2 w-2 text-white stroke-[3.5px]" />}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Zero Search Results Fallback */}
          {filteredTeams.length === 0 && (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl max-w-md mx-auto space-y-4 shadow-sm">
              <span className="text-4xl block">🔍</span>
              <h3 className="font-display font-extrabold text-lg text-slate-800">No teams matched your query</h3>
              <p className="text-xs text-slate-500">
                Are you looking for another nation? Use keywords like "Brazil" or "Croatia".
              </p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs text-blue-600 font-bold hover:underline"
              >
                Reset Search Filter
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
