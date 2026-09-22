import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinanceReportEntry } from './finance.store'; // Interface

@Injectable({ providedIn: 'root' })
export class FinanceDataService {
  private http = inject(HttpClient);

  // API-Call, keine Logik, kein State
  fetchReportData(): Observable<FinanceReportEntry[]> {
    return this.http.get<FinanceReportEntry[]>('/api/v1/finance/reports');
  }
}
