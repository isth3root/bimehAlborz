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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface EditPolicyFormProps {
  customers: any[];
  policy: any;
  onEditPolicy: (policy: any) => void;
}

export function EditPolicyForm({ customers, policy, onEditPolicy }: EditPolicyFormProps) {
  const [customerName, setCustomerName] = useState(policy.customerName);
  const [type, setType] = useState(policy.type);
  const [vehicle, setVehicle] = useState(policy.vehicle);
  const [startDate, setStartDate] = useState(policy.startDate);
  const [endDate, setEndDate] = useState(policy.endDate);
  const [premium, setPremium] = useState(policy.premium);
  const [pdfFile, setPdfFile] = useState<File | null>(policy.pdfFile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEditPolicy({
      ...policy,
      customerName,
      type,
      vehicle,
      startDate,
      endDate,
      premium,
      pdfFile,
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
          <DialogTitle>ویرایش بیمه‌نامه</DialogTitle>
          <DialogDescription>
            اطلاعات بیمه‌نامه را ویرایش کنید
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerName" className="text-right">
                نام مشتری
              </Label>
              <Select onValueChange={setCustomerName} defaultValue={customerName}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.name}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                نوع بیمه
              </Label>
              <Input
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vehicle" className="text-right">
                موضوع بیمه
              </Label>
              <Input
                id="vehicle"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                تاریخ شروع
              </Label>
              <Input
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                تاریخ انقضا
              </Label>
              <Input
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="premium" className="text-right">
                حق بیمه
              </Label>
              <Input
                id="premium"
                value={premium}
                onChange={(e) => setPremium(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pdfFile" className="text-right">
                فایل PDF
              </Label>
              {/* TODO: Implement proper file upload functionality */}
              <Input
                id="pdfFile"
                type="file"
                onChange={(e) => setPdfFile(e.target.files ? e.target.files[0] : null)}
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
