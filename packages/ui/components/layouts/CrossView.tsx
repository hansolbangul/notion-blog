import Footer from "../footer/Footer";
import Header from "../header/Header";

export default function CrossView({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="journal-shell relative flex-1">
        <div className="relative">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
