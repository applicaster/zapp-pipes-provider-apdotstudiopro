const zappPipesDevKit = require('@applicaster/zapp-pipes-dev-kit');
const provider = require('./src');

const zappPipesServer = zappPipesDevKit.createZappPipesServer({
  providers: [provider]
});

zappPipesServer.route({
  method: 'GET',
  path: '/{provider}/types',
  handler(req, reply) {
    reply(provider.manifest.handlers);
  }
});

zappPipesServer.startServer();
