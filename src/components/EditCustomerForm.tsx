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
import { Edit } from 'lucide-react';

interface EditCustomerFormProps {
  customer: any;
  onEditCustomer: (customer: any) => void;
}

export function EditCustomerForm({ customer, onEditCustomer }: EditCustomerFormProps) {
  const [name, setName] = useState(customer.name);
  const [nationalCode, setNationalCode] = useState(customer.nationalCode);
  const [phone, setPhone] = useState(customer.phone);
  const [email, setEmail] = useState(customer.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEditCustomer({
      ...customer,
      name,
      nationalCode,
      phone,
      email,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ویرایش اطلاعات مشتری</DialogTitle>
          <DialogDescription>
            اطلاعات مشتری را ویرایش کنید
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
              <Button type="submit">ذخیره</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
