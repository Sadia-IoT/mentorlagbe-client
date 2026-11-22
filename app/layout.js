import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: {
    default: "MentorLagbe — Find your ideal tutor or mentorship batch",
    template: "%s · MentorLagbe",
  },
  description:
    "MentorLagbe connects students with verified tutors for online and offline tuition batches, 1-on-1 mentorship and exam preparation across Bangladesh.",
  keywords: [
    "tuition",
    "mentor",
    "Bangladesh",
    "online tuition",
    "home tutor",
    "HSC",
    "admission",
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem("ml-theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#12211D",
              color: "#FAF6EE",
              borderRadius: "12px",
              fontSize: "14px",
              border: "1px solid #2A3B35",
            },
            success: {
              iconTheme: { primary: "#34B096", secondary: "#0B1512" },
            },
            error: {
              iconTheme: { primary: "#E2785C", secondary: "#0B1512" },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
