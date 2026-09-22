import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { delay, of, pipe, tap, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

// Die Interfaces (in einem echten Projekt wären die in einer eigenen Datei)
export interface FinanceReportEntry {
  productName: string;
  totalSales: number;
  revenue: number;
  stockRemaining: number;
}

// Unser State (Zustand)
type FinanceState = {
  reportData: FinanceReportEntry[];
  isLoading: boolean;
};

const initialState: FinanceState = {
  reportData: [],
  isLoading: false,
};

// Unsere Mock-Daten (Das Resultat aus Sales + Inventory)
const MOCK_REPORT_DATA: FinanceReportEntry[] = [
  { productName: 'Ergonomischer Bürostuhl', totalSales: 15, revenue: 2250, stockRemaining: 45 },
  {
    productName: 'Höhenverstellbarer Schreibtisch',
    totalSales: 2,
    revenue: 900,
    stockRemaining: 12,
  },
];

// Der eigentliche Store
export const FinanceStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    // Die rxMethod verarbeitet asynchrone Streams
    loadReport: rxMethod<void>(
      pipe(
        // Ladezustand aktivieren
        tap(() => patchState(store, { isLoading: true })),

        // Den asynchronen API-Aufruf simulieren!
        // 'of(MOCK_REPORT_DATA)' erstellt einen Datenstrom, 'delay(1500)' verzögert ihn um 1,5 Sekunden
        switchMap(() => of(MOCK_REPORT_DATA).pipe(delay(1500))),

        // Die "Antwort" verarbeiten
        // tapResponse fängt den Fehler sicher ab und erzwingt sauberes Error-Handling.
        tapResponse({
          next: (data) => {
            // Daten im Store speichern und Laden beenden
            patchState(store, { reportData: data, isLoading: false });
          },
          error: (err) => {
            console.error('Fehler:', err);
            patchState(store, { isLoading: false });
          },
        }),
      ),
    ),
  })),
);
