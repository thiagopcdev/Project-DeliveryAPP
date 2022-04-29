const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
const path = require('path');

const filePath = path.resolve('jwt.evaluation.key');

const getSecret = async (pathFile) => {
  try {
    const secret = await fs.readFile(pathFile, 'utf-8');
    return secret.trim();
  } catch (e) {
    console.error(e.message);
  }
};

const config = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const generateToken = async (user) => {
  const secret = await getSecret(filePath);
  return jwt.sign({ data: user }, secret, config);
};

const checkToken = async (token) => {
  try {
    const secret = await getSecret(filePath);
    const { data } = jwt.verify(token, secret);
    return data;
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = { generateToken, checkToken };
