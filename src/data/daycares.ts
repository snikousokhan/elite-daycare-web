// src/data/daycares.ts

export interface Daycare {
  id: string;
  name: string;
  area: string;
  phone: string;
  address: string;
  ageRange?: string;
  badge?: string;
}

export const daycareList: Daycare[] = [
  {
    id: "dc-001",
    name: "Art History Daycare",
    area: "North Vancouver",
    phone: "(778) 628 - 5452",
    address: "2007 Floralynn Cres, North Vancouver District BC V7J 2W1",
    ageRange: "",
    badge: "Elite Certified",
  },
  {
    id: "dc-002",
    name: "Mehr Daycare",
    area: "North Vancouver",
    phone: "(604) 354 - 7158",
    address: "345 West 26th St, North Vancouver",
    ageRange: "",
    badge: "Elite Certified",
  },
  {
    id: "dc-003",
    name: "Blossom Valley Kids",
    area: "North Vancouver",
    phone: "(604) 353 - 4606",
    address: "1219 Arborlynn Dr, North Vancouver",
    ageRange: "",
    badge: "Elite Certified",
  },
  {
    id: "dc-004",
    name: "Deniz Family Childcare",
    area: "North Vancouver",
    phone: "(514) 608 - 4865",
    address: "2979 Paisley Rd, North Vancouver",
    ageRange: "",
    badge: "Elite Certified",
  },
  {
    id: "dc-005",
    name: "Rose Childcare",
    area: "North Vancouver",
    phone: "(778) 918 - 3030",
    address: "119 3rd St W, North Vancouver BC V7M 1E7",
    ageRange: "",
    badge: "Elite Certified",
  },
  {
    id: "dc-006",
    name: "Lil Bloomers",
    area: "North Vancouver",
    phone: "(672) 558 - 1345",
    address: "195 E Windsor Rd, North Vancouver BC V7N 1J9",
    ageRange: "",
    badge: "Elite Certified",
  },
  {
    id: "dc-007",
    name: "Happy Kids Daycare",
    area: "North Vancouver",
    phone: "(778) 871 - 7380",
    address: "3670 Sunset Blvd, North Vancouver",
    ageRange: "",
    badge: "Elite Certified",
  },
  {
    id: "dc-008",
    name: "Loona Daycare",
    area: "Coquitlam",
    phone: "(604) 404 - 0133",
    address: "3303 Sultan Pl, Coquitlam BC V3E 2Z8",
    ageRange: "",
    badge: "Elite Certified",
  },
];
