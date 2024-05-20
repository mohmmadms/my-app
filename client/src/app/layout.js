
import "./globals.css";
import Footer from "./components/Footer";



export const metadata = {
  title: "Courses",
  description: "courses enrollment app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      
    </html>
    
  );
}
