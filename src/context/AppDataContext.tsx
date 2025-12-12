// src/context/AppDataContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from "react";
import {
  AppDataState,
  Daycare,
  Provider,
  TourRequest,
  FilterGroups,
  FilterItem,
} from "../types/appTypes";
import { initialAppData } from "../data/initialAppData";

interface AppDataContextValue {
  daycares: Daycare[];
  providers: Provider[];
  tours: TourRequest[];
  filters: FilterGroups;

  addDaycare: (payload: Omit<Daycare, "id">) => void;
  updateDaycare: (id: string, updates: Partial<Daycare>) => void;
  deleteDaycare: (id: string) => void;

  addProvider: (payload: Omit<Provider, "id">) => void;
  updateProvider: (id: string, updates: Partial<Provider>) => void;
  deleteProvider: (id: string) => void;

  updateFilterGroup: (group: keyof FilterGroups, items: FilterItem[]) => void;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(
  undefined
);

export const AppDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<AppDataState>(initialAppData);

  // DAYCARES
  const addDaycare = (payload: Omit<Daycare, "id">) => {
    setData((prev) => ({
      ...prev,
      daycares: [
        ...prev.daycares,
        {
          ...payload,
          id: `elite-${Date.now()}`,
        },
      ],
    }));
  };

  const updateDaycare = (id: string, updates: Partial<Daycare>) => {
    setData((prev) => ({
      ...prev,
      daycares: prev.daycares.map((dc) =>
        dc.id === id ? { ...dc, ...updates } : dc
      ),
    }));
  };

  const deleteDaycare = (id: string) => {
    setData((prev) => ({
      ...prev,
      daycares: prev.daycares.filter((dc) => dc.id !== id),
    }));
  };

  // PROVIDERS
  const addProvider = (payload: Omit<Provider, "id">) => {
    setData((prev) => ({
      ...prev,
      providers: [
        ...prev.providers,
        {
          ...payload,
          id: `prov-${Date.now()}`,
        },
      ],
    }));
  };

  const updateProvider = (id: string, updates: Partial<Provider>) => {
    setData((prev) => ({
      ...prev,
      providers: prev.providers.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    }));
  };

  const deleteProvider = (id: string) => {
    setData((prev) => ({
      ...prev,
      providers: prev.providers.filter((p) => p.id !== id),
    }));
  };

  // FILTERS
  const updateFilterGroup = (group: keyof FilterGroups, items: FilterItem[]) => {
    setData((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [group]: items,
      },
    }));
  };

  const value: AppDataContextValue = useMemo(
    () => ({
      daycares: data.daycares,
      providers: data.providers,
      tours: data.tours,
      filters: data.filters,
      addDaycare,
      updateDaycare,
      deleteDaycare,
      addProvider,
      updateProvider,
      deleteProvider,
      updateFilterGroup,
    }),
    [data]
  );

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = (): AppDataContextValue => {
  const ctx = useContext(AppDataContext);
  if (!ctx) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return ctx;
};
