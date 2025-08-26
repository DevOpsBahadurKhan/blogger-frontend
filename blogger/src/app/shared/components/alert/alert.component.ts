import { Component, Input } from '@angular/core';

type AlertType = 'success' | 'error' | 'info' | 'warning';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() type: AlertType = 'info';
  @Input() message: string = '';
  @Input() dismissible: boolean = false;
  @Input() showIcon: boolean = true;
  
  isVisible = true;

  get alertClass(): string {
    return `alert alert-${this.type}`;
  }

  get icon(): string {
    const icons = {
      'success': 'check_circle',
      'error': 'error',
      'warning': 'warning',
      'info': 'info'
    };
    return icons[this.type] || 'info';
  }

  dismiss(): void {
    this.isVisible = false;
  }
}
