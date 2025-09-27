import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AdminAuthGuard } from './admin-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // Use env in production
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, AdminAuthGuard],
  exports: [AuthService, JwtStrategy, LocalStrategy, AdminAuthGuard],
})
export class AuthModule {}
