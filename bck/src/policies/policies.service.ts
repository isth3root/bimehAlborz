import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from '../entities/policy.entity';
import { InstallmentsService } from '../installments/installments.service';

@Injectable()
export class PoliciesService {
  constructor(
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
    private installmentsService: InstallmentsService,
  ) {}

  findAll(): Promise<Policy[]> {
    return this.policyRepository.find({ relations: ['customer'] });
  }

  findOne(id: number): Promise<Policy | null> {
    return this.policyRepository.findOne({ where: { id }, relations: ['customer'] });
  }

  findByCustomerNationalCode(nationalCode: string): Promise<Policy[]> {
    return this.policyRepository.find({ where: { customer_national_code: nationalCode }, relations: ['customer'] });
  }

  async create(policy: Partial<Policy>): Promise<Policy> {
    const newPolicy = this.policyRepository.create({
      ...policy,
      customer_national_code: policy.customer_national_code,
      premium: +(policy.premium || 0),
      installment_count: +(policy.installment_count || 0),
    });
    const savedPolicy = await this.policyRepository.save(newPolicy);

    // Fetch the saved policy with relations
    const policyWithRelations = await this.findOne(savedPolicy.id);
    if (!policyWithRelations) {
      throw new Error('Failed to retrieve saved policy');
    }

    // Create installments if payment type is اقساطی
    if (policy.payment_type === 'اقساطی' && policy.installment_count && policy.installment_count > 0) {
      const installmentAmount = policyWithRelations.premium / policy.installment_count;
      const startDate = policyWithRelations.start_date ? new Date(policyWithRelations.start_date) : new Date();

      for (let i = 1; i <= policy.installment_count; i++) {
        const dueDate = new Date(startDate);
        dueDate.setMonth(startDate.getMonth() + i - 1);

        const now = new Date();
        let status = 'آینده';
        if (dueDate < now) {
            status = 'معوق';
        }

        await this.installmentsService.create({
          customer_id: policyWithRelations.customer.id,
          policy_id: policyWithRelations.id,
          installment_number: i,
          amount: installmentAmount,
          due_date: dueDate,
          status: status,
          pay_link: policyWithRelations.pay_link, // Pass the pay_link from the policy
        });
      }
    }

    return policyWithRelations;
  }

  async update(id: number, policy: Partial<Policy>): Promise<Policy | null> {
    await this.policyRepository.update(id, policy);

    // If the pay_link was part of the update, propagate it to all installments
    if (policy.pay_link !== undefined) {
      const installments = await this.installmentsService.findByPolicyId(id);
      for (const installment of installments) {
        await this.installmentsService.update(installment.id, { pay_link: policy.pay_link });
      }
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    // First delete all associated installments
    await this.installmentsService.removeByPolicyId(id);
    // Then delete the policy
    await this.policyRepository.delete(id);
  }

  async getCount(): Promise<number> {
    return this.policyRepository.count();
  }

  async getAllInstallments() {
    const policies = await this.findAll();
    const allInstallments: any[] = [];
    const now = new Date();
    for (const policy of policies) {
      if (policy.payment_type === 'اقساطی' && policy.installment_count > 0) {
        const installmentAmount = policy.premium / policy.installment_count;
        const startDate = policy.start_date ? new Date(policy.start_date) : new Date();
        for (let i = 1; i <= policy.installment_count; i++) {
          const dueDate = new Date(startDate);
          dueDate.setMonth(startDate.getMonth() + i - 1);
          let status = 'آینده';
          if (dueDate < now) {
            status = 'معوق';
          } else if ((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30) <= 1) {
            status = 'نزدیک انقضا';
          }
          allInstallments.push({
            id: `${policy.id}-${i}`,
            customerName: policy.customer ? policy.customer.full_name : 'Unknown',
            customerNationalCode: policy.customer ? policy.customer.national_code : '',
            policyType: policy.insurance_type,
            amount: installmentAmount.toString(),
            dueDate: dueDate.toISOString().split('T')[0], // YYYY-MM-DD
            status,
            policyId: policy.id,
            installmentNumber: i,
          });
        }
      }
    }
    return allInstallments;
  }
}
