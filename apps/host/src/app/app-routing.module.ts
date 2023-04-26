import { loadRemoteModule } from '@nrwl/angular/mf';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UI_HOST_REMOTES } from './app-config.const';
import { resolveEnvironment } from './core/resolver';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
  {
    path: UI_HOST_REMOTES.SALES,
    loadChildren: () => loadRemoteModule(UI_HOST_REMOTES.SALES, './Module').then((m) => m.UiSalesRemoteEntryModule),
    resolve: {
      dashboard: () => resolveEnvironment(UI_HOST_REMOTES.SALES),
    },
  },
  {
    path: UI_HOST_REMOTES.CONTACT,
    loadChildren: () => loadRemoteModule(UI_HOST_REMOTES.CONTACT, './Module').then((m) => m.UiContactRemoteEntryModule),
    resolve: {
      dashboard: () => resolveEnvironment(UI_HOST_REMOTES.CONTACT),
    },
  },
  {
    path: 'users',
    loadChildren: () => loadRemoteModule(UI_HOST_REMOTES.USER, './Module').then((m) => m.UiUserRemoteEntryModule),
    resolve: {
      dashboard: () => resolveEnvironment(UI_HOST_REMOTES.USER),
    },
  },
  {
    path: 'login',
    loadChildren: () => import('./login-wrapper/login-routes').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: '',
    loadChildren: () => import('./overview/overview.routes').then((m) => m.OVERVIEW_ROUTES),
    resolve: {
      dashboard: () => resolveEnvironment(UI_HOST_REMOTES.DASHBOARD),
    },
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      preloadingStrategy: QuicklinkStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class UiHostAppRoutingModule {}
