export const fallbackContent = {
  business: {
    name: "Smart RO Service Center",
    shortName: "Smart RO",
    tagline: "Pure Water. Trusted Service.",
    eyebrow: "Authorized Sales & Service Provider Since 2009",
    description:
      "Smart RO Service Center provides dependable purifier sales, servicing, and maintenance for homes, offices, and schools.",
    location: "Maharajganj Bazaar, Jamui",
    concern: "A sister concern of M/S Grihasthi",
    phones: ["9931672157", "9931075913"],
    primaryPhoneIntl: "919931672157",
    secondaryPhoneIntl: "919931075913"
  },
  highlights: ["Fast response", "Installation support", "AMC available"],
  metrics: [
    { value: "17+", label: "Years of trusted service" },
    { value: "5", label: "Major purifier brands covered" },
    { value: "24/7", label: "Fast booking by call or WhatsApp" }
  ],
  brands: ["Kent", "Aquaguard (Eureka Forbes)", "Euro Aqua", "Cruize", "Himtec"],
  services: [
    { title: "25 LPH RO", description: "Compact commercial purifier system. Call for details." },
    { title: "50 LPH RO", description: "Efficient capacity for medium usage. Call for details." },
    { title: "100/200 LPH RO", description: "Higher throughput for larger facilities. Call for details." },
    { title: "500/1000 LPH RO", description: "Industrial-grade water purification. Call for details." }
  ],
  products: [
    {
      title: "Kent Elegant",
      brand: "kent",
      image: "KENT ELEGANT.jpg",
      description: "Domestic RO model with dependable purification and compact body."
    },
    {
      title: "Aquaguard Black Edition",
      brand: "aquaguard",
      image: "WhatsApp Image 2026-04-11 at 22.19.22.jpeg",
      description: "Premium black finish model designed for modern kitchen spaces."
    },
    {
      title: "Aquaguard Kitchen View",
      brand: "aquaguard",
      image: "WhatsApp Image 2026-04-11 at 22.19.22 (1).jpeg",
      description: "A compact design with a premium finish that suits modular kitchens."
    },
    {
      title: "Aquaguard 2-Year Filter Life",
      brand: "aquaguard",
      image: "WhatsApp Image 2026-04-11 at 22.19.22 (2).jpeg",
      description: "Long-life filter performance aimed at lower maintenance frequency."
    },
    {
      title: "Aquaguard 7-Stage Purification",
      brand: "aquaguard",
      image: "WhatsApp Image 2026-04-11 at 22.19.22 (3).jpeg",
      description: "Multi-stage purification system for enhanced water quality protection."
    },
    {
      title: "Aquaguard Aspire Nova 2X RO+UV Copper",
      brand: "aquaguard",
      image: "10stage purification.jpeg",
      description: "2-year filter life model with mega sediment filter and RO+UV Copper purification."
    }
  ],
  trust: [
    {
      title: "Transparent Guidance",
      description: "Clear recommendations based on your water usage, budget, and location needs."
    },
    {
      title: "Fast Installation & Repair",
      description: "Quick booking flow with direct call and WhatsApp options for faster response."
    },
    {
      title: "End-to-End Support",
      description: "From new unit purchase to AMC and routine maintenance, all in one place."
    }
  ],
  testimonials: [
    { quote: "Quick response and genuine service advice. Very satisfied with AMC support.", author: "Local Customer" },
    { quote: "Good options for office RO setup and timely maintenance visits.", author: "School Administrator" },
    { quote: "Easy booking through WhatsApp and smooth installation process.", author: "Residential Client" }
  ],
  faqs: [
    { question: "Which purifier brands do you service?", answer: "Kent, Aquaguard (Eureka Forbes), Euro Aqua, Cruize, and Himtec." },
    { question: "Do you provide service for offices and schools?", answer: "Yes, we provide commercial RO systems from 25 LPH up to 1000 LPH range." },
    { question: "How do I book quickly?", answer: "You can call directly, send form enquiry, or use one-click WhatsApp booking." }
  ]
};

export function whatsappLink(phone, message) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
