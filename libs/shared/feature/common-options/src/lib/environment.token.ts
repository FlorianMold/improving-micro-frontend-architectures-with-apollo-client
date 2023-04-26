import { InjectionToken } from '@angular/core';

/**
 * The base environment that all applications should inherit.
 */
export interface UiBaseEnvironment {
  /** Whether the application should connect to the graphql-client dev-tools. */
  connectToDevTools: boolean;
  /** The allowed level for the logger. */
  logLevel: number;
}

/** Injection token that can be used to inject the environment that every application must provide. */
export const UI_BASE_ENVIRONMENT = new InjectionToken<UiBaseEnvironment>('ui-base-environment');
