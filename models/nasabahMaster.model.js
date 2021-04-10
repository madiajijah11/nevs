const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const nasabahMaster = sequelize.define("nasabahmasters", {
    nik: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    namalengkap: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nohp: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tmptlhr: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    jsklmn: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    alamat: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    agama: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pekerjaan: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return nasabahMaster;
};
