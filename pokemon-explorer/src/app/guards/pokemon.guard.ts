import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const pokemonGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const name = route.paramMap.get('name');

  if (!name || name.trim().length === 0) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
