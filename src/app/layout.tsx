import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
export const metadata = {
  title: "Eat and Excercise",
  description: "Website for people who want to eat good food but still look good",
};

/**
 * Main Entry Point.
 * @param children 
 * @returns 
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
