import * as Yup from 'yup';
import User from '../models/User';

const ProfileSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
});

class Profile {
  async store(req, res) {
    try {
      if (!(await ProfileSchema.isValid(req.body))) {
        return res.status(400).json('Dados inválidos');
      }

      const user = await User.findOne({ email: req.params.email });

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
