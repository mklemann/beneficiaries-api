const beneficiaryRepository = require('../repositories/beneficiary.repository');

class BeneficiaryService {
  async createBeneficiary(body) {
    return beneficiaryRepository.create(body);
  }

  async get(skip, limit) {
    return beneficiaryRepository.get(skip, limit);
  }

  async getById(id) {
    return beneficiaryRepository.getById(id);
  }

  async update(id, body) {
    return beneficiaryRepository.update(id, body);
  }

  async delete(id) {
    return beneficiaryRepository.delete(id);
  }
}

module.exports = new BeneficiaryService();
