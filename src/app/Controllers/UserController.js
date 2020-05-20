import * as Yup from 'yup';
import User from '../Models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, email, password } = req.body;

    const userExists = await User.getUserByEmail(email);

    if (userExists.length) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }

    const password_hash = await User.hashPassword(password);

    await User.create(name, email, password_hash);

    const user = await User.getUserByEmail(email);

    return res.json(user[0]);
  }

  async index(req, res) {
    const { rows } = await User.getUsers();

    return res.json(rows);
  }
}

export default new UserController();
