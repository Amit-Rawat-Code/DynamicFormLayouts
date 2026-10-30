import { Component } from '@angular/core';

@Component({
  selector: 'app-candidate-print',
  standalone: false,
  templateUrl: './candidate-print.html',
  styleUrl: './candidate-print.css',
})
export class CandidatePrint {
  layout: any;
  formData: any;

  ngOnInit(): void {
    const state = history.state;

    this.layout = state.layout;
    this.formData = state.formData;
  }

  printPage() {
    window.print();
  }

  getDisplayValue(value: any): string {
    if (!value) return '';

    if (value instanceof File) {
      return value.name;
    }

    return value;
  }
}
