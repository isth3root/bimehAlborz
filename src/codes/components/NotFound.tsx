import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-indigo-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">صفحه یافت نشد</h2>
          <p className="text-lg text-gray-600 mb-8">
            متاسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد. شاید آدرس را اشتباه وارد کرده‌اید یا صفحه حذف شده است.
          </p>
        </div>
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            بازگشت به صفحه اصلی
          </Link>
          <div>
            <p className="text-sm text-gray-500">
              اگر فکر می‌کنید این یک خطا است، با ما تماس بگیرید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}