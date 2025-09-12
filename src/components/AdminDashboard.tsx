import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
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
import { AddCustomerForm } from './AddCustomerForm';
import { EditCustomerForm } from './EditCustomerForm';
import { IssuePolicyForm } from './IssuePolicyForm';
import { EditPolicyForm } from './EditPolicyForm';
import { ViewPolicyDetails } from './ViewPolicyDetails';
import { AddInstallmentForm } from './AddInstallmentForm';
import { AddBlogPostForm } from './AddBlogPostForm';
import { EditBlogPostForm } from './EditBlogPostForm';
import { AddFaqForm } from './AddFaqForm';
import { EditFaqForm } from './EditFaqForm';

interface AdminDashboardProps {
  onLogout: () => void;
}

import { customers as initialCustomers, policies as initialPolicies, installments as initialInstallments, blogPosts as initialBlogPosts, faqs as initialFaqs } from '../data';
export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('customers');
  const [customers, setCustomers] = useLocalStorage('customers', initialCustomers);
  const [policies, setPolicies] = useLocalStorage('policies', initialPolicies);
  const [installments, setInstallments] = useLocalStorage('installments', initialInstallments);
  const [blogPosts, setBlogPosts] = useLocalStorage('blogPosts', initialBlogPosts);
  const [faqs, setFaqs] = useLocalStorage('faqs', initialFaqs);

  const handleAddCustomer = (customer: any) => {
    setCustomers([...customers, customer]);
  };

  const handleEditCustomer = (updatedCustomer: any) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
  };

  const handleDeleteCustomer = (customerId: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter((customer) => customer.id !== customerId));
    }
  };

  const handleIssuePolicy = (policy: any) => {
    setPolicies([...policies, policy]);
  };

  const handleEditPolicy = (updatedPolicy: any) => {
    setPolicies(
      policies.map((policy) =>
        policy.id === updatedPolicy.id ? updatedPolicy : policy
      )
    );
  };

  const handleAddInstallment = (installment: any) => {
    setInstallments([...installments, installment]);
  };

  const handleMarkAsPaid = (installmentId: string) => {
    setInstallments(
      installments.map((installment) =>
        installment.id === installmentId
          ? { ...installment, status: 'پرداخت شده' }
          : installment
      )
    );
  };

  const handleAddBlogPost = (post: any) => {
    setBlogPosts([...blogPosts, post]);
  };

  const handleEditBlogPost = (updatedPost: any) => {
    setBlogPosts(
      blogPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  };

  const handleDeleteBlogPost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogPosts(blogPosts.filter((post) => post.id !== postId));
    }
  };

  const handleAddFaq = (faq: any) => {
    setFaqs([...faqs, faq]);
  };

  const handleEditFaq = (updatedFaq: any) => {
    setFaqs(
      faqs.map((faq) =>
        faq.id === updatedFaq.id ? updatedFaq : faq
      )
    );
  };

  const handleDeleteFaq = (faqId: string) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      setFaqs(faqs.filter((faq) => faq.id !== faqId));
    }
  };

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
              <Button variant="ghost" size="sm" onClick={() => {}}>
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="customers">مدیریت مشتریان</TabsTrigger>
            <TabsTrigger value="policies">مدیریت بیمه‌نامه‌ها</TabsTrigger>
            <TabsTrigger value="installments">مدیریت اقساط</TabsTrigger>
            <TabsTrigger value="blog">مدیریت وبلاگ</TabsTrigger>
            <TabsTrigger value="faq">مدیریت سوالات متداول</TabsTrigger>
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
                  <AddCustomerForm onAddCustomer={handleAddCustomer} />
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
                            <EditCustomerForm customer={customer} onEditCustomer={handleEditCustomer} />
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
          </TabsContent>

          {/* FAQ Management */}
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>مدیریت سوالات متداول</CardTitle>
                    <CardDescription>
                      لیست سوالات متداول و مدیریت آنها
                    </CardDescription>
                  </div>
                  <AddFaqForm onAddFaq={handleAddFaq} />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>سوال</TableHead>
                      <TableHead>پاسخ</TableHead>
                      <TableHead>عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {faqs.map((faq) => (
                      <TableRow key={faq.id}>
                        <TableCell>{faq.question}</TableCell>
                        <TableCell>{faq.answer}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <EditFaqForm faq={faq} onEditFaq={handleEditFaq} />
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteFaq(faq.id)}>
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

          {/* Blog Management */}
          <TabsContent value="blog">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>مدیریت وبلاگ</CardTitle>
                    <CardDescription>
                      لیست پست‌های وبلاگ و مدیریت آنها
                    </CardDescription>
                  </div>
                  <AddBlogPostForm onAddBlogPost={handleAddBlogPost} />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>عنوان</TableHead>
                      <TableHead>تاریخ انتشار</TableHead>
                      <TableHead>عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>{post.title}</TableCell>
                        <TableCell>{post.publishDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <EditBlogPostForm post={post} onEditBlogPost={handleEditBlogPost} />
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteBlogPost(post.id)}>
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
                  <IssuePolicyForm customers={customers} onIssuePolicy={handleIssuePolicy} />
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
                            <EditPolicyForm customers={customers} policy={policy} onEditPolicy={handleEditPolicy} />
                            <ViewPolicyDetails policy={policy} />
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
          </TabsContent>

          {/* Installments Management */}
          <TabsContent value="installments">
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
                    <AddInstallmentForm
                      policy={policies.find((p) => p.id === selectedPolicyId)}
                      onAddInstallment={handleAddInstallment}
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}