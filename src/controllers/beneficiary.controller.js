const beneficiaryService = require('../service/beneficiary.service');
const responseHandler = require('../handlers/response.handler');
const validateFields = require('../helpers/fieldsValidator.helper');

class BeneficiaryController {
  async get(req, res) {
    try {
      const validate = validateFields(req.query, ['skip', 'limit']);
      if (validate.length) {
        throw new Error(
          `Os seguintes campos devem ser enviados na query string: ${validate}`
        );
      }

      const { skip, limit } = req.query;

      if (limit > 100) {
        throw new Error(`O valor de limit deve ser no máximo 100`);
      }

      const result = await beneficiaryService.get(skip, limit);

      if (!result.length) return responseHandler.noContent(res);

      return responseHandler.success(res, result);
    } catch (err) {
      return responseHandler.error(res, err.message || err);
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      const result = await beneficiaryService.getById(id);

      if (!result) return responseHandler.noContent(res);

      return responseHandler.success(res, result);
    } catch (err) {
      return responseHandler.error(res, err.message || err);
    }
  }

  async post(req, res) {
    try {
      const { body } = req;

      const { _id: id } = await beneficiaryService.createBeneficiary(body);

      return responseHandler.successOnCreate(res, { id });
    } catch (err) {
      return responseHandler.error(res, err.message || err);
    }
  }

  async update(req, res) {
    try {
      const { body } = req;
      const { id } = req.params;
      const result = await beneficiaryService.update(id, body);

      if (!result) {
        throw new Error('Beneficiary not foud!');
      }

      return responseHandler.success(res, result);
    } catch (err) {
      return responseHandler.error(res, err.message || err);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await beneficiaryService.delete(id);

      return responseHandler.success(res, result);
    } catch (err) {
      return responseHandler.error(res, err.message || err);
    }
  }
}

module.exports = new BeneficiaryController();
