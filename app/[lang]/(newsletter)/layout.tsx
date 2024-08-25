import "../../globals.css";
import { GeistSans } from "geist/font/sans"
import { UmamiScript } from "../components/umami-script";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
         {children}
         <UmamiScript />
      </body>
    </html>
  )
}
