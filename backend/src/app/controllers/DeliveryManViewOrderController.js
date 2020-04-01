import { Op } from 'sequelize';

import DeliveryMan from '../models/DeliveryMan';
import Order from '../models/Order';

class DeliveryManViewOrderController {
  static async index(req, res) {
    const { delivered } = req.body;
    const deliveryman = await DeliveryMan.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery Man not found!' });
    }

    const deliveryOrder = await Order.findAll({
      where: {
        deliveryman_id: deliveryman.id,
        canceled_at: null,
        end_date: null,
      },
    });

    if (!deliveryOrder) {
      return res.status(401).json({ error: 'There are no orders!' });
    }

    if (delivered) {
      const orderDelivered = await Order.findAll({
        where: {
          end_date: {
            [Op.ne]: null,
          },
        },
      });

      return res.json(orderDelivered);
    }

    return res.json(deliveryOrder);
  }
}

export default DeliveryManViewOrderController;
