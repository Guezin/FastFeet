import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  static async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  }

  static async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation is failed!' });
    }

    const { email } = req.body;
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(401).json({ error: 'Email already exists!' });
    }

    await User.create(req.body);

    return res.json({
      message: 'User created successfully!',
    });
  }

  static async upgrade(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      password: Yup.string(),
      newPassword: Yup.string()
        .min(6)
        .when('password', (password, newPassword) =>
          password ? newPassword.required() : password
        ),
      confirmPassword: Yup.string().when(
        'newPassword',
        (newPassword, confirmPassword) =>
          newPassword
            ? confirmPassword.required().oneOf([Yup.ref('newPassword')])
            : newPassword
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation is failed!' });
    }

    const { id } = req.params;
    const { email, password, newPassword } = req.body;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({ error: 'User not found!' });
    }

    if (email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(401).json({ error: 'Email already exist!' });
      }
    }

    if (password && !(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Please! Check your password.' });
    }

    if (newPassword) {
      user.password = newPassword;
    }

    await user.update();

    return res.json({
      message: 'User changed successfully!',
      user,
    });
  }

  static async delete(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({ error: 'User not found!' });
    }

    await user.destroy();

    return res.json({
      message: 'User deleted successfully!',
    });
  }
}

export default UserController;
