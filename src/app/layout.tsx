// import type { Metadata } from "next";
// import { Instrument_Serif, Inter } from "next/font/google";
// import "@/styles/globals.css";
// import { cn } from "@/lib/utils";

// const serif = Instrument_Serif({
//   variable: "--font-serif",
//   subsets: ["latin"],
//   weight: "400",
// });

// const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// export const metadata: Metadata = {
//   title: "Performance Tracker",
//   description: "Numbers. Loads of Numbers.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="en"
//       className={cn(
//         "dark",
//         "h-full",
//         "antialiased",
//         serif.variable,
//         inter.variable,
//         "font-sans",
//       )}
//     >
//       <body className="min-h-full flex flex-col">{children}</body>
//     </html>
//   );
// }

import "./globals.css";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cormorant.className}>
        {children}
      </body>
    </html>
  );
}

// import "./globals.css";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }
