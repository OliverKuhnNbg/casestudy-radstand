import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-shared-button',
  standalone: true,
  template: `
    <!-- Hier wird Signal-Inputs genutzt, für das Binding und triggern des Output-Event beim Klick -->
    <button [disabled]="disabled()" (click)="clicked.emit()" class="btn">
      <ng-content></ng-content>
      <!-- Hier wird der Text von außen injiziert -->
    </button>
  `,
  styles: [
    `
      .btn {
        padding: 10px 15px;
        cursor: pointer;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        font-weight: 600;
        transition: background 0.2s ease;
      }
      .btn:hover:not(:disabled) {
        background: #0056b3;
      }
      .btn:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
    `,
  ],
})
export class SharedButtonComponent {
  // Moderne Signal-basierte Inputs ab Angular 17.1+
  disabled = input<boolean>(false);

  // Neues Output-API
  clicked = output<void>();
}
