const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    cpf: { type: String, required: true },
    rg: { type: String, required: true },
    dtNasc: { type: Date, required: true },
    type: {
      type: String,
      required: true,
      enum: ['Basic', 'Standard', 'Premium'],
    },
    nrDependentes: { type: Number, required: false },
  },
  { timestamps: { createdAt: 'created_at' } }
);

module.exports = mongoose.model('Beneficiary', beneficiarySchema);
