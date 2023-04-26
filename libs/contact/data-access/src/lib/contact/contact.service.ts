import { Inject, Injectable, Provider } from '@angular/core';
import {
  UiAllContactsSubsetResponseModel,
  UiAllContactsTablePagedResponseModel,
  UiContactCountriesCountAggregatedResponseModel,
  UiContactCountriesCountResponseModel,
  UiContactDetailByIdResponseModel,
  UiContactDetailModel,
  UiContactRemoveByIdResponseModel,
  UiContactsMetaResponseModel,
  UiContactTablePageFilter,
  UiContactTitlesCountAggregatedResponseModel,
  UiContactTitlesCountResponseModel,
  UiCreateContactDetailResponseModel,
  UiUpdateContactDetailResponseModel,
} from '@ui-frontend-service/contact/api-types';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { filter, map, Observable, tap } from 'rxjs';
import { UiContactDataAccessContactService } from './contact.abstract';
import {
  UI_ALL_CONTACTS_META_QUERY,
  UI_ALL_CONTACTS_SUBSET_QUERY,
  UI_ALL_CONTACTS_TABLE_PAGED_QUERY,
  UI_CONTACT_COUNTRIES_COUNT_QUERY,
  UI_CONTACT_DETAIL_BY_ID_QUERY,
  UI_CONTACT_TITLES_COUNT_QUERY,
  UI_CREATE_CONTACT_DETAIL_MUTATION,
  UI_REMOVE_CONTACT_MUTATION,
  UI_UPDATE_CONTACT_DETAIL_MUTATION,
  UiContactByIdGQLVariables,
  UiCreateContactDetailGQLVariables,
  UiRemoveContactDetailGQLVariables,
  UiUpdateContactDetailGQLVariables,
} from './graphql';
import {
  UiEmptyObject,
  UiMutationOptionsAlone,
  UiReference,
  UiStoreObject,
  UiWatchQueryOptionsAlone,
} from '@ui-frontend-service/shared/types/graphql-client-types';
import {
  UI_GRAPHQL_CLIENT_CACHE,
  UiGraphQLClient,
  UiGraphQLClientInMemoryCache,
} from '@ui-frontend-service/shared/feature/graphql-client-options';
import { mapMutationResult, mapQueryResult } from '../util';

const __typename = 'Contact';

@Injectable()
export class UiContactDataAccessContactServiceImpl implements UiContactDataAccessContactService {
  constructor(
    private _graphQLClient: UiGraphQLClient,
    private _logger: UiLoggerService,
    @Inject(UI_GRAPHQL_CLIENT_CACHE) private _cache: UiGraphQLClientInMemoryCache
  ) {}

