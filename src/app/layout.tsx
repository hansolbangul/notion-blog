import Header from "@/components/Header/Header";
import { CONFIG } from "../../site.config";
import "./globals.css";
import Providers from "./Providers";

export const metadata = {
  title: CONFIG.blog.title,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <meta name="google-site-verification" content="Q1Bav1At-K9niA9pM2HWt_E8s4d17CThq0EvCWS6RPk" />
      <body>
        <div id='modal-root' />
        <Providers>
          <Header />
          <div className="max-w-3xl mx-auto">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
