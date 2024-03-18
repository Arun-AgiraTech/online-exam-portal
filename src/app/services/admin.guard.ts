import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService }  from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  let login = inject(LoginService);
  let role = login.getUserRole();
  let isLoggedIn = login.isLoggedIn();
  let router = inject(Router);
  let _snackBar = inject(MatSnackBar);

    if(isLoggedIn && role == 'ADMIN'){
      return true;
    }
    else{
      _snackBar. open('Not Authorized !!','ok',{
        duration : 3000
      });
      router.navigate(['login']);
      return false;
    }
  }