  allContactsMeta(
    pageFilter: UiContactTablePageFilter,
    options?: UiWatchQueryOptionsAlone<UiContactTablePageFilter, UiContactsMetaResponseModel>
  ): Observable<UiContactsMetaResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        variables: {
          ...pageFilter,
        },
        /** The result of this operation does not need to be cached. */
        fetchPolicy: 'network-only',
        query: UI_ALL_CONTACTS_META_QUERY,
      })
      .pipe(
        tap(() => this._logger.debug('allContactsMeta')),
        map(mapQueryResult())
      );
  }

  allContacts(
    pageFilter: UiContactTablePageFilter,
    options?: UiWatchQueryOptionsAlone<UiContactTablePageFilter, UiAllContactsTablePagedResponseModel>
  ): Observable<UiAllContactsTablePagedResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ALL_CONTACTS_TABLE_PAGED_QUERY,
        variables: {
          ...pageFilter,
        },
      })
      .pipe(
        tap(() => this._logger.debug('allContacts', pageFilter)),
        map(mapQueryResult())
      );
  }

  allContactsSubset(
    pageFilter: UiContactTablePageFilter,
    options?: UiWatchQueryOptionsAlone<UiContactTablePageFilter, UiAllContactsSubsetResponseModel>
  ): Observable<UiAllContactsSubsetResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ALL_CONTACTS_SUBSET_QUERY,
        variables: {
          ...pageFilter,
        },
      })
      .pipe(
        tap(() => this._logger.debug('allContactsSubset')),
        map(mapQueryResult())
      );
  }

  contactDetailById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiContactByIdGQLVariables, UiContactDetailByIdResponseModel>
  ): Observable<UiContactDetailByIdResponseModel> {
    const contactRef = this._cache.identify({ id, __typename });

    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_CONTACT_DETAIL_BY_ID_QUERY,
        variables: {
          id,
        },
        additionalCacheRefs: contactRef ? [{ __ref: contactRef }] : [],
      })
      .pipe(
        tap(() => this._logger.debug('contactDetailById')),
        map(mapQueryResult())
      );
  }

  contactTitlesCount(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiContactTitlesCountResponseModel>
  ): Observable<UiContactTitlesCountAggregatedResponseModel> {
    const titleMap = new Map<string, number>();
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_CONTACT_TITLES_COUNT_QUERY,
        keyArgs: false,
      })
      .pipe(
        tap(() => this._logger.debug('contactTitlesCount')),
        filter((data) => !data.loading),
        map((data) => {
          const result = data.data.allContacts;

          for (const value of Object.values(result)) {
            const title = value.Title.id;
            if (titleMap.has(title)) {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked before
              titleMap.set(title, titleMap.get(title)! + 1);
            } else {
              titleMap.set(title, 1);
            }
          }
          return {
            ...data,
            data: { titleCount: Object.assign({}, ...[...titleMap.entries()].map(([k, v]) => ({ [k]: v }))) },
          };
        }),
        map(mapQueryResult())
      );
  }

  contactCountryCount(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiContactCountriesCountResponseModel>
  ): Observable<UiContactCountriesCountAggregatedResponseModel> {
    const countryMap = new Map<string, number>();

    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_CONTACT_COUNTRIES_COUNT_QUERY,
        keyArgs: false,
      })
      .pipe(
        tap(() => this._logger.debug('contactCountryCount')),
        filter((data) => !data.loading),
        map((data) => {
          const result = data.data.allContacts;

          for (const value of Object.values(result)) {
            const country = value?.Address?.Country?.id;

            if (!country) continue;

            if (countryMap.has(country)) {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked before
              countryMap.set(country, countryMap.get(country)! + 1);
            } else {
              countryMap.set(country, 1);
            }
          }
          return {
            ...data,
            data: { countryCount: Object.assign({}, ...[...countryMap.entries()].map(([k, v]) => ({ [k]: v }))) },
          };
        }),
        map(mapQueryResult())
      );
  }

  createContact(
    contact: UiContactDetailModel,
    options?: UiMutationOptionsAlone<UiCreateContactDetailResponseModel, UiCreateContactDetailGQLVariables>
  ): Observable<UiCreateContactDetailResponseModel> {
    /**
     * TODO: This is a workaround for making the mutation work with the
     * the json-graphql-server. The json-graphql-server does not support
     * wants every property of the mutation and an already created address.
     */
    const fixedContact: any = {
      ...contact,
      firstName: contact.name,
      secondName: contact.name2,
      state: 1,
      createdAt: 11,
      changedAt: 11,
      deletedAt: null,
      address_id: 'f31d3f53-7996-4074-9ef3-b2f31953ad4e',
      newsletter: false,
    };

    return this._graphQLClient
      .mutate({
        mutation: UI_CREATE_CONTACT_DETAIL_MUTATION,
        variables: {
          ...fixedContact,
        },
        update(cache, mutationResult) {
          /** Add the newly created contact to the allContacts list. */
          cache.modify({
            fields: {
              allContacts(existingContacts = [], { toReference }) {
                const newContactRef = mutationResult.data?.createContact;
                if (newContactRef) {
                  return [...existingContacts, toReference(newContactRef as unknown as UiStoreObject)];
                }
                return existingContacts;
              },
            },
          });
        },
        ...options,
      })
      .pipe(
        tap(() => this._logger.debug('createContact')),
        map(mapMutationResult())
      );
  }

  updateContact(
    contact: UiContactDetailModel,
    options?: UiMutationOptionsAlone<UiUpdateContactDetailResponseModel, UiUpdateContactDetailGQLVariables>
  ): Observable<UiUpdateContactDetailResponseModel> {
    return this._graphQLClient
      .mutate({
        mutation: UI_UPDATE_CONTACT_DETAIL_MUTATION,
        variables: {
          ...contact,
        },
        ...options,
      })
      .pipe(
        tap(() => this._logger.debug('updateContact')),
        map(mapMutationResult())
      );
  }

  removeContactById(
    id: string,
    options?: UiMutationOptionsAlone<{ id: string }, UiRemoveContactDetailGQLVariables>
  ): Observable<UiContactRemoveByIdResponseModel> {
    return this._graphQLClient
      .mutate({
        mutation: UI_REMOVE_CONTACT_MUTATION,
        variables: { id },
        update(cache) {
          cache.modify({
            fields: {
              allContacts(existingContacts = [], { readField }) {
                return existingContacts.filter(
                  (contactRef: UiStoreObject | UiReference | undefined) => readField('id', contactRef) !== id
                );
              },
              _allContactsMeta(existingContactsMeta = {}) {
                return existingContactsMeta?.count - 1;
              },
            },
          });
          /** Remove contact reference from the cache. */
          cache.evict({ id: cache.identify({ __typename, id }) });
          /** Remove any dangling references. */
          cache.gc();
        },
        ...options,
      })
      .pipe(
        tap(() => this._logger.debug('removeContact')),
        map(mapMutationResult())
      );
  }
}

/**
 * The needed providers for the contact service.
 */
export const UI_CONTACT_DATA_ACCESS_CONTACT_PROVIDER: Provider[] = [
  {
    provide: UiContactDataAccessContactService,
    useClass: UiContactDataAccessContactServiceImpl,
  },
];
