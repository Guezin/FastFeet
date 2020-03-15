import JWT from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

import User from '../models/User';

export default async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(400).json('Token not provided!');
  }

  const [, token] = bearerToken.split(' ');

  try {
    const decoded = await promisify(JWT.verify)(token, authConfig.secret);
    const user = await User.findByPk(decoded.id);

    if (user.administrator === false) {
      return res.status(401).json('You are not an administrator!');
    }
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(400).json('Token invalid!');
  }
};
