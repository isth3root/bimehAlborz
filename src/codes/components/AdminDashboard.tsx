import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { 
  Users, 
  FileText, 
  CreditCard, 
  TrendingUp,
  Search,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Settings,
  DollarSign,
  Calendar
} from "lucide-react";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const customers = [
    {
      id: '1',
      name: 'احمد محمدی',
      nationalCode: '1234567890',
      phone: '09123456789',
      email: 'ahmad@example.com',
      joinDate: '۱۴۰۳/۰۴/۱۵',
      activePolicies: 3,
      status: 'فعال'
    },
    {
      id: '2',
      name: 'فاطمه احمدی',
      nationalCode: '0987654321',
      phone: '09187654321',
      email: 'fateme@example.com',
      joinDate: '۱۴۰۳/۰۳/۱۰',
      activePolicies: 1,
      status: 'فعال'
    },
    {
      id: '3',
      name: 'علی رضایی',
      nationalCode: '5555555555',
      phone: '09155555555',
      email: 'ali@example.com',
      joinDate: '۱۴۰۳/۰۲/۰۵',
      activePolicies: 2,
      status: 'غیرفعال'
    }
  ];

  const policies = [
    {
      id: '12345',
      customerName: 'احمد محمدی',
      type: 'شخص ثالث',
      vehicle: 'پژو ۴۰۵',
      startDate: '۱۴۰۳/۰۶/۰۱',
      endDate: '۱۴۰۴/۰۶/۰۱',
      premium: '۵,۰۰۰,۰۰۰',
      status: 'فعال'
    },
    {
      id: '12346',
      customerName: 'احمد محمدی',
      type: 'بدنه خودرو',
      vehicle: 'پژو ۴۰۵',
      startDate: '۱۴۰۳/۰۶/۰۱',
      endDate: '۱۴۰۴/۰۶/۰۱',
      premium: '۱۶,۰۰۰,۰۰۰',
      status: 'فعال'
    },
    {
      id: '12347',
      customerName: 'فاطمه احمدی',
      type: 'آتش‌سوزی',
      vehicle: 'آپارتمان',
      startDate: '۱۴۰۳/۰۴/۱۵',
      endDate: '۱۴۰۴/۰۴/۱۵',
      premium: '۳,۰۰۰,۰۰۰',
      status: 'نزدیک انقضا'
    }
  ];

  const recentInstallments = [
    {
      id: '1',
      customerName: 'احمد محمدی',
      policyType: 'شخص ثالث',
      amount: '۲,۵۰۰,۰۰۰',
      dueDate: '۱۴۰۳/۰۹/۰۱',
      status: 'معوق',
      daysOverdue: 5
    },
    {
      id: '2',
      customerName: 'فاطمه احمدی',
      policyType: 'آتش‌سوزی',
      amount: '۱,۵۰۰,۰۰۰',
      dueDate: '۱۴۰۳/۰۸/۲۸',
      status: 'پرداخت شده',
      daysOverdue: 0
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'فعال':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">فعال</Badge>;
      case 'غیرفعال':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">غیرفعال</Badge>;
      case 'نزدیک انقضا':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">نزدیک انقضا</Badge>;
      case 'معوق':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">معوق</Badge>;
      case 'پرداخت شده':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">پرداخت شده</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <div>
                <h1 className="text-lg">پنل مدیریت</h1>
                <p className="text-sm text-gray-600">سامانه مدیریت بیمه البرز</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 ml-2" />
                تنظیمات
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 ml-2" />
                خروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl mb-2">داشبورد مدیریت</h2>
          <p className="text-gray-600">مدیریت مشتریان، بیمه‌نامه‌ها و اقساط</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">کل مشتریان</p>
                  <p className="text-3xl">۱,۲۴۵</p>
                  <p className="text-sm text-green-600 mt-1">+۱۲% از ماه قبل</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">بیمه‌نامه‌های فعال</p>
                  <p className="text-3xl">۳,۴۵۶</p>
                  <p className="text-sm text-green-600 mt-1">+۸% از ماه قبل</p>
                </div>
                <FileText className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">درآمد ماهانه</p>
                  <p className="text-3xl">۲.۵ میلیارد</p>
                  <p className="text-sm text-green-600 mt-1">+۱۵% از ماه قبل</p>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">اقساط معوق</p>
                  <p className="text-3xl text-red-600">۴۵</p>
                  <p className="text-sm text-red-600 mt-1">-۳% از ماه قبل</p>
                </div>
                <CreditCard className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="customers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="customers">مدیریت مشتریان</TabsTrigger>
            <TabsTrigger value="policies">مدیریت بیمه‌نامه‌ها</TabsTrigger>
            <TabsTrigger value="installments">مدیریت اقساط</TabsTrigger>
          </TabsList>

          {/* Customers Management */}
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>مدیریت مشتریان</CardTitle>
                    <CardDescription>
                      لیست مشتریان و مدیریت اطلاعات آنها
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 ml-2" />
                    افزودن مشتری
                  </Button>
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
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.nationalCode}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.joinDate}</TableCell>
                        <TableCell>{customer.activePolicies}</TableCell>
                        <TableCell>{getStatusBadge(customer.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
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
          </TabsContent>

          {/* Policies Management */}
          <TabsContent value="policies">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>مدیریت بیمه‌نامه‌ها</CardTitle>
                    <CardDescription>
                      لیست بیمه‌نامه‌ها و وضعیت آنها
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 ml-2" />
                    صدور بیمه‌نامه
                  </Button>
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
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              مشاهده
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Installments Management */}
          <TabsContent value="installments">
            <Card>
              <CardHeader>
                <CardTitle>مدیریت اقساط</CardTitle>
                <CardDescription>
                  پیگیری اقساط و معوقات
                </CardDescription>
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
                    {recentInstallments.map((installment) => (
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
                            {installment.status === 'معوق' && (
                              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                پیگیری
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              جزئیات
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}