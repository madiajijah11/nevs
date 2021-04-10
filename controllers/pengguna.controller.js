exports.semuaAkses = (req, res) => {
  res.status(200).send("Konten Publik.");
};

exports.papanPengguna = (req, res) => {
  res.status(200).send("Konten Pengguna.");
};

exports.papanAdmin = (req, res) => {
  res.status(200).send("Konten Admin.");
};

exports.papanModerator = (req, res) => {
  res.status(200).send("Konten Moderator.");
};
