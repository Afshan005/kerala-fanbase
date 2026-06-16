export interface Team {
  id: string;
  name: string;
  flag: string;
  primaryColor: string; // Hex or tailwind class color for branding glow
  secondaryColor: string;
  votes: number;
  votePercentage: number;
  rank: number;
}

export interface District {
  id: string;
  name: string;
  totalVotes: number;
  leadingTeamId: string;
  leadingTeamName: string;
  leadingTeamFlag: string;
  leadingTeamPercentage: number;
  votesByTeam: Record<string, number>; // teamId -> voteCount
}

export interface ParticipantStats {
  totalVotes: number;
  activeFans: number;
  participationRate: number;
  leadingTeam: string;
  leadingTeamIcon: string;
  mostActiveDistrict: string;
}

export interface ActivityFeedItem {
  id: string;
  name: string;
  district: string;
  teamName: string;
  teamFlag: string;
  timestamp: string;
}

export type PageIndex = 'home' | 'team-selection' | 'district-selection' | 'results';
