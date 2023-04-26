import {
  ArgumentNode,
  DocumentNode,
  FieldNode,
  ObjectValueNode,
  SelectionNode,
  SelectionSetNode,
  VariableNode,
} from 'graphql/index';
import {
  CacheObject,
  CacheReference,
  QueryArguments,
  QueryVariables,
  ReducedQuery,
  ReduceQueryOptions,
  TypeKeyFields,
} from './augmented-query.interface';
import { DirectiveNode, ObjectFieldNode, OperationDefinitionNode } from 'graphql/language/ast';
import { InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { stringify } from './stringify';
import { KeySpecifier } from '@apollo/client/cache/inmemory/policies';
import { UiTypedDocumentNode } from '@ui-frontend-service/shared/types/graphql-client-types';

/**
 * Reduces the given query by removing all fields that from the operation that are already stored inside the cache.
 *
 * @param queryAst The query that should be reduced.
 * @param reduceOptions The options for reducing the query.
 * @param cache The instance of the in-memory cache.
 */
export function reduceQuery<TData, TVariables extends QueryVariables>(
  queryAst: UiTypedDocumentNode<TData, TVariables>,
  cache: InMemoryCache,
  reduceOptions: ReduceQueryOptions<TVariables> = { reduceQuery: true, fetchPolicy: 'cache-first' }
): ReducedQuery<TData, TVariables> {
  /**
   * Get the name of the query.
   * The name of the query is assigned by the user.
   *
   * query QueryName {
   * ...
   * }
   */
  const queryName = getQueryName(queryAst);
  /** Extracts the variables of the query. */
  const variables = extractVariables(reduceOptions);
  /** The reduced query. */
  const reducedQueryAst = getQueryAst(queryAst, cache, reduceOptions);

  return {
    reducedQuery: reducedQueryAst,
    variables,
    reduceQuery: reduceOptions.reduceQuery,
    queryName,
    options: {
      fetchPolicy: reduceOptions.fetchPolicy,
      pollInterval: reduceOptions.pollInterval,
    },
  };
}

/**
 * Retrieves the name of the given query AST.
 * The name of the query is assigned by the user.
 *
 * query QueryName {
 * ...
 * }
 *
 * @param queryAst The query AST
 */
export function getQueryName(queryAst: DocumentNode): string {
  let queryName = '';

  const queryDefinitions = queryAst.definitions;

  if (queryDefinitions.length > 0) {
    const queryDefinition = queryDefinitions[0];

    if (queryDefinition.kind === 'OperationDefinition') {
      const operationDefinition = queryDefinition as OperationDefinitionNode;
      queryName = operationDefinition.name?.value ?? '';
    }
  }

  return queryName;
}

/**
 * Checks whether reduce-query options include properties that prevent the query from being reduced.
 * If the query can't be reduced the original query is returned, otherwise a query without the fields that are already
 * inside the cache is returned.
 *
 * For example, these options prevent the reduction:
 * <ul>
 *   <li>options.reduceQuery = false</li>
 *   <li>options.pollInterval is set</li>
 *   <li>The fetch policy is set to either cache-only, network-only and no-cache.</li>
 * </ul>
 *
 * @param queryAst The query AST to reduce.
 * @param cache The instance of the in-memory cache.
 * @param options The options for reducing the query.
 */
export function getQueryAst<TData, TVariables extends QueryVariables>(
  queryAst: UiTypedDocumentNode<TData, TVariables>,
  cache: InMemoryCache,
  options: ReduceQueryOptions<TVariables>
): UiTypedDocumentNode<TData, TVariables> | null {
  if (
    // Polling implies the need for fresh data.
    options?.pollInterval ||
    // `cache-only` means that nothing should be fetched from the server.
    // `network-only` and `no-cache` imply that everything should be fetched from the server.
    ['cache-only', 'network-only', 'no-cache'].includes(options.fetchPolicy) ||
    // Also provide an explicit option to disable query reduction.
    !options.reduceQuery
  ) {
    return queryAst;
  }

  return makeReducedQueryAst(cache, queryAst, options?.variables, options.additionalCacheRefs, options.keyArgs);
}

/**
 * Creates the reduced query AST by removing all fields, that are already inside the cache.
 *
 * @param cache The instance of the in-memory cache.
 * @param queryAst The query AST to reduce.
 * @param variables The variables of the query.
 * @param additionalCacheRefs Additional cache-refs to check for cached content
 * @param keyArgs Whether the query has key-arguments. If false, the args are removed from the query-name.
 */
export function makeReducedQueryAst<TData, TVariables>(
  cache: InMemoryCache,
  queryAst: DocumentNode,
  variables?: QueryVariables,
  additionalCacheRefs?: CacheReference[],
  keyArgs?: false | KeySpecifier
): UiTypedDocumentNode<TData, TVariables> | null {
  /** Get the current cache-data. */
  const cacheContents = cache.extract();
  const keyFields = getKeyFields(cache);

  const queryDefinition = queryAst.definitions[0] as OperationDefinitionNode;

  /**
   * Get the selected fields of the query.
   */
  const _selections = queryDefinition.selectionSet.selections;

  /**
   * Recursively iterate through the entire graphql query tree, removing the fields for which we
   * already have data in the cache.
   *
   * In the first step the root of the query is checked. In the following recursive steps the properties
   * of the query are checked.
   */
  const selections = _selections.reduce((result: SelectionNode[], selection: SelectionNode) => {
    const fieldName = buildFieldName(selection, variables, keyArgs);

    /**
     * Try to find the query with the name of the field in the cache.
     */
    let cacheObjectsOrRefs = cacheContents['ROOT_QUERY']?.[fieldName] as CacheReference[] | undefined;

    /**
     * TODO(FM): Additional feature:
     * Add additional references to the cache to look for
     */
    if (additionalCacheRefs) {
      cacheObjectsOrRefs = additionalCacheRefs;
    }
    // TODO(FM): End additional feature

    /** If the field cannot be found in the cache, keep the entire selection. */
    if (cacheObjectsOrRefs === undefined) {
      return [...result, selection];
    }

    if (!Array.isArray(cacheObjectsOrRefs)) {
      cacheObjectsOrRefs = [cacheObjectsOrRefs];
    }

    /** Handle the sub-selections of the root-queries. */
    return handleSubSelections(result, selection as FieldNode, cacheContents, cacheObjectsOrRefs, variables, keyFields);
  }, []);

  /** Merge the results of the query and the new selection-set */
  const selectionSet = {
    ...queryDefinition.selectionSet,
    selections,
  };

  const reducedQueryAst = {
    ...queryAst,
    definitions: [
      {
        ...queryDefinition,
        name: {
          kind: 'Name',
          /** Prefix the query name with something that clearly marks it as manipulated. */
          value: `__REDUCED__${queryDefinition.name?.value || ''}`,
        },
        selectionSet,
        /**
         * Remove variable definitions that are no longer referenced anywhere in the selection
         * set.
         */
        variableDefinitions: queryDefinition.variableDefinitions?.filter(({ variable }) =>
          hasVariable(selectionSet, variable.name.value)
        ),
      },
    ],
  };

  /**
   * If the reduced query happens to have no more selections because everything is already
   * available in the cache, return null, so we can skip this query.
   */
  if (reducedQueryAst.definitions[0].selectionSet.selections.length === 0) {
    return null;
  }

  return reducedQueryAst as UiTypedDocumentNode<TData, TVariables>;
}

/**
 * Returns the variables from the options.
 *
 * @param options The options of the query.
 */
function extractVariables<TVariables extends QueryVariables>(options?: ReduceQueryOptions<TVariables>): TVariables | undefined {
  return options?.variables;
}

/**
 * Retrieves the key-fields of the cache for the typenames.
 * Returns the key-fields as an object, where the key is the __typename (Contact) and the values are the key-fields.
 * Ignore type-policies, where no key-fields are set.
 *
 * @param cache The instance of the in-memory cache.
 */
function getKeyFields(cache: InMemoryCache): TypeKeyFields {
  /** Retrieve the type-policies. */
  const typePolicies = Object.entries(cache['config']?.typePolicies || {});

  /** Destructure the type-policy. */
  return typePolicies.reduce((result, [typename, { keyFields }]) => {
    if (!keyFields) {
      return result;
    }

    return {
      ...result,
      [typename]: keyFields,
    };
  }, {});
}

/**
 * Uses the given selection to determine the name of the field. If the selection has no arguments, the name
 * of the field is just the name of the selection. If the selection has arguments, the name of the
 * field is the name of the selection concatenated with the values of the arguments.
 *
 * @param selection The selection field inside the query.
 * @param variables The variables of the query.
 * @param keyArgs The key-arguments of the query.
 */
function buildFieldName(selection: SelectionNode, variables?: QueryVariables, keyArgs?: false | KeySpecifier): string {
  /** The selected field of the query. */
  const fieldSelection = selection as FieldNode;

  /**
   * If the field has no arguments, the field-name inside the query is the same as the
   * field-name inside the cache.
   *
   * Otherwise, the arguments of the query-property would be appended.
   * Like: name(first: 10, after: "abc") <=> name{(first: 10, after: "abc")}
   */
  if (!fieldSelection.arguments?.length) {
    return fieldSelection.name.value;
  }

  const args = reduceArgs(fieldSelection.arguments, variables);

  /**
   * TODO(FM): Additional behaviour by me
   * Account for the fact, that every variable can be undefined.
   * Therefore, the query is the same as when it is executed without variables
   * Therefore do not append the result of stringify, because it would lessen cache-hits.
   *
   * TODO: Maybe just check if any variables were given. If not return the field-name
   */
  const stringifiedArgs = stringify(args);
  /** The stringified args are empty. */
  if (stringifiedArgs === '{}' || keyArgs === false) {
    return fieldSelection.name.value;
  }

  // TODO: End custom behaviour

  return `${fieldSelection.name.value}(${stringifiedArgs})`;
}

/**
 * Reduces the arguments of a field to a simple object.
 *
 * @param args The arguments to reduce.
 * @param variables The variables of the query.
 */
function reduceArgs(args: ReadonlyArray<ArgumentNode | ObjectFieldNode>, variables: QueryVariables | undefined): QueryArguments {
  return args.reduce((result, node) => {
    const { value, name } = node;

    /** Split the arguments even more, when they are an object. */
    if (value.kind === 'ObjectValue') {
      const fields = (value as ObjectValueNode).fields;
      return {
        ...result,
        [name.value]: reduceArgs(fields, variables),
      };
    }

    let realValue: unknown;
    if (value.kind === 'Variable') {
      realValue = variables?.[value.name.value];
    } else {
      // TODO: Specify better type.
      realValue = (value as { value: string }).value;
    }
    return {
      ...result,
      [name.value]: value.kind === 'IntValue' && realValue ? parseInt(realValue as string, 10) : realValue,
    };
  }, {});
}

/**
 * Handles the sub-selections of queries. These are the fields, which a
 * query requests.
 *
 * @param result
 * @param selection The selected fields of the query.
 * @param cacheData The complete data inside the cache.
 * @param cacheObjectsOrRefs A reference to an object inside the cache, which matches the name of the root-query.
 * @param variables The variables of the query.
 * @param keyFields The key-fields of the in-memory cache-instance.
 */
function handleSubSelections(
  result: SelectionNode[],
  selection: SelectionNode,
  cacheData: NormalizedCacheObject,
  cacheObjectsOrRefs: CacheReference[],
  variables: QueryVariables | undefined,
  keyFields: TypeKeyFields
): SelectionNode[] {
  const subSelections = filterSubSelections(
    (selection as FieldNode).selectionSet?.selections,
    cacheData,
    cacheObjectsOrRefs,
    variables,
    keyFields
  );

  if (!subSelections || subSelections.length === 0) {
    return result;
  }

  return [
    ...result,
    {
      ...selection,
      selectionSet: {
        ...('selectionSet' in selection ? selection.selectionSet : {}),
        selections: subSelections,
      },
    } as SelectionNode,
  ];
}

/**
 * Checks, if the given field-selections are already available inside the cache.
 * Returns the fields, which are not available inside the cache.
 *
 * @param selections The sub-selections of a root-query.
 * @param cacheData The complete data inside the cache.
 * @param cacheObjectsOrRefs
 * @param variables The variables of the query.
 * @param keyFields The key-fields of the in-memory cache-instance.
 */
function filterSubSelections(
  selections: ReadonlyArray<SelectionNode> | undefined,
  cacheData: NormalizedCacheObject,
  cacheObjectsOrRefs: CacheReference[],
  variables: QueryVariables | undefined,
  keyFields: TypeKeyFields
): ReadonlyArray<SelectionNode> | undefined {
  /**
   * If there is no cache-object or reference, there is no data in the cache for this field, so we
   * keep this part of the query.
   */
  if (cacheObjectsOrRefs === undefined) {
    return selections;
  }

  const reducedSelections = selections?.reduce((result: SelectionNode[], selection: SelectionNode) => {
    const fieldName = buildFieldName(selection, variables);

    if (
      /**
       * Don't remove key-fields, otherwise apollo can't merge the cache items after the
       * request is done.
       */
      isKeyField(cacheData, cacheObjectsOrRefs, fieldName, keyFields) ||
      /**
       * Keep the entire selection, if at least one of the items from the cacheObjectsOrRefs is not in the cache.
       * It may have been evicted at some point.
       */
      !cacheObjectsOrRefs.every((item) => isPresentInCache(cacheData, item, fieldName))
    ) {
      /** Field must be preserved, therefore add it to the selection. */
      return [...result, selection];
    }

    /**
     * Drop the selection, if it is marked with the @client directive, since that means it's
     * a local field.
     */
    if (selection.directives?.some((directive: DirectiveNode) => directive.name.value === 'client')) {
      return result;
    }

    /**
     * If the current field (selection) is a not leaf inside the tree, we need to go deeper.
     *
     * If the selectionSet property is undefined, the current field is a leaf inside the tree.
     * Because it has no more subfields.
     */
    if ((selection as FieldNode).selectionSet) {
      /**
       * Gather all cache objects or refs of the next level in the tree. Ignore any null values.
       * By not only using a single object as a reference but rather as many like objects as possible,
       * we increase our chances of finding a useful reference for any we increase our chances of finding
       * a useful reference for any deeper-level fields.
       */
      const nextCacheObjectsOrRefs = findNextCacheObjectsOrRefs(cacheData, cacheObjectsOrRefs, fieldName);

      /**
       * If we can't find any data for this field in the cache at all, we'll drop the entire
       * selection. This may also be the case if we have already requested this field before,
       * but it has returned empty arrays for every single item.
       *
       * Or the reference is dangling.
       */
      if (nextCacheObjectsOrRefs.length === 0) {
        return result;
      }

      /**
       * If every single item is in the cache but contains a null value, we can drop the rest
       * of the selection because there will be no data on deeper levels.
       */
      if (nextCacheObjectsOrRefs.every((item: unknown) => item === null)) {
        return result;
      }

      return handleSubSelections(result, selection, cacheData, nextCacheObjectsOrRefs, variables, keyFields);
    }

    /** If we are here, the selected field is dropped from the selection. */
    return result;
  }, []);

  /**
   * If the reduced selection set is empty or only contains key fields, the cache already
   * contains all the data we need, so we can ignore this selection.
   */
  if (
    reducedSelections &&
    reducedSelections.every((node: SelectionNode) =>
      isKeyField(cacheData, cacheObjectsOrRefs, (node as FieldNode).name.value, keyFields)
    )
  ) {
    return [];
  }

  return reducedSelections;
}

/**
 * Checks, whether the given field-name is a key-field.
 *
 * @param cacheData The complete data inside the cache.
 * @param cacheObjectsOrRefs A reference to an object inside the cache.
 * @param fieldName The name of the field to check, whether it is a key-field
 * @param keyFields The key-fields of the in-memory cache-instance.
 */
function isKeyField(
  cacheData: NormalizedCacheObject,
  cacheObjectsOrRefs: CacheReference[],
  fieldName: string,
  keyFields: TypeKeyFields
): boolean {
  /** Retrieve the objects from the cache with the given references. */
  const cacheObject = cacheObjectsOrRefs.reduce(
    (result: CacheObject | null | undefined, item: CacheReference) => result || getCacheObject(cacheData, item),
    null
  );

  const __typename = cacheObject?.['__typename'];

  /** Normally the default key-field is the id, but it can be changed. */
  const keyFieldsForThisTypename = keyFields[__typename || ''] || ['id'];

  return keyFieldsForThisTypename.includes(fieldName);
}

/**
 * Returns the object with the given reference to it from the cache. If the reference does not relate to an object,
 * it returns undefined.
 *
 * CacheObjectOrRef may contain either the actual cache object or a reference to it. In the latter
 * case, this function returns the actual cache object that is being referenced.
 *
 * @param cacheData The complete data inside the cache.
 * @param cacheObjectOrRef A reference to an object inside the cache.
 */
function getCacheObject(cacheData: NormalizedCacheObject, cacheObjectOrRef: CacheReference): CacheObject | undefined {
  const ref = cacheObjectOrRef?.__ref;

  /**
   * Check whether the reference exists inside the cache.
   */
  if (ref && cacheData[ref] !== null) {
    return cacheData[ref];
  }

  /** If this condition is reached, that means that the cacheObjectOrRef is an object*/
  return cacheObjectOrRef as unknown as CacheObject;
}

/**
 * Check whether the given field-name is inside the given cacheObjectOrRef. The function checks, whether the cache-reference
 * exists in the cache and whether the field-name is inside the cache-object.
 *
 *
 * @param cacheData The complete data inside the cache.
 * @param cacheObjectOrRef A reference to an object inside the cache.
 * @param fieldName The name of the field to check, whether it is inside the cache.
 */
function isPresentInCache(cacheData: NormalizedCacheObject, cacheObjectOrRef: CacheReference, fieldName: string): boolean {
  const cacheObject = getCacheObject(cacheData, cacheObjectOrRef);

  /** Null means that the cache object exists but contains no data. */
  if (cacheObject === null) {
    return true;
  }

  /**
   * The cache object may have been evicted from the cache. So any of its children aren't in the
   * cache either.
   */
  if (cacheObject === undefined) {
    return false;
  }

  return cacheObject[fieldName] !== undefined;
}

/**
 * Finds all cache-refs of the next level in the tree. Checks whether the given field-name has a cache-reference as value.
 * Therefore, this cache-reference can be used to look up more data inside the cache.
 *
 * @param cacheData The complete data inside the cache.
 * @param cacheObjectsOrRefs A reference to an object or multiple objects inside the cache.
 * @param fieldName The name of the field, where additional cache-refs should be found.
 */
function findNextCacheObjectsOrRefs(
  cacheData: NormalizedCacheObject,
  cacheObjectsOrRefs: CacheReference[],
  fieldName: string
): CacheReference[] {
  return cacheObjectsOrRefs.reduce((result: CacheReference[], item: CacheReference) => {
    /** Retrieve the cached object */
    const itemCacheObject = getCacheObject(cacheData, item);

    if (itemCacheObject === null) {
      return result;
    }

    const fieldData = itemCacheObject?.[fieldName];

    if (Array.isArray(fieldData)) {
      return [...result, ...fieldData];
    }

    return [...result, fieldData];
  }, []);
}

/**
 * Checks whether the given selection-set contains the given variable.
 * Returns true, if the variable is used inside the selection-set, otherwise false.
 *
 * @param selectionSet The complete selection-set to check for the variable.
 * @param variable The name of the variable.
 */
function hasVariable(selectionSet: SelectionSetNode | undefined, variable: string): boolean {
  return (selectionSet?.selections || []).some((selection: SelectionNode) => {
    if (selection.kind !== 'Field') {
      return true;
    }

    /** Due to the check for the kind of the field, it can be safely assumed that the selection is a field-node. */
    const selectionFieldNode = selection as FieldNode;

    const isVariableInArguments = hasArgumentVariable(selection.arguments, variable);
    const isVariableInDirectives = selectionFieldNode?.directives?.some((directive: DirectiveNode) =>
      directive?.arguments?.some(({ value }) => (value as VariableNode)?.name?.value === variable)
    );
    const isVariableInSelectionSet = hasVariable(selection.selectionSet, variable);

    return isVariableInArguments || isVariableInDirectives || isVariableInSelectionSet;
  });
}

/**
 * Checks whether the given arguments contain the given variable.
 *
 * @param args The arguments of the selection to check.
 * @param variable The variable to check for.
 */
function hasArgumentVariable(args: ReadonlyArray<ArgumentNode | ObjectFieldNode> | undefined, variable: string): boolean {
  if (!args) {
    return false;
  }

  return args.some((argument) => {
    const argumentValue = argument.value as ObjectValueNode;
    if (argumentValue?.fields) {
      return hasArgumentVariable(argumentValue?.fields, variable);
    }

    return (argument.value as VariableNode)?.name?.value === variable;
  });
}
