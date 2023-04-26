import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UiUserOverviewComponent } from './user-overview.component';
import { UiUserWrapperComponent } from './user-detail';
import { UiUserTableComponent } from './user-table';
import { inject } from '@angular/core';
import { filter } from 'rxjs';
import { UiUserDataAccessService } from '@ui-frontend-service/shared/data-access';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: UiUserOverviewComponent,
    children: [
      {
        path: '',
        component: UiUserTableComponent,
      },
      {
        path: 'new',
        component: UiUserWrapperComponent,
        outlet: 'detail-outlet',
      },
      {
        path: 'detail/:id',
        component: UiUserWrapperComponent,
        resolve: {
          user: (route: ActivatedRouteSnapshot) => {
            return inject(UiUserDataAccessService)
              .userDetailById(route.params['id'])
              .pipe(filter((response) => !response.loading));
          },
        },
        outlet: 'detail-outlet',
      },
    ],
  },
];
