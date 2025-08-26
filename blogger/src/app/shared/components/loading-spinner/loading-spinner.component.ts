import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="loading-spinner" *ngIf="isLoading">
      <mat-spinner [diameter]="diameter"></mat-spinner>
      <div class="message" *ngIf="message">{{ message }}</div>
    </div>
  `,
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {
  @Input() isLoading = false;
  @Input() message = '';
  @Input() diameter = 50;
}
