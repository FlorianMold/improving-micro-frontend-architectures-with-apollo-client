import { UiAllSalutationsResponseModel } from '@ui-frontend-service/shared/api-types';
import { Observable } from 'rxjs';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';

export abstract class UiSalutationDataAccessService {
  /**
   * Fetches all salutations.
   *
   * @param options The options to pass to the watchQuery method.
   */
  abstract allSalutations(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllSalutationsResponseModel>
  ): Observable<UiAllSalutationsResponseModel>;
}
