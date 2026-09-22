import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceStore } from '../data-access/finance.store';
import { SharedButtonComponent } from '../../../shared/ui/shared-button.component';

@Component({
  selector: 'app-report-dashboard',
  standalone: true,
  imports: [CommonModule, SharedButtonComponent],
  template: `
    <div class="dashboard">
      <h2>Finanzbericht & Aggregation (NgRx SignalStore)</h2>

      <!-- Der Store stellt uns direkt die Signals zur Verfügung -->
      <app-shared-button
        [disabled]="financeStore.isLoading()"
        (clicked)="financeStore.loadReport()"
      >
        {{ financeStore.isLoading() ? 'Lade Daten (simuliert)...' : 'Bericht generieren' }}
      </app-shared-button>

      @if (financeStore.reportData().length > 0) {
        <table>
          <thead>
            <tr>
              <th>Produkt</th>
              <th>Verkaufte Menge</th>
              <th>Umsatz (€)</th>
              <th>Verbleibender Bestand</th>
            </tr>
          </thead>
          <tbody>
            @for (entry of financeStore.reportData(); track entry.productName) {
              <tr>
                <td>{{ entry.productName }}</td>
                <td>{{ entry.totalSales }}</td>
                <td>{{ entry.revenue }}</td>
                <td>{{ entry.stockRemaining }}</td>
              </tr>
            }
          </tbody>
        </table>
      } @else if (!financeStore.isLoading()) {
        <p>Klicke auf "Bericht generieren", um die Daten abzurufen.</p>
      }
    </div>
  `,
  styles: [
    `
      .dashboard {
        font-family: sans-serif;
        padding: 20px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }
      th,
      td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
    `,
  ],
})
export class ReportDashboardComponent {
  // Store per Dependency Injection laden
  financeStore = inject(FinanceStore);
}
