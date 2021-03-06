import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(connectionDB) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        complement: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        zip_code: Sequelize.STRING,
      },
      {
        sequelize: connectionDB,
      }
    );

    return this;
  }
}

export default Recipient;
