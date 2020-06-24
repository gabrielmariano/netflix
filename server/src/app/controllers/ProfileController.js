import User from '../models/User';

class Profile {
  async index(req, res) {
    try {
      const user = await User.findOne({ email: req.query.email })
        .lean()
        .exec();

      if (user) {
        return res.json({ exists: true });
      }

      return res.json({ exists: false });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default new Profile();
