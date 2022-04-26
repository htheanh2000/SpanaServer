const controller = require("../controllers/salon.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.post("/api/salon/", controller.createSalon)
  app.put("/api/salon/:id", controller.updateSalon)
  app.get("/api/salon/:id", controller.getById) 
  app.get("/api/salon/:id/product", controller.getAllProductById) 
};