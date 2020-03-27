import * as Yup from 'yup';

import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

class DeliveryManController {
  static async index(req, res) {
    const deliveryMan = await DeliveryMan.findAll({
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'url', 'name', 'path'],
        },
      ],
    });

    return res.json(deliveryMan);
  }

  static async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation is failed!' });
    }

    const { name, email, avatar_id } = req.body;
    const deliveryManExists = await DeliveryMan.findOne({ where: { email } });

    if (deliveryManExists) {
      return res.status(401).json({ error: 'Delivery Man already exists!' });
    }

    const deliveryMan = await DeliveryMan.create({
      name,
      email,
      avatar_id,
    });

    return res.json(deliveryMan);
  }

  static async update(req, res) {
    const deliveryManExists = await DeliveryMan.findByPk(req.params.id);

    if (!deliveryManExists) {
      return res.status(400).json({ error: 'Delivery Man not found!' });
    }

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation is failed!' });
    }

    const deliveryMan = await deliveryManExists.update(req.body);

    return res.json({
      message: 'Data updated successfully!',
      deliveryMan,
    });
  }

  static async delete(req, res) {
    const deliveryManExists = await DeliveryMan.findByPk(req.params.id);

    if (!deliveryManExists) {
      return res.status(400).json({ error: 'Delivery Man not found!' });
    }

    await deliveryManExists.destroy();

    return res.json({
      message: 'Excluded delivery man!',
      deliveryManExists,
    });
  }
}

export default DeliveryManController;
