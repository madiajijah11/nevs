const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const NasabahMaster = sequelize.define("nasabahmasters", {
    nik: {
      type: Sequelize.STRING,
    },
    namalengkap: {
      type: Sequelize.STRING,
    },
    nohp: {
      type: Sequelize.STRING,
    },
    tmptlhr: {
      type: Sequelize.STRING,
    },
    jsklmn: {
      type: Sequelize.STRING,
    },
    alamat: {
      type: Sequelize.STRING,
    },
    agama: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    pekerjaan: {
      type: Sequelize.STRING,
    },
  });

  return NasabahMaster;
};
