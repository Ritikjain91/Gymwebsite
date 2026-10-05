export type GymFormatType = 'Prime' | 'Luxury';

export interface FranchiseFormat {
  id: GymFormatType;
  name: string;
  tagline: string;
  badge: string;
  investmentAmount: string;
  investmentNumeric: number;
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

export interface GymProgram {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  benefit: string;
  description: string;
  keyOutcomes: string[];
  idealFor: string;
  image: string;
  sessionDuration: string;
  intensity: 'Moderate' | 'High' | 'Elite';
  badge: string;
}

export interface TransformationStory {
  id: string;
  name: string;
  age: number;
  profession: string;
  duration: string;
  headline: string;
  quote: string;
  image: string;
  stats: {
    weightChange: string;
    bodyFatChange: string;
    muscleGain?: string;
    timeline: string;
  };
  coach: string;
  program: string;
  verifiedInBody: boolean;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  monthlyPrice: number;
  annualMonthlyPrice: number;
  billingTerm: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  ctaText: string;
  perksNote: string;
}

export interface WhyChooseUsItem {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  iconName: string;
  statValue: string;
  statLabel: string;
  highlightChip: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  review: string;
  memberSince: string;
  avatar: string;
  resultAchieved: string;
  programTaken: string;
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
  category: 'membership' | 'programs' | 'facility' | 'franchise';
  question: string;
  answer: string;
}
