import { UiAllTitlesResponseModel } from '@ui-frontend-service/shared/api-types';
import { Observable } from 'rxjs';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';

export abstract class UiTitleDataAccessService {
  /**
   * Fetches all titles.
   *
   * @param options The options to pass to the watchQuery method.
   */
  abstract allTitles(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllTitlesResponseModel>
  ): Observable<UiAllTitlesResponseModel>;
}
