export interface Player {
  id: number;
  name: string;
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
  number: number;
  image: string;
  nationality: string;
  apps: number;
  goals: number;
}

export interface Match {
  id: number;
  opponent: string;
  logo: string;
  date: string;
  time?: string;
  score?: string;
  isHome: boolean;
  status: 'Played' | 'Upcoming' | 'Live';
  competition: string;
}

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  image: string;
  category: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}