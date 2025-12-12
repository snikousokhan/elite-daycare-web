
import { 
  User, 
  Daycare, 
  Provider, 
  TourRequest, 
  TourStatus, 
  FilterConfig, 
  UserRole 
} from '../types';
import { 
  MOCK_DAYCARES, 
  MOCK_PROVIDERS, 
  INITIAL_FILTER_CONFIG, 
  MOCK_ADMIN, 
  MOCK_PARENT, 
  MOCK_TOUR_REQUESTS 
} from './mockData';

// Helpers for LocalStorage
const getStorage = <T>(key: string, defaultVal: T): T => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultVal;
};
const setStorage = (key: string, val: any) => localStorage.setItem(key, JSON.stringify(val));

// API Logic
export const api = {
  auth: {
    login: async (email: string, password: string): Promise<User> => {
      // 1. Check Admin Mock
      if (email === 'admin@elite.com' && password === 'admin') return MOCK_ADMIN;

      // 2. Check Registered Users in "DB"
      const users = getStorage<User[]>('elite_users_db', []);
      const dbUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (dbUser) {
        // Mock password check
        if (dbUser.password && dbUser.password !== password) {
           throw new Error('Invalid password');
        }
        if (dbUser.verified === false) {
           throw new Error('Please verify your email address before logging in.');
        }
        return dbUser;
      }

      // 3. Fallback for demo convenience (if not registered in DB)
      // This allows quick testing without registration, but registered users MUST verify.
      if (email.includes('@') && password.length > 3) {
        return { ...MOCK_PARENT, email, name: email.split('@')[0] }; 
      }
      
      throw new Error('Invalid credentials');
    },

    register: async (userData: Partial<User> & { password?: string }): Promise<{ user: User, link: string }> => {
      const users = getStorage<User[]>('elite_users_db', []);
      
      if (users.find(u => u.email.toLowerCase() === userData.email?.toLowerCase())) {
        throw new Error('Email already exists');
      }

      const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
      
      const newUser: User = {
        ...MOCK_PARENT, // defaults
        ...userData,
        id: Math.random().toString(36).substr(2, 9),
        role: UserRole.PARENT,
        verified: false,
        verificationToken: token
      };

      // Save to mock DB
      setStorage('elite_users_db', [...users, newUser]);

      // Generate simulated link
      const link = `${window.location.origin}${window.location.pathname}#/verify?token=${token}&email=${encodeURIComponent(newUser.email)}`;
      
      return { user: newUser, link };
    },

    verify: async (email: string, token: string): Promise<User> => {
      const users = getStorage<User[]>('elite_users_db', []);
      const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());

      if (userIndex === -1) throw new Error("User not found.");
      
      const user = users[userIndex];

      if (user.verified) return user; // Already verified
      if (user.verificationToken !== token) throw new Error("Invalid or expired verification token.");

      // Verify user
      user.verified = true;
      user.verificationToken = undefined; // clear token
      
      users[userIndex] = user;
      setStorage('elite_users_db', users);

      return user;
    },

    getCurrentUser: (): User | null => {
      const userStr = localStorage.getItem('elite_user');
      return userStr ? JSON.parse(userStr) : null;
    },
    logout: () => localStorage.removeItem('elite_user')
  },

  daycares: {
    getAll: async (): Promise<Daycare[]> => getStorage('elite_daycares', MOCK_DAYCARES),
    getById: async (id: string): Promise<Daycare | undefined> => {
      const all = getStorage<Daycare[]>('elite_daycares', MOCK_DAYCARES);
      return all.find(d => d.id === id);
    },
    create: async (daycare: Daycare): Promise<void> => {
      const all = getStorage<Daycare[]>('elite_daycares', MOCK_DAYCARES);
      setStorage('elite_daycares', [...all, daycare]);
    },
    update: async (id: string, updates: Partial<Daycare>): Promise<void> => {
      const all = getStorage<Daycare[]>('elite_daycares', MOCK_DAYCARES);
      setStorage('elite_daycares', all.map(d => d.id === id ? { ...d, ...updates } : d));
    },
    delete: async (id: string): Promise<void> => {
      const all = getStorage<Daycare[]>('elite_daycares', MOCK_DAYCARES);
      setStorage('elite_daycares', all.filter(d => d.id !== id));
    }
  },

  providers: {
    getAll: async (): Promise<Provider[]> => getStorage('elite_providers', MOCK_PROVIDERS),
    save: async (provider: Provider): Promise<void> => {
      const all = getStorage<Provider[]>('elite_providers', MOCK_PROVIDERS);
      const index = all.findIndex(p => p.id === provider.id);
      if (index >= 0) {
        all[index] = provider;
      } else {
        all.push(provider);
      }
      setStorage('elite_providers', all);
    },
    delete: async (id: string): Promise<void> => {
      const all = getStorage<Provider[]>('elite_providers', MOCK_PROVIDERS);
      setStorage('elite_providers', all.filter(p => p.id !== id));
    }
  },

  requests: {
    getAll: async (): Promise<TourRequest[]> => getStorage('elite_requests', MOCK_TOUR_REQUESTS),
    getByParentId: async (parentId: string): Promise<TourRequest[]> => {
      const all = getStorage<TourRequest[]>('elite_requests', MOCK_TOUR_REQUESTS);
      return all.filter(r => r.parentId === parentId);
    },
    create: async (req: Omit<TourRequest, 'id' | 'status' | 'createdAt'>): Promise<void> => {
      const all = getStorage<TourRequest[]>('elite_requests', MOCK_TOUR_REQUESTS);
      const newReq: TourRequest = {
        ...req,
        id: Math.random().toString(36).substr(2, 9),
        status: TourStatus.PENDING,
        createdAt: new Date().toISOString()
      };
      setStorage('elite_requests', [...all, newReq]);
    },
    updateStatus: async (id: string, status: TourStatus, note?: string): Promise<void> => {
      const all = getStorage<TourRequest[]>('elite_requests', MOCK_TOUR_REQUESTS);
      setStorage('elite_requests', all.map(r => r.id === id ? { ...r, status, adminNotes: note } : r));
    }
  },

  config: {
    get: async (): Promise<FilterConfig> => getStorage('elite_config', INITIAL_FILTER_CONFIG),
    save: async (config: FilterConfig): Promise<void> => setStorage('elite_config', config)
  }
};

// Utility for distance (Haversine)
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
