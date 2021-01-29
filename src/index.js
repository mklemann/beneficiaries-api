// TODO mudar nome do cluster

const server = require('./server');
const config = require('./configs/env.config');

server.listen(config.server.PORT, () => {
  console.log(`Rodando na porta ${config.server.PORT}`);
});
