import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { S3Service } from '../common/services/s3.service';
import { BlogListResponse } from '../common/interfaces';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly s3Service: S3Service,
  ) {}

  async create(createPostDto: CreatePostDto, image: Express.Multer.File): Promise<Post> {
    const imageUrl = await this.s3Service.uploadFile(image, 'posts');
    
    const post = this.postRepository.create({
      ...createPostDto,
      image: imageUrl,
    });

    return this.postRepository.save(post);
  }

  async findAll(page: number = 1, limit: number = 10, category?: string): Promise<BlogListResponse> {
    const queryBuilder = this.postRepository.createQueryBuilder('post');
    
    if (category) {
      queryBuilder.where('post.category = :category', { category });
    }

    const [posts, total] = await queryBuilder
      .orderBy('post.date', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      posts: posts.map(post => ({
        ...post,
        date: post.date.toISOString(),
      })),
      totalPages,
      currentPage: page,
    };
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async findBySlug(slug: string): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { slug } });
    if (!post) {
      throw new NotFoundException(`Post with slug ${slug} not found`);
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto, image?: Express.Multer.File): Promise<Post> {
    const post = await this.findOne(id);
    
    let imageUrl = post.image;
    if (image) {
      // Delete old image
      await this.s3Service.deleteFile(post.image);
      // Upload new image
      imageUrl = await this.s3Service.uploadFile(image, 'posts');
    }

    Object.assign(post, updatePostDto, { image: imageUrl });
    return this.postRepository.save(post);
  }

  async remove(id: string): Promise<void> {
    const post = await this.findOne(id);
    await this.s3Service.deleteFile(post.image);
    await this.postRepository.remove(post);
  }
}