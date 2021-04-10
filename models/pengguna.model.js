module.exports = (sequelize, Sequelize) => {
  const Pengguna = sequelize.define("penggunas", {
    namalengkap: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Pengguna;
};
