// src/types/appTypes.ts

// ----- Daycares -----
export type DaycareStatus = "Active" | "Inactive";

export interface Daycare {
  id: string;           // e.g. "elite-001"
  name: string;         // e.g. "Happy Kids Elite Daycare"
  area: string;         // e.g. "Burnaby - Brentwood"
  address?: string;     // optional: full street address
  distanceKm?: number;  // for search view, e.g. 2.5
  ageRange: string;     // e.g. "0–5 years"
  education: string;    // e.g. "Play-based"
  language: string;     // e.g. "English, Farsi"
  capacity?: number;    // optional
  isEliteCertified?: boolean;
  status: DaycareStatus;
}

// ----- Providers (special offers, services, etc.) -----
export type ProviderStatus = "Active" | "Hidden";

export interface Provider {
  id: string;          // e.g. "prov-001"
  name: string;        // e.g. "Music Time for Kids"
  category: string;    // e.g. "Music", "Family coaching"
  city: string;        // e.g. "Vancouver"
  offer: string;       // e.g. "10% off for Elite families"
  status: ProviderStatus;
}

// ----- Tour Requests -----
export type TourStatus =
  | "Requested"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

export interface TourRequest {
  id: string;            // e.g. "tour-1732132"
  daycareId: string;     // FK → Daycare.id
  daycareName: string;   // for easy display
  parentName: string;
  parentEmail: string;
  parentPhone?: string;
  childAge?: string;     // e.g. "3 years"
  preferredDate?: string; // e.g. "2025-11-25"
  preferredTime?: string; // e.g. "10:00"
  status: TourStatus;
  notes?: string;
  createdAt: string;     // ISO date string
}

// ----- Filters -----

export interface FilterOption {
  id: string;       // e.g. "age-infant"
  label: string;    // e.g. "Infant (0–18 months)"
  active: boolean;
}

export interface FilterGroups {
  ageGroups: FilterOption[];
  educationSystems: FilterOption[];
  languages: FilterOption[];
  distances: FilterOption[];
}

// ----- App global state (all data together) -----

export interface AppDataState {
  daycares: Daycare[];
  providers: Provider[];
  tours: TourRequest[];
  filters: FilterGroups;
}
