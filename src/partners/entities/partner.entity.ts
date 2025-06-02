import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Partner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  logo: string;
} 