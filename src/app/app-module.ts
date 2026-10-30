import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MyPortal } from './my-portal/my-portal';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CandidatePrint } from './candidate-print/candidate-print';
import { LoaderComponent } from './loader-component/loader-component';
import { loaderInterceptorInterceptor } from './loader-interceptor-interceptor';
import { LoginCmp } from './login-cmp/login-cmp';
import { authInterceptor } from './auth-interceptor';

@NgModule({
  declarations: [
    App,
    MyPortal,
    CandidatePrint,
    LoaderComponent,
    LoginCmp
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([loaderInterceptorInterceptor,authInterceptor]))
  ],
  bootstrap: [App]
})
export class AppModule { }
