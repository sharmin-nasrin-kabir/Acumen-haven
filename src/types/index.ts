export interface TeamMember {
  name: string;
  role: string;
  description: string;
  emoji: string;
}

export interface ImpactStat {
  number: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}

export interface Program {
  title: string;
  description: string;
  status?: 'upcoming' | 'current' | 'completed';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface DonationTier {
  amount: number;
  description: string;
  impact: string;
}
