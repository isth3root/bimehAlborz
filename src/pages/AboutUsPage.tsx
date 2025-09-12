import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={() => {}} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="mt-4">This is the about us page.</p>
      </div>
      <Footer />
    </div>
  );
}
