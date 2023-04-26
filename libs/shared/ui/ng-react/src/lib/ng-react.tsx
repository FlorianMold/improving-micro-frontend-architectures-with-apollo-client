// https://netbasal.com/using-react-in-angular-applications-1bb907ecac91

import * as React from "react";
import { createContext, createElement, PropsWithChildren, useContext } from "react";
import { InMemoryCache, InMemoryCacheConfig } from "@apollo/client/core";

/**
 * Create separate version of the graphql-cache.
 */
export class UiNgReactInMemoryCache extends InMemoryCache {
  /** Increase the visible of the cache-config, otherwise the object would not be visible. */
  override config!: InMemoryCacheConfig;
}

/** The options for the query-reducer function. */
export interface UiNgReactAugmentedQueryOptions {
  /** Whether the queries should be reduced. */
  reduceQueries: boolean;
}

/**
 * The context that the react-application needs to function properly.
 * In the context of running inside a host-application, the context is provided by the host-application (angular).
 * In the context of running as a standalone application, the context is provided by the standalone-application (react).
 */
type UiNgReactCtx = {
  graphQLClientCache: UiNgReactInMemoryCache;
  graphQLEndpoint: string;
  augmentedQueryOptions: UiNgReactAugmentedQueryOptions;
};

const InjectorCtx = createContext<UiNgReactCtx | null>(null);

/**
 * Creates a React component that provides the needed context for sub-components.
 *
 * @param props The values for the context
 */
export function UiNgReactContext(
  props: PropsWithChildren<{
    ctx: {
      graphQLClientCache: UiNgReactInMemoryCache;
      graphQLEndpoint: string;
      augmentedQueryOptions: UiNgReactAugmentedQueryOptions;
    };
  }>
) {
  return createElement(InjectorCtx.Provider, {
    children: props.children,
    value: {
      graphQLClientCache: props.ctx.graphQLClientCache,
      graphQLEndpoint: props.ctx.graphQLEndpoint,
      augmentedQueryOptions: props.ctx.augmentedQueryOptions,
    },
  });
}

/**
 * Creates a react-component that wraps the children inside a react-suspense.
 * @param props The component props.
 */
export const UiNgReactSuspenseComp = (props: PropsWithChildren) => {
  return <React.Suspense fallback={<div>Loading...</div>}>{props.children}</React.Suspense>;
};

/**
 * Creates a React hook that returns the Injector instance.
 */
export function useInjector(): UiNgReactCtx {
  let injector = useContext(InjectorCtx);

  /**
   * When the injector is not available, the application is running in standalone mode. And the host-application
   * (angular) can't provide the injector.
   */
  if (!injector) {
    injector = {
      graphQLClientCache: new UiNgReactInMemoryCache(),
      graphQLEndpoint: process.env["NX_DASHBOARD_REACT_GRAPHQL_URL"] ?? "",
      augmentedQueryOptions: { reduceQueries: true },
    };
  }

  return injector;
}
