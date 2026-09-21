import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReportDashboardComponent } from './domains/finance/features/report-dshboard.component';

@Component({
  imports: [RouterOutlet, ReportDashboardComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('erp-system');
}
