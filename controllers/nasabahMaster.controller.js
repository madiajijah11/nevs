const db = require("../models");
const NasabahMaster = db.NasabahMaster;
const Op = db.Sequelize.Op;

//BUAT DAN SAVE NASABAH MASTER
exports.create = (req, res, next) => {
  //VALIDASI REQUEST
  if (!req.body.nik) {
    res.status(400).send({
      message: "NIK tidak boleh kosong",
    });
  } else if (!req.body.namalengkap) {
    res.status(400).send({
      message: "Nama tidak boleh kosong",
    });
  } else if (!req.body.nohp) {
    res.status(400).send({
      message: "Nomor HP tidak boleh kosong",
    });
  } else if (!req.body.tmptlhr) {
    res.status(400).send({
      message: "Tempat lahir tidak boleh kosong",
    });
  } else if (!req.body.jsklmn) {
    res.status(400).send({
      message: "Jenis kelamin tidak boleh kosong",
    });
  } else if (!req.body.alamat) {
    res.status(400).send({
      message: "Alamat tidak boleh kosong",
    });
  } else if (!req.body.agama) {
    res.status(400).send({
      message: "Agama tidak boleh kosong",
    });
  } else if (!req.body.status) {
    res.status(400).send({
      message: "Status tidak boleh kosong",
    });
  } else if (!req.body.pekerjaan) {
    res.status(400).send({
      message: "Pekerjaan tidak boleh kosong",
    });
    return;
  }

  //BUAT NASABAHMASTER
  const NasabahMaster = {
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
  NasabahMaster.create(nasabahmaster)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Terjadi kesalahan saat menyimpan nasabahmaster.",
      });
    });
};

//MENEMUKAN SEMUA NASABAHMASTER DARI DATABASE
exports.findAll = (req, res, next) => {
  const nik = req.query.nik;
  var condition = nik ? { nik: { [Op.like]: `%{nik}%` } } : null;

  NasabahMaster.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan saat mencari nasabahmaster",
      });
    });
};

//MENEMUKAN SALAH SATU NASABAHMASTER BERDASARKAN ID
exports.findOne = (req, res, next) => {
  const id = req.params.id;

  NasabahMaster.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Terjadi kesalahan saat mencari nasabahmaster dengan id" + id,
      });
    });
};

//EDIT NASABAHMASTER BERDASARKAN ID
exports.update = (req, res, next) => {
  const id = req.params.id;

  NasabahMaster.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Edit nasabahmaster berhasil.",
        });
      } else {
        res.send({
          message: `Tidak bisa edit nasabahmaster dengan id={id}. Mungkin nasabahmaster tidak ditemukan atau req.body kosong.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Terjadi kesalahan saat mengedit nasabahmaster dengan id" + id,
      });
    });
};

//HAPUS NASABAHMASTER BERDASARKAN ID
exports.delete = (req, res, next) => {
  const id = req.params.id;

  NasabahMaster.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Hapus nasabahmaster berhasil.",
        });
      } else {
        res.send({
          message: `Tidak bisa menghapus nasabahmaster dengan id=${id}. Mungkin nasabahmaster tidak ditemukan atau req.body kosong.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Terjadi kesalahan saat menghapus nasabahmaster dengan id" + id,
      });
    });
};

//DELETE SEMUA NASABAHMASTER
exports.deleteAll = (req, res, next) => {
  NasabahMaster.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} nasabahmaster telah berhasil dihapus.` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Terjadi kesalahan saat menghapus seluruh nasabahmaster",
      });
    });
};
