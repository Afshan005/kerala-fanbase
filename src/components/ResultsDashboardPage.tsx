import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, Users, Flame, Flag, Sparkles, TrendingUp, TrendingDown, Minus, 
  MapPin, Share2, Check, Copy, Globe, ChevronDown
} from 'lucide-react';
import { Team, District, PageIndex } from '../types';

interface ResultsDashboardPageProps {
  teams: Team[];
  districts: Record<string, Record<string, number>>;
  activeFans: number;
  totalVotes: number;
  handleResetCensus: () => void;
  userVoted: boolean;
  userVoteData: { teamId: string; district: string } | null;
}

export default function ResultsDashboardPage({
  teams,
  districts,
  activeFans,
  totalVotes,
  handleResetCensus,
  userVoted,
  userVoteData
}: ResultsDashboardPageProps) {
  const [selectedHeatmapDistrict, setSelectedHeatmapDistrict] = useState<string>('Malappuram');
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const WEBSITE_SHARE_LINK = ''; // Blank option that can be updated with the live website link later

  // Dynamic branding text colors representing each team
  const getLeadingTeamColorClass = (teamId?: string) => {
    if (!teamId) return 'text-[#016bfc]';
    const id = teamId.toLowerCase();
    if (id === 'argentina') return 'text-[#74ACDF]'; // Iconic Sky Blue
    if (id === 'brazil') return 'text-[#EAB308] font-black'; // Gold/Yellow
    if (id === 'portugal') return 'text-[#FF0000]'; // Portugal Red
    if (id === 'france') return 'text-[#002395]'; // French Blue
    if (id === 'germany') return 'text-[#FFCC00]'; // Germany Gold
    if (id === 'spain') return 'text-[#C60B1E]'; // Spanish Red
    if (id === 'netherlands') return 'text-[#FF4F00] font-black'; // Dutch Orange
    if (id === 'england') return 'text-[#CF142B]'; // English Red
    if (id === 'croatia') return 'text-[#FF0000]';
    if (id === 'italy') return 'text-[#00875A]'; // Italian Green
    return 'text-[#016bfc]'; // fallback default blue
  };

  // Formatter helper
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  // 1. Calculate compiled teams statistics dynamically
  const sortedTeams = useMemo(() => {
    return [...teams]
      .map(team => {
        // Calculate total votes for this team across all districts
        let teamVoteTotal = 0;
        Object.entries(districts).forEach(([_, teamVotes]) => {
          teamVoteTotal += (teamVotes[team.id] || 0);
        });

        return {
          ...team,
          votes: teamVoteTotal,
          votePercentage: totalVotes > 0 ? (teamVoteTotal / totalVotes) * 100 : 0
        };
      })
      .sort((a, b) => b.votes - a.votes)
      .map((team, index) => ({
        ...team,
        rank: index + 1
      }));
  }, [teams, districts, totalVotes]);

  // Leading Team
  const leadingTeam = sortedTeams[0];

  // 2. Compile District totals and stats dynamically
  const compiledDistrictsList = useMemo(() => {
    const list: District[] = [];

    Object.entries(districts).forEach(([districtName, teamVotes]) => {
      let totalDistrictVotes = 0;
      let winningTeamId = '';
      let winningTeamName = '';
      let winningTeamFlag = '';
      let maxVotes = -1;

      Object.entries(teamVotes).forEach(([teamId, voteCount]) => {
        totalDistrictVotes += voteCount;
        if (voteCount > maxVotes) {
          maxVotes = voteCount;
          winningTeamId = teamId;
        }
      });

      // Find the winning team details
      const tm = teams.find(t => t.id === winningTeamId);
      if (tm) {
        winningTeamName = tm.name;
        winningTeamFlag = tm.flag;
      }

      const winningPercentage = totalDistrictVotes > 0 ? (maxVotes / totalDistrictVotes) * 100 : 0;

      list.push({
        id: districtName.toLowerCase().replace(/\s+/g, '-'),
        name: districtName,
        totalVotes: totalDistrictVotes,
        leadingTeamId: winningTeamId,
        leadingTeamName: winningTeamName,
        leadingTeamFlag: winningTeamFlag,
        leadingTeamPercentage: winningPercentage,
        votesByTeam: teamVotes
      });
    });

    return list;
  }, [districts, teams]);

  // Find Most Active District (sorted by total votes)
  const sortedDistrictsByActivity = useMemo(() => {
    return [...compiledDistrictsList].sort((a, b) => b.totalVotes - a.totalVotes);
  }, [compiledDistrictsList]);

  const mostActiveDistrictItem = sortedDistrictsByActivity[0];

  // SECTION 1: Top Statistics values
  const participationRate = useMemo(() => {
    // Arbitrary realistic percentage reflecting the survey response density compared to standard estimates
    return 74.82;
  }, []);

  // Top 5 Teams (SECTION 2)
  const topFiveTeams = useMemo(() => {
    return sortedTeams.slice(0, 5);
  }, [sortedTeams]);

  // Top 10 Teams (SECTION 3)
  const topTenTeams = useMemo(() => {
    return sortedTeams.slice(0, 10);
  }, [sortedTeams]);

  // Live Heatmap District Information (SECTION 5)
  const selectedDistrictData = useMemo(() => {
    return compiledDistrictsList.find(d => d.name === selectedHeatmapDistrict);
  }, [compiledDistrictsList, selectedHeatmapDistrict]);

  // FAN BATTLE: Argentina vs Brazil (SECTION 7)
  const fanBattleStats = useMemo(() => {
    const argentina = sortedTeams.find(t => t.id === 'argentina') || { votes: 1, name: 'Argentina', flag: '🇦🇷' };
    const brazil = sortedTeams.find(t => t.id === 'brazil') || { votes: 1, name: 'Brazil', flag: '🇧🇷' };
    
    const combined = argentina.votes + brazil.votes;
    const argPercent = combined > 0 ? (argentina.votes / combined) * 100 : 50;
    const brzPercent = combined > 0 ? (brazil.votes / combined) * 100 : 50;

    return {
      argVotes: argentina.votes,
      brzVotes: brazil.votes,
      argPercent,
      brzPercent
    };
  }, [sortedTeams]);

  // Copy Link helper
  const handleCopyLink = () => {
    const linkToCopy = WEBSITE_SHARE_LINK || window.location.href;
    navigator.clipboard.writeText(linkToCopy);
    setShareFeedback('Website link copied to clipboard!');
    setTimeout(() => setShareFeedback(null), 3500);
  };

  // Hardcode fixed mock momentum positions for authentic sporting layout
  const getMomentum = (teamId: string, index: number) => {
    if (teamId === 'argentina') return 'up';
    if (teamId === 'brazil') return 'down';
    if (index % 3 === 0) return 'up';
    if (index % 3 === 1) return 'down';
    return 'none';
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-50 pb-20 pt-10" id="results-dashboard-page">
      {/* Visual Stadium overlay patterns */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Title & Top Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200" id="dashboard-header-block">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-mono font-bold tracking-wider uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-ping" />
              LIVE CENSUS TELEMETRY
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
              Kerala's Fan Census Dashboard
            </h1>
            <p className="text-slate-600 text-[11px] sm:text-xs font-semibold">
              Real-time analytics calibrating Malayali football loyalties across the 14 districts for the World Cup 2026.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {userVoted && userVoteData && (
              <div className="text-xs bg-blue-100 border border-blue-200 text-slate-800 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-sm">
                <span>✓ Verified Ballot: {teams.find(t => t.id === userVoteData.teamId)?.name} in {userVoteData.district}</span>
              </div>
            )}
          </div>
        </div>

        {/* ---------------- SECTION 1: TOP STATISTICS ---------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6" id="dashboard-section-1">
          {/* Total Votes Card */}
          <div className="glass-card rounded-2xl p-5 border border-slate-200/85 shadow-sm relative overflow-hidden flex flex-col justify-start gap-y-1.5" id="stat-total-votes">
            <div className="flex justify-between items-center text-slate-555 text-[10px] md:text-xs font-mono font-bold tracking-wide uppercase">
              <span>Total Votes</span>
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <div className="mt-2">
              <p className="font-mono text-lg sm:text-2xl font-black text-slate-900 leading-none">
                {formatNumber(totalVotes)}
              </p>
            </div>
          </div>

          {/* Leading Team Card */}
          <div className="glass-card rounded-2xl p-5 border border-slate-200/85 shadow-md relative overflow-hidden flex flex-col justify-start gap-y-1.5" id="stat-leading-team">
            <div className="flex justify-between items-center text-slate-555 text-[10px] md:text-xs font-mono font-bold tracking-wide uppercase">
              <span>Leading Team</span>
              <div className="relative flex items-center justify-center h-5 w-5 mr-1 select-none" id="animated-firing-trophy">
                {/* Firing glow effect behind */}
                <span className="absolute inset-[-4px] bg-gradient-to-t from-red-600 via-orange-400 to-amber-300 opacity-80 blur-[3px] rounded-full animate-pulse" />
                {/* Double background flames */}
                <Flame className="absolute -top-2.5 h-4 w-4 text-orange-500 animate-bounce" style={{ animationDuration: '1s' }} />
                <Flame className="absolute -top-2 h-3.5 w-3.5 text-red-500 animate-pulse" style={{ animationDuration: '0.7s', transform: 'scaleX(-1)' }} />
                {/* Golden trophy bobbing inside the fire */}
                <Trophy className="relative h-3.5 w-3.5 text-amber-300 drop-shadow-[0_1.5px_3px_rgba(251,191,36,0.95)] animate-bounce" style={{ animationDuration: '1.8s' }} />
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className={`font-display text-base sm:text-xl font-black leading-none uppercase truncate max-w-[120px] sm:max-w-[150px] ${getLeadingTeamColorClass(leadingTeam?.id)}`}>
                  {leadingTeam?.name}
                </p>
              </div>
              <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm select-none">
                <span className="absolute h-5 w-5 rounded-full" style={{ backgroundColor: leadingTeam?.primaryColor }} />
                <span className="absolute h-1.5 w-1.5 rounded-full" style={{ backgroundColor: leadingTeam?.secondaryColor }} />
              </span>
            </div>
          </div>

          {/* Most Active District Card */}
          <div className="glass-card rounded-2xl p-5 border border-slate-200/85 shadow-sm relative overflow-hidden flex flex-col justify-start gap-y-1.5" id="stat-active-district">
            <div className="flex justify-between items-center text-slate-555 text-[10px] md:text-xs font-mono font-bold tracking-wide uppercase">
              <span>Most Active District</span>
              <MapPin className="h-4 w-4 text-rose-500" />
            </div>
            <div className="mt-2">
              <p className="font-display text-base sm:text-xl font-black text-slate-900 leading-none uppercase truncate max-w-[140px] sm:max-w-[180px]">
                {mostActiveDistrictItem?.name}
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Section Layout for visual balance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Team Rankings & Leaderboard */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* ---------------- SECTION 2: KERALA TEAM RANKINGS ---------------- */}
            <div className="glass-card rounded-3xl p-6 border border-slate-200/85 shadow-md relative overflow-hidden" id="dashboard-section-2">
              <div className="absolute -left-10 -top-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-6">
                <div className="space-y-1">
                  <h2 className="font-display text-sm md:text-base lg:text-lg font-extrabold text-slate-900 uppercase flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-600" />
                    Kerala Team Rankings (Top 5)
                  </h2>
                </div>
              </div>

              {/* Progress Chart */}
              <div className="space-y-5">
                {topFiveTeams.map((team, index) => {
                  return (
                    <div key={team.id} className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] md:text-xs">
                        <div className="flex items-center space-x-2.5">
                          <span className="font-mono font-black text-slate-500 w-5">#{index + 1}</span>
                          <span className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm select-none">
                            <span className="absolute h-3.5 w-3.5 rounded-full" style={{ backgroundColor: team.primaryColor }} />
                            <span className="absolute h-1 w-1 rounded-full" style={{ backgroundColor: team.secondaryColor }} />
                          </span>
                          <span className="font-display font-bold text-slate-800">{team.name}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-mono text-slate-500 text-[10px] md:text-[11px]">{formatNumber(team.votes)} votes</span>
                          <span className="font-mono font-black text-blue-600">{team.votePercentage.toFixed(2)}%</span>
                        </div>
                      </div>
                      
                      <div className="relative h-3.5 w-full bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${team.votePercentage}%` }}
                          transition={{ duration: 1.2, delay: index * 0.1 }}
                          className="h-full rounded-full transition-all"
                          style={{
                            background: `linear-gradient(90deg, ${team.primaryColor}B0, ${team.primaryColor})`
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ---------------- SECTION 3: TOP 10 TEAMS LEADERBOARD ---------------- */}
            <div className="glass-card rounded-3xl p-6 border border-slate-200/85 shadow-md relative overflow-hidden" id="dashboard-section-3">
              <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <h3 className="font-display text-base font-extrabold text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    Top 10 Teams Leaderboard
                  </h3>
                  <p className="text-slate-500 text-[11px] font-medium">
                    Detailed metrics showing support levels, momentum indicators, and percentage breakdown.
                  </p>
                </div>
              </div>

              {/* Leaderboard Table Grid */}
              <div className="overflow-x-auto no-scrollbar w-full">
                <table className="w-full text-left border-collapse" id="leaderboard-table">
                  <thead>
                    <tr className="border-b border-slate-150 text-[9px] md:text-[10px] font-mono uppercase text-slate-500">
                      <th className="pb-3 pl-2 text-left w-[12%]">Rank</th>
                      <th className="pb-3 px-2 text-left w-[44%]">Country</th>
                      <th className="pb-3 px-2 text-right w-[20%]">Votes</th>
                      <th className="pb-3 px-2 text-right w-[14%]">Share</th>
                      <th className="pb-3 pr-2 text-right w-[10%]">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150">
                    {topTenTeams.map((team, index) => {
                      const momentum = getMomentum(team.id, index);
                      return (
                        <tr key={team.id} className="text-[11px] md:text-xs hover:bg-slate-100/30 transition-colors">
                          <td className="py-3 pl-2 font-mono font-bold text-slate-500 align-middle">
                            {index === 0 && <span className="text-sm">🥇</span>}
                            {index === 1 && <span className="text-sm">🥈</span>}
                            {index === 2 && <span className="text-sm">🥉</span>}
                            {index > 2 && <span className="text-[10px] md:text-xs">#{index + 1}</span>}
                          </td>
                          <td className="py-3 px-2 font-semibold text-slate-850 align-middle">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm select-none shrink-0">
                                <span className="absolute h-3.5 w-3.5 rounded-full" style={{ backgroundColor: team.primaryColor }} />
                                <span className="absolute h-1 w-1 rounded-full" style={{ backgroundColor: team.secondaryColor }} />
                              </span>
                              <span className="font-display truncate text-[11px] md:text-xs">{team.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-right font-mono text-slate-650 font-medium align-middle whitespace-nowrap">
                            {formatNumber(team.votes)}
                          </td>
                          <td className="py-3 px-2 text-right font-mono text-blue-600 font-bold align-middle whitespace-nowrap">
                            {team.votePercentage.toFixed(1)}%
                          </td>
                          <td className="py-3 pr-2 text-right align-middle">
                            <div className="flex justify-end">
                              {momentum === 'up' && (
                                <span className="text-emerald-500 bg-emerald-500/10 px-1 py-0.5 rounded text-[9px] md:text-[10px] font-bold flex items-center gap-0.5 border border-emerald-500/20 whitespace-nowrap">
                                  <TrendingUp className="h-2.5 w-2.5" />
                                  <span>Rise</span>
                                </span>
                              )}
                              {momentum === 'down' && (
                                <span className="text-rose-500 bg-rose-500/10 px-1 py-0.5 rounded text-[9px] md:text-[10px] font-bold flex items-center gap-0.5 border border-rose-500/20 whitespace-nowrap">
                                  <TrendingDown className="h-2.5 w-2.5" />
                                  <span>Drop</span>
                                </span>
                              )}
                              {momentum === 'none' && (
                                <span className="text-slate-500 px-1 py-0.5 text-[10px] flex items-center justify-center">
                                  <Minus className="h-2.5 w-2.5" />
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* RIGHT: Kerala Interactive Map / Heatmap & District dominations */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* ---------------- SECTION 5: KERALA FOOTBALL HEATMAP ---------------- */}
            <div className="glass-card rounded-3xl p-6 border border-slate-200/85 shadow-md relative overflow-hidden" id="dashboard-section-5">
              <div className="absolute -right-10 top-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <h3 className="font-display text-base font-extrabold text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                    <Globe className="h-4 w-4 text-blue-600" />
                    Kerala Football Heatmap
                  </h3>
                  <p className="text-slate-500 text-[11px] font-medium">
                    Interactive calibration engine. Hover or select a district to analyze dominance.
                  </p>
                </div>
              </div>

              {/* District Navigator Interactive Grid */}
              <div className="space-y-5" id="heatmap-interactive-grid">
                
                {/* Choose District Dropdown Selector */}
                <div className="space-y-1.5">
                  <label htmlFor="district-wise-selector" className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase block">
                    District Wise Selection
                  </label>
                  <div className="relative" id="district-select-container">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-550">
                      <MapPin className="h-4 w-4 text-blue-600" />
                    </span>
                    <select
                      id="district-wise-selector"
                      value={selectedHeatmapDistrict}
                      onChange={(e) => setSelectedHeatmapDistrict(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200 text-slate-800 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm cursor-pointer transition-all appearance-none"
                    >
                      {compiledDistrictsList.map(dist => (
                        <option key={dist.name} value={dist.name} className="font-semibold text-slate-800">
                          {dist.name} - {formatNumber(dist.totalVotes)} Votes Counted
                        </option>
                      ))}
                    </select>
                    <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-450">
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                {/* Horizontal Selector chips deck for quick clickable visual tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 overflow-y-hidden no-scrollbar" id="district-chips-container">
                  {compiledDistrictsList.map(dist => {
                    const isSelected = dist.name === selectedHeatmapDistrict;
                    return (
                      <button
                        key={dist.name}
                        onClick={() => setSelectedHeatmapDistrict(dist.name)}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer shrink-0 border ${
                          isSelected 
                            ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20' 
                            : 'bg-white border-slate-200 hover:border-slate-350 text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {dist.name}
                      </button>
                    );
                  })}
                </div>

                {/* Display card showing metrics for selected district */}
                <AnimatePresence mode="wait">
                  {selectedDistrictData && (
                    <motion.div
                      key={selectedDistrictData.name}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 relative overflow-hidden"
                      id="selected-heatmap-display"
                    >
                      {/* background soccer watermark */}
                      <span className="absolute -right-10 -bottom-10 text-[120px] opacity-[0.03] select-none pointer-events-none">
                        ⚽
                      </span>
                      <div className="flex items-center justify-between mb-4">
                        <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-1 rounded">
                          <MapPin className="h-3 w-3 inline" />
                          {selectedDistrictData.name} District Profile
                        </span>
                        <span className="font-mono text-xs font-bold text-slate-505">
                          {formatNumber(selectedDistrictData.totalVotes)} total votes
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                            Leading Fandom
                          </p>
                          <div className="flex items-center space-x-2.5 mt-1.5">
                            {(() => {
                              const tm = teams.find(t => t.id === selectedDistrictData.leadingTeamId);
                              return (
                                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-250 bg-white shadow-sm select-none">
                                  <span className="absolute h-6 w-6 rounded-full" style={{ backgroundColor: tm?.primaryColor || '#000' }} />
                                  <span className="absolute h-2 w-2 rounded-full" style={{ backgroundColor: tm?.secondaryColor || '#fff' }} />
                                </span>
                              );
                            })()}
                            <div>
                              <p className="font-display font-black text-xl text-slate-900 uppercase leading-none">
                                {selectedDistrictData.leadingTeamName}
                              </p>
                              <span className="text-xs text-blue-600 font-bold font-mono tracking-wide">
                                Dominating with {selectedDistrictData.leadingTeamPercentage.toFixed(1)}% votes
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Comparative runner up visual */}
                        <div className="space-y-1.5 pt-2 border-t border-slate-200">
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">
                            Fanbase Breakdown Density
                          </span>
                          <div className="flex items-center h-2 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
                            {/* Brazil portion */}
                            <div 
                              className="h-full bg-[#FEDF00]" 
                              style={{ width: `${selectedDistrictData.leadingTeamId === 'brazil' ? selectedDistrictData.leadingTeamPercentage : 30}%` }} 
                              title="Brazil Fandom Segment"
                            />
                            {/* Argentina portion */}
                            <div 
                              className="h-full bg-[#74ACDF]" 
                              style={{ width: `${selectedDistrictData.leadingTeamId === 'argentina' ? selectedDistrictData.leadingTeamPercentage : 45}%` }} 
                              title="Argentina Fandom Segment"
                            />
                            {/* Portugal portion */}
                            <div 
                              className="h-full bg-rose-600" 
                              style={{ width: `${selectedDistrictData.leadingTeamId === 'portugal' ? selectedDistrictData.leadingTeamPercentage : 18}%` }} 
                              title="Portugal Fandom Segment"
                            />
                            {/* Others */}
                            <div 
                              className="h-full bg-indigo-500" 
                              style={{ width: '7%' }} 
                              title="Others"
                            />
                          </div>
                          <div className="flex items-center justify-between text-[9px] font-mono text-slate-500">
                            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#74ACDF]" /> Argentina</span>
                            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#FEDF00]" /> Brazil</span>
                            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-rose-600" /> Portugal</span>
                            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> Others</span>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

            {/* ---------------- SECTION 6: MOST ACTIVE DISTRICTS ranking ---------------- */}
            <div className="glass-card rounded-3xl p-6 border border-slate-200/85 shadow-md relative overflow-hidden" id="dashboard-section-6">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
                <h3 className="font-display text-base font-extrabold text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-rose-500" />
                  Most Active Districts
                </h3>
                <span className="text-[10px] text-slate-500 font-mono">By Voter Density</span>
              </div>

              {/* District Activity list */}
              <div className="space-y-3" id="active-districts-list">
                {sortedDistrictsByActivity.slice(0, 5).map((district, index) => {
                  return (
                    <div 
                      key={district.name} 
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-150 text-xs hover:border-slate-300 transition-colors"
                     >
                      <div className="flex items-center space-x-3">
                        <span className="h-5 w-5 rounded-lg flex items-center justify-center font-mono font-bold bg-white border border-slate-200 text-slate-500">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-bold text-slate-800">{district.name}</p>
                          <span className="text-[9px] text-slate-500 font-mono tracking-wider flex items-center gap-1">
                            🥇 Leading Support: <span className="font-bold text-amber-700">{district.leadingTeamName}</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-xs font-bold text-slate-800">{formatNumber(district.totalVotes)}</p>
                        <span className="text-[8px] uppercase font-mono tracking-widest text-amber-600 font-bold">votes cast</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ---------------- SECTION 7: FAN BATTLE ---------------- */}
            <div className="glass-card rounded-3xl p-6 border border-slate-200/85 shadow-md relative overflow-hidden" id="dashboard-section-7">
              <div className="absolute inset-0 bg-stadium-glow opacity-10 pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="font-display text-amber-650 text-sm font-black tracking-widest uppercase flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-amber-500" />
                  Kerala Fan Battle Elite
                </h3>
                <span className="text-[10px] font-mono bg-indigo-50 text-indigo-600 border border-indigo-200 px-2 py-0.5 rounded-full font-bold">
                  Epic Showdown
                </span>
              </div>
              
              {/* Argentina vs Brazil direct stats bar */}
              <div className="space-y-4">
                <div className="flex justify-between items-center font-display">
                  <div className="text-left font-semibold">
                    <div className="flex justify-start mb-1 select-none">
                      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
                        <span className="absolute h-5 w-5 rounded-full" style={{ backgroundColor: '#74ACDF' }} />
                        <span className="absolute h-1 w-1 rounded-full bg-white" />
                      </span>
                    </div>
                    <h4 className="font-black text-sm text-[#74ACDF] uppercase">Argentina</h4>
                    <span className="font-mono text-xs text-slate-500">{formatNumber(fanBattleStats.argVotes)} votes</span>
                  </div>

                  <span className="font-mono font-black text-slate-400 text-lg">VS</span>

                  <div className="text-right font-semibold">
                    <div className="flex justify-end mb-1 select-none">
                      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
                        <span className="absolute h-5 w-5 rounded-full" style={{ backgroundColor: '#009739' }} />
                        <span className="absolute h-1 w-1 rounded-full bg-[#FEDF00]" />
                      </span>
                    </div>
                    <h4 className="font-black text-sm text-[#EAB308] uppercase">Brazil</h4>
                    <span className="font-mono text-xs text-slate-500">{formatNumber(fanBattleStats.brzVotes)} votes</span>
                  </div>
                </div>

                {/* Animated battle comparison bar */}
                <div className="space-y-1">
                  <div className="h-5 w-full bg-slate-100 border border-slate-200 rounded-lg overflow-hidden flex">
                    {/* Argentina slice */}
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 text-[10px] font-mono font-bold text-white flex items-center pl-3 transition-all"
                      style={{ width: `${fanBattleStats.argPercent}%` }}
                    >
                      {fanBattleStats.argPercent.toFixed(1)}%
                    </div>
                    {/* Brazil slice */}
                    <div 
                      className="h-full bg-gradient-to-l from-[#FEDF00] to-[#EAB308] text-[10px] font-mono font-bold text-slate-900 flex items-center justify-end pr-3 transition-all"
                      style={{ width: `${fanBattleStats.brzPercent}%` }}
                    >
                      {fanBattleStats.brzPercent.toFixed(1)}%
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-500">
                    <span>Cochin-Malabar Albiceleste</span>
                    <span>Canarinho Coastline</span>
                  </div>
                </div>
              </div>
            </div>
             {/* ---------------- SECTION 8: SHARE THE RESULTS ---------------- */}
            <div className="glass-card rounded-3xl p-6 border border-slate-200/85 shadow-md relative overflow-hidden" id="dashboard-section-8">
              <div className="space-y-1 text-center mb-6">
                <Share2 className="h-8 w-8 text-blue-500 mx-auto" />
                <h3 className="font-display text-slate-800 text-base font-extrabold uppercase tracking-tight">Rally Your District</h3>
                <p className="text-slate-500 text-xs font-semibold max-w-sm mx-auto">
                  Copy and share the official website link with other fans from Kerala.
                </p>
              </div>

              {/* Share link input with Copy button */}
              <div className="space-y-3" id="share-link-workspace">
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={WEBSITE_SHARE_LINK}
                    placeholder="https://your-website-url-here.com"
                    className="flex-1 px-3 py-2.5 bg-slate-50 border border-slate-250 text-slate-700 text-xs font-mono rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 select-all"
                    id="share-link-input"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2.5 bg-[#016bfc] hover:bg-blue-600 text-white font-bold text-xs font-mono uppercase rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 shrink-0 shadow-sm"
                    id="copy-share-link-btn"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              {/* Share Status Feedback */}
              <AnimatePresence>
                {shareFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] text-center font-mono font-semibold"
                  >
                    💡 {shareFeedback}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

        {/* ---------------- SECTION 4: DISTRICT DOMINATION ANALYSIS ---------------- */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200/85 shadow-md relative overflow-hidden" id="dashboard-section-4">
          <div className="absolute -left-10 -bottom-10 w-44 h-44 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="space-y-1">
              <h3 className="font-display text-lg font-extrabold text-slate-900 uppercase tracking-tight flex items-center gap-2">
                <MapPin className="h-5 w-5 text-indigo-600" />
                District Domination Analysis (All 14 Districts)
              </h3>
              <p className="text-slate-500 text-xs font-semibold">
                Real-time snapshot showing which World Cup contender holds supremacy in each native territory.
              </p>
            </div>
            <div className="font-mono text-[10px] bg-slate-50 rounded-lg px-3 py-1 text-slate-505 border border-slate-200 font-semibold">
              Live updates
            </div>
          </div>

          {/* Domination grid of all 14 districts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="district-domination-grid">
            {compiledDistrictsList.map(district => {
              // Calculate specific label styling based on the winning nation
              const isArgentina = district.leadingTeamId === 'argentina';
              const isBrazil = district.leadingTeamId === 'brazil';
              const isPortugal = district.leadingTeamId === 'portugal';
              
              let winningColorClass = 'text-indigo-400 border-indigo-500/10 bg-indigo-500/5';
              if (isArgentina) winningColorClass = 'text-[#74ACDF] border-[#74ACDF]/20 bg-[#74ACDF]/10';
              if (isBrazil) winningColorClass = 'text-[#FEDF00] border-[#FEDF00]/20 bg-[#FEDF00]/10';
              if (isPortugal) winningColorClass = 'text-[#FF0000] border-[#FF0000]/20 bg-[#FF0000]/10';

              return (
                <div 
                  key={district.name} 
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-150 hover:border-slate-300 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-extrabold text-slate-800 text-sm">
                      {district.name}
                    </span>
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {(() => {
                        const tm = teams.find(t => t.id === district.leadingTeamId);
                        return (
                          <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm select-none">
                            <span className="absolute h-5 w-5 rounded-full" style={{ backgroundColor: tm?.primaryColor || '#000' }} />
                            <span className="absolute h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tm?.secondaryColor || '#fff' }} />
                          </span>
                        );
                      })()}
                      <div>
                        <p className="text-[10px] uppercase font-mono font-bold text-slate-440 tracking-wider">Supreme Team</p>
                        <p className="text-xs font-bold text-slate-800">{district.leadingTeamName}</p>
                      </div>
                    </div>
                  </div>

                  {/* Percentage bubble details */}
                  <div className={`p-2 rounded-xl text-center border text-[11px] font-mono font-black ${winningColorClass}`}>
                    🏆 {district.leadingTeamPercentage.toFixed(1)}% Domination
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
