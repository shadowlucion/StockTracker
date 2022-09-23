const Sensex = require("./../models/BSESENSEX");
exports.getAllRecords = async (req, res) => {
  var query = Sensex.find();
  // Sorting by Date in descending Order
  query = query.sort("-date");

  const page = req.query.page * 1 || 1;
  const limit = 30;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);
  const data = await query;
  res.send(data);
};

exports.addNewRecord = async (req, res) => {
  const open = req.body.open;
  const close = req.body.close;
  const mongoDate = new Date();
  const data = await Sensex.create({ open, close, date: mongoDate });
  res.send(data);
};
