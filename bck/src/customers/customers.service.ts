import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  findOne(id: number): Promise<Customer | null> {
    return this.customerRepository.findOneBy({ id });
  }

  create(customer: Partial<Customer>): Promise<Customer> {
    const newCustomer = this.customerRepository.create(customer);
    return this.customerRepository.save(newCustomer);
  }

  async update(id: number, customer: Partial<Customer>): Promise<Customer | null> {
    await this.customerRepository.update(id, customer);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }

  async getCount(): Promise<number> {
    return this.customerRepository.count();
  }

  findByNationalCode(nationalCode: string): Promise<Customer | null> {
    return this.customerRepository.findOneBy({ national_code: nationalCode });
  }

  findByName(name: string): Promise<Customer[]> {
    return this.customerRepository
      .createQueryBuilder('customer')
      .where('customer.full_name LIKE :name', { name: `%${name}%` })
      .getMany();
  }
}
