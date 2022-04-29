const { StatusCodes } = require('http-status-codes');
const { createUser, findUser, adminCreateUser } = require('../../service');
  
const createNewUser = async (req, res, _next) => {
  const { name, email, password } = req.body;

  try {
    const answer = await createUser({ name, email, password, role: 'customer' });

    if (answer.message) return res.status(StatusCodes.CONFLICT).json({ message: answer.message });
    const { remnant, token } = answer;
    return res.status(StatusCodes.CREATED).json({ ...remnant, token });
  } catch (e) {
    return console.error(e.message);
  }
};

const adminCreateNewUser = async (req, res, _next) => {
  const { id: reqId } = req;
  const { name, email, password, role } = req.body;
  
  try {
    const answer = await adminCreateUser({ name, email, password, role }, reqId);
    if (answer.message) return res.status(answer.status).json({ message: answer.message });
    return res.status(answer.status).json(answer.newUser);
  } catch (e) {
    return console.error(e.message);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('antes', id);
    const user = await findUser(id);
    console.log('depois', user);
    if (!user) return res.status(404).end();

    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

module.exports = {
  createNewUser,
  getUser,
  adminCreateNewUser,
};
