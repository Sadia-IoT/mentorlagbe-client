import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "MentorLagbe",
  description: "Find your ideal tutor or mentorship batch today.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}