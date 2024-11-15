import { Component, Inject, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      contentTemplate: TemplateRef<any>;
      submitText: string;
      submitFn: Function;
    }
  ) {}

  submit(): void {
    this.data.submitFn();
  }
}
