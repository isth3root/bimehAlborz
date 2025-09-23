import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { PriceInput } from "./PriceInput";
import { useBlogs } from "../hooks/useBlogs";
import { motion, AnimatePresence } from "framer-motion";
import type { Blog } from "../data/blogsData";
import {
  Users,
  FileText,
  CreditCard,
  Search,
  Plus,
  Edit,
  Trash2,
  LogOut,
  DollarSign,
  Calendar,
} from "lucide-react";
import { DatePicker } from "zaman";
import moment from "moment-jalaali";
import ReactDOM from "react-dom";

// Client-only Persian date picker component using zaman
const ClientOnlyDatePicker = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (date: string) => void;
  placeholder: string;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Convert Persian date string to Date object
  const parsePersianDate = (dateStr: string): Date | undefined => {
    if (!dateStr) return undefined;
    const m = moment(dateStr, "jYYYY/jMM/jDD");
    return m.isValid() ? m.toDate() : undefined;
  };

  // Convert Date object to Persian date string
  const formatPersianDate = (date: Date): string => {
    return moment(date).format("jYYYY/jMM/jDD");
  };

  const handleDateChange = (e: { value: Date }) => {
    const persianDate = formatPersianDate(e.value);
    onChange(persianDate);
  };

  if (!isClient) {
    return (
      <div className="flex items-center gap-2 border rounded-md px-3 py-2 text-sm bg-white">
        <Calendar className="h-4 w-4 text-gray-400" />
        <span>{placeholder}</span>
      </div>
    );
  }

  return (
    <DatePicker
      defaultValue={parsePersianDate(value)}
      onChange={handleDateChange}
      className="w-full"
      inputClass="flex items-center gap-2 border rounded-md px-3 py-2 text-sm bg-white cursor-pointer"
      inputAttributes={{
        placeholder: placeholder,
        style: { direction: "rtl" },
      }}
    />
  );
};

interface AdminDashboardProps {
  onLogout: () => void;
}

interface Customer {
  id: string;
  name: string;
  nationalCode: string;
  phone: string;
  email: string;
  joinDate: string;
  activePolicies: number;
  status: string;
  password?: string;
}

interface Policy {
  id: string;
  customerName: string;
  type: string;
  vehicle: string;
  startDate: string;
  endDate: string;
  premium: string;
  status: string;
  pdfFile?: File | null;
}

