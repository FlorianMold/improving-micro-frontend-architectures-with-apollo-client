import { Inject, Injectable, Provider } from '@angular/core';
import { UiAllSubContactsModel, UiSubContactDetailByIdModel } from '@ui-frontend-service/contact/api-types';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import { UI_ALL_SUB_CONTACTS_QUERY, UI_SUB_CONTACT_BY_ID_QUERY, UiSubContactByIdGQLVariables } from './graphql';
import { UiContactDataAccessSubContactService } from './sub-contact.abstract';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';
import {
  UI_GRAPHQL_CLIENT_CACHE,
  UiGraphQLClient,
  UiGraphQLClientInMemoryCache,
} from '@ui-frontend-service/shared/feature/graphql-client-options';
import { mapQueryResult } from '../util';

const __typename = 'SubContact';

@Injectable()
export class UiContactDataAccessSubContactServiceImpl implements UiContactDataAccessSubContactService {
  constructor(
    private _graphQLClient: UiGraphQLClient,
    @Inject(UI_GRAPHQL_CLIENT_CACHE) private _cache: UiGraphQLClientInMemoryCache,
    private _logger: UiLoggerService
  ) {}

  allSubContacts(options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllSubContactsModel>): Observable<UiAllSubContactsModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ALL_SUB_CONTACTS_QUERY,
      })
      .pipe(
        tap(() => this._logger.debug('allSubContacts')),
        map(mapQueryResult())
      );
  }

  subContactById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiSubContactByIdGQLVariables, UiSubContactDetailByIdModel>
  ): Observable<UiSubContactDetailByIdModel> {
    const subContactRef = this._cache.identify({ id, __typename });

    return this._graphQLClient
      .watchQuery({
        ...options,
        variables: { id },
        query: UI_SUB_CONTACT_BY_ID_QUERY,
        additionalCacheRefs: subContactRef ? [{ __ref: subContactRef }] : [],
      })
      .pipe(
        tap(() => this._logger.debug('subContactById')),
        map(mapQueryResult())
      );
  }
}

/**
 * The provider needed for fetching sub-contacts.
 */
export const UI_CONTACT_DATA_ACCESS_SUB_CONTACT_PROVIDER: Provider[] = [
  {
    provide: UiContactDataAccessSubContactService,
    useClass: UiContactDataAccessSubContactServiceImpl,
  },
];
