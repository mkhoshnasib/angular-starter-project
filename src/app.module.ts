import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app/app.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {HttpHandler} from "@angular/common/http";
import {Http} from "./app/services/http/http-interceptor.service";
import {LoginComponent} from "./app/pages/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {routes} from "./app/routers/app.router";
import {HomeComponent} from "./app/pages/home/home.component";
import {GuardService} from "./app/services/guard/guard.service";
import {StoreComponent} from "./app/pages/store/store.component";
import {CartComponent} from "./app/pages/cart/cart.component";
import {ProductCardComponent} from "./app/components/product-card/product-card.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    StoreComponent,
    CartComponent,
    ProductCardComponent
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
    GuardService,
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
