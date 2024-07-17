import "../globals.css";
import { GeistSans } from "geist/font/sans"
import { cn } from "@/lib/shared-utils";
import { Navbar } from "../../components/navbar";
import { UmamiScript } from "../../components/umami-script";
import { Footer } from "../../components/footer";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={cn(GeistSans.className, "min-h-screen flex flex-col")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        <UmamiScript />
      </body>
    </html>
  );
}
