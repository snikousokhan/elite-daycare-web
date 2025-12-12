
import { Daycare, Provider, FilterConfig, User, UserRole, TourRequest, TourStatus } from '../types';

export const INITIAL_FILTER_CONFIG: FilterConfig = {
  ageGroups: ['Infant (0-18m)', 'Toddler (18m-3y)', 'Preschool (3-5y)', 'School Age (5+)'],
  educationalSystems: ['Montessori', 'Reggio Emilia', 'Play-based', 'Academic/Traditional', 'Waldorf'],
  distancePresets: [1, 3, 5, 10, 20],
  providerCategories: ['Music Class', 'Psychologist', 'Family Coaching', 'Speech Therapy', 'Nutritionist', 'Pediatrician']
};

export const MOCK_DAYCARES: Daycare[] = [
  {
    id: 'd1',
    name: 'Little Geniuses Montessori',
    address: '123 Maple Street',
    city: 'Metropolis',
    geoPoint: { lat: 40.7128, lng: -74.0060 },
    ageGroups: ['Toddler (18m-3y)', 'Preschool (3-5y)'],
    educationalSystems: ['Montessori'],
    openingHours: '08:00 - 17:30',
    eliteCertified: true,
    description: 'A premier Montessori environment nurturing independence and curiosity in young minds. Certified guides and beautiful natural materials.',
    featured: true,
    phone: '555-0101',
    photos: ['https://picsum.photos/400/300?random=1', 'https://picsum.photos/400/300?random=2'],
    rating: 4.9
  },
  {
    id: 'd2',
    name: 'Sunny Days Academy',
    address: '456 Oak Avenue',
    city: 'Metropolis',
    geoPoint: { lat: 40.7150, lng: -74.0090 }, // Slightly away
    ageGroups: ['Infant (0-18m)', 'Toddler (18m-3y)', 'Preschool (3-5y)'],
    educationalSystems: ['Play-based'],
    openingHours: '07:30 - 18:00',
    eliteCertified: true,
    description: 'Warm, nurturing care focused on social development through play. Large outdoor playground and organic meals provided.',
    featured: true,
    phone: '555-0102',
    photos: ['https://picsum.photos/400/300?random=3'],
    rating: 4.8
  },
  {
    id: 'd3',
    name: 'Future Leaders Prep',
    address: '789 Pine Lane',
    city: 'Metropolis',
    geoPoint: { lat: 40.7300, lng: -74.0200 }, // Further away
    ageGroups: ['Preschool (3-5y)', 'School Age (5+)'],
    educationalSystems: ['Academic/Traditional'],
    openingHours: '08:00 - 16:00',
    eliteCertified: false,
    description: 'Structured academic program preparing children for top-tier primary schools. Focus on literacy and numeracy.',
    featured: false,
    phone: '555-0103',
    photos: ['https://picsum.photos/400/300?random=4'],
    rating: 4.2
  }
];

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: 'p1',
    name: 'Mindful Family Therapy',
    category: 'Psychologist',
    description: 'Supporting families through transitions and developmental challenges.',
    discountText: 'First consultation free for Elite members',
    contact: 'Dr. Smith - 555-9999',
    featured: true
  },
  {
    id: 'p2',
    name: 'Rhythm & Kids',
    category: 'Music Class',
    description: 'Early childhood music education classes.',
    discountText: '15% off semester enrollment',
    contact: 'www.rhythmkids.mock',
    featured: true
  }
];

export const MOCK_ADMIN: User = {
  id: 'admin1',
  name: 'Elite Admin',
  email: 'admin@elite.com',
  role: UserRole.ADMIN,
};

export const MOCK_PARENT: User = {
  id: 'parent1',
  name: 'Jane Doe',
  email: 'jane@example.com',
  role: UserRole.PARENT,
  homeAddress: '100 Main St, Metropolis',
  homeGeoPoint: { lat: 40.7110, lng: -74.0050 }, // Near d1
};

export const MOCK_TOUR_REQUESTS: TourRequest[] = [
  {
    id: 'tr1',
    parentId: 'parent1',
    parentName: 'Jane Doe',
    daycareId: 'd1',
    daycareName: 'Little Geniuses Montessori',
    requestedDate: '2023-11-15T10:00:00',
    childAge: '3',
    notes: 'Interested in the toddler program.',
    status: TourStatus.PENDING,
    createdAt: '2023-11-01T09:00:00'
  }
];