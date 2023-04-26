/** Alias for MatDrawerMode, currently only support side. */
export type UiLayoutDrawerMode = 'side';

/** Options for a navigation-node. */
export interface UiLayoutNavigationNode {
  /** The title of the navigation-node. */
  title: string;
  /** The optional url of the navigation-node, leave empty, if this is grouping node. */
  url?: string | any[];
  /** Tooltip that is shown, when hovering the anchor. */
  tooltip?: string;
  /** Whether the navigation-node is shown. */
  hidden?: boolean;
  /** Children of the navigation-node, */
  children?: UiLayoutNavigationNode[];
}

/** Options for the current active node. */
export interface UiLayoutCurrentNode {
  /** Url of the current node. */
  url: string;
  /** Child-nodes of the current node. */
  nodes: UiLayoutNavigationNode[];
}

/** Object with the currently active nodes. */
export interface UiLayoutCurrentNodes {
  /** Name of the view. */
  [view: string]: UiLayoutCurrentNode;
}

export interface UiLayoutConfig {
  /** The name of the application. */
  appName?: string;
  /** Whether the side-nav is disabled. */
  disableSidenav?: boolean;
}
