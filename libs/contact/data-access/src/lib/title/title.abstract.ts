import {
  UiAllTitlesResponseModel,
  UiCreateTitleResponseModel,
  UiRemoveTitleResponseModel,
  UiTitleByIdResponseModel,
} from '@ui-frontend-service/contact/api-types';
import { Observable } from 'rxjs';
import { UiCreateTitleGQLVariables, UiRemoveTitleGQLVariables, UiTitleByIdGQLVariables } from './graphql';
import {
  UiEmptyObject,
  UiMutationOptionsAlone,
  UiWatchQueryOptionsAlone,
} from '@ui-frontend-service/shared/types/graphql-client-types';

export abstract class UiContactDataAccessTitleService {
  /**
   * Fetches all titles.
   *
   * @param options The options to pass to the watchQuery method.
   */
  abstract allTitles(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllTitlesResponseModel>
  ): Observable<UiAllTitlesResponseModel>;

  /**
   * Fetches a title by id.
   *
   * @param id The id of the title to fetch.
   * @param options The options to pass to the watchQuery method.
   */
  abstract titleById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiTitleByIdGQLVariables, UiTitleByIdResponseModel>
  ): Observable<UiTitleByIdResponseModel>;

  /**
   * Creates a new title with the given id.
   *
   * @param id The identifier of the title to create.
   * @param options The options to pass to the mutation method.
   *
   * @privateRemarks This function does not work with the json-graphql-test-backend!
   */
  abstract createTitle(
    id: string,
    options?: UiMutationOptionsAlone<UiCreateTitleResponseModel, UiCreateTitleGQLVariables>
  ): Observable<UiCreateTitleResponseModel>;

  /**
   * Removes the title with the given id.
   *
   * @param id The identifier of the title to remove.
   * @param options The options to pass to the mutation method.
   */
  abstract removeTitle(
    id: string,
    options?: UiMutationOptionsAlone<UiRemoveTitleResponseModel, UiRemoveTitleGQLVariables>
  ): Observable<UiRemoveTitleResponseModel>;
}
