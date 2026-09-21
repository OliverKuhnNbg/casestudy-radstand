import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceReportService } from '../data-access/finance-report.service';

@Component({
  selector: 'app-report-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h2>Finanzbericht & Aggregation</h2>

      <button (click)="loadData()" [disabled]="financeService.isLoading()">
        {{ financeService.isLoading() ? 'Lade Daten...' : 'Bericht generieren' }}
      </button>

      <!-- Rendering der Daten basierend auf Signals -->
      @if (financeService.reportData().length > 0) {
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
            @for (entry of financeService.reportData(); track entry.productName) {
              <tr>
                <td>{{ entry.productName }}</td>
                <td>{{ entry.totalSales }}</td>
                <td>{{ entry.revenue }}</td>
                <td>{{ entry.stockRemaining }}</td>
              </tr>
            }
          </tbody>
        </table>
      } @else if (!financeService.isLoading()) {
        <p>Klicke auf "Bericht generieren", um die Daten aus Sales und Inventory zu verknüpfen.</p>
      }
    </div>
  `,
  styles: [
    `
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
      button {
        padding: 10px 15px;
        cursor: pointer;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
      }
      button:disabled {
        background: #ccc;
      }
    `,
  ],
})
export class ReportDashboardComponent implements OnInit {
  // Service via Dependency Injection laden
  financeService = inject(FinanceReportService);

  ngOnInit() {
    // Optional: Direkt beim Starten laden
    // this.loadData();
  }

  loadData() {
    this.financeService.generateReport();
  }
}
