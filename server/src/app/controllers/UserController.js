import * as Yup from 'yup';
import User from '../models/User';

const userSchema = Yup.object().shape({
  usuario: Yup.string()
    .required()
    .max(50),
  senha: Yup.string().required(10),
  email: Yup.string()
    .email()
    .required(50),
});

class UserControler {
  async store(req, res) {
    try {
      if (!(await userSchema.isValid(req.body))) {
        return res
          .status(401)
          .json({ error: 'Erro ao validar as informações' });
      }

      const user = await User.findOne({ email: req.body.email })
        .lean()
        .exec();

      if (user) {
        return res
          .status(400)
          .json({ error: 'Esse e-mail já está cadastrado' });
      }

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async list(req, res) {
    try {
      return await User.findAll({})
        .limit(10)
        .lean()
        .exec();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async index(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });

      if (!user) {
        return res.json(400).json({ error: 'Usuário não encontrado' });
      }

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const userExists = await User.findOne({ _id: req.params.id });

      if (!userExists) {
        return res.json(400).json({ error: 'Usuário não encontrado' });
      }

      const user = await userExists.update(req.body);

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const userExists = await User.findOne({ _id: req.params.id });

      if (!userExists) {
        return res.json(400).json({ error: 'Usuário não encontrado' });
      }

      await userExists.destroy(req.params.id);

      return res.json('Usuário deletado com sucesso');
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new UserControler();
