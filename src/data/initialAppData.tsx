// src/data/initialAppData.ts
import { AppDataState } from "../types/appTypes";

export const initialAppData: AppDataState = {
  // ---------- DAYCARES ----------
   // ---------- DAYCARES ----------
  daycares: [
    {
      id: "dc-001",
      name: "Art History Daycare",
      area: "North Vancouver",
      ageRange: "",
      status: "Active",
    },
    {
      id: "dc-002",
      name: "Mehr Daycare",
      area: "North Vancouver",
      ageRange: "",
      status: "Active",
    },
    {
      id: "dc-003",
      name: "Blossom Valley Kids",
      area: "North Vancouver",
      ageRange: "",
      status: "Active",
    },
    {
      id: "dc-004",
      name: "Deniz Family Childcare",
      area: "North Vancouver",
      ageRange: "",
      status: "Active",
    },
    {
      id: "dc-005",
      name: "Rose Childcare",
      area: "North Vancouver",
      ageRange: "",
      status: "Active",
    },
    {
      id: "dc-006",
      name: "Lil Bloomers",
      area: "North Vancouver",
      ageRange: "",
      status: "Active",
    },
    {
      id: "dc-007",
      name: "Happy Kids Daycare",
      area: "North Vancouver",
      ageRange: "",
      status: "Active",
    },
    {
      id: "dc-008",
      name: "Loona Daycare",
      area: "Coquitlam",
      ageRange: "",
      status: "Active",
    },
  ],


  // ---------- PROVIDERS (Demo) ----------
  providers: [
    {
      id: "prov-001",
      name: "Happy Kids Music",
      category: "Kids Activities",
      city: "Vancouver",
      offer: "10% off for Elite families",
      status: "Active",
    },
    {
      id: "prov-002",
      name: "Family Wellness Center",
      category: "Family Services",
      city: "Burnaby",
      offer: "Free 30-min consultation",
      status: "Active",
    },
  ],

  // ---------- TOURS (Empty at start) ----------
  tours: [],

  // ---------- FILTERS ----------
  filters: {
    ageGroups: [
      { id: "age-1", label: "Infant (0–18 months)", active: true },
      { id: "age-2", label: "Toddler (18–36 months)", active: true },
      { id: "age-3", label: "Preschool (3–5 years)", active: true },
      { id: "age-4", label: "School-age (5+ years)", active: true },
    ],
    educationSystems: [
      { id: "edu-1", label: "Play-based", active: true },
      { id: "edu-2", label: "Montessori", active: true },
      { id: "edu-3", label: "Reggio Emilia", active: true },
      { id: "edu-4", label: "Academic", active: true },
    ],
    languages: [
      { id: "lang-1", label: "English", active: true },
      { id: "lang-2", label: "Farsi", active: true },
      { id: "lang-3", label: "Spanish", active: true },
      { id: "lang-4", label: "Mandarin", active: true },
    ],
    distances: [
      { id: "dist-1", label: "Within 2 km", active: true },
      { id: "dist-2", label: "Within 5 km", active: true },
      { id: "dist-3", label: "Within 10 km", active: true },
      { id: "dist-4", label: "Within 15 km", active: true },
    ],
  },
};
