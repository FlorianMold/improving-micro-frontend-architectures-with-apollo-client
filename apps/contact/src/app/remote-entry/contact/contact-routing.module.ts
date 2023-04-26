import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { UiContactDetailComponent } from './contact-detail';
import { inject, NgModule } from '@angular/core';
import { UiContactOverviewComponent } from './contact-overview';
import { UiContactDocumentComponent } from './contact-document';
import { UiContactTableComponent } from './contact-table';
import { UiContactDataAccessContactService } from '@ui-frontend-service/contact/data-access';
import { filter } from 'rxjs/operators';
import { UiContactDetailByIdResponseModel } from '@ui-frontend-service/contact/api-types';

export const CONTACT_ROUTES: Routes = [
  {
    path: '',
    component: UiContactOverviewComponent,
    children: [
      {
        path: '',
        component: UiContactTableComponent,
      },
      {
        path: 'new',
        component: UiContactDetailComponent,
        outlet: 'detail-outlet',
      },
      {
        path: 'detail/:id',
        component: UiContactDetailComponent,
        resolve: {
          contact: (route: ActivatedRouteSnapshot) => {
            return inject(UiContactDataAccessContactService)
              .contactDetailById(route.params['id'])
              .pipe(filter((response: UiContactDetailByIdResponseModel) => !response.loading));
          },
        },
        outlet: 'detail-outlet',
      },
      {
        path: 'document/:id',
        component: UiContactDocumentComponent,
        outlet: 'document-outlet',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(CONTACT_ROUTES)],
  exports: [RouterModule],
})
export class UiRemoteContactRoutingModule {}
