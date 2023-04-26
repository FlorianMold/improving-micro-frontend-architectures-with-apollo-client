import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { inject, NgModule } from '@angular/core';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { UiUserDataAccessService } from '@ui-frontend-service/shared/data-access';
import { filter } from 'rxjs';

const routes: Routes = [
  {
    path: 'sales',
    loadChildren: () => import('./remote-entry/entry.module').then((m) => m.UiSalesRemoteEntryModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login-wrapper').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: 'profile/:id',
    loadComponent: () => import('./profile-wrapper').then((m) => m.UiSalesProfileWrapperComponent),
    resolve: {
      user: (route: ActivatedRouteSnapshot) => {
        return inject(UiUserDataAccessService)
          .userDetailById(route.params['id'])
          .pipe(filter((response) => !response.loading));
      },
    },
  },
  { path: '', redirectTo: '/sales/invoices', pathMatch: 'full' },
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
export class UiSalesAppRoutingModule {}
