import { Team, District } from './types';

export const INITIAL_TEAMS: Team[] = [
  // Host Nations
  { id: 'canada', name: 'Canada', flag: '🇨🇦', primaryColor: '#FF0000', secondaryColor: '#FFFFFF', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'mexico', name: 'Mexico', flag: '🇲🇽', primaryColor: '#006847', secondaryColor: '#CE1126', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'usa', name: 'United States', flag: '🇺🇸', primaryColor: '#002868', secondaryColor: '#BF0A30', votes: 0, votePercentage: 0, rank: 0 },
  
  // High Profile Favourites (Kerala Giants)
  { id: 'argentina', name: 'Argentina', flag: '🇦🇷', primaryColor: '#74ACDF', secondaryColor: '#FFFFFF', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'brazil', name: 'Brazil', flag: '🇧🇷', primaryColor: '#009739', secondaryColor: '#FEDF00', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'portugal', name: 'Portugal', flag: '🇵🇹', primaryColor: '#FF0000', secondaryColor: '#115533', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'france', name: 'France', flag: '🇫🇷', primaryColor: '#002395', secondaryColor: '#ED2939', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'germany', name: 'Germany', flag: '🇩🇪', primaryColor: '#000000', secondaryColor: '#FFCC00', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'england', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', primaryColor: '#CF142B', secondaryColor: '#FFFFFF', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'spain', name: 'Spain', flag: '🇪🇸', primaryColor: '#C60B1E', secondaryColor: '#FFC400', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'netherlands', name: 'Netherlands', flag: '🇳🇱', primaryColor: '#21468B', secondaryColor: '#FF4F00', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'croatia', name: 'Croatia', flag: '🇭🇷', primaryColor: '#FF0000', secondaryColor: '#002C9B', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'morocco', name: 'Morocco', flag: '🇲🇦', primaryColor: '#C1272D', secondaryColor: '#006233', votes: 0, votePercentage: 0, rank: 0 },

  // Qualified Teams
  { id: 'algeria', name: 'Algeria', flag: '🇩🇿', primaryColor: '#006633', secondaryColor: '#D21034', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'australia', name: 'Australia', flag: '🇦🇺', primaryColor: '#000033', secondaryColor: '#FFCC00', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'austria', name: 'Austria', flag: '🇦🇹', primaryColor: '#ED2939', secondaryColor: '#FFFFFF', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'belgium', name: 'Belgium', flag: '🇧🇪', primaryColor: '#000000', secondaryColor: '#FFD300', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'bosnia-herzegovina', name: 'Bosnia and Herzegovina', flag: '🇧🇦', primaryColor: '#00209F', secondaryColor: '#FECB00', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'cape-verde', name: 'Cape Verde', flag: '🇨🇻', primaryColor: '#002A8F', secondaryColor: '#FF4F00', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'colombia', name: 'Colombia', flag: '🇨🇴', primaryColor: '#FCD116', secondaryColor: '#003893', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'dr-congo', name: 'DR Congo', flag: '🇨🇩', primaryColor: '#007FFF', secondaryColor: '#CE1021', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'ivory-coast', name: 'Ivory Coast', flag: '🇨🇮', primaryColor: '#F77F00', secondaryColor: '#009E60', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'curacao', name: 'Curaçao', flag: '🇨🇼', primaryColor: '#002B7F', secondaryColor: '#F9E814', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'czech-republic', name: 'Czech Republic', flag: '🇨🇿', primaryColor: '#11457E', secondaryColor: '#D91A30', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'ecuador', name: 'Ecuador', flag: '🇪🇨', primaryColor: '#FFCC00', secondaryColor: '#0033A0', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'egypt', name: 'Egypt', flag: '🇪🇬', primaryColor: '#C0930C', secondaryColor: '#C00000', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'ghana', name: 'Ghana', flag: '🇬🇭', primaryColor: '#FCD116', secondaryColor: '#006B3F', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'haiti', name: 'Haiti', flag: '🇭🇹', primaryColor: '#00209F', secondaryColor: '#D21034', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'iran', name: 'Iran', flag: '🇮🇷', primaryColor: '#239F40', secondaryColor: '#DA251D', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'iraq', name: 'Iraq', flag: '🇮🇶', primaryColor: '#007A3E', secondaryColor: '#CE1126', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'japan', name: 'Japan', flag: '🇯🇵', primaryColor: '#BC002D', secondaryColor: '#FFFFFF', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'jordan', name: 'Jordan', flag: '🇯🇴', primaryColor: '#007A3E', secondaryColor: '#CE1126', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'south-korea', name: 'South Korea', flag: '🇰🇷', primaryColor: '#000000', secondaryColor: '#CD113B', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'new-zealand', name: 'New Zealand', flag: '🇳🇿', primaryColor: '#00247D', secondaryColor: '#CC142B', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'norway', name: 'Norway', flag: '🇳🇴', primaryColor: '#EF2B2D', secondaryColor: '#002868', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'panama', name: 'Panama', flag: '🇵🇦', primaryColor: '#005293', secondaryColor: '#DA121A', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'paraguay', name: 'Paraguay', flag: '🇵🇾', primaryColor: '#D5141A', secondaryColor: '#0038A8', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'qatar', name: 'Qatar', flag: '🇶🇦', primaryColor: '#8A1538', secondaryColor: '#FFFFFF', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'saudi-arabia', name: 'Saudi Arabia', flag: '🇸🇦', primaryColor: '#006C35', secondaryColor: '#FFFFFF', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'scotland', name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', primaryColor: '#005EB8', secondaryColor: '#FFFFFF', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'senegal', name: 'Senegal', flag: '🇸🇳', primaryColor: '#00853F', secondaryColor: '#E21A2C', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'south-africa', name: 'South Africa', flag: '🇿🇦', primaryColor: '#007A4D', secondaryColor: '#FFB81C', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'sweden', name: 'Sweden', flag: '🇸🇪', primaryColor: '#006AA7', secondaryColor: '#FECC00', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'switzerland', name: 'Switzerland', flag: '🇨🇭', primaryColor: '#D52B1E', secondaryColor: '#FFFFFF', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'tunisia', name: 'Tunisia', flag: '🇹🇳', primaryColor: '#E21118', secondaryColor: '#FFFFFF', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'turkey', name: 'Turkey', flag: '🇹🇷', primaryColor: '#E30A17', secondaryColor: '#FFFFFF', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'uruguay', name: 'Uruguay', flag: '🇺🇾', primaryColor: '#0081C6', secondaryColor: '#FCD116', votes: 0, votePercentage: 0, rank: 0 },
  { id: 'uzbekistan', name: 'Uzbekistan', flag: '🇺🇿', primaryColor: '#0099B5', secondaryColor: '#007A33', votes: 0, votePercentage: 0, rank: 0 }
];

export const DISTRICTS_LIST: string[] = [
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

// Seed standard distribution across the 14 districts mapping back to historical fandom percentages
// Thiruvananthapuram: high Argentina/Brazil balance, decent Portugal
// Kollam: Portugal dominant (64%)
// Pathanamthitta: high Brazil
// Alappuzha: High Brazil, Argentina
// Kottayam: Germany, Brazil
// Idukki: Brazil
// Ernakulam: Argentina/Brazil neck-and-neck, strong Portugal/England
// Thrissur: Argentina dominant (68%)
// Palakkad: Brazil, Argentina
// Malappuram: Argentina dominant (82%)
// Kozhikode: Brazil dominant (75%)
// Wayanad: Brazil, Argentina
// Kannur: Argentina dominant (71%)
// Kasaragod: Brazil dominant
export const getInitialDistrictVotes = (teams: Team[]): Record<string, Record<string, number>> => {
  const distribution: Record<string, Record<string, number>> = {};
  
  DISTRICTS_LIST.forEach(district => {
    distribution[district] = {};
    teams.forEach(team => {
      distribution[district][team.id] = 0;
    });
  });

  return distribution;
};

// Generate realistic dummy user names for Kerala live feed simulation
export const MALLU_NAMES = [
  'Fahad', 'Aswathy', 'Sachin', 'Nandu', 'Shaji', 'Anjali', 'Jinto', 'Vishnu', 'Hafiz', 'Rahul',
  'Meera', 'Ragesh', 'Sreejith', 'Unni', 'Vineeth', 'Salman', 'Basheer', 'Arjun', 'Aiswarya', 'Roshni',
  'Gopika', 'Saritha', 'Abhilash', 'Pranav', 'Nidhin', 'Akshay', 'Suhaib', 'Ajmal', 'Kalesh', 'Sanju',
  'Rinto', 'Lijo', 'Amal', 'Fidha', 'Sherin', 'Renjith', 'Neethu', 'Vaisakh', 'Manu', 'Deepu'
];
