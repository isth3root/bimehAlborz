import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { Policy } from './policy.entity';

@Entity('installments')
export class Installment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  customer_id: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ type: 'int' })
  policy_id: number;

  @ManyToOne(() => Policy)
  @JoinColumn({ name: 'policy_id' })
  policy: Policy;

  @Column({ type: 'int' })
  installment_number: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'date' })
  due_date: Date;

  @Column({ type: 'enum', enum: ['معوق', 'نزدیک انقضا', 'آینده', 'پرداخت شده'] })
  status: 'معوق' | 'نزدیک انقضا' | 'آینده' | 'پرداخت شده';

  @Column({ type: 'varchar', length: 255, nullable: true })
  pay_link: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}