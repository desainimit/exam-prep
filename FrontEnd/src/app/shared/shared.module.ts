import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { DatatableComponent } from './datatable/datatable.component';
import { AgGridModule } from 'ag-grid-angular';
import { ActionButtonsComponent } from './cell-render/action-buttons/action-buttons.component';
import { MatButtonModule } from '@angular/material/button';
import { matDialogAnimations, MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ToggleSwitchComponent } from './cell-render/toggle-switch/toggle-switch.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { CardComponent } from './card/card.component';
import { ModalComponent } from './modal/modal.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    LoaderComponent,
    DatatableComponent,
    ActionButtonsComponent,
    ToggleSwitchComponent,
    ConfirmComponent,
    CardComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    AgGridModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatIconModule,
  ],
  exports: [
    LoaderComponent,
    DatatableComponent,
    ActionButtonsComponent,
    ToggleSwitchComponent,
    ConfirmComponent,
    CardComponent,
    ModalComponent,
  ],
})
export class SharedModule {}
