import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('WATER_REPORT')
export class Report {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  address!: string;

  @Column()
  description!: string;

  @Column()
  severity!: string;

  @Column()
  reporterPhone!: string;

  @Column({ default: false })
  isResolved!: boolean;

  @Column({ type: 'varchar', nullable: true})
  photoUrl!: string | null;

  @Column({type: 'varchar', nullable: true})
  repairPhotoUrl!: string | null;

  @CreateDateColumn()
  createdAt!: Date;
}