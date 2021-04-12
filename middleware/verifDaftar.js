const db = require("../models");
const ROLES = db.ROLES;
const Pengguna = db.pengguna;

cekDuplikatUsernameAtauEmail = (req, res, next) => {
  //Username
  Pengguna.findOne({
    where: {
      username: req.body.username,
    },
  }).then((pengguna) => {
    if (pengguna) {
      res.status(400).send({
        message: "Gagal!, Username sudah digunakan!",
      });
      return;
    }

    //Email
    Pengguna.findOne({
      where: {
        email: req.body.email,
      },
    }).then((pengguna) => {
      if (pengguna) {
        res.status(400).send({
          message: "Gagal!, Email sudah digunakan!",
        });
        return;
      }
      next();
    });
  });
};

cekRoleTersedia = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Gagal!, Role tidak tersedia = " + req.body.roles[i],
        });
        return;
      }
    }
  }
  next();
};

const verifDaftar = {
  cekDuplikatUsernameAtauEmail: cekDuplikatUsernameAtauEmail,
  cekRoleTersedia: cekRoleTersedia,
};

module.exports = verifDaftar;
