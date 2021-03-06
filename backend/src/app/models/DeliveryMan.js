import Sequelize, { Model } from 'sequelize';

class DeliveryMan extends Model {
  static init(connectionDB) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        avatar_id: Sequelize.INTEGER,
      },
      {
        sequelize: connectionDB,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'avatar_id',
      as: 'avatar',
    });
  }
}

export default DeliveryMan;
