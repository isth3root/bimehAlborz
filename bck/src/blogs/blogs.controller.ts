import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BlogsService } from './blogs.service';
import { Blog } from '../entities/blog.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Multer } from 'multer';

@Controller()
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get('blogs')
  findAll(): Promise<Blog[]> {
    return this.blogsService.findAll();
  }

  @Get('blogs/:id')
  findOne(@Param('id') id: string): Promise<Blog | null> {
    return this.blogsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin/blogs')
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() blog: Partial<Blog>, @UploadedFile() file: Multer.File): Promise<Blog> {
    if (file) {
      blog.image_path = `/uploads/blogs/${blog.id}/${file.filename}`;
    }
    return this.blogsService.create(blog);
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/blogs/:id')
  update(@Param('id') id: string, @Body() blog: Partial<Blog>): Promise<Blog | null> {
    return this.blogsService.update(+id, blog);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admin/blogs/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.blogsService.remove(+id);
  }
}
