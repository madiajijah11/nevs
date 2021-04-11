module.exports = (sequelize, Sequelize) => {
  const Pengguna = sequelize.define("penggunas", {
    namalengkap: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });

  return Pengguna;
};
