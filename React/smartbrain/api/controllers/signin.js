const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const redis = require('redis');
require('dotenv').config();

//Setup Redis
const redisClient = redis.createClient(process.env.REDIS_URI);

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;

  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(400).json('Unauthorized');
    }
    return res.json({ id: reply });
  });
}

const signToken = id => {
  const jwtPayload = { sub: id };
  return jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, { expiresIn: '2 days' });
}

const setToken = async (token, id) => {
  return await redisClient.set(token, id);
}

const createSession = async user => {
  const { id } = user;
  const token = signToken(id);

  try {
    const result = setToken(token, id);
    if (!result) {
      return { error: 'An error has occured when signing in - Please contact your admin' };
    }
    return { success: true, userId: id, token };
  }
  catch (e) {
    return { error: 'An error has occured when signing in - Please contact your admin' };
  }
}

const handleSignin = async (db, req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({ error: "Invalid auth credentials" });
  }

  try {
    const users = await db.select('*').from('users').where('email', '=', email);
    const isValid = bcrypt.compareSync(password, users[0].password);

    if (!isValid) {
      return res.status(404).json({ error: "Invalid auth credentials" });
    }

    const result = await createSession(users[0]);

    return res.status(200).json(result);
  }
  catch (e) {
    return res.status(404).json({ error: "Invalid auth credentials" });
  }
}

const signinAuthentication = (db, req, res) => {
  handleSignin(db, req, res);
}

module.exports = {
  signinAuthentication,
  redisClient
}