import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Phone, Mail, MapPin } from "lucide-react";

export function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={() => {}} currentPage="contact-us" />
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800">تماس با ما</h1>
          <p className="mt-4 text-lg text-gray-600">
            ما همیشه آماده پاسخگویی به شما هستیم.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">ارسال پیام</h2>
            <form className="space-y-6">
              <div>
                <Label htmlFor="name">نام شما</Label>
                <Input id="name" placeholder="نام و نام خانوادگی" />
              </div>
              <div>
                <Label htmlFor="email">ایمیل</Label>
                <Input id="email" type="email" placeholder="example@email.com" />
              </div>
              <div>
                <Label htmlFor="message">پیام شما</Label>
                <Textarea id="message" placeholder="پیام خود را اینجا بنویسید..." rows={5} />
              </div>
              <Button type="submit" className="w-full">ارسال پیام</Button>
            </form>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">اطلاعات تماس</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold">تلفن</h3>
                  <p className="text-gray-600">۰۲۱-۱۲۳۴۵۶۷۸</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold">ایمیل</h3>
                  <p className="text-gray-600">info@alborz-insurance.ir</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold">آدرس</h3>
                  <p className="text-gray-600">تهران، خیابان ولیعصر، پلاک ۱۲۳</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.896789524584!2d51.41169381525999!3d35.70406198018903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e011a0b6d2e6b%3A0x4b6f3b6b6b6b6b6b!2sValiasr%20St%2C%20Tehran%2C%20Tehran%20Province%2C%20Iran!5e0!3m2!1sen!2s!4v1622550000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
