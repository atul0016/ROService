import "./globals.css";

export const metadata = {
  metadataBase: new URL('https://smartroservicecenter.in'),
  title: {
    default: "Smart RO Service Center | Water Purifier Sales, Service & Repair",
    template: "%s | Smart RO Service Center"
  },
  description: "Expert RO water purifier repair, sales, installation, and AMC services in Jamui. A sister concern of M/S Grihasthi, located at Maharajganj Bazaar, Jamui. We provide advanced domestic and commercial RO systems and water coolers.",
  keywords: ["Best RO service in Jamui", "Smart RO Service Center", "M/S Grihasthi", "Water Purifier Repair Jamui", "Maharajganj Bazaar Jamui", "RO AMC provider Jamui", "Commercial RO systems", "Domestic Water Purifier", "Water Cooler Installation Jamui", "RO Repair Near Me"],
  authors: [{ name: "Smart RO Service Center" }],
  creator: "Smart RO Service Center",
  publisher: "Smart RO Service Center",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  openGraph: {
    title: "Smart RO Service Center | Water Purifier Sales & Service",
    description: "Expert RO water purifier repair, sales, installation, and AMC services. Contact us today for all your RO needs.",
    url: 'https://smartroservicecenter.in',
    siteName: 'Smart RO Service Center',
    images: [
      {
        url: '/og-image.jpg', // You can add an image at public/og-image.jpg
        width: 1200,
        height: 630,
        alt: 'Smart RO Service Center',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart RO Service Center | Purifier Sales & Service',
    description: 'Expert RO water purifier repair, sales, installation, and AMC services.',
  },
  alternates: {
    canonical: 'https://smartroservicecenter.in',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
