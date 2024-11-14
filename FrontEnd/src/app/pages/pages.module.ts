import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AsyncPipe,
    JsonPipe,
  ],
})
export class PagesModule {}
