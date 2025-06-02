import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  subject: string;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn()
  createdAt: Date;
} 