import { DataSource } from 'typeorm';
import { Customer } from './entities/customer.entity';

export const seedAdmin = async (dataSource: DataSource) => {
  const customerRepository = dataSource.getRepository(Customer);

  const adminExists = await customerRepository.findOne({ where: { national_code: 'admin' } });
  if (!adminExists) {
    const admin = customerRepository.create({
        full_name: 'Admin',
        national_code: 'admin',
        insurance_code: '0000000000',
        phone: '0000000000',
        birth_date: '1990-01-01',
        score: 'A',
        role: 'admin',
      });
    await customerRepository.save(admin);
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
};