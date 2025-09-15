import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, Trash2 } from "lucide-react";
import { CustomerForm } from '../CustomerForm';

export function CustomerManagement({
  customers,
  searchQuery,
  setSearchQuery,
  handleAddCustomer,
  handleEditCustomer,
  handleDeleteCustomer,
  getStatusBadge,
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>مدیریت مشتریان</CardTitle>
            <CardDescription>
              لیست مشتریان و مدیریت اطلاعات آنها
            </CardDescription>
          </div>
          <CustomerForm onSave={handleAddCustomer} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="جستجو در مشتریان..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>نام و نام خانوادگی</TableHead>
              <TableHead>کد ملی</TableHead>
              <TableHead>شماره تماس</TableHead>
              <TableHead>تاریخ عضویت</TableHead>
              <TableHead>بیمه‌نامه‌های فعال</TableHead>
              <TableHead>وضعیت</TableHead>
              <TableHead>عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers
              .filter((customer) =>
                customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                customer.nationalCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                customer.phone.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.nationalCode}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.joinDate}</TableCell>
                <TableCell>{customer.activePolicies}</TableCell>
                <TableCell>{getStatusBadge(customer.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <CustomerForm customer={customer} onSave={handleEditCustomer} />
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteCustomer(customer.id)}>
                      <Trash2 className="h-4 w-4" />
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
