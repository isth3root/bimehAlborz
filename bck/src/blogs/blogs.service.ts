import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '../entities/blog.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  findAll(): Promise<Blog[]> {
    return this.blogRepository.find();
  }

  findOne(id: number): Promise<Blog | null> {
    return this.blogRepository.findOneBy({ id });
  }

  create(blog: Partial<Blog>): Promise<Blog> {
    const newBlog = this.blogRepository.create(blog);
    return this.blogRepository.save(newBlog);
  }

  async update(id: number, blog: Partial<Blog>): Promise<Blog | null> {
    await this.blogRepository.update(id, blog);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.blogRepository.delete(id);
  }
}
