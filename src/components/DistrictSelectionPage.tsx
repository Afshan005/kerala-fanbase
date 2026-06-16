import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Navigation, Activity, ArrowLeft, Trophy, Users, Globe } from 'lucide-react';
import { PageIndex, Team } from '../types';

interface DistrictSelectionPageProps {
  teams: Team[];
  selectedTeamId: string | null;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  setCurrentPage: (page: PageIndex) => void;
  submitVote: () => void;
  totalVotes: number;
  activeFans: number;
}

export default function DistrictSelectionPage({
  teams,
  selectedTeamId,
  selectedDistrict,
  setSelectedDistrict,
  setCurrentPage,
  submitVote,
  totalVotes,
  activeFans
}: DistrictSelectionPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Available Districts
  const districts = [
    'Thiruvananthapuram',
    'Kollam',
    'Pathanamthitta',
    'Alappuzha',
    'Kottayam',
    'Idukki',
    'Ernakulam',
    'Thrissur',
    'Palakkad',
    'Malappuram',
    'Kozhikode',
    'Wayanad',
    'Kannur',
    'Kasaragod'
  ];

  // Selected Team Details
  const selectedTeam = teams.find(t => t.id === selectedTeamId);

  // Format Helper
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeamId || !selectedDistrict) return;

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      submitVote(); // record inside state
      setIsSubmitting(false);
      setShowSuccess(true);

      // Automatically redirect to Results Page after 2 seconds
      setTimeout(() => {
        setCurrentPage('results');
      }, 2000);

    }, 1500);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-50 pb-20 pt-10 flex items-center" id="district-selection-container">
      {/* Stadium backdrop lights */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-500/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link Button */}
        <button
          onClick={() => setCurrentPage('team-selection')}
          className="inline-flex items-center space-x-2 text-[10px] md:text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors mb-6 cursor-pointer"
          id="back-to-teams-btn"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Change selected team</span>
        </button>

        {/* Header step progress */}
        <div className="flex items-center space-x-2 text-[10px] md:text-xs font-mono font-bold tracking-wider text-blue-600 mb-3 uppercase justify-start">
          <span>Step 2 of 2</span>
          <span>•</span>
          <span className="text-slate-500 font-bold">District Calibration</span>
        </div>

        {/* Success Splash Overlay */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xl"
              id="success-overlay"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="text-center space-y-6 max-w-sm px-6 py-10 rounded-3xl bg-white border border-blue-200 shadow-2xl"
              >
                <div className="flex justify-center">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 border border-blue-200 shadow-xl">
                    <CheckCircle2 className="h-10 w-10 text-blue-600 animate-bounce" />
                    <div className="absolute -inset-1 rounded-full border border-blue-400 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="font-display font-black text-2xl text-slate-900 uppercase tracking-tight">
                    ✓ Vote Recorded!
                  </h2>
                  <p className="text-sm text-slate-650 flex items-center justify-center gap-1.5 flex-wrap">
                    Your ballot for 
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      {selectedTeam?.name}
                      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm select-none">
                        <span className="absolute h-2.5 w-2.5 rounded-full" style={{ backgroundColor: selectedTeam?.primaryColor || '#000' }} />
                        <span className="absolute h-0.5 w-0.5 rounded-full" style={{ backgroundColor: selectedTeam?.secondaryColor || '#fff' }} />
                      </span>
                    </span> 
                    represented in <span className="font-bold text-slate-900">{selectedDistrict}</span> is registered correctly.
                  </p>
                </div>

                <div className="text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase flex items-center justify-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
                  Routing to dashboard live...
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full" id="district-form-panel">
          
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/85 shadow-xl space-y-6">
            
            {/* Header */}
            <div className="space-y-2">
              <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 uppercase flex items-center gap-2">
                <Navigation className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                Where Are You From?
              </h1>
              <p className="text-slate-650 text-[11px] sm:text-xs md:text-sm font-medium">
                Help map Kerala's football passion district by district. Select your native district below to complete the census.
              </p>
            </div>

            {/* Vote preview container */}
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between gap-4" id="selected-team-review-card">
              <div className="flex items-center space-x-3 min-w-0">
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm select-none shrink-0">
                  <span className="absolute h-6 w-6 rounded-full" style={{ backgroundColor: selectedTeam?.primaryColor || '#000' }} />
                  <span className="absolute h-1.5 w-1.5 rounded-full" style={{ backgroundColor: selectedTeam?.secondaryColor || '#fff' }} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Your Fav Nation</h3>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 truncate">{selectedTeam?.name}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[9px] md:text-[10px] whitespace-nowrap font-mono font-bold rounded-full px-2.5 py-1 bg-slate-200 text-slate-900 border border-slate-300">
                  Ready to lock
                </span>
              </div>
            </div>

            {/* Form Input Selector */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <label htmlFor="district-select" className="text-[10px] md:text-xs font-mono font-bold tracking-wider text-slate-500 uppercase block">
                  Select Your native District
                </label>
                <div className="relative">
                  <select
                    id="district-select"
                    required
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full h-14 pl-4 pr-10 py-3.5 rounded-xl bg-slate-100 border border-slate-350 hover:border-slate-400 focus:outline-none focus:border-blue-550 text-xs md:text-sm text-slate-900 transition-colors appearance-none cursor-pointer font-semibold shadow-sm"
                  >
                    <option value="" className="text-slate-500">-- Choose Kerala District --</option>
                    {districts.map(dist => (
                      <option key={dist} value={dist} className="text-slate-900">
                        {dist}
                      </option>
                    ))}
                  </select>
                  {/* custom arrow caret */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Submission CTA Button */}
              <button
                type="submit"
                disabled={!selectedDistrict || isSubmitting}
                className={`w-full h-14 relative flex items-center justify-center space-x-2 rounded-xl font-display font-bold tracking-wider text-xs md:text-sm uppercase transition-all cursor-pointer ${
                  selectedDistrict && !isSubmitting
                    ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white hover:shadow-xl hover:shadow-blue-500/25 hover:scale-[1.01] active:scale-95 font-bold'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300'
                }`}
                id="district-submit-btn"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>TRANSMITTING BALLOT...</span>
                  </div>
                ) : (
                  <span>Submit Vote</span>
                )}
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}
