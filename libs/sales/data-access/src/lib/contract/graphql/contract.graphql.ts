import { uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';
import {
  UiAllContractsSubsetResponseModel,
  UiAllContractsTablePagedResponseModel,
  UiContractDetailByIdResponseModel,
  UiContractsMetaResponseModel,
  UiContractTablePageFilter,
} from '@ui-frontend-service/sales/api-types';

/**
 * The query for fetching the paginated contracts for the contracts-table.
 */
export const UI_ALL_CONTRACTS_TABLE_PAGED_QUERY = uiGql<UiAllContractsTablePagedResponseModel, UiContractTablePageFilter>`
  query allContracts($page: Int, $perPage: Int, $sortField: String, $sortOrder: String, $filter: ContractFilter) {
    allContracts(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder, filter: $filter) {
      id
      contractor
      description
      name
      Client {
        id
        name
      }
      Customer {
        id
        name
        name2
        SalesCountry {
          id
          shortName
        }
      }
    }
  }
`;

export const UI_ALL_CONTRACTS_SUBSET_QUERY = uiGql<UiAllContractsSubsetResponseModel, UiContractTablePageFilter>`
  query allContractsSubset($page: Int, $perPage: Int, $sortField: String, $sortOrder: String, $filter: ContractFilter) {
    allContracts(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder, filter: $filter) {
      id
      contractor
      description
      name
      Customer {
        id
        SalesCountry {
          id
          shortName
        }
      }
    }
  }
`;

/**
 * Loads the meta-data of the contract-table.
 * This contains the total count of the contracts.
 */
export const UI_ALL_CONTRACTS_META_QUERY = uiGql<UiContractsMetaResponseModel, UiContractTablePageFilter>`
  query _allContractsMeta($page: Int, $perPage: Int) {
    _allContractsMeta(page: $page, perPage: $perPage) {
      count
    }
  }
`;

/**
 * The variables for fetching a contract by id.
 */
export interface UiContractByIdGQLVariables {
  /** The id of the contract to fetch. */
  id: string;
}

/**
 * The query for fetching the contract-details by id.
 */
export const UI_CONTRACT_DETAIL_BY_ID_QUERY = uiGql<UiContractDetailByIdResponseModel, UiContractByIdGQLVariables>`
  query Contract($id: ID!) {
    Contract(id: $id) {
      id
      contractor
      description
      name
      payPeriod
      payPeriodAdvance
      Client {
        id
        name
      }
      Customer {
        id
        name
        name2
        postal
        street
        vatNumber
        SalesCountry {
          id
          shortName
          longName
        }
      }
    }
  }
`;

/**
 * The mutation for removing a contract.
 */
export const UI_REMOVE_CONTRACT_MUTATION = uiGql<{ id: string }, UiRemoveContractDetailGQLVariables>`
  mutation removeContract($id: ID!) {
    removeContract(id: $id) {
      id
    }
  }
`;

/**
 * The variables for removing a contract.
 */
export interface UiRemoveContractDetailGQLVariables {
  id: string;
}
