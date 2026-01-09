import { Routes } from '@angular/router';
import { LoginPage } from './auth/pages/login-page/login-page';
import { RegisterPage } from './auth/pages/register-page/register-page';
import { HomePage } from './dashboard/pages/home-page/home-page';
import { AdminHomePage } from './admin/pages/admin-home-page/admin-home-page';
import { UsersPage } from './admin/pages/users-page/users-page';
import { RoutesPage } from './admin/pages/routes-page/routes-page';
import { BusinessesPage } from './admin/pages/businesses-page/businesses-page';
import { TransactionsPage } from './admin/pages/transactions-page/transactions-page';
import { AdminLayout } from './admin/layout/admin-layout';
import { SettingsPage } from './admin/pages/settings-page/settings-page';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'dashboard/home-page', component: HomePage },
  {
    path: 'dashboard/my-routes',
    loadComponent: () => import('./dashboard/pages/my-routes/my-routes.component').then(m => m.MyRoutesComponent)
  },
  {
    path: 'dashboard/profile',
    loadComponent: () => import('./dashboard/pages/profile-page/profile-page').then(m => m.ProfilePage)
  },
  {
    path: 'dashboard/live-navigation/:id',
    loadComponent: () => import('./shared/components/live-navigation.component').then(m => m.LiveNavigationComponent)
  },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: 'home-page', component: AdminHomePage },
      { path: 'users', component: UsersPage },
      { path: 'routes', component: RoutesPage },
      { path: 'businesses', component: BusinessesPage },
      { path: 'transactions', component: TransactionsPage },
      { path: 'settings', component: SettingsPage },
    ],
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.routes').then(m => m.SHOP_ROUTES)
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
