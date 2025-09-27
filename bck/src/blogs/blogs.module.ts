import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { Blog } from '../entities/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog]),
    MulterModule.register({
      dest: './uploads/blogs',
    }),
  ],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule {}
