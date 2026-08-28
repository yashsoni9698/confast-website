export interface TechSpec {
  parameter: string;
  value: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  type: string;
  image: string;
  heroImage: string;
  color: string;
  badge: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  applications: string[];
  suitableFor: string[];
  coverage: string;
  packSize: string[];
  shelfLife: string;
  color_field: string;
  technicalSpecs: TechSpec[];
  faqs: FAQ[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  avatar: string;
  location: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface Application {
  icon: string;
  title: string;
  description: string;
}
