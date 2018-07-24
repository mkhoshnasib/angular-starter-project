import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app/app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {HttpHandler} from '@angular/common/http';
import {Http} from './app/services/http/http-interceptor.service';
import {LoginComponent} from './app/pages/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {routes} from './app/routers/app.router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    routes,
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [HttpHandler, ToastrService]
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

export function httpFactory(httpHandler: HttpHandler, toastr: ToastrService) {
  return new Http(httpHandler, toastr);
}