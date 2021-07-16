import dotenv from 'dotenv';
import User from '../models/user';
import userRepository from '../repositories/user.repository';

dotenv.config({});

async function populateTable() {
  await userRepository.add(
    new User(
      'momo',
      'momo',
      'Employee',
      'momo@gmail.com',
    ),
  );

  await userRepository.add(
    new User(
      'bobo',
      'bobo',
      'Supervisor',
      'bobo@gmail.com',
    ),
  );
  await userRepository.add(
    new User(
      'mimi',
      'mimi',
      'Manager',
      'mimi@gmail.com',
    ),
  );

  await userRepository.add(
    new User(
      'hono',
      'hono',
      'Benco',
      'hono@gmail.com',
    ),
  );
}

(async () => {
  try {
    await populateTable();
  } catch(error) {
    console.log('Failed to populate table: ', error);
  }
})();
