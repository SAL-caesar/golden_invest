export const metadata = {
  title: "Golden Invest",
  description: "Investment Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
