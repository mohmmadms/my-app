
import "./globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

import { SidebarProvider } from "./components/SideBar";



export const metadata = {
  title: "Courses",
  description: "courses enrollment app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><SidebarProvider>{children}</SidebarProvider></body>
      
    </html>
    
  );
}