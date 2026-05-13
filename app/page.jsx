import { getSiteContent } from "../lib/appwrite-server";
import { whatsappLink } from "../lib/site-content";

export const revalidate = 60;

export default async function HomePage() {
  const content = await getSiteContent();
  const { business } = content;
  const defaultMessage = `Hello ${business.name}. I want to book a service.`;
  const primaryWa = whatsappLink(business.primaryPhoneIntl, defaultMessage);

  return (
    <>
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <header className="site-header">
        <div className="container header-inner">
          <a className="logo" href="#home">{business.shortName}</a>
          <nav className="main-nav">
            <a href="#services">Services</a>
            <a href="#products">Products</a>
            <a href="#booking">Booking</a>
            <a href="#amc">AMC</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="header-actions">
            <a className="btn btn-small" href={`tel:+91${business.phones[0]}`}>Call Now</a>
          </div>
        </div>
      </header>

      <main id="home">
        <section className="hero container reveal in-view">
          <div className="hero-copy">
            <p className="eyebrow">{business.eyebrow}</p>
            <h1>{business.tagline.split(". ").map((line, index) => <span key={line}>{line}{index === 0 ? "." : ""}<br /></span>)}</h1>
            <p className="hero-text">{business.description}</p>
            <div className="hero-actions">
              <a className="btn" href={primaryWa} target="_blank" rel="noopener noreferrer">Book Service</a>
              <a className="btn btn-outline" href="#booking">Get Quote</a>
            </div>
            <div className="hero-highlights">
              {content.highlights.map((item) => <span key={item}>{item}</span>)}
            </div>
            <div className="hero-metrics">
              {content.metrics.map((metric) => (
                <article key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </article>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <article className="hero-panel">
              <div className="hero-panel-top">
                <div>
                  <p className="hero-panel-kicker">Pure Water Partner</p>
                  <h2>Reliable service for homes, offices, and schools</h2>
                </div>
                <div className="hero-ring">Since 2009</div>
              </div>
              <div className="hero-image-card">
                <img src="/wp7381431-drinking-water-wallpapers.jpg" alt="Fresh water pouring into a glass" className="hero-water-image" />
                <div className="hero-image-badge">
                  <span>Pure water focus</span>
                  <strong>Cleaner water for every home</strong>
                </div>
              </div>
              <div className="hero-panel-grid">
                <div className="hero-mini-card"><strong>Sales</strong><p>Domestic and commercial RO models</p></div>
                <div className="hero-mini-card"><strong>Service</strong><p>Repair, maintenance, and AMC support</p></div>
                <div className="hero-mini-card"><strong>Support</strong><p>Call and WhatsApp booking available</p></div>
              </div>
              <div className="hero-panel-actions">
                <a className="hero-contact-chip" href={`tel:+91${business.phones[0]}`}>Call {business.phones[0]}</a>
                <a className="hero-contact-chip" href={primaryWa} target="_blank" rel="noopener noreferrer">WhatsApp Now</a>
              </div>
            </article>
          </div>
        </section>

        <section className="brands container reveal in-view">
          <h2>Brands We Handle</h2>
          <div className="brand-list">
            {content.brands.map((brand) => <a key={brand} href="#products">{brand}</a>)}
          </div>
        </section>

        <section id="services" className="services container reveal in-view">
          <div className="section-head"><p className="eyebrow">Commercial RO Sales & Service</p><h2>Solutions for Offices & Schools</h2></div>
          <div className="service-grid stagger-wrap in-view">
            {content.services.map((service) => (
              <article className="service-card stagger-item" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a className="wa-inline" href={whatsappLink(business.primaryPhoneIntl, `Hello ${business.name}. I need details for ${service.title}. Please contact me.`)} target="_blank" rel="noopener noreferrer">Book on WhatsApp</a>
              </article>
            ))}
          </div>
        </section>

        <section id="products" className="products container reveal in-view">
          <div className="section-head"><p className="eyebrow">Products</p><h2>Available Purifier Models</h2></div>
          <div className="products-gallery">
            {content.products.map((product) => (
              <article className="product-tile" key={product.title}>
                <img src={product.image && product.image.startsWith('http') ? product.image : `/${product.image}`} alt={product.title} />
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <a className="wa-inline" href={whatsappLink(business.primaryPhoneIntl, `Hello ${business.name}. I need details for ${product.title}. Please contact me.`)} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
              </article>
            ))}
          </div>
        </section>

        <section className="trust container reveal in-view">
          <div className="section-head"><p className="eyebrow">Why Choose Smart RO</p><h2>Professional Service That Common People Can Trust</h2></div>
          <div className="trust-grid">
            {content.trust.map((item) => <article className="trust-card" key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}
          </div>
        </section>

        <section id="booking" className="booking container reveal in-view">
          <div className="booking-shell">
            <div className="booking-copy">
              <p className="eyebrow">Free Online Booking</p>
              <h2>Send an Enquiry</h2>
              <p>Fill this form with your requirement and our team will contact you quickly. You can also use WhatsApp booking for instant support.</p>
              <ul className="booking-points"><li>Quick response from our service team</li><li>Easy booking for home, office, and school</li><li>Call and WhatsApp support available</li></ul>
            </div>
            <form className="booking-form" action="https://api.web3forms.com/submit" method="POST">
              <input type="hidden" name="access_key" value="bfd9108e-3746-4a2d-9280-c6152c2bfeef" />
              <input type="hidden" name="_subject" value="New Booking Enquiry - Smart RO Service Center" />
              <label htmlFor="name">Full Name</label><input id="name" name="name" type="text" placeholder="Enter your name" required />
              <label htmlFor="phone">Phone Number</label><input id="phone" name="phone" type="tel" placeholder="Enter phone number" required />
              <label htmlFor="email">Email Address</label><input id="email" name="email" type="email" placeholder="Enter email address" required />
              <label htmlFor="service">Service Needed</label>
              <select id="service" name="service" required><option value="">Select service</option>{content.services.map((service) => <option key={service.title}>{service.title}</option>)}<option>AMC Plan</option><option>General Service</option></select>
              <label htmlFor="message">Message</label><textarea id="message" name="message" rows="4" placeholder="Tell us your requirement" />
              <button className="btn" type="submit">Send Email Enquiry</button>
              <a className="btn btn-outline" href={primaryWa} target="_blank" rel="noopener noreferrer">Book on WhatsApp</a>
            </form>
          </div>
        </section>

        <section id="amc" className="amc container reveal in-view"><div className="amc-card"><p className="eyebrow">Annual Maintenance</p><h2>AMC for All Types of RO Water Purifiers</h2><p>Regular maintenance keeps your purifier safe, efficient, and long-lasting. Book a yearly AMC plan for worry-free service.</p></div></section>
        <section className="faq container reveal in-view"><div className="section-head"><p className="eyebrow">Common Questions</p><h2>Quick Answers</h2></div><div className="faq-list">{content.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
        <section className="testimonials container reveal in-view"><div className="testimonial-track">{content.testimonials.map((item) => <article className="quote-card" key={item.author}><p>&quot;{item.quote}&quot;</p><span>{item.author}</span></article>)}</div></section>
        <section id="contact" className="contact container reveal in-view"><div className="contact-grid"><div className="contact-card"><h2>Contact Details</h2><p><strong>{business.name}</strong></p><p>({business.concern})</p><p>{business.location}</p><div className="phone-links">{business.phones.map((phone) => <a href={`tel:+91${phone}`} key={phone}>{phone}</a>)}</div><p className="note">Book for more details.</p></div><aside className="contact-side"><h3>Instant Booking</h3><p>Pick your preferred support number and send an automatic booking message.</p><div className="wa-contacts"><a className="wa-cta" href={primaryWa} target="_blank" rel="noopener noreferrer">WhatsApp {business.phones[0]}</a><a className="wa-cta" href={whatsappLink(business.secondaryPhoneIntl, defaultMessage)} target="_blank" rel="noopener noreferrer">WhatsApp {business.phones[1]}</a></div></aside></div></section>
      </main>
      <div className="sticky-bar"><a href={`tel:+91${business.phones[0]}`}>Call Now</a><a href={primaryWa} target="_blank" rel="noopener noreferrer">WhatsApp Booking</a><a href="#booking">Email Form</a></div>
      <a className="floating-wa" href={primaryWa} target="_blank" rel="noopener noreferrer" aria-label="Book on WhatsApp"><span className="wa-icon" aria-hidden="true">WA</span><span className="wa-label">WhatsApp</span></a>
      <footer className="site-footer"><div className="container"><p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p></div></footer>
    </>
  );
}
