// routes/router.js

const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

const db = require("../lib/db.js");
const userMiddleware = require("../middleware/users.js");

router.post("/daftar", userMiddleware.validasiDaftar, (req, res, next) => {
  db.query(
    `SELECT * FROM pengguna WHERE LOWER(email) = LOWER(${db.escape(
      req.body.email
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: "Email telah digunakan.",
        });
      } else {
        // email bisa digunakan
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            // hash password kemudian dimasukkan ke database
            db.query(
              `INSERT INTO pengguna (id, namalengkap, email, password, created_at) VALUES ('${uuid.v4()}', ${db.escape(
                req.body.namalengkap
              )}, ${db.escape(req.body.email)}, ${db.escape(hash)}, now())`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err,
                  });
                }
                return res.status(201).send({
                  msg: "Berhasil mendaftar!, silahkan login :).",
                });
              }
            );
          }
        });
      }
    }
  );
  console.log();
});

router.post("/masuk", (req, res, next) => {
  db.query(
    `SELECT * FROM pengguna WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      // jika email tidak ada
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Email atau password salah!",
        });
      }
      // cek password
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          // password salah
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: "Email atau password salah!",
            });
          }
          if (bResult) {
            const token = jwt.sign(
              {
                namalengkap: result[0].namalengkap,
                email: result[0].email,
                userId: result[0].id,
              },
              "hYTdW59W57wnvFm49FHPbxP5IIxZ0yfHkXHSMfr7uYX4EgfCKAd7LDR7hcFwkLcH",
              {
                expiresIn: "7d",
              }
            );
            db.query(
              `UPDATE pengguna SET last_login = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).send({
              msg: "Selamat datang!",
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            msg: "Email atau password salah!.",
          });
        }
      );
    }
  );
});

router.get("/dashboard", userMiddleware.telahMasuk, (req, res, next) => {
  console.log(req.userData);
  res.send("Anda harus login untuk melihat halaman ini!.");
});

module.exports = router;
