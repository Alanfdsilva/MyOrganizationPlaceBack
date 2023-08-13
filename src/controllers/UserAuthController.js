const UserAuthUseCase = require('../usecases/UserAuthUseCase');

const userAuthUseCase = new UserAuthUseCase();

class UserAuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email or password is missing' });
      }

      const result = await userAuthUseCase.login(email, password);

      if(result.success) {
        return res.status(200).json({ status: true, message: result.message });
      } else {
        return res.status(401).json({ status: false, error: result.error });
      }

    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: 'Failed to authenticate user' });
    }
  }

  async create(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ error: 'Missing user infos' });
      }

      await userAuthUseCase.create(name, email, password);

      return res.status(201).json({ message: 'User created' });

    } catch (error) {
      console.log(error.message);
      if (error.message === 'User already exists') {
        return res.status(409).json({ error: 'User already exists' });
      }
      return res.status(500).json({ error: 'Failed to create user' });
    }
    
  }
}

module.exports = UserAuthController;