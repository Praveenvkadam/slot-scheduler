const { body, query, param } = require("express-validator");

const validate = (schema)=>(req, res, next) => {
  schema.parse({
    body: req.body,
    query: req.query,
    params: req.params
  });
    next();
};

module.exports = { validate };
