import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { inject, NgModule } from '@angular/core';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { UiUserDataAccessService } from '@ui-frontend-service/shared/data-access';
import { filter } from 'rxjs';

const routes: Routes = [
  {
    path: 'contact',
    loadChildren: () => import('./remote-entry/entry.module').then((m) => m.UiContactRemoteEntryModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login-wrapper').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: 'profile/:id',
    loadComponent: () => import('./profile-wrapper').then((m) => m.UiContactProfileWrapperComponent),
    resolve: {
      user: (route: ActivatedRouteSnapshot) => {
        return inject(UiUserDataAccessService)
          .userDetailById(route.params['id'])
          .pipe(filter((response) => !response.loading));
      },
    },
  },
  { path: '', redirectTo: '/contact', pathMatch: 'full' },
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
export class UiContactAppRoutingModule {}
