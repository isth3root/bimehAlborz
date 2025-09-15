import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { PolicyForm } from '../PolicyForm';
import { ViewPolicyDetails } from '../ViewPolicyDetails';
import { Trash2 } from "lucide-react";

export function PolicyManagement({
  policies,
  customers,
  handleIssuePolicy,
  handleEditPolicy,
  handleDeletePolicy,
  setSelectedPolicyId,
  setActiveTab,
  getStatusBadge,
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>مدیریت بیمه‌نامه‌ها</CardTitle>
            <CardDescription>
              لیست بیمه‌نامه‌ها و وضعیت آنها
            </CardDescription>
          </div>
          <PolicyForm customers={customers} onSave={handleIssuePolicy} />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>شماره بیمه‌نامه</TableHead>
              <TableHead>نام مشتری</TableHead>
              <TableHead>نوع بیمه</TableHead>
              <TableHead>موضوع بیمه</TableHead>
              <TableHead>تاریخ شروع</TableHead>
              <TableHead>تاریخ انقضا</TableHead>
              <TableHead>حق بیمه</TableHead>
              <TableHead>وضعیت</TableHead>
              <TableHead>عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {policies.map((policy) => (
              <TableRow key={policy.id}>
                <TableCell>{policy.id}</TableCell>
                <TableCell>{policy.customerName}</TableCell>
                <TableCell>{policy.type}</TableCell>
                <TableCell>{policy.vehicle}</TableCell>
                <TableCell>{policy.startDate}</TableCell>
                <TableCell>{policy.endDate}</TableCell>
                <TableCell>{policy.premium}</TableCell>
                <TableCell>{getStatusBadge(policy.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <PolicyForm customers={customers} policy={policy} onSave={handleEditPolicy} />
                    <ViewPolicyDetails policy={policy} />
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => handleDeletePolicy(policy.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={() => {
                      setSelectedPolicyId(policy.id);
                      setActiveTab('installments');
                    }}>
                      اقساط
                    </Button>
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
