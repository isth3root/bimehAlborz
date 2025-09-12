import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="/services" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Services</h1>
        <p className="mt-4">This is the services page.</p>
      </div>
      <Footer />
    </div>
  );
}
