import { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Plus, Edit } from 'lucide-react';

interface InstallmentFormProps {
  installment?: any;
  policy?: any;
  onSave: (installment: any) => void;
}

export function InstallmentForm({ installment, policy, onSave }: InstallmentFormProps) {
  const [amount, setAmount] = useState(installment?.amount || '');
  const [dueDate, setDueDate] = useState(installment?.dueDate || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...installment,
      id: installment?.id || Math.random().toString(),
      policyId: installment?.policyId || policy.id,
      customerName: installment?.customerName || policy.customerName,
      policyType: installment?.policyType || policy.type,
      amount,
      dueDate,
      status: installment?.status || 'آینده',
      daysOverdue: installment?.daysOverdue || 0,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {installment ? (
          <Button size="sm" variant="outline">
            <Edit className="h-4 w-4" />
          </Button>
        ) : (
          <Button>
            <Plus className="h-4 w-4 ml-2" />
            افزودن قسط
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{installment ? 'ویرایش قسط' : 'افزودن قسط جدید'}</DialogTitle>
          <DialogDescription>
            {installment ? 'اطلاعات قسط را ویرایش کنید' : 'اطلاعات قسط جدید را وارد کنید'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                مبلغ
              </Label>
              <Input
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                سررسید
              </Label>
              <Input
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">{installment ? 'ذخیره' : 'افزودن'}</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
