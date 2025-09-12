import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={() => {}} currentPage="about-us" />
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800">درباره ما</h1>
          <p className="mt-4 text-lg text-gray-600">
            ما در بیمه البرز، با بیش از دو دهه تجربه، متعهد به ارائه بهترین خدمات بیمه‌ای به شما هستیم.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">داستان ما</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              بیمه البرز در سال ۱۳۸۰ با هدف ارائه خدمات بیمه‌ای نوین و مشتری‌مدار تاسیس شد. از آن زمان تا کنون، ما همواره در تلاش بوده‌ایم تا با بهره‌گیری از تکنولوژی روز و تیمی متخصص، بهترین پوشش‌های بیمه‌ای را برای شما فراهم آوریم.
            </p>
            <p className="text-gray-600 leading-relaxed">
              ما به شفافیت، صداقت و پاسخگویی به نیازهای مشتریان خود افتخار می‌کنیم و همواره در کنار شما خواهیم بود تا آرامش و امنیت را برای شما و خانواده‌تان به ارمغان آوریم.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN1cmFuY2UlMjB0ZWFtfGVufDB8fHx8MTY3OTg0MjU2OXww&ixlib=rb-4.0.3&q=80&w=1080"
              alt="تیم بیمه البرز"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
