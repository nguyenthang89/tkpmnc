exports.allAccess = (req, res) => {
  res.status(200).send("PUBLIC Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("USER Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("ADMIN Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("MODERATOR Content.");
};