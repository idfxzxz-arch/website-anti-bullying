export type TabType = 'home' | 'game' | 'ai' | 'lapor' | 'saya';

export type ScreenType =
  | 'splash'
  | 'onboarding'
  | 'home'
  | 'learning'
  | 'learning_detail'
  | 'simulation'
  | 'simulation_play'
  | 'game_hub'
  | 'quick_decision'
  | 'detective'
  | 'ai_chat'
  | 'situation_check'
  | 'report'
  | 'report_success'
  | 'report_status'
  | 'friends'
  | 'profile';

export interface UserProfile {
  name: string;
  avatar: string;
  role: string;
  school: string;
  level: number;
  levelTitle: string;
  currentXp: number;
  maxXp: number;
  points: number;
  streakDays: number;
  completedModules: number[];
  completedGames: string[];
  completedSimulations: string[];
  earnedBadges: string[];
}

export interface LearningModule {
  id: number;
  title: string;
  description: string;
  duration: string;
  image?: string;
  icon?: string;
  progress: number;
  content: string[];
  keyTakeaways: string[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface SimulationCase {
  id: string;
  requiredLevel: number;
  type: 'standard' | 'emotion';
  perspective: string;
  caseNumber: string;
  title: string;
  scenario: string;
  image: string;
  question: string;
  choices?: {
    key: string;
    label: string;
    feedback: string;
    isRecommended: boolean;
    points: number;
  }[];
  emotions?: {
    id: string;
    emoji: string;
    label: string;
  }[];
  impacts?: {
    target: string;
    description: string;
    icon: string;
    color: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  isTyping?: boolean;
}

export interface IncidentReport {
  id: string;
  createdAt: string;
  role: 'victim' | 'witness' | 'helper';
  description: string;
  datetime: string;
  location: string;
  incidentType: string;
  hasAttachment: boolean;
  fileName?: string;
  fileBase64?: string;
  isAnonymous: boolean;
  status: 'Sedang Ditinjau' | 'Dalam Penanganan' | 'Selesai';
  counselorNotes?: string;
}

export interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
}

export interface SituationQuestion {
  id: number;
  question: string;
  icon: string;
  helperText: string;
}
