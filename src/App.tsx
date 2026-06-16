/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import TeamSelectionPage from './components/TeamSelectionPage';
import DistrictSelectionPage from './components/DistrictSelectionPage';
import ResultsDashboardPage from './components/ResultsDashboardPage';

import { Team, PageIndex, ActivityFeedItem } from './types';
import { INITIAL_TEAMS, getInitialDistrictVotes, MALLU_NAMES, DISTRICTS_LIST } from './data';

// Local storage keys
const LOCAL_STORAGE_TEAMS_KEY = 'fans_of_kerala_teams_v2_fresh';
const LOCAL_STORAGE_DISTRICTS_KEY = 'fans_of_kerala_districts_v2_fresh';
const LOCAL_STORAGE_VOTED_KEY = 'fans_of_kerala_user_voted_v2_fresh';
const LOCAL_STORAGE_VOTED_DATA_KEY = 'fans_of_kerala_user_vote_data_v2_fresh';

export default function App() {
  // 1. Core States
  const [currentPage, setCurrentPage] = useState<PageIndex>('home');
  const [teams, setTeams] = useState<Team[]>([]);
  const [districts, setDistricts] = useState<Record<string, Record<string, number>>>({});
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  
  // User voting details
  const [userVoted, setUserVoted] = useState<boolean>(false);
  const [userVoteData, setUserVoteData] = useState<{ teamId: string; district: string } | null>(null);

  // Live simulation activity list (recent community votes)
  const [recentActivity, setRecentActivity] = useState<ActivityFeedItem[]>([]);

  // 2. Initialize application state from local storage or seeded metrics
  useEffect(() => {
    const savedTeams = localStorage.getItem(LOCAL_STORAGE_TEAMS_KEY);
    const savedDistricts = localStorage.getItem(LOCAL_STORAGE_DISTRICTS_KEY);
    const savedUserVoted = localStorage.getItem(LOCAL_STORAGE_VOTED_KEY);
    const savedUserVoteData = localStorage.getItem(LOCAL_STORAGE_VOTED_DATA_KEY);

    let loadedTeams = INITIAL_TEAMS;
    let loadedDistricts = getInitialDistrictVotes(INITIAL_TEAMS);

    if (savedTeams) {
      try {
        loadedTeams = JSON.parse(savedTeams);
      } catch (err) {
        console.error('Error parsing stored teams', err);
      }
    }

    if (savedDistricts) {
      try {
        loadedDistricts = JSON.parse(savedDistricts);
      } catch (err) {
        console.error('Error parsing stored districts', err);
      }
    }

    setTeams(loadedTeams);
    setDistricts(loadedDistricts);

    if (savedUserVoted === 'true') {
      setUserVoted(true);
    }

    if (savedUserVoteData) {
      try {
        setUserVoteData(JSON.parse(savedUserVoteData));
      } catch (err) {
        console.error('Error parsing user vote data', err);
      }
    }

    // Seed initial list of recent activity feed objects on page load
    const initialActivityList: ActivityFeedItem[] = Array.from({ length: 6 }).map((_, i) => {
      const randomName = MALLU_NAMES[Math.floor(Math.random() * MALLU_NAMES.length)];
      const randomDistrict = DISTRICTS_LIST[Math.floor(Math.random() * DISTRICTS_LIST.length)];
      
      // Kerala giants get heavily indexed for default simulated feed
      const favNations = ['argentina', 'brazil', 'portugal', 'france', 'germany'];
      const randomTeamId = Math.random() > 0.15 
        ? favNations[Math.floor(Math.random() * favNations.length)]
        : INITIAL_TEAMS[Math.floor(Math.random() * INITIAL_TEAMS.length)].id;
        
      const teamObj = INITIAL_TEAMS.find(t => t.id === randomTeamId) || INITIAL_TEAMS[0];

      return {
        id: `activity-init-${i}-${Date.now()}`,
        name: randomName,
        district: randomDistrict,
        teamName: teamObj.name,
        teamFlag: teamObj.flag,
        timestamp: `${2 + i} mins ago`
      };
    });

    setRecentActivity(initialActivityList);
  }, []);

  // 3. Dynamic Calculation derived aggregate metrics
  const totalVotes = useMemo(() => {
    let sum = 0;
    Object.values(districts).forEach(teamCounts => {
      Object.values(teamCounts).forEach(count => {
        sum += count;
      });
    });
    return sum;
  }, [districts]);

  const activeFans = useMemo(() => {
    // Statistically proportional participation mapping derived dynamically
    return Math.round(totalVotes / 14.28);
  }, [totalVotes]);

  // 4. Reset the simulated census to defaults
  const handleResetCensus = () => {
    localStorage.removeItem(LOCAL_STORAGE_TEAMS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_DISTRICTS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_VOTED_KEY);
    localStorage.removeItem(LOCAL_STORAGE_VOTED_DATA_KEY);

    setTeams(INITIAL_TEAMS);
    setDistricts(getInitialDistrictVotes(INITIAL_TEAMS));
    setSelectedTeamId(null);
    setSelectedDistrict('');
    setUserVoted(false);
    setUserVoteData(null);
  };

  // 5. Simulate real-time continuous incoming fan submissions
  // Adds highly engaging sports-feed atmosphere
  useEffect(() => {
    const interval = setInterval(() => {
      if (teams.length === 0 || Object.keys(districts).length === 0) return;

      const randomName = MALLU_NAMES[Math.floor(Math.random() * MALLU_NAMES.length)];
      const randomDistrict = DISTRICTS_LIST[Math.floor(Math.random() * DISTRICTS_LIST.length)];
      
      // Kerala soccer demographics: 85% votes go to the big 5
      const favNations = ['argentina', 'brazil', 'portugal', 'france', 'germany'];
      let chosenTeamId = '';
      if (Math.random() < 0.85) {
        // Higher probability distribution weights matching local demographics
        const rand = Math.random();
        if (rand < 0.40) chosenTeamId = 'argentina';
        else if (rand < 0.75) chosenTeamId = 'brazil';
        else if (rand < 0.90) chosenTeamId = 'portugal';
        else if (rand < 0.96) chosenTeamId = 'france';
        else chosenTeamId = 'germany';
      } else {
        chosenTeamId = teams[Math.floor(Math.random() * teams.length)].id;
      }

      const teamObj = teams.find(t => t.id === chosenTeamId) || teams[0];

      // Update the state arrays by incrementing
      setDistricts(prevDistricts => {
        const nextDistricts = { ...prevDistricts };
        if (!nextDistricts[randomDistrict]) {
          nextDistricts[randomDistrict] = {};
        }
        nextDistricts[randomDistrict][chosenTeamId] = (nextDistricts[randomDistrict][chosenTeamId] || 0) + 1;
        
        // Save to storage
        localStorage.setItem(LOCAL_STORAGE_DISTRICTS_KEY, JSON.stringify(nextDistricts));
        return nextDistricts;
      });

      // Update activity feed list
      setRecentActivity(prev => {
        const newItem: ActivityFeedItem = {
          id: `activity-live-${Date.now()}`,
          name: randomName,
          district: randomDistrict,
          teamName: teamObj.name,
          teamFlag: teamObj.flag,
          timestamp: 'Just now'
        };
        return [newItem, ...prev.slice(0, 7)];
      });

    }, 5500); // Trigger new simulated vote every 5.5 seconds

    return () => clearInterval(interval);
  }, [teams, districts]);

  // 6. User locks in their official vote response
  const submitVote = () => {
    if (!selectedTeamId || !selectedDistrict) return;

    // Increment in the local state
    setDistricts(prevDistricts => {
      const nextDistricts = { ...prevDistricts };
      if (!nextDistricts[selectedDistrict]) {
        nextDistricts[selectedDistrict] = {};
      }
      nextDistricts[selectedDistrict][selectedTeamId] = (nextDistricts[selectedDistrict][selectedTeamId] || 0) + 1;

      // Persist districts
      localStorage.setItem(LOCAL_STORAGE_DISTRICTS_KEY, JSON.stringify(nextDistricts));
      return nextDistricts;
    });

    const voteData = { teamId: selectedTeamId, district: selectedDistrict };
    
    setUserVoted(true);
    setUserVoteData(voteData);

    localStorage.setItem(LOCAL_STORAGE_VOTED_KEY, 'true');
    localStorage.setItem(LOCAL_STORAGE_VOTED_DATA_KEY, JSON.stringify(voteData));

    // Append user vote announcement to activity log
    const userTeamObj = teams.find(t => t.id === selectedTeamId);
    if (userTeamObj) {
      setRecentActivity(prev => {
        const userActivityItem: ActivityFeedItem = {
          id: `activity-user-${Date.now()}`,
          name: 'You (Official Ballot)',
          district: selectedDistrict,
          teamName: userTeamObj.name,
          teamFlag: userTeamObj.flag,
          timestamp: 'Just now'
        };
        return [userActivityItem, ...prev.slice(0, 7)];
      });
    }
  };

  // 7. Render appropriate page based on routing state
  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            setCurrentPage={setCurrentPage}
            recentActivity={recentActivity}
            totalVotes={totalVotes}
            activeFans={activeFans}
          />
        );
      case 'team-selection':
        return (
          <TeamSelectionPage
            teams={teams}
            selectedTeamId={selectedTeamId}
            setSelectedTeamId={setSelectedTeamId}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'district-selection':
        return (
          <DistrictSelectionPage
            teams={teams}
            selectedTeamId={selectedTeamId}
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={setSelectedDistrict}
            setCurrentPage={setCurrentPage}
            submitVote={submitVote}
            totalVotes={totalVotes}
            activeFans={activeFans}
          />
        );
      case 'results':
        return (
          <ResultsDashboardPage
            teams={teams}
            districts={districts}
            activeFans={activeFans}
            totalVotes={totalVotes}
            handleResetCensus={handleResetCensus}
            userVoted={userVoted}
            userVoteData={userVoteData}
          />
        );
      default:
        return (
          <HomePage
            setCurrentPage={setCurrentPage}
            recentActivity={recentActivity}
            totalVotes={totalVotes}
            activeFans={activeFans}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between selection:bg-blue-600 selection:text-white overflow-x-hidden" id="main-app-container">
      
      {/* Shared Control Header */}
      <Header
        totalVotes={totalVotes}
        activeFans={activeFans}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        userVoted={userVoted}
      />

      {/* Main Pages Content Window */}
      <main className="flex-grow">
        {renderActivePage()}
      </main>

      {/* Footnote Branding Copyright Footer */}
      <footer className="py-6 border-t border-slate-200 bg-white text-center text-xs text-slate-500" id="official-page-footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-2">
          <p className="font-display font-medium text-slate-400 uppercase tracking-widest text-[10px]">
            Fans of Kerala Census 2026 • FIFA World Cup Campaign
          </p>
          <p>© 2026 Football Association of Malayali Fans. All simulation assets reserved.</p>
        </div>
      </footer>

    </div>
  );
}
