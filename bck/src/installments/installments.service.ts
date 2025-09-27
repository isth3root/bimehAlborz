import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Installment } from '../entities/installment.entity';

@Injectable()
export class InstallmentsService {
  constructor(
    @InjectRepository(Installment)
    private installmentRepository: Repository<Installment>,
  ) {}

  findAll(): Promise<Installment[]> {
    return this.installmentRepository.find({ relations: ['customer', 'policy'] });
  }

  findOne(id: number): Promise<Installment | null> {
    return this.installmentRepository.findOne({ where: { id }, relations: ['customer', 'policy'] });
  }

  create(installment: Partial<Installment>): Promise<Installment> {
    const newInstallment = this.installmentRepository.create(installment);
    return this.installmentRepository.save(newInstallment);
  }

  async update(id: number, installment: Partial<Installment>): Promise<Installment | null> {
    await this.installmentRepository.update(id, installment);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.installmentRepository.delete(id);
  }

  async removeByPolicyId(policyId: number): Promise<void> {
    await this.installmentRepository.delete({ policy_id: policyId });
  }

  async getOverdueCount(): Promise<number> {
    const now = new Date();
    const count = await this.installmentRepository.count({
      where: {
        status: 'معوق',
        due_date: LessThan(now),
      },
    });
    return count;
  }
}
