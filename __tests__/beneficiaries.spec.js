/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
const request = require('supertest');
const server = require('../src/server');
const beneficiariesRespository = require('../src/repositories/beneficiary.repository');

describe('Test beneficiaries API', () => {
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
    const result = await request(server).post('/v1/beneficiaries').send({
      nome: 'Matheus3',
      cpf: '45112558510',
      rg: '568945493',
      dtNasc: '1996-01-23',
      type: 'Basic',
      nrDependentes: '1',
    });

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
    const result = await request(server).post('/v1/beneficiaries').send({
      nom: 'Matheus3',
      cpf: '45112558510',
      rg: '568945493',
      dtNasc: '1996-01-23',
      type: 'Basic',
      nrDependentes: '1',
    });

    expect(400).toBe(result.statusCode);
    expect(
      'Beneficiary validation failed: nome: Path `nome` is required.'
    ).toBe(result.body);
  });

  // ERRO AO TENTAR BUSCAR USUARIO PELO ID
  it('should return error when a required field not sent', async () => {
    const result = await request(server).put('/v1/beneficiaries/:id').send({
      nom: 'Matheus3',
      cpf: '45112558510',
      rg: '568945493',
      dtNasc: '1996-01-23',
      type: 'Basic',
      nrDependentes: '1',
    });

    expect(400).toBe(result.statusCode);
    expect(
      'Beneficiary validation failed: nome: Path `nome` is required.'
    ).toBe(result.body);
  });
});
