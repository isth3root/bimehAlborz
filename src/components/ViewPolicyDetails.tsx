import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface ViewPolicyDetailsProps {
  policy: any;
}

export function ViewPolicyDetails({ policy }: ViewPolicyDetailsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          مشاهده
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>جزئیات بیمه‌نامه</DialogTitle>
          <DialogDescription>
            اطلاعات کامل بیمه‌نامه
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right font-bold">نام مشتری:</p>
            <p className="col-span-3">{policy.customerName}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right font-bold">نوع بیمه:</p>
            <p className="col-span-3">{policy.type}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right font-bold">موضوع بیمه:</p>
            <p className="col-span-3">{policy.vehicle}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right font-bold">تاریخ شروع:</p>
            <p className="col-span-3">{policy.startDate}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right font-bold">تاریخ انقضا:</p>
            <p className="col-span-3">{policy.endDate}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right font-bold">حق بیمه:</p>
            <p className="col-span-3">{policy.premium}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right font-bold">وضعیت:</p>
            <p className="col-span-3">{policy.status}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
