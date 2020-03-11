import Sequelize from 'sequelize';

import configDatabase from '../config/database';

import User from '../app/models/User';

function connectionDB() {
  const models = [User];
  const connection = new Sequelize(configDatabase);

  return models.map(user => user.init(connection));
}

export default connectionDB();
