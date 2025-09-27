import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFile, Res, UseGuards, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { PoliciesService } from './policies.service';
import { Policy } from '../entities/policy.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Multer } from 'multer';

@Controller() // Remove 'admin' from here to fix the nested routes
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('admin/policies')
  findAll(): Promise<Policy[]> {
    return this.policiesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin/policies')
  @UseInterceptors(FileInterceptor('pdf'))
  create(@Body() policy: Partial<Policy>, @UploadedFile() file: Multer.File): Promise<Policy> {
    if (file) {
      policy.pdf_path = `/uploads/policies/${policy.customer_national_code}/${file.filename}`;
    }
    return this.policiesService.create(policy);
  }

  @UseGuards(JwtAuthGuard)
  @Get('customer/policies')
  findByCustomer(@Request() req): Promise<Policy[]> {
    return this.policiesService.findByCustomerNationalCode(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/policies/:id')
  update(@Param('id') id: string, @Body() policy: Partial<Policy>): Promise<Policy | null> {
    return this.policiesService.update(+id, policy);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admin/policies/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.policiesService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/installments')
  getAllInstallments() {
    return this.policiesService.getAllInstallments();
  }

  @UseGuards(JwtAuthGuard)
  @Get('count')
  getCount(): Promise<number> {
    return this.policiesService.getCount();
  }

  @UseGuards(JwtAuthGuard)
  @Get('customer/policies/:id/download')
  async download(@Param('id') id: string, @Res() res: Response) {
    const policy = await this.policiesService.findOne(+id);
    if (policy && policy.pdf_path) {
      res.sendFile(policy.pdf_path, { root: '.' });
    } else {
      res.status(404).send('File not found');
    }
  }
}