import { Observable } from 'rxjs';
import { UiMutationOptionsAlone, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';
import {
  UiAllContractsSubsetResponseModel,
  UiAllContractsTablePagedResponseModel,
  UiContractDetailByIdResponseModel,
  UiContractRemoveByIdResponseModel,
  UiContractsMetaResponseModel,
  UiContractTablePageFilter,
} from '@ui-frontend-service/sales/api-types';
import { UiContractByIdGQLVariables, UiRemoveContractDetailGQLVariables } from './graphql';

export abstract class UiSalesDataAccessContractService {
  /**
   * Fetches meta-data about the contract-table.
   *
   * @param pageFilter Specifies the page to fetch and the amount of items per page.
   * @param options The options to pass to the watchQuery method.
   */
  abstract allContractsMeta(
    pageFilter: UiContractTablePageFilter,
    options?: UiWatchQueryOptionsAlone<UiContractTablePageFilter, UiContractsMetaResponseModel>
  ): Observable<UiContractsMetaResponseModel>;

  /**
   * Fetches all Contracts paged according to the filter.
   *
   * @param pageFilter Specifies the page to fetch and the amount of items per page.
   * @param options The options for the retrieval of all contracts for the table.
   */
  abstract allContracts(
    pageFilter?: UiContractTablePageFilter,
    options?: UiWatchQueryOptionsAlone<UiContractTablePageFilter, UiAllContractsTablePagedResponseModel>
  ): Observable<UiAllContractsTablePagedResponseModel>;

  /**
   * Fetches all Contracts with a subset of fields.
   *
   * @param pageFilter Specifies the page to fetch and the amount of items per page.
   * @param options The options for the retrieval of all contracts for the table.
   */
  abstract allContractsSubset(
    pageFilter?: UiContractTablePageFilter,
    options?: UiWatchQueryOptionsAlone<UiContractTablePageFilter, UiAllContractsSubsetResponseModel>
  ): Observable<UiAllContractsSubsetResponseModel>;

  /**
   * Fetch a contract by id.
   *
   * @param id The id of the contract to fetch.
   * @param options The options for the retrieval of the contract by id.
   */
  abstract contractDetailById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiContractByIdGQLVariables, UiContractDetailByIdResponseModel>
  ): Observable<UiContractDetailByIdResponseModel>;

  /**
   * Remove the contract with the given id.
   *
   * @param id The id of the contract to remove.
   * @param options The options for the removal of the contract.
   */
  abstract removeContractById(
    id: string,
    options?: UiMutationOptionsAlone<{ id: string }, UiRemoveContractDetailGQLVariables>
  ): Observable<UiContractRemoveByIdResponseModel>;
}
