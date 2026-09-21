import { Injectable, signal } from '@angular/core';
import { SaleRecord } from '../../sales/data-access/sales.model';
import { InventoryItem } from '../../inventory/data-access/inventory.model';
import { delay, of } from 'rxjs';

// Resultierendes Model für die UI
export interface FinanceReportEntry {
  productName: string;
  totalSales: number;
  revenue: number;
  stockRemaining: number;
}

@Injectable({
  providedIn: 'root',
})
export class FinanceReportService {
  // Testdaten für Sales (isoliert in der echten Welt, hier gemockt)
  private mockSales: SaleRecord[] = [
    { id: 's1', amount: 5, date: '2026-09-20', productId: 'p1' },
    { id: 's2', amount: 2, date: '2026-09-21', productId: 'p2' },
    { id: 's3', amount: 10, date: '2026-09-21', productId: 'p1' },
  ];

  // Testdaten für Inventory
  private mockInventory: InventoryItem[] = [
    { productId: 'p1', name: 'Ergonomischer Bürostuhl', stock: 45, cost: 150 },
    { productId: 'p2', name: 'Höhenverstellbarer Schreibtisch', stock: 12, cost: 450 },
  ];

  // Signal für lokales State Management der Komponente
  reportData = signal<FinanceReportEntry[]>([]);
  isLoading = signal<boolean>(false);

  // Methode zum Aggregieren der Daten aus verschiedenen Domänen
  generateReport() {
    this.isLoading.set(true);

    //Hier wird ein asynchronen API-Aufruf simuliert (Performance-Fokus)
    setTimeout(() => {
      const report: FinanceReportEntry[] = this.mockInventory.map((item) => {
        // Filtere Sales für dieses Produkt
        const itemSales = this.mockSales.filter((sale) => sale.productId === item.productId);
        const totalSold = itemSales.reduce((sum, current) => sum + current.amount, 0);

        return {
          productName: item.name,
          totalSales: totalSold,
          revenue: totalSold * item.cost,
          stockRemaining: item.stock,
        };
      });

      // Update des lokalen States via Signals
      this.reportData.set(report);
      this.isLoading.set(false);
    }, 1000); // 1 Sekunde Verzögerung simuliert
  }
}
