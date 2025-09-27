import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstallmentsController } from './installments.controller';
import { InstallmentsService } from './installments.service';
import { Installment } from '../entities/installment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Installment])],
  controllers: [InstallmentsController],
  providers: [InstallmentsService],
  exports: [InstallmentsService]
})
export class InstallmentsModule {}
