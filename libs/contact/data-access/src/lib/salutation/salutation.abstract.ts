import {
  UiAllSalutationsResponseModel,
  UiCreateSalutationResponseModel,
  UiRemoveSalutationResponseModel,
  UiSalutationDetailByIdResponseModel,
} from '@ui-frontend-service/contact/api-types';
import { Observable } from 'rxjs';
import { UiCreateSalutationGQLVariables, UiRemoveSalutationGQLVariables, UiSalutationByIdGQLVariables } from './graphql';
import {
  UiEmptyObject,
  UiMutationOptionsAlone,
  UiWatchQueryOptionsAlone,
} from '@ui-frontend-service/shared/types/graphql-client-types';

export abstract class UiContactDataAccessSalutationService {
  /**
   * Fetches all salutations.
   *
   * @param options The options to pass to the watchQuery method.
   */
  abstract allSalutations(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllSalutationsResponseModel>
  ): Observable<UiAllSalutationsResponseModel>;

  /**
   * Fetches a salutation by id.
   *
   * @param id The id of the salutation to fetch.
   * @param options The options to pass to the watchQuery method.
   */
  abstract salutationById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiSalutationByIdGQLVariables, UiSalutationDetailByIdResponseModel>
  ): Observable<UiSalutationDetailByIdResponseModel>;

  /**
   * Creates a new salutation with the given id.
   *
   * @param id The identifier of the salutation to create.
   * @param options The options to pass to the mutation method.
   *
   * @privateRemarks This function does not work with the json-graphql-test-backend!
   */
  abstract createSalutation(
    id: string,
    options?: UiMutationOptionsAlone<UiCreateSalutationResponseModel, UiCreateSalutationGQLVariables>
  ): Observable<UiCreateSalutationResponseModel>;

  /**
   * Removes the salutation with the given id.
   *
   * @param id The identifier of the salutation to remove.
   * @param options The options to pass to the mutation method.
   */
  abstract removeSalutation(
    id: string,
    options?: UiMutationOptionsAlone<UiRemoveSalutationResponseModel, UiRemoveSalutationGQLVariables>
  ): Observable<UiRemoveSalutationResponseModel>;
}
