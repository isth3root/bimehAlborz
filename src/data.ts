export const customers = [
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

import { Car, Shield, Flame, Users, Home, Briefcase } from "lucide-react";

export const policies = [
  {
    id: '12345',
    customerName: 'احمد محمدی',
    type: 'شخص ثالث',
    vehicle: 'پژو ۴۰۵',
    startDate: '۱۴۰۳/۰۶/۰۱',
    endDate: '۱۴۰۴/۰۶/۰۱',
    premium: '۵,۰۰۰,۰۰۰',
    status: 'فعال',
    icon: Car,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: '12346',
    customerName: 'احمد محمدی',
    type: 'بدنه خودرو',
    vehicle: 'پژو ۴۰۵',
    startDate: '۱۴۰۳/۰۶/۰۱',
    endDate: '۱۴۰۴/۰۶/۰۱',
    premium: '۱۶,۰۰۰,۰۰۰',
    status: 'فعال',
    icon: Shield,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    id: '12347',
    customerName: 'فاطمه احمدی',
    type: 'آتش‌سوزی',
    vehicle: 'آپارتمان',
    startDate: '۱۴۰۳/۰۴/۱۵',
    endDate: '۱۴۰۴/۰۴/۱۵',
    premium: '۳,۰۰۰,۰۰۰',
    status: 'نزدیک انقضا',
    icon: Flame,
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  }
];

export const installments = [
  {
    id: '1',
    policyId: '12345',
    customerName: 'احمد محمدی',
    policyType: 'شخص ثالث',
    amount: '۲,۵۰۰,۰۰۰',
    dueDate: '۱۴۰۳/۰۹/۰۱',
    status: 'معوق',
    daysOverdue: 5
  },
  {
    id: '2',
    policyId: '12345',
    customerName: 'احمد محمدی',
    policyType: 'شخص ثالث',
    amount: '۲,۵۰۰,۰۰۰',
    dueDate: '۱۴۰۳/۱۰/۰۱',
    status: 'آینده',
    daysOverdue: 0
  },
  {
    id: '3',
    policyId: '12347',
    customerName: 'فاطمه احمدی',
    policyType: 'آتش‌سوزی',
    amount: '۱,۵۰۰,۰۰۰',
    dueDate: '۱۴۰۳/۰۸/۲۸',
    status: 'پرداخت شده',
    daysOverdue: 0
  }
];

export const blogPosts = [
  {
    id: '1',
    title: 'چگونه بهترین بیمه را انتخاب کنیم؟',
    publishDate: '۱۴۰۳/۰۶/۱۰',
  },
  {
    id: '2',
    title: 'نکات مهم در خرید بیمه شخص ثالث',
    publishDate: '۱۴۰۳/۰۵/۲۰',
  },
];

export const services = [
  {
    id: 1,
    title: "بیمه شخص ثالث",
    description: "پوشش کامل خسارات وارده به اشخاص ثالث طبق قانون",
    icon: Car,
    features: ["پوشش خسارات جانی", "پوشش خسارات مالی", "پرداخت سریع غرامت"],
    color: "text-blue-600"
  },
  {
    id: 2,
    title: "بیمه بدنه خودرو",
    description: "محافظت از خودروی شما در برابر تصادف، سرقت و خسارات",
    icon: Shield,
    features: ["پوشش تصادف", "بیمه سرقت", "خسارات طبیعی"],
    color: "text-green-600"
  },
  {
    id: 3,
    title: "بیمه آتش‌سوزی",
    description: "حفاظت از اموال در برابر آتش‌سوزی و حوادث طبیعی",
    icon: Flame,
    features: ["آتش‌سوزی ساختمان", "خسارات طبیعی", "اموال منقول"],
    color: "text-red-600"
  },
  {
    id: 4,
    title: "بیمه مسئولیت مدنی",
    description: "پوشش مسئولیت‌های حقوقی و مالی شما",
    icon: Users,
    features: ["مسئولیت شخصی", "مسئولیت حرفه‌ای", "پوشش حقوقی"],
    color: "text-purple-600"
  },
  {
    id: 5,
    title: "بیمه منزل",
    description: "حفاظت کامل از خانه و وسایل شخصی",
    icon: Home,
    features: ["ساختمان", "اموال منقول", "مسئولیت مدنی"],
    color: "text-orange-600"
  },
  {
    id: 6,
    title: "بیمه تجاری",
    description: "راه‌حل‌های بیمه‌ای برای کسب و کارها",
    icon: Briefcase,
    features: ["بیمه کارخانه", "بیمه کارکنان", "تجهیزات"],
    color: "text-indigo-600"
  }
];

export const faqs = [
  {
    id: '1',
    question: 'چگونه می‌توانم بیمه نامه خود را تمدید کنم؟',
    answer: 'شما می‌توانید با مراجعه به پنل کاربری خود و انتخاب گزینه تمدید، بیمه نامه خود را تمدید کنید.',
  },
  {
    id: '2',
    question: 'آیا می‌توانم اطلاعات بیمه نامه خود را ویرایش کنم؟',
    answer: 'بله، شما می‌توانید با مراجعه به پنل کاربری خود و انتخاب گزینه ویرایش، اطلاعات بیمه نامه خود را ویرایش کنید.',
  },
];
