import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  excerpt: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  image: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  authorImage?: string;

  @CreateDateColumn()
  date: Date;

  @Column()
  category: string;

  @Column('simple-array')
  tags: string[];
}