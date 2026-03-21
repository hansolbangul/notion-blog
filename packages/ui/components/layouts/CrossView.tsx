import Footer from "../footer/Footer";
import Header from "../header/Header";

export default function CrossView({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative mx-auto w-full max-w-[1260px] flex-1 px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
