import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Progress } from "./ui/progress";
import { 
  Car, 
  Shield, 
  Flame, 
  User, 
  Calendar, 
  CreditCard, 
  Download,
  FileText,
  Phone,
  LogOut
} from "lucide-react";

interface CustomerDashboardProps {
  onLogout: () => void;
}

export function CustomerDashboard({ onLogout }: CustomerDashboardProps) {
  const insurancePolicies = [
    {
      id: '12345',
      type: 'شخص ثالث',
      vehicle: 'پژو ۴۰۵ - ۱۴۰۰',
      plateNumber: '۱۲ ط ۳۴۵ ایران ۱۶',
      startDate: '۱۴۰۳/۰۶/۰۱',
      endDate: '۱۴۰۴/۰۶/۰۱',
      status: 'فعال',
      icon: Car,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: '12346',
      type: 'بدنه خودرو',
      vehicle: 'پژو ۴۰۵ - ۱۴۰۰',
      plateNumber: '۱۲ ط ۳۴۵ ایران ۱۶',
      startDate: '۱۴۰۳/۰۶/۰۱',
      endDate: '۱۴۰۴/۰۶/۰۱',
      status: 'فعال',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: '12347',
      type: 'آتش‌سوزی منزل',
      vehicle: 'آپارتمان ۱۲۰ متری',
      plateNumber: 'تهران، خیابان آزادی',
      startDate: '۱۴۰۳/۰۴/۱۵',
      endDate: '۱۴۰۴/۰۴/۱۵',
      status: 'نزدیک انقضا',
      icon: Flame,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  const installments = [
    {
      policyId: '12345',
      policyType: 'شخص ثالث',
      installmentNumber: 1,
      amount: '۲,۵۰۰,۰۰۰',
      dueDate: '۱۴۰۳/۰۷/۰۱',
      status: 'پرداخت شده',
      paymentDate: '۱۴۰۳/۰۶/۲۸'
    },
    {
      policyId: '12345',
      policyType: 'شخص ثالث',
      installmentNumber: 2,
      amount: '۲,۵۰۰,۰۰۰',
      dueDate: '۱۴۰۳/۰۸/۰۱',
      status: 'پرداخت شده',
      paymentDate: '۱۴۰۳/۰۷/۲۹'
    },
    {
      policyId: '12346',
      policyType: 'بدنه خودرو',
      installmentNumber: 1,
      amount: '۸,۰۰۰,۰۰۰',
      dueDate: '۱۴۰۳/۰۹/۰۱',
      status: 'معوق',
      paymentDate: '-'
    },
    {
      policyId: '12346',
      policyType: 'بدنه خودرو',
      installmentNumber: 2,
      amount: '۸,۰۰۰,۰۰۰',
      dueDate: '۱۴۰۳/۱۰/۰۱',
      status: 'آینده',
      paymentDate: '-'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'فعال':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">فعال</Badge>;
      case 'نزدیک انقضا':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">نزدیک انقضا</Badge>;
      case 'منقضی':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">منقضی</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'پرداخت شده':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">پرداخت شده</Badge>;
      case 'معوق':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">معوق</Badge>;
      case 'آینده':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">آینده</Badge>;
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
                <h1 className="text-lg">پنل مشتری</h1>
                <p className="text-sm text-gray-600">احمد محمدی</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4 ml-2" />
                پشتیبانی
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
          <h2 className="text-2xl mb-2">خوش آمدید، احمد محمدی</h2>
          <p className="text-gray-600">وضعیت بیمه‌نامه‌ها و اقساط خود را مشاهده کنید</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">بیمه‌نامه‌های فعال</p>
                  <p className="text-2xl">۳</p>
                </div>
                <FileText className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">اقساط معوق</p>
                  <p className="text-2xl text-red-600">۱</p>
                </div>
                <CreditCard className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">نزدیک انقضا</p>
                  <p className="text-2xl text-yellow-600">۱</p>
                </div>
                <Calendar className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">امتیاز بیمه‌گذار</p>
                  <p className="text-2xl text-green-600">A+</p>
                </div>
                <User className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insurance Policies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>بیمه‌نامه‌های من</CardTitle>
            <CardDescription>
              لیست بیمه‌نامه‌های فعال و وضعیت آنها
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {insurancePolicies.map((policy) => {
                const IconComponent = policy.icon;
                return (
                  <Card key={policy.id} className="border-0 shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-full ${policy.bgColor}`}>
                          <IconComponent className={`h-6 w-6 ${policy.color}`} />
                        </div>
                        {getStatusBadge(policy.status)}
                      </div>
                      <CardTitle className="text-lg">{policy.type}</CardTitle>
                      <CardDescription>{policy.vehicle}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">شماره بیمه‌نامه:</span>
                          <span>{policy.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">شروع:</span>
                          <span>{policy.startDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">انقضا:</span>
                          <span>{policy.endDate}</span>
                        </div>
                        {policy.plateNumber && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">شماره پلاک:</span>
                            <span>{policy.plateNumber}</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="h-4 w-4 ml-2" />
                          دانلود
                        </Button>
                        <Button size="sm" className="flex-1">
                          جزئیات
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Installments Table */}
        <Card>
          <CardHeader>
            <CardTitle>اقساط</CardTitle>
            <CardDescription>
              جدول اقساط پرداختی و آینده
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>نوع بیمه</TableHead>
                  <TableHead>شماره قسط</TableHead>
                  <TableHead>مبلغ (ریال)</TableHead>
                  <TableHead>سررسید</TableHead>
                  <TableHead>تاریخ پرداخت</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead>عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {installments.map((installment, index) => (
                  <TableRow key={index}>
                    <TableCell>{installment.policyType}</TableCell>
                    <TableCell>{installment.installmentNumber}</TableCell>
                    <TableCell>{installment.amount}</TableCell>
                    <TableCell>{installment.dueDate}</TableCell>
                    <TableCell>{installment.paymentDate}</TableCell>
                    <TableCell>{getPaymentStatusBadge(installment.status)}</TableCell>
                    <TableCell>
                      {installment.status === 'معوق' && (
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          پرداخت
                        </Button>
                      )}
                      {installment.status === 'پرداخت شده' && (
                        <Button size="sm" variant="outline">
                          رسید
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}