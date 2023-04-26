/**
 * Interface that is needed, when an
 * endpoint returns paged information.
 */
export interface UiPageInfoMetadataType {
  /** The index of the current page. */
  currentPage: number;
  /** The amount of items inside the current page. */
  pageSize: number;
  /** The total amount of items. */
  totalItems: number;
  /** The total amount of pages. */
  totalPages: number;
}

/**
 * Interface that is needed for paged responses.
 */
export interface UiPagedResponseType<T> {
  pageInfo: UiPageInfoMetadataType;
  result: T[];
}

export interface UiPageFilter<T> {
  /** The current page. */
  page?: number;
  /** The items, which are shown per page. */
  perPage?: number;
  /** The name of the field, which should be sorted. */
  sortField?: string;
  /** The order of the sort-operation. */
  sortOrder?: string;
  /** An object containing the properties, which can be filtered. */
  filter?: T;
}
