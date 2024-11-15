import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutsModule } from '@layouts/layouts.module';
import { RouterOutlet } from '@angular/router';
import { environment } from '@env/environment.development';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {
  API_URL,
  BaseUrlInterceptor,
} from '@core/interceptors/base-url.interceptor';
import { tokenInterceptor } from '@core/interceptors/token.interceptor';
import { serverErrorInterceptor } from '@core/interceptors/server-error.interceptor';
import { websocket_Url } from '@core/services/websocket.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AuthService } from '@core/services/auth.service';

function initializeApp(authService: AuthService): () => Promise<void> {
  return () =>
    new Promise((resolve, reject) => {
      authService.loadRolePermissions();
      resolve();
    });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    RouterOutlet,
    LayoutsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      tapToDismiss: true,
    }),
    NgxPermissionsModule.forRoot(),
  ],
  providers: [
    provideClientHydration(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService],
      multi: true,
    },
    provideHttpClient(
      withInterceptors([
        BaseUrlInterceptor,
        tokenInterceptor,
        serverErrorInterceptor,
      ])
    ),
    {
      provide: API_URL,
      useValue: environment.API_URL,
    },
    {
      provide: websocket_Url,
      useValue: environment.SOCKET_URL,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
