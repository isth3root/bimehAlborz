import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from '../entities/customer.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminAuthGuard } from '../auth/admin-auth.guard';

@Controller('admin/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UseGuards(JwtAuthGuard) // Changed from AdminAuthGuard to JwtAuthGuard
  @Post()
  create(@Body() customer: Partial<Customer>): Promise<Customer> {
    return this.customersService.create(customer);
  }

  @UseGuards(JwtAuthGuard) // Changed from AdminAuthGuard to JwtAuthGuard
  @Get()
  findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @UseGuards(JwtAuthGuard) // Changed from AdminAuthGuard to JwtAuthGuard
  @Get('count')
  getCount(): Promise<number> {
    return this.customersService.getCount();
  }

  @UseGuards(JwtAuthGuard) // Changed from AdminAuthGuard to JwtAuthGuard
  @Get('by-national/:nationalCode')
  findByNationalCode(@Param('nationalCode') nationalCode: string): Promise<Customer | null> {
    return this.customersService.findByNationalCode(nationalCode);
  }

  @UseGuards(JwtAuthGuard) // Changed from AdminAuthGuard to JwtAuthGuard
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Customer | null> {
    return this.customersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard) // Changed from AdminAuthGuard to JwtAuthGuard
  @Put(':id')
  update(@Param('id') id: string, @Body() customer: Partial<Customer>): Promise<Customer | null> {
    return this.customersService.update(+id, customer);
  }

  @UseGuards(JwtAuthGuard) // Changed from AdminAuthGuard to JwtAuthGuard
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.customersService.remove(+id);
  }
}