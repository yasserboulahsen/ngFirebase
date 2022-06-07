import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { userData } from '../interfaces/users';
import { DataSharingService } from '../services/data-sharing.service';
import { DatabaseService } from '../services/database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private data: DataSharingService,
    private router: Router,
    private dataUser: DatabaseService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // const local = this.data.getLocalUser();
    // console.log(local);

    if (localStorage.getItem('isuser')) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
