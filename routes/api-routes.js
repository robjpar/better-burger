var db = require("../models");

module.exports = function(app) {
  app.post("/api/order", function(req, res) {
    const newCustomer = {
      name: req.body.name
    };
    // Find the customer if exists, otherwise create a new one
    db.Customer.findOrCreate({
      where: newCustomer
    }).then(function([results, created]) {
      const newBurger = {
        burger_name: req.body.burger_name,
        CustomerId: results.id
      };
      db.Burger.create(newBurger).then(function(results2) {
        res.json(results2);
      });
    });
  });

  app.get("/api/burgers", function(req, res) {
    db.Burger.findAll({
      include: [db.Customer]
    }).then(function(results) {
      res.json(results);
    });
  });

  app.post("/api/burgers", function(req, res) {
    db.Burger.create(req.body).then(function(results) {
      res.json(results);
    });
  });

  app.put("/api/burgers/:id", function(req, res) {
    db.Burger.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      res.json(results);
    });
  });

  app.delete("/api/burgers/:id", function(req, res) {
    db.Burger.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      res.json(results);
    });
  });

  app.get("/api/customers", function(req, res) {
    db.Customer.findAll({
      include: [db.Burger]
    }).then(function(results) {
      res.json(results);
    });
  });

  app.post("/api/customers", function(req, res) {
    // Create a new customer if not exist, otherwise update
    db.Customer.findOrCreate({
      where: req.body
    }).then(function([results, created]) {
      res.json(results);
    });
  });
};
