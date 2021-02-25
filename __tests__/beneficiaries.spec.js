/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
const request = require('supertest');
const server = require('../src/server');
const beneficiariesRespository = require('../src/repositories/beneficiary.repository');

const mock = require('../__mocks__/beneficiaries');

describe('Test beneficiaries API', () => {
  let userId;

  beforeAll(async () => {
    await beneficiariesRespository.emptyCollection();
  });

  // ERRO AO BUSCAR BENEFICIARIES SEM OS PARAMETROS
  it('should return error when not sent empty params', async () => {
    const result = await request(server).get('/v1/beneficiaries');

    expect(400).toBe(result.statusCode);
  });

  // RETORNAR VAZIO CASO NÃO TENHA O QUE RETORNAR
  it('should return empty when not have beneficiaries to return', async () => {
    const result = await request(server).get('/v1/beneficiaries').query({
      skip: 0,
      limit: 10,
    });

    expect(204).toBe(result.statusCode);
    expect({}).toEqual(result.body);
  });

  // CRIAR BENEFICIARIO E RETORNAR O ID
  it('should create a beneficiarie and return id', async () => {
    const result = await request(server)
      .post('/v1/beneficiaries')
      .send(mock.createBeneficiary);

    ({ id: userId } = result.body);

    expect(201).toBe(result.statusCode);
    expect(true).toBe(result.body.hasOwnProperty('id'));
  });

  // RETORNAR TODOS OS REGISTROS
  it('should return all beneficiaries', async () => {
    const result = await request(server).get('/v1/beneficiaries').query({
      skip: 0,
      limit: 1,
    });

    expect(200).toBe(result.statusCode);
    expect(1).toEqual(result.body.length);
  });

  // ERRO AO TENTAR CRIAR E NÃO ENVIAR UM CAMPO OBRIGATÓRIO
  it('should return error when a required field not sent', async () => {
    delete mock.createBeneficiary.nome;

    const result = await request(server)
      .post('/v1/beneficiaries')
      .send(mock.createBeneficiary);

    expect(400).toBe(result.statusCode);
    expect(
      'Beneficiary validation failed: nome: Path `nome` is required.'
    ).toBe(result.body);
  });

  // BUSCAR POR UM ID INEXISTENTE
  it('should return empty when send invalid id to search user', async () => {
    const result = await request(server).get(
      `/v1/beneficiaries/603529b5d764145c8f0610e8`
    );

    expect(204).toBe(result.statusCode);
  });

  // BUSCAR POR UM ID
  it('should return beneficiary when send a valid id to search', async () => {
    const result = await request(server).get(`/v1/beneficiaries/${userId}`);

    expect(200).toBe(result.statusCode);
  });

  // ERRO AO BUSCAR POR UM ID
  it('should return error when send wrong ID', async () => {
    const result = await request(server).get(
      `/v1/beneficiaries/6037b79dba18b554367262f`
    );

    expect(400).toBe(result.statusCode);
  });

  // ATUALIZAR UM BENEFICIARIO
  it('should return right status and body whent send to update beneficiary', async () => {
    const result = await request(server)
      .put(`/v1/beneficiaries/${userId}`)
      .send({ nome: 'Teste atualização' });

    expect(200).toBe(result.statusCode);
    expect(true).toBe(result.body.hasOwnProperty('_id'));
  });

  // DELETAR BENEFICIARIO
  it('should return right status and body whent delete a beneficiary', async () => {
    const result = await request(server).delete(`/v1/beneficiaries/${userId}`);

    expect(200).toBe(result.statusCode);
    expect(true).toBe(result.body.hasOwnProperty('_id'));
  });
});
