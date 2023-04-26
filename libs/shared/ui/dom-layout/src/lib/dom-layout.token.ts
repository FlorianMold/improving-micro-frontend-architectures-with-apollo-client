import { InjectionToken } from '@angular/core';
import { UiLayoutConfig, UiLayoutNavigationNode } from './dom-layout.types';

/** Injection-token that can be used to configure the layout. */
export const UI_LAYOUT_CONFIG = new InjectionToken<UiLayoutConfig>('UI_LAYOUT_CONFIG');

/**
 * Default options for the layout-navigation.
 */
export interface UiLayoutNavigationConfig {
  topNodes: UiLayoutNavigationNode[];
}

/**
 * Injection token that can be used to configure the
 * default options for the layout-navigation
 */
export const UI_LAYOUT_NAVIGATION_CONFIG = new InjectionToken<UiLayoutNavigationConfig>('UI_LAYOUT_NAVIGATION_CONFIG');
