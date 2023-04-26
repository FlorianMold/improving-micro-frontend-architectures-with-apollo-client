import {
  UiAllTitlesResponseModel,
  UiCreateTitleResponseModel,
  UiRemoveTitleResponseModel,
  UiTitleByIdResponseModel,
} from '@ui-frontend-service/contact/api-types';
import { UiEmptyObject, uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';

/**
 * The query for fetching all titles.
 */
export const UI_ALL_TITLES_QUERY = uiGql<UiAllTitlesResponseModel, UiEmptyObject>`
  query allTitles {
    allTitles {
      id
    }
  }
`;

/**
 * The variables needed for fetching a title by id.
 */
export type UiTitleByIdGQLVariables = {
  id: string;
};

/**
 * The query for fetching the title-details by id.
 */
export const UI_TITLE_BY_ID_QUERY = uiGql<UiTitleByIdResponseModel, UiTitleByIdGQLVariables>`
  query titleById($id: ID!) {
    Title(id: $id) {
      id
    }
  }
`;

/**
 * The variables needed for creating a new title.
 */
export type UiCreateTitleGQLVariables = {
  id: string;
};

/**
 * The mutation for creating a new title.
 */
export const UI_CREATE_TITLE_MUTATION = uiGql<UiCreateTitleResponseModel, UiCreateTitleGQLVariables>`
  mutation createTitle($id: ID!) {
    createTitle(id: $id) {
      id
    }
  }
`;

/**
 * The variables needed for removing a title.
 */
export type UiRemoveTitleGQLVariables = {
  id: string;
};

/**
 * The mutation for removing a title.
 */
export const UI_REMOVE_TITLE_MUTATION = uiGql<UiRemoveTitleResponseModel, UiRemoveTitleGQLVariables>`
  mutation removeTitle($id: ID!) {
    removeTitle(id: $id) {
      id
    }
  }
`;
