const BeneficiaryModel = require('../models/beneficiary.model');

class BeneficiaryRepository {
  constructor() {
    this.db = new BeneficiaryModel();
  }

  async get(skip, limit) {
    return BeneficiaryModel.find().skip(skip).limit(limit);
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      BeneficiaryModel.findById(id, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  }

  async create(body) {
    return new Promise((resolve, reject) =>
      BeneficiaryModel.create(body, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      })
    );
  }

  async update(id, body) {
    return BeneficiaryModel.findOneAndUpdate({ _id: id }, body);
  }

  async delete(id) {
    return BeneficiaryModel.findOneAndDelete({ _id: id });
  }

  async emptyCollection() {
    return BeneficiaryModel.deleteMany();
  }
}

module.exports = new BeneficiaryRepository();
