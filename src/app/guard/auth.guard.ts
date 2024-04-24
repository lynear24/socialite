import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { CrudService } from '../service/crud.service';
import { User } from '../service/Models';

export const authGuard = () => {
  const router = inject(Router);
  const crudService = inject(CrudService);

  let userData: User;

  crudService.GetLoggedInUser().subscribe((res) => {
    userData = res as User;
    // console.log(userData);
    if (userData != null && userData.isLoggedIn) {
      return true;
    } else {
      console.log("authguard check worked");
      return router.navigate(['login']);
    }
  });
};
