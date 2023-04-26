import { UiAllDirectDebitsResponseModel, UiDirectDebitByIdResponseModel } from '@ui-frontend-service/contact/api-types';
import { Observable } from 'rxjs';
import { UiDirectDebitByIdGQLVariables } from './graphql';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';

export abstract class UiContactDataAccessDirectDebitService {
  /**
   * Fetches all direct-debits.
   *
   * @param options The options to pass to the watchQuery method.
   */
  abstract allDirectDebits(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllDirectDebitsResponseModel>
  ): Observable<UiAllDirectDebitsResponseModel>;

  /**
   * Fetches a direct-debit by id.
   *
   * @param id The id of the direct-debit to fetch.
   * @param options The options to pass to the watchQuery method.
   */
  abstract directDebitById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiDirectDebitByIdGQLVariables, UiDirectDebitByIdResponseModel>
  ): Observable<UiDirectDebitByIdResponseModel>;
}
