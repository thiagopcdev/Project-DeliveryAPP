const { StatusCodes } = require('http-status-codes');
const Service = require('../../service');

const deleteUser = async (req, res) => {
  try {
    const { id: reqId } = req;
    const { userid } = req.headers;
    const result = await Service.deleteUser(userid, reqId);
    if (result.message) {
      return res.status(result.status).json(result.message);
    }
    return res.status(result.status).end();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

module.exports = deleteUser;
