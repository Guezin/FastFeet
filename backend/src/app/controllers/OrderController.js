import * as Yup from 'yup';

import Order from '../models/Order';
import DelivaryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';

import Mail from '../../lib/Mail';

class OrderController {
  static async index(req, res) {
    const orders = await Order.findAll({
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: DelivaryMan,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(orders);
  }

  static async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number()
        .integer()
        .required(),
      deliveryman_id: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation is failed!' });
    }
    const { id, product } = await Order.create(req.body);
    const order = await Order.findOne({
      where: id,
      include: [
        {
          model: Recipient,
          as: 'recipient',
        },
        {
          model: DelivaryMan,
          as: 'deliveryman',
        },
      ],
    });

    await Mail.sendMail({
      to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
      subject: 'Entrega - FastFeet',
      template: 'createOrder',
      context: {
        deliveryman: order.deliveryman.name,
        name: order.recipient.name,
        city: order.recipient.city,
        street: order.recipient.street,
        number: order.recipient.number,
        zip_code: order.recipient.zip_code,
        state: order.recipient.state,
        product,
      },
    });
    return res.json(order);
  }

  static async update(req, res) {
    const { product, recipient_id, deliveryman_id } = req.body;
    const orderExists = await Order.findByPk(req.params.id);

    if (!orderExists) {
      return res.status(400).json({ error: 'Order not found!' });
    }

    const order = await orderExists.update({
      product,
      recipient_id,
      deliveryman_id,
    });

    return res.json({
      message: 'Order updated successfully!',
      order,
    });
  }

  static async delete(req, res) {
    const orderExists = await Order.findByPk(req.params.id);

    if (!orderExists) {
      return res.status(400).json({ error: 'Order not found!' });
    }

    await orderExists.destroy();

    return res.json({
      message: 'Order deleted successfully',
    });
  }
}

export default OrderController;
