import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  full_name: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  national_code: string;

  @Column({ type: 'varchar', length: 50 })
  insurance_code: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  birth_date: string;

  @Column({ type: 'enum', enum: ['A', 'B', 'C', 'D'] })
  score: 'A' | 'B' | 'C' | 'D';

  @Column({ type: 'enum', enum: ['customer', 'admin'], default: 'customer' })
  role: 'customer' | 'admin';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}