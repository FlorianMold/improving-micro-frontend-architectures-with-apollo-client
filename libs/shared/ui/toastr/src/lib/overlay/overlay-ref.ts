import { ComponentRef } from '@angular/core';
import { UiBasePortalHost, UiComponentPortal } from '../portal/portal';

/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
export class UiOverlayRef {
  constructor(private _portalHost: UiBasePortalHost) {}

  attach(portal: UiComponentPortal<any>, newestOnTop: boolean = true): ComponentRef<any> {
    return this._portalHost.attach(portal, newestOnTop);
  }

  /**
   * Detaches an overlay from a portal.
   * @returns Resolves when the overlay has been detached.
   */
  detach() {
    return this._portalHost.detach();
  }
}
