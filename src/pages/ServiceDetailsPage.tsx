import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useLocation, useParams } from "react-router-dom";
import { services } from "../data";

export function ServiceDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const { state } = location;
  const selectedService = state?.service || services.find((s) => s.id === Number(id));

  if (!selectedService) {
    return <div>سرویس مورد نظر یافت نشد.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="/services" />
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800">{selectedService.title}</h1>
          <p className="mt-4 text-lg text-gray-600">
            {selectedService.description}
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">جزئیات</h2>
        <p className="text-gray-600 leading-relaxed">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
        </p>
      </div>
      <Footer />
    </div>
  );
}
