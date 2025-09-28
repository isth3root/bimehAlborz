import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';

@Entity('policies')
export class Policy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  customer_national_code: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_national_code', referencedColumnName: 'national_code' })
  customer: Customer;

  @Column({ type: 'enum', enum: ['ثالث', 'بدنه', 'آتش‌سوزی', 'حوادث'] })
  insurance_type: 'ثالث' | 'بدنه' | 'آتش‌سوزی' | 'حوادث';

  @Column({ type: 'text' })
  details: string;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  premium: number;

  @Column({ type: 'enum', enum: ['نقدی', 'اقساطی'] })
  payment_type: 'نقدی' | 'اقساطی';

  @Column({ type: 'int', nullable: true })
  installment_count: number;

  @Column({ type: 'varchar', length: 50 })
  payment_id: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  payment_link: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pdf_path: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}