import { Injectable, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UiLayoutTemplateService {
  private _topRightMenuTmp$ = new Subject<TemplateRef<unknown>>();

  /**
   * Register a top-right menu inside the header.
   *
   * @param template The template to register
   */
  registerTopRightMenu(template?: TemplateRef<unknown>): void {
    if (template) {
      this._topRightMenuTmp$.next(template);
    }
  }

  get topRightMenuTmp$(): Observable<TemplateRef<unknown>> {
    return this._topRightMenuTmp$.asObservable();
  }
}
