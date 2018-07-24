import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {HttpHandler} from '@angular/common/http';
import {Http} from './services/http/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
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

export class AppModule { }

export function httpFactory(httpHandler: HttpHandler, toastr: ToastrService) {
  return new Http(httpHandler, toastr);
}
