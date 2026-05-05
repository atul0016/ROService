import "./globals.css";

export const metadata = {
  title: "Smart RO Service Center | Purifier Sales & Service",
  description:
    "Smart RO Service Center offers purifier sales, installation, AMC, commercial RO systems, and water cooler solutions."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
