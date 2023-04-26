import { setRemoteDefinitions } from '@nrwl/angular/mf';
import { setRemoteDefinitionsReact } from './react-load-remote-definitions';

fetch('/assets/module-federation.manifest.json')
  .then((res) => res.json())
  .then((definitions) => {
    /** Load the remote-definitions for a react-app */
    setRemoteDefinitionsReact(definitions);
    setRemoteDefinitions(definitions);
  })
  .then(() => import('./bootstrap').catch((err) => console.error(err)));
