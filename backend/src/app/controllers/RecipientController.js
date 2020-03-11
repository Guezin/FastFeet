import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  static async index(req, res) {
    const recipients = await Recipient.findAll();

    return res.json(recipients);
  }

  static async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      state: Yup.string().required(),
      complement: Yup.string(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json('Validation is failed!');
    }

    const recipient = req.body;

    await Recipient.create(recipient);

    return res.json(recipient);
  }
}

export default RecipientController;
