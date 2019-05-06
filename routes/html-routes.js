const db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Burger.findAll({
      order: [
        ['updatedAt', 'DESC']
      ],
      include: [db.Customer]
    }).then(function(results) {
      res.render('index', {
        allBurgers: results
      });
    });
  });
};
