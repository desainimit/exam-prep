import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { LayoutsComponent } from './layouts.component';
import { AuthComponent } from './auth/auth.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { TopbarComponent } from './topbar/topbar.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    LayoutsComponent,
    AuthComponent,
    SidebarComponent,
    TopbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    NgxPermissionsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule,
    SharedModule,
  ],
})
export class LayoutsModule {}
