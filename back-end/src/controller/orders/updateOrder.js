const { StatusCodes } = require('http-status-codes');
const { sales } = require('../../database/models');

module.exports = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    if (!status) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'status is required' });
    await sales.update({ status }, { where: { id } });
    return res.status(StatusCodes.OK).end();
  } catch (e) {
    return console.error(e.message);
  }
};
