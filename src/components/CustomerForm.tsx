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

interface CustomerFormProps {
  customer?: any;
  onSave: (customer: any) => void;
}

export function CustomerForm({ customer, onSave }: CustomerFormProps) {
  const [name, setName] = useState(customer?.name || '');
  const [nationalCode, setNationalCode] = useState(customer?.nationalCode || '');
  const [phone, setPhone] = useState(customer?.phone || '');
  const [email, setEmail] = useState(customer?.email || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...customer,
      id: customer?.id || Math.random().toString(),
      name,
      nationalCode,
      phone,
      email,
      joinDate: customer?.joinDate || new Date().toLocaleDateString('fa-IR'),
      activePolicies: customer?.activePolicies || 0,
      status: customer?.status || 'فعال',
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {customer ? (
          <Button size="sm" variant="outline">
            <Edit className="h-4 w-4" />
          </Button>
        ) : (
          <Button>
            <Plus className="h-4 w-4 ml-2" />
            افزودن مشتری
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{customer ? 'ویرایش اطلاعات مشتری' : 'افزودن مشتری جدید'}</DialogTitle>
          <DialogDescription>
            {customer ? 'اطلاعات مشتری را ویرایش کنید' : 'اطلاعات مشتری جدید را وارد کنید'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                نام
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nationalCode" className="text-right">
                کد ملی
              </Label>
              <Input
                id="nationalCode"
                value={nationalCode}
                onChange={(e) => setNationalCode(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                شماره تماس
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                ایمیل
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">{customer ? 'ذخیره' : 'افزودن'}</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
