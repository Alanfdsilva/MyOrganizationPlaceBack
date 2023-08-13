const UserRepository = require('../repositories/UserRepository.js');
const bcrypt = require('bcrypt');

const userRepository = new UserRepository();

class UserAuthUseCase {

  async login(email, password) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (passwordMatch) {
      return { success: true, message: 'User logged in' };
    } else {
      return { success: false, error: 'Unauthorized' }
    }
  }

  async create(name, email, password) {
    const hasCredentials = await userRepository.findByEmail(email);

    if (hasCredentials) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userRepository.createUser(name, email, hashedPassword);

    return
  }
}

module.exports = UserAuthUseCase;