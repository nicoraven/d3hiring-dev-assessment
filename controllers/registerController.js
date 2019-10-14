const services = require('../services/services');

const registerAll = (req, res) => {
  console.log(req.body);

  services.register(req.body, data => {
    if(data.error.length > 0 || data.invalidEmail.length > 0){
      res.sendStatus(400).send(data);
    } else {
      res.sendStatus(204)
    }
  })
};

module.exports = {
  registerAll
}