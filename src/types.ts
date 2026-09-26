export interface Era {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  period: string;
  category: 'origins' | 'protocol' | 'web' | 'social' | 'mobile' | 'ai';
  shortExplanation: string;
  detailedStory: string;
  interestingFact: string;
  keyMilestones: string[];
  relatedTechnologies: string[];
  pioneers: string[];
  accentColor: string;
  iconName: string;
  interactiveType: 'terminal' | 'packets' | 'dns' | 'html' | 'web2' | 'mobile' | 'neural';
}

export interface ComparisonItem {
  id: string;
  category: string;
  title: string;
  then: {
    title: string;
    era: string;
    speedOrStat: string;
    description: string;
    visualDetail: string;
    icon: string;
  };
  now: {
    title: string;
    era: string;
    speedOrStat: string;
    description: string;
    visualDetail: string;
    icon: string;
  };
  impactHighlight: string;
}

export interface IconicWebsite {
  id: string;
  name: string;
  launchYear: number;
  originalPurpose: string;
  evolution: string;
  currentRole: string;
  category: 'Search' | 'Video' | 'Knowledge' | 'Social' | 'Commerce' | 'Portal';
  accentColor: string;
  iconSymbol: string;
  trafficStat: string;
  funFact: string;
}

export interface InternetFact {
  id: number;
  title: string;
  fact: string;
  category: 'Global Traffic' | 'History' | 'Hardware' | 'Culture' | 'Milestone';
  sourceHint: string;
  yearContext?: string;
}
