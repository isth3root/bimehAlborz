import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private jwtService: JwtService,
  ) {}

  async validateCustomer(username: string, password: string): Promise<any> {
    const customer = await this.customerRepository.findOne({
      where: [
        { national_code: username },
        { phone: username },
      ],
    });
    if (customer && customer.phone === password) {
      const { phone, ...result } = customer;
      return result;
    }
    return null;
  }

  async login(customer: any) {
    const payload = { username: customer.national_code, sub: customer.id, role: customer.role };
    return {
      access_token: this.jwtService.sign(payload),
      userId: customer.id,
      username: customer.national_code,
      role: customer.role,
    };
  }
}
