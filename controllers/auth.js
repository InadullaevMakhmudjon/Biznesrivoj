import { sign } from 'jsonwebtoken';

export default {
  async login(req, res) {
    const token = sign({ userId: 1 }, '8777', {});
    res.status(200).json({ token });
  },
};
