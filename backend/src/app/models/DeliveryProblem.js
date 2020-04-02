import Sequelize, { Model } from 'sequelize';

class DeliveryProblem extends Model {
  static init(connectionDB) {
    super.init(
      {
        description: Sequelize.STRING,
        delivery_id: Sequelize.INTEGER,
      },
      {
        sequelize: connectionDB,
      }
    );
    return this;
  }

  static associate(models) {
    return this.belongsTo(models.Order, {
      foreignKey: 'delivery_id',
      as: 'delivery',
    });
  }
}

export default DeliveryProblem;
