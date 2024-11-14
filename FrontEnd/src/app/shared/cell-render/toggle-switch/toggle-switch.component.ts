import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.css',
})
export class ToggleSwitchComponent implements ICellRendererAngularComp {
  params: any;
  @Input() checked: boolean = false;
  @Output() toggleChange = new EventEmitter<boolean>();

  constructor() {}

  agInit(params: any): void {
    this.params = params;
    this.checked = params.value == 1; // Set checked state based on value
  }

  refresh(params: any): boolean {
    this.checked = params.value; // Update checked state if value changes
    return true;
  }

  onToggleChange() {
    this.checked = !this.checked;
    this.toggleChange.emit(this.checked); // Emit event to parent component
    const newStatus = this.checked ? '1' : '0'; // Convert checked state to status
    this.params.onToggleChange({ ...this.params.data, status: newStatus });
  }
}
