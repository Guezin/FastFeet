module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      product: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      canceled_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      start_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      recipient_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'recipients',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      deliveryman_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'delivery_mans',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      signature_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'recipients',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => queryInterface.dropTable('orders'),
};
