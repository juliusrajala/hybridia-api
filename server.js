const Hapi = require('hapi');
const cannon = require('./src/mailcannon');

function runServer(){
  const server = new Hapi.Server();

  server.connection({
    routes: {
      cors: true
    },
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
      Promise.resolve(
        cannon(request.payload)
      ).then(response => {
        console.log(response)
        reply({status: response});
      });
    }
  });

  server.start((err) => {
    if(err) throw err;
    console.log('Hybridia server running at:', server.info.uri);
  });
}

runServer();