const db = require("../models");
const config = require("../config/auth.config");
const Pengguna = db.pengguna;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.daftar = (req, res) => {
  // Simpan pengguna ke database
  Pengguna.create({
    namalengkap: req.body.namalengkap,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((pengguna) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            nama: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          pengguna.setRoles(roles).then(() => {
            res.send({
              message: "Pendaftaran telah berhasil!",
            });
          });
        });
      } else {
        // Pengguna role = 1
        pengguna.setRoles([1]).then(() => {
          res.send({
            message: "Pendaftaran telah berhasil!",
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.masuk = (req, res) => {
  Pengguna.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((pengguna) => {
      if (!pengguna) {
        return res.status(404).send({
          message: "Pengguna tidak ditemukan",
        });
      }

      var passwordValid = bcrypt.compareSync(
        req.body.password,
        pengguna.password
      );

      if (!passwordValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Password salah!",
        });
      }

      var token = jwt.sign({ id: pengguna.id }, config.secret, {
        expiresIn: 86400, // 24 Jam
      });

      var authorities = [];
      pengguna.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].nama.toUpperCase());
        }
        res.status(200).send({
          id: pengguna.id,
          namalengkap: pengguna.namalengkap,
          username: pengguna.username,
          email: pengguna.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
