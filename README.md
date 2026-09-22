# 🏢 ERP System Frontend - Case Study (Prototyp)

Dieses Projekt stellt den aktuellen Prototypen für das Frontend eines skalierbaren ERP-Systems dar. Es dient als "Proof of Concept" (PoC) zur Veranschaulichung moderner Angular-Architekturkonzepte und reaktivem State Management, bevor das System in eine komplexere Monorepo-Struktur überführt wird.

## 🏗 Aktueller Architektur-Status (Ist-Zustand)

Das Projekt ist derzeit als klassischer **Angular CLI Workspace** aufgesetzt. Der Fokus liegt auf der logischen Trennung der Zuständigkeiten und der Nutzung moderner Angular-Features:

- **Framework:** Angular 17+ mit **Standalone Components**. Auf klassische NgModules wurde bewusst verzichtet, um die Komponenten leichtgewichtiger zu gestalten.
- **Architektur-Muster:** Die Basis nutzt eine logische Ordnerstruktur nach den Prinzipien des **Domain-Driven Design (DDD)**. Die fachlichen Kontexte sind in eigenen Verzeichnissen gekapselt.
- **State Management:** Einsatz von **NgRx SignalStore** (`@ngrx/signals`) für ein performantes, reaktives Zustandsmanagement.
- **Datenanbindung:** Es ist aktuell kein Backend angebunden. Die API-Aufrufe und asynchronen Ladezeiten werden lokal über RxJS-Streams (`of`, `delay`) gemockt und simuliert.

## 💡 Hinweise zur Implementierung (Trade-offs)

Für die Umsetzung dieses Prototyps im Rahmen der Case Study wurden bewusst folgende Entscheidungen zugunsten der Entwicklungsgeschwindigkeit getroffen:

1. **Single-File Components:** Die UI-Komponenten wurden hier als Single-File Components umgesetzt (Inline-HTML und Inline-SCSS in der `.ts`-Datei). Dies diente der schnellen Veranschaulichung. In einem produktiven Enterprise-Umfeld würde eine strikte Trennung von Logik (`.ts`), Template (`.html`) und Styling (`.scss`) in separate Dateien erfolgen, um die Übersichtlichkeit und Wartbarkeit zu maximieren.
2. **Eigenes Styling vs. CSS-Library:** Das Styling der Elemente (wie Buttons und Tabellen) wurde für diese Demo über Custom CSS/SCSS gelöst. In einem echten Projekt würde der Einsatz einer etablierten CSS- oder UI-Bibliothek (z. B. Tailwind CSS, Angular Material oder PrimeNG) bevorzugt werden, um ein einheitliches Design-System, Barrierefreiheit (Accessibility) und eine schnellere Entwicklung zu gewährleisten.

## 📂 Projektstruktur

Die Struktur des Codes spiegelt die verschiedenen Bounded Contexts des ERP-Systems wider:

```text
src/app/
 ├── domains/                       # Fachliche Bounded Contexts (Logische Trennung)
 │    ├── finance/
 │    │    ├── data-access/         # NgRx SignalStore (finance.store.ts) & Services
 │    │    └── features/            # Smart Components (z.B. report-dashboard)
 │    ├── inventory/                # Domäne: Inventar (Mock-Modelle)
 │    └── sales/                    # Domäne: Vertrieb (Mock-Modelle)
 │
 └── shared/                        # Domänenübergreifend nutzbare Elemente
      └── ui/                       # Wiederverwendbare, "dumme" UI-Komponenten (shared-button)
```

## 🎯 Aktueller Funktionsumfang

**Use Case 1: Finanzberichte generieren**

- Implementierung eines Dashboards (`report-dashboard.component.ts`), das Daten über den `FinanceStore` bezieht.
- Der Store simuliert einen asynchronen API-Aufruf, aggregiert gemockte Daten aus den Bereichen Sales und Inventory und stellt diese über Signals bereit.
- Die UI reagiert automatisch auf den Ladezustand (`isLoading`) und rendert die Daten performant in einer Tabelle.
- Eine zentrale `shared-button.component.ts` wird genutzt, um ein konsistentes UI-Design zu gewährleisten.

## 🚀 Nächste Schritte (Roadmap)

Um das Projekt für mehrere Teams vollständig parallel entwickelbar zu machen, sind folgende Erweiterungen geplant:

1. **Strikte Modularisierung:** Überführung der logischen Ordnerstruktur in echte, technisch isolierte Libraries (z. B. durch Migration auf ein Monorepo). Dies erzwingt strikte Grenzen zwischen den Domänen.
2. **Backend-Integration:** Ersetzen der RxJS-Mocks im Data-Access-Layer durch echte `HttpClient`-Services, die an die Microservices der jeweiligen Backend-Domänen angebunden werden.
3. **Domänenübergreifende Workflows:** Implementierung von übergreifenden Use Cases (wie einem Mitarbeiter-Onboarding) mittels zentraler Orchestrator-Services (Facade Pattern).
4. **Containerisierung & Developer Setup:** Bereitstellung eines ganzheitlichen Workspaces, der Frontend, Backend-Microservices und (Test-)Datenbanken über Container (z. B. mit Docker Compose) bündelt. Dies garantiert ein reibungsloses Onboarding und eine konsistente, sofort startklare Entwicklungsumgebung für das gesamte Team.

---

## 💻 Lokale Entwicklung

### Voraussetzungen

- Node.js & npm installiert

### Installation & Start

1. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
2. Entwicklungsserver starten:
   ```bash
   npm start
   ```
   Die Anwendung ist anschließend unter `http://localhost:4200/` im Browser erreichbar.
