import "../../globals.css";
import { GeistSans } from "geist/font/sans"
import { UmamiScript } from "../components/umami-script";
import { Toaster } from "@/components/ui/toaster";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        {children}
        <Toaster />
        <UmamiScript />
      </body>
    </html>
  )
}