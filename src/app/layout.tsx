import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "CalorieAI - AI-Powered Calorie Tracker",
  description:
    "Track your calories with AI-powered food recognition. Scan your meals, log nutrition, and achieve your fitness goals.",
  keywords: ["calorie tracker", "AI food recognition", "nutrition", "meal logging"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="flex min-h-screen">
          <main className="flex-1 min-h-screen">{children}</main>
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border-default)",
              color: "var(--color-text-primary)",
            },
          }}
        />
      </body>
    </html>
  );
}
