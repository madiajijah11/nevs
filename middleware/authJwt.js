const jwt = require("jsonwebtoken");
const config = require("../lib/auth.config");
const db = require("../models");
const Pengguna = db.pengguna;

verifToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Tidak ada token tersedia!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Tidak resmi!",
      });
    }
    req.penggunaId = decoded.id;
    next();
  });
};

jikaAdmin = (req, res, next) => {
  Pengguna.findByPk(req.penggunaId).then((pengguna) => {
    pengguna.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nama === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Perlu Role Admin!",
      });
    });
  });
};

jikaModerator = (req, res, next) => {
  Pengguna.findByPk(req.penggunaId).then((pengguna) => {
    pengguna.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nama === "moderator") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Perlu Role Moderator!",
      });
    });
  });
};

jikaModeratorAtauAdmin = (req, res, next) => {
  Pengguna.findByPk(req.penggunaId).then((pengguna) => {
    pengguna.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nama === "moderator") {
          next();
          return;
        }
        if (roles[i].nama === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Perlu Role Moderator atau Admin!",
      });
    });
  });
};

const authJwt = {
  verifToken: verifToken,
  jikaAdmin: jikaAdmin,
  jikaModerator: jikaModerator,
  jikaModeratorAtauAdmin: jikaModeratorAtauAdmin,
};

module.exports = authJwt;
