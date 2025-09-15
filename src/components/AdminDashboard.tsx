import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Users,
  FileText,
  CreditCard,
  LogOut,
  Settings,
  DollarSign
} from "lucide-react";
import { CustomerManagement } from './admin/CustomerManagement';
import { PolicyManagement } from './admin/PolicyManagement';
import { InstallmentManagement } from './admin/InstallmentManagement';
import { BlogManagement } from './admin/BlogManagement';
import { FaqManagement } from './admin/FaqManagement';

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

  const handleDeletePolicy = (policyId: string) => {
    if (window.confirm('Are you sure you want to delete this policy?')) {
      setPolicies(policies.filter((policy) => policy.id !== policyId));
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

  const handleEditInstallment = (updatedInstallment: any) => {
    setInstallments(
      installments.map((installment) =>
        installment.id === updatedInstallment.id ? updatedInstallment : installment
      )
    );
  };

  const handleDeleteInstallment = (installmentId: string) => {
    if (window.confirm('Are you sure you want to delete this installment?')) {
      setInstallments(installments.filter((installment) => installment.id !== installmentId));
    }
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

          <TabsContent value="customers">
            <CustomerManagement
              customers={customers}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleAddCustomer={handleAddCustomer}
              handleEditCustomer={handleEditCustomer}
              handleDeleteCustomer={handleDeleteCustomer}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>

          <TabsContent value="faq">
            <FaqManagement
              faqs={faqs}
              handleAddFaq={handleAddFaq}
              handleEditFaq={handleEditFaq}
              handleDeleteFaq={handleDeleteFaq}
            />
          </TabsContent>

          <TabsContent value="blog">
            <BlogManagement
              blogPosts={blogPosts}
              handleAddBlogPost={handleAddBlogPost}
              handleEditBlogPost={handleEditBlogPost}
              handleDeleteBlogPost={handleDeleteBlogPost}
            />
          </TabsContent>

          <TabsContent value="policies">
            <PolicyManagement
              policies={policies}
              customers={customers}
              handleIssuePolicy={handleIssuePolicy}
              handleEditPolicy={handleEditPolicy}
              handleDeletePolicy={handleDeletePolicy}
              setSelectedPolicyId={setSelectedPolicyId}
              setActiveTab={setActiveTab}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>

          <TabsContent value="installments">
            <InstallmentManagement
              installments={installments}
              selectedPolicyId={selectedPolicyId}
              policies={policies}
              handleAddInstallment={handleAddInstallment}
              handleEditInstallment={handleEditInstallment}
              handleDeleteInstallment={handleDeleteInstallment}
              handleMarkAsPaid={handleMarkAsPaid}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}