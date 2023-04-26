import { UiFieldPolicy, UiFieldReadFunction, UiTypePolicies } from '@ui-frontend-service/shared/types/graphql-client-types';

// function isNotNil<T>(value: T): value is NonNullable<T> {
//   return typeof value !== 'undefined' && value !== null;
// }

/**
 * Creates a simple cache-redirect for the given typename.
 *
 * @param typeName The name of the type.
 */
function createCacheRedirectById(typeName: string): UiFieldReadFunction {
  return (_: unknown, { args, toReference }) => {
    return toReference({ __typename: typeName, id: args?.['id'] });
  };
}

/**
 * Creates an array of redirect functions for the array.
 */
const cacheRedirectFn = ['Invoice', 'Contract', 'SalesCountry', 'ArticleUnit', 'Currency', 'Vat', 'InvoiceType'].reduce(
  (result: { [typeName: string]: UiFieldReadFunction }, typeName: string) => {
    return {
      ...result,
      [typeName]: createCacheRedirectById(typeName),
    };
  },
  {}
);

/**
 * Provides all type-policies for accessing the sales-data inside the cache.
 * This field-policy should be used in every application that uses the sales-data-access-service.
 */
export const UI_SALES_DATA_ACCESS_SERVICE_ROOT_QUERY_FIELD_POLICIES: {
  [fieldName: string]: UiFieldPolicy | UiFieldReadFunction;
} = {
  ...cacheRedirectFn,
  // allInvoices: {
  //   /**
  //    * Don't cache separate results based on any of this field's arguments.
  //    */
  //   keyArgs: false,
  //   /**
  //    * Concatenate the incoming list items with the existing list items.
  //    *
  //    * @param existing The existing list of items.
  //    * @param incoming The incoming list of items.
  //    * @param args The arguments passed to the field.
  //    */
  //   merge(existing, incoming, { args }) {
  //     const { page, perPage } = (
  //       args
  //         ? args
  //         : {
  //             page: null,
  //             perPage: null,
  //           }
  //     ) as { page: number | null; perPage: number | null };
  //
  //     let merged = [];
  //     if (isNotNil(page) && isNotNil(perPage)) {
  //       merged = existing ? existing.slice(0) : [];
  //       for (let i = 0; i < incoming.length; ++i) {
  //         merged[page * perPage + i] = incoming[i];
  //       }
  //     } else {
  //       merged = incoming;
  //     }
  //
  //     return merged;
  //   },
  //   read(existing, { args }) {
  //     const { page, perPage } = (
  //       args
  //         ? args
  //         : {
  //             page: null,
  //             perPage: null,
  //           }
  //     ) as { page: number | null; perPage: number | null };
  //
  //     if (isNotNil(page) && isNotNil(perPage)) {
  //       const offset = page * perPage;
  //
  //       /**
  //        * A read function should always return undefined if existing is
  //        * undefined. Returning undefined signals that the field is
  //        * missing from the cache, which instructs Apollo Client to
  //        * fetch its value from your GraphQL server.
  //        */
  //       const res = existing && existing.slice(offset, offset + perPage);
  //       return res && res.length > 0 ? res : undefined;
  //     }
  //
  //     return existing;
  //   },
  // },
  _allInvoicesMeta: {
    keyArgs: false,
  },
  // allContracts: {
  //   /**
  //    * Don't cache separate results based on any of this field's arguments.
  //    */
  //   keyArgs: false,
  //   /**
  //    * Concatenate the incoming list items with the existing list items.
  //    *
  //    * @param existing The existing list of items.
  //    * @param incoming The incoming list of items.
  //    * @param args The arguments passed to the field.
  //    */
  //   merge(existing, incoming, { args }) {
  //     const { page, perPage } = (
  //       args
  //         ? args
  //         : {
  //             page: null,
  //             perPage: null,
  //           }
  //     ) as { page: number | null; perPage: number | null };
  //
  //     let merged = [];
  //     if (isNotNil(page) && isNotNil(perPage)) {
  //       merged = existing ? existing.slice(0) : [];
  //       for (let i = 0; i < incoming.length; ++i) {
  //         merged[page * perPage + i] = incoming[i];
  //       }
  //     } else {
  //       merged = incoming;
  //     }
  //
  //     return merged;
  //   },
  //   read(existing, { args }) {
  //     const { page, perPage } = (
  //       args
  //         ? args
  //         : {
  //             page: null,
  //             perPage: null,
  //           }
  //     ) as { page: number | null; perPage: number | null };
  //
  //     if (isNotNil(page) && isNotNil(perPage)) {
  //       const offset = page * perPage;
  //
  //       /**
  //        * A read function should always return undefined if existing is
  //        * undefined. Returning undefined signals that the field is
  //        * missing from the cache, which instructs Apollo Client to
  //        * fetch its value from your GraphQL server.
  //        */
  //       const res = existing && existing.slice(offset, offset + perPage);
  //       return res && res.length > 0 ? res : undefined;
  //     }
  //
  //     return existing;
  //   },
  // },
  _allContractsMeta: {
    keyArgs: false,
  },
};

/**
 * Provides type-policies for accessing the sales-data inside the cache.
 */
export const UI_SALES_DATA_ACCESS_SERVICE_TYPE_POLICIES: UiTypePolicies = {};
