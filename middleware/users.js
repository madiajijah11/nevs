// middleware/users.js

const jwt = require("jsonwebtoken");

module.exports = {
  validasiDaftar: (req, res, next) => {
    // nama lengkap
    if (!req.body.namalengkap || req.body.namalengkap.length < 1) {
      return res.status(400).send({
        msg: "Tolong ketikkan nama lengkap anda.",
      });
    }

    // email
    if (!req.body.email || req.body.email.length < 1) {
      return res.status(400).send({
        msg: "Tolong ketikkan email anda.",
      });
    }

    // password min 6 karakter
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        msg: "Tolong ketikkan password anda minimal 6 karakter.",
      });
    }

    // password (ulangi) tidak sama
    if (
      !req.body.confirm_password ||
      req.body.password != req.body.confirm_password
    ) {
      return res.status(400).send({
        msg: "Kedua password tidak sama.",
      });
    }

    next();
  },

  telahMasuk: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        "hYTdW59W57wnvFm49FHPbxP5IIxZ0yfHkXHSMfr7uYX4EgfCKAd7LDR7hcFwkLcH"
      );
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        msg: "Sesi anda tidak valid!",
      });
    }
  },
};
