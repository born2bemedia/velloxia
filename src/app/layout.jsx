import { Ubuntu } from "next/font/google";
import "@/styles/base.scss";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
/* import Preloader from "@/components/Preloader"; */
/* import { GoogleAnalytics } from "@next/third-parties/google"; */
import { PopupsProvider } from "@/context/PopupsContext";
import CareerPopup from "@/components/CareerPopup";
import { ToastContainer } from "react-toastify"; 

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        {/*  <GoogleAnalytics gaId="" /> */}
        <PopupsProvider>
          {/*  <Preloader /> */}
          <Header />
          <main className="site">{children}</main>
          <Footer />
          <ToastContainer />
          <CareerPopup />
        </PopupsProvider>
      </body>
    </html>
  );
}