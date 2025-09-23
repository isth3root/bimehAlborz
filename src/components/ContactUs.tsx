import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Phone, MapPin } from "lucide-react";

export function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">تماس با ما</h1>
          <p className="text-xl max-w-2xl mx-auto">
            در هر زمان از روز آماده پاسخگویی به سوالات و نیازهای شما هستیم
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8">اطلاعات تماس</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">تلفن</h3>
                    <p className="text-gray-600">۰۲۱-۱۲۳۴۵۶۷۸</p>
                    <p className="text-gray-600">۰۹۱۲۳۴۵۶۷۸۹</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">آدرس</h3>
                    <p className="text-gray-600">
                      تهران، خیابان ولیعصر، پلاک ۱۲۳<br />
                      ساختمان بیمه البرز، طبقه ۵
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>فرم تماس</CardTitle>
                  <CardDescription>
                    پیام خود را برای ما ارسال کنید، در اولین فرصت پاسخ خواهیم داد
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">نام</Label>
                      <Input id="firstName" placeholder="نام خود را وارد کنید" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">نام خانوادگی</Label>
                      <Input id="lastName" placeholder="نام خانوادگی خود را وارد کنید" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">ایمیل</Label>
                    <Input id="email" type="email" placeholder="ایمیل خود را وارد کنید" />
                  </div>

                  <div>
                    <Label htmlFor="phone">شماره تماس</Label>
                    <Input id="phone" placeholder="شماره تماس خود را وارد کنید" />
                  </div>

                  <div>
                    <Label htmlFor="subject">موضوع</Label>
                    <Input id="subject" placeholder="موضوع پیام خود را وارد کنید" />
                  </div>

                  <div>
                    <Label htmlFor="message">پیام</Label>
                    <Textarea
                      id="message"
                      placeholder="پیام خود را بنویسید..."
                      rows={5}
                    />
                  </div>

                  <Button className="w-full">ارسال پیام</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">موقعیت ما روی نقشه</h2>
          <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">نقشه اینجا قرار می‌گیرد</p>
          </div>
        </div>
      </section>
    </div>
  );
}