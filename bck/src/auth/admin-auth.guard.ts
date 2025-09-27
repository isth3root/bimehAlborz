import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // First, try the regular JWT auth
    try {
      const canActivate = await super.canActivate(context);
      if (!canActivate) {
        return false;
      }

      const request = context.switchToHttp().getRequest();
      
      // For development, allow all authenticated users as admin
      // Remove this in production and implement proper admin check
      if (request.user) {
        console.log('User authenticated:', request.user);
        return true;
      }

      throw new UnauthorizedException();
    } catch (error) {
      console.error('AdminAuthGuard error:', error);
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}