import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <div>
                <h3 className="text-xl">بیمه البرز</h3>
                <p className="text-sm text-gray-400">همراه شما در همه مراحل زندگی</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              بیش از ۲۰ سال تجربه در ارائه خدمات بیمه‌ای با بالاترین کیفیت و اعتماد مشتریان
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="p-2 text-gray-400 hover:text-green-400">
                  <Instagram className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="p-2 text-gray-400 hover:text-green-400">
                  <Twitter className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="p-2 text-gray-400 hover:text-green-400">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="p-2 text-gray-400 hover:text-green-400">
                  <Facebook className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg mb-6">خدمات</h4>
            <ul className="space-y-3">
              <li><a href="/services" className="text-gray-400 hover:text-green-400 transition-colors">بیمه شخص ثالث</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-green-400 transition-colors">بیمه بدنه خودرو</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-green-400 transition-colors">بیمه آتش‌سوزی</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-green-400 transition-colors">بیمه مسئولیت مدنی</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-green-400 transition-colors">بیمه منزل</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-green-400 transition-colors">بیمه تجاری</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg mb-6">تماس با ما</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-400" />
                <span className="text-gray-400">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-400" />
                <span className="text-gray-400">info@alborz-insurance.ir</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-400 mt-1" />
                <span className="text-gray-400">تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-green-400" />
                <span className="text-gray-400">شنبه تا پنج‌شنبه: ۸:۰۰ - ۱۷:۰۰</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg mb-6">خبرنامه</h4>
            <p className="text-gray-400 mb-4">
              از آخرین اخبار و تخفیف‌های ویژه باخبر شوید
            </p>
            <div className="space-y-3">
              <Input 
                placeholder="ایمیل شما"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => alert('Newsletter functionality not implemented yet.')}>
                عضویت در خبرنامه
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Copyright */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© ۱۴۰۳ بیمه البرز. تمامی حقوق محفوظ است.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/" className="hover:text-green-400 transition-colors">حریم خصوصی</a>
            <a href="/" className="hover:text-green-400 transition-colors">شرایط استفاده</a>
            <a href="/" className="hover:text-green-400 transition-colors">سوالات متداول</a>
          </div>
        </div>
      </div>
    </footer>
  );
}