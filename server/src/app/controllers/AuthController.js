import * as Yup from 'yup';
import User from '../models/User';

const authSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  senha: Yup.string().required(),
});

class AuthController {
  async store(req, res) {
    try {
      if (!(await authSchema.isValid(req.body))) {
        return res.status(401).json('Dados inválidos');
      }

      const user = await User.findOne({ email: req.body.email })
        .lean()
        .exec();

      if (!user) {
        return res.status(400).json('Usuário não cadastrado');
      }

      if (user.senha !== req.body.senha) {
        return res.status(400).json('Dados inválidos');
      }

      return res.json(user);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default new AuthController();
