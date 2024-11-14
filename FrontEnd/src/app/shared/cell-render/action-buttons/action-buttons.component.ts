import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { CustomCellRendererParams } from '@core/models/interfaces/dtos/cellRendererParams.dto';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.css',
})
export class ActionButtonsComponent implements ICellRendererAngularComp {
  params: any;
  showViewButton: boolean = true;
  showEditButton: boolean = true;
  showDeleteButton: boolean = true;
  constructor() {}

  agInit(params: CustomCellRendererParams): void {
    this.params = params;
    this.showViewButton =
      params.showViewButton !== undefined ? params.showViewButton : true;
    this.showEditButton =
      params.showEditButton !== undefined ? params.showEditButton : true;
    this.showDeleteButton =
      params.showDeleteButton !== undefined ? params.showDeleteButton : true;
  }

  refresh(): boolean {
    return false;
  }

  onView() {
    this.params.onView(this.params.data);
  }

  onEdit() {
    this.params.onEdit(this.params.data);
  }

  onDelete() {
    this.params.onDelete(this.params.data._id);
  }
}
