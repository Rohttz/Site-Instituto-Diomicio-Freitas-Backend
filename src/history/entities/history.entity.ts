import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  foundationYear: string;

  @Column('simple-array')
  content: string[];

  @Column('json')
  milestones: { year: string; event: string }[];
} 