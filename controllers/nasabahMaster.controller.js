const db = require("../models");
const nasabahMaster = db.nasabahMaster;
const Op = db.Sequelize.Op;

//BUAT DAN SAVE NASABAH MASTER
exports.create = (req, res, next) => {
  //VALIDASI REQUEST
  if (!req.body.nik) {
    res.status(400).send({
      msg: "NIK tidak boleh kosong",
    });
  } else if (!req.body.namalengkap) {
    res.status(400).send({
      msg: "Nama tidak boleh kosong",
    });
  } else if (!req.body.nohp) {
    res.status(400).send({
      msg: "Nomor HP tidak boleh kosong",
    });
  } else if (!req.body.tmptlhr) {
    res.status(400).send({
      msg: "Tempat lahir tidak boleh kosong",
    });
  } else if (!req.body.jsklmn) {
    res.status(400).send({
      msg: "Jenis kelamin tidak boleh kosong",
    });
  } else if (!req.body.alamat) {
    res.status(400).send({
      msg: "Alamat tidak boleh kosong",
    });
  } else if (!req.body.agama) {
    res.status(400).send({
      msg: "Agama tidak boleh kosong",
    });
  } else if (!req.body.status) {
    res.status(400).send({
      msg: "Status tidak boleh kosong",
    });
  } else if (!req.body.pekerjaan) {
    res.status(400).send({
      msg: "Pekerjaan tidak boleh kosong",
    });
    return;
  }

  //BUAT NASABAHMASTER
  const nasabahMaster = {
    nik: req.body.nik,
    namalengkap: req.body.namalengkap,
    nohp: req.body.nohp,
    tmptlhr: req.body.tmptlhr,
    jsklmn: req.body.jsklmn,
    alamat: req.body.alamat,
    agama: req.body.agama,
    status: req.body.status,
    pekerjaan: req.body.pekerjaan,
  };

  //SIMPAN NASABAHMASTER
  nasabahMaster
    .create(nasabahmaster)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        msg: err.msg || "Terjadi kesalahan saat menyimpan nasabahmaster.",
      });
    });
};

//MENEMUKAN SEMUA NASABAHMASTER DARI DATABASE
exports.findAll = (req, res, next) => {
  const nik = req.query.nik;
  var condition = nik ? { nik: { [Op.like]: `%{nik}%` } } : null;

  nasabahMaster
    .findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        msg: err.msg || "Terjadi kesalahan saat mencari nasabahmaster",
      });
    });
};

//MENEMUKAN SALAH SATU NASABAHMASTER BERDASARKAN ID
exports.findOne = (req, res, next) => {
  const id = req.params.id;

  nasabahMaster
    .findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        msg:
          err.msg ||
          "Terjadi kesalahan saat mencari nasabahmaster dengan id" + id,
      });
    });
};

//EDIT NASABAHMASTER BERDASARKAN ID
exports.update = (req, res, next) => {
  const id = req.params.id;

  nasabahMaster
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num === 1) {
        res.send({
          msg: "Edit nasabahmaster berhasil.",
        });
      } else {
        res.send({
          msg: `Tidak bisa edit nasabahmaster dengan id={id}. Mungkin nasabahmaster tidak ditemukan atau req.body kosong.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        msg:
          err.msg ||
          "Terjadi kesalahan saat mengedit nasabahmaster dengan id" + id,
      });
    });
};

//HAPUS NASABAHMASTER BERDASARKAN ID
exports.delete = (req, res, next) => {
  const id = req.params.id;

  nasabahMaster
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num === 1) {
        res.send({
          msg: "Hapus nasabahmaster berhasil.",
        });
      } else {
        res.send({
          msg: `Tidak bisa menghapus nasabahmaster dengan id={id}. Mungkin nasabahmaster tidak ditemukan atau req.body kosong.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        msg:
          err.msg ||
          "Terjadi kesalahan saat menghapus nasabahmaster dengan id" + id,
      });
    });
};

//DELETE SEMUA NASABAHMASTER
exports.deleteAll = (req, res, next) => {
  nasabahMaster
    .destroy({
      where: {},
      truncate: false,
    })
    .then((nums) => {
      res.send({ msg: `${nums} nasabahmaster telah berhasil dihapus.` });
    })
    .catch((err) => {
      res.status(500).send({
        msg:
          err.msg || "Terjadi kesalahan saat menghapus seluruh nasabahmaster",
      });
    });
};
