import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from '@layouts/layouts.component';
import { authGuard } from '@core/guards/auth.guard';
import { loginGuard } from '@core/guards/login.guard';
import { NotFoundComponent } from '@pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('@authentication/authorization.module').then(
        (m) => m.AuthorizationModule
      ),
    canActivate: [loginGuard],
  },
  {
    path: '',
    component: LayoutsComponent,
    loadChildren: () =>
      import('@pages/pages.module').then((m) => m.PagesModule),
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
