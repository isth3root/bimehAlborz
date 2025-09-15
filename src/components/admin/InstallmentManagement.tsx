import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { InstallmentForm } from '../InstallmentForm';
import { Trash2 } from 'lucide-react';

export function InstallmentManagement({
  installments,
  selectedPolicyId,
  policies,
  handleAddInstallment,
  handleEditInstallment,
  handleDeleteInstallment,
  handleMarkAsPaid,
  getStatusBadge,
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>مدیریت اقساط</CardTitle>
            <CardDescription>
              پیگیری اقساط و معوقات
            </CardDescription>
          </div>
          {selectedPolicyId && (
            <InstallmentForm
              policy={policies.find((p) => p.id === selectedPolicyId)}
              onSave={handleAddInstallment}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>نام مشتری</TableHead>
              <TableHead>نوع بیمه</TableHead>
              <TableHead>مبلغ قسط</TableHead>
              <TableHead>سررسید</TableHead>
              <TableHead>تعداد روز تاخیر</TableHead>
              <TableHead>وضعیت</TableHead>
              <TableHead>عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {installments
              .filter((installment) => selectedPolicyId ? installment.policyId === selectedPolicyId : true)
              .map((installment) => (
              <TableRow key={installment.id}>
                <TableCell>{installment.customerName}</TableCell>
                <TableCell>{installment.policyType}</TableCell>
                <TableCell>{installment.amount}</TableCell>
                <TableCell>{installment.dueDate}</TableCell>
                <TableCell>
                  {installment.daysOverdue > 0 ? (
                    <span className="text-red-600">{installment.daysOverdue} روز</span>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(installment.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <InstallmentForm installment={installment} onSave={handleEditInstallment} />
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteInstallment(installment.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    {installment.status !== 'پرداخت شده' && (
                      <Button size="sm" onClick={() => handleMarkAsPaid(installment.id)}>
                        پرداخت شد
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
