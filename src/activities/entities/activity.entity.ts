import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column()
  writer: string;

  @Column()
  writerPhotoUrl: string;

  @Column()
  writerRole: string;

  @Column()
  date: Date;

  @Column()
  readingTime: string;

  @Column()
  title: string;

  @Column({ length: 100 })
  summary: string;

  @Column({ length: 1500 })
  text: string;

  @Column('simple-array')
  tags: string[];
}