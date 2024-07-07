import "@/styles/globals.scss";

import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";

export const metadata = {
  title: 'Mercado Libre',
  description: 'Buscador de Mercado Libre'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SearchBar />
        <main className="content">
          {children}
        </main>
      </body>
    </html>
  );
}
