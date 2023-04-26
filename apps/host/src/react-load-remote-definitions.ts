/**
 * This is a fork of https://github.com/nrwl/nx/blob/master/packages/angular/mf/mf.ts, adapted for react
 * because nx does not offer dynamic federation support for react yet.
 */

export type ResolveRemoteUrlFunction = (remoteName: string) => string | Promise<string>;

declare const __webpack_init_sharing__: (scope: 'default') => Promise<void>;
declare const __webpack_share_scopes__: { default: unknown };

let resolveRemoteUrl: ResolveRemoteUrlFunction;

let remoteUrlDefinitions: Record<string, string>;

export function setRemoteDefinitionsReact(definitions: Record<string, string>) {
  remoteUrlDefinitions = definitions;
}

const remoteModuleMap = new Map<string, unknown>();
const remoteContainerMap = new Map<string, unknown>();

export async function loadRemoteModuleReact(remoteName: string, moduleName: string) {
  const remoteModuleKey = `${remoteName}:${moduleName}`;
  if (remoteModuleMap.has(remoteModuleKey)) {
    return remoteModuleMap.get(remoteModuleKey);
  }

  const container = remoteContainerMap.has(remoteName)
    ? remoteContainerMap.get(remoteName)
    : await loadRemoteContainerReact(remoteName);

  const factory = await container.get(moduleName);
  const Module = factory();

  remoteModuleMap.set(remoteModuleKey, Module);

  return Module;
}

function loadModuleReact(url: string) {
  return import(/* webpackIgnore:true */ url);
}

let initialSharingScopeCreated = false;

async function loadRemoteContainerReact(remoteName: string) {
  if (!resolveRemoteUrl && !remoteUrlDefinitions) {
    throw new Error(
      'Call setRemoteDefinitions or setRemoteUrlResolver to allow Dynamic Federation to find the remote apps correctly.'
    );
  }

  if (!initialSharingScopeCreated) {
    initialSharingScopeCreated = true;
    await __webpack_init_sharing__('default');
  }

  const remoteUrl = remoteUrlDefinitions ? remoteUrlDefinitions[remoteName] : await resolveRemoteUrl(remoteName);

  const containerUrl = `${remoteUrl}${remoteUrl.endsWith('/') ? '' : '/'}remoteEntry.js`;

  const container = await loadModuleReact(containerUrl);
  await container.init(__webpack_share_scopes__.default);

  remoteContainerMap.set(remoteName, container);
  return container;
}
