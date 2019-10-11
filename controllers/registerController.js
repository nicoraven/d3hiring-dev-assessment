const services = require('../services/services');

const registerAll = (req, res) => {
  console.log(req.body);

  services.register(req.body, data => {
    res.send(data);
  })
};

module.exports = {
  registerAll
}