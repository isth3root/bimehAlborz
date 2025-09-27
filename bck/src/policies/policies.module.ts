import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { PoliciesController } from './policies.controller';
import { PoliciesService } from './policies.service';
import { Policy } from '../entities/policy.entity';
import { Customer } from '../entities/customer.entity';
import { AuthModule } from '../auth/auth.module';
import { InstallmentsModule } from '../installments/installments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Policy, Customer]),
    MulterModule.register({
      dest: './uploads/policies',
    }),
    AuthModule,
    InstallmentsModule,
  ],
  controllers: [PoliciesController],
  providers: [PoliciesService]
})
export class PoliciesModule {}
