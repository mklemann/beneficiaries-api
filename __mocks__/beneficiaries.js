const faker = require('faker-br');

const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

module.exports.createBeneficiary = {
  nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
  cpf: faker.br.cpf(),
  rg: '568856496',
  dtNasc: faker.date.past(),
  type: ['Basic', 'Standard', 'Premium'][randomNumber(0, 3)],
  nrDependentes: randomNumber(0, 3),
};
