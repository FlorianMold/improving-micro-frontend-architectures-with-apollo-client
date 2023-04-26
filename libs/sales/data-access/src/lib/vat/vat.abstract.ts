import { Observable } from 'rxjs';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiAllVatsResponseModel } from '@ui-frontend-service/sales/api-types';

export abstract class UiSalesDataAccessVatService {
  /**
   * Fetches all vats.
   *
   * @param options The options to pass to the watchQuery method.
   */
  abstract allVats(options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllVatsResponseModel>): Observable<UiAllVatsResponseModel>;
}
