const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.get("/api/user/", controller.getAll)
  app.get("/api/user/:id", controller.getById)
  app.delete("/api/user/:id/", controller.deleteUser)
  app.put("/api/user/:id/", controller.updateUser)
};