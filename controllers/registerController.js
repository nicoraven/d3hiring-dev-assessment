const services = require('../services/services');

const registerAll = (req, res) => {
  console.log(req.body);

  services.register(req.body, data => {
    if(typeof data === 'string'){
      res.sendStatus(204)
    } else {
      res.status(400).send(data);
    }
  })
};

module.exports = {
  registerAll
}