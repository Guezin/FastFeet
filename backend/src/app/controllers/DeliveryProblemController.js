import * as Yup from 'yup';
import { format } from 'date-fns';

import Mail from '../../lib/Mail';

import Order from '../models/Order';
import DeliveryProblem from '../models/DeliveryProblem';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';

class DeliveryProblemController {
  static async index(req, res) {
    const allProblemsWithDeliveries = await DeliveryProblem.findAll({
      attributes: ['id', 'description', 'delivery_id', 'created_at'],
      include: [
        {
          model: Order,
          as: 'delivery',
          attributes: ['product', 'canceled_at', 'start_date', 'end_date'],
        },
      ],
    });

    if (!allProblemsWithDeliveries) {
      return res.status(400).json({ error: 'No problems were found!' });
    }

    return res.json(allProblemsWithDeliveries);
  }

  static async show(req, res) {
    const { id } = req.params;
    const allProblemsOfDelivery = await DeliveryProblem.findAll({
      where: {
        delivery_id: id,
      },
      attributes: ['id', 'description', 'delivery_id', 'created_at'],
      include: [
        {
          model: Order,
          as: 'delivery',
          attributes: ['product', 'canceled_at', 'start_date', 'end_date'],
        },
      ],
    });

    if (!allProblemsOfDelivery) {
      return res.status(400).json({ error: 'No problems were found!' });
    }

    return res.json(allProblemsOfDelivery);
  }

  static async store(req, res) {
    const delivery_id = req.params.id;
    const { description } = req.body;

    const schema = Yup.object().shape({
      delivery_id: Yup.number()
        .integer()
        .required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid({ delivery_id, description }))) {
      return res.status(401).json({ error: 'Validation is failed!' });
    }

    const orderExists = await Order.findOne({ where: { id: delivery_id } });

    if (!orderExists) {
      return res.status(400).json({ error: 'Order not found!' });
    }

    const problem = await DeliveryProblem.create({
      description,
      delivery_id,
    });

    return res.json({
      message: 'Problem successfully registered!',
      problem,
    });
  }

  static async delete(req, res) {
    const problemDelivery = await DeliveryProblem.findByPk(req.params.id);

    if (!problemDelivery) {
      return res.status(400).json({ error: 'No problems found!' });
    }

    const delivery = await Order.findOne({
      where: {
        id: problemDelivery.delivery_id,
      },
      include: [
        {
          model: DeliveryMan,
          as: 'deliveryman',
        },
        {
          model: Recipient,
          as: 'recipient',
        },
      ],
    });

    delivery.canceled_at = new Date();

    await delivery.save();

    await Mail.sendMail({
      to: `<${delivery.deliveryman.name}> <${delivery.deliveryman.email}>`,
      subject: 'Cancelamento Entrega - FastFeet',
      template: 'cancellationDelivery',
      context: {
        deliveryman: delivery.deliveryman.name,
        id: delivery.deliveryman.id,
        product: delivery.product,
        canceled_at: format(delivery.canceled_at, 'dd/MM/yyyy HH:mm'),
        name: delivery.recipient.name,
        street: delivery.recipient.street,
        number: delivery.recipient.number,
        city: delivery.recipient.city,
        state: delivery.recipient.state,
        zip_code: delivery.recipient.zip_code,
      },
    });

    return res.json({
      message: 'Delivery canceled successfully!',
      problemDelivery,
    });
  }
}

export default DeliveryProblemController;
