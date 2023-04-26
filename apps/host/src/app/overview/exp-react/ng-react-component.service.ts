import { inject, Injectable, Injector } from '@angular/core';
import { ComponentProps, createElement, ElementType } from 'react';
import { createRoot, Root } from 'react-dom/client';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { UiNgReactContext, UiNgReactSuspenseComp } from '@ui-frontend-service/shared/ui/ng-react';
import { UI_REDUCE_QUERY_OPTIONS, UI_GRAPHQL_CLIENT_CACHE } from '@ui-frontend-service/shared/feature/graphql-client-options';
import { UiEnvironmentLoaderService } from '@ui-frontend-service/shared/feature/common-services';

@Injectable({ providedIn: 'root' })
export class NgReactComponentService {
  private _injector = inject(Injector);
  private _environmentLoader = inject(UiEnvironmentLoaderService);

  createRoot(host: HTMLElement) {
    return createRoot(host);
  }

  render<Comp extends ElementType>(root: Root, Comp: Comp, compProps?: ComponentProps<Comp>) {
    const config = this._environmentLoader.getConfigurationValue('host') as { graphQLEndpoint: string };
    root.render(
      createElement(
        UiNgReactContext,
        {
          ctx: {
            graphQLClientCache: this._injector.get(UI_GRAPHQL_CLIENT_CACHE),
            graphQLEndpoint: config.graphQLEndpoint,
            augmentedQueryOptions: this._injector.get(UI_REDUCE_QUERY_OPTIONS),
          },
        },
        createElement(UiNgReactSuspenseComp, {}, createElement(Comp, compProps))
      )
    );
  }
}
