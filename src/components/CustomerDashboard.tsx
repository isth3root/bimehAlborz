import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { toast } from "sonner";
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
  LogOut,
  Copy
} from "lucide-react";

interface CustomerDashboardProps {
  onLogout: () => void;
}

export function CustomerDashboard({ onLogout }: CustomerDashboardProps) {
  const [insurancePolicies, setInsurancePolicies] = useState<any[]>([]);
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const [showInstallmentsDialog, setShowInstallmentsDialog] = useState(false);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customer info
        const customerResponse = await fetch(`http://localhost:3000/admin/customers/by-national/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (customerResponse.ok) {
          const customerData = await customerResponse.json();
          setCustomer(customerData);
        }

        // Fetch policies
        const policiesResponse = await fetch(`http://localhost:3000/customer/policies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (policiesResponse.ok) {
          const data = await policiesResponse.json();
          const now = new Date();
          const policies = data.map((p: any) => {
            const endDate = p.end_date ? new Date(p.end_date) : null;
            let status = 'فعال';
            if (endDate) {
              if (endDate < now) {
                status = 'منقضی';
              } else if ((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30) <= 1) {
                status = 'نزدیک انقضا';
              }
            }
            return {
              id: p.id.toString(),
              type: p.insurance_type,
              vehicle: p.details,
              plateNumber: '',
              startDate: p.start_date ? new Date(p.start_date).toLocaleDateString('fa-IR') : '',
              endDate: p.end_date ? new Date(p.end_date).toLocaleDateString('fa-IR') : '',
              originalStartDate: p.start_date ? new Date(p.start_date) : new Date(),
              status,
              icon: p.insurance_type === 'ثالث' ? Car : p.insurance_type === 'بدنه' ? Shield : Flame,
              color: 'text-blue-600',
              bgColor: 'bg-blue-50',
              isInstallment: p.payment_type === 'اقساطی',
              payId: p.payment_id,
              premium: p.premium,
              installment_count: p.installment_count,
            };
          });
          setInsurancePolicies(policies);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token && userId) {
      fetchData();
    }
  }, [token, userId]);



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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('شناسه پرداخت کپی شد!');
    } catch (err) {
      toast.error('خطا در کپی کردن');
    }
  };

  const generateInstallments = (policy: any) => {
    const installments = [];
    const installmentAmount = policy.premium / policy.installment_count;
    const startDate = policy.originalStartDate;
    const now = new Date();
    for (let i = 1; i <= policy.installment_count; i++) {
      const dueDate = new Date(startDate);
      dueDate.setMonth(startDate.getMonth() + i - 1);
      let status = 'آینده';
      if (dueDate < now) {
        status = 'معوق';
      } else if ((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30) <= 1) {
        status = 'نزدیک انقضا';
      }
      installments.push({
        number: i,
        amount: installmentAmount,
        dueDate: dueDate.toLocaleDateString('fa-IR'),
        status,
      });
    }
    return installments;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-10 rounded-lg flex items-center justify-center">
                 <img src="./logo.png" alt="Logo" className="w-12 h-12 rounded-lg object-cover" />
              </div>
              <div>
                <h1 className="text-lg">پنل مشتری</h1>
                <p className="text-sm text-gray-600">{customer?.full_name || 'کاربر'}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <a href="tel:+989385540717">
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4 ml-2" />
                  پشتیبانی
                </Button>
              </a>
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
          <h2 className="text-2xl mb-2">خوش آمدید، {customer?.full_name || 'کاربر'}</h2>
          <p className="text-gray-600">وضعیت بیمه‌نامه‌ها و اقساط خود را مشاهده کنید</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">بیمه‌نامه‌های فعال</p>
                  <p className="text-2xl">{insurancePolicies.length}</p>
                </div>
                <FileText className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">معوق</p>
                  <p className="text-2xl text-red-600">{insurancePolicies.filter(p => p.status === 'منقضی').length}</p>
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
                  <p className="text-2xl text-yellow-600">{insurancePolicies.filter(p => p.status === 'نزدیک انقضا').length}</p>
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
                  <div className="flex flex-row-reverse justify-center items-center gap-4">
                    {['A', 'B', 'C', 'D'].map((score) => (
                      <span
                        key={score}
                        className={`${
                          score === customer?.score
                            ? score === 'A'
                              ? 'text-green-600 font-bold text-3xl rounded-full bg-green-100 w-12 h-12 flex items-center justify-center'
                              : score === 'B'
                              ? 'text-blue-600 font-bold text-3xl rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center'
                              : score === 'C'
                              ? 'text-orange-600 font-bold text-3xl rounded-full bg-orange-100 w-12 h-12 flex items-center justify-center'
                              : 'text-red-600 font-bold text-3xl rounded-full bg-red-100 w-12 h-12 flex items-center justify-center'
                            : score === 'A'
                            ? 'text-green-400 font-light text-sm'
                            : score === 'B'
                            ? 'text-blue-400 font-light text-sm'
                            : score === 'C'
                            ? 'text-orange-400 font-light text-sm'
                            : 'text-red-400 font-light text-sm'
                        }`}
                      >
                        {score}
                      </span>
                    ))}
                  </div>
                </div>
                <User className={`h-8 w-8 ${
                  customer?.score === 'A' ? 'text-green-600' :
                  customer?.score === 'B' ? 'text-blue-600' :
                  customer?.score === 'C' ? 'text-orange-600' :
                  'text-red-600'
                }`} />
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
            {insurancePolicies.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">شما هنوز بیمه‌نامه‌ای ندارید</p>
              </div>
            ) : (
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
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">شناسه پرداخت:</span>
                            <div className="flex items-center gap-1">
                              <span>{policy.payId || 'N/A'}</span>
                              {policy.payId && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0"
                                  onClick={() => copyToClipboard(policy.payId!)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
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
                              <span className="text-gray-600">{['شخص ثالث', 'بدنه خودرو'].includes(policy.type) ? 'شماره پلاک:' : 'آدرس:'}</span>
                              <span>{policy.plateNumber}</span>
                            </div>
                          )}
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" variant="outline" className={policy.isInstallment ? "flex-1" : "w-full"} onClick={async () => {
                            try {
                              const response = await fetch(`http://localhost:3000/customer/policies/${policy.id}/download`, {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              });
                              if (response.ok) {
                                const blob = await response.blob();
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `policy-${policy.id}.pdf`;
                                a.click();
                                window.URL.revokeObjectURL(url);
                              } else {
                                toast.error('خطا در دانلود فایل');
                              }
                            } catch (error) {
                              toast.error('خطا در دانلود فایل');
                            }
                          }}>
                            <Download className="h-4 w-4 ml-2" />
                            دانلود بیمه نامه
                          </Button>
                          {policy.isInstallment && (
                            <Button size="sm" variant="outline" className="flex-1" onClick={() => {
                              setSelectedPolicy(policy);
                              setShowInstallmentsDialog(true);
                            }}>
                              اقساط
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* All Installments Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>اقساط</CardTitle>
            <CardDescription>
              لیست تمام اقساط بیمه‌نامه‌ها
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-right'>نوع بیمه</TableHead>
                  <TableHead className='text-right'>شماره قسط</TableHead>
                  <TableHead className='text-right'>مبلغ</TableHead>
                  <TableHead className='text-right'>سررسید</TableHead>
                  <TableHead className='text-right'>وضعیت</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {insurancePolicies.filter(p => p.isInstallment).flatMap(policy =>
                  generateInstallments(policy).map(installment => ({
                    ...installment,
                    policyType: policy.type,
                    dueDateObj: new Date(policy.originalStartDate.getFullYear(), policy.originalStartDate.getMonth() + installment.number - 1, policy.originalStartDate.getDate()),
                  }))
                ).sort((a, b) => a.dueDateObj.getTime() - b.dueDateObj.getTime()).map(installment => (
                  <TableRow key={`${installment.policyType}-${installment.number}`}>
                    <TableCell>{installment.policyType}</TableCell>
                    <TableCell>{installment.number}</TableCell>
                    <TableCell>{installment.amount.toLocaleString('fa-IR')} تومان</TableCell>
                    <TableCell>{installment.dueDate}</TableCell>
                    <TableCell>{getPaymentStatusBadge(installment.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Installments Dialog */}
        <Dialog open={showInstallmentsDialog} onOpenChange={setShowInstallmentsDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>اقساط بیمه‌نامه</DialogTitle>
              <DialogDescription>
                لیست اقساط بیمه‌نامه {selectedPolicy?.type}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='text-right'>شماره قسط</TableHead>
                    <TableHead className='text-right'>مبلغ</TableHead>
                    <TableHead className='text-right'>سررسید</TableHead>
                    <TableHead className='text-right'>وضعیت</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedPolicy && generateInstallments(selectedPolicy).map((installment) => (
                    <TableRow key={installment.number}>
                      <TableCell>{installment.number}</TableCell>
                      <TableCell>{installment.amount.toLocaleString('fa-IR')} تومان</TableCell>
                      <TableCell>{installment.dueDate}</TableCell>
                      <TableCell>{getPaymentStatusBadge(installment.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}