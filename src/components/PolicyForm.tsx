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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface PolicyFormProps {
  customers: any[];
  policy?: any;
  onSave: (policy: any) => void;
}

export function PolicyForm({ customers, policy, onSave }: PolicyFormProps) {
  const [customerName, setCustomerName] = useState(policy?.customerName || '');
  const [type, setType] = useState(policy?.type || '');
  const [vehicle, setVehicle] = useState(policy?.vehicle || '');
  const [startDate, setStartDate] = useState(policy?.startDate || '');
  const [endDate, setEndDate] = useState(policy?.endDate || '');
  const [premium, setPremium] = useState(policy?.premium || '');
  const [pdfUrl, setPdfUrl] = useState(policy?.pdfUrl || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (pdfUrl && !urlRegex.test(pdfUrl)) {
      alert('Please enter a valid URL for the PDF.');
      return;
    }
    onSave({
      ...policy,
      id: policy?.id || Math.random().toString(),
      customerName,
      type,
      vehicle,
      startDate,
      endDate,
      premium,
      pdfUrl,
      status: policy?.status || 'فعال',
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {policy ? (
          <Button size="sm" variant="outline">
            <Edit className="h-4 w-4" />
          </Button>
        ) : (
          <Button>
            <Plus className="h-4 w-4 ml-2" />
            صدور بیمه‌نامه
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{policy ? 'ویرایش بیمه‌نامه' : 'صدور بیمه‌نامه جدید'}</DialogTitle>
          <DialogDescription>
            {policy ? 'اطلاعات بیمه‌نامه را ویرایش کنید' : 'اطلاعات بیمه‌نامه جدید را وارد کنید'}
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
              <Label htmlFor="pdfUrl" className="text-right">
                لینک PDF
              </Label>
              <Input
                id="pdfUrl"
                type="text"
                placeholder="https://example.com/policy.pdf"
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">{policy ? 'ذخیره' : 'صدور'}</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
