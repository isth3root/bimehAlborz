import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

export function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      title: "راهنمای خرید بیمه خودرو",
      excerpt: "نکات مهم که باید قبل از خرید بیمه خودرو بدانید تا بهترین انتخاب را داشته باشید",
      author: "احمد محمدی",
      date: "۱۴۰۳/۰۶/۱۵",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
      category: "بیمه خودرو"
    },
    {
      id: 2,
      title: "مزایای بیمه آتش‌سوزی منزل",
      excerpt: "چرا بیمه آتش‌سوزی ضروری است و چه مواردی را پوشش می‌دهد",
      author: "فاطمه احمدی",
      date: "۱۴۰۳/۰۶/۱۰", 
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
      category: "بیمه آتش‌سوزی"
    },
    {
      id: 3,
      title: "قوانین جدید بیمه شخص ثالث",
      excerpt: "آخرین تغییرات قانونی در بیمه شخص ثالث و تأثیر آن بر بیمه‌گذاران",
      author: "علی رضایی",
      date: "۱۴۰۳/۰۶/۰۵",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
      category: "قوانین بیمه"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4">آخرین مطالب وبلاگ</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            مطالب مفید و آموزشی در زمینه بیمه برای آگاهی بیشتر شما
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2 hover:text-green-600 transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                <Button variant="ghost" className="w-full group">
                  ادامه مطلب
                  <ArrowLeft className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            مشاهده همه مطالب
          </Button>
        </div>
      </div>
    </section>
  );
}