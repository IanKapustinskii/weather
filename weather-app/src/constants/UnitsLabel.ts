import type { PrecipitationUnit, TemperatureUnit, WindUnit } from "../components/UnitsProvider/UnitsProvider";

export const temperatureSymbols: Record<TemperatureUnit, string> = {
  celsius: "°C",
  fahrenheit: "°F",
};

export const windSymbols: Record<WindUnit, string> = {
  kmh: "km/h",
  ms: "m/s",
  mph: "mph",
  kn: "kn",
};

export const precipitationSymbols: Record<PrecipitationUnit, string> = {
  mm: "mm",
  inch: "inch",
};
