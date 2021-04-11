const { authJwt } = require("../middleware");
const controller = require("../controllers/pengguna.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/publik/semua", controller.semuaAkses);

  app.get(
    "/api/publik/pengguna",
    [authJwt.verifToken],
    controller.papanPengguna
  );

  app.get(
    "/api/publik/moderator",
    [authJwt.verifToken, authJwt.jikaModerator],
    controller.papanModerator
  );

  app.get(
    "/api/publik/admin",
    [authJwt.verifToken, authJwt.jikaAdmin],
    controller.papanAdmin
  );
};
