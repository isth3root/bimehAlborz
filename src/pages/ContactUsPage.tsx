import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={() => {}} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-4">This is the contact us page.</p>
      </div>
      <Footer />
    </div>
  );
}
