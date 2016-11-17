const Hapi = require('hapi');

function runServer(){
  const server = new Hapi.Server();

  server.connection({
    port: process.env.PORT || 8080
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      console.log('Root called');
      reply('There is nothing here. :)');
    }
  });

  server.route({
    method: 'GET',
    path: '/events',
    handler: (request, reply) => {
      reply();
    }
  });

  server.route({
    method: 'POST',
    path: '/mailto',
    handler: (request, reply) => {
      console.log('POST, with: ', request.payload);
      reply({status: 'success'});
    }
  });

  server.start((err) => {
    if(err) throw err;
    console.log('Hybridia server running at:', server.info.uri);
  });
}

runServer();