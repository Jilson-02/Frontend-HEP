import { Routes } from '@angular/router';

import { authGuard, publicOnlyGuard } from './auth/auth.guards';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginPage, canActivate: [publicOnlyGuard] },
  { path: 'home', component: HomePage, canActivate: [authGuard] },
  { path: '**', redirectTo: 'home' },
];
