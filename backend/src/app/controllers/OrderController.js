import Order from '../models/Order';

class OrderController {
  static async store(req, res) {
    const order = await Order.create(req.body);

    return res.json(order);
  }
}

export default OrderController;
