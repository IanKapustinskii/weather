# Wetter-App

Eine responsive Wetteranwendung mit Stadtsuche und anpassbaren Einheiten für Temperatur, Niederschlag, Wind und Zeit.

## Funktionen

- **Stadtsuche**: Zeigt das Wetter für jede Stadt weltweit an.
- **Einheitenwechsel**: Umschalten zwischen metrischem und imperialem System:
  - Temperatur (°C / °F)
  - Niederschlag (mm / in)
  - Windgeschwindigkeit (m/s / mph)
  - Zeitformat (24h / 12h)
- **Individuelle Einheiten**: Einheitseinstellungen für jeden Parameter separat.
- **Responsives Design**: Funktioniert auf Desktop, Tablet und Mobilgeräten.
- **Live-Daten**: Holt Wetterinformationen von:
  - [Open-Meteo](https://open-meteo.com/) API für Vorhersagen
  - Geocoding API für die Stadtsuche
- **Interaktive UI** mit React für schnelle und flüssige Updates.

## Verwendete Technologien

- React + TypeScript  
- Vite für Bundling und Entwicklung  
- Open-Meteo API  
- CSS für Styling und responsives Design  

## Nutzung

### Stadt suchen

1. Den Stadtnamen in das Suchfeld eingeben.
2. Gewünschte Stadt aus den Vorschlägen auswählen.
3. Das aktuelle Wetter und die Vorhersage werden automatisch aktualisiert.

### Einheiten wechseln

- Globaler Wechsel: Ändert alle Messungen auf einmal zwischen metrisch und imperial.
- Individuelle Einheiten: Passe Temperatur, Niederschlag, Wind und Zeit separat an.

### Wetterdetails anzeigen

- Aktuelle Temperatur, Niederschlag, Windgeschwindigkeit und Zeit
- Tages- und Stundenvorhersagen
- Dynamische Aktualisierung basierend auf ausgewählten Einheiten und Standort

### Deployment

- Das Projekt ist auf GitHub Pages verfügbar: https://iankapustinskii.github.io/weather/

### Verfügbare Sprachen:
[English](README.md) | [Deutsch](README.de.md) | [Русский](README.ru.md)

---

## Installation

```bash
git clone https://github.com/IanKapustinskii/weather.git
cd weather
npm install
npm run dev
