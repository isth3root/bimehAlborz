import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
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
  @Get('customer')
  findAllByCustomer(@Req() req): Promise<Installment[]> {
    return this.installmentsService.findAllByCustomer(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('overdue/count')
  getOverdueCount(): Promise<number> {
    return this.installmentsService.getOverdueCount();
  }

  @UseGuards(JwtAuthGuard)
  @Get('near-expiry/count')
  getNearExpiryCount(): Promise<number> {
    return this.installmentsService.getNearExpiryCount();
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