import Sequelize from 'sequelize';

import configDatabase from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';

function connectionDB() {
  const models = [User, Recipient, File];
  const connection = new Sequelize(configDatabase);

  return models.map(user => user.init(connection));
}

export default connectionDB();
