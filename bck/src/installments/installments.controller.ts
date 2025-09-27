import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { InstallmentsService } from './installments.service';
import { Installment } from '../entities/installment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('installments')
export class InstallmentsController {
  constructor(private readonly installmentsService: InstallmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('admin')
  findAll(): Promise<Installment[]> {
    return this.installmentsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('overdue/count')
  getOverdueCount(): Promise<number> {
    return this.installmentsService.getOverdueCount();
  }

  @UseGuards(JwtAuthGuard)
  @Get('near-expire/count')
  getNearExpireCount(): Promise<number> {
    return this.installmentsService.getNearExpireCount();
  }

  @UseGuards(JwtAuthGuard)
  @Get('customer')
  findAllForCustomer(@Request() req): Promise<Installment[]> {
    return this.installmentsService.findAllForCustomer(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('customer/overdue/count')
  getOverdueCountForCustomer(@Request() req): Promise<number> {
    return this.installmentsService.getOverdueCountForCustomer(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('customer/near-expire/count')
  getNearExpireCountForCustomer(@Request() req): Promise<number> {
    return this.installmentsService.getNearExpireCountForCustomer(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Installment | null> {
    return this.installmentsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() installment: Partial<Installment>): Promise<Installment> {
    return this.installmentsService.create(installment);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() installment: Partial<Installment>): Promise<Installment | null> {
    return this.installmentsService.update(+id, installment);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.installmentsService.remove(+id);
  }
}