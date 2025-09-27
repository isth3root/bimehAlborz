import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Customer } from './entities/customer.entity';
import { Policy } from './entities/policy.entity';
import { Blog } from './entities/blog.entity';
import { Installment } from './entities/installment.entity';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { PoliciesModule } from './policies/policies.module';
import { BlogsModule } from './blogs/blogs.module';
import { InstallmentsModule } from './installments/installments.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'bimeh',
      password: 'helloworld',
      database: 'bimeh_alborz',
      entities: [Customer, Policy, Blog, Installment],
      synchronize: true, // For development; disable in production
    }),
    AuthModule,
    CustomersModule,
    PoliciesModule,
    BlogsModule,
    InstallmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
