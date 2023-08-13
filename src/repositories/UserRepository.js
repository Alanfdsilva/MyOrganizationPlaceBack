const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserRepository {
  async findByEmail(email) {
    
    return await prisma.user.findUnique({ where: { email } });
  }
  async createUser(name, email, password) {
    const data = {
      name,
      email,
      password
    }
    return await prisma.user.create({
      data
    });
  }
}

module.exports = UserRepository;