import { Component, TemplateRef, ViewChild } from '@angular/core';
import { SharedService } from '@app/core/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private sharedService: SharedService) {}

  submitForm(): void {
    console.log('Form submitted');
    this.sharedService.closeModal();
  }

  openDialog(contentTemplate: TemplateRef<any>, title: string): void {
    this.sharedService.openModal(
      contentTemplate,
      title,
      '1500px',
      'Submit',
      this.submitForm.bind(this)
    );
  }
}
