import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  const isLoggedIn = localStorage.getItem('user_id');
    if (isLoggedIn) {
      console.log(isLoggedIn)
      return true;
    } else {
      console.log(isLoggedIn)
      return false;
    }
};

// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     const isLoggedIn = localStorage.getItem('user_id');
//     if (isLoggedIn) {
//       return true;
//     } else {
//       this.router.navigate(['/contact']);
//       return false;
//     }
//   }
// }
