import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from '../pages/login/login.component';
import {HomeComponent} from '../pages/home/home.component';
import {GuardService} from '../services/guard/guard.service';

export const router: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [GuardService]}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router, { useHash: true });
