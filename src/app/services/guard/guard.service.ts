import {Injectable} from '@angular/core';

@Injectable()
export class GuardService {

  canActivate() {
    return localStorage.getItem('authenticated') === 'true';
  }
}
