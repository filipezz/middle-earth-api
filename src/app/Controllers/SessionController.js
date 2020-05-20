import jwt from 'jsonwebtoken';

import * as Yup from 'yup';
import authConfig from '../../config/auth';

import User from '../Models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
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
    const { email, password } = req.body;

    const user = await User.getUserByEmail(email);
    if (user.length === 0) {
      return res.status(400).json({ error: 'Usuário não foi encontrado.' });
    }

    const { id, name, password_hash } = user[0];

    if (!(await User.checkPassword(password, password_hash))) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
