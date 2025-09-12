import { Button } from "./ui/button";
import { Menu, User, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  currentPage: string;
}

export function Header({ currentPage }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top bar */}
      <div className="bg-gray-50 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600">۰۲۱-۱۲۳۴۵۶۷۸</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600">info@alborz-insurance.ir</span>
            </div>
          </div>
          <Link to="/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-green-600 hover:text-green-700"
            >
              <User className="h-4 w-4 mr-2" />
              ورود به سامانه
            </Button>
          </Link>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">بیمه البرز</h1>
              <p className="text-sm text-gray-600">همراه شما در همه مراحل زندگی</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`transition-colors ${currentPage === '/' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
            >
              صفحه اصلی
            </Link>
            <Link
              to="/services"
              className={`transition-colors ${currentPage === '/services' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
            >
              خدمات
            </Link>
            <Link
              to="/about-us"
              className={`transition-colors ${currentPage === '/about-us' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
            >
              درباره ما
            </Link>
            <Link
              to="/contact-us"
              className={`transition-colors ${currentPage === '/contact-us' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
            >
              تماس با ما
            </Link>
          </nav>

          <Button className="md:hidden" variant="ghost" size="sm">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}