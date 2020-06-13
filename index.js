import { createZappPipesLibrary } from '@applicaster/zapp-pipes-dev-kit/lib/app-pipes';

import provider from './src';

const providers = [];

providers.push(provider);

class ZappPipesGetter {
  constructor() {
    this.get = createZappPipesLibrary({ providers, release: 'debug' });
  }
}

export { ZappPipesGetter };
