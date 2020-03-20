import Sequelize, { Model } from 'sequelize';

class Deliveryman extends Model {
  static init(connectionDB) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize: connectionDB,
      }
    );

    return this;
  }

  static associate(models) {
    return this.belongsTo(models.File, {
      foreignKey: 'avatar_id',
      as: 'avatar',
    });
  }
}

export default Deliveryman;
