import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard/users', pathMatch: 'full' }, // Default route
  {
    path: 'dashboard/users',
    loadComponent: () =>
      import('./features/user-dashboard/user-dashboard.component').then(
        (m) => m.UserDashboardComponent
      ),
  },
  {
    path: 'dashboard/users/:id',
    loadComponent: () =>
      import('./features/user-details/user-details.component').then(
        (m) => m.UserDetailsComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
