import { Observable } from 'rxjs';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiAllArticleUnitsResponseModel } from '@ui-frontend-service/sales/api-types';

export abstract class UiSalesDataAccessArticleUnitService {
  /**
   * Fetches all article-units.
   *
   * @param options The options to pass to the watchQuery method.
   */
  abstract allArticleUnits(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllArticleUnitsResponseModel>
  ): Observable<UiAllArticleUnitsResponseModel>;
}
