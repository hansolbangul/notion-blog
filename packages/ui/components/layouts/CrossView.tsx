import Footer from "../footer/Footer";
import Header from "../header/Header";

export default function CrossView({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative mx-auto w-full max-w-[1260px] flex-1 px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-y-0 left-4 right-4 border-x border-line bg-[rgba(255,255,255,0.54)] sm:left-6 sm:right-6 lg:left-8 lg:right-8" />
        <div className="relative">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