interface Installment {
  id: string;
  customerName: string;
  policyType: string;
  amount: string;
  dueDate: string;
  status: string;
  daysOverdue: number;
  payLink?: string;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { blogs, addBlog, updateBlog, deleteBlog } = useBlogs();
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "احمد محمدی",
      nationalCode: "1234567890",
      phone: "09123456789",
      email: "ahmad@example.com",
      joinDate: "۱۴۰۳/۰۴/۱۵",
      activePolicies: 3,
      status: "فعال",
      password: "",
    },
    {
      id: "2",
      name: "فاطمه احمدی",
      nationalCode: "0987654321",
      phone: "09187654321",
      email: "fateme@example.com",
      joinDate: "۱۴۰۳/۰۳/۱۰",
      activePolicies: 1,
      status: "فعال",
      password: "",
    },
    {
      id: "3",
      name: "علی رضایی",
      nationalCode: "5555555555",
      phone: "09155555555",
      email: "ali@example.com",
      joinDate: "۱۴۰۳/۰۲/۰۵",
      activePolicies: 2,
      status: "غیرفعال",
      password: "",
    },
  ]);

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    nationalCode: "",
    insuranceCode: "",
    phone: "",
    email: "",
  });
  const [deleteCustomer, setDeleteCustomer] = useState<Customer | null>(null);
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  const [policies, setPolicies] = useState<Policy[]>([
    {
      id: "12345",
      customerName: "احمد محمدی",
      type: "شخص ثالث",
      vehicle: "پژو ۴۰۵",
      startDate: "۱۴۰۳/۰۶/۰۱",
      endDate: "۱۴۰۴/۰۶/۰۱",
      premium: "۵,۰۰۰,۰۰۰",
      status: "فعال",
      pdfFile: null,
    },
    {
      id: "12346",
      customerName: "احمد محمدی",
      type: "بدنه خودرو",
      vehicle: "پژو ۴۰۵",
      startDate: "۱۴۰۳/۰۶/۰۱",
      endDate: "۱۴۰۴/۰۶/۰۱",
      premium: "۱۶,۰۰۰,۰۰۰",
      status: "فعال",
      pdfFile: null,
    },
    {
      id: "12347",
      customerName: "فاطمه احمدی",
      type: "آتش‌سوزی",
      vehicle: "آپارتمان",
      startDate: "۱۴۰۳/۰۴/۱۵",
      endDate: "۱۴۰۴/۰۴/۱۵",
      premium: "۳,۰۰۰,۰۰۰",
      status: "نزدیک انقضا",
      pdfFile: null,
    },
  ]);

  const [installments, setInstallments] = useState<Installment[]>([
    {
      id: "1",
      customerName: "احمد محمدی",
      policyType: "شخص ثالث",
      amount: "۲,۵۰۰,۰۰۰",
      dueDate: "۱۴۰۳/۰۹/۰۱",
      status: "معوق",
      daysOverdue: 5,
      payLink: "",
    },
    {
      id: "2",
      customerName: "فاطمه احمدی",
      policyType: "آتش‌سوزی",
      amount: "۱,۵۰۰,۰۰۰",
      dueDate: "۱۴۰۳/۰۸/۲۸",
      status: "پرداخت شده",
      daysOverdue: 0,
      payLink: "",
    },
  ]);

  const [policySearchQuery, setPolicySearchQuery] = useState("");
  const [isEditPolicyDialogOpen, setIsEditPolicyDialogOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);
  const [formDataPolicy, setFormDataPolicy] = useState({
    customerName: "",
    type: "",
    vehicle: "",
    startDate: "",
    endDate: "",
    premium: "",
    status: "فعال",
    pdfFile: null as File | null,
  });
  const [deletePolicy, setDeletePolicy] = useState<Policy | null>(null);
  const [showAddPolicyForm, setShowAddPolicyForm] = useState(false);

  const [isEditInstallmentDialogOpen, setIsEditInstallmentDialogOpen] =
    useState(false);
  const [editingInstallment, setEditingInstallment] =
    useState<Installment | null>(null);
  const [formDataInstallment, setFormDataInstallment] = useState({
    customerName: "",
    policyType: "",
    amount: "",
    dueDate: "",
    payLink: "",
    status: "معوق",
  });
  const [deleteInstallment, setDeleteInstallment] =
    useState<Installment | null>(null);
  const [showAddInstallmentForm, setShowAddInstallmentForm] = useState(false);

  const [installmentSearchQuery, setInstallmentSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [blogSearchQuery, setBlogSearchQuery] = useState("");
  const [isEditBlogDialogOpen, setIsEditBlogDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formDataBlog, setFormDataBlog] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    date: "",
    imageUrl: "",
    category: "",
  });
  const [activeTab, setActiveTab] = useState("customers");
  const [showAddBlogForm, setShowAddBlogForm] = useState(false);

  const tabIndex =
    { customers: 0, policies: 1, installments: 2, blogs: 3 }[activeTab] || 0;

  const formatPrice = (price: string) => {
    const numeric = price.replace(/[^\d]/g, "");
    const formatted = numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formatted} ریال`;
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.nationalCode.includes(searchQuery)
  );

  const handleAddCustomer = () => {
    if (!formData.name.trim() || !formData.nationalCode.trim() || !formData.phone.trim() || !formData.email.trim()) {
      alert("لطفا تمام فیلدهای مورد نیاز را پر کنید.");
      return;
    }
    const newCustomer = {
      id: Date.now().toString(),
      name: formData.name,
      nationalCode: formData.nationalCode,
      phone: formData.phone,
      email: formData.email,
      joinDate: new Date().toLocaleDateString("fa-IR"),
      activePolicies: 0,
      status: "فعال",
      password: formData.insuranceCode,
    };
    setCustomers([...customers, newCustomer]);
    setFormData({
      name: "",
      nationalCode: "",
      insuranceCode: "",
      phone: "",
      email: "",
    });
    setShowCustomerForm(false);
  };

  const handleEditCustomer = () => {
    if (!editingCustomer) return;
    setCustomers(
      customers.map((c) =>
        c.id === editingCustomer.id
          ? {
              ...c,
              name: formData.name,
              nationalCode: formData.nationalCode,
              phone: formData.phone,
              email: formData.email,
              password: formData.insuranceCode,
            }
          : c
      )
    );
    setFormData({
      name: "",
      nationalCode: "",
      insuranceCode: "",
      phone: "",
      email: "",
    });
    setShowCustomerForm(false);
    setEditingCustomer(null);
  };

  const handleDeleteCustomer = () => {
    if (!deleteCustomer) return;
    setCustomers(customers.filter((c) => c.id !== deleteCustomer.id));
    setDeleteCustomer(null);
  };

  const openEditDialog = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      nationalCode: customer.nationalCode,
      insuranceCode: customer.password || "",
      phone: customer.phone,
      email: customer.email,
    });
    setShowCustomerForm(true);
  };

  const handleAddPolicy = () => {
    if (!formDataPolicy.customerName.trim() || !formDataPolicy.type.trim() || !formDataPolicy.vehicle.trim() || !formDataPolicy.startDate.trim() || !formDataPolicy.endDate.trim() || !formDataPolicy.premium.trim()) {
      alert("لطفا تمام فیلدهای مورد نیاز را پر کنید.");
      return;
    }
    const newPolicy: Policy = {
      id: Date.now().toString(),
      ...formDataPolicy,
    };
    setPolicies([...policies, newPolicy]);
    setFormDataPolicy({
      customerName: "",
      type: "",
      vehicle: "",
      startDate: "",
      endDate: "",
      premium: "",
      status: "فعال",
      pdfFile: null,
    });
    setShowAddPolicyForm(false);
  };

  const handleEditPolicy = () => {
    if (!editingPolicy) return;
    setPolicies(
      policies.map((p) =>
        p.id === editingPolicy.id ? { ...p, ...formDataPolicy } : p
      )
    );
    setFormDataPolicy({
      customerName: "",
      type: "",
      vehicle: "",
      startDate: "",
      endDate: "",
      premium: "",
      status: "فعال",
      pdfFile: null,
    });
    setIsEditPolicyDialogOpen(false);
    setEditingPolicy(null);
  };

  const handleDeletePolicy = () => {
    if (!deletePolicy) return;
    setPolicies(policies.filter((p) => p.id !== deletePolicy.id));
    setDeletePolicy(null);
  };

  const openEditPolicyDialog = (policy: Policy) => {
    setEditingPolicy(policy);
    setFormDataPolicy({
      customerName: policy.customerName,
      type: policy.type,
      vehicle: policy.vehicle,
      startDate: policy.startDate,
      endDate: policy.endDate,
      premium: policy.premium,
      status: policy.status,
      pdfFile: policy.pdfFile || null,
    });
    setShowAddPolicyForm(true);
  };

  const handleAddInstallment = () => {
    if (!formDataInstallment.customerName.trim() || !formDataInstallment.policyType.trim() || !formDataInstallment.amount.trim() || !formDataInstallment.dueDate.trim()) {
      alert("لطفا تمام فیلدهای مورد نیاز را پر کنید.");
      return;
    }
    const newInstallment: Installment = {
      id: Date.now().toString(),
      ...formDataInstallment,
      status: "معوق",
      daysOverdue: 0,
    };
    setInstallments([...installments, newInstallment]);
    setFormDataInstallment({
      customerName: "",
      policyType: "",
      amount: "",
      dueDate: "",
      payLink: "",
      status: "معوق",
    });
    setShowAddInstallmentForm(false);
  };

  const handleEditInstallment = () => {
    if (!editingInstallment) return;
    setInstallments(
      installments.map((i) =>
        i.id === editingInstallment.id ? { ...i, ...formDataInstallment } : i
      )
    );
    setFormDataInstallment({
      customerName: "",
      policyType: "",
      amount: "",
      dueDate: "",
      payLink: "",
      status: "معوق",
    });
    setShowAddInstallmentForm(false);
    setEditingInstallment(null);
  };

  const handleDeleteInstallment = () => {
    if (!deleteInstallment) return;
    setInstallments(installments.filter((i) => i.id !== deleteInstallment.id));
    setDeleteInstallment(null);
  };

  const openEditInstallmentDialog = (installment: Installment) => {
    setEditingInstallment(installment);
    setFormDataInstallment({
      customerName: installment.customerName,
      policyType: installment.policyType,
      amount: installment.amount,
      dueDate: installment.dueDate,
      payLink: installment.payLink || "",
      status: installment.status,
    });
    setShowAddInstallmentForm(true);
  };

  const filteredInstallments = installments.filter(
    (i) =>
      i.customerName
        .toLowerCase()
        .includes(installmentSearchQuery.toLowerCase()) ||
      i.policyType.toLowerCase().includes(installmentSearchQuery.toLowerCase())
  );

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedInstallments = [...filteredInstallments].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField as keyof Installment] as string;
    const bVal = b[sortField as keyof Installment] as string;
    if (sortDirection === "asc") {
      return aVal.localeCompare(bVal);
    } else {
      return bVal.localeCompare(aVal);
    }
  });

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(blogSearchQuery.toLowerCase())
  );

  const handleAddBlog = () => {
    if (!formDataBlog.title.trim() || !formDataBlog.excerpt.trim() || !formDataBlog.content.trim() || !formDataBlog.author.trim() || !formDataBlog.category.trim()) {
      alert("لطفا تمام فیلدهای مورد نیاز را پر کنید.");
      return;
    }
    addBlog({
      ...formDataBlog,
      date: formDataBlog.date || new Date().toLocaleDateString("fa-IR"),
    });
    setFormDataBlog({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      date: "",
      imageUrl: "",
      category: "",
    });
    setShowAddBlogForm(false);
  };

  const handleEditBlog = () => {
    if (!editingBlog) return;
    updateBlog(editingBlog.id, formDataBlog);
    setFormDataBlog({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      date: "",
      imageUrl: "",
      category: "",
    });
    setShowAddBlogForm(false);
    setEditingBlog(null);
  };

  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);

  const handleDeleteBlog = () => {
    if (!deleteBlogId) return;
    deleteBlog(deleteBlogId);
    setDeleteBlogId(null);
  };

  const openEditBlogDialog = (blog: Blog) => {
    setEditingBlog(blog);
    setFormDataBlog({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      date: blog.date,
      imageUrl: blog.imageUrl || "",
      category: blog.category,
    });
    setShowAddBlogForm(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "فعال":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            فعال
          </Badge>
        );
      case "غیرفعال":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            غیرفعال
          </Badge>
        );
      case "نزدیک انقضا":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            نزدیک انقضا
          </Badge>
        );
      case "معوق":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            معوق
          </Badge>
        );
      case "پرداخت شده":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            پرداخت شده
          </Badge>
        );
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
                <p className="text-sm text-gray-600">
                  سامانه مدیریت بیمه البرز
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
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
                  <p className="text-sm text-gray-600 mb-2">
                    بیمه‌نامه‌های فعال
                  </p>
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
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="relative grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
            <motion.div
              className="absolute top-1 bottom-1 bg-white rounded-md shadow-sm"
              style={{ width: "calc(25% - 4px)" }}
              animate={{ left: `calc(${tabIndex} * 25% + 2px)` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <TabsTrigger
              value="customers"
              className="relative z-10 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              {" "}
              مشتریان
            </TabsTrigger>
            <TabsTrigger
              value="policies"
              className="relative z-10 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              {" "}
              بیمه‌نامه‌ها
            </TabsTrigger>
            <TabsTrigger
              value="installments"
              className="relative z-10 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              {" "}
              اقساط
            </TabsTrigger>
            <TabsTrigger
              value="blogs"
              className="relative z-10 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              {" "}
              وبلاگ
            </TabsTrigger>
          </TabsList>

          {/* Customers Management */}
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>مدیریت مشتریان</CardTitle>
                  </div>
                  <Button
                    onClick={() => {
                      setEditingCustomer(null);
                      setFormData({
                        name: "",
                        nationalCode: "",
                        insuranceCode: "",
                        phone: "",
                        email: "",
                      });
                      setShowCustomerForm((prev) => !prev);
                    }}
                    variant={showCustomerForm ? "outline" : "default"}
                  >
                    <Plus className="h-4 w-4 ml-2" />
                    افزودن مشتری
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <AnimatePresence>
                  {showCustomerForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-6 p-4 bg-white rounded-lg shadow border overflow-hidden"
                      dir="rtl"
                    >
                    <div className="grid gap-4 py-2">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          نام و نام خانوادگی
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          autoComplete="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nationalCode" className="text-right">
                          کد ملی
                        </Label>
                        <Input
                          id="nationalCode"
                          name="nationalCode"
                          value={formData.nationalCode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              nationalCode: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="insuranceCode"
                          className="text-right"
                        >
                          کد بیمه (رمز عبور)
                        </Label>
                        <Input
                          id="insuranceCode"
                          name="insuranceCode"
                          type="password"
                          value={formData.insuranceCode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              insuranceCode: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                          شماره تماس
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          ایمیل
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 justify-end">
                      <Button onClick={editingCustomer ? handleEditCustomer : handleAddCustomer}>
                        {editingCustomer ? "ذخیره تغییرات" : "ثبت مشتری"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setFormData({
                            name: "",
                            nationalCode: "",
                            insuranceCode: "",
                            phone: "",
                            email: "",
                          });
                          setShowCustomerForm(false);
                        }}
                      >
                        لغو
                      </Button>
                    </div>
                  </motion.div>
                )}
                </AnimatePresence>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="جستجو در مشتریان..."
                      dir="rtl"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left pl-8">عملیات</TableHead>
                      <TableHead className="text-right">وضعیت</TableHead>
                      <TableHead className="text-right">بیمه‌نامه‌های فعال</TableHead>
                      <TableHead className="text-right">تاریخ عضویت</TableHead>
                      <TableHead className="text-right">شماره تماس</TableHead>
                      <TableHead className="text-right">کد ملی</TableHead>
                      <TableHead className="text-right">نام و نام خانوادگی</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openEditDialog(customer)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => setDeleteCustomer(customer)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>حذف مشتری</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    آیا مطمئن هستید که می‌خواهید این مشتری را
                                    حذف کنید؟ این عمل قابل بازگشت نیست.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>لغو</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={handleDeleteCustomer}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    حذف
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(customer.status)}</TableCell>
                        <TableCell>{customer.activePolicies}</TableCell>
                        <TableCell>{customer.joinDate}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.nationalCode}</TableCell>
                        <TableCell>{customer.name}</TableCell>
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
                  </div>
                  <Button
                    onClick={() => setShowAddPolicyForm((prev) => !prev)}
                    variant={showAddPolicyForm ? "outline" : "default"}
                  >
                    <Plus className="h-4 w-4 ml-2" />
                    صدور بیمه‌نامه
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Inline Add/Edit Policy Form */}
                <AnimatePresence>
                  {showAddPolicyForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-6 p-4 bg-white rounded-lg shadow border overflow-hidden"
                      dir="rtl"
                    >
                      <h3 className="text-lg font-semibold mb-4">
                        {editingPolicy ? "ویرایش بیمه‌نامه" : "صدور بیمه‌نامه"}
                      </h3>
                    <div className="grid gap-4 py-2">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="policy-customerName"
                          className="text-right"
                        >
                          نام مشتری
                        </Label>
                        <Input
                          id="policy-customerName"
                          name="customerName"
                          autoComplete="name"
                          value={formDataPolicy.customerName}
                          onChange={(e) =>
                            setFormDataPolicy({
                              ...formDataPolicy,
                              customerName: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="policy-type" className="text-right">
                          نوع بیمه
                        </Label>
                        <Input
                          id="policy-type"
                          name="policy-type"
                          value={formDataPolicy.type}
                          onChange={(e) =>
                            setFormDataPolicy({
                              ...formDataPolicy,
                              type: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="policy-vehicle" className="text-right">
                          موضوع بیمه
                        </Label>
                        <Input
                          id="policy-vehicle"
                          name="policy-vehicle"
                          value={formDataPolicy.vehicle}
                          onChange={(e) =>
                            setFormDataPolicy({
                              ...formDataPolicy,
                              vehicle: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="policy-startDate"
                          className="text-right"
                        >
                          تاریخ شروع
                        </Label>
                        <div className="col-span-3">
                          <ClientOnlyDatePicker
                            value={formDataPolicy.startDate}
                            onChange={(date: string) => {
                              setFormDataPolicy({
                                ...formDataPolicy,
                                startDate: date,
                              });
                            }}
                            placeholder="انتخاب تاریخ شروع"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="policy-endDate" className="text-right">
                          تاریخ انقضا
                        </Label>
                        <div className="col-span-3">
                          <ClientOnlyDatePicker
                            value={formDataPolicy.endDate}
                            onChange={(date: string) => {
                              setFormDataPolicy({
                                ...formDataPolicy,
                                endDate: date,
                              });
                            }}
                            placeholder="انتخاب تاریخ انقضا"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="policy-premium" className="text-right">
                          حق بیمه (ریال)
                        </Label>
                        <PriceInput
                          value={formDataPolicy.premium}
                          onChange={(value) =>
                            setFormDataPolicy({
                              ...formDataPolicy,
                              premium: value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="policy-pdf" className="text-right">
                          فایل PDF
                        </Label>
                        <Input
                          id="policy-pdf"
                          name="policy-pdf"
                          type="file"
                          accept=".pdf"
                          onChange={(e) =>
                            setFormDataPolicy({
                              ...formDataPolicy,
                              pdfFile: e.target.files
                                ? e.target.files[0]
                                : null,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                      <div className="flex gap-2 mt-4 justify-end">
                        <Button onClick={editingPolicy ? handleEditPolicy : handleAddPolicy}>
                          {editingPolicy ? "ذخیره تغییرات" : "ثبت بیمه‌نامه"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditingPolicy(null);
                            setFormDataPolicy({
                              customerName: "",
                              type: "",
                              vehicle: "",
                              startDate: "",
                              endDate: "",
                              premium: "",
                              status: "فعال",
                              pdfFile: null,
                            });
                            setShowAddPolicyForm(false);
                          }}
                        >
                          لغو
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="جستجو بر اساس شماره بیمه‌نامه..."
                      dir="rtl"
                      value={policySearchQuery}
                      onChange={(e) => setPolicySearchQuery(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left pl-8">عملیات</TableHead>
                      <TableHead className="text-right">وضعیت</TableHead>
                      <TableHead className="text-right">حق بیمه</TableHead>
                      <TableHead className="text-right">تاریخ انقضا</TableHead>
                      <TableHead className="text-right">تاریخ شروع</TableHead>
                      <TableHead className="text-right">موضوع بیمه</TableHead>
                      <TableHead className="text-right">نوع بیمه</TableHead>
                      <TableHead className="text-right">نام مشتری</TableHead>
                      <TableHead className="text-right">شماره بیمه‌نامه</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {policies.map((policy) => (
                      <TableRow key={policy.id}>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openEditPolicyDialog(policy)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => setDeletePolicy(policy)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    حذف بیمه‌نامه
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    آیا مطمئن هستید که می‌خواهید این بیمه‌نامه
                                    را حذف کنید؟ این عمل قابل بازگشت نیست.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>لغو</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={handleDeletePolicy}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    حذف
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(policy.status)}</TableCell>
                        <TableCell>{formatPrice(policy.premium)}</TableCell>
                        <TableCell>{policy.endDate}</TableCell>
                        <TableCell>{policy.startDate}</TableCell>
                        <TableCell>{policy.vehicle}</TableCell>
                        <TableCell>{policy.type}</TableCell>
                        <TableCell>{policy.customerName}</TableCell>
                        <TableCell>{policy.id}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>

              {/* Edit Policy Dialog removed */}
            </Card>
          </TabsContent>

          {/* Installments Management */}
          <TabsContent value="installments">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>مدیریت اقساط</CardTitle>
                  <Button
                    onClick={() => setShowAddInstallmentForm((prev) => !prev)}
                    variant={showAddInstallmentForm ? "outline" : "default"}
                  >
                    <Plus className="h-4 w-4 ml-2" />
                    افزودن قسط
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Inline Add/Edit Installment Form */}
                <AnimatePresence>
                  {showAddInstallmentForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-6 p-4 bg-white rounded-lg shadow border overflow-hidden"
                      dir="rtl"
                    >
                      <h3 className="text-lg font-semibold mb-4">
                        {editingInstallment ? "ویرایش قسط" : "افزودن قسط"}
                      </h3>
                    <div className="grid gap-4 py-2">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="installment-customerName"
                          className="text-right"
                        >
                          نام مشتری
                        </Label>
                        <Input
                          id="installment-customerName"
                          name="customerName"
                          autoComplete="name"
                          value={formDataInstallment.customerName}
                          onChange={(e) =>
                            setFormDataInstallment({
                              ...formDataInstallment,
                              customerName: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="installment-policyType"
                          className="text-right"
                        >
                          نوع بیمه
                        </Label>
                        <Input
                          id="installment-policyType"
                          name="policyType"
                          value={formDataInstallment.policyType}
                          onChange={(e) =>
                            setFormDataInstallment({
                              ...formDataInstallment,
                              policyType: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="installment-amount"
                          className="text-right"
                        >
                          مبلغ قسط (ریال)
                        </Label>
                        <PriceInput
                          value={formDataInstallment.amount}
                          onChange={(value) =>
                            setFormDataInstallment({
                              ...formDataInstallment,
                              amount: value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="installment-dueDate"
                          className="text-right"
                        >
                          سررسید
                        </Label>
                        <div className="col-span-3">
                          <ClientOnlyDatePicker
                            value={formDataInstallment.dueDate}
                            onChange={(date: string) => {
                              setFormDataInstallment({
                                ...formDataInstallment,
                                dueDate: date,
                              });
                            }}
                            placeholder="انتخاب سررسید"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="installment-status"
                          className="text-right"
                        >
                          وضعیت
                        </Label>
                        <Select
                          name="status"
                          value={formDataInstallment.status}
                          onValueChange={(value: string) =>
                            setFormDataInstallment({
                              ...formDataInstallment,
                              status: value,
                            })
                          }
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="معوق">معوق</SelectItem>
                            <SelectItem value="پرداخت شده">
                              پرداخت شده
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="installment-payLink"
                          className="text-right"
                        >
                          لینک پرداخت
                        </Label>
                        <Input
                          id="installment-payLink"
                          name="payLink"
                          value={formDataInstallment.payLink}
                          onChange={(e) =>
                            setFormDataInstallment({
                              ...formDataInstallment,
                              payLink: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                      <div className="flex gap-2 mt-4 justify-end">
                        <Button onClick={editingInstallment ? handleEditInstallment : handleAddInstallment}>
                          {editingInstallment ? "ذخیره تغییرات" : "ثبت قسط"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditingInstallment(null);
                            setFormDataInstallment({
                              customerName: "",
                              policyType: "",
                              amount: "",
                              dueDate: "",
                              payLink: "",
                              status: "معوق",
                            });
                            setShowAddInstallmentForm(false);
                          }}
                        >
                          لغو
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="جستجو بر اساس نام مشتری یا نوع بیمه..."
                      dir="rtl"
                      value={installmentSearchQuery}
                      onChange={(e) =>
                        setInstallmentSearchQuery(e.target.value)
                      }
                      className="pr-10"
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left pl-8">عملیات</TableHead>
                      <TableHead
                        onClick={() => handleSort("status")}
                        className="cursor-pointer hover:bg-gray-50 text-right"
                      >
                        وضعیت
                      </TableHead>
                      <TableHead className="text-right">تعداد روز تاخیر</TableHead>
                      <TableHead
                        onClick={() => handleSort("dueDate")}
                        className="cursor-pointer hover:bg-gray-50 text-right"
                      >
                        سررسید
                      </TableHead>
                      <TableHead
                        onClick={() => handleSort("amount")}
                        className="cursor-pointer hover:bg-gray-50 text-right"
                      >
                        مبلغ قسط
                      </TableHead>
                      <TableHead
                        onClick={() => handleSort("policyType")}
                        className="cursor-pointer hover:bg-gray-50 text-right"
                      >
                        نوع بیمه
                      </TableHead>
                      <TableHead
                        onClick={() => handleSort("customerName")}
                        className="cursor-pointer hover:bg-gray-50 text-right"
                      >
                        نام مشتری
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedInstallments.map((installment) => (
                      <TableRow key={installment.id}>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                openEditInstallmentDialog(installment)
                              }
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() =>
                                    setDeleteInstallment(installment)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>حذف قسط</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    آیا مطمئن هستید که می‌خواهید این قسط را حذف
                                    کنید؟ این عمل قابل بازگشت نیست.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>لغو</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={handleDeleteInstallment}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    حذف
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(installment.status)}
                        </TableCell>
                        <TableCell>
                          {installment.daysOverdue > 0 ? (
                            <span className="text-red-600">
                              {installment.daysOverdue} روز
                            </span>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>{installment.dueDate}</TableCell>
                        <TableCell>{formatPrice(installment.amount)}</TableCell>
                        <TableCell>{installment.policyType}</TableCell>
                        <TableCell>{installment.customerName}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>

              {/* Edit Installment Dialog removed */}
            </Card>
          </TabsContent>

          {/* Blogs Management */}
          <TabsContent value="blogs">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>مدیریت وبلاگ</CardTitle>
                  </div>
                  <Button
                    onClick={() => setShowAddBlogForm((prev) => !prev)}
                    variant={showAddBlogForm ? "outline" : "default"}
                  >
                    <Plus className="h-4 w-4 ml-2" />
                    افزودن مقاله
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Inline Add/Edit Blog Form */}
                <AnimatePresence>
                  {showAddBlogForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-6 p-4 bg-white rounded-lg shadow border overflow-hidden"
                      dir="rtl"
                    >
                      <h3 className="text-lg font-semibold mb-4">
                        {editingBlog ? "ویرایش مقاله" : "افزودن مقاله"}
                      </h3>
                    <div className="grid gap-4 py-2">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="blog-title" className="text-right">
                          عنوان
                        </Label>
                        <Input
                          id="blog-title"
                          name="blog-title"
                          value={formDataBlog.title}
                          onChange={(e) =>
                            setFormDataBlog({
                              ...formDataBlog,
                              title: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="blog-excerpt" className="text-right">
                          خلاصه
                        </Label>
                        <Input
                          id="blog-excerpt"
                          name="blog-excerpt"
                          value={formDataBlog.excerpt}
                          onChange={(e) =>
                            setFormDataBlog({
                              ...formDataBlog,
                              excerpt: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="blog-content" className="text-right">
                          محتوا
                        </Label>
                        <textarea
                          id="blog-content"
                          name="blog-content"
                          value={formDataBlog.content}
                          onChange={(e) =>
                            setFormDataBlog({
                              ...formDataBlog,
                              content: e.target.value,
                            })
                          }
                          className="col-span-3 border rounded-md p-2 min-h-24"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="blog-author" className="text-right">
                          نویسنده
                        </Label>
                        <Input
                          id="blog-author"
                          name="blog-author"
                          value={formDataBlog.author}
                          onChange={(e) =>
                            setFormDataBlog({
                              ...formDataBlog,
                              author: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="blog-date" className="text-right">
                          تاریخ
                        </Label>
                        <div className="col-span-3">
                          <ClientOnlyDatePicker
                            value={formDataBlog.date}
                            onChange={(date: string) => {
                              setFormDataBlog({ ...formDataBlog, date });
                            }}
                            placeholder="انتخاب تاریخ"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="blog-image" className="text-right">
                          تصویر
                        </Label>
                        <Input
                          id="blog-image"
                          name="blog-image"
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setFormDataBlog({
                              ...formDataBlog,
                              imageUrl: e.target.files
                                ? e.target.files[0].name
                                : "",
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="blog-category" className="text-right">
                          دسته‌بندی
                        </Label>
                        <Input
                          id="blog-category"
                          name="blog-category"
                          value={formDataBlog.category}
                          onChange={(e) =>
                            setFormDataBlog({
                              ...formDataBlog,
                              category: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                      <div className="flex gap-2 mt-4 justify-end">
                        <Button onClick={editingBlog ? handleEditBlog : handleAddBlog}>
                          {editingBlog ? "ذخیره تغییرات" : "ثبت مقاله"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditingBlog(null);
                            setFormDataBlog({
                              title: "",
                              excerpt: "",
                              content: "",
                              author: "",
                              date: "",
                              imageUrl: "",
                              category: "",
                            });
                            setShowAddBlogForm(false);
                          }}
                        >
                          لغو
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="جستجو در مقالات..."
                      dir="rtl"
                      value={blogSearchQuery}
                      onChange={(e) => setBlogSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-8">عملیات</TableHead>
                      <TableHead className="text-right">تاریخ</TableHead>
                      <TableHead className="text-right">دسته‌بندی</TableHead>
                      <TableHead className="text-right">نویسنده</TableHead>
                      <TableHead className="text-right">عنوان</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBlogs.map((blog) => (
                      <TableRow key={blog.id}>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openEditBlogDialog(blog)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => setDeleteBlogId(blog.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>حذف مقاله</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    آیا مطمئن هستید که می‌خواهید این مقاله را
                                    حذف کنید؟ این عمل قابل بازگشت نیست.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>لغو</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={handleDeleteBlog}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    حذف
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                        <TableCell>{blog.date}</TableCell>
                        <TableCell>{blog.category}</TableCell>
                        <TableCell>{blog.author}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {blog.title}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>

              {/* Edit Blog Dialog removed */}
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}
