import { Player, Match, NewsItem } from './types';

export const PLAYERS: Player[] = [
  // Goalkeepers
  { id: 1, name: 'Marko Petrovic', position: 'Goalkeeper', number: 1, nationality: 'Serbia', apps: 120, goals: 0, image: 'https://placehold.co/600x800/1c1917/a8a29e?text=1' },
  { id: 12, name: 'David Silva', position: 'Goalkeeper', number: 12, nationality: 'Brazil', apps: 15, goals: 0, image: 'https://placehold.co/600x800/1c1917/a8a29e?text=12' },

  // Defenders
  { id: 2, name: 'Nikola Jovic', position: 'Defender', number: 4, nationality: 'Serbia', apps: 85, goals: 5, image: 'https://placehold.co/600x800/1c1917/a8a29e?text=4' },
  { id: 3, name: 'Stefan Lazic', position: 'Defender', number: 5, nationality: 'Serbia', apps: 45, goals: 2, image: 'https://placehold.co/600x800/1c1917/a8a29e?text=5' },
  { id: 15, name: 'Alessandro Conti', position: 'Defender', number: 3, nationality: 'Italy', apps: 67, goals: 10, image: 'https://placehold.co/600x800/1c1917/a8a29e?text=3' },
  { id: 22, name: 'Bojan Krstic', position: 'Defender', number: 22, nationality: 'Serbia', apps: 12, goals: 0, image: 'https://placehold.co/600x800/1c1917/a8a29e?text=22' },

  // Midfielders
  { id: 4, name: 'Darko Mitrovic', position: 'Midfielder', number: 8, nationality: 'Montenegro', apps: 92, goals: 12, image: 'https://placehold.co/600x800/1c1917/a8a29e?text=8' },
  { id: 5, name: 'Luka Ilic', position: 'Midfielder', number: 10, nationality: 'Serbia', apps: 150, goals: 45, image: 'https://placehold.co/600x800/1c1917/a8a29e?text=10' },
  { id: 8, name: 'Dragan Kostic', position: 'Midfielder', number: 6, nationality: 'Serbia', apps: 200, goals: 15, image: 'https://placehold.co/600x800/1c1917/a8a29e?text=6' },
  { id: 16, name: 'Mateo Kovac', position: 'Midfielder', number: 16, nationality: 'Croatia', apps: 34, goals: 4, image: 'https://placehold.co/600x800/1c1917/a8a29e?text=16' },

  // Forwards
  { id: 6, name: 'Milan Stankovic', position: 'Forward', number: 9, nationality: 'Serbia', apps: 60, goals: 30, image: 'https://placehold.co/600x800/1c1917/a8a29e?text=9' },
  { id: 7, name: 'Jean-Pierre Dubois', position: 'Forward', number: 11, nationality: 'France', apps: 25, goals: 10, image: 'https://placehold.co/600x800/1c1917/a8a29e?text=11' },
];

export const MATCHES: Match[] = [
  // Past Matches (Results)
  { id: 101, opponent: 'FK Obala', logo: 'https://picsum.photos/50/50?random=1', date: '2023-09-15', score: '2 - 0', isHome: true, status: 'Played', competition: 'SuperLiga' },
  { id: 102, opponent: 'FK Ravnica', logo: 'https://picsum.photos/50/50?random=2', date: '2023-09-22', score: '1 - 1', isHome: false, status: 'Played', competition: 'SuperLiga' },
  { id: 103, opponent: 'Forest United', logo: 'https://picsum.photos/50/50?random=3', date: '2023-09-29', score: '3 - 0', isHome: true, status: 'Played', competition: 'SuperLiga' },
  { id: 1, opponent: 'FK Blue River', logo: 'https://picsum.photos/50/50?random=10', date: '2023-10-15', score: '2 - 1', isHome: true, status: 'Played', competition: 'SuperLiga' },
  { id: 2, opponent: 'Workers FC', logo: 'https://picsum.photos/50/50?random=11', date: '2023-10-22', score: '1 - 1', isHome: false, status: 'Played', competition: 'SuperLiga' },

  // Future Matches (Fixtures)
  { id: 3, opponent: 'FK Meteor', logo: 'https://picsum.photos/50/50?random=12', date: '2023-10-29', time: '18:00', isHome: true, status: 'Upcoming', competition: 'SuperLiga' },
  { id: 4, opponent: 'Dinamo Vitez', logo: 'https://picsum.photos/50/50?random=13', date: '2023-11-05', time: '16:30', isHome: false, status: 'Upcoming', competition: 'Cup' },
  { id: 5, opponent: 'United Fields', logo: 'https://picsum.photos/50/50?random=14', date: '2023-11-12', time: '15:00', isHome: true, status: 'Upcoming', competition: 'SuperLiga' },
  { id: 6, opponent: 'FK Ironclad', logo: 'https://picsum.photos/50/50?random=15', date: '2023-11-26', time: '19:00', isHome: false, status: 'Upcoming', competition: 'SuperLiga' },
  { id: 7, opponent: 'FK North Star', logo: 'https://picsum.photos/50/50?random=16', date: '2023-12-03', time: '14:00', isHome: true, status: 'Upcoming', competition: 'SuperLiga' },
  { id: 8, opponent: 'FK Dragon', logo: 'https://picsum.photos/50/50?random=17', date: '2023-12-10', time: '16:00', isHome: false, status: 'Upcoming', competition: 'SuperLiga' },
];

export const NEWS: NewsItem[] = [
  { 
    id: 1, 
    title: 'Victory on the Hill', 
    summary: 'FK Glama secures crucial 3 points against FK Blue River in a thrilling derby.', 
    date: 'Oct 16, 2023', 
    category: 'Match Report', 
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    id: 2, 
    title: 'Youth Academy Trials', 
    summary: 'The next generation of Glama stars. Open trials starting next Monday.', 
    date: 'Oct 20, 2023', 
    category: 'Club News', 
    image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    id: 3, 
    title: 'Coach Interview', 
    summary: 'Head Coach Milos discusses the upcoming clash with FK Meteor.', 
    date: 'Oct 25, 2023', 
    category: 'Interview', 
    image: 'https://images.unsplash.com/photo-1533561362701-d89e5c6b6531?q=80&w=800&auto=format&fit=crop' 
  },
];

export const CLUB_INFO = {
  name: "FK Glama",
  founded: 1952,
  stadium: "Glama Hill Arena",
  location: "Bela Palanka, Serbia",
  colors: ["Green", "White", "Gold"]
};

export const LEAGUE_TABLE = [
  { pos: 1, name: 'FK Meteor', pts: 45, played: 18 },
  { pos: 2, name: 'Dinamo Vitez', pts: 42, played: 18 },
  { pos: 3, name: 'FK Glama', pts: 38, played: 18 },
  { pos: 4, name: 'United Fields', pts: 35, played: 18 },
  { pos: 5, name: 'FK Ironclad', pts: 31, played: 18 },
];