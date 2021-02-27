import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PopupGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const { page, ...preservedQueryParams } = route.queryParams;

    if (!page || page === 'popup') {
      return true;
    }

    this.router.navigate(['/' + page], {
      queryParams: preservedQueryParams
    });
    return false;
  }

}
