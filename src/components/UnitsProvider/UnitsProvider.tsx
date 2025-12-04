import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindUnit = "kmh" | "ms" | "mph" | "kn";
export type PrecipitationUnit = "mm" | "inch";
export type TimeUnit = "12" | "24";
export type City = string | number;

export type Units = {
  temperature: TemperatureUnit;
  wind: WindUnit;
  precipitation: PrecipitationUnit;
  time: TimeUnit;
  city: City
};

type UnitsContextValue = {
  units: Units;
  updateUnits: (patch: Partial<Units>) => void;
  resetUnits: () => void;
  toggleUnits: () => void;
};

const DEFAULT_UNITS: Units = {
  temperature: "celsius",
  wind: "kmh",
  precipitation: "mm",
  time: "24",
  city: "2950159",
};

const METRIC_UNITS: Partial<Units> = {
  temperature: "celsius",
  wind: "kmh",
  precipitation: "mm",
  time: "24",
};

const IMPERIC_UNITS: Partial<Units> = {
  temperature: "fahrenheit",
  wind: "mph",
  precipitation: "inch",
  time: "12",
};

const LOCAL_KEY = "app_units";

const UnitsContext = createContext<UnitsContextValue | null>(null);

export const UnitsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [units, setUnits] = useState<Units>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (!raw) return DEFAULT_UNITS;
      const parsed = JSON.parse(raw) as Partial<Units> | null;
      if (!parsed) return DEFAULT_UNITS;
      return { ...DEFAULT_UNITS, ...parsed };
    } catch {
      return DEFAULT_UNITS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(units));
    } catch {

    }
  }, [units]);

  const updateUnits = (patch: Partial<Units>) => {
    setUnits((prev) => ({ ...prev, ...patch }));
  };

  const resetUnits = () => setUnits(DEFAULT_UNITS);

  const toggleUnits = () => units.temperature === "celsius" ? updateUnits(IMPERIC_UNITS) : updateUnits(METRIC_UNITS);

  const value = useMemo(() => ({ units, updateUnits, resetUnits, toggleUnits }), [units]);

  return <UnitsContext.Provider value={value}>{children}</UnitsContext.Provider>;
};

export const useUnits = (): UnitsContextValue => {
  const ctx = useContext(UnitsContext);
  if (!ctx) throw new Error("useUnits must be used within UnitsProvider");
  return ctx;
};


