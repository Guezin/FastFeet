import User from '../models/User';

class UserController {
  static async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  }
}

export default UserController;
