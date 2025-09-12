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

import { Car, Shield, Flame } from "lucide-react";

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
