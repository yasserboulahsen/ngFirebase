import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataSharingService } from '../services/data-sharing.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardGuard implements CanActivate {
  constructor(
    private datasharing: DataSharingService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userRole = this.datasharing.getLocalUser();
    if (userRole.user.isAdmin) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
