import JWT from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../config/auth';

export default async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(401).json({ error: 'Token does not provided!' });
  }

  try {
    const [, token] = bearerToken.split(' ');
    await promisify(JWT.verify)(token, authConfig.secret);

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid!' });
  }
};
