import Sequelize from 'sequelize';

import configDatabase from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import DeliveryMan from '../app/models/DeliveryMan';

function connectionDB() {
  const models = [User, Recipient, File, DeliveryMan];
  const connection = new Sequelize(configDatabase);

  return models
    .map(user => user.init(connection))
    .map(model => model.associate && model.associate(connection.models));
}

export default connectionDB();
