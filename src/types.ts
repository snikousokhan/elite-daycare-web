
export enum UserRole {
  PARENT = 'PARENT',
  ADMIN = 'ADMIN'
}

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  homeAddress?: string;
  homeGeoPoint?: GeoPoint;
  preferences?: {
    preferredAgeGroup?: string;
  };
  verified?: boolean;
  password?: string;
  verificationToken?: string;
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  notes?: string;
}

export interface Daycare {
  id: string;
  name: string;
  address: string;
  city: string;
  geoPoint: GeoPoint;
  ageGroups: string[]; // e.g. ["Infant", "Toddler"]
  educationalSystems: string[]; // e.g. ["Montessori"]
  openingHours: string;
  eliteCertified: boolean;
  description: string;
  featured: boolean;
  website?: string;
  phone?: string;
  photos?: string[];
  children?: ChildProfile[];
  rating?: number;
}

export interface Provider {
  id: string;
  name: string;
  category: string; // e.g. "Music Class"
  description: string;
  discountText: string;
  address?: string;
  contact: string;
  featured: boolean;
}

export enum TourStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  RESCHEDULED = 'Rescheduled',
  REJECTED = 'Rejected',
  COMPLETED = 'Completed'
}

export interface TourRequest {
  id: string;
  parentId: string;
  parentName: string;
  daycareId: string;
  daycareName: string;
  requestedDate: string; // ISO string
  childAge: string;
  notes?: string;
  status: TourStatus;
  adminNotes?: string;
  createdAt: string;
}

export interface FilterConfig {
  ageGroups: string[];
  educationalSystems: string[];
  distancePresets: number[]; // in km
  providerCategories: string[];
}
