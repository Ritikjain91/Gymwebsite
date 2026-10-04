export type GymFormatType = 'Prime' | 'Luxury';

export interface FranchiseFormat {
  id: GymFormatType;
  name: string;
  tagline: string;
  badge: string;
  investmentAmount: string;
  investmentNumeric: number; // in Crores
  areaSqFt: string;
  minArea: number;
  maxArea: number;
  facilitiesCount: number;
  highlightSpecs: {
    strengthFloor: string;
    cardioCapacity: string;
    recoveryFeatures: string[];
    loungeAndRecreation: string;
    techAndAccess: string;
  };
  amenities: string[];
  projectedTurnoverMonthly: string;
  projectedEbitda: string;
  image: string;
}

export interface TrainingZone {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  featuredEquipment: string[];
  environment: string;
  image: string;
  videoUrl?: string;
  primeAvailable: boolean;
  luxuryAvailable: boolean;
}

export interface RevenueStream {
  id: string;
  number: string;
  title: string;
  description: string;
  estimatedContribution: string;
  iconName: string;
}

export interface RoadmapStep {
  step: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface GymClass {
  id: string;
  title: string;
  category: 'Strength' | 'HIIT' | 'Combat' | 'Mobility' | 'Hypertrophy';
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  duration: string;
  coach: string;
  intensity: 'Medium' | 'High' | 'Extreme';
  caloriesBurned: string;
  spotsLeft: number;
}

export interface FaqItem {
  id: string;
  category: 'franchise' | 'membership' | 'facility';
  question: string;
  answer: string;
}
