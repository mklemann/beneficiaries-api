class ResponseHandler {
  success(res, body) {
    res.json(200, body);
  }

  successOnCreate(res, body) {
    res.json(201, body);
  }

  noContent(res) {
    res.json(204, []);
  }

  error(res, body) {
    res.json(400, body);
  }
}

module.exports = new ResponseHandler();
