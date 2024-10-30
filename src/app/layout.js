import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "Johnnie Dev Finder",
  description: "This is an application where you can search for developers on GitHub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
