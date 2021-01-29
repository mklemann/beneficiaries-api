module.exports = (body, requiredFileds) => {
  const unSentFields = [];
  const fieldsSent = Object.keys(body);

  // eslint-disable-next-line no-restricted-syntax
  for (const field of requiredFileds) {
    if (!fieldsSent.includes(field)) {
      unSentFields.push(field);
    }
  }

  return unSentFields;
};
