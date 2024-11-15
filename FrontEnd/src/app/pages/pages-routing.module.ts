import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ngxPermissionsGuard } from 'ngx-permissions';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ngxPermissionsGuard],
    data: {
      permissions: {
        only: ['admin'],
        redirectTo: 'notfound',
      },
    },
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: '**',
    redirectTo: 'notFound',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
