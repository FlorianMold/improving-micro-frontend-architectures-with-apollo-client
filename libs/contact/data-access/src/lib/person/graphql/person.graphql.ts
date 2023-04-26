import {
  UiAllPersonsResponseModel,
  UiAllPersonsSubsetResponseModel,
  UiPersonDetailByIdResponseModel,
} from '@ui-frontend-service/contact/api-types';
import { UiEmptyObject, uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';

/**
 * The query to fetch all persons.
 */
export const UI_ALL_PERSONS_QUERY = uiGql<UiAllPersonsResponseModel, UiEmptyObject>`
  query persons {
    allPeople {
      id
      firstName
      lastName
      phone
      mobile
      fax
      function
    }
  }
`;

/**
 * The query to fetch all persons.
 */
export const UI_ALL_PERSONS_SUBSET_QUERY = uiGql<UiAllPersonsSubsetResponseModel, UiEmptyObject>`
  query persons {
    allPeople {
      id
      firstName
      lastName
    }
  }
`;

/**
 * The variables for the person-detail query.
 */
export type UiPersonByIdGQLVariables = {
  id: string;
};

/**
 * The query for fetching the person-details by id.
 */
export const UI_PERSON_BY_ID_QUERY = uiGql<UiPersonDetailByIdResponseModel, UiPersonByIdGQLVariables>`
  query personById($id: ID!) {
    Person(id: $id) {
      id
      first_name
      last_name
      phone
      mobile
      fax
      function
    }
  }
`;
